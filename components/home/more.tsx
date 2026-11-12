"use client";

import Image from "next/image";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { averageRating, homes, reviews } from "@/lib/homes";
import { faqs } from "@/lib/faq";
import { site, whatsappWith } from "@/lib/site";
import { OvalPattern } from "../brand";
import { SectionHead } from "../section-head";
import { Parallax, Reveal, SplitLines, Unmask } from "../motion";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Plus } from "../icons";

/** Number that counts up once when it scrolls into view. */
function CountUp({ to, decimals = 0, className = "" }: { to: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) { el.textContent = to.toFixed(decimals); return; }
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => (el.textContent = v.toFixed(decimals)) });
    return () => c.stop();
  }, [inView, to, decimals, reduce]);
  return <span ref={ref} className={className}>{to.toFixed(decimals)}</span>;
}

/* ------------------------------------------------------------------ */

export function Reviews() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const r = reviews[i];
  const home = homes.find((h) => h.slug === r.home);
  const go = (d: number) => setI((n) => (n + d + reviews.length) % reviews.length);

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-y scroll-mt-24">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead n={6} label="Guests say" />
          <h2 id="reviews-title" className="sr-only">Guest reviews</h2>
          <Reveal delay={0.1} className="mt-8 flex items-end gap-4">
            <CountUp to={averageRating} decimals={1} className="font-display text-[clamp(5rem,3rem+7vw,9rem)] font-medium leading-[0.8] text-velvet" />
            <span className="pb-2 text-[0.95rem]">average guest<br />rating out of 10</span>
          </Reveal>
          <ul className="mt-10 border-t border-line">
            {homes.map((h, k) => (
              <Reveal as="li" key={h.slug} delay={0.05 * k} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                <span>{h.name}</span>
                <span className="font-display text-2xl text-palm-700">{h.rating?.toFixed(1)}</span>
              </Reveal>
            ))}
          </ul>
          <p className="mt-3 text-sm text-leather/80">Ratings from guests on our booking platform.</p>
        </div>

        <div className="flex flex-col justify-between lg:col-span-7 lg:col-start-6">
          <span aria-hidden className="font-display text-[8rem] leading-[0.6] text-velvet/15">&ldquo;</span>
          <div className="min-h-[15rem] md:min-h-[17rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure key={i} initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                <blockquote className="font-display text-[clamp(1.7rem,1.25rem+1.8vw,3rem)] font-medium leading-[1.15] text-velvet">{r.quote}</blockquote>
                <figcaption className="mt-8 text-[0.95rem]">
                  <span className="text-velvet">{r.name}</span> · {r.date} · {home?.name}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center gap-6">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="flex size-12 items-center justify-center rounded-full border border-line-strong text-velvet transition-colors hover:bg-velvet hover:text-timeless">
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next review" className="flex size-12 items-center justify-center rounded-full border border-line-strong text-velvet transition-colors hover:bg-velvet hover:text-timeless">
              <ChevronRight />
            </button>
            <span className="text-sm tracking-[0.2em] text-leather">0{i + 1} / 0{reviews.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */

const ownerFacts = [
  { big: "20%", label: "Full management fee: pricing, guests, cleaning, maintenance and payouts." },
  { big: "5", label: "Channels: Airbnb, Booking.com, Expedia, Vrbo and Tripadvisor, plus direct." },
  { big: "24/7", label: "Guest care, so your neighbours and your home are looked after." },
];

export function Owners() {
  return (
    <section id="owners" aria-labelledby="owners-title" className="section-y scroll-mt-24">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-5">
          <div className="relative overflow-hidden bg-palm px-[12%] py-[10%]">
            <OvalPattern className="text-timeless" opacity={0.28} />
            <Unmask>
              <div className="frame-ring relative mx-auto rounded-full aspect-[3/4.4] w-full max-w-[340px] [&::after]:border-timeless/70">
                <div className="stadium absolute inset-0">
                  <Parallax amount={30} className="h-full">
                    <Image src="/photos/grand-bleu-elie-saab-2br/03.jpg" alt="Sea-view terrace kitchen at Grand Bleu, Dubai Harbour" fill sizes="(min-width:1024px) 28vw, 80vw" className="object-cover" />
                  </Parallax>
                </div>
              </div>
            </Unmask>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <SectionHead n={8} label="For property owners" />
          <SplitLines id="owners-title" className="t-h2 mt-6" lines={["Own a home in Dubai?", <span key="b" className="italic-accent">Let us look after it.</span>]} />
          <Reveal delay={0.15}>
            <p className="t-body-lg mt-7 max-w-lg">
              We manage short-stay homes the way we run our own: properly furnished, carefully priced and kept spotless. In our experience, short lets can earn 20–40% more than a 12-month tenancy.
            </p>
          </Reveal>
          <dl className="mt-10 grid border-t border-line sm:grid-cols-3">
            {ownerFacts.map((f, i) => (
              <Reveal key={f.big} delay={0.08 * i} className="border-b border-line py-6 sm:border-b-0 sm:pr-6">
                <dt className="font-display text-5xl font-medium text-palm-700">{f.big}</dt>
                <dd className="mt-3 text-[0.95rem]">{f.label}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-7">
            <a href={whatsappWith("Hello FirstStay, I'd like to talk about managing my property.")} target="_blank" rel="noopener" className="btn btn-palm">
              <span>Talk to our team</span>
            </a>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent("Property management enquiry")}`} className="link">
              Or email us <ArrowRight />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y scroll-mt-24 bg-ivory">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead n={9} label="Good to know" />
          <SplitLines id="faq-title" className="t-h2 mt-6" lines={["Questions,", <span key="b" className="italic-accent">answered.</span>]} />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xs">Something else? <a className="link" href={site.whatsapp} target="_blank" rel="noopener">WhatsApp us</a> and we&rsquo;ll reply quickly.</p>
          </Reveal>
        </div>
        <div className="border-t border-line lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-[clamp(1.3rem,1.15rem+0.6vw,1.75rem)] font-medium leading-snug text-velvet"
                  >
                    {f.q}
                    <span aria-hidden className={`flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-500 ${isOpen ? "rotate-45 bg-velvet text-timeless" : ""}`}>
                      <Plus />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pr-14">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Invitation band (from Tinholt): full-bleed photo, the 24/7 promise. */
export function Invitation() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-dark relative scroll-mt-24 overflow-hidden text-timeless">
      <Parallax amount={80} className="absolute inset-0">
        <Image src="/photos/burj-royale-2br/04.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </Parallax>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,12,18,.08)_0%,rgba(40,12,18,.58)_45%,rgba(40,12,18,.72)_100%)] md:bg-[linear-gradient(90deg,rgba(40,12,18,.78)_0%,rgba(40,12,18,.55)_38%,rgba(40,12,18,0)_72%)]" />
      <div className="container-x relative flex min-h-[92svh] flex-col justify-end py-20 md:py-28">
        <SectionHead n={10} label="Day or night" light />
        <SplitLines id="contact-title" className="t-h1 mt-6 max-w-4xl text-timeless" lines={["Landing late?", <span key="b" className="italic-accent">We&rsquo;re up.</span>]} />
        <Reveal delay={0.2}>
          <p className="t-body-lg mt-7 max-w-xl text-timeless/90">
            Our team in Business Bay is on call around the clock: directions from the airport, an early check-in, or somewhere good for dinner tonight.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
          <a href={site.whatsapp} target="_blank" rel="noopener" className="btn btn-light"><span>WhatsApp us</span></a>
          <a href={site.phone.href} className="btn btn-palm"><span>Call {site.phone.display}</span></a>
          <a href={`mailto:${site.email}`} className="link self-center text-timeless">Email us <ArrowUpRight /></a>
        </Reveal>
      </div>
    </section>
  );
}
