import Link from "next/link";
import Image from "next/image";
import { getArticlesByCategory, categories } from "@/lib/articles";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find(
    (cat) => cat.toLowerCase() === slug.toLowerCase()
  );

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category);

  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5">
        {/* Category Header */}
        <div className="py-8 border-b border-black">
          <h1 className="text-[42px] font-serif font-normal leading-[1.15]">{category}</h1>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 py-8">
            {articles.map((article) => (
              <article key={article.id} className="group">
                <Link href={`/article/${article.id}`}>
                  <div className="relative aspect-[3/2] mb-3 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-[16px] leading-[1.4] font-serif font-normal group-hover:opacity-70">
                    {article.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">
              No articles found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
