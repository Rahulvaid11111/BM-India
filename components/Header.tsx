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
        {/* Top utility bar - Desktop only */}
        <div className="hidden md:flex items-center justify-between py-2 border-b border-gray-300">
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

        {/* Mobile Logo and Controls */}
        <div className="lg:hidden flex items-center justify-between py-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="p-3 -ml-3 touch-manipulation"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 flex justify-center">
            <Logo variant="header" />
          </div>
          
          <button className="p-3 -mr-3 touch-manipulation" aria-label="Search">
            <Search className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-300 py-4">
            <nav className="flex flex-col gap-1">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="text-base font-bold uppercase tracking-wider hover:opacity-70 py-3 px-2 touch-manipulation"
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
