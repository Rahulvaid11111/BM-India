import Link from "next/link";
import Logo from "./Logo";
import { categoryToSlug } from "@/lib/articles";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-[1280px] mx-auto px-5 py-12">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="invert">
            <Logo variant="footer" />
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-4">Fashion</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/category/fashion" className="hover:opacity-70">Latest</Link></li>
              <li><Link href="/category/fashion" className="hover:opacity-70">Trends</Link></li>
              <li><Link href="/category/fashion" className="hover:opacity-70">Designers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-4">Beauty</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/category/beauty" className="hover:opacity-70">Makeup</Link></li>
              <li><Link href="/category/beauty" className="hover:opacity-70">Skincare</Link></li>
              <li><Link href="/category/beauty" className="hover:opacity-70">Hair</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-4">Culture</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/category/culture" className="hover:opacity-70">Art</Link></li>
              <li><Link href="/category/celebrities" className="hover:opacity-70">Celebrities</Link></li>
              <li><Link href="/category/culture" className="hover:opacity-70">Music</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider mb-4">More</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="#" className="hover:opacity-70">Subscribe</Link></li>
              <li><Link href="#" className="hover:opacity-70">Newsletter</Link></li>
              <li><Link href="#" className="hover:opacity-70">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-wrap justify-center gap-4 text-[11px] mb-6">
            <Link href="#" className="hover:opacity-70">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:opacity-70">Terms of Use</Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:opacity-70">Cookie Settings</Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="hover:opacity-70">Accessibility</Link>
          </div>

          <div className="text-center text-[11px] text-gray-400">
            <p>&copy; 2026 BEST Magazine. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
