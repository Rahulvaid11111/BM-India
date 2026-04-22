# Image Upload Guide for BEST Magazine

## Overview

You can now upload images directly to your Supabase Storage instead of using external URLs. Images are stored securely and served with CDN performance.

---

## Setup Instructions

### 1. Create Storage Bucket in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/eoflankepsvlseejzpqg
2. Click **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Enter bucket name: `article-images`
5. Check **Public bucket** (so images are accessible via URL)
6. Click **Create bucket**

### 2. Set Up Storage Policies

1. Go to **SQL Editor** in Supabase
2. Copy the contents of `supabase-storage-setup.sql`
3. Paste and click **Run**

This sets up the necessary permissions for uploading and accessing images.

---

## API Endpoints

### 1. Upload Single Image

**Endpoint:** `POST /api/upload-image`

**Purpose:** Upload a single image and get back the public URL

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Authorization: Bearer YOUR_API_KEY

**Form Data:**
- `image` (file) - The image file to upload

**Example (cURL):**

```bash
curl -X POST http://localhost:3000/api/upload-image \
  -H "Authorization: Bearer jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag=" \
  -F "image=@/path/to/your/image.jpg"
```

**Response:**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "url": "https://eoflankepsvlseejzpqg.supabase.co/storage/v1/object/public/article-images/1234567890-image.jpg",
  "filename": "image.jpg",
  "size": 245678,
  "type": "image/jpeg"
}
```

---

### 2. Create Post with Image Uploads

**Endpoint:** `POST /api/create-post-with-images`

**Purpose:** Create a complete article with uploaded images (cover + additional images)

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Authorization: Bearer YOUR_API_KEY

**Form Data Fields:**

**Required:**
- `title` (text) - Article title
- `content` (text) - HTML content
- `excerpt` (text) - Brief summary
- `category` (text) - One of: Fashion, Beauty, Luxury, Culture, Celebrity, Business, Shop, Local
- `cover_image` (file) - Main hero image

**Optional:**
- `image_1` (file) - Additional image 1
- `image_2` (file) - Additional image 2
- `image_3` (file) - Additional image 3
- `image_4` (file) - Additional image 4
- `author` (text) - Author name (default: "BEST Magazine")
- `featured` (text) - "true" or "false"
- `trending` (text) - "true" or "false"
- `seo_title` (text) - Custom SEO title
- `seo_description` (text) - Meta description
- `seo_keywords` (text) - Comma-separated keywords

**Example (cURL):**

```bash
curl -X POST http://localhost:3000/api/create-post-with-images \
  -H "Authorization: Bearer jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag=" \
  -F "title=Spring Fashion Trends 2026" \
  -F "content=<h2>Introduction</h2><p>This spring brings amazing trends...</p>" \
  -F "excerpt=Discover the hottest fashion trends for spring 2026" \
  -F "category=Fashion" \
  -F "author=Isabella Chen" \
  -F "featured=true" \
  -F "cover_image=@/path/to/cover.jpg" \
  -F "image_1=@/path/to/image1.jpg" \
  -F "image_2=@/path/to/image2.jpg" \
  -F "image_3=@/path/to/image3.jpg" \
  -F "seo_keywords=fashion,spring,trends,2026"
```

**Response:**

```json
{
  "success": true,
  "message": "Post created successfully with uploaded images",
  "post": { ...post data... },
  "slug": "spring-fashion-trends-2026",
  "url": "/article/spring-fashion-trends-2026",
  "images": {
    "cover": "https://...supabase.co/storage/.../cover.jpg",
    "additional": [
      "https://...supabase.co/storage/.../image1.jpg",
      "https://...supabase.co/storage/.../image2.jpg",
      "https://...supabase.co/storage/.../image3.jpg"
    ]
  }
}
```

---

## Usage Examples

### JavaScript/Node.js

```javascript
// Upload single image
async function uploadImage(imagePath) {
  const formData = new FormData();
  const imageFile = await fs.readFile(imagePath);
  const blob = new Blob([imageFile]);
  
  formData.append('image', blob, 'image.jpg');

  const response = await fetch('http://localhost:3000/api/upload-image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.API_SECRET_KEY}`
    },
    body: formData
  });

  const result = await response.json();
  return result.url;
}

// Create post with images
async function createPostWithImages() {
  const formData = new FormData();
  
  // Add text fields
  formData.append('title', 'My Article Title');
  formData.append('content', '<h2>Content</h2><p>Article text...</p>');
  formData.append('excerpt', 'Brief summary');
  formData.append('category', 'Fashion');
  formData.append('author', 'Author Name');
  formData.append('featured', 'true');
  
  // Add images
  const coverImage = await fs.readFile('./cover.jpg');
  formData.append('cover_image', new Blob([coverImage]), 'cover.jpg');
  
  const image1 = await fs.readFile('./image1.jpg');
  formData.append('image_1', new Blob([image1]), 'image1.jpg');
  
  const response = await fetch('http://localhost:3000/api/create-post-with-images', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.API_SECRET_KEY}`
    },
    body: formData
  });

  return await response.json();
}
```

### Python

```python
import requests

# Upload single image
def upload_image(image_path):
    url = "http://localhost:3000/api/upload-image"
    headers = {
        "Authorization": f"Bearer {os.environ['API_SECRET_KEY']}"
    }
    
    with open(image_path, 'rb') as f:
        files = {'image': f}
        response = requests.post(url, headers=headers, files=files)
    
    return response.json()['url']

# Create post with images
def create_post_with_images():
    url = "http://localhost:3000/api/create-post-with-images"
    headers = {
        "Authorization": f"Bearer {os.environ['API_SECRET_KEY']}"
    }
    
    data = {
        'title': 'My Article Title',
        'content': '<h2>Content</h2><p>Article text...</p>',
        'excerpt': 'Brief summary',
        'category': 'Fashion',
        'author': 'Author Name',
        'featured': 'true',
        'seo_keywords': 'fashion,trends,style'
    }
    
    files = {
        'cover_image': open('./cover.jpg', 'rb'),
        'image_1': open('./image1.jpg', 'rb'),
        'image_2': open('./image2.jpg', 'rb'),
        'image_3': open('./image3.jpg', 'rb'),
    }
    
    response = requests.post(url, headers=headers, data=data, files=files)
    return response.json()
```

---

## Image Requirements

### Supported Formats
- JPEG/JPG
- PNG
- GIF
- WebP

### File Size
- Maximum: 5MB per image
- Recommended: 1-2MB for optimal loading

### Recommended Dimensions
- **Cover Image:** 1600x900px (16:9 ratio)
- **Additional Images:** 1200x800px or similar
- Images are served as-is (no automatic resizing)

---

## Workflow Options

### Option 1: Upload Images First, Then Create Post

```bash
# 1. Upload cover image
COVER_URL=$(curl -X POST http://localhost:3000/api/upload-image \
  -H "Authorization: Bearer YOUR_KEY" \
  -F "image=@cover.jpg" | jq -r '.url')

# 2. Upload additional images
IMAGE1_URL=$(curl -X POST http://localhost:3000/api/upload-image \
  -H "Authorization: Bearer YOUR_KEY" \
  -F "image=@image1.jpg" | jq -r '.url')

# 3. Create post with URLs
curl -X POST http://localhost:3000/api/create-post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d "{
    \"title\": \"My Article\",
    \"content\": \"<p>Content...</p>\",
    \"excerpt\": \"Summary\",
    \"category\": \"Fashion\",
    \"cover_image\": \"$COVER_URL\",
    \"images\": [\"$IMAGE1_URL\"]
  }"
```

### Option 2: Upload Everything Together

```bash
# Single request with all images
curl -X POST http://localhost:3000/api/create-post-with-images \
  -H "Authorization: Bearer YOUR_KEY" \
  -F "title=My Article" \
  -F "content=<p>Content...</p>" \
  -F "excerpt=Summary" \
  -F "category=Fashion" \
  -F "cover_image=@cover.jpg" \
  -F "image_1=@image1.jpg" \
  -F "image_2=@image2.jpg"
```

**Recommended:** Option 2 is simpler and faster for most use cases.

---

## Storage Management

### View Uploaded Images

1. Go to Supabase Dashboard > Storage
2. Click on `article-images` bucket
3. Browse all uploaded images

### Delete Images

Images can be deleted via the Supabase Dashboard or programmatically using the storage helper functions.

### Storage Limits

- **Free tier:** 1GB storage
- **Pro tier:** 100GB storage
- Monitor usage in Supabase Dashboard > Settings > Usage

---

## Security Notes

1. **API Key Protection:** Never expose your API_SECRET_KEY in client-side code
2. **File Validation:** API validates file types and sizes
3. **Public Access:** Images in the bucket are publicly accessible via URL
4. **Rate Limiting:** Consider implementing rate limits for production

---

## Troubleshooting

### "Bucket not found" Error
- Ensure you created the `article-images` bucket in Supabase
- Check bucket name is exactly `article-images`

### "Permission denied" Error
- Run the storage policies SQL from `supabase-storage-setup.sql`
- Verify RLS policies are set up correctly

### "File too large" Error
- Maximum file size is 5MB
- Compress images before uploading

### Images Not Loading
- Check that bucket is set to "Public"
- Verify the URL is accessible in a browser
- Check CORS settings if accessing from different domain

---

## Migration from External URLs

If you have existing articles with external URLs (Unsplash, etc.), they will continue to work. You can:

1. **Keep using external URLs** - The original `/api/create-post` endpoint still works
2. **Mix both** - Use uploaded images for new posts, keep old URLs for existing posts
3. **Migrate gradually** - Upload images and update posts over time

---

## Next Steps

1. ✅ Create the `article-images` bucket in Supabase
2. ✅ Run the storage policies SQL
3. ✅ Test uploading a single image
4. ✅ Test creating a post with uploaded images
5. ✅ Update your content creation workflow

**Your image upload system is ready to use!** 🎉
