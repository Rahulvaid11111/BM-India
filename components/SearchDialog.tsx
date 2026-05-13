"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      const trimmed = query.trim();
      if (!trimmed) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        const data = await response.json();
        setResults(data.results ?? []);
      } catch (error) {
        console.error("Failed to search articles", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const keyHandler = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", keyHandler);
      return () => document.removeEventListener("keydown", keyHandler);
    }
  }, [isOpen, onClose]);

  const headerCopy = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return "Search BEST";
    if (isLoading) return `Searching “${trimmed}”...`;
    if (results.length === 0) return `No results for “${trimmed}”`;
    return `Showing results for “${trimmed}”`;
  }, [query, results.length, isLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 py-12 backdrop-blur-sm">
      <div className="w-full max-w-[720px] rounded-lg bg-white shadow-2xl">
        <div className="flex items-center border-b border-gray-200 px-6 py-4">
          <Search className="mr-3 h-5 w-5 text-gray-500" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, brands, trends..."
            className="flex-1 border-none bg-transparent text-[18px] font-serif outline-none placeholder:text-gray-400"
            aria-label="Search BEST Magazine"
          />
          <button
            onClick={onClose}
            className="ml-4 rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {headerCopy}
          </p>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 pb-6">
          {isLoading ? (
            <div className="py-16 text-center text-sm text-gray-500">Searching...</div>
          ) : results.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-500">
              Start typing to discover stories curated by BEST Magazine.
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="group flex gap-5 rounded-lg border border-transparent p-2 transition hover:border-black"
                  onClick={onClose}
                >
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="96px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      <span>{article.category}</span>
                      <span className="h-px w-8 bg-gray-300" />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-[17px] font-serif leading-[1.4] text-black transition group-hover:opacity-70">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-[1.6] text-gray-600">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
