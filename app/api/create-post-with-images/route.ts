import { NextRequest, NextResponse } from 'next/server';
import { createPost, slugExists } from '@/lib/supabase/queries';
import { uploadMultipleImages } from '@/lib/supabase/storage';
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

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    if (!validateApiKey(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid or missing API key.' },
        { status: 401 }
      );
    }

    // Parse multipart form data
    const formData = await request.formData();

    // Extract text fields
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string || 'BEST Magazine';
    const featured = formData.get('featured') === 'true';
    const trending = formData.get('trending') === 'true';
    const seo_title = formData.get('seo_title') as string;
    const seo_description = formData.get('seo_description') as string;
    const seo_keywords = formData.get('seo_keywords') as string;

    // Validate required fields
    if (!title || !content || !excerpt || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, content, excerpt, category' },
        { status: 400 }
      );
    }

    // Extract image files
    const coverImage = formData.get('cover_image') as File;
    const additionalImages: File[] = [];
    
    // Get all additional images (image_1, image_2, image_3, etc.)
    for (let i = 1; i <= 10; i++) {
      const img = formData.get(`image_${i}`) as File;
      if (img) additionalImages.push(img);
    }

    if (!coverImage) {
      return NextResponse.json(
        { success: false, error: 'Cover image is required' },
        { status: 400 }
      );
    }

    // Upload cover image
    const coverBytes = await coverImage.arrayBuffer();
    const coverBuffer = Buffer.from(coverBytes);
    const { uploadImage } = await import('@/lib/supabase/storage');
    const { url: coverUrl, error: coverError } = await uploadImage(coverBuffer, coverImage.name);

    if (coverError || !coverUrl) {
      return NextResponse.json(
        { success: false, error: 'Failed to upload cover image', details: coverError },
        { status: 500 }
      );
    }

    // Upload additional images
    const imageFiles = await Promise.all(
      additionalImages.map(async (img) => ({
        file: Buffer.from(await img.arrayBuffer()),
        name: img.name,
      }))
    );

    const { urls: imageUrls, errors: imageErrors } = await uploadMultipleImages(imageFiles);

    if (imageErrors.length > 0) {
      console.warn('Some images failed to upload:', imageErrors);
    }

    // Generate slug
    const baseSlug = slugify(title);
    const exists = await slugExists(baseSlug);
    
    if (exists) {
      return NextResponse.json(
        { success: false, error: 'A post with this title already exists' },
        { status: 409 }
      );
    }

    // Prepare post data
    const postData = {
      title: title.trim(),
      slug: baseSlug,
      content,
      excerpt: excerpt.trim(),
      cover_image: coverUrl,
      images: imageUrls,
      author: author.trim(),
      category,
      featured,
      trending,
      published: true,
      seo_title: seo_title?.trim() || title.trim(),
      seo_description: seo_description?.trim() || excerpt.trim(),
      seo_keywords: seo_keywords ? seo_keywords.split(',').map(k => k.trim()) : [],
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
        message: 'Post created successfully with uploaded images',
        post: data,
        slug: baseSlug,
        url: `/article/${baseSlug}`,
        images: {
          cover: coverUrl,
          additional: imageUrls,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Unexpected error in create-post-with-images API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to create a post with images.' },
    { status: 405 }
  );
}
