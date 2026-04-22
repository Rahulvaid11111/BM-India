# BEST Magazine

**The number 1 digital magazine covering the best in lifestyle, culture, fashion, beauty, timepieces, celebrities, podcasts, jewellery, automotive and around the world.**

A modern, premium digital magazine website inspired by Vogue, built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, elegant layout inspired by leading fashion magazines
- **Responsive**: Fully responsive design that works on all devices
- **Category Pages**: Dedicated pages for Fashion, Beauty, Lifestyle, Culture, Celebrities, Timepieces, Jewellery, Automotive, and Podcasts
- **Article System**: Dynamic article pages with related content
- **Featured Content**: Highlighted trending and featured articles on the homepage
- **SEO Optimized**: Built with Next.js for optimal performance and SEO

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Typography**: Playfair Display (headings) & Inter (body)
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd best-magazine
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
best-magazine/
├── app/                      # Next.js app directory
│   ├── article/[id]/        # Article detail pages
│   ├── category/[slug]/     # Category pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   └── ArticleCard.tsx      # Article card component
├── lib/                     # Utility functions and data
│   ├── articles.ts          # Article data and helpers
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Available Categories

- Fashion
- Beauty
- Lifestyle
- Culture
- Celebrities
- Timepieces
- Jewellery
- Automotive
- Podcasts

## Build for Production

```bash
npm run build
npm start
```

## Customization

### Adding New Articles

Edit `lib/articles.ts` to add new articles to the magazine.

### Changing Colors/Styles

Modify `app/globals.css` and Tailwind classes throughout the components.

### Adding New Categories

Update the `categories` array in `lib/articles.ts`.

## Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/best-magazine)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Deploy Steps

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/best-magazine.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click Deploy (Vercel auto-detects Next.js)

3. **Done!** Your site will be live at `your-project.vercel.app`

## Documentation

- **[CODE_REVIEW.md](./CODE_REVIEW.md)** - Comprehensive code review and quality assessment
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment guide for GitHub and Vercel

## License

© 2026 BEST Magazine. All rights reserved. | bestmagazine.ca
