const stats = [
  ["500+", "Destinasi di seluruh nusantara"],
  ["12 rb+", "Traveler sudah berangkat"],
  ["34", "Provinsi terjangkau"],
  ["4,9", "Rating rata-rata"],
];

export default function Stats() {
  return (
    <section className="wrap-sec mt-24 lg:mt-[120px]">
      <dl className="grid grid-cols-2 gap-y-10 border-y border-[#EFEFEF] py-10 md:grid-cols-4 xl:py-[52px]">
        {stats.map(([n, l]) => (
          <div key={l} className="text-center">
            <dt className="font-display text-[36px] font-semibold leading-none text-brand xl:text-[48px]">{n}</dt>
            <dd className="mt-3 text-[14px] text-[#7A7A7A] xl:text-[16px]">{l}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
