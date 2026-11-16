import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, Star, Users, X } from "lucide-react";
import BookingPanel from "../../../components/BookingPanel";
import PackageCard from "../../../components/PackageCard";
import { Photo, Pin } from "../../../components/ui";
import { EXCLUDES, INCLUDES, durationLabel, getPackage, packages, typeLabel } from "../../../data/packages";

export const generateStaticParams = () => packages.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPackage((await params).slug);
  return { title: p ? `${p.name} — Jelajah Nusa` : "Paket tidak ditemukan", description: p?.desc };
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPackage((await params).slug);
  if (!p) notFound();
  const related = packages
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => b.tags.filter((t) => p.tags.includes(t)).length - a.tags.filter((t) => p.tags.includes(t)).length)
    .slice(0, 3);

  return (
    <main className="wrap-sec pt-[104px] md:pt-[128px]">
      <nav className="mb-6 text-[13px] text-[#8A8A93]" aria-label="Breadcrumb">
        <Link href="/paket" className="hover:text-brand">Paket</Link> / <span className="text-[#333]">{p.name}</span>
      </nav>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] sm:aspect-[2/1]"><Photo src={p.image} alt={p.name} /></div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <h1 className="h-display text-[30px] md:text-[40px] xl:text-[44px]">{p.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-[#555]">
            <Pin text={p.location} />
            <span className="flex items-center gap-2"><Clock size={16} className="text-brand" />{durationLabel(p.days)}</span>
            <span className="flex items-center gap-2"><Users size={16} className="text-brand" />{typeLabel(p.type)} · maks. {p.maxPax} orang</span>
            <span className="flex items-center gap-1.5"><Star size={15} className="fill-[#FFB800] text-[#FFB800]" />{String(p.rating).replace(".", ",")}</span>
          </div>
          <p className="mt-6 max-w-[640px] text-[16px] leading-[1.7] text-[#69686D]">{p.desc}</p>

          <h2 className="mt-12 font-display text-[24px] font-semibold">Highlight</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {p.highlights.map((h) => <li key={h} className="flex items-start gap-3 text-[15px]"><Check size={18} className="mt-0.5 shrink-0 text-brand" />{h}</li>)}
          </ul>

          <h2 className="mt-12 font-display text-[24px] font-semibold">Itinerary</h2>
          <ol className="mt-5 space-y-6 border-l-2 border-[#EDEDED] pl-6">
            {p.itinerary.map((it, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[39px] top-0 grid size-8 place-items-center rounded-full bg-brand text-[12px] font-semibold text-white">H{i + 1}</span>
                <p className="text-[14px] font-medium text-[#333]">Hari {i + 1}</p>
                <p className="mt-1 text-[15px] leading-[1.6] text-[#69686D]">{it}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="font-display text-[22px] font-semibold">Termasuk</h2>
              <ul className="mt-4 space-y-3">{INCLUDES.map((x) => <li key={x} className="flex items-start gap-3 text-[14px]"><Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />{x}</li>)}</ul>
            </div>
            <div>
              <h2 className="font-display text-[22px] font-semibold">Tidak termasuk</h2>
              <ul className="mt-4 space-y-3">{EXCLUDES.map((x) => <li key={x} className="flex items-start gap-3 text-[14px] text-[#69686D]"><X size={16} className="mt-0.5 shrink-0 text-[#B0B0B5]" />{x}</li>)}</ul>
            </div>
          </div>
        </div>
        <BookingPanel p={p} className="h-fit lg:sticky lg:top-[112px]" />
      </div>

      <section className="mt-24 lg:mt-[120px]">
        <h2 className="h-display text-[28px] md:text-[36px]">Paket lainnya</h2>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[6%]">{related.map((r) => <PackageCard key={r.slug} p={r} />)}</div>
      </section>
    </main>
  );
}
