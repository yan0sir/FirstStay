"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useBooking, useStaySummary } from "./booking/booking";
import { Calendar } from "./icons";

/**
 * Booking stays one tap away: after the hero a pill appears (bottom-right on desktop,
 * full width on phones). It steps aside near the end of the page, where the footer takes over.
 */
export function FloatingBook() {
  const b = useBooking();
  const { dates } = useStaySummary();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [covered, setCovered] = useState(false);

  // Step aside while a section with its own booking form is on screen
  useEffect(() => {
    const els = [...document.querySelectorAll("[data-booking-zone]")];
    if (!els.length) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setCovered(seen.size > 0);
    });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const end = document.documentElement.scrollHeight - window.innerHeight;
    setShow(y > window.innerHeight * 1.6 && y < end - 900);
  });

  return (
    <AnimatePresence>
      {show && !covered && !b.isOpen && (
        <motion.div
          className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 md:inset-x-auto md:bottom-8 md:right-8"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={() => b.open()}
            className="btn btn-primary w-full gap-4 shadow-[0_20px_50px_-20px_rgba(66,18,30,.7)] md:min-h-[3.75rem] md:px-7"
          >
            <Calendar className="size-5" />
            <span className="flex flex-col items-start leading-tight">
              <span>Book your stay</span>
              {dates && <span className="hidden text-[0.7rem] normal-case tracking-normal opacity-80 md:block">{dates}</span>}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
