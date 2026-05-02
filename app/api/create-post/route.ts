import { NextRequest, NextResponse } from 'next/server';
import { createPost, slugExists } from '@/lib/supabase/queries';
import { slugify } from '@/lib/slugify';

// API key validation
function validateApiKey(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const apiKey = process.env.API_SECRET_KEY;

  if (!apiKey) {
    console.error('API_SECRET_KEY not configured');
    return false;
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.substring(7);
  return token === apiKey;
}

// Validate required fields
function validatePostData(data: Record<string, unknown>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const requiredFields = ['title', 'content', 'excerpt', 'cover_image', 'category'];

  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate category
  const validCategories = ['Fashion', 'Beauty', 'Luxury', 'Culture', 'Celebrity', 'Business', 'Shop', 'Local'];
  if (data.category && !validCategories.includes(data.category)) {
    errors.push(`Invalid category. Must be one of: ${validCategories.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid or missing API key.' },
        { status: 401 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate required fields
    const validation = validatePostData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Generate slug from title
    const baseSlug = slugify(body.title);
    
    // Check if slug already exists
    const exists = await slugExists(baseSlug);
    if (exists) {
      return NextResponse.json(
        { success: false, error: 'A post with this title already exists. Please use a different title.' },
        { status: 409 }
      );
    }

    // Prepare post data
    const postData = {
      title: body.title.trim(),
      slug: baseSlug,
      content: body.content,
      excerpt: body.excerpt.trim(),
      cover_image: body.cover_image.trim(),
      images: body.images || [],
      author: body.author?.trim() || 'BEST Magazine',
      category: body.category,
      featured: body.featured || false,
      trending: body.trending || false,
      published: body.published !== undefined ? body.published : true,
      seo_title: body.seo_title?.trim() || body.title.trim(),
      seo_description: body.seo_description?.trim() || body.excerpt.trim(),
      seo_keywords: body.seo_keywords || [],
    };

    // Insert into database
    const { data, error } = await createPost(postData);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create post', details: error.message },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Post created successfully',
        post: data,
        slug: baseSlug,
        url: `/article/${baseSlug}`
      },
      { status: 201 }
    );

  } catch (_error) {
    console.error('Unexpected error in create-post API:', _error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create a post.' },
    { status: 405 }
  );
}
