"use client";

import { Diamond } from "../brand";

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
