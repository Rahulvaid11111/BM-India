# Production Deployment Guide

## 🚀 Deploy BEST Magazine to GitHub & Vercel

This guide will walk you through deploying your magazine to production with proper security and SEO.

---

## ✅ Pre-Deployment Checklist

### Security
- [x] `.env.local` is in `.gitignore` (secrets protected)
- [x] API key authentication implemented
- [x] Supabase RLS policies configured
- [x] Environment variables documented in `.env.example`

### SEO
- [x] Sitemap generation (`/sitemap.xml`)
- [x] Robots.txt (`/robots.txt`)
- [x] Open Graph metadata
- [x] Twitter Card metadata
- [x] Structured metadata in layout

### Performance
- [x] Next.js Image optimization
- [x] Font optimization (EB Garamond, Jost)
- [x] Static generation for articles
- [x] Supabase CDN for images

---

## 📦 Step 1: Prepare for GitHub

### 1.1 Initialize Git (if not already done)

```bash
cd /Users/rahulvaid/CascadeProjects/best-magazine
git init
```

### 1.2 Verify .gitignore

Your `.gitignore` already protects:
- ✅ `.env*` files (secrets)
- ✅ `node_modules`
- ✅ `.next` build files
- ✅ `.vercel` deployment files

### 1.3 Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `best-magazine`
3. Description: "BEST Magazine - Digital lifestyle and culture magazine"
4. Visibility: **Private** (recommended) or Public
5. **Do NOT** initialize with README (you already have files)
6. Click **Create repository**

### 1.4 Push to GitHub

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: BEST Magazine with Supabase backend"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/best-magazine.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Vercel

### 2.1 Import Project

1. Go to https://vercel.com
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Select your `best-magazine` repository
5. Click **Import**

### 2.2 Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (leave as is)

**Build Command:** `npm run build` (auto-detected)

**Output Directory:** `.next` (auto-detected)

### 2.3 Add Environment Variables

Click **Environment Variables** and add these:

#### Required Variables

```
SUPABASE_URL=https://eoflankepsvlseejzpqg.supabase.co
SUPABASE_ANON_KEY=sb_publishable_Bw09TwRVkV8Ec3KeN2pQnw_AVivC6aM
API_SECRET_KEY=jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag=
```

#### Optional Variables

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_google_verification_code
```

**Important:** 
- Add to **Production**, **Preview**, and **Development** environments
- Click **Add** for each variable

### 2.4 Deploy

1. Click **Deploy**
2. Wait 2-3 minutes for build to complete
3. Your site will be live at `https://your-project.vercel.app`

---

## 🔒 Step 3: Security Configuration

### 3.1 Rotate API Keys (Recommended)

For production, generate a new API key:

```bash
openssl rand -base64 32
```

Update in:
1. Vercel Environment Variables
2. Your `.env.local` (for local development)
3. Make.com or other automation tools

### 3.2 Configure Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your domain: `bestmagazine.ca`
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

### 3.3 Enable Vercel Security Features

1. **Analytics:** Settings → Analytics → Enable
2. **Speed Insights:** Settings → Speed Insights → Enable
3. **Web Vitals:** Automatically tracked

---

## 📊 Step 4: SEO Setup

### 4.1 Verify Sitemap

Visit: `https://your-domain.vercel.app/sitemap.xml`

Should show all pages including:
- Homepage
- Category pages
- Article pages (static + Supabase)

### 4.2 Verify Robots.txt

Visit: `https://your-domain.vercel.app/robots.txt`

Should show:
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://your-domain.vercel.app/sitemap.xml
```

### 4.3 Submit to Google Search Console

1. Go to https://search.google.com/search-console
2. Add property: `https://your-domain.vercel.app`
3. Verify ownership (use HTML tag method)
4. Submit sitemap: `https://your-domain.vercel.app/sitemap.xml`

### 4.4 Test Open Graph

Use these tools:
- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter:** https://cards-dev.twitter.com/validator
- **LinkedIn:** https://www.linkedin.com/post-inspector/

Paste your URL and verify metadata appears correctly.

---

## 🎨 Step 5: Add Open Graph Image

Create a 1200x630px image for social sharing:

1. Create `public/og-image.jpg` with your logo/branding
2. Recommended specs:
   - Size: 1200x630px
   - Format: JPG or PNG
   - File size: < 1MB
3. Push to GitHub
4. Vercel will auto-deploy

---

## 🔄 Step 6: Continuous Deployment

### Automatic Deployments

Every push to `main` branch triggers:
1. ✅ Automatic build on Vercel
2. ✅ Preview deployment for PRs
3. ✅ Production deployment on merge

### Manual Deployment

```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push

# Vercel automatically deploys
```

---

## 🧪 Step 7: Test Production

### 7.1 Test Website

- [ ] Homepage loads
- [ ] Articles display correctly
- [ ] Images load from Supabase
- [ ] Navigation works
- [ ] Mobile responsive

### 7.2 Test API Endpoints

```bash
# Test create-post
curl -X POST https://your-domain.vercel.app/api/create-post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "title": "Production Test Article",
    "content": "<p>Testing production API</p>",
    "excerpt": "Test",
    "cover_image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "category": "Fashion"
  }'
```

Expected: Article created and appears on website

### 7.3 Test Image Upload

```bash
curl -X POST https://your-domain.vercel.app/api/upload-image \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "image=@/path/to/test-image.jpg"
```

Expected: Image uploaded to Supabase Storage

---

## 📈 Step 8: Monitoring

### Vercel Dashboard

Monitor:
- **Deployments:** Build status and logs
- **Analytics:** Page views and performance
- **Logs:** Runtime errors and API calls
- **Speed Insights:** Core Web Vitals

### Supabase Dashboard

Monitor:
- **Database:** Number of posts
- **Storage:** Image uploads and usage
- **API:** Request counts
- **Logs:** Database queries

---

## 🔐 Security Best Practices

### Environment Variables

✅ **Do:**
- Store in Vercel dashboard
- Use different keys for dev/prod
- Rotate keys periodically
- Document in `.env.example`

❌ **Don't:**
- Commit `.env.local` to Git
- Share API keys publicly
- Use same keys across environments
- Hardcode secrets in code

### API Security

✅ **Implemented:**
- Bearer token authentication
- Input validation
- Error handling
- Rate limiting (via Vercel)

### Database Security

✅ **Implemented:**
- Row Level Security (RLS)
- Public read, authenticated write
- SQL injection protection
- Secure connection strings

---

## 🚨 Troubleshooting

### Build Fails

**Error:** "Module not found"
- **Fix:** Run `npm install` locally and commit `package-lock.json`

**Error:** "Environment variable not found"
- **Fix:** Add missing variables in Vercel dashboard

### API Not Working

**Error:** 401 Unauthorized
- **Fix:** Check API_SECRET_KEY in Vercel environment variables

**Error:** 500 Internal Server Error
- **Fix:** Check Vercel logs for detailed error message

### Images Not Loading

**Error:** 404 on image URLs
- **Fix:** Verify Supabase Storage bucket is public
- **Fix:** Check storage policies are configured

---

## 📋 Post-Deployment Checklist

- [ ] Website is live and accessible
- [ ] All pages load correctly
- [ ] API endpoints work
- [ ] Images load from Supabase
- [ ] Sitemap is accessible
- [ ] Robots.txt is configured
- [ ] Open Graph tags work
- [ ] Google Search Console configured
- [ ] Analytics enabled
- [ ] Custom domain configured (if applicable)
- [ ] API key secured in Vercel
- [ ] Make.com integration tested
- [ ] Monitoring set up

---

## 🎉 You're Live!

Your BEST Magazine is now deployed and ready for:

✅ **Automated Publishing** - Via Make.com API  
✅ **SEO Optimization** - Sitemap, metadata, Open Graph  
✅ **Secure API** - Protected with authentication  
✅ **Image Uploads** - Supabase Storage integration  
✅ **Continuous Deployment** - Auto-deploy on Git push  

### Next Steps

1. **Content Creation:** Start publishing articles via API
2. **SEO:** Submit sitemap to search engines
3. **Analytics:** Monitor traffic in Vercel dashboard
4. **Marketing:** Share on social media
5. **Automation:** Set up Make.com workflows

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Supabase Docs:** https://supabase.com/docs
- **Make.com Guide:** See `MAKE-INTEGRATION-GUIDE.md`
- **API Documentation:** See `README-API.md`
- **Image Upload Guide:** See `IMAGE-UPLOAD-GUIDE.md`

---

**Deployment Complete!** 🚀

Your magazine is live and ready to publish content automatically.
