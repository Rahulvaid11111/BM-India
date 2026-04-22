import ArticleCard from "./ArticleCard";
import { Article } from "@/lib/articles";

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
}

export default function RelatedArticles({ articles, title = "You May Also Like" }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-normal text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
