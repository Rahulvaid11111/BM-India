import { createClient } from '@supabase/supabase-js';

// Environment variables — set these in .env.local and in your deployment environment (e.g. Vercel):
// NEXT_PUBLIC_SUPABASE_URL=https://mxqcbeaywbzaotdfdurk.supabase.co
// SUPABASE_SERVICE_ROLE_KEY=<service role key>  ← server-only, never expose to browser

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface DatabasePost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  images?: string[];
  author: string;
  category: string;
  featured: boolean;
  trending: boolean;
  published: boolean;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  name: string;
  email: string;
  created_at: string;
}
