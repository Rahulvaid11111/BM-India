import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 py-16">
        <div className="max-w-[740px] mx-auto">
          <h1 className="text-[42px] font-serif font-normal italic mb-8">About BEST Magazine</h1>
          
          <div className="space-y-6 text-[17px] leading-[1.7]">
            <p>
              BEST Magazine is India&apos;s premier destination for luxury lifestyle, fashion, beauty, and culture. 
              Since our inception, we&apos;ve been dedicated to bringing our readers the finest in editorial content, 
              showcasing the very best in Indian and international style.
            </p>

            <p>
              Our mission is to inspire, inform, and celebrate the art of living well. From the latest runway 
              trends to exclusive interviews with cultural icons, BEST Magazine delivers sophisticated content 
              for the discerning reader.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Our Vision</h2>
            
            <p>
              We believe in the power of exceptional storytelling and visual excellence. Our team of editors, 
              writers, and photographers work tirelessly to bring you content that not only informs but inspires.
            </p>

            <p>
              Based in India with a global perspective, BEST Magazine bridges the gap between local talent 
              and international trends, celebrating the unique voice of Indian luxury while maintaining 
              our connection to the global fashion and culture community.
            </p>

            <h2 className="text-[28px] font-serif font-normal mt-12 mb-6">Contact Us</h2>
            
            <p>
              For editorial inquiries, partnerships, or general questions, please visit our{" "}
              <Link href="/contact" className="underline hover:opacity-70">contact page</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
