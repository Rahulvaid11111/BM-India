import Link from "next/link";
import Image from "next/image";
import { categories, subcategories, articles, categoryToSlug } from "@/lib/articles";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];
  
  Object.entries(subcategories).forEach(([category, subs]) => {
    subs.forEach((sub) => {
      params.push({
        category: categoryToSlug(category),
        subcategory: categoryToSlug(sub)
      });
    });
  });
  
  return params;
}

export default async function SubcategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string; subcategory: string }> 
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;
  const category = categories.find(
    (cat) => categoryToSlug(cat) === categorySlug
  );

  if (!category || !subcategories[category]) {
    notFound();
  }

  const subcategoryName = subcategories[category].find(
    (sub) => categoryToSlug(sub) === subcategorySlug
  );

  if (!subcategoryName) {
    notFound();
  }

  // Get articles from this category
  const categoryArticles = articles.filter(a => a.category === category);

  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href={`/category/${categoryToSlug(category)}`} className="hover:opacity-70">{category}</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>{subcategoryName}</span>
        </div>

        {/* Header */}
        <div className="py-8 border-b border-black">
          <h1 className="text-[42px] font-serif font-normal italic">{subcategoryName}</h1>
          <p className="text-[15px] text-gray-600 mt-2">
            Explore the latest in {subcategoryName.toLowerCase()} from BEST Magazine
          </p>
        </div>

        {/* Articles Grid */}
        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 py-8">
            {categoryArticles.map((article) => (
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
                  <h3 className="text-[18px] leading-[1.3] font-serif font-normal group-hover:opacity-70">
                    {article.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">
              No articles found yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
