import Link from "next/link";
import { categories, categoryToSlug } from "@/lib/articles";

interface CategoryNavProps {
  currentCategory?: string;
}

export default function CategoryNav({ currentCategory }: CategoryNavProps) {
  return (
    <div className="border-y border-gray-200 py-4 mb-12">
      <div className="flex items-center justify-center flex-wrap gap-3">
        <Link
          href="/"
          className={`text-xs font-medium uppercase tracking-widest px-3 py-1.5 transition-colors ${
            !currentCategory
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${categoryToSlug(category)}`}
            className={`text-xs font-medium uppercase tracking-widest px-3 py-1.5 transition-colors ${
              currentCategory === category
                ? "text-black border-b-2 border-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
