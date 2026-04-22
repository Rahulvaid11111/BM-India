import Link from "next/link";
import Image from "next/image";

const pastEvents = [
  {
    id: "past-1",
    title: "BEST Magazine Winter Soirée 2025",
    date: "December 10, 2025",
    location: "Four Seasons Hotel, Toronto",
    description: "A magical evening celebrating the year's achievements with industry leaders and cultural icons.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "past-2",
    title: "Canadian Fashion Week Showcase",
    date: "October 15, 2025",
    location: "Yorkville Village, Toronto",
    description: "Exclusive preview of Spring/Summer 2026 collections from Canada's top designers.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea1c8f2f?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "past-3",
    title: "Art & Culture Symposium",
    date: "September 22, 2025",
    location: "Royal Ontario Museum, Toronto",
    description: "Leading artists and curators discussed the intersection of fashion and contemporary art.",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1600&h=1067&fit=crop&q=90"
  },
  {
    id: "past-4",
    title: "Luxury Automotive Showcase",
    date: "August 8, 2025",
    location: "Vancouver Convention Centre",
    description: "An exclusive display of the world's most coveted luxury and performance vehicles.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&h=1067&fit=crop&q=90"
  }
];

export default function PastEventsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/events" className="hover:opacity-70">Events</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Past</span>
        </div>

        <h1 className="text-[42px] font-serif font-normal italic mb-12">Past Events</h1>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {pastEvents.map((event) => (
            <article key={event.id} className="group">
              <div className="relative aspect-[3/2] mb-4 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
              <h2 className="text-[24px] leading-[1.3] font-serif font-normal mb-2">
                {event.title}
              </h2>
              <div className="text-[13px] text-gray-600 mb-3">
                {event.date} • {event.location}
              </div>
              <p className="text-[15px] leading-[1.6] text-gray-700">
                {event.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
