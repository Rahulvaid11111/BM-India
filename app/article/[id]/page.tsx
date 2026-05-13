import Image from "next/image";
import Link from "next/link";
import { getArticleById, getArticles, getArticlesByCategory } from "@/lib/get-articles";
import { categories } from "@/lib/articles";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/ArticleContent";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { ArticleNavigation } from "@/components/ArticleNavigation";
import { ArticleSchema } from "@/components/ArticleSchema";
import type { Metadata } from "next";

// Use Node.js runtime for dynamic data fetching
export const runtime = 'nodejs';
// Revalidate immediately (always fetch fresh data)
export const revalidate = 0;
// Allow dynamic params for articles not in generateStaticParams
export const dynamicParams = true;

// Generate static params for existing articles at build time
export async function generateStaticParams() {
  try {
    const articles = await getArticles();
    return articles.map((article) => ({
      id: article.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      images: [{ url: article.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log('[ArticlePage] Fetching article with ID:', id);
  
  const article = await getArticleById(id);
  console.log('[ArticlePage] Article found:', article ? article.title : 'NOT FOUND');

  if (!article) {
    console.error('[ArticlePage] Article not found, triggering 404 for ID:', id);
    notFound();
  }

  // Fetch all articles for sidebar
  const allArticles = await getArticles();
  const latestArticles = allArticles.slice(0, 5);
  const trendingArticles = allArticles.filter(a => a.trending).slice(0, 5);
  
  const categoryArticles = await getArticlesByCategory(article.category);
  const relatedArticles = categoryArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  return (
    <>
      <ArticleSchema article={article} />
      <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-8">
          {/* Category */}
          <div className="mb-4">
            <Link
              href={`/category/${article.category.toLowerCase()}`}
              className="text-[11px] font-bold uppercase tracking-wider hover:opacity-70"
            >
              {article.category}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-[42px] leading-[1.15] font-serif font-normal mb-6">
            {article.title}
          </h1>

          {/* Byline */}
          <div className="flex items-center gap-2 text-[13px] mb-8 pb-6 border-b border-gray-300">
            <span className="font-normal">By {article.author}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">{article.date}</span>
          </div>

          {/* Featured Image */}
          <ResponsiveImage
            src={article.image}
            alt={article.title}
            priority
          />

          {/* Article Content */}
          <div className="prose-vogue">
            <p className="text-[20px] leading-[1.6] mb-6 font-serif font-normal">
              {article.excerpt}
            </p>

            {article.content && article.content.trim() !== '' ? (
              <ArticleContent content={article.content} images={article.images} />
            ) : (
              <div className="space-y-5 text-[15px] leading-[1.8] font-light">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This article&apos;s full content is not available. 
                    Please ensure the article content is properly saved in the database.
                  </p>
                </div>
                <p>
                  In the ever-evolving landscape of modern {article.category.toLowerCase()}, 
                  we find ourselves at a fascinating crossroads where tradition meets innovation. 
                  This exploration delves deep into the nuances that make this moment particularly 
                  significant for enthusiasts and newcomers alike.
                </p>

                <p>
                  The attention to detail and craftsmanship evident in today&apos;s offerings speaks 
                  to a broader cultural shift toward appreciation of quality and authenticity. 
                  Industry leaders and emerging talents are pushing boundaries while respecting 
                  the foundations that have defined excellence for generations.
                </p>

                <h2 className="text-[28px] leading-[1.15] font-serif font-normal mt-10 mb-5">
                  A New Perspective
                </h2>

                <p>
                  What sets this moment apart is the convergence of accessibility and exclusivity. 
                  The democratization of information has empowered a new generation of connoisseurs 
                  who demand both transparency and artistry. This dynamic has fostered an environment 
                  where innovation thrives alongside time-honored traditions.
                </p>

                <p>
                  As we look toward the future, it&apos;s clear that the landscape will continue to 
                  evolve in unexpected ways. The key players in this space are not just responding 
                  to trends—they&apos;re actively shaping them, creating a dialogue between creator and 
                  consumer that enriches the entire experience.
                </p>
              </div>
            )}
          </div>

          {/* Article Navigation */}
          <ArticleNavigation currentArticle={article} allArticles={allArticles} />
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          {/* Latest Articles */}
          <div className="mb-10 pb-10 border-b border-gray-200">
            <h3 className="text-[18px] font-bold uppercase tracking-wider mb-6">Latest Articles</h3>
            <div className="space-y-6">
              {latestArticles.map((latest) => (
                <article key={latest.id} className="group flex gap-4">
                  <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden">
                    <Link href={`/article/${latest.id}`}>
                      <Image
                        src={latest.image}
                        alt={latest.title}
                        fill
                        className="object-contain"
                      />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                      {latest.category}
                    </span>
                    <Link href={`/article/${latest.id}`}>
                      <h4 className="text-[14px] leading-[1.4] font-serif font-normal group-hover:opacity-70">
                        {latest.title}
                      </h4>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Trending Articles */}
          {trendingArticles.length > 0 && (
            <div className="mb-10 pb-10 border-b border-gray-200">
              <h3 className="text-[18px] font-bold uppercase tracking-wider mb-6">Trending</h3>
              <div className="space-y-6">
                {trendingArticles.map((trending) => (
                  <article key={trending.id} className="group flex gap-4">
                    <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden">
                      <Link href={`/article/${trending.id}`}>
                        <Image
                          src={trending.image}
                          alt={trending.title}
                          fill
                          className="object-contain"
                        />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                        {trending.category}
                      </span>
                      <Link href={`/article/${trending.id}`}>
                        <h4 className="text-[14px] leading-[1.4] font-serif font-normal group-hover:opacity-70">
                          {trending.title}
                        </h4>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          <div>
            <h3 className="text-[18px] font-bold uppercase tracking-wider mb-6">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase()}`}
                  className="block text-[14px] font-normal hover:opacity-70 py-1"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-5 border-t border-gray-300 py-12">
            <h2 className="text-[28px] font-serif font-normal leading-[1.15] mb-8">More in {article.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
              {relatedArticles.map((related) => (
                <article key={related.id} className="group">
                  <Link href={`/article/${related.id}`}>
                    <div className="relative aspect-[3/2] mb-3 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-[16px] leading-[1.4] font-serif font-normal group-hover:opacity-70">
                      {related.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
        </section>
      )}
      </div>
    </div>
    </>
  );
}
