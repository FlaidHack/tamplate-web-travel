"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Beranda", href: "/", id: "beranda" },
  { label: "Destinasi", href: "/#destinasi", id: "destinasi" },
  { label: "Paket", href: "/paket", id: "paket" },
  { label: "Aktivitas", href: "/#petualangan", id: "petualangan" },
];
const SPY = ["beranda", "destinasi", "jelajah", "petualangan"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [spy, setSpy] = useState("beranda");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    if (pathname !== "/") return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setSpy(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    SPY.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [pathname]);

  const active = pathname.startsWith("/paket") ? "paket" : spy === "jelajah" ? "paket" : spy;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${scrolled || open ? "shadow-[0_1px_0_#EEE,0_10px_28px_-14px_rgba(0,0,0,.12)]" : ""}`}>
      <div className="wrap grid h-[72px] grid-cols-[1fr_auto] items-center md:h-[88px] md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="text-[22px] font-bold leading-none text-brand">Jelajah Nusa</Link>
        <nav className="hidden gap-9 text-[16px] md:flex lg:gap-12 xl:gap-[72px] xl:text-[18px]" aria-label="Utama">
          {links.map((l) => (
            <Link key={l.id} href={l.href} className={active === l.id ? "font-medium text-[#1B1B1B]" : "text-[#A0A0A0] transition-colors hover:text-[#1B1B1B]"}>{l.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-10 justify-self-end md:flex">
          <a href="#" className="text-[14px] text-[#A8A8A8] transition-colors hover:text-[#1B1B1B]">Masuk</a>
          <a href="#" className="btn h-[38px] px-[17px] text-[14px]">Daftar</a>
        </div>
        <button className="justify-self-end md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[#EEE] bg-white md:hidden">
          <div className="wrap flex flex-col gap-5 py-6 text-[16px]">
            {links.map((l) => <Link key={l.id} href={l.href} className={active === l.id ? "font-medium" : "text-[#7A7A7A]"}>{l.label}</Link>)}
            <a href="#" className="btn h-[42px] w-fit px-6 text-[14px]">Daftar</a>
          </div>
        </div>
      )}
    </header>
  );
}
