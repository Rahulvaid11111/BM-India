-- Clean schema for BEST Magazine posts table
-- This version safely handles existing objects

-- Drop existing trigger and function if they exist
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Create posts table (will skip if exists)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'BEST Magazine',
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_posts_trending ON posts(trending) WHERE trending = true;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view published posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON posts;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (published posts only)
CREATE POLICY "Public can view published posts"
  ON posts
  FOR SELECT
  USING (published = true);

-- Create policy for authenticated users to insert posts
CREATE POLICY "Authenticated users can insert posts"
  ON posts
  FOR INSERT
  WITH CHECK (true);

-- Create policy for authenticated users to update posts
CREATE POLICY "Authenticated users can update posts"
  ON posts
  FOR UPDATE
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add constraint to validate category (drop first if exists)
DO $$ 
BEGIN
  ALTER TABLE posts DROP CONSTRAINT IF EXISTS valid_category;
  ALTER TABLE posts ADD CONSTRAINT valid_category
    CHECK (category IN ('Fashion', 'Beauty', 'Luxury', 'Culture', 'Celebrity', 'Business', 'Shop', 'Local'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Comments for documentation
COMMENT ON TABLE posts IS 'Stores blog posts/articles for BEST Magazine';
COMMENT ON COLUMN posts.slug IS 'URL-friendly unique identifier generated from title';
COMMENT ON COLUMN posts.content IS 'Full article content in HTML format';
COMMENT ON COLUMN posts.images IS 'Array of additional image URLs (3-4 images per article)';
COMMENT ON COLUMN posts.seo_title IS 'Custom SEO title for meta tags';
COMMENT ON COLUMN posts.seo_description IS 'Meta description for SEO';
COMMENT ON COLUMN posts.seo_keywords IS 'Array of keywords for SEO';
