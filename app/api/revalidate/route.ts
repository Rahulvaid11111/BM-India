import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, secret } = body;

    // Verify secret token
    const revalidateSecret = process.env.REVALIDATE_SECRET || 'your-secret-token-here';
    if (secret !== revalidateSecret) {
      return NextResponse.json(
        { success: false, message: 'Invalid secret' },
        { status: 401 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug is required' },
        { status: 400 }
      );
    }

    // Revalidate the article page
    revalidatePath(`/article/${slug}`);
    
    // Revalidate homepage to show new article
    revalidatePath('/');
    
    // Revalidate all category pages
    const categories = ['fashion', 'beauty', 'luxury', 'culture', 'celebrity', 'business', 'shop', 'local'];
    categories.forEach(cat => {
      revalidatePath(`/category/${cat}`);
    });

    console.log(`[Revalidate] Successfully revalidated article: ${slug}`);

    return NextResponse.json({
      success: true,
      revalidated: true,
      paths: [`/article/${slug}`, '/', ...categories.map(c => `/category/${c}`)],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Revalidate] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for manual testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const secret = searchParams.get('secret');

  if (!secret || secret !== (process.env.REVALIDATE_SECRET || 'your-secret-token-here')) {
    return NextResponse.json(
      { success: false, message: 'Invalid or missing secret' },
      { status: 401 }
    );
  }

  if (!slug) {
    return NextResponse.json(
      { success: false, message: 'Usage: /api/revalidate?slug=article-slug&secret=your-secret' },
      { status: 400 }
    );
  }

  // Revalidate the article page
  revalidatePath(`/article/${slug}`);
  revalidatePath('/');

  return NextResponse.json({
    success: true,
    revalidated: true,
    slug,
    timestamp: new Date().toISOString()
  });
}
