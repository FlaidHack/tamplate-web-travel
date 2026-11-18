import Link from "next/link";
import { Star } from "lucide-react";
import { durationLabel, typeLabel, type TourPackage } from "../data/packages";
import { rupiahJt } from "../data/site";
import { Photo, Pin } from "./ui";

export default function PackageCard({ p, note }: { p: TourPackage; note?: string }) {
  return (
    <Link href={`/paket/${p.slug}`} className="group block">
      <div className="relative aspect-[352/254] overflow-hidden rounded-[24px]">
        <Photo src={p.image} alt={p.name} className="transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-[15px] flex h-7 items-center rounded-lg bg-white/90 px-2.5 text-[11px] font-semibold text-[#333]">{typeLabel(p.type)}</span>
        <span className="absolute right-4 top-[15px] flex h-7 items-center gap-1 rounded-lg bg-white px-2.5 text-[12px] font-semibold">
          <Star size={13} className="fill-[#FFB800] text-[#FFB800]" />{String(p.rating).replace(".", ",")}
        </span>
      </div>
      <div className="mt-4 flex justify-between gap-3 xl:mt-[26px]">
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold leading-[30px] transition-colors group-hover:text-brand xl:text-[20px]">{p.name}</h3>
          <div className="mt-1 xl:mt-[9px]"><Pin text={p.location} /></div>
          <p className="mt-1 text-[13px] text-[#8A8A93]">{durationLabel(p.days)}{note ? ` · ${note}` : ""}
            {p.type === "open" && p.seatsLeft && p.seatsLeft <= 5 && (
              <span className="font-medium text-scarlet"> · Sisa {p.seatsLeft} kursi</span>
            )}
          </p>
        </div>
        <p className="whitespace-nowrap pt-1 text-[20px] font-medium leading-[38px] xl:pt-[11px] xl:text-[24px]">{rupiahJt(p.price)}<span className="text-[13px] font-normal text-[#8A8A93] xl:text-[15px]">/Pax</span></p>
      </div>
    </Link>
  );
}
