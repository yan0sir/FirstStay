"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Lockup, Monogram, OvalPattern } from "./brand";
import { useBooking } from "./booking/booking";
import { lockScroll } from "./motion";
import { ArrowUpRight, Close } from "./icons";
import { nav, site } from "@/lib/site";

const menuImages = [
  "/photos/burj-royale-2br/01.jpg",
  "/photos/creek-rise-1br/01.jpg",
  "/photos/burj-royale-1br/03.jpg",
  "/photos/creek-rise-1br/03.jpg",
  "/photos/grand-bleu-elie-saab-2br/03.jpg",
  "/photos/burj-royale-1br/05.jpg",
  "/photos/grand-bleu-elie-saab-2br/01.jpg",
];

/**
 * Fixed header: Menu · lockup · Book. Transparent at the very top, then a cream bar with a hairline.
 * On mobile a "Check availability" pill appears at the bottom once the visitor scrolls.
 */
export function Header({ pill: showPill = true }: { pill?: boolean } = {}) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState(false);
  const { scrollY } = useScroll();
  const booking = useBooking();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    setPill(y > window.innerHeight * 0.9);
  });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
          scrolled ? "border-b border-line bg-timeless/92 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="container-x grid h-[72px] grid-cols-[1fr_auto_1fr] items-center md:h-[84px]">
          <button
            type="button"
            onClick={() => setMenu(true)}
            aria-expanded={menu}
            aria-controls="site-menu"
            className="group -ml-2 flex h-11 items-center gap-3 justify-self-start px-2 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-velvet"
          >
            <span aria-hidden className="flex w-7 flex-col gap-[6px]">
              <span className="h-px w-full bg-current transition-transform duration-500 group-hover:translate-x-1" />
              <span className="h-px w-2/3 bg-current transition-[width] duration-500 group-hover:w-full" />
            </span>
            <span className="hidden sm:inline">Menu</span>
          </button>

          <Link href="/" aria-label="FirstStay Holiday Homes, home" className="justify-self-center">
            <Lockup />
          </Link>

          <div className="flex items-center gap-6 justify-self-end">
            <a href={site.phone.href} className="hidden text-[0.95rem] text-velvet transition-colors hover:text-palm-700 lg:inline">
              {site.phone.display}
            </a>
            <button type="button" onClick={() => booking.open()} className="btn btn-primary min-h-11 px-4 text-[0.72rem] md:px-6">
              <span className="md:hidden">Book</span>
              <span className="hidden md:inline">Book your stay</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile: availability pill after the hero */}
      <AnimatePresence>
        {showPill && pill && !menu && (
          <motion.div
            className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 md:hidden"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" onClick={() => booking.open()} className="btn btn-primary w-full shadow-[0_18px_40px_-18px_rgba(66,18,30,.6)]">
              <span>Check availability</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Menu open={menu} onClose={() => setMenu(false)} />
    </>
  );
}

function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const prev = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => ref.current?.querySelector<HTMLElement>("a,button")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const items = [...ref.current.querySelectorAll<HTMLElement>("a,button")];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      prev?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-ivory"
          data-lenis-prevent
        >
          <OvalPattern className="text-velvet" opacity={0.045} />
          <div className="container-x relative flex h-[72px] items-center justify-between md:h-[84px]">
            <button type="button" onClick={onClose} className="group -ml-2 flex h-11 items-center gap-3 px-2 text-[0.8rem] font-medium uppercase tracking-[0.2em] text-velvet">
              <Close className="size-6 transition-transform duration-500 group-hover:rotate-90" />
              Close
            </button>
            <Monogram className="h-12 w-auto" />
            <span className="w-[5.5rem]" aria-hidden />
          </div>

          <div className="container-x relative grid min-h-[calc(100svh-84px)] gap-10 pb-10 pt-4 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <nav aria-label="Main">
              <ul className="border-t border-line">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group flex items-baseline gap-5 py-3 md:py-4"
                    >
                      <span className="w-7 text-[0.75rem] tracking-[0.2em] text-palm-700">0{i + 1}</span>
                      <span className="font-display text-[clamp(2rem,1.4rem+2.6vw,3.9rem)] font-medium leading-none text-velvet transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 group-hover:italic">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-10">
              {/* Hovering a link swaps the photo in the arch */}
              <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-[380px] lg:block">
                <div className="frame-ring arch absolute inset-0">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image src={menuImages[active]} alt="" fill sizes="380px" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-3">Guest line, 24/7</p>
                  <a href={site.phone.href} className="font-display text-2xl text-velvet">{site.phone.display}</a>
                  <a href={`mailto:${site.email}`} className="mt-1 block text-velvet underline-offset-4 hover:underline">{site.email}</a>
                </div>
                <div>
                  <p className="eyebrow mb-3">Follow</p>
                  <ul className="space-y-1">
                    {site.social.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener" className="link">
                          {s.label} <ArrowUpRight />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
