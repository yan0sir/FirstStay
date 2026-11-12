"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { useBooking, useStaySummary, GuestStepper } from "../booking/booking";
import { Illustration, KeyReveal } from "../illustration";
import { OvalPattern } from "../brand";
import { SectionHead } from "../section-head";
import { Reveal, ScrollWord, SplitLines } from "../motion";
import { ArrowRight, BrandIcon, Calendar } from "../icons";

const statement =
  "We look after four homes in Dubai the way we would want to be looked after: fresh hotel linen, a stocked kitchen, fast Wi-Fi and someone on call at any hour. Your key is ready before you land.";

/** N° 01: the welcome. Peony illustration + a statement whose words brighten with the scroll. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");
  return (
    <section aria-label="Welcome to FirstStay" className="section-y relative overflow-hidden">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SectionHead n={1} label="A key to serenity" />
          <p ref={ref} className="t-lead mt-10 text-[clamp(1.75rem,1.2rem+2.2vw,3.3rem)] leading-[1.14]">
            {words.map((w, i) => (
              <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </ScrollWord>
            ))}
          </p>
          <Reveal className="mt-10 flex flex-wrap items-center gap-8">
            <p className="font-display text-xl italic text-palm-700">— The FirstStay team, Business Bay</p>
            <a href="#homes" className="link">Meet the homes <ArrowRight /></a>
          </Reveal>
        </div>
        <div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
          <Illustration name="peony" drift={50} className="mx-auto w-full max-w-[300px]" />
        </div>
      </div>
    </section>
  );
}

const facilities = [
  { icon: "wifi", title: "Fast fibre Wi-Fi", body: "Up to 500 Mbps, for calls, streaming and everyone at once." },
  { icon: "bed", title: "Hotel-grade linen", body: "Crisp sheets, hypoallergenic duvets, fresh towels for every stay." },
  { icon: "key-card", title: "Check in at any hour", body: "Your key and directions arrive before you land." },
  { icon: "housekeeping", title: "Spotless, every time", body: "Professionally cleaned and checked by our team before you arrive." },
  { icon: "dining", title: "Fully equipped kitchens", body: "Cook a proper dinner, or make coffee on the balcony at sunrise." },
  { icon: "tv", title: "Smart TVs", body: "Large screens with your streaming apps ready to sign in." },
  { icon: "pool", title: "Pools & gyms", body: "In every building, some with Burj Khalifa views." },
  { icon: "bathroom", title: "Thoughtful touches", body: "Complimentary toiletries and fresh towels, set out for your arrival." },
];

/** N° 04: what every stay includes. Sticky title + armchair illustration, list of facilities. */
export function Facilities() {
  const booking = useBooking();
  return (
    <section id="ready" aria-labelledby="ready-title" className="section-y scroll-mt-24">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead n={4} label="How we host" />
            <SplitLines id="ready-title" className="t-h2 mt-8" lines={["Everything's ready,", <span key="b" className="italic-accent">before you are.</span>]} />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm">The comforts of a good hotel, the space and privacy of your own home, in every one of our apartments.</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8">
              <button type="button" onClick={() => booking.open()} className="btn btn-outline"><span>Check availability</span></button>
            </Reveal>
            <Illustration name="armchair" drift={30} className="mt-12 hidden w-[42%] max-w-[190px] lg:block" />
          </div>
        </div>
        <ul className="border-t border-line lg:col-span-6 lg:col-start-7">
          {facilities.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 4) * 0.05} y={16} className="group grid grid-cols-[3.5rem_1fr] items-start gap-5 border-b border-line py-7 transition-colors duration-500 hover:bg-ivory md:grid-cols-[4.5rem_1fr_auto] md:px-4">
              <BrandIcon name={f.icon} className="size-9 text-palm-700 transition-[color,transform] duration-500 group-hover:-translate-y-0.5 group-hover:text-velvet" />
              <div>
                <h3 className="font-display text-[1.65rem] font-medium leading-tight">{f.title}</h3>
                <p className="mt-1.5 text-[0.98rem]">{f.body}</p>
              </div>
              <span aria-hidden className="hidden pt-2 font-display text-sm italic text-palm-700 md:block">0{i + 1}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const steps = [
  { title: "Choose your dates", body: "Pick a home and dates here. Live prices and secure payment on the next step." },
  { title: "Receive your key", body: "Check-in details, directions and our neighbourhood guide arrive before you land." },
  { title: "Settle in", body: "Our team in Business Bay is on call day and night for anything you need." },
];

/** N° 07: the booking moment. The key illustration animates; booking controls sit right beside it. */
export function BookCta() {
  const b = useBooking();
  const { dates, nights } = useStaySummary();
  const reduce = useReducedMotion();
  return (
    <section id="book" data-booking-zone aria-labelledby="book-title" className="section-y relative scroll-mt-24 overflow-hidden bg-ivory">
      <OvalPattern className="text-velvet" opacity={0.035} />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <KeyReveal className="mx-auto w-full max-w-[520px]" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <SectionHead n={7} label="Book direct" />
          <SplitLines id="book-title" className="t-h1 mt-8" lines={["Your key", <span key="b" className="italic-accent">is waiting.</span>]} />
          <Reveal delay={0.1}>
            <p className="t-body-lg mt-6 max-w-md">Book directly with the team that hosts you, and we&rsquo;ll have everything ready when you arrive.</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 border border-line-strong bg-timeless/60 backdrop-blur-sm">
            <div className="grid sm:grid-cols-[1fr_auto]">
              <button type="button" onClick={() => b.open()} className="flex items-center gap-4 border-b border-line-strong px-5 py-4 text-left transition-colors hover:bg-timeless sm:border-b-0 sm:border-r">
                <Calendar className="size-5 shrink-0 text-palm-700" />
                <span className="flex flex-col">
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-leather">Dates</span>
                  <span className="text-velvet">{dates || "Add your dates"}{nights > 0 ? ` · ${nights} nights` : ""}</span>
                </span>
              </button>
              <div className="flex items-center justify-between gap-4 px-5 py-3">
                <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-leather sm:hidden">Guests</span>
                <GuestStepper size="sm" />
              </div>
            </div>
            <button type="button" onClick={() => (b.checkIn && b.checkOut ? b.go() : b.open())} className="btn btn-primary w-full">
              <span>{b.checkIn && b.checkOut ? "Check availability" : "Find your dates"}</span>
            </button>
          </Reveal>

          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={0.1 * i}>
                <motion.span
                  className="block h-px origin-left bg-velvet"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <p className="mt-4 font-display text-sm italic text-palm-700">Step 0{i + 1}</p>
                <h3 className="mt-1 font-display text-2xl font-medium">{s.title}</h3>
                <p className="mt-2 text-[0.95rem]">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

