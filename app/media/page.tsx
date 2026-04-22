import Link from "next/link";

export default function MediaPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <h1 className="text-[42px] font-serif font-normal italic mb-12">Media</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
          <Link 
            href="/media/video" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[28px] font-serif font-normal mb-3">Video</h2>
            <p className="text-[15px]">
              Watch exclusive interviews, behind-the-scenes content, and fashion films.
            </p>
          </Link>

          <Link 
            href="/media/podcast" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[28px] font-serif font-normal mb-3">Podcast</h2>
            <p className="text-[15px]">
              Listen to conversations with industry leaders, designers, and cultural icons.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
