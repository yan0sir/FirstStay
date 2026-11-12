import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Reveal, SplitLines } from "@/components/motion";
import { PropertyCard } from "@/components/property-card";
import { ArrowRight, ArrowUpRight, BrandIcon, Pin } from "@/components/icons";
import { Gallery } from "@/components/stay/gallery";
import { BookingCard, MobileBookingBar } from "@/components/stay/booking-card";
import { getHome, homes, neighbourhoods, reviews } from "@/lib/homes";
import { homeJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => homes.map((h) => ({ slug: h.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const h = getHome((await params).slug);
  if (!h) return {};
  const title = `${h.name}, ${h.neighbourhood}`;
  const description = `${h.hook} ${h.bedrooms}-bedroom holiday home for ${h.guests} guests in ${h.building}, ${h.neighbourhood}, Dubai. From AED ${h.fromAed.toLocaleString("en-AE")} a night. Book direct with FirstStay.`;
  const url = `/stays/${h.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "en-AE": url, "x-default": url } },
    openGraph: { type: "website", locale: "en_AE", url, title: `${h.name} · ${h.neighbourhood}`, description: h.hook, images: [{ url: h.photos[0].src, alt: h.photos[0].alt }] },
    twitter: { card: "summary_large_image", title: `${h.name} · ${h.neighbourhood}`, description: h.hook, images: [h.photos[0].src] },
    other: { "geo.region": "AE-DU", "geo.placename": h.neighbourhood, "geo.position": `${h.geo.lat};${h.geo.lng}`, ICBM: `${h.geo.lat}, ${h.geo.lng}` },
  };
}

export default async function StayPage({ params }: { params: Promise<{ slug: string }> }) {
  const h = getHome((await params).slug);
  if (!h) notFound();
  const area = neighbourhoods.find((n) => n.slug === h.area)!;
  const homeReviews = reviews.filter((r) => r.home === h.slug);
  const others = homes.filter((x) => x.slug !== h.slug);
  const maps = `https://www.google.com/maps/search/?api=1&query=${h.geo.lat},${h.geo.lng}`;

  return (
    <>
      <Header pill={false} />
      <main id="main" className="pt-[72px] md:pt-[84px]">
        {/* Title */}
        <section className="container-x pb-10 pt-10 md:pb-14 md:pt-16">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-leather">
              <li><Link href="/" className="hover:text-velvet">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/#homes" className="hover:text-velvet">Stays</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-velvet">{h.name}</li>
            </ol>
          </nav>
          <div className="mt-10 grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <Reveal><p className="eyebrow">{h.neighbourhood} · {h.building}</p></Reveal>
              <SplitLines as="h1" inView={false} delay={0.1} className="t-h1 mt-6" lines={[h.name]} />
            </div>
            <Reveal delay={0.2} className="md:col-span-4 md:text-right">
              <p className="text-[0.98rem]">
                {h.bedrooms} {h.bedrooms === 1 ? "bedroom" : "bedrooms"} · {h.bathrooms} {h.bathrooms === 1 ? "bathroom" : "bathrooms"} · up to {h.guests} guests
              </p>
              {h.rating && (
                <p className="mt-1 text-velvet">
                  <span aria-hidden className="mr-2 inline-block size-[7px] -translate-y-px rotate-45 bg-palm-700" />
                  {h.rating.toFixed(1)} <span className="text-leather">guest rating out of 10</span>
                </p>
              )}
            </Reveal>
          </div>
        </section>

        <Gallery photos={h.photos} name={h.name} />

        {/* Story + booking */}
        <section className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow">The home</p></Reveal>
            <Reveal delay={0.08}>
              <p className="t-lead mt-6">{h.hook}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="t-body-lg mt-8 max-w-2xl">{h.intro}</p>
            </Reveal>

            <ul className="mt-14 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
              {h.icons.map((x, i) => (
                <Reveal as="li" key={x.label} delay={i * 0.05} className="flex flex-col gap-4 bg-timeless p-6">
                  <BrandIcon name={x.icon} className="size-8 text-palm-700" />
                  <span className="text-velvet">{x.label}</span>
                </Reveal>
              ))}
            </ul>

            <div className="mt-16">
              <h2 className="t-h3">What&rsquo;s in the home</h2>
              <ul className="mt-6 border-t border-line">
                {h.highlights.map((x) => (
                  <li key={x} className="flex gap-4 border-b border-line py-4">
                    <span aria-hidden className="mt-[0.6rem] size-[6px] shrink-0 rotate-45 bg-palm-700" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16">
              <h2 className="t-h3">In the building</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {h.building_amenities.map((x) => (
                  <li key={x} className="border border-line-strong px-4 py-2 text-[0.95rem] text-velvet">{x}</li>
                ))}
              </ul>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="t-h3">Good to know</h2>
                <dl className="mt-6 space-y-3 text-[0.98rem]">
                  <div className="flex justify-between gap-4 border-b border-line pb-3"><dt>Check-in</dt><dd className="text-velvet">from {h.checkIn}</dd></div>
                  <div className="flex justify-between gap-4 border-b border-line pb-3"><dt>Check-out</dt><dd className="text-velvet">by {h.checkOut}</dd></div>
                  <div className="flex justify-between gap-4 border-b border-line pb-3"><dt>Guests</dt><dd className="text-velvet">up to {h.guests}</dd></div>
                  <div className="flex justify-between gap-4 border-b border-line pb-3"><dt>Guest line</dt><dd className="text-velvet">24/7</dd></div>
                </dl>
                <p className="mt-4 text-sm text-leather/85">Dubai&rsquo;s Tourism Dirham fee is charged per bedroom per night and shown before you pay.</p>
              </div>
              <div>
                <h2 className="t-h3">Location</h2>
                <p className="mt-6 flex gap-3"><Pin className="mt-0.5 size-5 shrink-0 text-palm-700" /> {h.building}, {h.neighbourhood}, Dubai</p>
                <p className="mt-4 text-[0.98rem]">{area.body}</p>
                <a href={maps} target="_blank" rel="noopener" className="link mt-5">Open in Google Maps <ArrowUpRight /></a>
              </div>
            </div>

            {homeReviews.length > 0 && (
              <div className="mt-20 border-t border-line pt-12">
                <p className="eyebrow">Guests say</p>
                {homeReviews.map((r) => (
                  <figure key={r.name} className="mt-6">
                    <blockquote className="font-display text-[clamp(1.6rem,1.3rem+1.2vw,2.4rem)] font-medium leading-[1.18] text-velvet">&ldquo;{r.quote}&rdquo;</blockquote>
                    <figcaption className="mt-5 text-[0.95rem]"><span className="text-velvet">{r.name}</span> · {r.date}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>

          <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block" aria-label="Book this home">
            <div className="sticky top-28">
              <BookingCard slug={h.slug} />
              <p className="mt-6 text-center text-sm">
                Questions? <a href={site.whatsapp} target="_blank" rel="noopener" className="link">WhatsApp us</a>
              </p>
            </div>
          </aside>
        </section>

        {/* More homes */}
        <section aria-labelledby="more-title" className="section-y border-t border-line bg-ivory">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SplitLines id="more-title" className="t-h2" lines={[<span key="more">More <span className="italic-accent">homes</span></span>]} />
              <Link href="/#homes" className="link">All homes <ArrowRight /></Link>
            </div>
            <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-10">
              {others.map((x, i) => (
                <Reveal key={x.slug} delay={i * 0.08}>
                  <PropertyCard home={x} sizes="(min-width:768px) 30vw, 90vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <div aria-hidden className="h-20 bg-velvet lg:hidden" />
      <MobileBookingBar slug={h.slug} />
      <JsonLd data={homeJsonLd(h)} />
    </>
  );
}
