// ===== Data paket wisata (lokal). Nanti tinggal diganti query Prisma dengan bentuk data yang sama. =====
// Semua nama paket, harga, dan jadwal di sini masih DUMMY.

export type PackageType = "open" | "private";

export interface TourPackage {
  slug: string;
  name: string;
  destination: string; // nama destinasi utama (dipakai autocomplete)
  province: string;
  location: string; // teks singkat di kartu
  image: string;
  type: PackageType;
  days: number;
  price: number; // per orang dewasa
  rating: number;
  tags: string[]; // cocok dengan chip kategori di home
  desc: string;
  highlights: string[];
  itinerary: string[]; // satu item per hari
  departures: string[]; // jadwal open trip (YYYY-MM-DD); private trip bebas pilih tanggal
  minPax: number;
  maxPax: number;
  featured?: boolean;
}

export const INCLUDES = [
  "Penginapan sesuai itinerary",
  "Transportasi selama trip",
  "Tiket masuk objek wisata",
  "Pemandu lokal berpengalaman",
  "Makan sesuai itinerary",
  "Dokumentasi foto",
];
export const EXCLUDES = ["Tiket transportasi ke kota keberangkatan", "Pengeluaran pribadi", "Tip untuk pemandu & driver (opsional)"];

export const packages: TourPackage[] = [
  {
    slug: "bali-ulun-danu-ubud", name: "Bali Ulun Danu & Ubud", destination: "Bali", province: "Bali", location: "Tabanan, Bali",
    image: "/images/ulun-danu-beratan.jpg", type: "open", days: 3, price: 1850000, rating: 4.9, tags: ["Danau", "Budaya"], featured: true,
    desc: "Menyusuri pura di atas danau, sawah bertingkat, dan seni budaya Ubud dalam tiga hari yang santai.",
    highlights: ["Pura Ulun Danu Beratan", "Sawah bertingkat Tegallalang", "Tirta Empul & pasar seni Ubud"],
    itinerary: [
      "Jemput di bandara, Pura Ulun Danu Beratan, makan siang di Bedugul, check-in di Ubud.",
      "Tegallalang, Tirta Empul, pasar seni Ubud, makan malam bersama.",
      "Sarapan, belanja oleh-oleh, antar ke bandara.",
    ],
    departures: ["2026-12-05", "2026-12-19", "2027-01-09", "2027-01-23", "2027-02-13"], minPax: 1, maxPax: 20,
  },
  {
    slug: "kei-island-escape", name: "Kei Island Escape", destination: "Kepulauan Kei", province: "Maluku", location: "Maluku Tenggara",
    image: "/images/teluk-kei.jpg", type: "private", days: 4, price: 4250000, rating: 4.8, tags: ["Pulau", "Pantai"], featured: true,
    desc: "Pasir putih terhalus di timur Indonesia, gua alami, dan island hopping dengan kapal pribadi.",
    highlights: ["Pantai Ngurbloat & Pasir Panjang", "Island hopping Pulau Bair", "Goa Hawang"],
    itinerary: [
      "Tiba di Langgur, check-in, sunset di Pantai Ngurbloat.",
      "Island hopping Pulau Bair dan Pasir Panjang.",
      "Goa Hawang, Pantai Ohoidertawun, kuliner lokal.",
      "Waktu bebas dan antar ke bandara.",
    ],
    departures: [], minPax: 2, maxPax: 8,
  },
  {
    slug: "wakatobi-diving", name: "Wakatobi Diving Escape", destination: "Wakatobi", province: "Sulawesi Tenggara", location: "Sulawesi Tenggara",
    image: "/images/terumbu-wakatobi.jpg", type: "private", days: 5, price: 5900000, rating: 4.9, tags: ["Pulau", "Selam", "Taman Nasional"], featured: true,
    desc: "Lima hari menyelam dan snorkeling di taman nasional laut dengan terumbu karang terbaik dunia.",
    highlights: ["Dive & snorkeling Karang Kaledupa", "Kampung Bajo Mola", "Sunset di Tomia"],
    itinerary: [
      "Tiba di Wangi-Wangi, transfer ke resort.",
      "Snorkeling di Pulau Kapota.",
      "Diving di Karang Kaledupa.",
      "Tomia: Kampung Bajo dan sunset.",
      "Check-out dan transfer ke bandara.",
    ],
    departures: [], minPax: 2, maxPax: 6,
  },
  {
    slug: "gili-meno-snorkeling", name: "Gili Meno Snorkeling", destination: "Gili Meno", province: "Nusa Tenggara Barat", location: "Lombok Utara, NTB",
    image: "/images/pantai-tropis.jpg", type: "open", days: 3, price: 1650000, rating: 4.9, tags: ["Pulau", "Pantai", "Selam"], featured: true,
    desc: "Pulau kecil tanpa kendaraan bermotor, air jernih, dan penyu yang gampang ditemui saat snorkeling.",
    highlights: ["Snorkeling patung bawah laut", "Berenang bersama penyu", "Sunset di pantai barat"],
    itinerary: [
      "Jemput di Pelabuhan Bangsal, menyeberang ke Gili Meno, check-in.",
      "Snorkeling patung bawah laut dan area penyu.",
      "Sunrise, sarapan, kembali ke Lombok.",
    ],
    departures: ["2026-12-12", "2026-12-26", "2027-01-16", "2027-02-06"], minPax: 1, maxPax: 16,
  },
  {
    slug: "mandalika-beach-escape", name: "Mandalika Beach Escape", destination: "Mandalika", province: "Nusa Tenggara Barat", location: "Lombok Tengah, NTB",
    image: "/images/resort-pantai.jpg", type: "open", days: 2, price: 1250000, rating: 4.7, tags: ["Pantai"], featured: true,
    desc: "Akhir pekan di pantai-pantai selatan Lombok: bukit savana, desa adat, dan sunset terbaik.",
    highlights: ["Bukit Merese", "Pantai Tanjung Aan", "Desa adat Sade"],
    itinerary: [
      "Pantai Kuta Mandalika, Bukit Merese, sunset di Tanjung Aan.",
      "Desa Sade, Pantai Selong Belanak, antar ke bandara.",
    ],
    departures: ["2026-12-06", "2026-12-20", "2027-01-10", "2027-01-31"], minPax: 1, maxPax: 20,
  },
  {
    slug: "bromo-sunrise-tour", name: "Bromo Sunrise Tour", destination: "Bromo", province: "Jawa Timur", location: "Probolinggo, Jatim",
    image: "/images/bromo.jpg", type: "open", days: 2, price: 950000, rating: 4.9, tags: ["Gunung", "Taman Nasional"], featured: true,
    desc: "Jeep dini hari ke Penanjakan untuk sunrise, lalu berjalan di lautan pasir dan kawah Bromo.",
    highlights: ["Sunrise Penanjakan", "Kawah Bromo", "Pasir Berbisik & Bukit Teletubbies"],
    itinerary: [
      "Jemput di Malang, menuju Cemoro Lawang, istirahat sebelum berangkat dini hari.",
      "Jeep: Penanjakan, Kawah Bromo, Pasir Berbisik, lalu kembali ke Malang.",
    ],
    departures: ["2026-12-04", "2026-12-11", "2026-12-18", "2027-01-08", "2027-01-15"], minPax: 1, maxPax: 24,
  },
  {
    slug: "raja-ampat-island-hopping", name: "Raja Ampat Island Hopping", destination: "Raja Ampat", province: "Papua Barat Daya", location: "Papua Barat Daya",
    image: "/images/raja-ampat.jpg", type: "private", days: 5, price: 8900000, rating: 4.9, tags: ["Pulau", "Selam", "Taman Nasional"],
    desc: "Gugusan pulau karst, laguna toska, dan terumbu karang paling beragam di bumi, dengan homestay lokal.",
    highlights: ["Puncak Piaynemo", "Snorkeling manta di Arborek", "Telaga Bintang & pasir timbul"],
    itinerary: [
      "Tiba di Sorong, kapal ke Waisai, homestay di Pulau Gam.",
      "Puncak Piaynemo dan laguna sekitar.",
      "Arborek: snorkeling manta dan kampung wisata.",
      "Telaga Bintang dan pasir timbul.",
      "Kembali ke Sorong dan antar ke bandara.",
    ],
    departures: [], minPax: 2, maxPax: 8,
  },
  {
    slug: "derawan-telaga-biru", name: "Derawan & Labuan Cermin", destination: "Derawan", province: "Kalimantan Timur", location: "Berau, Kaltim",
    image: "/images/telaga-derawan.jpg", type: "open", days: 4, price: 3450000, rating: 4.8, tags: ["Pulau", "Selam", "Danau"],
    desc: "Berenang dengan penyu, ubur-ubur tanpa sengat di Kakaban, dan danau dua rasa Labuan Cermin.",
    highlights: ["Snorkeling penyu di Derawan", "Ubur-ubur Pulau Kakaban", "Danau Labuan Cermin"],
    itinerary: [
      "Tiba di Berau, ke Tanjung Batu, speedboat ke Derawan.",
      "Snorkeling penyu dan Pulau Kakaban.",
      "Maratua dan Danau Labuan Cermin.",
      "Kembali ke Berau dan antar ke bandara.",
    ],
    departures: ["2026-12-10", "2027-01-14", "2027-02-11"], minPax: 2, maxPax: 12,
  },
  {
    slug: "borobudur-sunrise-jogja", name: "Borobudur Sunrise & Jogja", destination: "Borobudur", province: "Jawa Tengah", location: "Magelang, Jateng",
    image: "/images/borobudur.jpg", type: "open", days: 2, price: 1350000, rating: 4.9, tags: ["Budaya"],
    desc: "Sunrise dari bukit di atas kabut Borobudur, lalu menyusuri keraton dan Malioboro.",
    highlights: ["Sunrise Punthuk Setumbang", "Candi Borobudur & Prambanan", "Keraton, Taman Sari, Malioboro"],
    itinerary: [
      "Sunrise Punthuk Setumbang, Candi Borobudur, Mendut, lalu Prambanan.",
      "Keraton, Taman Sari, Malioboro, antar ke bandara atau stasiun.",
    ],
    departures: ["2026-12-05", "2026-12-12", "2026-12-26", "2027-01-09"], minPax: 1, maxPax: 20,
  },
  {
    slug: "tiu-kelep-waterfall-trek", name: "Tiu Kelep Waterfall Trek", destination: "Tiu Kelep", province: "Nusa Tenggara Barat", location: "Lombok Utara, NTB",
    image: "/images/air-terjun.jpg", type: "open", days: 1, price: 450000, rating: 4.7, tags: ["Taman Nasional"],
    desc: "Trekking singkat melewati hutan hujan menuju dua air terjun tertinggi di kaki Rinjani.",
    highlights: ["Air Terjun Sendang Gile", "Air Terjun Tiu Kelep", "Hutan hujan kaki Rinjani"],
    itinerary: ["Jemput di Senggigi, trekking Sendang Gile dan Tiu Kelep, makan siang, kembali."],
    departures: ["2026-12-07", "2026-12-14", "2026-12-21", "2027-01-04"], minPax: 1, maxPax: 15,
  },
];

export const destinations = Array.from(
  packages.reduce((m, p) => m.set(p.destination, { name: p.destination, province: p.province, count: (m.get(p.destination)?.count ?? 0) + 1 }), new Map<string, { name: string; province: string; count: number }>()).values()
);

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);

// ---------- helper tampilan ----------
export const typeLabel = (t: PackageType) => (t === "open" ? "Open Trip" : "Private Trip");
export const durationLabel = (d: number) => (d <= 1 ? "1 Hari" : `${d}H${d - 1}M`);
export const rupiahFull = (n: number) => "Rp" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
export const todayISO = () => new Date().toISOString().slice(0, 10);

// ---------- pencarian ----------
export interface SearchQuery {
  tujuan?: string;
  berangkat?: string;
  durasi?: string;
  pax?: number;
  tipe?: PackageType;
  urut?: string;
}

const DURASI = ["1", "2-3", "4-5", "6+"];
const URUT = ["populer", "termurah", "termahal", "durasi"];
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseSearch(sp: Record<string, string | string[] | undefined>): SearchQuery {
  const tujuan = one(sp.tujuan)?.trim().slice(0, 60) || undefined;
  const berangkat = /^\d{4}-\d{2}-\d{2}$/.test(one(sp.berangkat) ?? "") ? one(sp.berangkat) : undefined;
  const durasi = DURASI.includes(one(sp.durasi) ?? "") ? one(sp.durasi) : undefined;
  const paxN = parseInt(one(sp.pax) ?? "", 10);
  const tipe = one(sp.tipe) === "open" || one(sp.tipe) === "private" ? (one(sp.tipe) as PackageType) : undefined;
  const urut = URUT.includes(one(sp.urut) ?? "") ? one(sp.urut) : undefined;
  return { tujuan, berangkat, durasi, pax: paxN > 0 ? Math.min(paxN, 40) : undefined, tipe, urut };
}

const matchDuration = (d: number, f: string) =>
  f === "1" ? d === 1 : f === "2-3" ? d >= 2 && d <= 3 : f === "4-5" ? d >= 4 && d <= 5 : f === "6+" ? d >= 6 : true;

export const nextDeparture = (p: TourPackage, from?: string) => {
  const f = from ?? todayISO();
  return p.departures.find((d) => d >= f);
};

export function searchPackages(q: SearchQuery): TourPackage[] {
  const needle = q.tujuan?.toLowerCase();
  const list = packages.filter((p) => {
    if (q.tipe && p.type !== q.tipe) return false;
    if (needle && ![p.name, p.destination, p.location, p.province, ...p.tags].join(" ").toLowerCase().includes(needle)) return false;
    if (q.durasi && !matchDuration(p.days, q.durasi)) return false;
    if (q.pax && q.pax > p.maxPax) return false;
    if (q.berangkat && p.type === "open" && !nextDeparture(p, q.berangkat)) return false;
    return true;
  });
  const by: Record<string, (a: TourPackage, b: TourPackage) => number> = {
    populer: (a, b) => b.rating - a.rating || a.price - b.price,
    termurah: (a, b) => a.price - b.price,
    termahal: (a, b) => b.price - a.price,
    durasi: (a, b) => a.days - b.days,
  };
  return list.sort(by[q.urut ?? "populer"]);
}
