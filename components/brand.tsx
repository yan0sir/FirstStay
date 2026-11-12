import Image from "next/image";

type Tone = "color" | "light" | "velvet";
const suffix = (t: Tone) => (t === "color" ? "" : `-${t}`);

/** Key monogram in its oval frame. Multicolour only on light backgrounds (guidelines: Logo Don'ts). */
export function Monogram({ tone = "color", className = "", priority = false }: { tone?: Tone; className?: string; priority?: boolean }) {
  return (
    <Image
      src={`/brand/monogram${suffix(tone)}.png`}
      alt=""
      width={256}
      height={480}
      priority={priority}
      className={className}
    />
  );
}

/**
 * Header lockup: monogram + FirstStay wordmark + "Holiday Homes".
 * [LATER] Swap for the vector Holiday Homes lockup when it is exported (brief §3.2).
 */
export function Lockup({ tone = "color", size = "md", className = "" }: { tone?: Exclude<Tone, "velvet">; size?: "sm" | "md"; className?: string }) {
  const light = tone === "light";
  const sm = size === "sm";
  return (
    <span className={`inline-flex items-center ${sm ? "gap-2.5" : "gap-3"} ${className}`}>
      <Monogram tone={light ? "light" : "color"} className={sm ? "h-9 w-auto" : "h-11 w-auto md:h-12"} priority />
      <span className="flex flex-col items-start leading-none">
        <Image
          src={`/brand/wordmark${light ? "-light" : "-velvet"}.png`}
          alt="FirstStay"
          width={664}
          height={160}
          priority
          className={sm ? "h-[19px] w-auto" : "h-[22px] w-auto md:h-[26px]"}
        />
        <span
          className={`${sm ? "mt-1 text-[0.56rem]" : "mt-1.5 text-[0.62rem] md:text-[0.7rem]"} font-display tracking-[0.32em] ${light ? "text-timeless/85" : "text-velvet/85"}`}
        >
          HOLIDAY HOMES
        </span>
      </span>
    </span>
  );
}

/** The interlocking-oval pattern from the guidelines, as a faint tiled background. */
export function OvalPattern({ className = "", stroke = "currentColor", opacity = 0.14 }: { className?: string; stroke?: string; opacity?: number }) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} style={{ opacity }}>
      <defs>
        <pattern id="fs-ovals" width="56" height="112" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={stroke} strokeWidth="1">
            <rect x="0.5" y="-55.5" width="55" height="111" rx="27.5" />
            <rect x="0.5" y="56.5" width="55" height="111" rx="27.5" />
            <rect x="-27.5" y="0.5" width="55" height="111" rx="27.5" />
            <rect x="28.5" y="0.5" width="55" height="111" rx="27.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fs-ovals)" />
    </svg>
  );
}

/** Diamond from the oval frame's side points. */
export function Diamond({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block size-[7px] rotate-45 bg-current ${className}`} />;
}

export function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-current opacity-30" />
      <Diamond />
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}

export type IllustrationName = "key" | "peony" | "palm" | "armchair" | "bird" | "burj";
const illoSize: Record<IllustrationName, [number, number]> = {
  key: [655, 690], peony: [700, 593], palm: [417, 690], armchair: [393, 690], bird: [700, 745], burj: [358, 781],
};

/** Engraved illustrations in oval frames, cut from the brand guidelines. */
export function Illustration({ name, className = "" }: { name: IllustrationName; className?: string }) {
  const [w, h] = illoSize[name];
  return <Image src={`/brand/illustrations/${name}.png`} alt="" width={w} height={h} className={className} />;
}
