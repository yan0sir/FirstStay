import { Reveal } from "./motion";

/**
 * Section marker drawn from the logo: a tiny double oval with its side diamonds, then the label
 * in the display italic. Quieter and more "ours" than numbered small caps.
 */
export function SectionHead({ label, light = false, className = "" }: { n?: number; label: string; light?: boolean; className?: string }) {
  const c = light ? "text-timeless" : "text-palm-700";
  return (
    <Reveal className={`flex items-center gap-3.5 ${c} ${className}`}>
      <svg aria-hidden viewBox="0 0 26 40" className="h-[1.6rem] w-auto shrink-0 overflow-visible">
        <rect x="5" y="1" width="16" height="38" rx="8" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="7.5" y="3.5" width="11" height="33" rx="5.5" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        <rect x="1.4" y="18.6" width="2.8" height="2.8" transform="rotate(45 2.8 20)" fill="currentColor" />
        <rect x="21.8" y="18.6" width="2.8" height="2.8" transform="rotate(45 23.2 20)" fill="currentColor" />
      </svg>
      <p className="font-display text-[1.2rem] italic leading-none">{label}</p>
    </Reveal>
  );
}
