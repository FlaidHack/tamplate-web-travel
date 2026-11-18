import { Play } from "lucide-react";
import { IMG, waLink } from "../data/site";
import { Photo } from "./ui";

export default function Banner() {
  return (
    <section id="pesan" className="wrap-sec mt-24 scroll-mt-24 lg:mt-[143px]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-[22px] font-medium leading-[1.2] md:text-[30px] xl:text-[38px]">Pesan tiket dan berangkat sekarang!</h2>
        <a href={waLink("Halo Jelajah Nusa, saya mau pesan tiket.")} className="btn-scarlet h-12 shrink-0 px-6 font-display text-[16px] xl:px-[34px]">Pesan sekarang</a>
      </div>
      <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[28px] sm:aspect-[1200/655] xl:mt-[44px]">
        <Photo src={IMG.banner} alt="Pantai dan resort dari udara" />
        <span className="absolute left-1/2 top-1/2 grid size-[72px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#3F8D8C]/75 backdrop-blur-[2px] xl:size-[86px]">
          <Play size={22} className="ml-0.5 fill-white text-white" />
        </span>
      </div>
    </section>
  );
}
