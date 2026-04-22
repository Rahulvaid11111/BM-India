-- Supabase Storage Setup for BEST Magazine Images
-- Run this in your Supabase SQL Editor after creating the storage bucket

-- Note: First create the bucket via Supabase Dashboard:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "Create a new bucket"
-- 3. Name it: "article-images"
-- 4. Set it to "Public bucket" (so images are accessible)
-- 5. Click "Create bucket"

-- Then run this SQL to set up policies:

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to article-images bucket
CREATE POLICY "Public can view article images"
ON storage.objects FOR SELECT
USING (bucket_id = 'article-images');

-- Policy: Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload article images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'article-images');

-- Policy: Allow authenticated users to update their images
CREATE POLICY "Authenticated users can update article images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'article-images');

-- Policy: Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete article images"
ON storage.objects FOR DELETE
USING (bucket_id = 'article-images');

-- Note: For API key authentication (non-Supabase auth), you may need to adjust these policies
-- or use service role key for uploads in your API routes
