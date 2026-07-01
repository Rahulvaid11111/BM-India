import { supabase } from './client';

const BUCKET_NAME = 'article-images';

/**
 * Upload an image to Supabase Storage
 * @param file - File buffer or Blob
 * @param fileName - Name for the file (will be sanitized)
 * @returns Public URL of the uploaded image
 */
export async function uploadImage(
  file: Buffer | Blob,
  fileName: string
): Promise<{ url: string | null; error: unknown }> {
  try {
    // Sanitize filename
    const sanitizedName = sanitizeFileName(fileName);
    const uniqueName = `${Date.now()}-${sanitizedName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(uniqueName, file, {
        contentType: getContentType(fileName),
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return { url: null, error };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Unexpected upload error:', error);
    return { url: null, error };
  }
}

/**
 * Upload multiple images
 * @param files - Array of file buffers/blobs with names
 * @returns Array of public URLs
 */
export async function uploadMultipleImages(
  files: Array<{ file: Buffer | Blob; name: string }>
): Promise<{ urls: string[]; errors: unknown[] }> {
  const urls: string[] = [];
  const errors: unknown[] = [];

  for (const { file, name } of files) {
    const { url, error } = await uploadImage(file, name);
    if (url) {
      urls.push(url);
    }
    if (error) {
      errors.push(error);
    }
  }

  return { urls, errors };
}

/**
 * Delete an image from storage
 * @param filePath - Path to the file in storage
 */
export async function deleteImage(filePath: string): Promise<{ success: boolean; error: unknown }> {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    return { success: !error, error };
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Sanitize filename to be URL-safe
 */
function sanitizeFileName(fileName: string): string {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Get content type from filename
 */
function getContentType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const types: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  };
  return types[ext || ''] || 'image/jpeg';
}

/**
 * Get public URL for an existing file
 */
export function getPublicUrl(filePath: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
}
