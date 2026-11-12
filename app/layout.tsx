import type { Metadata, Viewport } from "next";
import { Alegreya_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion";
import { BookingProvider } from "@/components/booking/booking";
import { JsonLd } from "@/components/json-ld";
import { Intro, introScript } from "@/components/intro";
import { allowIndexing, defaultDescription, siteJsonLd, siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

// Headlines: PP Cirka per the brand guidelines. Until its web licence is bought, Cormorant Garamond stands in
// (same fine, high-contrast serif feel, with real weights). Then load Cirka with next/font/local as --font-cirka.
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
// Body: Alegreya Sans, the guidelines' body font.
const sans = Alegreya_Sans({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-alegreya-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FirstStay Holiday Homes | Luxury Holiday Homes in Dubai",
    template: "%s | FirstStay Dubai",
  },
  description: defaultDescription,
  applicationName: site.name,
  keywords: [
    "holiday homes Dubai",
    "holiday home rental Dubai",
    "short stay apartments Dubai",
    "Burj Khalifa view apartment",
    "Downtown Dubai apartment rental",
    "Dubai Harbour beachfront apartment",
    "Dubai Creek Harbour apartment",
    "serviced apartments Dubai",
    "vacation rental UAE",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  alternates: {
    canonical: "/",
    languages: { "en-AE": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "/",
    siteName: site.name,
    title: "FirstStay Holiday Homes | Your key to Dubai",
    description: "Four holiday homes with Burj Khalifa, sea and skyline views in Downtown Dubai, Dubai Harbour and Creek Harbour. Book direct.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstStay Holiday Homes | Your key to Dubai",
    description: "Four holiday homes with Burj Khalifa, sea and skyline views. Book direct.",
  },
  // Kept out of search engines until launch (lib/seo.ts → ALLOW_INDEXING)
  robots: allowIndexing
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  other: {
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
  formatDetection: { telephone: true, email: true, address: false },
};

export const viewport: Viewport = {
  themeColor: "#eae5dc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AE" dir="ltr" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="grain">
        <Intro />
        <a href="#main" className="sr-only z-[100] bg-velvet px-4 py-3 text-timeless focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <SmoothScroll />
        <BookingProvider>{children}</BookingProvider>
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  );
}
