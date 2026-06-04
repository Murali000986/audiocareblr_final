import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: string;
          category_label: string;
          brand: string;
          price: number;
          mrp: number | null;
          rating: number;
          reviews_count: number;
          badge: string | null;
          img_url: string;
          description: string;
          highlights: string[];
          in_stock: boolean;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          status: string;
          items: unknown;
          subtotal: number;
          shipping: number;
          total: number;
          address: unknown;
          created_at: string;
        };
      };
      repair_bookings: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          phone: string;
          email: string;
          device: string;
          brand: string;
          issue: string;
          pickup_mode: string;
          preferred_date: string;
          status: string;
          booking_ref: string;
          created_at: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          user_id: string;
          rating: number;
          text: string;
          author_name: string;
          created_at: string;
        };
      };
      wishlist: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
      };
    };
  };
};
