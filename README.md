# FirstStay Holiday Homes: website

Next.js 15 (App Router) + Tailwind CSS v4 + Motion + Lenis. Brand colours and fonts follow the FirstStay Brand Guidelines: cream (Timeless) page, Velvet red and Palm green accents, Leather body text.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (stop the dev server first)
```

## Pages

| Route | What it is |
|---|---|
| `/` | Homepage: arch hero that opens to full-bleed, homes, neighbourhoods, how we host, reviews, arrival steps, owners, FAQ, contact band, newsletter |
| `/stays/[slug]` | One page per home (4), with gallery + lightbox, booking card, amenities, location, reviews |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Generated from `app/` |

Bookings hand off to the Hostaway booking engine (`lib/booking.ts`) with dates and guests prefilled.

## SEO (UAE)

- `en-AE` language, `en_AE` Open Graph locale, Dubai geo meta tags (`AE-DU`)
- Structured data: Organization + LodgingBusiness (Business Bay office), WebSite, ItemList of homes, FAQPage, and per home VacationRental + BreadcrumbList (`lib/seo.ts`)
- Canonicals, sitemap with images, share images (`app/opengraph-image.jpg`), titles and descriptions per page
- Old firststay.ae URLs redirect to the new pages (`next.config.ts`)

### Search engines are blocked until launch

By default the site sends `noindex` (meta tag + `X-Robots-Tag` header) and `robots.txt` disallows everything.

To launch, set these environment variables on Vercel (Production) and redeploy:

| Variable | Value |
|---|---|
| `ALLOW_INDEXING` | `true` |
| `NEXT_PUBLIC_SITE_URL` | `https://firststay.ae` (or the live domain) |

## Content

- Homes, neighbourhoods, reviews: `lib/homes.ts` (facts from Hostaway, see `../data/listings.json`)
- Contact details and social links: `lib/site.ts`
- FAQ: `lib/faq.ts` (also published as structured data, so keep answers accurate)
- Photos: `public/photos/<home>/0N.jpg`; brand marks, icons and illustrations: `public/brand/`

## Still to do

- PP Cirka web licence: load it with `next/font/local` as `--font-cirka` (Cormorant Garamond stands in)
- Confirm the Hostaway booking-engine query parameters (`lib/booking.ts`)
- Connect the newsletter form (`app/api/newsletter/route.ts`) to a mailing tool
- Confirm public phone/WhatsApp number and office hours (`lib/site.ts`)
- Interior photos for Grand Bleu (only terrace and sea views so far)
