import Image from "next/image";

/**
 * Brand reveal on the first page of a visit: the logo's oval draws itself, the monogram and
 * "HOLIDAY HOMES" appear, then the cream curtain lifts. CSS only (see .intro in globals.css),
 * hidden for returning page views and for reduced motion.
 */
export function Intro() {
  return (
    <div className="intro" aria-hidden>
      <div className="flex flex-col items-center">
        <div className="relative h-[150px] w-[82px]">
          <svg viewBox="0 0 82 150" className="absolute inset-0 h-full w-full overflow-visible">
            <rect x="1" y="1" width="80" height="148" rx="40" fill="none" stroke="#42121e" strokeWidth="1" pathLength={1} />
            <rect x="6" y="6" width="70" height="138" rx="35" fill="none" stroke="#7b826c" strokeWidth="1" pathLength={1} />
          </svg>
          <div className="intro-mark absolute inset-[18px_14px]">
            <Image src="/brand/monogram.png" alt="" fill sizes="60px" className="object-contain" priority />
          </div>
        </div>
        <p className="intro-word mt-7 font-display text-sm text-velvet">FIRSTSTAY · HOLIDAY HOMES</p>
      </div>
    </div>
  );
}

/** Runs before first paint: decides whether the intro plays (once per browser session). */
export const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem('fs-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='seen'}else{d.dataset.intro='play';sessionStorage.setItem('fs-intro','1')}}catch(e){document.documentElement.dataset.intro='seen'}`;
