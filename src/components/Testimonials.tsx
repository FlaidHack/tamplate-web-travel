import { Star } from "lucide-react";
import { testimonials } from "../data/site";
import { CenterHead } from "./ui";

export default function Testimonials() {
  return (
    <section className="wrap-sec mt-24 lg:mt-[140px]">
      <CenterHead title="Kata mereka yang sudah berangkat" sub="Cerita nyata dari para traveler Jelajah Nusa." size="text-[28px] md:text-[36px] xl:text-[44px]" subSize="text-[15px] md:text-[18px] xl:text-[20px]" />
      <div className="mt-10 grid gap-6 md:grid-cols-3 xl:mt-[50px] xl:gap-[36px]">
        {testimonials.map((t) => (
          <figure key={t.name} className="rounded-[24px] bg-white p-7 shadow-[0_16px_48px_-16px_rgba(0,0,0,0.14)]">
            <div className="flex gap-1">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={16} className="fill-[#FFB800] text-[#FFB800]" />)}</div>
            <blockquote className="mt-4 text-[15px] leading-[1.6] text-[#5F5F66]">{t.text}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-brand to-[#7BB7D8] text-[14px] font-semibold text-white">{t.name.split(" ").map((w) => w[0]).join("")}</span>
              <span><span className="block text-[14px] font-semibold">{t.name}</span><span className="text-[13px] text-[#7A7A7A]">{t.city}</span></span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
