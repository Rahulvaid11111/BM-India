import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

const isValidUrl = (url: string) => {
  try { new URL(url); return true; } catch { return false; }
};

// Create a mock client for build time when credentials aren't available
const createMockClient = () => {
  const chainable: Record<string, unknown> = {
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    update: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    upsert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    delete: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    eq: function() { return this; },
    order: function() { return this; },
    limit: function() { return this; },
    or: function() { return this; },
  };
  return {
    from: () => chainable,
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        remove: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        list: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }),
      }),
    },
    rpc: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
  };
};

export const supabase: SupabaseClient = (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient() as unknown as SupabaseClient;

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
