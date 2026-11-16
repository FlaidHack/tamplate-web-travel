// ===== Semua konten & path foto ada di sini. Ganti foto: timpa file di public/images
// (atau ubah path di bawah). Semua nama tempat/harga/nomor WA masih DUMMY. =====

export const WA_NUMBER = "6281234567890";
export const waLink = (text = "Halo Jelajah Nusa, saya mau tanya paket wisata.") =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const rupiah = (n: number) => "Rp" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const rupiahJt = (n: number) =>
  n < 1e6 ? "Rp" + n / 1000 + "rb" : "Rp" + (n / 1e6).toString().replace(".", ",") + "jt";

export const IMG = {
  hero: "/images/pantai-tropis.jpg",
  feature: "/images/bromo.jpg",
  banner: "/images/resort-pantai.jpg",
};

export const popular = [
  { name: "Raja Ampat", location: "Papua Barat Daya", image: "/images/raja-ampat.jpg", discount: 20, q: "Raja Ampat" },
  { name: "Telaga Derawan", location: "Berau, Kalimantan Timur", image: "/images/telaga-derawan.jpg", discount: 15, q: "Derawan" },
  { name: "Candi Borobudur", location: "Magelang, Jawa Tengah", image: "/images/borobudur.jpg", discount: 20, q: "Borobudur" },
  { name: "Air Terjun Tiu Kelep", location: "Lombok Utara, NTB", image: "/images/air-terjun.jpg", discount: 10, q: "Tiu Kelep" },
];

export const categories = ["Populer", "Pulau", "Selam", "Taman Nasional", "Danau", "Pantai", "Gunung", "Budaya"];

export const testimonials = [
  { name: "Aulia Rahma", city: "Surabaya", text: "Itinerary-nya rapi dan pemandu lokalnya seru. Sunrise di Bromo jadi momen yang susah dilupakan." },
  { name: "Rizky Pratama", city: "Balikpapan", text: "Pemesanan mudah dan tim responsif lewat WhatsApp. Trip Raja Ampat berjalan lancar tanpa drama." },
  { name: "Dewi Lestari", city: "Bandung", text: "Harga transparan dan pilihan paketnya fleksibel, pas untuk liburan bareng keluarga." },
];

export const stamps = [
  { label: "Bali", image: "/images/ulun-danu-beratan.jpg" },
  { label: "Raja Ampat", image: "/images/raja-ampat.jpg" },
  { label: "Yogyakarta", image: "/images/borobudur.jpg" },
  { label: "Wakatobi", image: "/images/terumbu-wakatobi.jpg" },
  { label: "Derawan", image: "/images/telaga-derawan.jpg" },
];
