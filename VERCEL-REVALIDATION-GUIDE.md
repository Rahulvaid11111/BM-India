# Vercel Revalidation Guide

## Issue: New Articles Not Appearing on Live Site

Your local development server shows new articles immediately, but Vercel caches pages and doesn't fetch updates automatically.

## Solution: Incremental Static Regeneration (ISR)

We've configured your site to use ISR with 60-second revalidation.

---

## What Was Changed

### 1. Homepage Revalidation

**File:** `app/page.tsx`

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
```

- Homepage checks for new articles every 60 seconds
- First visitor after 60s triggers a background rebuild
- Subsequent visitors see the updated page

### 2. Article Page Revalidation

**File:** `app/article/[id]/page.tsx`

```typescript
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamicParams = true; // Allow new article URLs
```

- Article pages refresh every 60 seconds
- New articles can be accessed immediately (not just pre-built ones)

### 3. Database Query Optimization

**File:** `lib/supabase/queries.ts`

- Queries always fetch fresh data from Supabase
- No client-side caching of database results

---

## How It Works

### Timeline After Publishing New Article

```
0s    - Article created via Make.com → Saved to Supabase
0-60s - Vercel serves cached homepage (old articles)
60s   - First visitor triggers revalidation
61s   - Background: Vercel fetches new data and rebuilds page
62s+  - All visitors see updated homepage with new article
```

### For Immediate Updates

If you need articles to appear instantly (not recommended for high traffic):

**Option 1: Reduce Revalidation Time**
```typescript
export const revalidate = 10; // Check every 10 seconds
```

**Option 2: On-Demand Revalidation**
Create an API route to trigger revalidation:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('authorization');
  
  if (secret !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    revalidatePath('/');
    revalidatePath('/article/[id]', 'page');
    
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
```

Then call from Make.com after creating article:
```
POST https://your-domain.vercel.app/api/revalidate
Authorization: Bearer YOUR_API_KEY
```

---

## Current Configuration

### Revalidation Interval
- **60 seconds** - Good balance between freshness and performance

### Benefits
✅ Reduces server load  
✅ Fast page loads (served from cache)  
✅ Automatic updates every minute  
✅ No manual deployment needed  

### Trade-offs
⚠️ Up to 60-second delay for new articles  
⚠️ First visitor after 60s sees old page (triggers rebuild)  

---

## Verifying It Works

### 1. Deploy to Vercel

```bash
git add .
git commit -m "Add ISR revalidation for new articles"
git push
```

Vercel auto-deploys from GitHub.

### 2. Test Revalidation

1. **Create article** via Make.com
2. **Wait 60 seconds**
3. **Visit homepage** - triggers revalidation
4. **Refresh page** - see new article

### 3. Check Vercel Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click **Functions** → **Logs**
4. Look for revalidation events

---

## Monitoring

### Check Cache Status

View response headers in browser DevTools:

```
X-Vercel-Cache: HIT    # Served from cache
X-Vercel-Cache: MISS   # Freshly generated
X-Vercel-Cache: STALE  # Revalidating in background
```

### Vercel Analytics

Enable in Vercel Dashboard:
- **Analytics** → See page views and cache hit rates
- **Speed Insights** → Monitor performance

---

## Troubleshooting

### Articles Still Not Appearing

**Check 1: Environment Variables**
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel
- Settings → Environment Variables

**Check 2: Build Logs**
- Deployments → Latest → View Build Logs
- Look for errors fetching from Supabase

**Check 3: Database Connection**
- Test Supabase connection from Vercel Functions
- Check RLS policies allow public read access

**Check 4: Wait Full Revalidation Period**
- Must wait 60+ seconds after article creation
- Visit homepage to trigger revalidation
- Refresh to see updated content

### Force Immediate Update

**Option 1: Redeploy**
```bash
git commit --allow-empty -m "Force redeploy"
git push
```

**Option 2: Vercel Dashboard**
- Deployments → Latest → Redeploy

**Option 3: Clear Cache**
- Not available in free tier
- Use on-demand revalidation API instead

---

## Best Practices

### For High-Traffic Sites
- Keep revalidation at 60+ seconds
- Use on-demand revalidation for instant updates
- Enable Vercel Analytics to monitor cache performance

### For Low-Traffic Sites
- Can reduce to 30 seconds
- Less impact on server resources
- Faster content updates

### For Development
- Local dev always shows fresh data (no caching)
- Test revalidation on Vercel preview deployments
- Use `revalidate = 1` for testing (change back for production)

---

## Alternative: Dynamic Rendering

If you need real-time updates without any delay:

```typescript
// app/page.tsx
export const dynamic = 'force-dynamic'; // No caching at all
```

**Warning:** This disables all caching and increases server load significantly.

---

## Current Settings Summary

| Page | Revalidation | Dynamic Params |
|------|-------------|----------------|
| Homepage (`/`) | 60 seconds | N/A |
| Article Pages (`/article/[id]`) | 60 seconds | ✅ Enabled |
| Category Pages | Inherited (60s) | N/A |

---

## Need Faster Updates?

Contact me to implement:
- On-demand revalidation API
- Webhook integration with Make.com
- Real-time updates via WebSocket
- Custom cache invalidation strategy

---

**Your site now automatically updates every 60 seconds!** 🚀

New articles will appear within 1 minute of creation without any manual deployment.
