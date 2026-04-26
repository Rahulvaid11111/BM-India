'use client';

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/articles";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArticleNavigationProps {
  currentArticle: Article;
  allArticles: Article[];
}

export function ArticleNavigation({ currentArticle, allArticles }: ArticleNavigationProps) {
  const currentIndex = allArticles.findIndex(article => article.id === currentArticle.id);
  
  const previousArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  if (!previousArticle && !nextArticle) {
    return null;
  }

  return (
    <div className="border-t border-gray-300 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Article */}
        {previousArticle ? (
          <Link 
            href={`/article/${previousArticle.id}`}
            className="group flex items-center gap-4 p-4 border border-gray-200 hover:border-black transition-colors"
          >
            <div className="flex-shrink-0">
              <ChevronLeft className="w-6 h-6" />
            </div>
            <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden">
              <Image
                src={previousArticle.image}
                alt={previousArticle.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                Previous Article
              </span>
              <h4 className="text-[16px] leading-[1.3] font-serif font-normal group-hover:opacity-70 line-clamp-2">
                {previousArticle.title}
              </h4>
            </div>
          </Link>
        ) : (
          <div className="opacity-0 pointer-events-none"></div>
        )}

        {/* Next Article */}
        {nextArticle ? (
          <Link 
            href={`/article/${nextArticle.id}`}
            className="group flex items-center gap-4 p-4 border border-gray-200 hover:border-black transition-colors"
          >
            <div className="flex-1 min-w-0 text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                Next Article
              </span>
              <h4 className="text-[16px] leading-[1.3] font-serif font-normal group-hover:opacity-70 line-clamp-2">
                {nextArticle.title}
              </h4>
            </div>
            <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden">
              <Image
                src={nextArticle.image}
                alt={nextArticle.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-shrink-0">
              <ChevronRight className="w-6 h-6" />
            </div>
          </Link>
        ) : (
          <div className="opacity-0 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}
