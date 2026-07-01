export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <div className="max-w-[740px] mx-auto">
          <h1 className="text-[42px] font-serif font-normal italic mb-8">Contact Us</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-[20px] font-bold uppercase tracking-wider mb-4">Editorial</h2>
              <p className="text-[17px] leading-[1.7] text-gray-700">
                For story pitches and editorial inquiries:<br />
                <a href="mailto:editorial@bestmagazine.ca" className="underline hover:opacity-70">
                  editorial@bestmagazine.ca
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-[20px] font-bold uppercase tracking-wider mb-4">Advertising</h2>
              <p className="text-[17px] leading-[1.7] text-gray-700">
                For advertising opportunities:<br />
                <a href="mailto:advertising@bestmagazine.ca" className="underline hover:opacity-70">
                  advertising@bestmagazine.ca
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-[20px] font-bold uppercase tracking-wider mb-4">Partnerships</h2>
              <p className="text-[17px] leading-[1.7] text-gray-700">
                For brand partnerships and collaborations:<br />
                <a href="mailto:partnerships@bestmagazine.ca" className="underline hover:opacity-70">
                  partnerships@bestmagazine.ca
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-[20px] font-bold uppercase tracking-wider mb-4">General Inquiries</h2>
              <p className="text-[17px] leading-[1.7] text-gray-700">
                For all other questions:<br />
                <a href="mailto:info@bestmagazine.ca" className="underline hover:opacity-70">
                  info@bestmagazine.ca
                </a>
              </p>
            </div>

            <div className="border-t border-gray-300 pt-8 mt-12">
              <h2 className="text-[20px] font-bold uppercase tracking-wider mb-4">Office</h2>
              <p className="text-[17px] leading-[1.7] text-gray-700">
                BEST Magazine<br />
                Mumbai, Maharashtra<br />
                India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
