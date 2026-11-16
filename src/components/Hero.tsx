/* eslint-disable @next/next/no-img-element */
import { Plane } from "lucide-react";
import SearchCard from "./SearchCard";
import { IMG } from "../data/site";

export default function Hero() {
  return (
    <section id="beranda" className="wrap flex flex-col pt-[96px] md:pt-[112px] lg:h-svh lg:min-h-[720px] lg:pb-6">
      <div className="relative lg:mb-[88px] lg:min-h-[420px] lg:flex-1">
        <div className="relative h-[460px] overflow-hidden rounded-[24px] sm:h-[500px] lg:absolute lg:inset-0 lg:h-auto lg:rounded-[32px]">
          <img src={IMG.hero} alt="Pantai tropis nusantara" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(205deg,rgba(6,118,200,.92)_0%,rgba(33,142,214,.62)_38%,rgba(80,170,225,.18)_75%,rgba(255,255,255,0)_100%)]" />

          <svg className="pointer-events-none absolute left-0 top-0 hidden h-[200px] w-[260px] lg:block" viewBox="0 0 260 200" fill="none" aria-hidden="true">
            <path d="M44 2C62 30 84 62 64 86C50 102 26 92 36 74C46 58 80 84 108 118C116 128 124 136 128 148" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 7" />
          </svg>
          <svg className="pointer-events-none absolute right-0 top-[60px] hidden h-[200px] w-[260px] lg:block" viewBox="0 0 260 200" fill="none" aria-hidden="true">
            <path d="M80 152C120 130 160 96 205 88C238 82 256 62 256 36" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 7" />
          </svg>
          <Plane size={32} className="absolute left-[112px] top-[150px] hidden rotate-90 fill-white text-white lg:block" aria-hidden="true" />
          <Plane size={32} className="absolute right-[170px] top-[204px] hidden rotate-180 fill-white text-white lg:block" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center px-5 pt-14 text-center text-white lg:pt-[clamp(40px,8vh,84px)]">
            <h1 className="mx-auto max-w-[960px] text-[30px] font-semibold leading-[1.25] md:text-[46px] xl:text-[56px] xl:leading-[1.55]">
              Jelajahi seluruh nusantara<br className="hidden md:block" /> dan nikmati keindahannya
            </h1>
            <p className="mt-4 text-[14px] md:text-[17px] xl:mt-6 xl:text-[20px]">Temukan dan ceritakan pengalamanmu menjelajah Indonesia, dari Sabang sampai Merauke.</p>
          </div>
        </div>

        <SearchCard />
      </div>
    </section>
  );
}
