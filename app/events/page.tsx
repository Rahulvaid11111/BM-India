import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <h1 className="text-[42px] font-serif font-normal italic mb-12">Events</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
          <Link 
            href="/events/upcoming" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[28px] font-serif font-normal mb-3">Upcoming Events</h2>
            <p className="text-[15px]">
              Discover exclusive BEST Magazine events, fashion shows, and cultural gatherings.
            </p>
          </Link>

          <Link 
            href="/events/past" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[28px] font-serif font-normal mb-3">Past Events</h2>
            <p className="text-[15px]">
              Relive the highlights from our previous events and celebrations.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
