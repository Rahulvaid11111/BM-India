import Image from "next/image";
import Link from "next/link";
import { getArticleById, getArticles, getArticlesByCategory } from "@/lib/get-articles";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  const categoryArticles = await getArticlesByCategory(article.category);
  const relatedArticles = categoryArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 4);

  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5">
        <article className="max-w-[740px] mx-auto py-10">
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
          <div className="relative aspect-[3/2] mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose-vogue">
            <p className="text-[20px] leading-[1.6] mb-6 font-serif font-normal">
              {article.excerpt}
            </p>

            <div className="space-y-5 text-[15px] leading-[1.8] font-light">
              <p>
                In the ever-evolving landscape of modern {article.category.toLowerCase()}, 
                we find ourselves at a fascinating crossroads where tradition meets innovation. 
                This exploration delves deep into the nuances that make this moment particularly 
                significant for enthusiasts and newcomers alike.
              </p>

              <p>
                The attention to detail and craftsmanship evident in today's offerings speaks 
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
                As we look toward the future, it's clear that the landscape will continue to 
                evolve in unexpected ways. The key players in this space are not just responding 
                to trends—they're actively shaping them, creating a dialogue between creator and 
                consumer that enriches the entire experience.
              </p>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-gray-300 py-12">
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
                        className="object-cover"
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
  );
}
