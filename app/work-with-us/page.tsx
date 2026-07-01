import Link from "next/link";

export default function WorkWithUsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <h1 className="text-[42px] font-serif font-normal italic mb-8">Work With Us</h1>
        
        <div className="max-w-[740px] mb-12">
          <p className="text-[17px] leading-[1.7] text-gray-700 mb-6">
            Partner with BEST Magazine to reach Canada&apos;s most influential luxury audience. 
            We offer a range of opportunities for brands looking to connect with our sophisticated readership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/work-with-us/advertise" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[24px] font-serif font-normal mb-3">Advertise</h2>
            <p className="text-[15px]">
              Reach our premium audience through print and digital advertising opportunities.
            </p>
          </Link>

          <Link 
            href="/work-with-us/sponsored-content" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[24px] font-serif font-normal mb-3">Sponsored Content</h2>
            <p className="text-[15px]">
              Create compelling branded stories that resonate with our engaged readers.
            </p>
          </Link>

          <Link 
            href="/work-with-us/partnerships" 
            className="group border border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <h2 className="text-[24px] font-serif font-normal mb-3">Partnerships</h2>
            <p className="text-[15px]">
              Collaborate with us on events, campaigns, and exclusive brand experiences.
            </p>
          </Link>
        </div>

        <div className="mt-12 max-w-[740px]">
          <p className="text-[15px] text-gray-600">
            For inquiries, please contact us at{" "}
            <a href="mailto:partnerships@bestmagazine.ca" className="underline hover:opacity-70">
              partnerships@bestmagazine.ca
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
