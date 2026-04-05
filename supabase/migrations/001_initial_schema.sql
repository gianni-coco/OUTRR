-- Enable PostGIS for location queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  home_city TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CITIES
-- ============================================
CREATE TABLE public.cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code CHAR(2) NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  timezone TEXT NOT NULL,
  is_trending BOOLEAN DEFAULT FALSE,
  event_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cities_location ON public.cities USING GIST(location);
CREATE INDEX idx_cities_slug ON public.cities(slug);

-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  emoji TEXT,
  sort_order INT DEFAULT 0
);

-- ============================================
-- EVENTS
-- ============================================
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  city_id UUID NOT NULL REFERENCES public.cities(id),
  category_id UUID NOT NULL REFERENCES public.categories(id),
  title TEXT NOT NULL,
  description TEXT,
  location_name TEXT NOT NULL,
  location_address TEXT,
  location_point GEOGRAPHY(POINT, 4326) NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  is_all_day BOOLEAN DEFAULT FALSE,
  price_type TEXT NOT NULL CHECK (price_type IN ('free', 'paid', 'donation')),
  price_amount DECIMAL(10,2),
  price_currency CHAR(3) DEFAULT 'GBP',
  ticket_url TEXT,
  image_url TEXT,
  event_type TEXT NOT NULL DEFAULT 'one-off'
    CHECK (event_type IN ('one-off', 'recurring', 'attraction', 'virtual')),
  status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('published', 'cancelled', 'draft')),
  is_featured BOOLEAN DEFAULT FALSE,
  save_count INT DEFAULT 0,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_city ON public.events(city_id);
CREATE INDEX idx_events_category ON public.events(category_id);
CREATE INDEX idx_events_starts_at ON public.events(starts_at);
CREATE INDEX idx_events_location ON public.events USING GIST(location_point);
CREATE INDEX idx_events_status_starts ON public.events(status, starts_at)
  WHERE status = 'published';
CREATE INDEX idx_events_tonight ON public.events(city_id, status, starts_at)
  WHERE status = 'published';

-- ============================================
-- SAVED EVENTS (bookmarks)
-- ============================================
CREATE TABLE public.saved_events (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, event_id)
);

CREATE INDEX idx_saved_events_user ON public.saved_events(user_id);

-- ============================================
-- EVENT REPORTS
-- ============================================
CREATE TABLE public.event_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  reported_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL CHECK (reason IN ('spam', 'inappropriate', 'duplicate', 'misleading', 'other')),
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, reported_by)
);

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update save_count on events
CREATE OR REPLACE FUNCTION public.update_save_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.events SET save_count = save_count + 1 WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.events SET save_count = save_count - 1 WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_saved_event_change
  AFTER INSERT OR DELETE ON public.saved_events
  FOR EACH ROW EXECUTE FUNCTION public.update_save_count();

-- Tonight events RPC
CREATE OR REPLACE FUNCTION public.get_tonight_events(
  p_city_id UUID,
  p_timezone TEXT DEFAULT 'UTC'
)
RETURNS SETOF public.events AS $$
BEGIN
  RETURN QUERY
    SELECT *
    FROM public.events
    WHERE city_id = p_city_id
      AND status = 'published'
      AND starts_at >= (NOW() AT TIME ZONE p_timezone)::DATE::TIMESTAMPTZ
      AND starts_at < ((NOW() AT TIME ZONE p_timezone)::DATE + INTERVAL '1 day')::TIMESTAMPTZ
    ORDER BY starts_at ASC;
END;
$$ LANGUAGE plpgsql STABLE;

-- Nearby events RPC
CREATE OR REPLACE FUNCTION public.get_nearby_events(
  p_lat DOUBLE PRECISION,
  p_lng DOUBLE PRECISION,
  p_radius_meters INT DEFAULT 10000,
  p_limit INT DEFAULT 50
)
RETURNS TABLE (
  event_id UUID,
  title TEXT,
  location_name TEXT,
  starts_at TIMESTAMPTZ,
  price_type TEXT,
  image_url TEXT,
  category_name TEXT,
  distance_meters DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
    SELECT
      e.id,
      e.title,
      e.location_name,
      e.starts_at,
      e.price_type,
      e.image_url,
      c.name,
      ST_Distance(
        e.location_point,
        ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::GEOGRAPHY
      ) AS distance_meters
    FROM public.events e
    JOIN public.categories c ON c.id = e.category_id
    WHERE e.status = 'published'
      AND e.starts_at >= NOW()
      AND ST_DWithin(
        e.location_point,
        ST_SetSRID(ST_MakePoint(p_lng, p_lat), 4326)::GEOGRAPHY,
        p_radius_meters
      )
    ORDER BY distance_meters ASC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_reports ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Cities (read-only)
CREATE POLICY "Cities are viewable by everyone"
  ON public.cities FOR SELECT USING (true);

-- Categories (read-only)
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT USING (true);

-- Events
CREATE POLICY "Published events are viewable by everyone"
  ON public.events FOR SELECT USING (status = 'published' OR created_by = auth.uid());
CREATE POLICY "Authenticated users can create events"
  ON public.events FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update their own events"
  ON public.events FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Users can delete their own events"
  ON public.events FOR DELETE USING (auth.uid() = created_by);

-- Saved Events
CREATE POLICY "Users can view their own saved events"
  ON public.saved_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save events"
  ON public.saved_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave events"
  ON public.saved_events FOR DELETE USING (auth.uid() = user_id);

-- Event Reports
CREATE POLICY "Users can create reports"
  ON public.event_reports FOR INSERT WITH CHECK (auth.uid() = reported_by);

-- ============================================
-- SEED CATEGORIES
-- ============================================

INSERT INTO public.categories (name, slug, emoji, sort_order) VALUES
  ('Music', 'music', '🎵', 1),
  ('Food & Drink', 'food', '🍽️', 2),
  ('Sport', 'sport', '⚽', 3),
  ('Arts & Culture', 'arts', '🎨', 4),
  ('Outdoors', 'outdoors', '🌿', 5),
  ('Nightlife', 'nightlife', '🌙', 6);
