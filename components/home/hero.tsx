"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SplitLines, introDelay } from "../motion";
import { BookingBar } from "./booking-bar";

// Stand-in for the ambient hero video (brief §3.6): a slow crossfade of the best views.
const slides = [
  { src: "/photos/burj-royale-2br/01.jpg", alt: "Living room facing the Burj Khalifa, Burj Royale", caption: "Living room · Burj Royale, Downtown" },
  { src: "/photos/grand-bleu-elie-saab-2br/01.jpg", alt: "The private beach at Dubai Harbour", caption: "Private beach · Grand Bleu, Dubai Harbour" },
  { src: "/photos/creek-rise-1br/01.jpg", alt: "The Dubai skyline across the creek", caption: "The skyline · Creek Rise, Creek Harbour" },
  { src: "/photos/burj-royale-2br/04.jpg", alt: "Bedroom with a view of the Burj Khalifa", caption: "Bedroom · Burj Royale, Downtown" },
];
const SLIDE_MS = 6500;

/**
 * Cream hero: headline above an arch (the brand oval) with the logo's double line around it.
 * Scrolling opens the arch into a full-bleed photograph while the section is pinned.
 * Every moving part is a transform, opacity or clip-path driven by one scroll value, so it stays smooth.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [delay, setDelay] = useState(0.2);

  useEffect(() => setDelay(introDelay() + 0.2), []);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), SLIDE_MS + (i === 0 ? introDelay() * 1000 : 0));
    return () => clearTimeout(t);
  }, [reduce, i]);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const open = useTransform(p, [0, 0.8], [0, 1], { clamp: true });
  const headY = useTransform(open, [0, 0.6], [0, -70]);
  const headO = useTransform(open, [0, 0.4], [1, 0]);
  const frameO = useTransform(open, [0, 0.25], [1, 0]);
  const zoom = useTransform(open, [0, 1], [1.1, 1]);
  const overlayO = useTransform(open, [0.84, 1], [0, 1]);
  const overlayY = useTransform(open, [0.84, 1], [24, 0]);
  const tintO = useTransform(open, [0.3, 1], [0, 1]);

  return (
    <section ref={ref} id="top" aria-label="Welcome" className="relative h-[190svh] md:h-[220svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Headline over cream */}
        <motion.div style={{ y: headY, opacity: headO }} className="container-x relative z-10 flex flex-col items-center pt-[100px] text-center md:pt-[112px]">
          <motion.p className="eyebrow" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay }}>
            Holiday homes in Dubai
          </motion.p>
          <SplitLines as="h1" inView={false} delay={delay + 0.05} className="t-display mt-5" lines={[<span key="h">Your key <span className="italic-accent">to</span> Dubai.</span>]} />
        </motion.div>

        {/* Double-line frame around the arch, like the logo's oval */}
        <motion.div aria-hidden style={{ opacity: frameO }} className="hero-arch-frame pointer-events-none absolute z-[1]" />

        {/* The arch */}
        <motion.div style={{ "--o": open } as React.CSSProperties} className="hero-arch absolute inset-0 bg-timeless-300">
          <motion.div style={{ scale: reduce ? 1 : zoom }} className="absolute inset-0 will-change-transform">
            <AnimatePresence initial={false}>
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 1.6, ease: "easeInOut" } }}
                transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: SLIDE_MS / 1000 + 1.6, ease: "linear" } }}
              >
                <Image src={slides[i].src} alt={slides[i].alt} fill priority={i === 0} sizes="100vw" quality={80} className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div style={{ opacity: tintO }} className="absolute inset-0 bg-[linear-gradient(180deg,rgba(66,18,30,.25)_0%,rgba(66,18,30,0)_28%,rgba(66,18,30,.06)_55%,rgba(66,18,30,.6)_100%)]" />
        </motion.div>

        {/* Caption + slide progress (editorial detail), above the booking bar */}
        <motion.div style={{ opacity: headO }} className="container-x pointer-events-none absolute inset-x-0 bottom-[132px] z-10 hidden items-end justify-between md:flex">
          <div className="w-[26%]">
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-palm-700">N° {String(i + 1).padStart(2, "0")}</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.5 }} className="mt-2 font-display text-lg italic text-velvet">
                {slides[i].caption}
              </motion.p>
            </AnimatePresence>
            <div className="mt-4 flex gap-1.5" aria-hidden>
              {slides.map((s, n) => (
                <span key={s.src} className="relative h-px w-10 overflow-hidden bg-line-strong">
                  {n === i && !reduce && (
                    <motion.span className="absolute inset-0 origin-left bg-velvet" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_MS / 1000 + (i === 0 ? introDelay() : 0), ease: "linear" }} />
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex w-[26%] flex-col items-end gap-3 text-right">
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-palm-700">Scroll to step inside</p>
            <span className="relative block h-12 w-px overflow-hidden bg-line">
              <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-velvet" animate={reduce ? undefined : { y: ["-100%", "200%"] }} transition={{ duration: 2.2, repeat: Infinity, ease: [0.76, 0, 0.24, 1] }} />
            </span>
          </div>
        </motion.div>

        {/* Line that appears once the photo fills the screen */}
        <motion.div style={{ opacity: overlayO, y: overlayY }} className="on-dark pointer-events-none absolute inset-x-0 bottom-[20%] z-10 md:bottom-[22%]">
          <div className="container-x">
            <p className="max-w-[16ch] font-display text-[clamp(2.2rem,1.4rem+3.2vw,4.6rem)] font-medium leading-[1] text-timeless [text-shadow:0_2px_30px_rgba(66,18,30,.35)]">
              Four homes. Three neighbourhoods. <span className="italic-accent">Everything ready</span> when you arrive.
            </p>
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-20 hidden md:block">
          <BookingBar delay={delay + 0.5} />
        </div>
      </div>
    </section>
  );
}
