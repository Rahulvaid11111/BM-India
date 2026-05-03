import Link from "next/link";

export default function MagazinePage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <h1 className="text-[42px] font-serif font-normal italic mb-8">The Magazine</h1>
        
        <div className="max-w-[740px] mb-12">
          <p className="text-[17px] leading-[1.7] text-gray-700 mb-6">
            Experience BEST Magazine in print. Our quarterly publication features in-depth stories, 
            stunning photography, and exclusive content you won&apos;t find anywhere else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
          <Link 
            href="/magazine/latest-issue" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[28px] font-serif font-normal mb-3">Latest Issue</h2>
            <p className="text-[15px]">
              Discover our newest edition featuring the season&apos;s most compelling stories.
            </p>
          </Link>

          <Link 
            href="/magazine/archive" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[28px] font-serif font-normal mb-3">Archive</h2>
            <p className="text-[15px]">
              Browse through our collection of past issues and timeless content.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
