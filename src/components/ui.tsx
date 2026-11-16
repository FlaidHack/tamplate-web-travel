/* eslint-disable @next/next/no-img-element */
import { MapPin } from "lucide-react";

/** Heading kiri: judul + subjudul, paragraf kecil di kanan (Popular Place / Explore more). */
export function Head({ title, sub, aside }: { title: string; sub: string; aside?: string }) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
      <div>
        <h2 className="h-display text-[34px] md:text-[44px] xl:text-[54px]">{title}</h2>
        <p className="mt-1 text-[17px] leading-[1.5] text-[#69686D] md:text-[20px] xl:text-[23px]">{sub}</p>
      </div>
      {aside && <p className="text-[14px] leading-[1.5] text-[#7A7A7A] lg:mr-9 lg:mt-7 lg:w-[500px] xl:text-[15px]">{aside}</p>}
    </div>
  );
}

/** Heading tengah. `size` = kelas ukuran font heading. */
export function CenterHead({ title, sub, size, subSize }: { title: string; sub: string; size: string; subSize: string }) {
  return (
    <div className="text-center">
      <h2 className={`h-display ${size}`}>{title}</h2>
      <p className={`mt-2 leading-[1.5] text-[#69686D] ${subSize}`}>{sub}</p>
    </div>
  );
}

export const Pin = ({ text }: { text: string }) => (
  <p className="flex items-center gap-2 text-[14px] leading-6 text-[#7A7A7A] lg:whitespace-nowrap xl:text-[16px]">
    <MapPin size={18} className="shrink-0 fill-brand text-brand" strokeWidth={1.5} />
    {text}
  </p>
);

export const Photo = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => (
  <img src={src} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${className}`} />
);
