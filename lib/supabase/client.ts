import { createClient } from '@supabase/supabase-js';

// These env vars must be set in `.env.local` (and in Vercel/deployment
// environment settings) for the Supabase client to initialize.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
