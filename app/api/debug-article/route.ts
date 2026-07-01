import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, getArticles } from '@/lib/get-articles';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  if (!slug) {
    // Return all articles with their IDs/slugs
    const articles = await getArticles();
    return NextResponse.json({
      total: articles.length,
      env: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        urlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) || 'missing',
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      },
      articles: articles.slice(0, 10).map(a => ({
        id: a.id,
        title: a.title,
        category: a.category,
        url: `/article/${a.id}`
      }))
    });
  }

  // Check specific article
  const article = await getArticleById(slug);
  
  if (!article) {
    return NextResponse.json({
      found: false,
      slug,
      message: 'Article not found in static or database'
    }, { status: 404 });
  }

  return NextResponse.json({
    found: true,
    article: {
      id: article.id,
      title: article.title,
      category: article.category,
      author: article.author,
      date: article.date,
      hasContent: !!article.content,
      contentLength: article.content?.length || 0,
      url: `/article/${article.id}`
    }
  });
}
