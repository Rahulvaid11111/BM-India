import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Create a mock client for build time when credentials aren't available
const createMockClient = (): any => ({
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: null, error: new Error('Supabase not configured') }),
    update: () => ({ data: null, error: new Error('Supabase not configured') }),
    upsert: () => ({ data: null, error: new Error('Supabase not configured') }),
    eq: function() { return this; },
    single: () => ({ data: null, error: new Error('Supabase not configured') }),
    order: function() { return this; },
  })
});

export const supabase: SupabaseClient = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient() as SupabaseClient;

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
