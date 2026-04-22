import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/supabase/storage';

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
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size: 5MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    const { url, error } = await uploadImage(buffer, file.name);

    if (error || !url) {
      console.error('Upload failed:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to upload image', details: error },
        { status: 500 }
      );
    }

    // Return success with image URL
    return NextResponse.json(
      {
        success: true,
        message: 'Image uploaded successfully',
        url,
        filename: file.name,
        size: file.size,
        type: file.type,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Unexpected error in upload-image API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to upload an image.' },
    { status: 405 }
  );
}
