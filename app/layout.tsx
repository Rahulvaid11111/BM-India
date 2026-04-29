import type { Metadata } from "next";
import { EB_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bestmagazine.ca'),
  title: {
    default: "BEST — The Magazine",
    template: "%s | BEST Magazine"
  },
  description: "The number 1 digital magazine covering the best in lifestyle, culture, fashion, beauty, timepieces, celebrities, podcasts, jewellery, automotive and around the world.",
  keywords: ["fashion", "beauty", "luxury", "culture", "celebrity", "business", "lifestyle", "magazine", "timepieces", "jewellery", "automotive", "podcasts"],
  authors: [{ name: "BEST Magazine" }],
  creator: "BEST Magazine",
  publisher: "BEST Magazine",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "BEST Magazine",
    title: "BEST — The Magazine",
    description: "The number 1 digital magazine covering the best in lifestyle, culture, fashion, beauty, and more.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BEST Magazine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BEST — The Magazine",
    description: "The number 1 digital magazine covering the best in lifestyle, culture, fashion, beauty, and more.",
    images: ["/og-image.jpg"],
    creator: "@bestmagazine",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
