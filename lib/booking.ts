import { site } from "./site";

export type Stay = { checkIn?: string; checkOut?: string; guests?: number };

// Hand-off to the Hostaway booking engine (booking.firststay.ae).
// [LATER] Confirm the engine's query parameter names with a live test (implementation-plan.md Phase 0).
// If they differ, only this file needs to change.
function params({ checkIn, checkOut, guests }: Stay) {
  const p = new URLSearchParams();
  if (checkIn) p.set("start", checkIn);
  if (checkOut) p.set("end", checkOut);
  if (guests) p.set("numberOfGuests", String(guests));
  const s = p.toString();
  return s ? `?${s}` : "";
}

export const searchUrl = (stay: Stay) => `${site.bookingEngine}/listings${params(stay)}`;
export const listingUrl = (hostawayId: number, stay: Stay = {}) =>
  `${site.bookingEngine}/listings/${hostawayId}${params(stay)}`;
