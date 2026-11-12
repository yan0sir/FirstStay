import type { MetadataRoute } from "next";
import { homes } from "@/lib/homes";
import { abs } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1, images: [abs("/photos/burj-royale-2br/01.jpg")] },
    ...homes.map((h) => ({
      url: abs(`/stays/${h.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: h.photos.map((p) => abs(p.src)),
    })),
  ];
}
