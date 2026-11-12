"use client";

const places = ["Downtown Dubai", "Dubai Harbour", "Dubai Creek Harbour", "Burj Khalifa views", "A private beach", "The skyline across the water"];

/** The logo's oval with its side diamonds, used as the separator in the ribbon. */
function OvalMark() {
  return (
    <svg aria-hidden viewBox="0 0 26 40" className="h-[0.9em] w-auto shrink-0 text-palm">
      <rect x="5" y="1" width="16" height="38" rx="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1.4" y="18.6" width="2.8" height="2.8" transform="rotate(45 2.8 20)" fill="currentColor" />
      <rect x="21.8" y="18.6" width="2.8" height="2.8" transform="rotate(45 23.2 20)" fill="currentColor" />
    </svg>
  );
}

/** A slow Velvet ribbon of place names between the hero and the welcome. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {places.map((p) => (
        <span key={p} className="flex items-center gap-12 pr-12 font-display text-[clamp(2rem,1.4rem+2.4vw,3.6rem)] italic leading-none text-timeless">
          {p}
          <OvalMark />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee overflow-hidden bg-velvet py-7 md:py-10">
      <p className="sr-only">Homes in Downtown Dubai, Dubai Harbour and Dubai Creek Harbour.</p>
      <div className="marquee-track flex w-max">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
