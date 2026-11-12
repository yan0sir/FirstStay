import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import Image from "next/image";
import { Parallax, Reveal, SplitLines } from "@/components/motion";
import { SectionHead } from "@/components/section-head";
import { Illustration } from "@/components/illustration";
import { Filmstrip } from "@/components/stay/filmstrip";
import { HomeCta } from "@/components/stay/home-cta";
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
  const neighbours = others.filter((x) => x.area === h.area);
  const maps = `https://www.google.com/maps/search/?api=1&query=${h.geo.lat},${h.geo.lng}`;
  const illo = ({ "downtown-dubai": "key", "dubai-harbour": "palm", "dubai-creek-harbour": "bird" } as const)[h.area];
  const index = homes.findIndex((x) => x.slug === h.slug);

  return (
    <>
      <Header pill={false} />
      <main id="main" className="pt-[72px] md:pt-[84px]">
        {/* Title */}
        <section className="container-x pb-10 pt-8 md:pb-14 md:pt-12">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-leather">
              <li><Link href="/" className="hover:text-velvet">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/#homes" className="hover:text-velvet">The collection</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-velvet">{h.name}</li>
            </ol>
          </nav>
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHead n={index + 1} label={`${h.neighbourhood} · ${h.building.split(",")[0]}`} />
              <SplitLines as="h1" inView={false} delay={0.1} className="t-h1 mt-7" lines={[h.name]} />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-2xl font-display text-[clamp(1.35rem,1.1rem+0.9vw,1.9rem)] italic leading-snug text-velvet">{h.hook}</p>
              </Reveal>
            </div>
            <Reveal delay={0.25} className="lg:col-span-4">
              <ul className="grid grid-cols-3 border-y border-line text-center">
                <li className="py-4"><BrandIcon name="bed" className="mx-auto size-6 text-palm-700" /><p className="mt-2 text-[0.92rem]">{h.bedrooms} {h.bedrooms === 1 ? "bedroom" : "bedrooms"}</p></li>
                <li className="border-x border-line py-4"><BrandIcon name="bathroom" className="mx-auto size-6 text-palm-700" /><p className="mt-2 text-[0.92rem]">{h.bathrooms} {h.bathrooms === 1 ? "bath" : "baths"}</p></li>
                <li className="py-4"><BrandIcon name="key-card" className="mx-auto size-6 text-palm-700" /><p className="mt-2 text-[0.92rem]">{h.guests} guests</p></li>
              </ul>
              <div className="mt-5 flex items-center justify-between gap-4">
                {h.rating ? (
                  <p className="text-velvet">
                    <span aria-hidden className="mr-2 inline-block size-[7px] -translate-y-px rotate-45 bg-palm-700" />
                    {h.rating.toFixed(1)} <span className="text-leather">guest rating</span>
                  </p>
                ) : <span />}
                <a href="#book" className="link">Book this home <ArrowRight /></a>
              </div>
            </Reveal>
          </div>
        </section>

        <div id="photos" className="scroll-mt-28">
          <Gallery photos={h.photos} name={h.name} />
        </div>

        {/* The home + sticky booking card */}
        <section className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <SectionHead n={1} label="The home" />
            <Reveal delay={0.08}>
              <p className="t-lead mt-8">
                <span aria-hidden className="float-left mr-3 mt-1 font-display text-[4.6rem] leading-[0.8] text-palm-700">{h.intro.charAt(0)}</span>
                <span className="sr-only">{h.intro.charAt(0)}</span>
                {h.intro.slice(1)}
              </p>
            </Reveal>

            <ul className="mt-14 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
              {h.icons.map((x, i) => (
                <Reveal as="li" key={x.label} delay={i * 0.05} className="group flex flex-col gap-4 bg-timeless p-6 transition-colors duration-500 hover:bg-ivory">
                  <BrandIcon name={x.icon} className="size-8 text-palm-700 transition-[color,transform] duration-500 group-hover:-translate-y-0.5 group-hover:text-velvet" />
                  <span className="text-velvet">{x.label}</span>
                </Reveal>
              ))}
            </ul>

            <div className="mt-16 grid gap-12 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="t-h3">What&rsquo;s in the home</h2>
                <ol className="mt-6 border-t border-line">
                  {h.highlights.map((x, i) => (
                    <li key={x} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-4">
                      <span className="font-display italic text-palm-700">{String(i + 1).padStart(2, "0")}</span>
                      {x}
                    </li>
                  ))}
                </ol>
                <h2 className="t-h3 mt-14">In the building</h2>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {h.building_amenities.map((x) => (
                    <li key={x} className="border border-line-strong px-4 py-2 text-[0.95rem] text-velvet">{x}</li>
                  ))}
                </ul>
              </div>
              <Illustration name="armchair" drift={30} className="hidden w-[150px] self-end md:block" />
            </div>
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

        {/* Room by room */}
        <section aria-labelledby="film-title" className="section-y border-t border-line bg-ivory">
          <div className="container-x mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionHead n={2} label="Room by room" />
              <SplitLines id="film-title" className="t-h2 mt-7" lines={["Step inside", <span key="b" className="italic-accent">{h.short}.</span>]} />
            </div>
            <a href="#photos" className="link">See the gallery <ArrowUpRight /></a>
          </div>
          <Filmstrip photos={h.photos} />
        </section>

        {/* The neighbourhood */}
        <section aria-labelledby="area-title" className="on-dark relative bg-palm-700 text-timeless">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[60svh] overflow-hidden lg:min-h-[85svh]">
              <Parallax amount={50} className="absolute inset-0">
                <Image src={area.image} alt={area.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </Parallax>
            </div>
            <div className="container-x relative flex flex-col justify-center py-20 lg:py-24 lg:pl-28 lg:pr-[max(3.5rem,calc((100vw-1440px)/2+3.5rem))]">
              <div aria-hidden className="absolute -left-[75px] top-16 hidden w-[150px] lg:block">
                <div className="relative aspect-[3/5] rounded-full bg-ivory shadow-[0_30px_60px_-30px_rgba(30,8,14,.55)]">
                  <Image src={`/brand/illustrations/${illo}.png`} alt="" fill sizes="150px" className="object-contain p-3" />
                </div>
              </div>
              <SectionHead n={3} label="The neighbourhood" light />
              <SplitLines id="area-title" className="t-h2 mt-7 text-timeless" lines={[area.name, <span key="b" className="italic-accent">{area.title.charAt(0).toLowerCase() + area.title.slice(1)}.</span>]} />
              <Reveal delay={0.1}>
                <p className="t-body-lg mt-7 max-w-md text-timeless/90">{area.body}</p>
              </Reveal>
              <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                <p className="flex items-center gap-2"><Pin className="size-5 text-timeless/80" />{h.building}</p>
                <a href={maps} target="_blank" rel="noopener" className="link">Open in Google Maps <ArrowUpRight /></a>
              </Reveal>
              {neighbours.length > 0 && (
                <Reveal delay={0.3} className="mt-10 border-t border-timeless/25 pt-6">
                  <p className="text-[0.75rem] uppercase tracking-[0.24em] text-timeless/75">Also here</p>
                  {neighbours.map((x) => (
                    <Link key={x.slug} href={`/stays/${x.slug}`} className="link mt-3">{x.name} <ArrowRight /></Link>
                  ))}
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* Good to know + what guests say */}
        <section aria-labelledby="know-title" className="section-y">
          <div className="container-x grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead n={4} label="Good to know" />
              <h2 id="know-title" className="t-h2 mt-7">Arriving, <span className="italic-accent">simply.</span></h2>
              <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line">
                {[
                  { icon: "key-card", k: "Check-in", v: `from ${h.checkIn}` },
                  { icon: "housekeeping", k: "Check-out", v: `by ${h.checkOut}` },
                  { icon: "bed", k: "Sleeps", v: `up to ${h.guests}` },
                  { icon: "breakfast", k: "Guest line", v: "24 hours" },
                ].map((x) => (
                  <div key={x.k} className="bg-timeless p-6">
                    <BrandIcon name={x.icon} className="size-7 text-palm-700" />
                    <dt className="mt-4 text-[0.72rem] uppercase tracking-[0.22em] text-leather">{x.k}</dt>
                    <dd className="mt-1 font-display text-2xl text-velvet">{x.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm text-leather/85">Dubai&rsquo;s Tourism Dirham fee is charged per bedroom per night and shown before you pay. A passport or Emirates ID is needed for each guest.</p>
            </div>
            <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
              {homeReviews.length > 0 ? (
                homeReviews.map((r) => (
                  <Reveal key={r.name}>
                    <span aria-hidden className="block font-display text-[7rem] leading-[0.6] text-velvet/15">&ldquo;</span>
                    <figure>
                      <blockquote className="font-display text-[clamp(1.7rem,1.3rem+1.5vw,2.7rem)] font-medium leading-[1.16] text-velvet">{r.quote}</blockquote>
                      <figcaption className="mt-6 text-[0.95rem]"><span className="text-velvet">{r.name}</span> · {r.date}</figcaption>
                    </figure>
                  </Reveal>
                ))
              ) : (
                <Reveal className="flex flex-col items-start">
                  <Illustration name="peony" drift={30} className="w-[220px]" />
                  {h.rating && (
                    <p className="mt-8 font-display text-[clamp(3rem,2rem+3vw,5rem)] leading-none text-velvet">
                      {h.rating.toFixed(1)}
                      <span className="ml-3 align-middle font-sans text-base text-leather">guest rating out of 10</span>
                    </p>
                  )}
                </Reveal>
              )}
            </div>
          </div>
        </section>

        <HomeCta slug={h.slug} n={5} />

        {/* More homes */}
        <section aria-labelledby="more-title" className="section-y border-t border-line">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionHead n={6} label="The collection" />
                <SplitLines id="more-title" className="t-h2 mt-7" lines={[<span key="more">More <span className="italic-accent">homes</span></span>]} />
              </div>
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
