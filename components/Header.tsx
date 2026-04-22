"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/articles";
import Logo from "./Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black">
      <div className="max-w-[1280px] mx-auto px-5">
        {/* Top utility bar */}
        <div className="flex items-center justify-between py-2 border-b border-gray-300">
          <div className="flex items-center gap-5 text-[11px] font-semibold uppercase tracking-wider">
            <Link href="#" className="hover:opacity-70">Subscribe</Link>
            <Link href="#" className="hover:opacity-70">Newsletter</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="hover:opacity-70">
              <Search className="w-4 h-4" />
            </button>
            <Link href="#" className="text-[11px] font-semibold uppercase tracking-wider hover:opacity-70">
              Sign In
            </Link>
          </div>
        </div>

        {/* Logo with Navigation on Sides - Vogue Style */}
        <div className="hidden lg:flex items-center justify-center gap-4 py-6">
          {/* Left Navigation */}
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="text-[11px] font-bold uppercase tracking-[0.08em] hover:opacity-70"
            >
              {category}
            </Link>
          ))}

          {/* Centered Logo */}
          <div className="flex-shrink-0">
            <Logo variant="header" />
          </div>

          {/* Right Navigation */}
          {categories.slice(4).map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="text-[11px] font-bold uppercase tracking-[0.08em] hover:opacity-70"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Mobile Logo - Centered */}
        <div className="lg:hidden flex justify-center">
          <Logo variant="header" />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center justify-between pb-3">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            <Menu className="w-5 h-5" />
          </button>
          <button className="p-2">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-300 py-4">
            <nav className="flex flex-col gap-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="text-sm font-bold uppercase tracking-wider hover:opacity-70"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
