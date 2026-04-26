import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "small" | "hero";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "hero") {
    return (
      <Link href={`/article/${article.id}`} className="group block">
        <div className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden mb-6">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-contain group-hover:opacity-95 transition-opacity duration-500"
          />
        </div>
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">
            {article.category}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-[1.15] mb-4 group-hover:text-gray-700 transition-colors">
            {article.title}
          </h2>
          <p className="text-gray-700 text-base leading-[1.8] mb-3 font-light">{article.excerpt}</p>
          <p className="text-sm text-gray-600">By {article.author}</p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/article/${article.id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden mb-4">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-contain group-hover:opacity-95 transition-opacity duration-500"
          />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">
            {article.category}
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-normal leading-[1.15] mb-3 group-hover:text-gray-700 transition-colors">
            {article.title}
          </h3>
          <p className="text-gray-600 leading-[1.8] line-clamp-3 font-light">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  if (variant === "small") {
    return (
      <Link href={`/article/${article.id}`} className="group flex space-x-4">
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-contain group-hover:opacity-95 transition-opacity duration-500"
          />
        </div>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">
            {article.category}
          </div>
          <h3 className="text-base font-serif font-normal leading-[1.4] group-hover:text-gray-700 transition-colors line-clamp-3">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden mb-4">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-contain group-hover:opacity-95 transition-opacity duration-500"
        />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">
          {article.category}
        </div>
        <h3 className="text-xl md:text-2xl font-serif font-normal leading-[1.15] mb-2 group-hover:text-gray-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm leading-[1.8] line-clamp-2 font-light">{article.excerpt}</p>
      </div>
    </Link>
  );
}
