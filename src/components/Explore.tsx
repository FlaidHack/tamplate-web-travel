"use client";
import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { packages } from "../data/packages";
import { categories } from "../data/site";
import PackageCard from "./PackageCard";
import { Head } from "./ui";

const featured = packages.filter((p) => p.featured);

export default function Explore() {
  const [cat, setCat] = useState("Populer");
  const [sorted, setSorted] = useState(false);
  const items = cat === "Populer" ? [...featured] : featured.filter((p) => p.tags.includes(cat));
  if (sorted) items.sort((a, b) => a.price - b.price);

  return (
    <section id="jelajah" className="wrap-sec mt-24 scroll-mt-24 lg:mt-[166px]">
      <Head
        title="Jelajahi lebih jauh"
        sub="Yuk, mulai petualanganmu"
        aside="Paket wisata lengkap ke ratusan destinasi di seluruh nusantara: tiket, penginapan, dan pemandu lokal. Yuk, jelajahi sekarang."
      />
      <div className="mt-8 flex items-center justify-between gap-6 lg:mt-[38px]">
        <div className="flex gap-[14px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:gap-[21px]">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`h-[43px] shrink-0 rounded-xl px-5 text-[13px] transition-colors xl:px-6 xl:text-[14px] ${cat === c ? "bg-[#343434] font-medium text-white" : "bg-[#F7F7F7] text-[#7A7A7A] hover:bg-[#EFEFEF]"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSorted(!sorted)}
          aria-pressed={sorted}
          className={`hidden h-[43px] shrink-0 items-center gap-3 rounded-xl border bg-white px-5 text-[14px] shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)] lg:flex ${sorted ? "border-brand text-brand" : "border-[#F0F0F0] text-[#333]"}`}
        >
          Filters <SlidersHorizontal size={16} />
        </button>
      </div>
      <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-[51px] lg:grid-cols-3 lg:gap-x-[6%] lg:gap-y-[56px]">
        {items.map((p) => <PackageCard key={p.slug} p={p} />)}
      </div>
      <div className="mt-12 text-center xl:mt-[53px]">
        <Link href="/paket" className="inline-flex h-[47px] items-center rounded-[14px] border border-[#F0F0F0] bg-white px-[23px] text-[15px] font-medium shadow-[0_4px_18px_-6px_rgba(0,0,0,0.08)] transition-colors hover:border-brand xl:text-[16px]">
          Lihat semua paket
        </Link>
      </div>
    </section>
  );
}
