import { Star } from "lucide-react";
import { IMG, waLink } from "../data/site";
import { CenterHead, Photo } from "./ui";

const points = [
  { n: "01", t: "Trip yang sesuai kebebasanmu", d: "Atur sendiri itinerary, durasi, dan budget. Dari open trip sampai private tour, semuanya bisa disesuaikan.", c: "bg-[#7BB7D8]" },
  { n: "02", t: "Kembali ke alam lewat perjalanan", d: "Dari puncak gunung sampai dasar laut, nusantara adalah taman bermain yang luas untuk dijelajahi.", c: "bg-[#8394E0]" },
  { n: "03", t: "Hidupkan lagi selera petualanganmu", d: "Cicipi kuliner khas tiap daerah, dari coto Makassar sampai gudeg Jogja, di setiap perhentian.", c: "bg-[#57BF7B]" },
];

function Review({ name, pos }: { name: string; pos: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("");
  return (
    <div className={`absolute z-10 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-4 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.12)] backdrop-blur ${pos}`}>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-[#7BB7D8] text-[12px] font-semibold text-white xl:size-11 xl:text-[14px]">{initials}</span>
      <div>
        <p className="text-[12px] font-semibold leading-tight xl:text-[14px]">{name}</p>
        <p className="mt-1 flex items-center gap-1 text-[12px] text-[#7A7A7A] xl:text-[13px]"><Star size={12} className="fill-[#FFB800] text-[#FFB800]" />4,9</p>
      </div>
    </div>
  );
}

export default function Feature() {
  return (
    <section className="wrap-sec mt-24 lg:mt-[150px]">
      <CenterHead title="Berwisata untuk kenangan manis" sub="Perjalanan yang pas untuk gaya hidup fleksibelmu" size="text-[28px] md:text-[36px] xl:text-[44px]" subSize="text-[16px] md:text-[20px] xl:text-[22.5px]" />
      <div className="mt-12 grid items-center gap-14 lg:grid-cols-[1fr_432px] xl:mt-[66px]">
        <div>
          <div className="space-y-8 xl:space-y-[38px]">
            {points.map((p) => (
              <div key={p.n}>
                <span className={`inline-flex h-[26px] w-10 items-center justify-center rounded-md text-[13px] text-white ${p.c}`}>{p.n}</span>
                <h3 className="mt-4 text-[18px] font-semibold leading-[1.5] xl:mt-[21px] xl:text-[23px]">{p.t}</h3>
                <p className="mt-2 max-w-[362px] text-[14px] leading-[1.5] text-[#86858B] xl:mt-[15px] xl:text-[15px]">{p.d}</p>
              </div>
            ))}
          </div>
          <a href={waLink()} className="btn mt-10 h-12 rounded-xl px-[26px] text-[15px] xl:mt-[61px]">Mulai jelajah</a>
        </div>
        <div className="relative mx-auto w-full max-w-[340px] aspect-[432/668] lg:mx-0 lg:mr-[9.75%] lg:w-[432px] lg:max-w-none lg:justify-self-end">
          <div className="relative size-full overflow-hidden rounded-[30px]">
            <Photo src={IMG.feature} alt="Gunung Bromo saat fajar" className="object-[48%_50%]" />
          </div>
          <Review name="Aulia Rahma" pos="left-3 top-[14%] lg:-left-[105px] lg:top-[93px]" />
          <Review name="Rizky Pratama" pos="right-3 top-[41%] lg:-right-[77px] lg:top-[275px]" />
          <Review name="Dewi Lestari" pos="bottom-[14%] left-3 lg:-left-[95px] lg:bottom-auto lg:top-[495px]" />
        </div>
      </div>
    </section>
  );
}
