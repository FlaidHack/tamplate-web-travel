"use client";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Plane } from "lucide-react";
import { stamps } from "../data/site";
import { CenterHead, Photo } from "./ui";

export default function Adventure() {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 24;
    el.scrollBy({ left: dir * (card.clientWidth + gap), behavior: "smooth" });
  };

  return (
    <section id="petualangan" className="wrap-sec mt-24 scroll-mt-24 lg:mt-[130px]">
      <CenterHead title="Ayo mulai petualangan" sub="Pilih dan pesan pengalaman terbaikmu." size="text-[28px] md:text-[38px] xl:text-[48px]" subSize="text-[15px] md:text-[18px] xl:text-[20px]" />
      <div ref={ref} className="mt-8 flex snap-x snap-mandatory scroll-pl-6 gap-6 overflow-x-auto px-6 pb-8 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:mt-[46px] xl:scroll-pl-8 xl:gap-[62px] xl:px-8">
        {stamps.map((s) => (
          <div key={s.label} className="relative w-[200px] shrink-0 snap-start sm:w-[220px] lg:w-[calc(25%-46.5px)]">
            <span className="absolute -left-[18px] -top-5 z-10 grid size-[62px] place-items-center rounded-full bg-brand">
              <span className="grid size-[50px] place-items-center rounded-full border-[3px] border-dotted border-white/90">
                <span className="grid size-[34px] place-items-center rounded-full bg-white text-brand"><Plane size={18} className="fill-brand" /></span>
              </span>
            </span>
            <div className="rounded-md border-[3px] border-dotted border-[#EEEEEA] bg-[#FDFDFB] p-4 pb-3 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] xl:p-[20px] xl:pb-[12px]">
              <div className="relative aspect-square overflow-hidden"><Photo src={s.image} alt={s.label} /></div>
              <p className="mt-3 text-center text-[13px] font-medium uppercase leading-[26px] tracking-[0.3em] text-[#707477] xl:text-[16px]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-[14px]">
        {[-1, 1].map((d) => (
          <button key={d} onClick={() => go(d)} aria-label={d < 0 ? "Sebelumnya" : "Berikutnya"} className="grid size-8 place-items-center rounded-full border border-[#E6E6E6] text-[#8A8A93] transition-colors hover:border-brand hover:text-brand">
            {d < 0 ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
          </button>
        ))}
      </div>
    </section>
  );
}
