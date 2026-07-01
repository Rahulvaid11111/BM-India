export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <div className="max-w-[740px] mx-auto">
          <h1 className="text-[42px] font-serif font-normal italic mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-[17px] leading-[1.7]">
            <p className="text-sm text-gray-600">Last updated: April 19, 2026</p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Agreement to Terms</h2>
            
            <p>
              By accessing and using BEST Magazine&apos;s website, you accept and agree to be bound by 
              the terms and provision of this agreement.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Use License</h2>
            
            <p>
              Permission is granted to temporarily download one copy of the materials on BEST Magazine&apos;s 
              website for personal, non-commercial transitory viewing only.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Disclaimer</h2>
            
            <p>
              The materials on BEST Magazine&apos;s website are provided on an &apos;as is&apos; basis. BEST Magazine 
              makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including, without limitation, implied warranties or conditions of merchantability, fitness for 
              a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Limitations</h2>
            
            <p>
              In no event shall BEST Magazine or its suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising out of 
              the use or inability to use the materials on BEST Magazine&apos;s website.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Contact</h2>
            
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@bestmagazine.ca" className="underline hover:opacity-70">
                legal@bestmagazine.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
