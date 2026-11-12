import Image from "next/image";

/**
 * Cream round medallion holding an engraved brand illustration. The drawing sits centred in an
 * inner box with room around it and is never clipped (no overflow hidden), so its own oval frame,
 * feathers or leaves stay whole.
 */
export function Medallion({ name, className = "" }: { name: string; className?: string }) {
  return (
    <div aria-hidden className={`relative aspect-square rounded-full bg-ivory shadow-[0_30px_60px_-30px_rgba(30,8,14,.55)] ${className}`}>
      <span className="absolute inset-[7px] rounded-full border border-line" />
      <div className="absolute inset-[16%]">
        <Image src={`/brand/illustrations/${name}.png`} alt="" fill sizes="180px" className="object-contain object-center" />
      </div>
    </div>
  );
}
