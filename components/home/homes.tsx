"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { homes, neighbourhoods } from "@/lib/homes";
import { SectionHead } from "../section-head";
import { SplitLines } from "../motion";
import { ArrowRight } from "../icons";

/** A sense of place: pick a neighbourhood; the photo wipes across and the story changes. */
export function Places() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const n = neighbourhoods[active];
  const here = homes.filter((h) => h.area === n.slug);
  const illo = { "downtown-dubai": "key", "dubai-harbour": "palm", "dubai-creek-harbour": "bird" }[n.slug];

  return (
    <section id="neighbourhoods" aria-labelledby="places-title" className="scroll-mt-24 bg-palm-700 text-timeless on-dark">
      <div className="relative grid lg:min-h-svh lg:grid-cols-2">
        {/* Brand medallion on the seam: the area's engraved illustration in a cream oval */}
        <div aria-hidden className="pointer-events-none absolute bottom-[9%] left-1/2 z-10 hidden w-[150px] -translate-x-1/2 lg:block">
          <div className="relative aspect-[3/5] overflow-hidden rounded-full bg-ivory p-3 shadow-[0_30px_60px_-30px_rgba(30,8,14,.55)]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={illo} className="relative h-full w-full" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <Image src={`/brand/illustrations/${illo}.png`} alt="" fill sizes="150px" className="object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="container-x flex flex-col justify-center py-20 lg:py-24 lg:pl-[max(3.5rem,calc((100vw-1440px)/2+3.5rem))] lg:pr-16">
          <SectionHead n={5} label="A sense of place" light />
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
