import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/get-articles";
import { categoryToSlug } from "@/lib/articles";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { WebsiteSchema } from "@/components/WebsiteSchema";

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function Home() {
  // Fetch all articles (merged from static + Supabase, sorted by newest first)
  const articles = await getArticles();
  const trendingArticles = articles.filter(a => a.trending).slice(0, 5);
  const popularArticles = articles.slice(0, 3); // Most recent as popular
  
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <div className="bg-white">
        <div className="max-w-[1280px] mx-auto px-5 py-8">
        {/* Hero Section - Large Featured Article */}
        {articles[0] && (
          <article className="mb-12">
            <Link href={`/article/${articles[0].id}`} className="group block">
              <div className="relative aspect-[21/9] mb-6 overflow-hidden">
                <Image
                  src={articles[0].image}
                  alt={articles[0].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="max-w-3xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                  {articles[0].category}
                </span>
                <h1 className="text-[48px] leading-[1.1] font-serif font-normal mb-4 group-hover:opacity-70">
                  {articles[0].title}
                </h1>
                <p className="text-[17px] leading-[1.7] text-gray-700 font-light mb-4">
                  {articles[0].excerpt}
                </p>
                <div className="text-[13px] text-gray-600">
                  By {articles[0].author} • {articles[0].date}
                </div>
              </div>
            </Link>
          </article>
        )}

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Fashion Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Link href="/category/fashion" className="hover:opacity-70 transition-opacity">
                  <h2 className="text-[24px] font-serif font-normal">Fashion</h2>
                </Link>
                <div className="flex-1 h-px bg-gray-300 ml-6"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.slice(1, 7).map((article) => (
                <article key={article.id} className="group">
                  <Link href={`/article/${article.id}`} className="block">
                    <div className="relative aspect-[3/4] mb-3 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      {article.category}
                    </span>
                    <h3 className="text-[18px] leading-[1.3] font-serif font-normal mb-2 group-hover:opacity-70">
                      {article.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-gray-600 line-clamp-2 font-light">
                      {article.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
              </div>
            </div>

            {/* Beauty Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Link href="/category/beauty" className="hover:opacity-70 transition-opacity">
                  <h2 className="text-[24px] font-serif font-normal">Beauty</h2>
                </Link>
                <div className="flex-1 h-px bg-gray-300 ml-6"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.slice(7, 9).map((article) => (
                <article key={article.id} className="group">
                  <Link href={`/article/${article.id}`} className="block">
                    <div className="relative aspect-[16/9] mb-3 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      {article.category}
                    </span>
                    <h3 className="text-[24px] leading-[1.2] font-serif font-normal mb-2 group-hover:opacity-70">
                      {article.title}
                    </h3>
                    <p className="text-[15px] leading-[1.7] text-gray-600 line-clamp-3 font-light">
                      {article.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
              </div>
            </div>

            {/* Culture Section */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Link href="/category/culture" className="hover:opacity-70 transition-opacity">
                  <h2 className="text-[24px] font-serif font-normal">Culture</h2>
                </Link>
                <div className="flex-1 h-px bg-gray-300 ml-6"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.slice(9, 15).map((article) => (
                <article key={article.id} className="group">
                  <Link href={`/article/${article.id}`} className="block">
                    <div className="relative aspect-[3/4] mb-3 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                      {article.category}
                    </span>
                    <h3 className="text-[16px] leading-[1.3] font-serif font-normal group-hover:opacity-70">
                      {article.title}
                    </h3>
                  </Link>
                </article>
              ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            {/* Trending Section */}
            {trendingArticles.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h2 className="text-[14px] font-bold uppercase tracking-wider mb-6">Trending</h2>
                <div className="space-y-6">
                  {trendingArticles.map((article) => (
                    <article key={article.id} className="group flex gap-4">
                      <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                          {article.category}
                        </span>
                        <Link href={`/article/${article.id}`} className="block">
                          <h4 className="text-[14px] leading-[1.4] font-serif font-normal group-hover:opacity-70">
                            {article.title}
                          </h4>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Stories */}
            <div>
              <h2 className="text-[14px] font-bold uppercase tracking-wider mb-6">Popular Stories</h2>
              <div className="space-y-6">
                {popularArticles.map((article) => (
                  <article key={article.id} className="group">
                    <Link href={`/article/${article.id}`} className="block">
                      <div className="relative aspect-[16/9] mb-3 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        {article.category}
                      </span>
                      <h4 className="text-[16px] leading-[1.3] font-serif font-normal group-hover:opacity-70">
                        {article.title}
                      </h4>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Full-Width Featured Story */}
        {articles[15] && (
          <div className="my-16 py-12 border-y border-gray-300">
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <Link href={`/article/${articles[15].id}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={articles[15].image}
                    alt={articles[15].title}
                    fill
                    className="object-contain group-hover:opacity-90 transition-opacity"
                  />
                </div>
              </Link>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                  {articles[15].category}
                </span>
                <Link href={`/article/${articles[15].id}`} className="group">
                  <h2 className="text-[40px] leading-[1.1] font-serif font-normal mb-4 group-hover:opacity-70">
                    {articles[15].title}
                  </h2>
                </Link>
                <p className="text-[16px] leading-[1.7] text-gray-700 font-light mb-4">
                  {articles[15].excerpt}
                </p>
                <div className="text-[13px] text-gray-600">
                  By {articles[15].author} • {articles[15].date}
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Editor's Picks Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <h2 className="text-[28px] font-serif font-normal px-8">Editor&apos;s Picks</h2>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {articles.slice(16, 20).map((article) => (
              <article key={article.id} className="group">
                <Link href={`/article/${article.id}`} className="block">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="text-[16px] leading-[1.3] font-serif font-normal group-hover:opacity-70">
                    {article.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Must Read Section */}
        <div className="mb-16 bg-gray-50 -mx-5 px-5 py-12">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-[28px] font-serif font-normal mb-8 text-center">Must Read</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.slice(20, 23).map((article) => (
                <article key={article.id} className="group bg-white">
                  <Link href={`/article/${article.id}`} className="block">
                    <div className="relative aspect-[16/9] mb-4 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        {article.category}
                      </span>
                      <h3 className="text-[20px] leading-[1.3] font-serif font-normal mb-3 group-hover:opacity-70">
                        {article.title}
                      </h3>
                      <p className="text-[14px] leading-[1.6] text-gray-600 line-clamp-3 font-light">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Latest News Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <Link href="/category/culture" className="hover:opacity-70 transition-opacity">
              <h2 className="text-[24px] font-serif font-normal">Latest News</h2>
            </Link>
            <div className="flex-1 h-px bg-gray-300 ml-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.slice(23, 27).map((article) => (
              <article key={article.id} className="group">
                <Link href={`/article/${article.id}`} className="block">
                  <div className="relative aspect-square mb-3 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="text-[15px] leading-[1.3] font-serif font-normal group-hover:opacity-70">
                    {article.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Luxury Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <Link href="/category/luxury" className="hover:opacity-70 transition-opacity">
              <h2 className="text-[24px] font-serif font-normal">Luxury</h2>
            </Link>
            <div className="flex-1 h-px bg-gray-300 ml-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.slice(27, 29).map((article) => (
              <article key={article.id} className="group">
                <Link href={`/article/${article.id}`} className="block">
                  <div className="relative aspect-[16/9] mb-4 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="text-[26px] leading-[1.2] font-serif font-normal mb-3 group-hover:opacity-70">
                    {article.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-gray-600 line-clamp-2 font-light">
                    {article.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Celebrity Section */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <Link href="/category/celebrity" className="hover:opacity-70 transition-opacity">
              <h2 className="text-[24px] font-serif font-normal">Celebrity</h2>
            </Link>
            <div className="flex-1 h-px bg-gray-300 ml-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.slice(29, 35).map((article) => (
              <article key={article.id} className="group">
                <Link href={`/article/${article.id}`} className="block">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="text-[16px] leading-[1.3] font-serif font-normal group-hover:opacity-70">
                    {article.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Watches, Fragrances, Automobile, Best 10 Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Watches */}
            <div>
              <div className="flex items-center mb-6">
                <Link href="/category/watches" className="hover:opacity-70 transition-opacity">
                  <h2 className="text-[20px] font-serif font-normal">Watches</h2>
                </Link>
                <div className="flex-1 h-px bg-gray-300 ml-6"></div>
              </div>
              <div className="space-y-6">
                {articles
                  .filter((article) => article.category === "Watches")
                  .slice(0, 3)
                  .map((article) => (
                    <article key={article.id} className="group flex gap-4">
                      <div className="flex-shrink-0 w-32 h-32 relative overflow-hidden">
                        <Link href={`/article/${article.id}`}>
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-contain"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                          {article.category}
                        </span>
                        <Link href={`/article/${article.id}`}>
                          <h3 className="text-[16px] leading-[1.3] font-serif font-normal mb-2 group-hover:opacity-70">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-[13px] leading-[1.6] text-gray-600 line-clamp-2 font-light">
                          {article.excerpt}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            </div>

            {/* Fragrances */}
            <div>
              <div className="flex items-center mb-6">
                <Link href="/category/fragrances" className="hover:opacity-70 transition-opacity">
                  <h2 className="text-[20px] font-serif font-normal">Fragrances</h2>
                </Link>
                <div className="flex-1 h-px bg-gray-300 ml-6"></div>
              </div>
              <div className="space-y-6">
                {articles
                  .filter((article) => article.category === "Fragrances")
                  .slice(0, 3)
                  .map((article) => (
                    <article key={article.id} className="group flex gap-4">
                      <div className="flex-shrink-0 w-32 h-32 relative overflow-hidden">
                        <Link href={`/article/${article.id}`}>
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-contain"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                          {article.category}
                        </span>
                        <Link href={`/article/${article.id}`}>
                          <h3 className="text-[16px] leading-[1.3] font-serif font-normal mb-2 group-hover:opacity-70">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-[13px] leading-[1.6] text-gray-600 line-clamp-2 font-light">
                          {article.excerpt}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Automobile */}
            <div>
              <div className="flex items-center mb-6">
                <Link href="/category/automobile" className="hover:opacity-70 transition-opacity">
                  <h2 className="text-[20px] font-serif font-normal">Automobile</h2>
                </Link>
                <div className="flex-1 h-px bg-gray-300 ml-6"></div>
              </div>
              <div className="space-y-6">
                {articles
                  .filter((article) => article.category === "Automobile")
                  .slice(0, 3)
                  .map((article) => (
                    <article key={article.id} className="group flex gap-4">
                      <div className="flex-shrink-0 w-32 h-32 relative overflow-hidden">
                        <Link href={`/article/${article.id}`}>
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-contain"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                          {article.category}
                        </span>
                        <Link href={`/article/${article.id}`}>
                          <h3 className="text-[16px] leading-[1.3] font-serif font-normal mb-2 group-hover:opacity-70">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-[13px] leading-[1.6] text-gray-600 line-clamp-2 font-light">
                          {article.excerpt}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
            {/* Best 10 */}
            <div>
              <div className="flex items-center mb-6">
                <Link
                  href={`/category/${categoryToSlug("Best 10")}`}
                  className="hover:opacity-70 transition-opacity"
                >
                  <h2 className="text-[20px] font-serif font-normal">Best 10</h2>
                </Link>
                <div className="flex-1 h-px bg-gray-300 ml-6"></div>
              </div>
              <div className="space-y-6">
                {articles
                  .filter((article) => article.category === "Best 10")
                  .slice(0, 3)
                  .map((article) => (
                    <article key={article.id} className="group flex gap-4">
                      <div className="flex-shrink-0 w-32 h-32 relative overflow-hidden">
                        <Link href={`/article/${article.id}`}>
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-contain"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                          {article.category}
                        </span>
                        <Link href={`/article/${article.id}`}>
                          <h3 className="text-[16px] leading-[1.3] font-serif font-normal mb-2 group-hover:opacity-70">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-[13px] leading-[1.6] text-gray-600 line-clamp-2 font-light">
                          {article.excerpt}
                        </p>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
