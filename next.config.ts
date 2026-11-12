import type { NextConfig } from "next";

// Search engines stay out until ALLOW_INDEXING=true is set (see lib/seo.ts).
const allowIndexing = process.env.ALLOW_INDEXING === "true";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...(allowIndexing ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }]),
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/(photos|brand)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  // Old firststay.ae URLs (brief §6) → new pages
  async redirects() {
    return [
      { source: "/Booking", destination: "/#homes", permanent: true },
      { source: "/Amenities", destination: "/#ready", permanent: true },
      { source: "/property-management", destination: "/#owners", permanent: true },
      { source: "/About", destination: "/", permanent: true },
      { source: "/Contact", destination: "/#contact", permanent: true },
      { source: "/stays", destination: "/#homes", permanent: false },
    ];
  },
};

export default nextConfig;
