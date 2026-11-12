// Site-wide settings. Values marked [LATER] are placeholders from website-brief.md §8.

export const site = {
  name: "FirstStay Holiday Homes",
  shortName: "FirstStay",
  tagline: "Your key to Dubai",
  phone: { display: "+971 56 526 3886", href: "tel:+971565263886", e164: "+971565263886" }, // [LATER] confirm public number
  whatsapp: "https://wa.me/971565263886", // [LATER] confirm WhatsApp number
  email: "reservations@firststay.ae",
  address: {
    street: "Westburry Tower, Office 1505",
    locality: "Business Bay",
    city: "Dubai",
    region: "Dubai",
    country: "AE",
    full: "Westburry Tower, Office 1505, Business Bay, Dubai, UAE",
  },
  geo: { lat: 25.1857, lng: 55.2789 }, // Business Bay office (approximate)
  hours: "Office Mon–Fri 8:30–17:00 · Guest line 24/7", // [LATER] confirm wording
  bookingEngine: "https://booking.firststay.ae",
  social: [
    { label: "Instagram", handle: "@firststay_dubai", href: "https://www.instagram.com/firststay_dubai/" },
    { label: "TikTok", handle: "@firststay_dubai", href: "https://www.tiktok.com/@firststay_dubai" },
    { label: "Facebook", handle: "FirstStay", href: "https://www.facebook.com/profile.php?id=61551492111944" },
  ],
};

export const nav = [
  { label: "The homes", href: "/#homes" },
  { label: "Neighbourhoods", href: "/#neighbourhoods" },
  { label: "How we host", href: "/#ready" },
  { label: "Guest reviews", href: "/#reviews" },
  { label: "For owners", href: "/#owners" },
  { label: "Questions", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const whatsappWith = (text: string) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;
