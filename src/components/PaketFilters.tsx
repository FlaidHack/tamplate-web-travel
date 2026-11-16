"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { SearchQuery } from "../data/packages";

const durasi = [["", "Semua durasi"], ["1", "1 hari"], ["2-3", "2–3 hari"], ["4-5", "4–5 hari"], ["6+", "6 hari lebih"]];
const tipe = [["", "Semua"], ["open", "Open Trip"], ["private", "Private Trip"]];
const urut = [["populer", "Terpopuler"], ["termurah", "Harga terendah"], ["termahal", "Harga tertinggi"], ["durasi", "Durasi terpendek"]];
const input = "h-12 w-full rounded-lg bg-[#F9F9FA] px-3.5 text-[14px] outline-none placeholder:text-[#A8A8B0] focus:ring-2 focus:ring-brand/30";

export default function PaketFilters({ initial }: { initial: SearchQuery }) {
  const router = useRouter();
  const [s, setS] = useState({
    tujuan: initial.tujuan ?? "", berangkat: initial.berangkat ?? "", durasi: initial.durasi ?? "",
    pax: initial.pax ? String(initial.pax) : "", tipe: initial.tipe ?? "", urut: initial.urut ?? "populer",
  });
  const go = (n = s) => {
    const p = new URLSearchParams();
    Object.entries(n).forEach(([k, v]) => { if (v && !(k === "urut" && v === "populer")) p.set(k, v); });
    const qs = p.toString();
    router.push(qs ? `/paket?${qs}` : "/paket");
  };
  const set = (k: keyof typeof s, v: string, now = false) => {
    const n = { ...s, [k]: v };
    setS(n);
    if (now) go(n);
  };

  return (
    <div className="mt-8 xl:mt-[38px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 xl:gap-[21px]">
          {tipe.map(([v, l]) => (
            <button key={v} type="button" onClick={() => set("tipe", v, true)} className={`h-[43px] rounded-xl px-5 text-[13px] transition-colors xl:px-6 xl:text-[14px] ${s.tipe === v ? "bg-[#343434] font-medium text-white" : "bg-[#F7F7F7] text-[#7A7A7A] hover:bg-[#EFEFEF]"}`}>{l}</button>
          ))}
        </div>
        <label className="flex items-center gap-3 text-[14px] text-[#8A8A93]">
          Urutkan
          <select value={s.urut} onChange={(e) => set("urut", e.target.value, true)} className="h-[43px] rounded-xl border border-[#F0F0F0] bg-white px-4 text-[14px] text-[#333] shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)]">
            {urut.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </label>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); go(); }} className="mt-5 grid gap-4 rounded-[24px] bg-white p-5 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.14)] sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto] lg:items-end lg:p-6">
        <label className="block"><span className="mb-2 block text-[13px] text-[#8A8A93]">Destinasi</span><input className={input} value={s.tujuan} onChange={(e) => set("tujuan", e.target.value)} placeholder="Mis. Raja Ampat" /></label>
        <label className="block"><span className="mb-2 block text-[13px] text-[#8A8A93]">Tanggal berangkat</span><input type="date" className={input} value={s.berangkat} onChange={(e) => set("berangkat", e.target.value)} /></label>
        <label className="block"><span className="mb-2 block text-[13px] text-[#8A8A93]">Durasi</span>
          <select className={input} value={s.durasi} onChange={(e) => set("durasi", e.target.value)}>{durasi.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label className="block"><span className="mb-2 block text-[13px] text-[#8A8A93]">Peserta</span>
          <select className={input} value={s.pax} onChange={(e) => set("pax", e.target.value)}><option value="">Semua</option>{[1, 2, 3, 4, 5, 6, 8, 10, 15].map((n) => <option key={n} value={n}>{n} orang</option>)}</select></label>
        <button type="submit" className="btn h-12 gap-2 rounded-xl px-6 text-[15px]"><Search size={18} strokeWidth={1.5} />Terapkan</button>
      </form>
    </div>
  );
}
