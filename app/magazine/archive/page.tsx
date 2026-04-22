import Link from "next/link";
import Image from "next/image";

const archiveIssues = [
  {
    id: "winter-2025",
    title: "Winter 2025",
    subtitle: "The Art of Celebration",
    cover: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&q=90",
    date: "December 2025"
  },
  {
    id: "fall-2025",
    title: "Fall 2025",
    subtitle: "Modern Classics",
    cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop&q=90",
    date: "September 2025"
  },
  {
    id: "summer-2025",
    title: "Summer 2025",
    subtitle: "Endless Summer",
    cover: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop&q=90",
    date: "June 2025"
  },
  {
    id: "spring-2025",
    title: "Spring 2025",
    subtitle: "Fresh Perspectives",
    cover: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=800&fit=crop&q=90",
    date: "March 2025"
  },
  {
    id: "winter-2024",
    title: "Winter 2024",
    subtitle: "Timeless Elegance",
    cover: "https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=600&h=800&fit=crop&q=90",
    date: "December 2024"
  },
  {
    id: "fall-2024",
    title: "Fall 2024",
    subtitle: "The Power of Style",
    cover: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop&q=90",
    date: "September 2024"
  }
];

export default function ArchivePage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/magazine" className="hover:opacity-70">Magazine</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Archive</span>
        </div>

        <h1 className="text-[42px] font-serif font-normal italic mb-8">Magazine Archive</h1>
        
        <p className="text-[17px] leading-[1.7] text-gray-700 max-w-[740px] mb-12">
          Browse through our collection of past issues, each one a carefully curated celebration 
          of fashion, beauty, culture, and luxury lifestyle.
        </p>

        {/* Archive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {archiveIssues.map((issue) => (
            <article key={issue.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                <Image
                  src={issue.cover}
                  alt={issue.title}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                {issue.date}
              </div>
              <h3 className="text-[18px] font-serif font-normal mb-1 group-hover:opacity-70">
                {issue.title}
              </h3>
              <p className="text-[13px] text-gray-600">{issue.subtitle}</p>
            </article>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="mt-16 border-t border-gray-300 pt-12 text-center">
          <h2 className="text-[28px] font-serif font-normal mb-4">Never Miss an Issue</h2>
          <p className="text-[15px] text-gray-700 mb-6 max-w-[600px] mx-auto">
            Subscribe to BEST Magazine and receive each quarterly edition delivered to your door.
          </p>
          <button className="px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}
