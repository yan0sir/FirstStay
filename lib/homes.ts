// The four Dubai homes. Facts come from the Hostaway booking engine (see ../data/listings.json).
// Later this is replaced by the Hostaway API + CMS layer described in implementation-plan.md (Phase 3).

export type AreaSlug = "downtown-dubai" | "dubai-harbour" | "dubai-creek-harbour";

export type Home = {
  slug: string;
  hostawayId: number;
  name: string;
  short: string;
  building: string;
  area: AreaSlug;
  neighbourhood: "Downtown Dubai" | "Dubai Harbour" | "Dubai Creek Harbour";
  bedrooms: number;
  bathrooms: number;
  guests: number;
  fromAed: number;
  rating: number | null;
  hook: string;
  intro: string;
  highlights: string[];
  building_amenities: string[];
  icons: { icon: string; label: string }[];
  geo: { lat: number; lng: number };
  checkIn: string;
  checkOut: string;
  photos: { src: string; alt: string }[];
};

const p = (slug: string, items: [number, string][]) =>
  items.map(([n, alt]) => ({ src: `/photos/${slug}/0${n}.jpg`, alt }));

export const homes: Home[] = [
  {
    slug: "burj-royale-2br",
    hostawayId: 213232,
    name: "Burj Royale Two Bedroom",
    short: "Burj Royale 2BR",
    building: "Burj Royale",
    area: "downtown-dubai",
    neighbourhood: "Downtown Dubai",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    fromAed: 1434,
    rating: 9.5,
    hook: "The full Burj Khalifa and fountain view, from the sofa and the bed.",
    intro:
      "A two-bedroom apartment in Burj Royale that looks straight at the Burj Khalifa and the Dubai Fountain through floor-to-ceiling windows. Dubai Mall is a short walk away; the view is the reason to stay in.",
    highlights: [
      "Panoramic Burj Khalifa and Dubai Fountain views",
      "Floor-to-ceiling windows and a spacious balcony",
      "Two king-size bedrooms, each with a personal safe",
      "Walk-in shower and bathtub, complimentary toiletries",
      "Fully equipped kitchen, dining for four",
      "500 Mbps fibre Wi-Fi, 65\" Samsung OLED smart TV with Netflix",
    ],
    building_amenities: ["Heated pools with Burj Khalifa views", "Gym", "24-hour security", "Landscaped gardens with BBQ stations", "Shared remote-work space", "Children's play area"],
    icons: [
      { icon: "bed", label: "2 king bedrooms" },
      { icon: "bathroom", label: "2 bathrooms" },
      { icon: "wifi", label: "500 Mbps Wi-Fi" },
      { icon: "tv", label: "65\" OLED TV" },
      { icon: "pool", label: "Heated pools" },
      { icon: "dining", label: "Full kitchen" },
    ],
    geo: { lat: 25.19154, lng: 55.28096 },
    checkIn: "15:00",
    checkOut: "11:00",
    photos: p("burj-royale-2br", [
      [1, "Living room facing the Burj Khalifa, Burj Royale two bedroom"],
      [4, "Bedroom with a floor-to-ceiling view of the Burj Khalifa"],
      [2, "Living room with sofa and city view"],
      [3, "Dining table for four and the living area"],
      [5, "King bed beside the Burj Khalifa view"],
    ]),
  },
  {
    slug: "burj-royale-1br",
    hostawayId: 213233,
    name: "Burj Royale One Bedroom",
    short: "Burj Royale 1BR",
    building: "Burj Royale",
    area: "downtown-dubai",
    neighbourhood: "Downtown Dubai",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    fromAed: 855,
    rating: 9.3,
    hook: "A few minutes' walk to Dubai Mall. Coffee on the balcony, city all around.",
    intro:
      "A one-bedroom apartment in Burj Royale, steps from the Burj Khalifa and Dubai Mall. Bright, calm and fully equipped, with the whole of Downtown on the doorstep.",
    highlights: [
      "Steps from Burj Khalifa and Dubai Mall",
      "King-size bed with personal safe, hypoallergenic duvets",
      "Walk-in shower, fresh towels, complimentary toiletries",
      "Fully equipped kitchen",
      "Fast fibre Wi-Fi and smart TV",
    ],
    building_amenities: ["Heated pools with Burj Khalifa views", "Gym", "24-hour security", "Landscaped gardens with BBQ stations", "Shared remote-work space", "Children's play area"],
    icons: [
      { icon: "bed", label: "King bedroom" },
      { icon: "bathroom", label: "Walk-in shower" },
      { icon: "wifi", label: "Fibre Wi-Fi" },
      { icon: "tv", label: "Smart TV" },
      { icon: "pool", label: "Heated pools" },
      { icon: "dining", label: "Full kitchen" },
    ],
    geo: { lat: 25.19154, lng: 55.28096 },
    checkIn: "15:00",
    checkOut: "11:00",
    photos: p("burj-royale-1br", [
      [1, "Living room with city view, Burj Royale one bedroom"],
      [4, "Balcony seating above Downtown Dubai"],
      [3, "King bedroom opening onto the balcony"],
      [5, "Open-plan kitchen and dining area"],
      [2, "The Burj Khalifa above Downtown Dubai"],
    ]),
  },
  {
    slug: "grand-bleu-elie-saab-2br",
    hostawayId: 482471,
    name: "Grand Bleu by Elie Saab",
    short: "Grand Bleu 2BR",
    building: "Grand Bleu Tower by Elie Saab, Emaar Beachfront",
    area: "dubai-harbour",
    neighbourhood: "Dubai Harbour",
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    fromAed: 1036,
    rating: 9.0,
    hook: "Couture interiors above a private beach. Calm, by the sea.",
    intro:
      "A two-bedroom residence in Grand Bleu Tower by Elie Saab on Emaar Beachfront, with a private beach below and the Palm on the horizon. Couture interiors, a waterfront balcony and a spa-style bathroom.",
    highlights: [
      "Private beach access, couture interiors by Elie Saab",
      "Two king bedrooms; the second with a walk-in wardrobe and its own balcony",
      "Open-plan living onto a private waterfront balcony",
      "Spa-style bathroom with bathtub and walk-in shower",
      "Dedicated laundry room, 64\" smart TV, high-speed Wi-Fi",
    ],
    building_amenities: ["Private beach", "Pool", "Gym"],
    icons: [
      { icon: "bed", label: "2 king bedrooms" },
      { icon: "bathroom", label: "Spa bathroom" },
      { icon: "pool", label: "Private beach & pool" },
      { icon: "wifi", label: "High-speed Wi-Fi" },
      { icon: "tv", label: "64\" smart TV" },
      { icon: "wine", label: "Sea-view balcony" },
    ],
    geo: { lat: 25.100111, lng: 55.1411174 },
    checkIn: "15:00",
    checkOut: "11:00",
    photos: p("grand-bleu-elie-saab-2br", [
      [2, "Sea-view terrace with bar seating, Grand Bleu by Elie Saab"],
      [1, "The private beach and Dubai Harbour from above"],
      [3, "Terrace kitchen with grill, looking out to sea"],
      [4, "Curved terrace above the water"],
      [5, "Turquoise water and the Palm Jumeirah on the horizon"],
    ]),
  },
  {
    slug: "creek-rise-1br",
    hostawayId: 484412,
    name: "Creek Rise One Bedroom",
    short: "Creek Rise 1BR",
    building: "Creek Rise Tower 2",
    area: "dubai-creek-harbour",
    neighbourhood: "Dubai Creek Harbour",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    fromAed: 850,
    rating: 10,
    hook: "Twenty-one floors up, the whole skyline across the water.",
    intro:
      "A one-bedroom apartment on the 21st floor of Creek Rise, looking across the creek to the Burj Khalifa skyline. Floor-to-ceiling windows bring great light by day and the city glow by night.",
    highlights: [
      "21st floor, open views of the Burj Khalifa skyline and the creek",
      "Floor-to-ceiling windows, great light by day and city glow by night",
      "Spacious living room set up for relaxing and entertaining",
    ],
    building_amenities: ["Pool", "Gym"],
    icons: [
      { icon: "bed", label: "King bedroom" },
      { icon: "lamp", label: "21st-floor views" },
      { icon: "wifi", label: "Fast Wi-Fi" },
      { icon: "tv", label: "Smart TV" },
      { icon: "pool", label: "Pool & gym" },
      { icon: "breakfast", label: "Balcony breakfasts" },
    ],
    geo: { lat: 25.20916477, lng: 55.34685834 },
    checkIn: "15:00",
    checkOut: "11:00",
    photos: p("creek-rise-1br", [
      [2, "Living room with a view of the creek, Creek Rise one bedroom"],
      [1, "The Dubai skyline across the creek from Creek Harbour"],
      [3, "Balcony table above the creek"],
      [4, "Open-plan living room and kitchen"],
      [5, "Pool deck at Creek Rise"],
    ]),
  },
];

export const getHome = (slug: string) => homes.find((h) => h.slug === slug);

export const neighbourhoods = [
  {
    slug: "downtown-dubai" as AreaSlug,
    name: "Downtown Dubai",
    title: "Under the tallest tower in the world",
    body: "Wake to the Burj Khalifa, walk to Dubai Mall for breakfast, and watch the fountains from your balcony at night. The city's centre, a lift ride away.",
    image: "/photos/burj-royale-1br/02.jpg",
    alt: "The Burj Khalifa above Downtown Dubai",
  },
  {
    slug: "dubai-harbour" as AreaSlug,
    name: "Dubai Harbour",
    title: "Sand underfoot, the Palm on the horizon",
    body: "A beachfront address on Emaar Beachfront: a private beach, sea-view terraces, and Dubai Marina and JBR a short drive along the coast.",
    image: "/photos/grand-bleu-elie-saab-2br/01.jpg",
    alt: "The private beach at Dubai Harbour",
  },
  {
    slug: "dubai-creek-harbour" as AreaSlug,
    name: "Creek Harbour",
    title: "The skyline, seen from across the water",
    body: "Quieter waterfront living with the best view of the city skyline: a creekside promenade, a resort-style pool, and Downtown a short drive away.",
    image: "/photos/creek-rise-1br/01.jpg",
    alt: "The Dubai skyline across the creek",
  },
];

// Real guest reviews from the Hostaway booking engine (10/10, published publicly). Excerpted, not edited.
export const reviews = [
  {
    quote:
      "The location couldn't be better: it's only a 5-minute walk to Dubai Mall, and the Burj Khalifa view from the apartment is simply breathtaking.",
    name: "Andrea",
    date: "February 2026",
    home: "burj-royale-2br",
  },
  {
    quote:
      "Fantastic location – just a few meters from Burj Khalifa. The apartment is extremely clean and very comfortable, with everything you need for a pleasant stay.",
    name: "Radoslava",
    date: "February 2026",
    home: "burj-royale-1br",
  },
];

export const averageRating = Math.round((homes.reduce((s, h) => s + (h.rating ?? 0), 0) / homes.length) * 10) / 10;
