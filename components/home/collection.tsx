"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { homes, type Home } from "@/lib/homes";
import { useBooking } from "../booking/booking";
import { SectionHead } from "../section-head";
import { Reveal, SplitLines } from "../motion";
import { ArrowRight, BrandIcon } from "../icons";

/**
 * The collection: on desktop the section pins and the four homes glide past horizontally,
 * like turning the pages of a magazine. On smaller screens they stack.
 */
export function Collection() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [dist, setDist] = useState(0);
  const [pinned, setPinned] = useState(false);

  // Measure how far the track travels; pin only on wide screens
  useEffect(() => {
    const measure = () => {
      const wide = window.innerWidth >= 1024 && !reduce;
      setPinned(wide);
      setDist(wide && track.current ? Math.max(0, track.current.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Which home is in the middle of the screen, so the footer label matches the panel's own label
  const [active, setActive] = useState(0);
  useMotionValueEvent(x, "change", (v) => {
    const panels = track.current?.querySelectorAll<HTMLElement>("article");
    if (!panels?.length) return;
    const centre = -v + window.innerWidth / 2;
    let k = 0;
    panels.forEach((p, n) => {
      if (p.offsetLeft <= centre) k = n;
    });
    setActive(k);
  });

  return (
    <section
      ref={section}
      id="homes"
      aria-labelledby="homes-title"
      className="relative scroll-mt-24"
      style={pinned ? { height: `calc(100svh + ${dist}px)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-[84px]" : "section-y"}>
        <motion.div ref={track} style={pinned ? { x } : undefined} className={pinned ? "flex w-max items-stretch will-change-transform" : "container-x flex flex-col gap-20"}>
          {/* Opening page */}
          <div className={pinned ? "flex w-[42vw] max-w-[640px] shrink-0 flex-col justify-center pl-[max(3.5rem,calc((100vw-1440px)/2+3.5rem))] pr-[3vw]" : ""}>
            <SectionHead n={2} label="The collection" />
            <SplitLines
              id="homes-title"
              className="t-h2 mt-8 lg:text-[clamp(3rem,2rem+2.6vw,4.75rem)]"
              lines={[
                <span key="a">Four homes,</span>,
                <span key="b">
                  <span aria-hidden className="pill-img wide mr-[0.12em]">
                    <Image src="/photos/creek-rise-1br/01.jpg" alt="" fill sizes="140px" className="object-cover" />
                  </span>
                  <span className="italic-accent">each with</span>
                </span>,
                <span key="c" className="italic-accent">a view.</span>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="t-body-lg mt-8 max-w-sm">Two in Downtown under the Burj Khalifa, one on the beach at Dubai Harbour, one across the water at Creek Harbour.</p>
            </Reveal>
            {pinned && (
              <Reveal delay={0.25} className="mt-12 flex items-center gap-4 font-display text-lg italic text-palm-700">
                Keep scrolling to step through <ArrowRight className="size-4" />
              </Reveal>
            )}
          </div>

          {homes.map((h, i) => (
            <Panel key={h.slug} home={h} index={i} pinned={pinned} />
          ))}
          {pinned && <div aria-hidden className="w-[8vw] shrink-0" />}
        </motion.div>

        {pinned && (
          <div className="container-x absolute inset-x-0 bottom-8 flex items-center gap-6" aria-hidden>
            <span className="relative block h-7 w-48 overflow-hidden font-display text-lg italic text-palm-700">
              <AnimatePresence initial={false}>
                <motion.span
                  key={active}
                  className="absolute inset-0"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {homes[active].neighbourhood}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="relative h-px flex-1 bg-line">
              <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-velvet" />
            </span>
            <span className="w-16 text-right font-display text-lg italic text-palm-700">{active + 1} of {homes.length}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function Panel({ home: h, index, pinned }: { home: Home; index: number; pinned: boolean }) {
  const booking = useBooking();
  const flip = index % 2 === 1;
  return (
    <article
      aria-label={h.name}
      className={
        pinned
          ? "ml-[7vw] grid w-[min(82vw,1240px)] shrink-0 grid-cols-[1.1fr_1fr] items-center gap-[5vw] border-l border-line pl-[7vw]"
          : "grid gap-10 border-t border-line pt-14 md:grid-cols-2 md:items-center md:gap-14"
      }
    >
      {/* Photo collage: a large arch with a small stadium detail overlapping it */}
      <div className={`relative ${flip && !pinned ? "md:order-2" : ""}`}>
        <Link href={`/stays/${h.slug}`} className="group block" tabIndex={-1} aria-hidden>
          <div className={`relative overflow-hidden bg-timeless-300 ${flip ? "rounded-[2px]" : "arch"} ${pinned ? "h-[min(62svh,640px)]" : "aspect-[4/5]"}`}>
            <Image src={h.photos[0].src} alt={h.photos[0].alt} fill sizes="(min-width:1024px) 42vw, 90vw" className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" />
          </div>
        </Link>
        <div className={`absolute -bottom-8 w-[34%] ${flip ? "left-0 md:-left-6" : "right-0 md:-right-6"}`}>
          <div className="frame-ring relative rounded-full">
            <div className="stadium relative aspect-[3/4.6] bg-timeless-300 shadow-[0_24px_50px_-24px_rgba(66,18,30,.5)]">
              <Image src={h.photos[1].src} alt={h.photos[1].alt} fill sizes="15vw" className="object-cover" />
            </div>
          </div>
        </div>
        {h.rating && (
          <span className={`absolute top-6 bg-ivory/95 px-3.5 py-1.5 text-[0.8rem] font-medium tracking-[0.08em] text-velvet ${flip ? "right-6" : "left-1/2 -translate-x-1/2"}`}>
            <span aria-hidden className="mr-1.5 inline-block size-[6px] -translate-y-px rotate-45 bg-palm-700" />
            {h.rating.toFixed(1)} <span className="sr-only">out of 10 guest rating</span>
          </span>
        )}
      </div>

      <div className={flip && !pinned ? "md:order-1" : ""}>
        <p className="font-display text-lg italic text-palm-700">
          {h.neighbourhood} <span className="text-palm-700/60">— {index + 1} of {homes.length}</span>
        </p>
        <h3 className="t-h2 mt-4">{h.name}</h3>
        <p className="mt-5 max-w-md font-display text-xl italic leading-snug text-velvet">{h.hook}</p>
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-y border-line py-4 text-[0.95rem]">
          <li className="flex items-center gap-2"><BrandIcon name="bed" className="size-5 text-palm-700" />{h.bedrooms} {h.bedrooms === 1 ? "bedroom" : "bedrooms"}</li>
          <li className="flex items-center gap-2"><BrandIcon name="bathroom" className="size-5 text-palm-700" />{h.bathrooms} {h.bathrooms === 1 ? "bath" : "baths"}</li>
          <li className="flex items-center gap-2"><BrandIcon name="key-card" className="size-5 text-palm-700" />Up to {h.guests} guests</li>
        </ul>
        <p className="mt-5 text-[0.95rem]">
          From <span className="font-display text-3xl font-medium text-velvet">AED {h.fromAed.toLocaleString("en-AE")}</span> a night
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <button type="button" onClick={() => booking.open(h.slug)} className="btn btn-primary">
            <span>Check dates</span>
          </button>
          <Link href={`/stays/${h.slug}`} className="link">
            Explore the home <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
