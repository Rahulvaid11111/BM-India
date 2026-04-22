import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-xs uppercase tracking-wider mb-6">
      <Link href="/" className="text-gray-600 hover:text-black transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-3 h-3 text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-black font-medium">{item.label}</span>
          ) : (
            <Link href={item.href} className="text-gray-600 hover:text-black transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
