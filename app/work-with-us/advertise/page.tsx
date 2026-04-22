import Link from "next/link";

export default function AdvertisePage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/work-with-us" className="hover:opacity-70">Work With Us</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Advertise</span>
        </div>

        <div className="max-w-[740px] mx-auto">
          <h1 className="text-[42px] font-serif font-normal italic mb-8">Advertise With BEST</h1>
          
          <div className="space-y-6 text-[17px] leading-[1.7] mb-12">
            <p>
              BEST Magazine reaches Canada's most affluent and influential audience—discerning readers 
              who value quality, sophistication, and luxury. Our print and digital platforms offer 
              unparalleled opportunities to connect with this premium demographic.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Our Audience</h2>
            
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Average household income: $250,000+</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>65% female, 35% male</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Ages 25-54, highly educated professionals</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Passionate about fashion, beauty, culture, and luxury lifestyle</span>
              </li>
            </ul>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Advertising Options</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Print Advertising</h3>
                <p className="text-gray-700">
                  Full-page, double-page spreads, and cover positions in our quarterly magazine. 
                  Premium paper stock and exceptional print quality ensure your brand looks its best.
                </p>
              </div>

              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Digital Display</h3>
                <p className="text-gray-700">
                  Homepage takeovers, banner ads, and native placements across our website and 
                  mobile platforms, reaching engaged readers where they spend their time.
                </p>
              </div>

              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Newsletter Sponsorship</h3>
                <p className="text-gray-700">
                  Featured placement in our weekly newsletter, delivered to 100,000+ subscribers 
                  who actively engage with luxury content.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-8 mt-12">
              <h2 className="text-[28px] font-serif font-normal mb-4">Get Started</h2>
              <p className="mb-6">
                Contact our advertising team to discuss how BEST Magazine can help you reach 
                Canada's luxury audience.
              </p>
              <a 
                href="mailto:advertising@bestmagazine.ca"
                className="inline-block px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Contact Advertising
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
