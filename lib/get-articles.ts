import { articles as staticArticles, Article } from './articles';
import { getAllPosts, transformPostToArticle } from './supabase/queries';

/**
 * Get all articles - merges static articles with database posts
 * This function combines the static articles array with posts from Supabase
 * Articles are sorted by date (newest first)
 */
export async function getArticles(): Promise<Article[]> {
  try {
    // Fetch posts from Supabase
    const dbPosts = await getAllPosts();
    
    // Transform database posts to Article format
    const dbArticles = dbPosts.map(transformPostToArticle);
    
    // Add timestamps to static articles for sorting
    const staticWithTimestamp = staticArticles.map(article => {
      // Parse date string to timestamp (format: "Month Day, Year")
      const dateStr = article.date;
      const timestamp = new Date(dateStr).getTime();
      return { ...article, _timestamp: timestamp };
    });
    
    // Merge and sort all articles by timestamp (newest first)
    const allArticles = [...dbArticles, ...staticWithTimestamp].sort((a, b) => {
      const timeA = (a as any)._timestamp || 0;
      const timeB = (b as any)._timestamp || 0;
      return timeB - timeA; // Descending order (newest first)
    });
    
    // Remove timestamp property before returning
    return allArticles.map(({ _timestamp, ...article }: any) => article);
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Fallback to static articles if database fails
    return staticArticles;
  }
}

/**
 * Get a single article by ID (slug)
 * Checks both static articles and database posts
 */
export async function getArticleById(id: string): Promise<Article | undefined> {
  try {
    // First check static articles
    const staticArticle = staticArticles.find(article => article.id === id);
    if (staticArticle) {
      return staticArticle;
    }
    
    // Then check database by slug
    const { getPostBySlug, transformPostToArticle } = await import('./supabase/queries');
    const dbPost = await getPostBySlug(id);
    
    if (dbPost) {
      return transformPostToArticle(dbPost);
    }
    
    return undefined;
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    // Fallback to static articles only
    return staticArticles.find(article => article.id === id);
  }
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(): Promise<Article[]> {
  const allArticles = await getArticles();
  return allArticles.filter(article => article.featured);
}

/**
 * Get trending articles
 */
export async function getTrendingArticles(): Promise<Article[]> {
  const allArticles = await getArticles();
  return allArticles.filter(article => article.trending);
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const allArticles = await getArticles();
  return allArticles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  );
}
