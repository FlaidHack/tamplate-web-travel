import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap-sec flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-display text-[64px] font-semibold text-brand">404</p>
      <h1 className="h-display mt-2 text-[28px]">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-[15px] text-[#7A7A7A]">Paket atau halaman yang kamu cari mungkin sudah dipindah.</p>
      <Link href="/paket" className="btn mt-8 h-12 rounded-xl px-6 text-[15px]">Lihat semua paket</Link>
    </main>
  );
}
