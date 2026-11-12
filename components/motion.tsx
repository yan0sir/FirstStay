"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Lenis from "lenis";
import { useEffect, useRef, type ReactNode } from "react";

let lenis: Lenis | null = null;

/** Header height to keep anchored sections clear of the fixed header. */
const headerOffset = () => (window.innerWidth >= 768 ? -88 : -72);

/** Calm smooth scrolling (brief §3.6). Off when the visitor prefers reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    // Same-page section links ("/#homes" while on "/"): glide there instead of jumping
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash || url.origin !== location.origin) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToId(id);
    };
    document.addEventListener("click", onClick);

    let id = 0;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lenis = new Lenis({ lerp: 0.1 });
      id = requestAnimationFrame(function raf(t) {
        lenis?.raf(t);
        id = requestAnimationFrame(raf);
      });
    }
    // Arriving on /#section from another page: land below the header
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) setTimeout(() => (lenis ? lenis.scrollTo(target, { offset: headerOffset(), immediate: true }) : target.scrollIntoView()), 80);
    }
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(id);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}

/** Freeze page scroll while a dialog or the menu is open. */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: headerOffset(), duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + headerOffset() });
}

const ease = [0.22, 1, 0.36, 1] as const;

/** Content fades up once as it enters the viewport. */
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" | "article" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </M>
  );
}

/** Headline lines rise out of a mask, one after another. */
export function SplitLines({ lines, className = "", delay = 0, as: Tag = "h2", inView = true, id }: { lines: ReactNode[]; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p"; inView?: boolean; id?: string }) {
  const reduce = useReducedMotion();
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "105%" }}
            {...(inView ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "0px 0px -8% 0px" } } : { animate: { y: "0%" } })}
            transition={{ duration: 1.15, delay: delay + i * 0.11, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Images unmask upward once, inside their arch or rectangle. */
export function Unmask({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.3, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Gentle parallax: children drift against the scroll by `amount` px. */
export function Parallax({ children, amount = 60, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-amount, amount]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: reduce ? 1 : 1 + (amount * 2.4) / 1000 }} className="relative h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** A word whose opacity follows scroll progress (for the statement paragraph). */
export function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}
