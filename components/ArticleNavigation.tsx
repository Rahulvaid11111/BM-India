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
    <div className="border-t border-gray-300 py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Previous Article */}
        {previousArticle ? (
          <Link 
            href={`/article/${previousArticle.id}`}
            className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 hover:border-black transition-colors touch-manipulation"
          >
            <div className="flex-shrink-0">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 relative overflow-hidden">
              <Image
                src={previousArticle.image}
                alt={previousArticle.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                Previous
              </span>
              <h4 className="text-sm md:text-[16px] leading-[1.3] font-serif font-normal group-hover:opacity-70 line-clamp-2">
                {previousArticle.title}
              </h4>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block opacity-0 pointer-events-none"></div>
        )}

        {/* Next Article */}
        {nextArticle ? (
          <Link 
            href={`/article/${nextArticle.id}`}
            className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 hover:border-black transition-colors touch-manipulation"
          >
            <div className="flex-1 min-w-0 md:text-right">
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1 block">
                Next
              </span>
              <h4 className="text-sm md:text-[16px] leading-[1.3] font-serif font-normal group-hover:opacity-70 line-clamp-2">
                {nextArticle.title}
              </h4>
            </div>
            <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 relative overflow-hidden">
              <Image
                src={nextArticle.image}
                alt={nextArticle.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-shrink-0">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </div>
          </Link>
        ) : (
          <div className="hidden md:block opacity-0 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}
