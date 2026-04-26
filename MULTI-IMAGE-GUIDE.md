# Multi-Image Article Display Guide

## Overview

Your BEST Magazine now intelligently displays 1-20 images throughout articles using dynamic placement strategies including inline images, grids, and sliders.

## How It Works

### Image Placement Logic

The system automatically determines the best way to display images based on quantity:

| Number of Images | Display Strategy |
|-----------------|------------------|
| **1 image** | Single inline image after first paragraph |
| **2 images** | Two inline images at different positions in article |
| **3-4 images** | Grid gallery (2x2) after first section |
| **5-8 images** | Interactive slider with navigation |
| **9-20 images** | Split into two sliders at different positions |

### Display Variants

#### 1. **Inline Images**
- Single images placed between paragraphs
- Full-width display
- 16:9 aspect ratio
- Used for 1-2 images

#### 2. **Grid Gallery**
- 2-column grid layout
- 4:3 aspect ratio per image
- Hover zoom effect
- Used for 3-4 images

#### 3. **Slider/Carousel**
- Interactive image slider
- Navigation arrows (appear on hover)
- Dot indicators
- Image counter (e.g., "3 / 8")
- Keyboard navigation support
- Used for 5+ images

## Make.com Integration

### Uploading Multiple Images

When creating articles via Make.com, upload images as:

```
cover_image: (file) - Main article image
image_1: (file) - Additional image 1
image_2: (file) - Additional image 2
image_3: (file) - Additional image 3
...
image_10: (file) - Additional image 10
```

The API supports up to **10 additional images** (plus cover image = 11 total).

### Example Make.com Setup

**HTTP Module - Multipart Form Data:**

```
title: "Spring Fashion Trends 2026"
content: "<h2>Introduction</h2><p>Article content...</p>"
excerpt: "Brief summary"
category: "Fashion"
cover_image: {{downloadedImage0.data}}
image_1: {{downloadedImage1.data}}
image_2: {{downloadedImage2.data}}
image_3: {{downloadedImage3.data}}
image_4: {{downloadedImage4.data}}
image_5: {{downloadedImage5.data}}
```

## Content Structure

### HTML Content Format

Your article content should be well-structured HTML:

```html
<h2>Section Title</h2>
<p>First paragraph of content...</p>
<p>Second paragraph with more details...</p>

<h3>Subsection</h3>
<p>More content here...</p>

<p>Additional paragraphs...</p>
```

**Images are automatically inserted between sections based on the placement logic.**

## Display Examples

### Example 1: Article with 1 Image

```
[Cover Image - Full Width]

Excerpt paragraph...

Content paragraph 1...

[Additional Image 1 - Inline]

Content paragraph 2...
Content paragraph 3...
```

### Example 2: Article with 4 Images

```
[Cover Image - Full Width]

Excerpt paragraph...

Content paragraph 1...

[Grid Gallery - 2x2]
┌─────────┬─────────┐
│ Image 1 │ Image 2 │
├─────────┼─────────┤
│ Image 3 │ Image 4 │
└─────────┴─────────┘

Content paragraph 2...
Content paragraph 3...
```

### Example 3: Article with 8 Images

```
[Cover Image - Full Width]

Excerpt paragraph...

Content paragraph 1...

[Interactive Slider]
┌──────────────────────┐
│  ← [Image 1/8]  →   │
│  ● ○ ○ ○ ○ ○ ○ ○   │
└──────────────────────┘

Content paragraph 2...
Content paragraph 3...
```

### Example 4: Article with 16 Images

```
[Cover Image - Full Width]

Excerpt paragraph...

Content paragraph 1...

[Slider 1 - Images 1-8]
┌──────────────────────┐
│  ← [Image 1/8]  →   │
└──────────────────────┘

Content paragraph 2...
Content paragraph 3...

[Slider 2 - Images 9-16]
┌──────────────────────┐
│  ← [Image 1/8]  →   │
└──────────────────────┘

Content paragraph 4...
```

## Slider Features

### Interactive Controls

- **Navigation Arrows:** Click left/right arrows to navigate
- **Dot Indicators:** Click any dot to jump to that image
- **Image Counter:** Shows current position (e.g., "3 / 8")
- **Keyboard Support:** Use arrow keys to navigate
- **Touch Support:** Swipe on mobile devices

### Visual Features

- **Smooth Transitions:** Fade between images
- **Hover Effects:** Controls appear on hover
- **Responsive Design:** Adapts to all screen sizes
- **Loading Optimization:** First image loads with priority

## Technical Details

### Components Created

1. **`ImageGallery.tsx`** - Reusable gallery component
   - Supports slider, grid, and inline variants
   - Client-side interactivity
   - Accessible navigation

2. **`ArticleContent.tsx`** - Content parser and image placer
   - Splits HTML content into sections
   - Determines optimal image placement
   - Renders content with embedded galleries

### Updated Files

- `lib/articles.ts` - Added `content` and `images` fields to Article interface
- `lib/supabase/queries.ts` - Updated transformer to include content and images
- `app/article/[id]/page.tsx` - Uses ArticleContent component

## Best Practices

### For Content Creators

1. **Write structured content** with clear headings (h2, h3)
2. **Use paragraphs** to create natural break points for images
3. **Upload high-quality images** (recommended: 1920x1080 or higher)
4. **Optimize image sizes** (max 5MB per image)
5. **Use descriptive filenames** for better organization

### For Make.com Automation

1. **Download images first** before uploading to API
2. **Maintain consistent naming** (image_1, image_2, etc.)
3. **Handle errors gracefully** if image downloads fail
4. **Test with different image counts** (1, 4, 8, 16)
5. **Verify uploads** in Supabase Storage

## Image Requirements

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### Size Limits
- **Per image:** 5MB maximum
- **Total per article:** 50MB recommended

### Recommended Dimensions
- **Cover image:** 1920x1080 (16:9)
- **Additional images:** 1600x900 or higher
- **Minimum:** 800x600

## Troubleshooting

### Images Not Displaying

**Check:**
1. Images uploaded to Supabase Storage successfully
2. `images` array in database contains valid URLs
3. URLs start with `https://eoflankepsvlseejzpqg.supabase.co/storage/`
4. Browser console for image loading errors

### Slider Not Working

**Check:**
1. Multiple images exist in the array
2. JavaScript enabled in browser
3. No console errors
4. Component is client-side (`'use client'` directive)

### Wrong Display Variant

**Verify:**
- Image count matches expected variant
- ArticleContent component receiving images array
- Content has sufficient paragraphs for placement

## Customization

### Changing Placement Logic

Edit `components/ArticleContent.tsx`:

```typescript
const getImagePlacement = () => {
  if (images.length === 1) {
    // Customize single image placement
    return [{ position: 1, images: images, variant: 'inline' }];
  }
  // Add your custom logic...
}
```

### Styling Galleries

Edit `components/ImageGallery.tsx`:

```typescript
// Modify grid layout
<div className="my-8 grid grid-cols-3 gap-4"> // Change to 3 columns

// Modify slider aspect ratio
<div className="relative aspect-[21/9] overflow-hidden"> // Wider ratio
```

## Performance Optimization

### Automatic Optimizations

- **Next.js Image Component:** Automatic optimization and lazy loading
- **Priority Loading:** First slider image loads with priority
- **Responsive Images:** Serves appropriate sizes per device
- **CDN Delivery:** Supabase Storage uses CDN

### Manual Optimizations

1. **Compress images** before uploading (use tools like TinyPNG)
2. **Use WebP format** for better compression
3. **Limit to 10-12 images** per article for best performance
4. **Test on mobile** to ensure smooth scrolling

## Future Enhancements

Potential features to add:

- [ ] Lightbox/fullscreen view on image click
- [ ] Image captions and credits
- [ ] Lazy loading for off-screen images
- [ ] Auto-play slider option
- [ ] Thumbnail navigation
- [ ] Pinch-to-zoom on mobile
- [ ] Social sharing for individual images

---

**Your multi-image article system is ready!** 🎨📸

Articles with 1-20 images will automatically display beautifully with the optimal layout.
