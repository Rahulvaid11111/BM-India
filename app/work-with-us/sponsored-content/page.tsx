import Link from "next/link";

export default function SponsoredContentPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        {/* Breadcrumb */}
        <div className="py-4 text-[11px] font-semibold uppercase tracking-wider mb-4">
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/work-with-us" className="hover:opacity-70">Work With Us</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span>Sponsored Content</span>
        </div>

        <div className="max-w-[740px] mx-auto">
          <h1 className="text-[42px] font-serif font-normal italic mb-8">Sponsored Content</h1>
          
          <div className="space-y-6 text-[17px] leading-[1.7]">
            <p>
              BEST Magazine's sponsored content solutions allow brands to tell their stories through 
              our editorial lens. Our team of experienced writers, photographers, and editors work 
              with you to create compelling narratives that resonate with our sophisticated audience.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">What We Offer</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Editorial Features</h3>
                <p className="text-gray-700">
                  Long-form articles that showcase your brand's story, values, and products within 
                  the context of luxury lifestyle. Seamlessly integrated with our editorial content.
                </p>
              </div>

              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Video Content</h3>
                <p className="text-gray-700">
                  Professionally produced video features, behind-the-scenes content, and brand 
                  documentaries distributed across our digital platforms.
                </p>
              </div>

              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Social Media Campaigns</h3>
                <p className="text-gray-700">
                  Integrated social media storytelling across Instagram, Facebook, and other platforms, 
                  amplifying your message to our engaged community.
                </p>
              </div>

              <div>
                <h3 className="text-[20px] font-bold uppercase tracking-wider mb-2">Event Coverage</h3>
                <p className="text-gray-700">
                  Comprehensive coverage of brand events, product launches, and exclusive experiences, 
                  bringing your story to life for our readers.
                </p>
              </div>
            </div>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Our Process</h2>
            
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="font-bold">1.</span>
                <span>Consultation to understand your brand objectives and target audience</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">2.</span>
                <span>Custom content strategy developed by our editorial team</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">3.</span>
                <span>Professional production with our award-winning creative team</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">4.</span>
                <span>Strategic distribution across print, digital, and social channels</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold">5.</span>
                <span>Comprehensive performance reporting and analytics</span>
              </li>
            </ol>

            <div className="border-t border-gray-300 pt-8 mt-12">
              <h2 className="text-[28px] font-serif font-normal mb-4">Let's Create Together</h2>
              <p className="mb-6">
                Contact our content studio to discuss how we can bring your brand story to life.
              </p>
              <a 
                href="mailto:content@bestmagazine.ca"
                className="inline-block px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
              >
                Contact Content Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
