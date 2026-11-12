import Image from "next/image";
import Link from "next/link";
import type { Home } from "@/lib/homes";
import { ArrowRight } from "./icons";

/**
 * PropertyCard: a clean editorial card. Straight-edged photo that slowly crossfades to a second
 * photo on hover, a small neighbourhood label on the image, then name + rating and facts + price
 * on two ruled lines. Every card in a row has the same proportions, so the grid stays aligned.
 */
export function PropertyCard({ home, sizes = "(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" }: { home: Home; index?: number; sizes?: string }) {
  const [a, b] = home.photos;
  return (
    <Link href={`/stays/${home.slug}`} className="group block" aria-label={`${home.name}, ${home.neighbourhood}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-timeless-300">
        <Image src={a.src} alt={a.alt} fill sizes={sizes} className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]" />
        <Image
          src={b.src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover opacity-0 transition-[opacity,transform] duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05] group-hover:opacity-100"
        />
        <span className="absolute left-4 top-4 bg-ivory/95 px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-velvet">
          {home.neighbourhood}
        </span>
        {/* "View" appears on hover, sliding up from the bottom edge */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-velvet px-5 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-timeless transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
          View the home <ArrowRight className="size-4" />
        </span>
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <h3 className="font-display text-[1.7rem] font-medium leading-tight text-velvet">{home.name}</h3>
        {home.rating && (
          <span className="shrink-0 text-[0.95rem] text-velvet">
            <span aria-hidden className="mr-1.5 inline-block size-[6px] -translate-y-px rotate-45 bg-palm-700" />
            {home.rating.toFixed(1)}
            <span className="sr-only"> out of 10 guest rating</span>
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4 text-[0.95rem]">
        <span>
          {home.bedrooms} {home.bedrooms === 1 ? "bedroom" : "bedrooms"} · {home.guests} guests
        </span>
        <span className="shrink-0">
          from <span className="font-display text-xl text-velvet">AED {home.fromAed.toLocaleString("en-AE")}</span>
        </span>
      </div>
    </Link>
  );
}
