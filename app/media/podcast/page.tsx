import Link from "next/link";
import Image from "next/image";

const podcasts = [
  {
    id: "podcast-1",
    title: "Conversations with Icons: Fashion's Leading Voices",
    description: "Intimate discussions with designers, models, and industry pioneers.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=800&fit=crop&q=90",
    episodes: 24,
    latest: "April 15, 2026"
  },
  {
    id: "podcast-2",
    title: "The Beauty Edit: Expert Tips & Trends",
    description: "Weekly insights from makeup artists, dermatologists, and beauty innovators.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=800&fit=crop&q=90",
    episodes: 18,
    latest: "April 12, 2026"
  },
  {
    id: "podcast-3",
    title: "Luxury Living: The Art of the Good Life",
    description: "Exploring the finest in travel, dining, and cultural experiences.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=800&fit=crop&q=90",
    episodes: 32,
    latest: "April 10, 2026"
  },
  {
    id: "podcast-4",
    title: "Culture Club: Art, Film & Music",
    description: "Deep dives into the creative works shaping our world.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=800&fit=crop&q=90",
    episodes: 28,
    latest: "April 8, 2026"
  }
];

export default function PodcastPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/media" className="hover:opacity-70">Media</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Podcast</span>
        </div>

        <h1 className="text-[42px] font-serif font-normal italic mb-8">Podcast</h1>
        
        <p className="text-[17px] leading-[1.7] text-gray-700 max-w-[740px] mb-12">
          Listen to BEST Magazine's exclusive podcast series featuring conversations with the most 
          influential voices in fashion, beauty, culture, and luxury lifestyle.
        </p>

        {/* Podcast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {podcasts.map((podcast) => (
            <article key={podcast.id} className="group cursor-pointer border-b border-gray-200 pb-8">
              <div className="flex gap-6">
                <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                  <Image
                    src={podcast.image}
                    alt={podcast.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[22px] leading-[1.3] font-serif font-normal mb-2 group-hover:opacity-70">
                    {podcast.title}
                  </h3>
                  <p className="text-[14px] text-gray-700 mb-3">{podcast.description}</p>
                  <div className="flex gap-4 text-[12px] text-gray-600">
                    <span>{podcast.episodes} Episodes</span>
                    <span>•</span>
                    <span>Latest: {podcast.latest}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Subscribe Section */}
        <div className="mt-16 border-t border-gray-300 pt-12 text-center">
          <h2 className="text-[28px] font-serif font-normal mb-4">Subscribe to Our Podcasts</h2>
          <p className="text-[15px] text-gray-700 mb-6">
            Available on Apple Podcasts, Spotify, and all major podcast platforms
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 border border-black text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
              Apple Podcasts
            </button>
            <button className="px-6 py-3 border border-black text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
              Spotify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
