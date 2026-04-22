#!/bin/bash

echo "Testing BEST Magazine API..."
echo ""

curl -X POST http://localhost:3000/api/create-post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer jj1gnIdP/87BlZBF2VDTVOGKnUQJ9cBIwXQ4L/blRag=" \
  -d '{
    "title": "Test Article - Spring Fashion 2026",
    "content": "<h2>Introduction</h2><p>This is a test article to verify the API is working correctly.</p><h3>Section 1</h3><p>Content goes here...</p>",
    "excerpt": "Testing the automated article publishing API with Supabase backend",
    "cover_image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "images": [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
    ],
    "category": "Fashion",
    "author": "Test Author",
    "featured": true,
    "seo_keywords": ["test", "fashion", "api"]
  }'

echo ""
echo ""
echo "Test complete!"
