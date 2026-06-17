-- Step 1: Run schema (safe to re-run)
-- (full contents of supabase-schema-clean.sql)

-- Clean schema for BEST Magazine posts table
-- This version safely handles existing objects

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view published posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON posts;

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
DROP FUNCTION IF EXISTS update_updated_at_column();

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

-- Step 2: Insert demo posts
INSERT INTO posts (title, slug, content, excerpt, cover_image, author, category, featured, trending, published, seo_title, seo_description)
VALUES
(
  'The Future of Indian Luxury Fashion',
  'future-of-indian-luxury-fashion',
  '<p>India''s luxury fashion scene is undergoing a remarkable transformation. From heritage textile houses to contemporary designers, the industry is redefining what it means to dress with intention and elegance.</p><p>Designers like Sabyasachi Mukherjee and Manish Malhotra have elevated Indian craftsmanship to global runways, blending traditional embroidery techniques with modern silhouettes.</p><p>The rise of sustainable luxury is also reshaping consumer expectations, with buyers increasingly seeking pieces that tell a story of artisanal skill and cultural heritage.</p>',
  'India''s luxury fashion scene is undergoing a remarkable transformation, blending heritage craftsmanship with contemporary design.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=1067&fit=crop&q=90',
  'BM India',
  'Fashion',
  true,
  true,
  true,
  'The Future of Indian Luxury Fashion | BM India',
  'Explore how Indian luxury fashion is evolving with heritage craftsmanship and contemporary design.'
),
(
  'Beauty Rituals: Ancient Ayurvedic Secrets',
  'beauty-rituals-ancient-ayurvedic-secrets',
  '<p>Ayurveda, the ancient Indian science of life, has been guiding beauty rituals for thousands of years. Today, these time-tested practices are finding a new audience among wellness enthusiasts worldwide.</p><p>From turmeric face masks to rose water toners and neem-based cleansers, Ayurvedic beauty is rooted in the belief that true radiance comes from within.</p><p>Modern brands are now formulating products that marry these ancient ingredients with cutting-edge skincare science, creating a bridge between tradition and innovation.</p>',
  'Discover how ancient Ayurvedic beauty rituals are making a powerful comeback in modern skincare routines.',
  'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&h=1067&fit=crop&q=90',
  'BM India',
  'Beauty',
  true,
  false,
  true,
  'Ayurvedic Beauty Secrets | BM India',
  'Ancient Ayurvedic beauty rituals and how they are shaping modern skincare.'
),
(
  'Inside India''s Most Exclusive Luxury Hotels',
  'inside-indias-most-exclusive-luxury-hotels',
  '<p>From the palatial grandeur of Udaipur''s Lake Palace to the contemporary opulence of Mumbai''s Taj Mahal Palace, India''s luxury hospitality sector stands among the finest in the world.</p><p>These properties are not merely places to stay — they are immersive cultural experiences, where every detail from the architecture to the cuisine tells the story of India''s rich heritage.</p><p>The Oberoi Group, Taj Hotels, and a new wave of boutique palace hotels are setting new benchmarks for personalised service and sustainable luxury.</p>',
  'A curated look at India''s most exclusive luxury hotels, where heritage architecture meets world-class hospitality.',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=1067&fit=crop&q=90',
  'BM India',
  'Luxury',
  false,
  true,
  true,
  'India''s Most Exclusive Luxury Hotels | BM India',
  'Explore the most exclusive luxury hotels in India blending heritage and modern opulence.'
),
(
  'Bollywood''s Most Iconic Style Moments of 2024',
  'bollywood-iconic-style-moments-2024',
  '<p>Bollywood has always been a barometer of Indian fashion, and 2024 was no exception. From Deepika Padukone''s minimalist red carpet looks to Ranveer Singh''s boundary-pushing streetwear, the year was filled with unforgettable style statements.</p><p>The awards season brought a parade of couture gowns and sharply tailored sherwanis, while film promotions showcased the versatility of Indian designers on the global stage.</p><p>We look back at the moments that defined celebrity fashion this year and the designers who made them possible.</p>',
  'A look back at the most iconic Bollywood style moments of 2024 that defined celebrity fashion.',
  'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1600&h=1067&fit=crop&q=90',
  'BM India',
  'Celebrity',
  false,
  true,
  true,
  'Bollywood Style Moments 2024 | BM India',
  'The most iconic Bollywood celebrity style moments of 2024.'
),
(
  'The Rise of Indian Contemporary Art',
  'rise-of-indian-contemporary-art',
  '<p>Indian contemporary art is experiencing an unprecedented global moment. Auction houses like Christie''s and Sotheby''s are reporting record bids for works by artists such as Subodh Gupta, Bharti Kher, and Jitish Kallat.</p><p>This surge in interest reflects a broader cultural shift — collectors worldwide are recognising the depth, diversity, and innovation of India''s art scene.</p><p>From Mumbai''s Kala Ghoda district to Delhi''s Lado Sarai, art districts are thriving, nurturing a new generation of artists who are redefining Indian identity through their work.</p>',
  'Indian contemporary art is having a global moment, with record auction results and growing international recognition.',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1600&h=1067&fit=crop&q=90',
  'BM India',
  'Culture',
  true,
  false,
  true,
  'Rise of Indian Contemporary Art | BM India',
  'How Indian contemporary art is gaining global recognition and record auction results.'
);
