import { NextRequest, NextResponse } from 'next/server';
import { searchPosts, transformPostToArticle } from '@/lib/supabase/queries';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const posts = await searchPosts(query.trim());
  const articles = posts.map(transformPostToArticle);

  return NextResponse.json({ results: articles });
}
