import Link from "next/link";
import Image from "next/image";

const videos = [
  {
    id: "video-1",
    title: "Behind the Scenes: Spring Fashion Week",
    description: "Go backstage at the most anticipated shows of the season.",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&h=900&fit=crop&q=90",
    duration: "12:45"
  },
  {
    id: "video-2",
    title: "Beauty Secrets: Celebrity Makeup Artist Tutorial",
    description: "Learn the techniques used on Hollywood's biggest stars.",
    thumbnail: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1600&h=900&fit=crop&q=90",
    duration: "8:30"
  },
  {
    id: "video-3",
    title: "Designer Spotlight: The Creative Process",
    description: "An intimate look at how luxury fashion comes to life.",
    thumbnail: "https://images.unsplash.com/photo-1558769132-cb1aea1c8f2f?w=1600&h=900&fit=crop&q=90",
    duration: "15:20"
  },
  {
    id: "video-4",
    title: "Street Style: Global Fashion Capitals",
    description: "The best looks from Paris, Milan, New York, and Tokyo.",
    thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=900&fit=crop&q=90",
    duration: "10:15"
  },
  {
    id: "video-5",
    title: "Luxury Living: Inside the World's Most Beautiful Homes",
    description: "Tour extraordinary residences that define modern elegance.",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop&q=90",
    duration: "18:40"
  },
  {
    id: "video-6",
    title: "The Art of Craftsmanship: Watchmaking Masters",
    description: "Discover the precision and artistry behind luxury timepieces.",
    thumbnail: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600&h=900&fit=crop&q=90",
    duration: "14:25"
  }
];

export default function VideoPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/media" className="hover:opacity-70">Media</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Video</span>
        </div>

        <h1 className="text-[42px] font-serif font-normal italic mb-12">Video</h1>
        
        {/* Featured Video */}
        {videos[0] && (
          <div className="mb-16">
            <div className="relative aspect-video mb-4 bg-gray-200">
              <Image
                src={videos[0].thumbnail}
                alt={videos[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-black text-white px-2 py-1 text-xs font-semibold">
                {videos[0].duration}
              </div>
            </div>
            <h2 className="text-[28px] font-serif font-normal mb-2">{videos[0].title}</h2>
            <p className="text-[15px] text-gray-700">{videos[0].description}</p>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {videos.slice(1).map((video) => (
            <article key={video.id} className="group cursor-pointer">
              <div className="relative aspect-video mb-3 bg-gray-200 overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-3 right-3 bg-black text-white px-2 py-1 text-xs font-semibold">
                  {video.duration}
                </div>
              </div>
              <h3 className="text-[18px] leading-[1.3] font-serif font-normal mb-2 group-hover:opacity-70">
                {video.title}
              </h3>
              <p className="text-[13px] text-gray-600">{video.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
