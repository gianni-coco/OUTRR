import type { Event, TicketTier } from './mockData';

const TICKETMASTER_API_KEY = process.env.EXPO_PUBLIC_TICKETMASTER_KEY || '';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

interface TmEvent {
  id: string;
  name: string;
  dates?: {
    start?: {
      dateTime?: string;
      localDate?: string;
      localTime?: string;
    };
  };
  classifications?: Array<{
    segment?: { name: string };
    genre?: { name: string };
    subGenre?: { name: string };
  }>;
  _embedded?: {
    venues?: Array<{
      name: string;
      city?: { name: string };
      address?: { line1: string };
    }>;
  };
  priceRanges?: Array<{
    type: string;
    currency: string;
    min: number;
    max: number;
  }>;
  images?: Array<{
    url: string;
    width: number;
    height: number;
    ratio?: string;
  }>;
  info?: string;
  pleaseNote?: string;
  url?: string;
}

const categoryEmojiMap: Record<string, string> = {
  Music: '🎵',
  Sports: '⚽',
  'Arts & Theatre': '🎨',
  Film: '🎬',
  Miscellaneous: '🎪',
  Undefined: '📌',
};

const sportEmojiMap: Record<string, string> = {
  Football: '⚽',
  'Australian Football': '🏈',
  Rugby: '🏉',
  Cricket: '🏏',
  Tennis: '🎾',
  Basketball: '🏀',
  Soccer: '⚽',
  Netball: '🏐',
  Swimming: '🏊',
  Athletics: '🏃',
  Golf: '⛳',
  Motorsport: '🏎️',
  'Horse Racing': '🏇',
  Boxing: '🥊',
  'Ice Hockey': '🏒',
  Baseball: '⚾',
};

function mapCategory(tm: TmEvent): { category: string; emoji: string; sportType?: string } {
  const segment = tm.classifications?.[0]?.segment?.name || 'Miscellaneous';
  const genre = tm.classifications?.[0]?.genre?.name || '';

  if (segment === 'Sports') {
    const sportEmoji = sportEmojiMap[genre] || '⚽';
    return { category: 'Sport', emoji: sportEmoji, sportType: genre || undefined };
  }

  if (segment === 'Music') return { category: 'Music', emoji: '🎵' };
  if (segment === 'Arts & Theatre') return { category: 'Arts & Culture', emoji: '🎨' };

  return { category: segment, emoji: categoryEmojiMap[segment] || '📌' };
}

function mapPriceType(tm: TmEvent): { price_type: Event['price_type']; price_amount?: number } {
  const prices = tm.priceRanges;
  if (!prices || prices.length === 0) {
    return { price_type: 'paid' }; // Default to paid if unknown
  }
  const min = Math.min(...prices.map((p) => p.min));
  if (min === 0) return { price_type: 'free' };
  return { price_type: 'paid', price_amount: min };
}

function getBestImage(tm: TmEvent): string | undefined {
  if (!tm.images || tm.images.length === 0) return undefined;
  // Prefer 16:9 ratio images around 640px wide
  const preferred = tm.images.find((i) => i.ratio === '16_9' && i.width >= 500 && i.width <= 800);
  return preferred?.url || tm.images[0]?.url;
}

function mapTickets(tm: TmEvent): TicketTier[] | undefined {
  const prices = tm.priceRanges;
  if (!prices || prices.length === 0) return undefined;

  const tiers: TicketTier[] = [];
  const seen = new Set<number>();

  for (const p of prices) {
    if (!seen.has(p.min)) {
      seen.add(p.min);
      tiers.push({
        id: `tm-${tm.id}-${p.min}`,
        name: p.min === p.max ? `${p.currency} ${p.min}` : `From ${p.currency} ${p.min}`,
        price: p.min,
        description: p.min === p.max ? 'Standard ticket' : `${p.currency} ${p.min} - ${p.currency} ${p.max}`,
        available: 50, // TM API doesn't expose availability
      });
    }
    if (p.max !== p.min && !seen.has(p.max)) {
      seen.add(p.max);
      tiers.push({
        id: `tm-${tm.id}-${p.max}`,
        name: `Premium — ${p.currency} ${p.max}`,
        price: p.max,
        description: 'Premium ticket',
        available: 20,
      });
    }
  }

  return tiers.length > 0 ? tiers : undefined;
}

function mapTmEvent(tm: TmEvent): Event {
  const { category, emoji, sportType } = mapCategory(tm);
  const { price_type, price_amount } = mapPriceType(tm);
  const venue = tm._embedded?.venues?.[0];

  return {
    id: `tm-${tm.id}`,
    title: tm.name,
    location_name: venue?.name || 'Venue TBA',
    starts_at: tm.dates?.start?.dateTime || tm.dates?.start?.localDate || new Date().toISOString(),
    price_type,
    price_amount,
    category,
    categoryEmoji: emoji,
    image_url: getBestImage(tm),
    description: tm.info || tm.pleaseNote || `${tm.name} at ${venue?.name || 'TBA'}. Visit Ticketmaster for full details.`,
    sport_type: sportType,
    tickets: mapTickets(tm),
  };
}

export interface CityLocation {
  city: string;
  countryCode: string;
  latLong?: string; // "lat,long" for geo-based search
}

export async function fetchCityEvents(location: CityLocation, page = 0, size = 20): Promise<Event[]> {
  if (!TICKETMASTER_API_KEY) {
    console.warn('No Ticketmaster API key set. Using mock data.');
    return [];
  }

  const params = new URLSearchParams({
    apikey: TICKETMASTER_API_KEY,
    size: String(size),
    page: String(page),
    sort: 'date,asc',
  });

  if (location.latLong) {
    params.set('latlong', location.latLong);
    params.set('radius', '50');
    params.set('unit', 'km');
  } else {
    params.set('city', location.city);
    params.set('countryCode', location.countryCode);
  }

  const url = `${BASE_URL}/events.json?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('Ticketmaster API error:', res.status);
      return [];
    }
    const data = await res.json();
    const tmEvents: TmEvent[] = data._embedded?.events || [];
    return tmEvents.map(mapTmEvent);
  } catch (err) {
    console.error(`Failed to fetch events for ${location.city}:`, err);
    return [];
  }
}

export async function fetchCitySportsEvents(location: CityLocation): Promise<Event[]> {
  if (!TICKETMASTER_API_KEY) return [];

  const params = new URLSearchParams({
    apikey: TICKETMASTER_API_KEY,
    segmentName: 'Sports',
    size: '20',
    sort: 'date,asc',
  });

  if (location.latLong) {
    params.set('latlong', location.latLong);
    params.set('radius', '50');
    params.set('unit', 'km');
  } else {
    params.set('city', location.city);
    params.set('countryCode', location.countryCode);
  }

  const url = `${BASE_URL}/events.json?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    const tmEvents: TmEvent[] = data._embedded?.events || [];
    return tmEvents.map(mapTmEvent);
  } catch (err) {
    console.error(`Failed to fetch sports events for ${location.city}:`, err);
    return [];
  }
}

// Backwards-compatible wrappers
const defaultLocation: CityLocation = { city: 'Perth', countryCode: 'AU' };
export const fetchPerthEvents = (page?: number, size?: number) => fetchCityEvents(defaultLocation, page, size);
export const fetchPerthSportsEvents = () => fetchCitySportsEvents(defaultLocation);
