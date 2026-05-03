import Link from "next/link";
import Image from "next/image";

export default function LatestIssuePage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/magazine" className="hover:opacity-70">Magazine</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Latest Issue</span>
        </div>

        <h1 className="text-[42px] font-serif font-normal italic mb-12">Spring 2026 Issue</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Cover Image */}
          <div className="relative aspect-[3/4] bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1200&h=1600&fit=crop&q=90"
              alt="BEST Magazine Spring 2026"
              fill
              className="object-cover"
            />
          </div>

          {/* Issue Details */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-4">
              Issue 12 • Spring 2026
            </div>
            <h2 className="text-[32px] leading-[1.2] font-serif font-normal mb-6">
              The New Era of Elegance
            </h2>
            <p className="text-[17px] leading-[1.7] text-gray-700 mb-8">
              Our Spring 2026 issue celebrates the return of refined sophistication. From exclusive 
              interviews with fashion&apos;s most influential designers to insider access at the world&apos;s 
              premier cultural events, this edition captures the essence of modern luxury.
            </p>

            <h3 className="text-[20px] font-bold uppercase tracking-wider mb-4">In This Issue</h3>
            <ul className="space-y-3 text-[15px] mb-8">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Cover Story: The Designers Defining Spring Fashion</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Beauty: The Science of Radiant Skin</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Culture: Exclusive Interview with Award-Winning Director</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Travel: The World&apos;s Most Luxurious New Hotels</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Watches & Jewelry: Timeless Treasures</span>
              </li>
            </ul>

            <button className="w-full md:w-auto px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Preview Articles */}
        <div className="border-t border-gray-300 pt-12">
          <h3 className="text-[28px] font-serif font-normal mb-8">Featured Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Spring's Most Coveted Looks",
                image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop&q=90"
              },
              {
                title: "The Art of Modern Beauty",
                image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=90"
              },
              {
                title: "Cultural Icons Speak",
                image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=600&fit=crop&q=90"
              }
            ].map((story, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[4/3] mb-3 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <h4 className="text-[18px] font-serif font-normal group-hover:opacity-70">
                  {story.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
