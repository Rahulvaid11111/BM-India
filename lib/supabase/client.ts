import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

const isValidUrl = (url: string) => {
  try { new URL(url); return true; } catch { return false; }
};

// Create a mock client for build time when credentials aren't available
const createMockClient = () => {
  const noopError = new Error('Supabase not configured');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const builder: Record<string, any> = {};
  const chain = () => builder;
  builder.select = chain;
  builder.insert = chain;
  builder.update = chain;
  builder.upsert = chain;
  builder.delete = chain;
  builder.eq = chain;
  builder.neq = chain;
  builder.order = chain;
  builder.limit = chain;
  builder.or = chain;
  builder.filter = chain;
  builder.match = chain;
  builder.single = () => Promise.resolve({ data: null, error: noopError });
  builder.then = (resolve: (v: { data: unknown[]; error: null }) => unknown) =>
    Promise.resolve({ data: [], error: null }).then(resolve);
  return {
    from: () => builder,
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: noopError }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        remove: () => Promise.resolve({ data: null, error: noopError }),
        list: () => Promise.resolve({ data: [], error: noopError }),
      }),
    },
    rpc: () => Promise.resolve({ data: null, error: noopError }),
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
