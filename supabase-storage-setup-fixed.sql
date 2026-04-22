-- Supabase Storage Setup for BEST Magazine Images
-- Run this AFTER creating the bucket via Supabase Dashboard

-- IMPORTANT: First create the bucket:
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "Create a new bucket"
-- 3. Name it: "article-images"
-- 4. Check "Public bucket" (so images are accessible)
-- 5. Click "Create bucket"

-- Then run this SQL:

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public can view article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update article images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete article images" ON storage.objects;

-- Policy: Allow public read access to article-images bucket
CREATE POLICY "Public can view article images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'article-images');

-- Policy: Allow anyone to upload images (since we use API key auth)
CREATE POLICY "Anyone can upload article images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'article-images');

-- Policy: Allow anyone to update images
CREATE POLICY "Anyone can update article images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'article-images');

-- Policy: Allow anyone to delete images
CREATE POLICY "Anyone can delete article images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'article-images');

-- Note: These policies allow public access because we're using API key authentication
-- in our Next.js API routes. The API routes validate the API key before allowing uploads.
-- If you want stricter control, you can modify these policies after setting up Supabase Auth.
