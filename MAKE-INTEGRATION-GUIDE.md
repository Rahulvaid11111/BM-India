# Make.com Integration Guide for BEST Magazine

## Overview

Your BEST Magazine API is already fully set up and ready to integrate with Make.com (formerly Integromat) and other automation platforms. This guide shows you how to automatically create blog posts from external services.

---

## ✅ What's Already Set Up

You have **3 API endpoints** ready to use:

1. **`/api/create-post`** - Create posts with image URLs
2. **`/api/create-post-with-images`** - Create posts with uploaded images
3. **`/api/upload-image`** - Upload individual images

**Authentication:** All endpoints use Bearer token authentication with your API key:
```
Authorization: Bearer jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag=
```

---

## 🔧 Make.com Setup

### Step 1: Create a New Scenario

1. Go to [make.com](https://www.make.com)
2. Click **Create a new scenario**
3. Choose your trigger (e.g., Google Sheets, Airtable, RSS Feed, Webhook, etc.)

### Step 2: Add HTTP Module

1. Click the **+** button to add a module
2. Search for **HTTP**
3. Select **Make a request**

### Step 3: Configure HTTP Request

**URL:**
```
https://your-domain.vercel.app/api/create-post
```
(Replace with your actual domain. For local testing: `http://localhost:3000/api/create-post`)

**Method:** `POST`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag="
}
```

**Body Type:** `Raw`

**Request content:**
```json
{
  "title": "{{title}}",
  "content": "{{content}}",
  "excerpt": "{{excerpt}}",
  "cover_image": "{{cover_image}}",
  "images": ["{{image1}}", "{{image2}}", "{{image3}}"],
  "category": "{{category}}",
  "author": "{{author}}",
  "featured": {{featured}},
  "trending": {{trending}},
  "seo_keywords": ["{{keyword1}}", "{{keyword2}}", "{{keyword3}}"]
}
```

Replace `{{variables}}` with data from your trigger module.

---

## 📋 Common Make.com Scenarios

### Scenario 1: Google Sheets → Blog Post

**Trigger:** New row in Google Sheets

**Columns:**
- Title
- Content (HTML)
- Excerpt
- Cover Image URL
- Category
- Author

**HTTP Module Setup:**
```json
{
  "title": "{{1.Title}}",
  "content": "{{1.Content}}",
  "excerpt": "{{1.Excerpt}}",
  "cover_image": "{{1.Cover Image URL}}",
  "category": "{{1.Category}}",
  "author": "{{1.Author}}"
}
```

### Scenario 2: Airtable → Blog Post

**Trigger:** New record in Airtable

**HTTP Module Setup:**
```json
{
  "title": "{{1.fields.title}}",
  "content": "{{1.fields.content}}",
  "excerpt": "{{1.fields.excerpt}}",
  "cover_image": "{{1.fields.cover_image}}",
  "images": {{1.fields.images}},
  "category": "{{1.fields.category}}",
  "author": "{{1.fields.author}}",
  "featured": {{1.fields.featured}},
  "seo_keywords": {{1.fields.keywords}}
}
```

### Scenario 3: RSS Feed → Blog Post

**Trigger:** Watch RSS Feed Items

**Modules:**
1. RSS: Watch RSS Feed Items
2. HTTP: Make a request (to your API)

**HTTP Module Setup:**
```json
{
  "title": "{{1.title}}",
  "content": "{{1.description}}",
  "excerpt": "{{substring(1.description; 0; 200)}}",
  "cover_image": "{{1.enclosure.url}}",
  "category": "Culture",
  "author": "{{1.author}}"
}
```

### Scenario 4: Webhook → Blog Post

**Trigger:** Custom Webhook

1. Create a webhook in Make.com
2. Get the webhook URL
3. Send POST requests to that URL with your data
4. Make.com forwards to your API

**Webhook Payload Example:**
```json
{
  "title": "Article Title",
  "content": "<h2>Content</h2><p>Text...</p>",
  "excerpt": "Summary",
  "cover_image": "https://...",
  "category": "Fashion"
}
```

---

## 🔐 Security Best Practices

### 1. Environment Variables in Make.com

Store your API key as a **Data Store** or **Variable**:

1. Go to **Data Stores** in Make.com
2. Create a new data store: `API_Credentials`
3. Add a record with your API key
4. Reference it in scenarios: `{{datastore.API_Credentials.api_key}}`

### 2. Use Production URL

For production, use your Vercel deployment URL:
```
https://best-magazine.vercel.app/api/create-post
```

### 3. Error Handling

Add error handling in Make.com:

1. Click the wrench icon on HTTP module
2. Enable **Error handling**
3. Add a **Break** or **Rollback** module for failures

---

## 📝 Field Mapping Reference

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Article title | "Spring Fashion Trends 2026" |
| `content` | string | HTML content | `<h2>Intro</h2><p>Text...</p>` |
| `excerpt` | string | Brief summary | "Discover the hottest trends..." |
| `cover_image` | string | Image URL | "https://images.unsplash.com/..." |
| `category` | string | Must be valid category | "Fashion", "Beauty", "Luxury", etc. |

### Optional Fields

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `images` | array | Additional image URLs | `[]` |
| `author` | string | Author name | "BEST Magazine" |
| `featured` | boolean | Featured article | `false` |
| `trending` | boolean | Trending article | `false` |
| `published` | boolean | Publish immediately | `true` |
| `seo_title` | string | Custom SEO title | Same as title |
| `seo_description` | string | Meta description | Same as excerpt |
| `seo_keywords` | array | SEO keywords | `[]` |

### Valid Categories

- Fashion
- Beauty
- Luxury
- Culture
- Celebrity
- Business
- Shop
- Local

---

## 🧪 Testing Your Integration

### Test with Make.com

1. Create a simple scenario with a **Webhook** trigger
2. Add your HTTP module
3. Click **Run once**
4. Send a test webhook with sample data
5. Check the response in Make.com
6. Verify the article appears on your website

### Test Payload

```json
{
  "title": "Test Article from Make.com",
  "content": "<h2>Introduction</h2><p>This is a test article created automatically via Make.com integration.</p>",
  "excerpt": "Testing the Make.com integration with BEST Magazine API",
  "cover_image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  "category": "Fashion",
  "author": "Automation Bot"
}
```

### Expected Response

```json
{
  "success": true,
  "message": "Post created successfully",
  "slug": "test-article-from-make-com",
  "url": "/article/test-article-from-make-com"
}
```

---

## 🚀 Advanced Scenarios

### Scenario: AI Content Generation → Blog Post

**Flow:**
1. Trigger: New topic in Google Sheets
2. OpenAI: Generate article content
3. DALL-E: Generate cover image
4. Your API: Create blog post

**Modules:**
1. Google Sheets: Watch Rows
2. OpenAI: Create Completion (GPT-4)
3. OpenAI: Create Image (DALL-E)
4. HTTP: POST to `/api/create-post`

### Scenario: Social Media → Blog Post

**Flow:**
1. Trigger: New Instagram post
2. Download image
3. Upload to your storage
4. Create blog post

**Modules:**
1. Instagram: Watch Posts
2. HTTP: Download image
3. HTTP: POST to `/api/upload-image`
4. HTTP: POST to `/api/create-post` (with uploaded URL)

### Scenario: Scheduled Publishing

**Flow:**
1. Trigger: Schedule (daily at 9 AM)
2. Airtable: Get unpublished posts
3. Your API: Create posts
4. Airtable: Mark as published

---

## 🔄 Zapier Integration (Alternative)

If you prefer Zapier over Make.com:

### Setup

1. Create a new Zap
2. Choose your trigger app
3. Add **Webhooks by Zapier** action
4. Select **POST**
5. Configure:
   - **URL:** `https://your-domain.vercel.app/api/create-post`
   - **Payload Type:** JSON
   - **Data:** Map your fields
   - **Headers:**
     ```
     Content-Type: application/json
     Authorization: Bearer jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag=
     ```

---

## 📊 Monitoring & Logs

### View Created Posts

1. **Supabase Dashboard:**
   - Go to Table Editor > posts
   - See all created posts with timestamps

2. **Website:**
   - Visit your homepage
   - Latest posts appear first

### API Logs

**Vercel:**
1. Go to your Vercel project
2. Click **Logs**
3. Filter by `/api/create-post`
4. See all API requests and responses

**Make.com:**
1. Go to **Scenario History**
2. View execution logs
3. See request/response data

---

## ❌ Troubleshooting

### "Unauthorized" Error

**Problem:** 401 Unauthorized response

**Solutions:**
- Check Authorization header format: `Bearer YOUR_KEY`
- Verify API key is correct
- Ensure no extra spaces in the header

### "Validation Failed" Error

**Problem:** 400 Bad Request with validation errors

**Solutions:**
- Check all required fields are present
- Verify category is valid (Fashion, Beauty, etc.)
- Ensure content is properly formatted HTML

### "Duplicate Slug" Error

**Problem:** 409 Conflict - post already exists

**Solutions:**
- Change the title to make it unique
- Check if post was already created
- Add timestamp to title for uniqueness

### Posts Not Appearing

**Problem:** API succeeds but post doesn't show

**Solutions:**
- Check `published` field is `true`
- Verify Supabase connection
- Clear browser cache and refresh
- Check Supabase Table Editor

---

## 📱 Mobile App Integration

You can also use the API from mobile apps:

### iOS (Swift)

```swift
let url = URL(string: "https://your-domain.com/api/create-post")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.setValue("Bearer YOUR_API_KEY", forHTTPHeaderField: "Authorization")

let body: [String: Any] = [
    "title": "Article Title",
    "content": "<p>Content...</p>",
    "excerpt": "Summary",
    "cover_image": "https://...",
    "category": "Fashion"
]

request.httpBody = try? JSONSerialization.data(withJSONObject: body)
```

### Android (Kotlin)

```kotlin
val client = OkHttpClient()
val json = JSONObject().apply {
    put("title", "Article Title")
    put("content", "<p>Content...</p>")
    put("excerpt", "Summary")
    put("cover_image", "https://...")
    put("category", "Fashion")
}

val request = Request.Builder()
    .url("https://your-domain.com/api/create-post")
    .addHeader("Content-Type", "application/json")
    .addHeader("Authorization", "Bearer YOUR_API_KEY")
    .post(json.toString().toRequestBody("application/json".toMediaType()))
    .build()
```

---

## 🎯 Quick Start Checklist

- [ ] Get your API key: `jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag=`
- [ ] Get your API URL: `https://your-domain.vercel.app/api/create-post`
- [ ] Create Make.com account
- [ ] Create a new scenario
- [ ] Add HTTP module
- [ ] Configure headers and body
- [ ] Test with sample data
- [ ] Verify post appears on website
- [ ] Set up error handling
- [ ] Enable scenario

---

## 📚 Additional Resources

- **API Documentation:** See `README-API.md`
- **Image Upload Guide:** See `IMAGE-UPLOAD-GUIDE.md`
- **Setup Guide:** See `SETUP-GUIDE.md`
- **Make.com Docs:** https://www.make.com/en/help/modules/http
- **Zapier Webhooks:** https://zapier.com/apps/webhook/integrations

---

**Your API is ready for automation!** 🚀

Connect it to Make.com, Zapier, n8n, or any service that can make HTTP requests.
