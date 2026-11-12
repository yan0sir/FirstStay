import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FirstStay Holiday Homes",
    short_name: "FirstStay",
    description: "Holiday homes in Dubai with Burj Khalifa, sea and skyline views.",
    start_url: "/",
    display: "standalone",
    background_color: "#eae5dc",
    theme_color: "#eae5dc",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
