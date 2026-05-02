import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/supabase/queries';

// Diagnostic endpoint to check article data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter. Usage: /api/check-article?slug=your-article-slug' },
        { status: 400 }
      );
    }

    // Fetch the article from database
    const article = await getPostBySlug(slug);

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found', slug },
        { status: 404 }
      );
    }

    // Return diagnostic information
    return NextResponse.json({
      success: true,
      article: {
        slug: article.slug,
        title: article.title,
        category: article.category,
        author: article.author,
        hasContent: !!article.content,
        contentLength: article.content?.length || 0,
        contentPreview: article.content?.substring(0, 200) || 'No content',
        hasCoverImage: !!article.cover_image,
        coverImage: article.cover_image,
        imageCount: article.images?.length || 0,
        images: article.images || [],
        featured: article.featured,
        trending: article.trending,
        published: article.published,
        created_at: article.created_at,
      }
    });

  } catch (error) {
    console.error('Error checking article:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
