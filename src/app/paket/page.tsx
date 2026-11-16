import type { Metadata } from "next";
import Link from "next/link";
import PackageCard from "../../components/PackageCard";
import PaketFilters from "../../components/PaketFilters";
import { durationLabel, formatDate, nextDeparture, parseSearch, searchPackages, typeLabel } from "../../data/packages";

export const metadata: Metadata = { title: "Paket Wisata — Jelajah Nusa" };

export default async function PaketPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = parseSearch(await searchParams);
  const results = searchPackages(q);
  const chips = [
    q.tujuan && `Tujuan: ${q.tujuan}`,
    q.berangkat && `Berangkat ≥ ${formatDate(q.berangkat)}`,
    q.durasi && `Durasi: ${q.durasi.replace("-", "–")} hari`,
    q.pax && `${q.pax} peserta`,
    q.tipe && typeLabel(q.tipe),
  ].filter(Boolean) as string[];

  return (
    <main className="wrap-sec pb-4 pt-[104px] md:pt-[128px]">
      <h1 className="h-display text-[34px] md:text-[44px] xl:text-[54px]">Paket Wisata</h1>
      <p className="mt-1 text-[17px] text-[#69686D] xl:text-[23px]">{results.length} paket ditemukan</p>
      <PaketFilters key={JSON.stringify(q)} initial={q} />
      {chips.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px]">
          {chips.map((c) => <span key={c} className="rounded-lg bg-[#F7F7F7] px-3 py-1.5 text-[#555]">{c}</span>)}
          <Link href="/paket" className="px-2 text-brand hover:underline">Reset</Link>
        </div>
      )}
      {results.length > 0 ? (
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[6%] lg:gap-y-[56px]">
          {results.map((p) => {
            const d = p.type === "open" ? nextDeparture(p, q.berangkat) : undefined;
            return <PackageCard key={p.slug} p={p} note={d ? `Berangkat ${formatDate(d)}` : "Tanggal bebas"} />;
          })}
        </div>
      ) : (
        <div className="mt-10 rounded-[24px] bg-[#F9F9FA] px-6 py-16 text-center">
          <p className="font-display text-[24px] font-semibold">Belum ada paket yang cocok</p>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-[#7A7A7A]">Coba ubah tanggal, durasi, atau kata kunci tujuan. Untuk open trip, jadwal keberangkatan terdekat tersedia mulai Desember 2026.</p>
          <Link href="/paket" className="btn mt-6 h-11 rounded-xl px-6 text-[14px]">Lihat semua paket</Link>
        </div>
      )}
      <p className="mt-10 text-center text-[12px] text-[#A0A0A8]">Durasi dalam format hari/malam, misalnya {durationLabel(3)} = 3 hari 2 malam.</p>
    </main>
  );
}
