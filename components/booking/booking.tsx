"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { homes } from "@/lib/homes";
import { listingUrl, searchUrl } from "@/lib/booking";
import { nightsBetween, shortDate } from "@/lib/dates";
import { lockScroll } from "../motion";
import { Close, Minus, Plus } from "../icons";
import { RangeCalendar } from "./calendar";

type Stay = { checkIn: string; checkOut: string; guests: number; home: string };
type Ctx = Stay & {
  setStay: (s: Partial<Stay>) => void;
  open: (home?: string) => void;
  close: () => void;
  isOpen: boolean;
  go: () => void;
};

const BookingCtx = createContext<Ctx | null>(null);

export const useBooking = () => {
  const c = useContext(BookingCtx);
  if (!c) throw new Error("useBooking outside BookingProvider");
  return c;
};

export const maxGuestsFor = (home: string) => homes.find((h) => h.slug === home)?.guests ?? 4;

export function BookingProvider({ children }: { children: ReactNode }) {
  const [stay, set] = useState<Stay>({ checkIn: "", checkOut: "", guests: 2, home: "" });
  const [isOpen, setOpen] = useState(false);

  const setStay = useCallback((s: Partial<Stay>) => {
    set((prev) => {
      const next = { ...prev, ...s };
      next.guests = Math.min(next.guests, maxGuestsFor(next.home));
      return next;
    });
  }, []);

  const open = useCallback((home?: string) => {
    if (home !== undefined) setStay({ home });
    setOpen(true);
  }, [setStay]);
  const close = useCallback(() => setOpen(false), []);

  const go = useCallback(() => {
    const h = homes.find((x) => x.slug === stay.home);
    const q = { checkIn: stay.checkIn || undefined, checkOut: stay.checkOut || undefined, guests: stay.guests };
    window.open(h ? listingUrl(h.hostawayId, q) : searchUrl(q), "_blank", "noopener");
  }, [stay]);

  const value = useMemo(() => ({ ...stay, setStay, open, close, isOpen, go }), [stay, setStay, open, close, isOpen, go]);

  return (
    <BookingCtx.Provider value={value}>
      {children}
      <BookingDialog />
    </BookingCtx.Provider>
  );
}

/** "Thu 12 Nov – Sun 15 Nov · 3 nights" or a prompt. */
export function useStaySummary() {
  const { checkIn, checkOut } = useBooking();
  if (checkIn && checkOut) return { dates: `${shortDate(checkIn)} – ${shortDate(checkOut)}`, nights: nightsBetween(checkIn, checkOut) };
  if (checkIn) return { dates: `${shortDate(checkIn)} – Check out`, nights: 0 };
  return { dates: "", nights: 0 };
}

export function GuestStepper({ size = "md" }: { size?: "sm" | "md" }) {
  const { guests, home, setStay } = useBooking();
  const max = maxGuestsFor(home);
  const btn = `flex ${size === "sm" ? "size-9" : "size-11"} items-center justify-center border border-line-strong text-velvet transition-colors hover:bg-velvet hover:text-timeless disabled:pointer-events-none disabled:opacity-30`;
  return (
    <div className="flex items-center gap-4" role="group" aria-label="Guests">
      <button type="button" className={btn} onClick={() => setStay({ guests: guests - 1 })} disabled={guests <= 1} aria-label="One guest fewer">
        <Minus />
      </button>
      <span className="min-w-[5.5ch] text-center text-velvet" aria-live="polite">
        {guests} {guests === 1 ? "guest" : "guests"}
      </span>
      <button type="button" className={btn} onClick={() => setStay({ guests: guests + 1 })} disabled={guests >= max} aria-label="One guest more">
        <Plus />
      </button>
    </div>
  );
}

function BookingDialog() {
  const b = useBooking();
  const { dates, nights } = useStaySummary();
  const ref = useRef<HTMLDivElement>(null);
  const home = homes.find((h) => h.slug === b.home);

  useEffect(() => {
    if (!b.isOpen) return;
    lockScroll(true);
    const prev = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => ref.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") b.close();
      if (e.key === "Tab" && ref.current) {
        const items = [...ref.current.querySelectorAll<HTMLElement>("button:not([disabled]):not([tabindex='-1']),select,a[href]")];
        if (!items.length) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [b.isOpen]);

  return (
    <AnimatePresence>
      {b.isOpen && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <button type="button" tabIndex={-1} aria-label="Close" className="absolute inset-0 cursor-default bg-velvet/35 backdrop-blur-[3px]" onClick={b.close} />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92svh] w-full overflow-y-auto overscroll-contain bg-ivory md:max-w-[880px]"
            data-lenis-prevent
          >
            <div className="flex items-start justify-between gap-6 border-b border-line px-5 pb-5 pt-6 md:px-10 md:pt-9">
              <div>
                <p className="eyebrow">Book direct</p>
                <h2 id="booking-title" className="t-h3 mt-3">Find your dates</h2>
              </div>
              <button type="button" onClick={b.close} aria-label="Close" className="-mr-2 flex size-11 items-center justify-center text-velvet transition-transform hover:rotate-90">
                <Close />
              </button>
            </div>

            <div className="grid gap-6 px-5 py-6 md:grid-cols-[1fr_auto] md:items-end md:px-10">
              <label className="block">
                <span className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-leather">Home</span>
                <select
                  data-autofocus
                  value={b.home}
                  onChange={(e) => b.setStay({ home: e.target.value })}
                  className="h-12 w-full appearance-none border border-line-strong bg-transparent bg-[length:14px] bg-[right_1rem_center] bg-no-repeat px-4 pr-10 text-velvet outline-none focus-visible:border-velvet"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2342121e' stroke-width='1.5'%3E%3Cpath d='M5 9l7 7 7-7'/%3E%3C/svg%3E\")" }}
                >
                  <option value="">All four homes</option>
                  {homes.map((h) => (
                    <option key={h.slug} value={h.slug}>{h.name} · {h.neighbourhood}</option>
                  ))}
                </select>
              </label>
              <div>
                <span className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-leather">Guests</span>
                <GuestStepper />
              </div>
            </div>

            <div className="px-3 pb-2 md:px-8">
              <RangeCalendar checkIn={b.checkIn} checkOut={b.checkOut} onChange={(checkIn, checkOut) => b.setStay({ checkIn, checkOut })} />
            </div>

            <div className="sticky bottom-0 flex flex-col gap-4 border-t border-line bg-ivory px-5 py-5 md:flex-row md:items-center md:justify-between md:px-10">
              <div className="min-h-12 text-[0.95rem]">
                {dates ? (
                  <p className="text-velvet">
                    {dates}
                    {nights > 0 && <span className="text-leather"> · {nights} {nights === 1 ? "night" : "nights"}</span>}
                  </p>
                ) : (
                  <p>Choose your check-in date, then check-out.</p>
                )}
                <p className="text-sm text-leather/80">
                  {home ? `From AED ${home.fromAed.toLocaleString("en-AE")} a night. ` : ""}Live prices and secure payment on the next step.
                </p>
              </div>
              <div className="flex items-center gap-5">
                {(b.checkIn || b.checkOut) && (
                  <button type="button" className="text-sm text-leather underline underline-offset-4 hover:text-velvet" onClick={() => b.setStay({ checkIn: "", checkOut: "" })}>
                    Clear dates
                  </button>
                )}
                <button type="button" className="btn btn-primary flex-1 md:flex-none" onClick={b.go}>
                  <span>{b.checkIn && b.checkOut ? "Check availability" : "See all availability"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
