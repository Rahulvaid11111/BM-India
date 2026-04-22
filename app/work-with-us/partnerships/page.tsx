import Link from "next/link";

export default function PartnershipsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/work-with-us" className="hover:opacity-70">Work With Us</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Partnerships</span>
        </div>

        <div className="max-w-[740px] mx-auto">
          <h1 className="text-[42px] font-serif font-normal italic mb-8">Brand Partnerships</h1>
          
          <div className="space-y-6 text-[17px] leading-[1.7]">
            <p>
              BEST Magazine collaborates with luxury brands to create meaningful, long-term partnerships 
              that go beyond traditional advertising. We develop custom programs that align with your 
              brand values and business objectives while delivering exceptional value to our audience.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Partnership Opportunities</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Exclusive Events</h3>
                <p className="text-gray-700">
                  Co-create memorable experiences including fashion shows, product launches, galas, 
                  and intimate gatherings with our influential community.
                </p>
              </div>

              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Content Series</h3>
                <p className="text-gray-700">
                  Develop ongoing editorial series that position your brand as a thought leader in 
                  your category, building lasting connections with our readers.
                </p>
              </div>

              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Awards & Recognition</h3>
                <p className="text-gray-700">
                  Partner on prestigious awards programs celebrating excellence in fashion, beauty, 
                  design, and innovation.
                </p>
              </div>

              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Digital Experiences</h3>
                <p className="text-gray-700">
                  Create interactive digital experiences, virtual events, and exclusive online content 
                  that engage our tech-savvy audience.
                </p>
              </div>
            </div>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Why Partner With BEST</h2>
            
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Access to Canada's most influential luxury consumers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Award-winning editorial and creative team</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Multi-platform reach across print, digital, social, and events</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Trusted brand with 10+ years of excellence in luxury publishing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <span>Customized solutions tailored to your specific objectives</span>
              </li>
            </ul>

            <div className="border-t border-gray-300 pt-8 mt-12">
              <h2 className="text-[28px] font-serif font-normal mb-4">Start a Conversation</h2>
              <p className="mb-6">
                Let's explore how a partnership with BEST Magazine can elevate your brand and 
                create lasting impact.
              </p>
              <a 
                href="mailto:partnerships@bestmagazine.ca"
                className="inline-block px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Contact Partnerships
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
