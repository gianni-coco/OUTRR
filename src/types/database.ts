// Auto-generated types placeholder
// Run `npx supabase gen types typescript` to regenerate from your Supabase schema

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          home_city: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      cities: {
        Row: {
          id: string;
          name: string;
          country: string;
          country_code: string;
          slug: string;
          timezone: string;
          is_trending: boolean;
          event_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['cities']['Row'], 'id' | 'created_at' | 'event_count'>;
        Update: Partial<Database['public']['Tables']['cities']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          emoji: string | null;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          created_by: string;
          city_id: string;
          category_id: string;
          title: string;
          description: string | null;
          location_name: string;
          location_address: string | null;
          starts_at: string;
          ends_at: string | null;
          is_all_day: boolean;
          price_type: 'free' | 'paid' | 'donation';
          price_amount: number | null;
          price_currency: string;
          ticket_url: string | null;
          image_url: string | null;
          event_type: 'one-off' | 'recurring' | 'attraction' | 'virtual';
          status: 'published' | 'cancelled' | 'draft';
          is_featured: boolean;
          save_count: number;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at' | 'save_count' | 'view_count' | 'is_featured'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      saved_events: {
        Row: {
          user_id: string;
          event_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['saved_events']['Row'], 'created_at'>;
        Update: never;
      };
      event_reports: {
        Row: {
          id: string;
          event_id: string;
          reported_by: string;
          reason: 'spam' | 'inappropriate' | 'duplicate' | 'misleading' | 'other';
          details: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['event_reports']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
};
