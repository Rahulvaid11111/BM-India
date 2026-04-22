# BEST Magazine Backend Setup Guide

## 🚀 Quick Start

Follow these steps to set up the automated article publishing API.

---

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name:** best-magazine (or your choice)
   - **Database Password:** Generate a strong password
   - **Region:** Choose closest to your users
4. Click "Create new project" and wait for setup to complete

### 1.2 Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase-schema.sql` from this project
4. Paste into the SQL editor
5. Click "Run" or press Cmd/Ctrl + Enter
6. You should see "Success. No rows returned"

### 1.3 Get API Credentials

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

---

## Step 2: Environment Variables

### 2.1 Create .env.local File

In your project root, create a file named `.env.local`:

```bash
# Copy from .env.local.example
cp .env.local.example .env.local
```

### 2.2 Add Your Credentials

Edit `.env.local` and add your values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
API_SECRET_KEY=generate-a-strong-secret-key
```

**Generate a strong API secret key:**

```bash
# On Mac/Linux:
openssl rand -base64 32

# Or use any password generator
```

### 2.3 Important Notes

- ⚠️ **Never commit `.env.local`** to Git (it's already in .gitignore)
- ⚠️ Keep your API_SECRET_KEY secure
- ⚠️ Use different keys for development and production

---

## Step 3: Install Dependencies

Dependencies are already installed, but if needed:

```bash
npm install
```

This includes:
- `@supabase/supabase-js` - Supabase client library

---

## Step 4: Test Locally

### 4.1 Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### 4.2 Test the API Endpoint

Create a test file `test-api.sh`:

```bash
#!/bin/bash

curl -X POST http://localhost:3000/api/create-post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_SECRET_KEY" \
  -d '{
    "title": "Test Article",
    "content": "<p>This is a test article content.</p>",
    "excerpt": "Testing the API",
    "cover_image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "category": "Fashion"
  }'
```

Make it executable and run:

```bash
chmod +x test-api.sh
./test-api.sh
```

Expected response:
```json
{
  "success": true,
  "message": "Post created successfully",
  "slug": "test-article",
  "url": "/article/test-article"
}
```

### 4.3 Verify in Supabase

1. Go to your Supabase dashboard
2. Click **Table Editor** > **posts**
3. You should see your test article

---

## Step 5: Deploy to Vercel

### 5.1 Push to GitHub

```bash
git add .
git commit -m "Add Supabase backend API"
git push origin main
```

### 5.2 Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"

### 5.3 Add Environment Variables in Vercel

1. In Vercel dashboard, go to your project
2. Click **Settings** > **Environment Variables**
3. Add all three variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `API_SECRET_KEY`
4. Click "Save"
5. Redeploy the project

---

## Step 6: Test Production API

Replace `your-domain.vercel.app` with your actual domain:

```bash
curl -X POST https://your-domain.vercel.app/api/create-post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_SECRET_KEY" \
  -d '{
    "title": "Production Test Article",
    "content": "<h2>Hello World</h2><p>This is from production!</p>",
    "excerpt": "Testing production API",
    "cover_image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "images": [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
    ],
    "category": "Fashion",
    "author": "Test Author",
    "seo_keywords": ["test", "production"]
  }'
```

---

## 📚 Usage Examples

### Full Article Example

```json
{
  "title": "Spring Fashion Trends 2026: What's Hot This Season",
  "content": "<h2>Introduction</h2><p>Spring 2026 brings a fresh wave of fashion trends...</p><h3>Trend #1: Minimalist Elegance</h3><p>Clean lines and neutral tones dominate...</p>",
  "excerpt": "Discover the hottest fashion trends for spring 2026, from minimalist elegance to bold statement pieces.",
  "cover_image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  "images": [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956"
  ],
  "author": "Isabella Chen",
  "category": "Fashion",
  "featured": true,
  "trending": true,
  "seo_title": "Spring Fashion Trends 2026 - Complete Style Guide",
  "seo_description": "Explore the top fashion trends for spring 2026. From minimalist elegance to bold colors, discover what's hot this season.",
  "seo_keywords": ["fashion", "spring 2026", "trends", "style guide", "minimalist fashion"]
}
```

### Using JavaScript

```javascript
async function createArticle() {
  const response = await fetch('https://your-domain.com/api/create-post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_SECRET_KEY}`
    },
    body: JSON.stringify({
      title: 'Your Article Title',
      content: '<p>Article content...</p>',
      excerpt: 'Brief summary',
      cover_image: 'https://...',
      category: 'Fashion'
    })
  });
  
  const result = await response.json();
  
  if (result.success) {
    console.log('Article created:', result.url);
  } else {
    console.error('Error:', result.error);
  }
}
```

---

## 🔒 Security Best Practices

1. **API Key Management**
   - Never expose API_SECRET_KEY in client-side code
   - Use environment variables only
   - Rotate keys periodically
   - Use different keys for dev/staging/production

2. **Content Validation**
   - The API validates all required fields
   - HTML content is stored as-is (sanitize on display if needed)
   - URLs are validated for format

3. **Rate Limiting** (Recommended for Production)
   - Consider adding rate limiting middleware
   - Use Vercel's built-in rate limiting
   - Monitor API usage

4. **Database Security**
   - Row Level Security (RLS) is enabled
   - Public can only read published posts
   - Write operations require authentication

---

## 🐛 Troubleshooting

### "Unauthorized" Error

**Problem:** API returns 401 Unauthorized

**Solutions:**
- Check Authorization header format: `Bearer YOUR_KEY`
- Verify API_SECRET_KEY in .env.local matches your request
- Ensure environment variables are set in Vercel

### "Validation Failed" Error

**Problem:** API returns 400 with validation errors

**Solutions:**
- Check all required fields are present: title, content, excerpt, cover_image, category
- Verify category is one of: Fashion, Beauty, Luxury, Culture, Celebrity, Business, Shop, Local
- Ensure URLs are properly formatted

### "Duplicate Slug" Error

**Problem:** API returns 409 Conflict

**Solutions:**
- A post with the same title already exists
- Modify the title slightly to make it unique
- Check existing posts in Supabase

### Database Connection Issues

**Problem:** Posts not appearing or database errors

**Solutions:**
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check Supabase project is active (not paused)
- Verify posts table exists (run schema again if needed)
- Check Row Level Security policies are configured

### Build Errors

**Problem:** Build fails with Supabase errors

**Solutions:**
- The code handles missing credentials gracefully
- Ensure @supabase/supabase-js is installed
- Check TypeScript types are correct

---

## 📊 Monitoring

### Check Posts in Supabase

1. Go to Supabase dashboard
2. Click **Table Editor** > **posts**
3. View all posts, filter by category, featured, etc.

### View API Logs in Vercel

1. Go to Vercel dashboard
2. Click your project
3. Go to **Logs** tab
4. Filter by `/api/create-post`

---

## 🔄 Next Steps

### Optional Enhancements

1. **Update/Delete Endpoints**
   - Add PUT endpoint for updating posts
   - Add DELETE endpoint for removing posts

2. **Image Upload**
   - Integrate Supabase Storage
   - Add image upload endpoint
   - Automatic image optimization

3. **Admin Dashboard**
   - Build a UI for managing posts
   - Add authentication
   - Preview before publishing

4. **Scheduled Publishing**
   - Add publish_date field
   - Create cron job to publish scheduled posts

5. **Analytics**
   - Track article views
   - Monitor popular content
   - SEO performance tracking

---

## 📖 Additional Documentation

- **API Documentation:** See `README-API.md`
- **Database Schema:** See `supabase-schema.sql`
- **Code Examples:** See `lib/get-articles.ts` for integration

---

## 🆘 Support

If you encounter issues:

1. Check console logs for detailed errors
2. Verify all environment variables
3. Test Supabase connection directly
4. Review API response for specific error details

For Supabase-specific issues:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)

For Next.js issues:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)

---

## ✅ Checklist

Before going to production:

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] Environment variables set locally
- [ ] API tested locally
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] Production API tested
- [ ] API key secured
- [ ] Documentation reviewed
- [ ] Monitoring set up

---

**You're all set! 🎉**

Your BEST Magazine backend is now ready to accept automated article submissions via API.
