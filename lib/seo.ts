import { averageRating, homes, type Home } from "./homes";
import { site } from "./site";

/** Public URL of the site. Set NEXT_PUBLIC_SITE_URL on Vercel once the domain is connected. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://firststay.ae").replace(/\/$/, "");

/**
 * Search engines are kept out until launch. Set ALLOW_INDEXING=true on Vercel (Production) to go live:
 * that flips the robots meta tag, the X-Robots-Tag header and robots.txt together.
 */
export const allowIndexing = process.env.ALLOW_INDEXING === "true";

export const abs = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const defaultDescription =
  "Luxury holiday homes in Dubai with Burj Khalifa, sea and skyline views: Downtown Dubai, Dubai Harbour and Dubai Creek Harbour. Fully serviced short stays with a 24/7 guest line. Book direct with FirstStay.";

const orgId = `${siteUrl}/#organization`;

/** Organisation + local business (the Business Bay office) + website. Rendered on every page. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LodgingBusiness"],
        "@id": orgId,
        name: site.name,
        alternateName: "FirstStay",
        url: siteUrl,
        logo: abs("/brand/monogram.png"),
        image: abs("/photos/burj-royale-2br/01.jpg"),
        description: defaultDescription,
        email: site.email,
        telephone: site.phone.e164,
        priceRange: "$$$",
        currenciesAccepted: "AED",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
        areaServed: [
          { "@type": "City", name: "Dubai" },
          { "@type": "Place", name: "Downtown Dubai" },
          { "@type": "Place", name: "Dubai Harbour" },
          { "@type": "Place", name: "Dubai Creek Harbour" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: site.phone.e164,
          contactType: "reservations",
          areaServed: "AE",
          availableLanguage: ["English"],
          hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
        },
        sameAs: site.social.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        inLanguage: "en-AE",
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** Homepage: the collection of homes as an ItemList. */
export function homesListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FirstStay holiday homes in Dubai",
    itemListElement: homes.map((h, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/stays/${h.slug}`), name: h.name })),
  };
}

/** One home: Google's VacationRental structured data + breadcrumbs. */
export function homeJsonLd(h: Home) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VacationRental",
        "@id": `${abs(`/stays/${h.slug}`)}#rental`,
        name: h.name,
        identifier: String(h.hostawayId),
        url: abs(`/stays/${h.slug}`),
        description: h.intro,
        brand: { "@id": orgId },
        image: h.photos.map((p) => abs(p.src)),
        checkinTime: `${h.checkIn}:00+04:00`,
        checkoutTime: `${h.checkOut}:00+04:00`,
                address: {
          "@type": "PostalAddress",
          streetAddress: h.building,
          addressLocality: h.neighbourhood,
          addressRegion: "Dubai",
          addressCountry: "AE",
        },
        latitude: h.geo.lat,
        longitude: h.geo.lng,
        containsPlace: {
          "@type": "Accommodation",
          additionalType: "EntirePlace",
          numberOfBedrooms: h.bedrooms,
          numberOfBathroomsTotal: h.bathrooms,
          occupancy: { "@type": "QuantitativeValue", maxValue: h.guests },
          amenityFeature: h.highlights.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Stays", item: abs("/#homes") },
          { "@type": "ListItem", position: 3, name: h.name, item: abs(`/stays/${h.slug}`) },
        ],
      },
    ],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export { averageRating };
