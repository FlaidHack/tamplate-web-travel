# Jelajah Nusa

Web jasa travel nusantara — Next.js 15 (App Router) + TypeScript + Tailwind 3. Font: Poppins + DM Sans via @fontsource.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Yang sudah fungsional
- **Search card hero**: tab Paket Wisata / Open Trip / Private Trip / Sewa Mobil, autocomplete destinasi, tanggal, durasi, stepper peserta, "Pencarian terakhir" (localStorage). Cari → `/paket?tujuan=…&berangkat=…&durasi=…&pax=…&tipe=…`
- **/paket**: filter + urutan, state di URL (bisa di-share), empty state.
- **/paket/[slug]**: detail, itinerary, panel pemesanan (jadwal / tanggal, peserta, harga live, validasi) → pesan WhatsApp terisi otomatis.
- Sewa Mobil → WhatsApp. Newsletter → validasi + simpan di localStorage. Navbar fixed dengan scrollspy.

## Struktur data
Semua paket ada di `src/data/packages.ts` (bentuk `TourPackage`). Untuk pindah ke database, ganti `packages`, `getPackage`, dan `searchPackages` dengan query Prisma — komponen tidak perlu diubah.
Konten lain (testimoni, destinasi populer, nomor WhatsApp) ada di `src/data/site.ts`. Foto di `public/images/`.

## Belum ada
Login/daftar, pembayaran, database, dan pengiriman newsletter ke server. Semua nama paket, harga, jadwal, dan nomor WhatsApp masih dummy.
