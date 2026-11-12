"use client";

import { useEffect } from "react";
import { getHome } from "@/lib/homes";
import { GuestStepper, useBooking, useStaySummary } from "../booking/booking";
import { Calendar } from "../icons";

/** Sticky booking card on a home's page. Picks this home in the shared booking state. */
export function BookingCard({ slug }: { slug: string }) {
  const b = useBooking();
  const { dates, nights } = useStaySummary();
  const h = getHome(slug)!;
  const { setStay } = b;

  useEffect(() => setStay({ home: slug }), [slug, setStay]);

  return (
    <div className="border border-line-strong bg-ivory p-7 shadow-[0_30px_60px_-40px_rgba(66,18,30,.4)]">
      <p className="text-[0.95rem]">
        From <span className="font-display text-4xl font-medium text-velvet">AED {h.fromAed.toLocaleString("en-AE")}</span> a night
      </p>
      <button type="button" onClick={() => b.open(slug)} className="mt-6 flex w-full items-center gap-3 border border-line-strong px-4 py-3.5 text-left transition-colors hover:border-velvet">
        <Calendar className="size-5 shrink-0 text-palm-700" />
        <span className="flex flex-col">
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-leather">Dates</span>
          <span className="text-velvet">{dates || "Add your dates"}{nights > 0 ? ` · ${nights} ${nights === 1 ? "night" : "nights"}` : ""}</span>
        </span>
      </button>
      <div className="mt-4 flex items-center justify-between border border-line-strong px-4 py-2.5">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-leather">Guests</span>
        <GuestStepper size="sm" />
      </div>
      <button type="button" onClick={() => (b.checkIn && b.checkOut ? b.go() : b.open(slug))} className="btn btn-primary mt-6 w-full">
        <span>{b.checkIn && b.checkOut ? "Check availability" : "Choose dates"}</span>
      </button>
      <p className="mt-4 text-center text-sm text-leather/85">Live prices and secure payment on the next step.</p>
    </div>
  );
}

/** Mobile: price + Book pinned to the bottom of the screen. */
export function MobileBookingBar({ slug }: { slug: string }) {
  const b = useBooking();
  const h = getHome(slug)!;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-ivory/95 px-5 pb-[max(.9rem,env(safe-area-inset-bottom))] pt-3.5 backdrop-blur lg:hidden">
      <p className="text-sm">
        From <span className="font-display text-2xl font-medium text-velvet">AED {h.fromAed.toLocaleString("en-AE")}</span>
        <span className="block text-xs text-leather/80">a night</span>
      </p>
      <button type="button" onClick={() => b.open(slug)} className="btn btn-primary min-h-12">
        <span>Book</span>
      </button>
    </div>
  );
}
