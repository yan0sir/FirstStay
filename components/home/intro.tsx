"use client";

import Image from "next/image";
import { useScroll } from "motion/react";
import { useRef } from "react";
import { Diamond } from "../brand";
import { Parallax, Reveal, ScrollWord, SplitLines, Unmask } from "../motion";
import { ArrowRight, BrandIcon } from "../icons";

const places = ["Downtown Dubai", "Dubai Harbour", "Dubai Creek Harbour", "Burj Khalifa views", "Private beach", "Skyline across the water"];

/** Slow ribbon of place names between the hero and the statement. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {places.map((p) => (
        <span key={p} className="flex items-center gap-10 pr-10 font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] italic text-velvet">
          {p}
          <Diamond className="text-palm" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line py-6 md:py-8">
      <p className="sr-only">Homes in Downtown Dubai, Dubai Harbour and Dubai Creek Harbour.</p>
      <div className="marquee-track flex w-max">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}

const statement =
  "We look after four homes in Dubai the way we would want to be looked after: fresh hotel linen, a stocked kitchen, fast Wi-Fi and someone on call at any hour. Your key is ready before you land.";

/** Large serif statement; each word brightens as it scrolls into view. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.split(" ");
  return (
    <section aria-label="About FirstStay" className="section-y">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="eyebrow">A key to serenity</p>
        </Reveal>
        <div className="md:col-span-9">
          <p ref={ref} className="t-lead text-[clamp(1.75rem,1.2rem+2.2vw,3.4rem)] leading-[1.14]">
            {words.map((w, i) => (
              <ScrollWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </ScrollWord>
            ))}
          </p>
          <Reveal className="mt-10">
            <a href="#homes" className="link">
              Meet the homes <ArrowRight />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const ready = [
  { icon: "wifi", title: "Fast fibre Wi-Fi", body: "Up to 500 Mbps: enough for calls, streaming and the whole family at once." },
  { icon: "bed", title: "Hotel-grade linen", body: "Crisp sheets, hypoallergenic duvets and fresh towels for every stay." },
  { icon: "key-card", title: "24/7 check-in", body: "Land at any hour. Your key and directions arrive before you do." },
  { icon: "pool", title: "Pools & gyms", body: "Every building has a pool and a gym, some with Burj Khalifa views." },
  { icon: "dining", title: "Full kitchens", body: "Cook a proper dinner, or make coffee on the balcony at sunrise." },
  { icon: "housekeeping", title: "Spotless, every time", body: "Professionally cleaned and checked by our team before you arrive." },
];

/** "Everything's ready": photo collage with parallax + six brand-icon promises. */
export function Ready() {
  return (
    <section id="ready" aria-labelledby="ready-title" className="section-y scroll-mt-24 bg-ivory">
      <div className="container-x">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow">How we host</p></Reveal>
            <SplitLines id="ready-title" className="t-h2 mt-6" lines={["Everything's ready,", <span key="b" className="italic-accent">before you are.</span>]} />
          </div>
          <Reveal className="md:col-span-5" delay={0.15}>
            <p className="t-body-lg max-w-md">
              Every FirstStay home is furnished, equipped and cleaned to the standard of a good hotel, with the space and privacy of your own apartment.
            </p>
          </Reveal>
        </div>

        {/* Collage */}
        <div className="mt-16 grid grid-cols-12 gap-3 md:mt-24 md:gap-5">
          <Unmask className="col-span-7 md:col-span-5">
            <Parallax amount={40} className="aspect-[4/5]">
              <Image src="/photos/burj-royale-1br/03.jpg" alt="King bedroom with hotel linen" fill sizes="(min-width:768px) 40vw, 58vw" className="object-cover" />
            </Parallax>
          </Unmask>
          <div className="col-span-5 flex flex-col gap-3 md:col-span-3 md:gap-5 md:pt-24">
            <Unmask delay={0.1}>
              <Parallax amount={30} className="aspect-square">
                <Image src="/photos/creek-rise-1br/03.jpg" alt="Balcony table above the creek" fill sizes="(min-width:768px) 24vw, 40vw" className="object-cover" />
              </Parallax>
            </Unmask>
            <Unmask delay={0.2}>
              <Parallax amount={30} className="arch aspect-[3/4]">
                <Image src="/photos/creek-rise-1br/05.jpg" alt="Pool deck at Creek Rise" fill sizes="(min-width:768px) 24vw, 40vw" className="object-cover" />
              </Parallax>
            </Unmask>
          </div>
          <Unmask delay={0.15} className="col-span-12 md:col-span-4 md:-mt-10">
            <Parallax amount={50} className="aspect-[16/10] md:aspect-[4/5]">
              <Image src="/photos/burj-royale-1br/05.jpg" alt="Fully equipped kitchen and dining area" fill sizes="(min-width:768px) 32vw, 100vw" className="object-cover" />
            </Parallax>
          </Unmask>
        </div>

        {/* Promises */}
        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 md:mt-24">
          {ready.map((r, i) => (
            <Reveal as="li" key={r.title} delay={(i % 3) * 0.08} className="group bg-ivory p-7 transition-colors duration-500 hover:bg-timeless md:p-9">
              <BrandIcon name={r.icon} className="size-9 text-palm-700 transition-transform duration-700 group-hover:-translate-y-1" />
              <h3 className="mt-6 font-display text-[1.6rem] font-medium leading-tight">{r.title}</h3>
              <p className="mt-2 text-[0.98rem]">{r.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
