# Troubleshooting: Articles Not Displaying

## Quick Checks

### 1. Verify Data in Supabase
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Table Editor** → **posts**
4. Check:
   - ✅ Your article exists
   - ✅ `published` = `true`
   - ✅ `slug` is set correctly
   - ✅ `cover_image` has a URL
   - ✅ `created_at` has a timestamp

### 2. Check Environment Variables
```bash
# Verify .env.local has correct values
cat .env.local
```

Should show:
```
SUPABASE_URL=https://eoflankepsvlseejzpqg.supabase.co
SUPABASE_ANON_KEY=sb_publishable_Bw09TwRVkV8Ec3KeN2pQnw_AVivC6aM
```

### 3. Clear Next.js Cache
```bash
# Stop dev server
# Delete cache
rm -rf .next

# Restart
npm run dev
```

### 4. Hard Refresh Browser
- **Mac:** Cmd + Shift + R
- **Windows/Linux:** Ctrl + Shift + R

### 5. Check Browser Console
1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for errors related to:
   - Image loading
   - Supabase connection
   - API calls

## Common Issues

### Issue: "Article appears in Supabase but not on website"

**Solution 1: Check published status**
```sql
-- Run in Supabase SQL Editor
SELECT id, title, slug, published, created_at 
FROM posts 
ORDER BY created_at DESC 
LIMIT 5;
```

Ensure `published = true`

**Solution 2: Verify Supabase connection**
```bash
# Test connection
curl https://eoflankepsvlseejzpqg.supabase.co/rest/v1/posts \
  -H "apikey: sb_publishable_Bw09TwRVkV8Ec3KeN2pQnw_AVivC6aM"
```

Should return JSON with posts.

### Issue: "Images not loading"

**Check 1: Image URLs**
- Should start with: `https://eoflankepsvlseejzpqg.supabase.co/storage/v1/object/public/article-images/`
- Verify in Supabase Storage → article-images bucket

**Check 2: Next.js Image Config**
File: `next.config.ts`
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'eoflankepsvlseejzpqg.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

### Issue: "Wrong article order"

**Check created_at timestamps**
```sql
SELECT title, created_at 
FROM posts 
ORDER BY created_at DESC;
```

Newest should be at top.

### Issue: "Article detail page 404"

**Check slug format**
- Slug should be lowercase
- Spaces replaced with hyphens
- No special characters

Example: "Spring Fashion Trends 2026" → `spring-fashion-trends-2026`

**Visit:** `http://localhost:3000/article/your-slug-here`

## Testing Commands

### View All Articles (Terminal)
```bash
# Check what getArticles() returns
node -e "
const { getArticles } = require('./lib/get-articles.ts');
getArticles().then(articles => {
  console.log('Total articles:', articles.length);
  console.log('Latest:', articles[0]?.title);
});
"
```

### Check Supabase Directly
```bash
# List all posts
curl "https://eoflankepsvlseejzpqg.supabase.co/rest/v1/posts?select=*&published=eq.true&order=created_at.desc" \
  -H "apikey: sb_publishable_Bw09TwRVkV8Ec3KeN2pQnw_AVivC6aM" \
  -H "Content-Type: application/json"
```

## Production (Vercel) Issues

### Cache Not Updating

**Solution: Force Revalidation**
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Deployments**
4. Click **Redeploy**

Or add revalidation to pages:
```typescript
// app/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds
```

### Environment Variables Missing

1. Go to Vercel Dashboard
2. Project → **Settings** → **Environment Variables**
3. Verify:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `API_SECRET_KEY`
4. Redeploy after adding

## Still Not Working?

### Debug Mode

Add logging to `lib/get-articles.ts`:
```typescript
export async function getArticles(): Promise<Article[]> {
  try {
    const dbPosts = await getAllPosts();
    console.log('📊 Fetched from Supabase:', dbPosts.length, 'posts');
    console.log('📝 Latest post:', dbPosts[0]?.title);
    
    const dbArticles = dbPosts.map(transformPostToArticle);
    // ... rest of code
  }
}
```

Check terminal output when page loads.

### Contact Support Info

If issue persists:
1. Check Supabase logs: Dashboard → Logs
2. Check Vercel logs: Dashboard → Logs
3. Check browser console for errors
4. Verify Make.com automation succeeded

## Quick Fix Checklist

- [ ] Article exists in Supabase posts table
- [ ] `published = true`
- [ ] Environment variables set correctly
- [ ] Dev server restarted
- [ ] Browser hard refreshed
- [ ] Images uploaded to Supabase Storage
- [ ] Slug is valid (lowercase, hyphens)
- [ ] No console errors in browser
- [ ] Supabase connection working

---

**Most issues are resolved by:**
1. Hard refresh browser
2. Restart dev server
3. Check `published = true` in Supabase
