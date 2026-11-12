"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { lockScroll, Unmask } from "../motion";
import { ChevronLeft, ChevronRight, Close, Expand } from "../icons";

type Photo = { src: string; alt: string };

/** One large photo + four, then a full-screen lightbox (arrows, keys, swipe). */
export function Gallery({ photos, name }: { photos: Photo[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [first, ...rest] = photos;
  const tile = "group relative block h-full w-full overflow-hidden bg-timeless-300";
  const img = "object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]";

  return (
    <section aria-label={`Photos of ${name}`} className="container-x">
      <div className="grid gap-2 md:h-[min(78svh,760px)] md:grid-cols-4 md:grid-rows-2 md:gap-3">
        <Unmask className="aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto">
          <button type="button" onClick={() => setOpen(0)} className={tile} aria-label={`Open photo 1: ${first.alt}`}>
            <Image src={first.src} alt={first.alt} fill priority sizes="(min-width:768px) 50vw, 100vw" className={img} />
          </button>
        </Unmask>
        {rest.slice(0, 4).map((p, i) => (
          <Unmask key={p.src} delay={0.08 * (i + 1)} className={`aspect-[4/3] md:aspect-auto ${i > 1 ? "hidden md:block" : ""} ${i === 1 ? "md:rounded-tr-[999px] md:[&>button]:rounded-tr-[999px]" : ""}`}>
            <button type="button" onClick={() => setOpen(i + 1)} className={tile} aria-label={`Open photo ${i + 2}: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 25vw, 50vw" className={img} />
              {i === 3 && (
                <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-ivory/95 px-4 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-velvet">
                  <Expand /> All {photos.length} photos
                </span>
              )}
            </button>
          </Unmask>
        ))}
      </div>
      <button type="button" onClick={() => setOpen(0)} className="link mt-5 md:hidden">
        View all {photos.length} photos
      </button>
      <Lightbox photos={photos} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}

function Lightbox({ photos, index, onClose, onIndex }: { photos: Photo[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState(1);
  const isOpen = index !== null;
  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setDir(d);
      onIndex((index + d + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      lockScroll(false);
      prev?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab" && ref.current) {
        const items = [...ref.current.querySelectorAll<HTMLElement>("button")];
        const f = items[0], l = items[items.length - 1];
        if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
        else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          className="fixed inset-0 z-[85] flex flex-col bg-ivory"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          data-lenis-prevent
        >
          <div className="container-x flex h-[72px] shrink-0 items-center justify-between">
            <p className="text-sm tracking-[0.2em] text-leather" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </p>
            <button type="button" onClick={onClose} aria-label="Close gallery" className="flex size-11 items-center justify-center text-velvet transition-transform hover:rotate-90">
              <Close className="size-6" />
            </button>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                className="absolute inset-0 px-4 pb-4 md:px-24"
                initial={{ x: `${dir * 8}%`, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: `${dir * -8}%`, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
              >
                <div className="relative h-full w-full">
                  <Image src={photos[index].src} alt={photos[index].alt} fill sizes="100vw" quality={85} className="pointer-events-none object-contain" />
                </div>
              </motion.div>
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-4 top-1/2 z-10 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ivory text-velvet transition-colors hover:bg-velvet hover:text-timeless md:flex">
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-4 top-1/2 z-10 hidden size-14 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ivory text-velvet transition-colors hover:bg-velvet hover:text-timeless md:flex">
              <ChevronRight />
            </button>
          </div>
          <p className="container-x shrink-0 pb-6 text-center text-[0.95rem]">{photos[index].alt}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
