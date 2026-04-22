import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/get-articles";

export default async function Home() {
  // Fetch all articles (merged from static + Supabase, sorted by newest first)
  const articles = await getArticles();
  
  return (
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
                  className="object-cover"
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
                <h2 className="text-[24px] font-serif font-normal">Fashion</h2>
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
                        className="object-cover"
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
                <h2 className="text-[24px] font-serif font-normal">Beauty</h2>
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
                        className="object-cover"
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
                <h2 className="text-[24px] font-serif font-normal">Culture</h2>
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
                        className="object-cover"
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
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-[14px] font-bold uppercase tracking-wider mb-6">Trending</h2>
              <div className="space-y-6">
                {articles.slice(15, 20).map((article, index) => (
                  <article key={article.id} className="group flex gap-4">
                    <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
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

            {/* Popular Stories */}
            <div>
              <h2 className="text-[14px] font-bold uppercase tracking-wider mb-6">Popular Stories</h2>
              <div className="space-y-6">
                {articles.slice(20, 23).map((article) => (
                  <article key={article.id} className="group">
                    <Link href={`/article/${article.id}`} className="block">
                      <div className="relative aspect-[16/9] mb-3 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
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

        {/* Load More Section */}
        <div className="text-center py-12 border-t border-gray-300 mt-12">
          <button className="px-8 py-3 border border-black text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
