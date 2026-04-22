# Deployment Guide - BEST Magazine

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

## GitHub Setup

### Initial Push to GitHub

1. Create a new repository on GitHub (don't initialize with README)

2. Initialize and push:
```bash
cd /Users/rahulvaid/CascadeProjects/best-magazine
git init
git add .
git commit -m "Initial commit: BEST Magazine"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/best-magazine.git
git push -u origin main
```

### Continuous Deployment

Once connected to Vercel:
- Every push to `main` branch automatically deploys to production
- Pull requests create preview deployments
- GitHub Actions CI runs on every push

## Pre-Deployment Checklist

- [x] Code review completed (see CODE_REVIEW.md)
- [x] Build tested locally (`npm run build`)
- [x] Error handling added (error.tsx)
- [x] Loading states added (loading.tsx)
- [x] 404 page added (not-found.tsx)
- [x] Vercel configuration added (vercel.json)
- [x] GitHub Actions CI added (.github/workflows/ci.yml)
- [x] .gitignore configured
- [x] README.md updated

## Environment Variables

Currently, no environment variables are required. If you add features that need them:

### Vercel Dashboard
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add your variables
4. Redeploy

### Local Development
Create `.env.local`:
```bash
# Example
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Custom Domain Setup

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning

### DNS Configuration Example:
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Performance Optimization

### Vercel Analytics (Optional)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// In the return statement
<Analytics />
```

### Vercel Speed Insights (Optional)
```bash
npm install @vercel/speed-insights
```

Add to `app/layout.tsx`:
```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

// In the return statement
<SpeedInsights />
```

## Monitoring

### Build Logs
- View in Vercel Dashboard → Deployments → [Your Deployment] → Build Logs

### Runtime Logs
- View in Vercel Dashboard → Deployments → [Your Deployment] → Functions

### Error Tracking (Optional)
Consider adding Sentry:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

## Rollback

If a deployment has issues:
1. Go to Vercel Dashboard → Deployments
2. Find a previous working deployment
3. Click "..." → Promote to Production

## Local Production Testing

Test production build locally:
```bash
npm run build
npm start
```

Visit: http://localhost:3000

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Ensure all dependencies are in package.json
- Test build locally first

### Images Not Loading
- Verify `next.config.ts` has correct remote patterns
- Check Unsplash URLs are accessible

### 404 on Refresh
- Vercel handles this automatically with Next.js
- If using custom server, ensure proper routing

### Slow Performance
- Enable Vercel Analytics to identify bottlenecks
- Check image optimization settings
- Review bundle size

## Post-Deployment

1. **Test all routes:**
   - Homepage
   - Category pages
   - Article pages
   - Static pages

2. **Test on devices:**
   - Desktop
   - Mobile
   - Tablet

3. **Check SEO:**
   - View page source
   - Verify meta tags
   - Test with Google Search Console

4. **Monitor:**
   - Check Vercel Analytics
   - Review error logs
   - Monitor performance

## Useful Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs
```

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **GitHub Issues:** Create issues in your repository

---

**Ready to deploy!** 🚀

Your BEST Magazine is production-ready and optimized for Vercel deployment.
