"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { addDays, fromISO, isoOf, monthLabel, todayISO } from "@/lib/dates";
import { ChevronLeft, ChevronRight } from "../icons";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type Props = {
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
  /** Two months side by side on wide screens (brief: AvailabilityCalendar). */
  months?: 1 | 2;
  onComplete?: () => void;
};

/**
 * Range calendar. Monday first, past days disabled, check-in and check-out in Velvet,
 * nights between in velvet-100. Keyboard: arrows move a day/week, PageUp/PageDown a month,
 * Enter/Space picks. One tab stop for the whole grid (roving tabindex).
 */
export function RangeCalendar({ checkIn, checkOut, onChange, months = 2, onComplete }: Props) {
  const today = useMemo(() => todayISO(), []);
  const start = checkIn || today;
  const [view, setView] = useState(() => ({ y: Number(start.slice(0, 4)), m: Number(start.slice(5, 7)) - 1 }));
  const [focus, setFocus] = useState(start);
  const [hover, setHover] = useState("");
  const grid = useRef<HTMLDivElement>(null);
  const keyNav = useRef(false);

  const firstOfToday = today.slice(0, 7);
  const viewKey = isoOf(view.y, view.m, 1).slice(0, 7);
  const canPrev = viewKey > firstOfToday;
  const shift = (d: number) => setView(({ y, m }) => ({ y: y + Math.floor((m + d) / 12), m: (((m + d) % 12) + 12) % 12 }));

  // After keyboard movement, keep the focused day visible and focused
  useEffect(() => {
    if (!keyNav.current) return;
    keyNav.current = false;
    const k = focus.slice(0, 7);
    const lastShown = isoOf(view.y, view.m + months - 1, 1).slice(0, 7);
    if (k < viewKey) setView({ y: Number(focus.slice(0, 4)), m: Number(focus.slice(5, 7)) - 1 });
    else if (k > lastShown) setView({ y: Number(focus.slice(0, 4)), m: Number(focus.slice(5, 7)) - months });
    requestAnimationFrame(() => grid.current?.querySelector<HTMLButtonElement>(`[data-iso="${focus}"]`)?.focus());
  }, [focus, view, viewKey, months]);

  const picking = !!checkIn && !checkOut;
  const end = checkOut || (picking && hover > checkIn ? hover : "");

  const pick = (iso: string) => {
    if (iso < today) return;
    if (!checkIn || checkOut || iso <= checkIn) onChange(iso, "");
    else {
      onChange(checkIn, iso);
      onComplete?.();
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    let next = "";
    if (e.key in moves) next = addDays(focus, moves[e.key]);
    else if (e.key === "PageUp" || e.key === "PageDown") {
      const d = fromISO(focus);
      d.setUTCMonth(d.getUTCMonth() + (e.key === "PageUp" ? -1 : 1));
      next = d.toISOString().slice(0, 10);
    } else return;
    e.preventDefault();
    if (next < today) next = today;
    keyNav.current = true;
    setFocus(next);
    setHover(next);
  };

  return (
    <div className="select-none">
      <div className="mb-3 flex items-center gap-2">
        <button type="button" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month" className="flex size-11 shrink-0 items-center justify-center text-velvet transition-opacity disabled:opacity-25">
          <ChevronLeft />
        </button>
        <div className={`grid flex-1 gap-8 text-center font-display text-2xl text-velvet ${months === 2 ? "md:grid-cols-2" : ""}`} aria-live="polite">
          {Array.from({ length: months }, (_, k) => (
            <p key={k} className={k === 1 ? "hidden md:block" : ""}>{monthLabel(view.y + Math.floor((view.m + k) / 12), (view.m + k) % 12)}</p>
          ))}
        </div>
        <button type="button" onClick={() => shift(1)} aria-label="Next month" className="flex size-11 shrink-0 items-center justify-center text-velvet">
          <ChevronRight />
        </button>
      </div>
      <div ref={grid} onKeyDown={onKey} className={`grid gap-8 ${months === 2 ? "md:grid-cols-2" : ""}`}>
        {Array.from({ length: months }, (_, k) => {
          const y = view.y + Math.floor((view.m + k) / 12);
          const m = (view.m + k) % 12;
          const lead = (new Date(Date.UTC(y, m, 1)).getUTCDay() + 6) % 7;
          const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
          const focusHere = focus.slice(0, 7) === isoOf(y, m, 1).slice(0, 7);
          return (
            <div key={`${y}-${m}`} className={k === 1 ? "hidden md:block" : ""}>
              <div role="grid" aria-label={monthLabel(y, m)} className="grid grid-cols-7 text-center">
                {WEEKDAYS.map((w) => (
                  <span key={w} aria-hidden className="pb-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-leather/70">{w}</span>
                ))}
                {Array.from({ length: lead }, (_, i) => <span key={`b${i}`} />)}
                {Array.from({ length: days }, (_, i) => {
                  const iso = isoOf(y, m, i + 1);
                  const past = iso < today;
                  const isStart = iso === checkIn;
                  const isEnd = !!end && iso === end;
                  const inRange = !!checkIn && !!end && iso > checkIn && iso < end;
                  const tabbable = focusHere ? iso === focus : false;
                  return (
                    <button
                      key={iso}
                      data-iso={iso}
                      type="button"
                      role="gridcell"
                      disabled={past}
                      tabIndex={tabbable ? 0 : -1}
                      onClick={() => pick(iso)}
                      onFocus={() => setFocus(iso)}
                      onMouseEnter={() => setHover(iso)}
                      aria-selected={isStart || iso === checkOut}
                      aria-label={fromISO(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}
                      className={`relative flex aspect-square items-center justify-center text-[0.95rem] transition-colors duration-200 ${
                        past
                          ? "cursor-default text-leather/30 line-through decoration-leather/30"
                          : isStart || isEnd
                            ? "bg-velvet font-medium text-timeless"
                            : inRange
                              ? "bg-velvet-100 text-velvet"
                              : "text-velvet hover:bg-timeless-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
