import Link from "next/link";
import Newsletter from "./Newsletter";

const cols = [
  ["Tentang", ["Tentang kami", "Fitur", "Berita", "Paket"]],
  ["Perusahaan", ["Kenapa Jelajah Nusa", "Jadi mitra", "FAQ", "Blog"]],
  ["Bantuan", ["Akun", "Pusat bantuan", "Masukan", "Hubungi kami"]],
] as const;

const social = [
  { n: "Facebook", d: "M14 8h2.5V4.5H14C11.8 4.5 10.5 5.9 10.5 8v2H8v3.5h2.5V20H14v-6.5h2.5L17 10h-3V8.5c0-.3.2-.5.5-.5z" },
  { n: "Instagram", d: "M7.5 4h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9A3.5 3.5 0 0 1 7.5 4zm4.5 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.7-1.4a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z" },
  { n: "YouTube", d: "M20.6 8.2a2.3 2.3 0 0 0-1.6-1.6C17.6 6.2 12 6.2 12 6.2s-5.6 0-7 .4A2.3 2.3 0 0 0 3.4 8.2C3 9.6 3 12 3 12s0 2.4.4 3.8a2.3 2.3 0 0 0 1.6 1.6c1.4.4 7 .4 7 .4s5.6 0 7-.4a2.3 2.3 0 0 0 1.6-1.6c.4-1.4.4-3.8.4-3.8s0-2.4-.4-3.8zM10 15V9l5 3z" },
];

const head = "font-display text-[18px] font-medium leading-[27px] text-[#0A0A0A]";

export default function Footer() {
  return (
    <footer id="kontak" className="wrap-sec mt-24 pb-[60px] lg:mt-[126px]">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[371fr_157fr_201fr_200fr_271fr] lg:gap-0">
        <div>
          <a href="#beranda" className="text-[22px] font-bold leading-8 text-brand">Jelajah Nusa</a>
          <p className="mt-5 max-w-[250px] text-[14px] leading-5 text-[#333]">Jl. Jenderal Sudirman No. 12, Jakarta Pusat 10270, Indonesia</p>
          <div className="mt-[31px] flex gap-[22px]">
            {social.map((s) => (
              <a key={s.n} href="#" aria-label={s.n} className="grid size-[22px] place-items-center rounded-[6px] bg-brand text-white transition-colors hover:bg-brand-dark">
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d={s.d} /></svg>
              </a>
            ))}
          </div>
        </div>
        {cols.map(([title, items]) => (
          <div key={title}>
            <h4 className={head}>{title}</h4>
            <ul className="mt-[15px] space-y-[15px] text-[14px] leading-[23.6px] text-[#4A4A4A]">
              {items.map((i) => <li key={i}><Link href={i === "Paket" ? "/paket" : "#"} className="transition-colors hover:text-brand">{i}</Link></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h4 className={head}>Newsletter</h4>
          <p className="mt-4 max-w-[240px] text-[14px] leading-5 text-[#333]">Berlangganan newsletter dan dapatkan penawaran menarik.</p>
          <Newsletter />
        </div>
      </div>
    </footer>
  );
}
