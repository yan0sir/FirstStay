import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/seo";

// Before launch every crawler is turned away. Set ALLOW_INDEXING=true on Vercel to open the site up.
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
