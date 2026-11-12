"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const sizes: Record<string, [number, number]> = {
  armchair: [393, 690], bird: [700, 745], burj: [358, 781], palm: [417, 690], peony: [700, 593], key: [655, 690],
};

/**
 * Engraved brand illustration (oval-framed, from the guidelines). It fades up as it enters
 * and drifts gently against the scroll, so it feels printed onto the page rather than pasted.
 */
export function Illustration({ name, className = "", drift = 40, alt = "" }: { name: keyof typeof sizes; className?: string; drift?: number; alt?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [drift, -drift]);
  const [w, h] = sizes[name];
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Image src={`/brand/illustrations/${name}.png`} alt={alt} width={w} height={h} sizes="(min-width:1024px) 22vw, 50vw" className="h-auto w-full" />
    </motion.div>
  );
}

/**
 * The FirstStay key: an oval frame draws itself, the hand slides in with the key,
 * then the key ring swings and settles (a little jingle).
 */
export function KeyReveal({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const on = inView || reduce;
  return (
    <div ref={ref} className={`relative aspect-[785/735] ${className}`} aria-hidden>
      <svg viewBox="0 0 785 735" className="absolute inset-0 h-full w-full overflow-visible">
        <motion.rect
          x="363" y="8" width="250" height="719" rx="125"
          fill="none" stroke="var(--color-velvet)" strokeWidth="2"
          initial={reduce ? false : { pathLength: 0 }}
          animate={on ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.rect
          x="375" y="20" width="226" height="695" rx="113"
          fill="none" stroke="var(--color-palm)" strokeWidth="1.5"
          initial={reduce ? false : { pathLength: 0 }}
          animate={on ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.6, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { x: "-18%", opacity: 0 }}
        animate={on ? { x: "0%", opacity: 1 } : undefined}
        transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src="/brand/illustrations/key-hand.png" alt="" fill sizes="(min-width:1024px) 34vw, 80vw" className="object-contain" />
        <motion.div
          className="absolute inset-0 origin-[62%_55%]"
          initial={false}
          animate={on && !reduce ? { rotate: [0, 9, -7, 5, -3, 1.5, 0] } : undefined}
          transition={{ duration: 1.8, delay: 1.7, ease: "easeOut" }}
        >
          <Image src="/brand/illustrations/key-ring.png" alt="" fill sizes="(min-width:1024px) 34vw, 80vw" className="object-contain" />
        </motion.div>
      </motion.div>
    </div>
  );
}
