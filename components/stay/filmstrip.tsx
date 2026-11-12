"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "../icons";

type Photo = { src: string; alt: string };

/**
 * Room by room: a horizontal filmstrip of captioned photographs ("Fig. 01"), alternating arch and
 * rectangle frames. Scrolls with trackpad, swipe or the arrows; snaps to each photo.
 */
export function Filmstrip({ photos }: { photos: Photo[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const progress = useSpring(scrollXProgress, { stiffness: 140, damping: 30 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft < 8);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (d: number) => {
    const el = ref.current;
    const item = el?.querySelector("figure");
    if (el && item) el.scrollBy({ left: d * (item.getBoundingClientRect().width + 32), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={ref}
        role="region"
        aria-label="Photographs, room by room"
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto overscroll-x-contain scroll-pl-[max(1.25rem,calc((100vw-1440px)/2+3.5rem))] px-[max(1.25rem,calc((100vw-1440px)/2+3.5rem))] pb-2"
      >
        {photos.map((p, i) => (
          <figure key={p.src} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]">
            <div className={`relative overflow-hidden bg-timeless-300 ${i % 2 === 0 ? "arch aspect-[4/5]" : "aspect-[4/5] lg:mt-16"}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 78vw" className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.04]" />
            </div>
            <figcaption className="mt-4 flex gap-3 text-[0.95rem]">
              <span className="shrink-0 font-display italic text-palm-700">Fig. {String(i + 1).padStart(2, "0")}</span>
              <span>{p.alt}</span>
            </figcaption>
          </figure>
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>
      <div className="container-x mt-8 flex items-center gap-6">
        <span className="relative h-px flex-1 bg-line" aria-hidden>
          <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-velvet" />
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous photo" className="flex size-12 items-center justify-center rounded-full border border-line-strong text-velvet transition-colors hover:bg-velvet hover:text-timeless disabled:pointer-events-none disabled:opacity-30">
            <ChevronLeft />
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next photo" className="flex size-12 items-center justify-center rounded-full border border-line-strong text-velvet transition-colors hover:bg-velvet hover:text-timeless disabled:pointer-events-none disabled:opacity-30">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
