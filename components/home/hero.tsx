"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SplitLines } from "../motion";
import { BookingBar } from "./booking-bar";

// Stand-in for the ambient hero video (brief §3.6): a slow crossfade of the best views.
const slides = [
  { src: "/photos/burj-royale-2br/01.jpg", alt: "Living room facing the Burj Khalifa, Burj Royale" },
  { src: "/photos/grand-bleu-elie-saab-2br/01.jpg", alt: "The private beach at Dubai Harbour" },
  { src: "/photos/creek-rise-1br/01.jpg", alt: "The Dubai skyline across the creek" },
  { src: "/photos/burj-royale-2br/04.jpg", alt: "Bedroom with a view of the Burj Khalifa" },
];

/**
 * Cream hero with the headline above an arch (the brand oval). Scrolling opens the arch
 * into a full-bleed photograph. The section is pinned while that happens.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [reduce]);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const open = useTransform(p, [0, 0.75], [0, 1], { clamp: true });

  const headY = useTransform(open, [0, 0.6], [0, -90]);
  const headO = useTransform(open, [0, 0.45], [1, 0]);
  const imgScale = useTransform(open, [0, 1], [1.12, 1]);
  const overlayO = useTransform(open, [0.86, 1], [0, 1]);
  const tintO = useTransform(open, [0.35, 1], [0, 1]);

  return (
    <section ref={ref} id="top" aria-label="Welcome" className="relative h-[185svh] md:h-[210svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Headline over cream */}
        <motion.div style={{ y: headY, opacity: headO }} className="container-x relative z-10 flex flex-col items-center pt-[104px] text-center md:pt-[124px]">
          <motion.p
            className="eyebrow"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Holiday homes in Dubai
          </motion.p>
          <SplitLines as="h1" inView={false} delay={0.25} className="t-display mt-5 md:mt-6" lines={[<>Your key <span className="italic-accent">to</span> Dubai.</>]} />
        </motion.div>

        {/* The arch */}
        <motion.div style={{ "--o": open } as React.CSSProperties} className="hero-arch absolute inset-0 bg-timeless-300">
          <motion.div style={{ scale: reduce ? 1 : imgScale }} className="absolute inset-0">
            {slides.map((s, n) => (
              <div key={s.src} className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${n === i ? "opacity-100" : "opacity-0"}`} aria-hidden={n !== i}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={n === 0}
                  sizes="100vw"
                  quality={80}
                  className={`object-cover ${n === i && !reduce ? "animate-drift" : ""}`}
                />
              </div>
            ))}
          </motion.div>
          <motion.div style={{ opacity: tintO }} className="absolute inset-0 bg-[linear-gradient(180deg,rgba(66,18,30,.28)_0%,rgba(66,18,30,0)_30%,rgba(66,18,30,.08)_55%,rgba(66,18,30,.62)_100%)]" />
        </motion.div>

        {/* Line that appears once the photo fills the screen */}
        <motion.div style={{ opacity: overlayO }} className="on-dark pointer-events-none absolute inset-x-0 bottom-[22%] z-10 md:bottom-[24%]">
          <div className="container-x">
            <p className="max-w-[16ch] font-display text-[clamp(2.2rem,1.4rem+3.2vw,4.6rem)] font-medium leading-[1] text-timeless [text-shadow:0_2px_30px_rgba(66,18,30,.35)]">
              Four homes. Three neighbourhoods. <span className="italic-accent">Everything ready</span> when you arrive.
            </p>
          </div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-20 hidden md:block">
          <BookingBar />
        </div>

        <motion.div
          aria-hidden
          style={{ opacity: headO }}
          className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] uppercase tracking-[0.3em] text-timeless md:hidden"
        >
          Scroll
          <span className="block h-10 w-px origin-top animate-pulse bg-timeless/80" />
        </motion.div>
      </div>
    </section>
  );
}
