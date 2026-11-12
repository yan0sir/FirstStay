"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useBooking } from "../booking/booking";
import { SectionHead } from "../section-head";
import { Reveal, SplitLines } from "../motion";
import { BrandIcon } from "../icons";

type Shot = { src: string; caption: string };
const rooms: { id: string; name: string; icon: string; line: string; shots: Shot[] }[] = [
  {
    id: "living",
    name: "Living rooms",
    icon: "lamp",
    line: "Deep sofas, soft light and floor-to-ceiling windows facing the view.",
    shots: [
      { src: "/photos/burj-royale-2br/01.jpg", caption: "Burj Royale 2BR · facing the Burj Khalifa" },
      { src: "/photos/creek-rise-1br/02.jpg", caption: "Creek Rise · the creek from the sofa" },
      { src: "/photos/burj-royale-1br/01.jpg", caption: "Burj Royale 1BR · city light all day" },
    ],
  },
  {
    id: "bedrooms",
    name: "Bedrooms",
    icon: "bed",
    line: "King beds dressed in hotel linen, with blackout curtains when you want them.",
    shots: [
      { src: "/photos/burj-royale-2br/04.jpg", caption: "Burj Royale 2BR · wake up to the tower" },
      { src: "/photos/burj-royale-1br/03.jpg", caption: "Burj Royale 1BR · opening onto the balcony" },
      { src: "/photos/burj-royale-2br/05.jpg", caption: "Burj Royale 2BR · the second king room" },
    ],
  },
  {
    id: "dining",
    name: "Kitchens & dining",
    icon: "dining",
    line: "Fully equipped kitchens and proper tables, for a long breakfast or dinner in.",
    shots: [
      { src: "/photos/burj-royale-2br/03.jpg", caption: "Burj Royale 2BR · dining for four" },
      { src: "/photos/burj-royale-1br/05.jpg", caption: "Burj Royale 1BR · open-plan kitchen" },
      { src: "/photos/creek-rise-1br/04.jpg", caption: "Creek Rise · living and kitchen" },
    ],
  },
  {
    id: "outside",
    name: "Balconies & terraces",
    icon: "wine",
    line: "Coffee at sunrise, a glass at sundown: every home has its own outdoor space.",
    shots: [
      { src: "/photos/grand-bleu-elie-saab-2br/02.jpg", caption: "Grand Bleu · terrace above the sea" },
      { src: "/photos/creek-rise-1br/03.jpg", caption: "Creek Rise · breakfast over the creek" },
      { src: "/photos/burj-royale-1br/04.jpg", caption: "Burj Royale 1BR · above Downtown" },
    ],
  },
  {
    id: "pools",
    name: "Pools & beach",
    icon: "pool",
    line: "Building pools and gyms at every address, and a private beach at Dubai Harbour.",
    shots: [
      { src: "/photos/creek-rise-1br/05.jpg", caption: "Creek Rise · the pool deck" },
      { src: "/photos/grand-bleu-elie-saab-2br/01.jpg", caption: "Grand Bleu · the private beach" },
      { src: "/photos/grand-bleu-elie-saab-2br/05.jpg", caption: "Dubai Harbour · the Palm on the horizon" },
    ],
  },
];

/** Room by room: pick a space, the photograph wipes in; thumbnails switch within it. */
export function Rooms() {
  const [r, setR] = useState(0);
  const [s, setS] = useState(0);
  const reduce = useReducedMotion();
  const booking = useBooking();
  const room = rooms[r];
  const shot = room.shots[s];

  const pick = (k: number) => {
    setR(k);
    setS(0);
  };

  return (
    <section id="inside" aria-labelledby="rooms-title" className="section-y scroll-mt-24 bg-ivory">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead n={3} label="Inside the homes" />
            <SplitLines id="rooms-title" className="t-h2 mt-8" lines={["Room by room,", <span key="b" className="italic-accent">made for staying in.</span>]} />
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p>Every home is furnished and equipped to the standard of a good hotel, with the space and privacy of your own apartment.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* Room list */}
          <div role="tablist" aria-label="Rooms" aria-orientation="vertical" className="border-t border-line lg:col-span-4">
            {rooms.map((x, k) => {
              const on = k === r;
              return (
                <button
                  key={x.id}
                  id={`room-tab-${x.id}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls="room-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(k)}
                  onKeyDown={(e) => {
                    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const n = (k + d + rooms.length) % rooms.length;
                    pick(n);
                    (e.currentTarget.parentElement?.children[n] as HTMLElement)?.focus();
                  }}
                  className="group relative flex w-full items-center gap-5 border-b border-line py-5 text-left"
                >
                  <BrandIcon name={x.icon} className={`size-7 transition-colors duration-500 ${on ? "text-velvet" : "text-palm"}`} />
                  <span className={`font-display text-[clamp(1.5rem,1.25rem+0.9vw,2.1rem)] font-medium leading-none transition-all duration-500 ${on ? "translate-x-1 italic text-velvet" : "text-velvet/45 group-hover:text-velvet/80"}`}>
                    {x.name}
                  </span>
                  <span aria-hidden className={`absolute bottom-[-1px] left-0 h-px bg-velvet transition-[width] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${on ? "w-full" : "w-0"}`} />
                </button>
              );
            })}
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={room.id} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="mt-8 max-w-sm">
                {room.line}
              </motion.p>
            </AnimatePresence>
            <button type="button" onClick={() => booking.open()} className="btn btn-primary mt-8">
              <span>Find your dates</span>
            </button>
          </div>

          {/* Photograph */}
          <div id="room-panel" role="tabpanel" aria-labelledby={`room-tab-${room.id}`} className="lg:col-span-8">
            <div className="relative aspect-[4/3] overflow-hidden bg-timeless-300 lg:aspect-[16/11]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={shot.src}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 0% 100%)" }}
                  animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 1, transition: { duration: 0, delay: 1 } }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <motion.div className="absolute inset-0" initial={{ scale: reduce ? 1 : 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
                    <Image src={shot.src} alt={shot.caption} fill sizes="(min-width:1024px) 62vw, 100vw" className="object-cover" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
              <p className="font-display text-lg italic text-velvet" aria-live="polite">
                <span className="mr-3 not-italic text-palm-700">Fig. {r + 1}.{s + 1}</span>
                {shot.caption}
              </p>
              <div className="flex gap-2">
                {room.shots.map((x, k) => (
                  <button
                    key={x.src}
                    type="button"
                    onClick={() => setS(k)}
                    aria-label={`Show ${x.caption}`}
                    aria-pressed={k === s}
                    className={`relative h-14 w-20 overflow-hidden transition-[opacity,outline-color] duration-300 outline outline-1 outline-offset-2 ${k === s ? "opacity-100 outline-velvet" : "opacity-55 outline-transparent hover:opacity-90"}`}
                  >
                    <Image src={x.src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
