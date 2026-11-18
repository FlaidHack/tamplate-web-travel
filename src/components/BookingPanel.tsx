"use client";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { formatDate, rupiahFull, todayISO, typeLabel, type TourPackage } from "../data/packages";
import { waLink } from "../data/site";

const CHILD_RATE = 0.75;

export default function BookingPanel({ p, className = "" }: { p: TourPackage; className?: string }) {
  const open = p.type === "open";
  const [date, setDate] = useState(open ? p.departures[0] ?? "" : "");
  const [adult, setAdult] = useState(Math.max(2, p.minPax));
  const [child, setChild] = useState(0);
  const [nama, setNama] = useState("");
  const [hp, setHp] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [minDate, setMinDate] = useState("");
  useEffect(() => setMinDate(todayISO()), []);

  const total = adult * p.price + child * p.price * CHILD_RATE;
  const pax = adult + child;
  const upcoming = p.departures.filter((d) => d >= (minDate || "0"));

  const send = () => {
    const e: Record<string, string> = {};
    if (!date) e.date = "Pilih tanggal keberangkatan.";
    if (pax > p.maxPax) e.pax = `Maksimal ${p.maxPax} peserta.`;
    if (nama.trim().length < 2) e.nama = "Isi nama lengkap.";
    if (!/^(\+?62|0)8\d{7,12}$/.test(hp.replace(/[\s-]/g, ""))) e.hp = "Nomor WhatsApp tidak valid (mis. 0812xxxxxxx).";
    setErr(e);
    if (Object.keys(e).length) return;
    const msg = `Halo Jelajah Nusa, saya mau pesan paket:\n• Paket: ${p.name} (${typeLabel(p.type)})\n• Tanggal: ${formatDate(date)}\n• Peserta: ${adult} dewasa${child ? `, ${child} anak` : ""}\n• Estimasi: ${rupiahFull(total)}\n\nNama: ${nama.trim()}\nWhatsApp: ${hp.trim()}`;
    window.open(waLink(msg), "_blank", "noopener");
  };

  const btn = "grid size-8 place-items-center rounded-full border border-[#E6E6E6] transition-colors enabled:hover:border-brand enabled:hover:text-brand disabled:opacity-30";
  const field = "h-12 w-full rounded-lg bg-[#F9F9FA] px-3.5 text-[14px] outline-none placeholder:text-[#A8A8B0] focus:ring-2 focus:ring-brand/30";

  return (
    <aside className={`rounded-[24px] bg-white p-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.18)] ring-1 ring-[#F0F0F0] ${className}`}>
      <p className="text-[14px] text-[#8A8A93]">Mulai dari</p>
      <p className="font-display text-[32px] font-semibold leading-tight">{rupiahFull(p.price)}<span className="text-[14px] font-normal text-[#8A8A93]"> /orang</span></p>

      <div className="mt-6">
        <p className="mb-2 text-[13px] text-[#8A8A93]">{open ? "Pilih jadwal keberangkatan" : "Tanggal berangkat"}</p>
        {open ? (
          <div className="flex flex-wrap gap-2">
            {(upcoming.length ? upcoming : p.departures).map((d) => (
              <button key={d} type="button" onClick={() => setDate(d)} aria-pressed={date === d} className={`h-10 rounded-lg px-3 text-[13px] transition-colors ${date === d ? "bg-[#343434] font-medium text-white" : "bg-[#F7F7F7] text-[#555] hover:bg-[#EFEFEF]"}`}>{formatDate(d)}</button>
            ))}
          </div>
        ) : (
          <input type="date" className={field} value={date} min={minDate} onChange={(e) => setDate(e.target.value)} aria-label="Tanggal berangkat" />
        )}
        {err.date && <p className="mt-1.5 text-[12px] text-scarlet">{err.date}</p>}
      </div>

      <div className="mt-5 divide-y divide-[#F2F2F2]">
        {[
          { l: "Dewasa", h: "12 tahun ke atas", v: adult, set: setAdult, min: 1 },
          { l: "Anak", h: `2–11 tahun · ${Math.round(CHILD_RATE * 100)}% harga`, v: child, set: setChild, min: 0 },
        ].map((r) => (
          <div key={r.l} className="flex items-center justify-between py-3">
            <div><p className="text-[14px] font-medium">{r.l}</p><p className="text-[12px] text-[#8A8A93]">{r.h}</p></div>
            <div className="flex items-center gap-3">
              <button type="button" className={btn} disabled={r.v <= r.min} onClick={() => r.set(r.v - 1)} aria-label={`Kurangi ${r.l}`}><Minus size={14} /></button>
              <span className="w-5 text-center text-[14px] font-medium">{r.v}</span>
              <button type="button" className={btn} disabled={pax >= p.maxPax} onClick={() => r.set(r.v + 1)} aria-label={`Tambah ${r.l}`}><Plus size={14} /></button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[12px] text-[#8A8A93]">Maksimal {p.maxPax} peserta{p.minPax > 1 ? `, minimal ${p.minPax}` : ""}.</p>
      {err.pax && <p className="mt-1 text-[12px] text-scarlet">{err.pax}</p>}

      <div className="mt-5 space-y-3">
        <div><input className={field} placeholder="Nama lengkap" value={nama} onChange={(e) => setNama(e.target.value)} aria-label="Nama lengkap" />{err.nama && <p className="mt-1 text-[12px] text-scarlet">{err.nama}</p>}</div>
        <div><input className={field} placeholder="Nomor WhatsApp" inputMode="tel" value={hp} onChange={(e) => setHp(e.target.value)} aria-label="Nomor WhatsApp" />{err.hp && <p className="mt-1 text-[12px] text-scarlet">{err.hp}</p>}</div>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-[#F2F2F2] pt-4">
        <span className="text-[14px] text-[#8A8A93]">Estimasi total</span>
        <span className="font-display text-[24px] font-semibold">{rupiahFull(total)}</span>
      </div>
      <button type="button" onClick={send} className="btn-scarlet mt-4 h-12 w-full rounded-xl text-[15px]">Pesan via WhatsApp</button>
      <p className="mt-3 text-center text-[12px] text-[#8A8A93]">Belum ada pembayaran. Tim kami konfirmasi lewat WhatsApp.</p>
    </aside>
  );
}
