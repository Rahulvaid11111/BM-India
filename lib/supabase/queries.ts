import { supabase, DatabasePost } from './client';
import { Article } from '../articles';

/**
 * Fetch all published posts from Supabase
 * Uses no-store cache to always fetch fresh data
 */
export async function getAllPosts(): Promise<DatabasePost[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<DatabasePost | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error in getPostBySlug:', err);
    return null;
  }
}

/**
 * Create a new post in Supabase
 */
export async function createPost(postData: Omit<DatabasePost, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: DatabasePost | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single();

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Update an existing post
 */
export async function updatePost(id: string, postData: Partial<DatabasePost>): Promise<{ data: DatabasePost | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update({ ...postData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}

/**
 * Check if a slug already exists
 */
export async function slugExists(slug: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('slug')
      .eq('slug', slug)
      .single();

    return !error && data !== null;
  } catch {
    return false;
  }
}

/**
 * Transform DatabasePost to Article interface for frontend compatibility
 */
export function transformPostToArticle(post: DatabasePost): Article & { _timestamp?: number } {
  const timestamp = new Date(post.created_at).getTime();
  
  // Fallback placeholder image if cover_image is missing or invalid
  const fallbackImage = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&h=1067&fit=crop&q=90';
  
  // Validate cover image and trim whitespace
  const coverImage = post.cover_image && post.cover_image.trim() !== '' 
    ? post.cover_image.trim() 
    : fallbackImage;
  
  // Filter out invalid images and trim whitespace from all URLs
  const validImages = (post.images || [])
    .filter(img => img && typeof img === 'string' && img.trim() !== '')
    .map(img => img.trim());
  
  return {
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    date: new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    image: coverImage,
    featured: post.featured,
    trending: post.trending,
    content: post.content,
    images: validImages,
    _timestamp: timestamp, // Hidden property for sorting
  };
}
