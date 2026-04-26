# Image Loading Error Fix

## Error: "url parameter is valid but upstream response is invalid"

This error occurs when Next.js can't fetch images from Supabase Storage. Here's how to fix it:

## Solution Steps

### 1. Verify Supabase Storage Bucket is Public

Go to your Supabase Dashboard:

1. Navigate to **Storage** → **article-images** bucket
2. Click the **Settings** icon (gear) for the bucket
3. Ensure **"Public bucket"** is checked ✅
4. If not checked, enable it and save

### 2. Check Storage Policies

Run this SQL in Supabase SQL Editor to ensure proper access:

```sql
-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

If policies are missing, run the SQL from `supabase-storage-setup-fixed.sql`

### 3. Verify Image URLs

Your image URLs should look like:
```
https://eoflankepsvlseejzpqg.supabase.co/storage/v1/object/public/article-images/filename.jpg
```

**Test URL directly in browser:**
- Copy an image URL from your database
- Paste in browser address bar
- Should display the image (not download or error)

### 4. Restart Dev Server

After making changes:

```bash
# Stop the server (Ctrl+C)
# Clear Next.js cache
rm -rf .next

# Restart
npm run dev
```

### 5. Hard Refresh Browser

- **Mac:** Cmd + Shift + R
- **Windows/Linux:** Ctrl + Shift + R

## Common Issues

### Issue: Bucket is Private

**Symptom:** Images return 403 Forbidden

**Fix:**
1. Go to Storage → article-images
2. Settings → Check "Public bucket"
3. Save changes

### Issue: Missing Storage Policies

**Symptom:** Images return 401 Unauthorized

**Fix:**
Run `supabase-storage-setup-fixed.sql` in SQL Editor

### Issue: Wrong Image URL Format

**Symptom:** 404 Not Found

**Fix:**
Ensure URLs follow this format:
```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/[BUCKET]/[FILENAME]
```

### Issue: CORS Error

**Symptom:** Console shows CORS policy error

**Fix:**
1. Go to Storage → Configuration
2. Add your domain to allowed origins
3. For local dev, add: `http://localhost:3000`

## Quick Test

### Test Image Upload and Display

1. **Upload via API:**
```bash
curl -X POST http://localhost:3000/api/upload-image \
  -H "Authorization: Bearer jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag=" \
  -F "image=@test-image.jpg"
```

2. **Check Response:**
Should return URL like:
```json
{
  "success": true,
  "url": "https://eoflankepsvlseejzpqg.supabase.co/storage/v1/object/public/article-images/..."
}
```

3. **Test URL in Browser:**
Paste URL - should show image

4. **Check on Website:**
Create test article with the image

## Alternative: Use Unoptimized Images (Temporary)

If issues persist, you can temporarily disable Next.js image optimization:

**Update `next.config.ts`:**
```typescript
const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Add this line
    remotePatterns: [
      // ... existing patterns
    ],
  },
};
```

**Note:** This bypasses optimization but ensures images display. Not recommended for production.

## Verify Configuration

### Check Next.js Config

File: `next.config.ts`

Should include:
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

### Check Environment Variables

File: `.env.local`

Should have:
```
SUPABASE_URL=https://eoflankepsvlseejzpqg.supabase.co
SUPABASE_ANON_KEY=sb_publishable_Bw09TwRVkV8Ec3KeN2pQnw_AVivC6aM
```

## Still Not Working?

### Debug Steps

1. **Check Browser Console:**
   - F12 → Console tab
   - Look for specific error messages

2. **Check Network Tab:**
   - F12 → Network tab
   - Filter by "Img"
   - See which requests are failing

3. **Check Supabase Logs:**
   - Dashboard → Logs
   - Filter by Storage
   - Look for access errors

4. **Verify Bucket Exists:**
   - Storage → Should see "article-images"
   - Click it → Should see uploaded files

### Contact Points

- Supabase Storage Docs: https://supabase.com/docs/guides/storage
- Next.js Image Docs: https://nextjs.org/docs/app/api-reference/components/image

---

**Most Common Fix:** Make sure the `article-images` bucket is set to **Public** in Supabase Dashboard.
