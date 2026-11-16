import Link from "next/link";
import { popular } from "../data/site";
import { Head, Photo, Pin } from "./ui";

export default function Popular() {
  return (
    <section id="destinasi" className="wrap-sec mt-20 scroll-mt-24 lg:mt-[126px]">
      <Head
        title="Destinasi Populer"
        sub="Nikmati surga di tanah air"
        aside="Banyak tempat yang terkenal, indah, bersih, dan memberi kesan mendalam bagi pengunjung sehingga membuat mereka ingin kembali."
      />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:mt-[50px] lg:grid-cols-4 lg:gap-x-[60px]">
        {popular.map((p) => (
          <Link key={p.name} href={`/paket?tujuan=${encodeURIComponent(p.q)}`} className="group block">
            <div className="relative aspect-square overflow-hidden rounded-[24px]">
              <Photo src={p.image} alt={p.name} className="transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute right-3 top-3 flex h-[27px] items-center rounded-lg bg-white px-3 text-[11px] font-semibold xl:right-4 xl:top-4 xl:text-[12px]">{p.discount}% OFF</span>
            </div>
            <h3 className="mt-4 text-[17px] font-semibold leading-[30px] xl:mt-[21px] xl:text-[20px]">{p.name}</h3>
            <div className="mt-1.5"><Pin text={p.location} /></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
