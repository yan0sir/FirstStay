import Image from "next/image";
import Link from "next/link";
import type { Home } from "@/lib/homes";
import { ArrowRight } from "./icons";

/**
 * PropertyCard (brief §3.5): arch-masked photo that crossfades to a second photo and zooms
 * slightly on hover, neighbourhood eyebrow, name, facts, price and rating.
 */
export function PropertyCard({ home, index, sizes = "(min-width:1024px) 40vw, (min-width:768px) 45vw, 90vw" }: { home: Home; index?: number; sizes?: string }) {
  const [a, b] = home.photos;
  return (
    <Link href={`/stays/${home.slug}`} className="group block" aria-label={`${home.name}, ${home.neighbourhood}`}>
      <div className="frame-ring relative rounded-t-[999px]">
        <div className="arch relative aspect-[4/5] overflow-hidden bg-timeless-300">
          <Image src={a.src} alt={a.alt} fill sizes={sizes} className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
          <Image
            src={b.src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-[opacity,transform] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] group-hover:opacity-100"
          />
          {home.rating && (
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-ivory/95 px-3.5 py-1.5 text-[0.8rem] font-medium tracking-[0.08em] text-velvet">
              <span aria-hidden className="mr-1.5 inline-block size-[6px] -translate-y-px rotate-45 bg-palm-700" />
              {home.rating.toFixed(1)} <span className="sr-only">out of 10 guest rating</span>
            </span>
          )}
        </div>
      </div>
      <div className="mt-7 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow">{index !== undefined ? `0${index + 1} · ` : ""}{home.neighbourhood}</p>
          <h3 className="t-h3 mt-3 transition-colors duration-500 group-hover:text-palm-700">{home.name}</h3>
          <p className="mt-2 text-[0.98rem]">
            {home.bedrooms} {home.bedrooms === 1 ? "bedroom" : "bedrooms"} · {home.guests} guests · from{" "}
            <span className="text-velvet">AED {home.fromAed.toLocaleString("en-AE")}</span> a night
          </p>
        </div>
        <span aria-hidden className="mt-2 flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong text-velvet transition-all duration-500 group-hover:border-velvet group-hover:bg-velvet group-hover:text-timeless">
          <ArrowRight className="size-4 transition-transform duration-500 group-hover:-rotate-45" />
        </span>
      </div>
    </Link>
  );
}
