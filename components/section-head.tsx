import { Reveal } from "./motion";

/** Editorial section marker: "N° 02 ── THE COLLECTION". */
export function SectionHead({ n, label, light = false, className = "" }: { n: number; label: string; light?: boolean; className?: string }) {
  return (
    <Reveal className={`flex items-center gap-4 ${className}`}>
      <span className={`font-display text-[0.95rem] italic ${light ? "text-timeless/80" : "text-palm-700"}`}>N° {String(n).padStart(2, "0")}</span>
      <span aria-hidden className={`h-px w-10 ${light ? "bg-timeless/40" : "bg-line-strong"}`} />
      <p className={`text-[0.75rem] font-medium uppercase tracking-[0.26em] ${light ? "text-timeless" : "text-palm-700"}`}>{label}</p>
    </Reveal>
  );
}
