"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { homes, neighbourhoods } from "@/lib/homes";
import { PropertyCard } from "../property-card";
import { Reveal, SplitLines } from "../motion";
import { ArrowRight } from "../icons";

/** The four homes, two columns; the right column drifts against the left as you scroll. */
export function Homes() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const offset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, -120]);

  return (
    <section id="homes" aria-labelledby="homes-title" className="section-y scroll-mt-24">
      <div className="container-x">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Reveal><p className="eyebrow">The homes</p></Reveal>
            <SplitLines id="homes-title" className="t-h2 mt-6" lines={["Four homes,", <span key="b"><span className="italic-accent">each with</span> a view.</span>]} />
          </div>
          <Reveal className="md:col-span-4" delay={0.15}>
            <p className="max-w-sm">Two in Downtown under the Burj Khalifa, one on the beach at Dubai Harbour and one across the water at Creek Harbour.</p>
          </Reveal>
        </div>

        <div ref={ref} className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-x-[clamp(2rem,6vw,7rem)] md:gap-y-28">
          {homes.map((h, i) => {
            const right = i % 2 === 1;
            return (
              <motion.div key={h.slug} style={right ? { y: offset } : undefined} className={right ? "md:mt-40" : ""}>
                <Reveal delay={right ? 0.12 : 0}>
                  <PropertyCard home={h} index={i} />
                </Reveal>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** A sense of place: pick a neighbourhood; the photo wipes across and the story changes. */
export function Places() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const n = neighbourhoods[active];
  const here = homes.filter((h) => h.area === n.slug);

  return (
    <section id="neighbourhoods" aria-labelledby="places-title" className="scroll-mt-24 bg-palm-700 text-timeless on-dark">
      <div className="grid lg:min-h-svh lg:grid-cols-2">
        <div className="container-x flex flex-col justify-center py-20 lg:py-24 lg:pl-[max(3.5rem,calc((100vw-1440px)/2+3.5rem))] lg:pr-16">
          <Reveal><p className="eyebrow">A sense of place</p></Reveal>
          <SplitLines id="places-title" className="t-h2 mt-6 text-timeless" lines={["Three corners", <span key="b" className="italic-accent">of the city.</span>]} />

          <div role="tablist" aria-label="Neighbourhoods" className="mt-12 border-t border-timeless/25">
            {neighbourhoods.map((x, i) => (
              <button
                key={x.slug}
                role="tab"
                id={`tab-${x.slug}`}
                aria-selected={i === active}
                aria-controls="place-panel"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); const k = (i + 1) % 3; setActive(k); (e.currentTarget.parentElement?.children[k] as HTMLElement)?.focus(); }
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); const k = (i + 2) % 3; setActive(k); (e.currentTarget.parentElement?.children[k] as HTMLElement)?.focus(); }
                }}
                tabIndex={i === active ? 0 : -1}
                className="group flex w-full items-baseline gap-5 border-b border-timeless/25 py-5 text-left"
              >
                <span className="w-8 text-[0.75rem] tracking-[0.2em] text-timeless/70">0{i + 1}</span>
                <span className={`font-display text-[clamp(1.9rem,1.4rem+1.8vw,3.1rem)] font-medium leading-none transition-all duration-700 ${i === active ? "translate-x-2 italic text-timeless" : "text-timeless/55 group-hover:text-timeless/85"}`}>
                  {x.name}
                </span>
              </button>
            ))}
          </div>

          <div id="place-panel" role="tabpanel" aria-labelledby={`tab-${n.slug}`} className="mt-10 min-h-[11rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={n.slug} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45 }}>
                <p className="font-display text-2xl font-medium italic text-timeless">{n.title}</p>
                <p className="mt-3 max-w-lg text-timeless/90">{n.body}</p>
                <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                  {here.map((h) => (
                    <li key={h.slug}>
                      <Link href={`/stays/${h.slug}`} className="link">{h.name} <ArrowRight /></Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative min-h-[70svh] overflow-hidden lg:min-h-full">
          {neighbourhoods.map((x, i) => (
            <motion.div
              key={x.slug}
              className="absolute inset-0"
              initial={false}
              animate={{ clipPath: i === active ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)", zIndex: i === active ? 2 : 1 }}
              // The new photo wipes in on top; the old one stays underneath until it is covered
              transition={
                i === active
                  ? { duration: reduce ? 0 : 1.1, ease: [0.76, 0, 0.24, 1] }
                  : { clipPath: { delay: reduce ? 0 : 1.1, duration: 0 }, zIndex: { duration: 0 } }
              }
            >
              <motion.div className="absolute inset-0" animate={{ scale: i === active ? 1 : 1.12 }} transition={{ duration: reduce ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}>
                <Image src={x.image} alt={x.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
