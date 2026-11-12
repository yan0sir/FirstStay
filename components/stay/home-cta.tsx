"use client";

import { motion, useReducedMotion } from "motion/react";
import { getHome } from "@/lib/homes";
import { site } from "@/lib/site";
import { GuestStepper, useBooking, useStaySummary } from "../booking/booking";
import { OvalPattern } from "../brand";
import { KeyReveal } from "../illustration";
import { SectionHead } from "../section-head";
import { Reveal, SplitLines } from "../motion";
import { Calendar } from "../icons";

/** Closing booking moment on a home's page: the animated key beside a booking form for this home. */
export function HomeCta({ slug, n }: { slug: string; n: number }) {
  const h = getHome(slug)!;
  const b = useBooking();
  const { dates, nights } = useStaySummary();
  const reduce = useReducedMotion();
  const ready = !!(b.checkIn && b.checkOut);

  return (
    <section id="book" data-booking-zone aria-labelledby="home-book-title" className="section-y relative scroll-mt-24 overflow-hidden bg-ivory">
      <OvalPattern className="text-velvet" opacity={0.035} />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <KeyReveal className="mx-auto w-full max-w-[500px]" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <SectionHead n={n} label="Book direct" />
          <SplitLines id="home-book-title" className="t-h1 mt-8" lines={["Your key to", <span key="b" className="italic-accent">{h.building.split(",")[0].replace(/ Tower.*$/, "")}.</span>]} />
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-6 max-w-md">
              From <span className="font-display text-2xl text-velvet">AED {h.fromAed.toLocaleString("en-AE")}</span> a night. Choose your dates and we&rsquo;ll have everything ready when you arrive.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 border border-line-strong bg-timeless/60 backdrop-blur-sm">
            <div className="grid sm:grid-cols-[1fr_auto]">
              <button type="button" onClick={() => b.open(slug)} className="flex items-center gap-4 border-b border-line-strong px-5 py-4 text-left transition-colors hover:bg-timeless sm:border-b-0 sm:border-r">
                <Calendar className="size-5 shrink-0 text-palm-700" />
                <span className="flex flex-col">
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-leather">Dates</span>
                  <span className="text-velvet">{dates || "Add your dates"}{nights > 0 ? ` · ${nights} ${nights === 1 ? "night" : "nights"}` : ""}</span>
                </span>
              </button>
              <div className="flex items-center justify-between gap-4 px-5 py-3">
                <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-leather sm:hidden">Guests</span>
                <GuestStepper size="sm" />
              </div>
            </div>
            <button type="button" onClick={() => (ready ? b.go() : b.open(slug))} className="btn btn-primary w-full">
              <span>{ready ? "Check availability" : "Find your dates"}</span>
            </button>
          </Reveal>
          <Reveal delay={0.3} className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[0.95rem]">
            <span>Live prices and secure payment on the next step.</span>
            <a href={site.whatsapp} target="_blank" rel="noopener" className="link">Questions? WhatsApp us</a>
          </Reveal>
          <motion.span
            aria-hidden
            className="mt-10 block h-px origin-left bg-line-strong"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </section>
  );
}
