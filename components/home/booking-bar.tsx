"use client";

import { motion, useReducedMotion } from "motion/react";
import { homes } from "@/lib/homes";
import { GuestStepper, useBooking, useStaySummary } from "../booking/booking";
import { Calendar, Pin } from "../icons";

/** Desktop booking bar on the hero: Home · Dates · Guests · Search. Home and dates open the booking dialog. */
export function BookingBar() {
  const b = useBooking();
  const { dates, nights } = useStaySummary();
  const reduce = useReducedMotion();
  const home = homes.find((h) => h.slug === b.home);
  const cell = "flex h-full min-w-0 flex-col justify-center gap-1 px-6 text-left transition-colors hover:bg-timeless-200/70";
  const label = "text-[0.68rem] font-medium uppercase tracking-[0.22em] text-leather";

  return (
    <motion.div
      initial={reduce ? false : { y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="container-x pb-6"
    >
      <div role="search" aria-label="Check availability" className="grid h-[84px] grid-cols-[1.1fr_1.3fr_auto_auto] items-stretch divide-x divide-line bg-ivory shadow-[0_30px_60px_-30px_rgba(66,18,30,.45)]">
        <button type="button" onClick={() => b.open()} className={cell}>
          <span className={label}>Where</span>
          <span className="flex items-center gap-2 truncate text-velvet">
            <Pin className="size-4 shrink-0 text-palm-700" />
            <span className="truncate">{home ? home.name : "All four homes"}</span>
          </span>
        </button>
        <button type="button" onClick={() => b.open()} className={cell}>
          <span className={label}>When</span>
          <span className="flex items-center gap-2 truncate text-velvet">
            <Calendar className="size-4 shrink-0 text-palm-700" />
            <span className="truncate">{dates || "Add your dates"}{nights > 0 ? ` · ${nights} nights` : ""}</span>
          </span>
        </button>
        <div className="flex flex-col justify-center gap-1 px-6">
          <span className={label}>Guests</span>
          <GuestStepper size="sm" />
        </div>
        <button type="button" onClick={() => (b.checkIn && b.checkOut ? b.go() : b.open())} className="btn btn-primary h-full px-10">
          <span>{b.checkIn && b.checkOut ? "Check availability" : "Find your dates"}</span>
        </button>
      </div>
    </motion.div>
  );
}
