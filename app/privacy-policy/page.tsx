export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <div className="max-w-[740px] mx-auto">
          <h1 className="text-[42px] font-serif font-normal italic mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-[17px] leading-[1.7]">
            <p className="text-sm text-gray-600">Last updated: April 19, 2026</p>

            <p>
              BEST Magazine ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Information We Collect</h2>
            
            <p>
              We may collect information about you in a variety of ways. The information we may 
              collect on the Site includes personal data, such as your name, email address, and 
              other contact information you voluntarily provide to us.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Use of Your Information</h2>
            
            <p>
              We use the information we collect to operate and maintain our website, send you 
              newsletters and marketing communications, respond to your inquiries, and improve 
              our services.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Disclosure of Your Information</h2>
            
            <p>
              We may share information we have collected about you in certain situations. Your 
              information may be disclosed as follows: by law or to protect rights, with third-party 
              service providers, and with your consent.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Contact Us</h2>
            
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@bestmagazine.ca" className="underline hover:opacity-70">
                privacy@bestmagazine.ca
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
