# BEST Magazine API Documentation

## Backend API for Automated Article Publishing

This document explains how to use the API to create articles programmatically.

---

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase-schema.sql`
3. Get your project credentials:
   - Go to Settings > API
   - Copy the Project URL
   - Copy the `anon` public key

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
API_SECRET_KEY=your-secret-key-here
```

**Important:** Generate a strong API secret key. You can use:
```bash
openssl rand -base64 32
```

### 3. Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

---

## API Endpoint

### Create Post

**Endpoint:** `POST /api/create-post`

**Authentication:** Bearer token in Authorization header

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_SECRET_KEY
```

**Request Body:**

```json
{
  "title": "Your Article Title",
  "content": "<p>Full HTML content of the article...</p>",
  "excerpt": "Brief description or summary",
  "cover_image": "https://images.unsplash.com/photo-...",
  "images": [
    "https://images.unsplash.com/photo-1...",
    "https://images.unsplash.com/photo-2...",
    "https://images.unsplash.com/photo-3..."
  ],
  "author": "Author Name",
  "category": "Fashion",
  "featured": false,
  "trending": false,
  "published": true,
  "seo_title": "Custom SEO Title (optional)",
  "seo_description": "Meta description for SEO (optional)",
  "seo_keywords": ["keyword1", "keyword2", "keyword3"]
}
```

**Required Fields:**
- `title` (string)
- `content` (string, HTML)
- `excerpt` (string)
- `cover_image` (string, URL)
- `category` (string, must be one of: Fashion, Beauty, Luxury, Culture, Celebrity, Business, Shop, Local)

**Optional Fields:**
- `images` (array of URLs, 3-4 recommended)
- `author` (string, defaults to "BEST Magazine")
- `featured` (boolean, defaults to false)
- `trending` (boolean, defaults to false)
- `published` (boolean, defaults to true)
- `seo_title` (string, defaults to title)
- `seo_description` (string, defaults to excerpt)
- `seo_keywords` (array of strings)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "post": {
    "id": "uuid",
    "title": "Your Article Title",
    "slug": "your-article-title",
    ...
  },
  "slug": "your-article-title",
  "url": "/article/your-article-title"
}
```

**Error Responses:**

- **400 Bad Request:** Missing required fields or invalid data
- **401 Unauthorized:** Invalid or missing API key
- **409 Conflict:** Post with this slug already exists
- **500 Internal Server Error:** Database or server error

---

## Usage Examples

### cURL

```bash
curl -X POST https://your-domain.com/api/create-post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SECRET_KEY" \
  -d '{
    "title": "Spring Fashion Trends 2026",
    "content": "<h2>Introduction</h2><p>This spring brings exciting new trends...</p>",
    "excerpt": "Discover the hottest fashion trends for spring 2026",
    "cover_image": "https://images.unsplash.com/photo-1234567890",
    "images": [
      "https://images.unsplash.com/photo-1111111111",
      "https://images.unsplash.com/photo-2222222222",
      "https://images.unsplash.com/photo-3333333333"
    ],
    "category": "Fashion",
    "author": "Isabella Chen",
    "featured": true,
    "seo_keywords": ["fashion", "spring", "trends", "2026"]
  }'
```

### JavaScript/Node.js

```javascript
const response = await fetch('https://your-domain.com/api/create-post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.API_SECRET_KEY}`
  },
  body: JSON.stringify({
    title: 'Spring Fashion Trends 2026',
    content: '<h2>Introduction</h2><p>This spring brings exciting new trends...</p>',
    excerpt: 'Discover the hottest fashion trends for spring 2026',
    cover_image: 'https://images.unsplash.com/photo-1234567890',
    images: [
      'https://images.unsplash.com/photo-1111111111',
      'https://images.unsplash.com/photo-2222222222',
      'https://images.unsplash.com/photo-3333333333'
    ],
    category: 'Fashion',
    author: 'Isabella Chen',
    featured: true,
    seo_keywords: ['fashion', 'spring', 'trends', '2026']
  })
});

const result = await response.json();
console.log(result);
```

### Python

```python
import requests
import os

url = "https://your-domain.com/api/create-post"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {os.environ['API_SECRET_KEY']}"
}
data = {
    "title": "Spring Fashion Trends 2026",
    "content": "<h2>Introduction</h2><p>This spring brings exciting new trends...</p>",
    "excerpt": "Discover the hottest fashion trends for spring 2026",
    "cover_image": "https://images.unsplash.com/photo-1234567890",
    "images": [
        "https://images.unsplash.com/photo-1111111111",
        "https://images.unsplash.com/photo-2222222222",
        "https://images.unsplash.com/photo-3333333333"
    ],
    "category": "Fashion",
    "author": "Isabella Chen",
    "featured": True,
    "seo_keywords": ["fashion", "spring", "trends", "2026"]
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```

---

## Content Guidelines

### HTML Content Format

The `content` field accepts HTML. Recommended structure:

```html
<h2>Section Heading</h2>
<p>Paragraph text with <strong>bold</strong> and <em>italic</em> formatting.</p>

<h3>Subsection</h3>
<p>More content here...</p>

<blockquote>
  <p>Quote text here</p>
</blockquote>

<ul>
  <li>List item 1</li>
  <li>List item 2</li>
</ul>

<p>You can also include images in the content:</p>
<img src="https://..." alt="Description" />
```

### Images

- **Cover Image:** Main hero image (recommended: 1600x900px or 16:9 ratio)
- **Additional Images:** 3-4 images to support the article content
- Use high-quality images from Unsplash, your CDN, or image hosting service
- All images should be HTTPS URLs

### SEO Best Practices

1. **SEO Title:** 50-60 characters, include main keyword
2. **SEO Description:** 150-160 characters, compelling summary
3. **Keywords:** 3-5 relevant keywords
4. **Content:** Use proper heading hierarchy (h2, h3)
5. **Images:** Include descriptive alt text

---

## Slug Generation

Slugs are automatically generated from the title:
- Converted to lowercase
- Spaces replaced with hyphens
- Special characters removed
- Must be unique (duplicate titles will be rejected)

Example: "Spring Fashion Trends 2026" → "spring-fashion-trends-2026"

---

## Categories

Valid categories (case-sensitive):
- Fashion
- Beauty
- Luxury
- Culture
- Celebrity
- Business
- Shop
- Local

---

## Security Notes

1. **Never expose your API_SECRET_KEY** in client-side code
2. Use environment variables for all credentials
3. Rotate your API key periodically
4. Monitor API usage for suspicious activity
5. Consider adding rate limiting for production use

---

## Troubleshooting

### "Unauthorized" Error
- Check that your API key is correct
- Ensure the Authorization header format is: `Bearer YOUR_KEY`
- Verify the key is set in environment variables

### "Validation Failed" Error
- Check that all required fields are present
- Verify the category is valid
- Ensure URLs are properly formatted

### "Duplicate Slug" Error
- A post with the same title already exists
- Modify the title slightly to make it unique

### Database Connection Issues
- Verify Supabase credentials in .env.local
- Check that the posts table exists
- Ensure Row Level Security policies are configured

---

## Support

For issues or questions:
1. Check the console logs for detailed error messages
2. Verify environment variables are set correctly
3. Test the Supabase connection directly
4. Review the API response for specific error details
