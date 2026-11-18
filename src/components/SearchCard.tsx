"use client";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronRight, Clock, MapPin, Minus, Plus, Search, Users } from "lucide-react";
import { destinations, formatDate } from "../data/packages";
import { waLink } from "../data/site";

type TabId = "semua" | "open" | "private" | "mobil";
const tabs: { id: TabId; label: string }[] = [
  { id: "semua", label: "Paket Wisata" },
  { id: "open", label: "Open Trip" },
  { id: "private", label: "Private Trip" },
  { id: "mobil", label: "Sewa Mobil" },
];
const paketDur = [["", "Semua durasi"], ["1", "1 hari"], ["2-3", "2–3 hari"], ["4-5", "4–5 hari"], ["6+", "6 hari lebih"]];
const mobilDur = [["1", "1 hari"], ["2", "2 hari"], ["3", "3 hari"], ["5", "5 hari"], ["7", "7 hari"]];

interface Recent { tab: TabId; tujuan: string; berangkat: string; durasi: string; adult: number; child: number }
const KEY = "jn:recent";
const loadRecent = (): Recent[] => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
};

const textCls = "w-full min-w-0 bg-transparent text-[14px] font-medium text-[#1B1B1B] outline-none placeholder:font-normal placeholder:text-[#A8A8B0] xl:text-[15px]";
const popCls = "absolute left-0 z-30 w-full min-w-[250px] rounded-xl border border-[#F0F0F0] bg-white p-2 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.18)] top-full mt-2 lg:bottom-full lg:top-auto lg:mb-2 lg:mt-0";

function Field({ label, icon, children, pop }: { label: string; icon: ReactNode; children: ReactNode; pop?: ReactNode }) {
  return (
    <div className="relative">
      <span className="mb-2 block text-[14px] leading-6 text-[#8A8A93] xl:text-[16px]">{label}</span>
      <div className="relative flex h-12 items-center gap-2.5 rounded-lg bg-[#F9F9FA] px-3.5">{icon}{children}</div>
      {pop}
    </div>
  );
}

function Stepper({ label, hint, value, min, max, onChange }: { label: string; hint: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const btn = "grid size-8 place-items-center rounded-full border border-[#E6E6E6] text-[#333] transition-colors enabled:hover:border-brand enabled:hover:text-brand disabled:opacity-30";
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <div><p className="text-[14px] font-medium">{label}</p><p className="text-[12px] text-[#8A8A93]">{hint}</p></div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`Kurangi ${label}`}><Minus size={14} /></button>
        <span className="w-5 text-center text-[14px] font-medium">{value}</span>
        <button type="button" className={btn} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label={`Tambah ${label}`}><Plus size={14} /></button>
      </div>
    </div>
  );
}

export default function SearchCard() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<TabId>("semua");
  const [tujuan, setTujuan] = useState("");
  const [berangkat, setBerangkat] = useState("");
  const [durasi, setDurasi] = useState("");
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [open, setOpen] = useState<null | "suggest" | "pax" | "recent">(null);
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState<Recent[]>([]);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setRecent(loadRecent());
    setMinDate(new Date().toISOString().slice(0, 10));
    const h = (e: MouseEvent) => { if (root.current && !root.current.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const mobil = tab === "mobil";
  const q = tujuan.trim().toLowerCase();
  const sugg = mobil ? [] : destinations.filter((d) => !q || `${d.name} ${d.province}`.toLowerCase().includes(q)).slice(0, 6);
  const pax = adult + child;

  const pick = (name: string) => { setTujuan(name); setOpen(null); setActive(-1); };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen("suggest"); setActive((i) => Math.min(i + 1, sugg.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && open === "suggest" && active >= 0 && sugg[active]) { e.preventDefault(); pick(sugg[active].name); }
    else if (e.key === "Escape") setOpen(null);
  };
  const changeTab = (t: TabId) => {
    if ((t === "mobil") !== mobil) setDurasi(t === "mobil" ? "1" : ""); // durasi dipertahankan antar tab paket
    setTab(t); setOpen(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const entry: Recent = { tab, tujuan: tujuan.trim(), berangkat, durasi, adult, child };
    const next = [entry, ...loadRecent().filter((r) => JSON.stringify(r) !== JSON.stringify(entry))].slice(0, 3);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    setRecent(next); setOpen(null);

    if (mobil) {
      const msg = `Halo Jelajah Nusa, saya mau sewa mobil.\n• Kota jemput: ${tujuan.trim() || "-"}\n• Tanggal mulai: ${berangkat ? formatDate(berangkat) : "-"}\n• Lama sewa: ${durasi || 1} hari\n• Penumpang: ${pax} orang`;
      window.open(waLink(msg), "_blank", "noopener");
      return;
    }
    const p = new URLSearchParams();
    if (tujuan.trim()) p.set("tujuan", tujuan.trim());
    if (berangkat) p.set("berangkat", berangkat);
    if (durasi) p.set("durasi", durasi);
    p.set("pax", String(pax));
    if (tab !== "semua") p.set("tipe", tab);
    router.push(`/paket?${p.toString()}`);
  };

  const applyRecent = (r: Recent) => {
    setTab(r.tab); setTujuan(r.tujuan); setBerangkat(r.berangkat); setDurasi(r.durasi); setAdult(r.adult); setChild(r.child); setOpen(null);
  };

  return (
    <div ref={root} className="relative z-20 -mt-14 mx-3 rounded-[24px] bg-white px-5 pb-6 pt-5 shadow-[0_24px_64px_-8px_rgba(0,0,0,0.12)] sm:mx-6 lg:absolute lg:inset-x-[6.25%] lg:-bottom-[88px] lg:mx-0 lg:mt-0 lg:px-10 lg:pb-8 lg:pt-7">
      <div className="relative flex items-center justify-between border-b-2 border-[#EDEDED]">
        <div className="flex gap-6 overflow-x-auto xl:gap-[40px]" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id} role="tab" aria-selected={tab === t.id} type="button" onClick={() => changeTab(t.id)}
              className={`relative whitespace-nowrap pb-[14px] text-[15px] transition-colors xl:pb-[18px] xl:text-[18px] ${tab === t.id ? "font-medium text-[#1B1B1B] after:absolute after:inset-x-0 after:-bottom-[2px] after:h-[3px] after:rounded-full after:bg-[#9D9D9D]" : "text-[#8A8A93] hover:text-[#1B1B1B]"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setOpen(open === "recent" ? null : "recent")} aria-expanded={open === "recent"} className="hidden items-center gap-1 pb-3 text-[14px] text-[#8A8A93] transition-colors hover:text-[#1B1B1B] md:flex">
          Pencarian terakhir <ChevronRight size={14} />
        </button>
        {open === "recent" && (
          <div className="absolute right-0 top-full z-30 mt-2 w-[320px] rounded-xl border border-[#F0F0F0] bg-white p-2 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.18)]">
            {recent.length === 0 && <p className="px-3 py-3 text-[13px] text-[#8A8A93]">Belum ada pencarian.</p>}
            {recent.map((r, i) => (
              <button key={i} type="button" onClick={() => applyRecent(r)} className="block w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#F9F9FA]">
                <p className="text-[14px] font-medium">{r.tujuan || "Semua destinasi"}</p>
                <p className="text-[12px] text-[#8A8A93]">{tabs.find((t) => t.id === r.tab)?.label} · {r.berangkat ? formatDate(r.berangkat) : "Tanggal fleksibel"} · {r.adult + r.child} orang</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:mt-[26px] lg:grid-cols-[repeat(4,minmax(0,1fr))_158px]">
        <Field
          label={mobil ? "Kota jemput" : "Destinasi"}
          icon={<MapPin size={18} className="shrink-0 fill-brand text-brand" strokeWidth={1.5} />}
          pop={open === "suggest" && sugg.length > 0 && (
            <ul role="listbox" className={popCls}>
              {sugg.map((d, i) => (
                <li key={d.name} role="option" aria-selected={i === active}>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => pick(d.name)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-[#F9F9FA] ${i === active ? "bg-[#F9F9FA]" : ""}`}>
                    <span><span className="block text-[14px] font-medium">{d.name}</span><span className="text-[12px] text-[#8A8A93]">{d.province}</span></span>
                    <span className="text-[12px] text-[#8A8A93]">{d.count} paket</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        >
          <input
            className={textCls} value={tujuan} onChange={(e) => { setTujuan(e.target.value); setOpen("suggest"); setActive(-1); }}
            onFocus={() => !mobil && setOpen("suggest")} onBlur={() => setOpen((o) => (o === "suggest" ? null : o))} onKeyDown={onKey} placeholder={mobil ? "Mis. Samarinda" : "Mau ke mana?"}
            aria-label={mobil ? "Kota jemput" : "Destinasi"} autoComplete="off" role="combobox" aria-expanded={open === "suggest"}
          />
        </Field>

        <Field label={mobil ? "Tanggal mulai" : "Tanggal berangkat"} icon={<CalendarDays size={18} className="shrink-0 text-brand" strokeWidth={2} />}>
          <span className={`${textCls} ${berangkat ? "" : "font-normal text-[#A8A8B0]"}`}>{berangkat ? formatDate(berangkat) : "Pilih tanggal"}</span>
          <input type="date" value={berangkat} min={minDate} onChange={(e) => setBerangkat(e.target.value)} onClick={(e) => e.currentTarget.showPicker?.()} aria-label="Tanggal" className="absolute inset-0 cursor-pointer opacity-0" />
        </Field>

        <Field label={mobil ? "Lama sewa" : "Durasi"} icon={<Clock size={18} className="shrink-0 text-brand" strokeWidth={2} />}>
          <select className={`${textCls} cursor-pointer appearance-none`} value={durasi} onChange={(e) => setDurasi(e.target.value)} aria-label="Durasi">
            {(mobil ? mobilDur : paketDur).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </Field>

        <Field
          label={mobil ? "Penumpang" : "Peserta"}
          icon={<Users size={18} className="shrink-0 text-brand" strokeWidth={2} />}
          pop={open === "pax" && (
            <div className={`${popCls} lg:min-w-[280px]`} role="dialog" aria-label="Jumlah peserta">
              <Stepper label="Dewasa" hint="12 tahun ke atas" value={adult} min={1} max={20} onChange={setAdult} />
              <Stepper label="Anak" hint="2–11 tahun" value={child} min={0} max={10} onChange={setChild} />
              <button type="button" onClick={() => setOpen(null)} className="btn mt-1 h-10 w-full rounded-lg text-[14px]">Selesai</button>
            </div>
          )}
        >
          <span className={textCls}>{adult} Dewasa{child ? `, ${child} Anak` : ""}</span>
          <button type="button" onClick={() => setOpen(open === "pax" ? null : "pax")} aria-expanded={open === "pax"} aria-label="Atur jumlah peserta" className="absolute inset-0 rounded-lg" />
        </Field>

        <button type="submit" className="btn-scarlet h-12 gap-2 self-end rounded-xl text-[15px] xl:text-[16px]">
          <Search size={20} strokeWidth={1.5} />{mobil ? "Tanya WA" : "Cari"}
        </button>
      </form>
    </div>
  );
}
