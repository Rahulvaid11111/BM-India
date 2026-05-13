export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
  trending?: boolean;
  content?: string;
  images?: string[];
}

export const categories = [
  "Fashion",
  "Beauty",
  "Luxury",
  "Culture",
  "Celebrity",
  "Watches",
  "Fragrances",
  "Automobile",
  "Best 10"
];

export const subcategories: Record<string, string[]> = {
  Fashion: ["Trends", "Street Style", "Designers", "Runway", "Seasonal", "Sustainable"],
  Beauty: ["Makeup", "Skincare", "Hair", "Wellness", "Expert Tips"],
  Luxury: ["Watches", "Cars", "Hotels", "Experiences"],
  Culture: ["Film & TV", "Music", "Art", "Books", "Opinion"],
  Celebrity: ["Interviews", "Red Carpet", "Style"],
  Watches: ["Dive", "Dress", "Complications", "Collector"],
  Fragrances: ["New Launches", "Classics", "Unisex", "Niche"],
  Automobile: ["Supercars", "Concept", "Vintage", "Electric"],
  "Best 10": ["Fashion", "Beauty", "Luxury", "Lifestyle"]
};

// Static articles removed - now showing only articles from Supabase database
export const articles: Article[] = [];

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured);
}

export function getTrendingArticles(): Article[] {
  return articles.filter(article => article.trending);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}
