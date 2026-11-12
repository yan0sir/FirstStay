// Thin line icons for the interface (1.25px strokes, rounded, to sit with the brand's line icons).
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const ChevronLeft = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M15 5l-7 7 7 7" /></svg>
);
export const ChevronRight = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M9 5l7 7-7 7" /></svg>
);
export const ChevronDown = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 9l7 7 7-7" /></svg>
);
export const ArrowRight = ({ className = "size-4 arrow" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ className = "size-4 arrow" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M7 17L17 7M8 7h9v9" /></svg>
);
export const Close = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 5l14 14M19 5L5 19" /></svg>
);
export const Plus = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 5v14M5 12h14" /></svg>
);
export const Minus = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14" /></svg>
);
export const Calendar = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3.5" y="5" width="17" height="15" rx="1" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
);
export const Guests = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.5 3.5 0 010 6.4M18.5 14.8c1.7.8 2.7 2.5 3 5.2" /></svg>
);
export const Pin = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>
);
export const Phone = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 005.3 5.3l1.4-2.2L19 14.5V18a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" /></svg>
);
export const Chat = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 19.5l1.3-3.8A8 8 0 1112 20a8 8 0 01-4.2-1.2z" /></svg>
);
export const Mail = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="5.5" width="18" height="13" rx="1" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></svg>
);
export const Expand = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
export const Pause = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M9 5v14M15 5v14" /></svg>
);
export const Play = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M7 5l12 7-12 7z" /></svg>
);

/** Brand line icon (PNG from the guidelines), recoloured via CSS mask. */
export function BrandIcon({ name, className = "" }: { name: string; className?: string }) {
  return <span aria-hidden className={`brand-icon ${className}`} style={{ "--icon": `url(/brand/icons/${name}.png)` } as React.CSSProperties} />;
}
