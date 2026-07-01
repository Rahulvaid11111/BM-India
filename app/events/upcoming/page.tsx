import Link from "next/link";
import Image from "next/image";

const upcomingEvents = [
  {
    id: "event-1",
    title: "BEST Magazine Spring Gala 2026",
    date: "May 15, 2026",
    location: "The Ritz-Carlton, Toronto",
    description: "Join us for an evening celebrating fashion, culture, and philanthropy with exclusive performances and designer showcases.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=1067&fit=crop&q=90",
    category: "Gala"
  },
  {
    id: "event-2",
    title: "Fashion Forward: Designer Panel Discussion",
    date: "May 22, 2026",
    location: "Design Exchange, Toronto",
    description: "Leading Indian designers discuss the future of sustainable luxury fashion.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=1067&fit=crop&q=90",
    category: "Panel"
  },
  {
    id: "event-3",
    title: "Beauty Masterclass with Celebrity Makeup Artists",
    date: "June 5, 2026",
    location: "Shangri-La Hotel, Vancouver",
    description: "Learn professional techniques from the artists behind Hollywood's most iconic looks.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&h=1067&fit=crop&q=90",
    category: "Workshop"
  },
  {
    id: "event-4",
    title: "Luxury Lifestyle Expo",
    date: "June 18-20, 2026",
    location: "Palais des congrès, Montreal",
    description: "Three days showcasing the finest in automotive, watches, jewelry, and haute couture.",
    image: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=1600&h=1067&fit=crop&q=90",
    category: "Expo"
  }
];

export default function UpcomingEventsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/events" className="hover:opacity-70">Events</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Upcoming</span>
        </div>

        <h1 className="text-[42px] font-serif font-normal italic mb-12">Upcoming Events</h1>

        {/* Events List */}
        <div className="space-y-12">
          {upcomingEvents.map((event) => (
            <article key={event.id} className="border-b border-gray-200 pb-12 last:border-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-3">
                    {event.category}
                  </div>
                  <h2 className="text-[32px] leading-[1.2] font-serif font-normal mb-4">
                    {event.title}
                  </h2>
                  <div className="flex flex-col gap-2 text-[14px] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Date:</span>
                      <span className="text-gray-700">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Location:</span>
                      <span className="text-gray-700">{event.location}</span>
                    </div>
                  </div>
                  <p className="text-[15px] leading-[1.7] text-gray-700 mb-6">
                    {event.description}
                  </p>
                  <button className="px-6 py-3 border border-black text-[11px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
