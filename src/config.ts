// Site-wide configuration
export interface SiteConfig {
  language: string;
  siteName: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "id",
  siteName: "ARISA",
  siteDescription: "Sistem kecerdasan buatan komputasi tepi untuk pemantauan agronomi presisi",
};

// Hero Section
export interface HeroConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  backgroundAlt: "Pemandangan sawah saat jam keemasan dengan atmosfer yang menenangkan",
  title: "ARISA",
  subtitle: "KECERDASAN AGRONOMI PRESISI",
};

// Narrative Text Section
export interface NarrativeTextConfig {
  line1: string;
  line2: string;
  line3: string;
}

export const narrativeTextConfig: NarrativeTextConfig = {
  line1: "Menjaga harmoni alam dan teknologi,",
  line2: "demi ketahanan pangan masa depan.",
  line3: "KOMPUTASI TEPI. DETEKSI PRESISI. KEBERLANJUTAN AGRONOMI.",
};

// ZigZag Grid Section
export interface ZigZagGridItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
}

export interface ZigZagGridConfig {
  sectionLabel: string;
  sectionTitle: string;
  items: ZigZagGridItem[];
}

export const zigZagGridConfig: ZigZagGridConfig = {
  sectionLabel: "LANDASAN INOVASI",
  sectionTitle: "Simbiosis Alam dan Kecerdasan",
  items: [
    {
      id: "pemantauan",
      title: "Pemantauan Berkelanjutan",
      subtitle: "EDGE-AI SYSTEM",
      description: "Sistem kami membawa kecerdasan langsung ke lahan pertanian tanpa bergantung pada konektivitas internet. Melalui perangkat komputasi tepi mutakhir, kondisi setiap helai daun padi dipindai dan diproses secara real-time.",
      image: "/grid-1.jpg",
      imageAlt: "Komputasi tepi Edge-AI dengan nuansa estetis",
      reverse: false,
    },
    {
      id: "analisis",
      title: "Analisis Presisi",
      subtitle: "DEEP LEARNING",
      description: "Arsitektur U-Net dan EfficientNet bekerja berdampingan dengan keanggunan algoritmik. Mengidentifikasi jaringan sehat dan membaca gejala biologis sekecil apapun untuk mengantisipasi penurunan hasil panen sebelum memburuk.",
      image: "/grid-2.jpg",
      imageAlt: "Ilustrasi pemrosesan citra digital pertanian dengan cahaya hangat",
      reverse: true,
    },
    {
      id: "risiko",
      title: "Skala Risiko Agronomi",
      subtitle: "INTEGRASI ILMU",
      description: "ARISA tidak hanya melihat, namun juga menerjemahkan. Mengolah temuan visual menjadi Disease Severity Index dan menghadirkan interpretasi metrik risiko yang holistik dan tervalidasi secara akademis.",
      image: "/grid-3.jpg",
      imageAlt: "Instrumen ilmiah bersanding dengan tanaman botani",
      reverse: false,
    },
    {
      id: "aksesibilitas",
      title: "Aksesibilitas Harmonis",
      subtitle: "TEKNOLOGI INKLUSIF",
      description: "Komunikasi data yang mulus melalui antarmuka canggih dirancang sedemikian rupa agar selaras dengan keseharian petani. Interaksi tanpa batas antara manusia, mesin, dan alam demi ekosistem agrikultur cerdas.",
      image: "/grid-4.jpg",
      imageAlt: "Lanskap sawah membentang luas di bawah sinar mentari",
      reverse: true,
    },
  ],
};

// Breath Section
export interface BreathSectionConfig {
  backgroundImage: string;
  backgroundAlt: string;
  title: string;
  subtitle: string;
  description: string;
}

export const breathSectionConfig: BreathSectionConfig = {
  backgroundImage: "/breath-bg.jpg",
  backgroundAlt: "Panorama pegunungan dan persawahan yang megah dan damai",
  title: "Harmoni",
  subtitle: "ALAM & TEKNOLOGI",
  description: "Di setiap hembusan angin yang menyapa rumpun padi, ada kehidupan yang patut dijaga. Karya kami adalah bentuk penghormatan pada dedikasi petani, sebuah sinergi merawat asa ketahanan pangan di tanah Nusantara.",
};

// Card Stack Section
export interface CardStackItem {
  id: number;
  image: string;
  title: string;
  description: string;
  rotation: number;
}

export interface CardStackConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: CardStackItem[];
}

export const cardStackConfig: CardStackConfig = {
  sectionTitle: "Esensi Sistem",
  sectionSubtitle: "DIRANCANG UNTUK MASA DEPAN",
  cards: [
    {
      id: 1,
      image: "/card-1.jpg",
      title: "Perangkat Tangguh",
      description: "Dirakit lengkap dengan balutan material antiair yang elegan dan presisi. ARISA senantiasa awas memproses data di hamparan sawah, tidak retak di bawah sinar terik pelita hari.",
      rotation: -2,
    },
    {
      id: 2,
      image: "/card-2.jpg",
      title: "Kecerdasan Mandiri",
      description: "Kami melatih jaringan saraf tiruan mutakhir untuk memahami setiap stadium kehidupan padi. Mengenali corak penyakit dan kondisi agronomis dengan tingkat akurasi yang melampaui visual manusia biasa.",
      rotation: 1,
    },
    {
      id: 3,
      image: "/card-3.jpg",
      title: "Antarmuka Humanis",
      description: "Segala temuan kompleks sistem diformulasikan ke dalam kesederhanaan. Sebuah estetika aplikasi yang menyajikan wawasan bermakna secara instan, menuntun penggunanya pada tindakan yang arif.",
      rotation: -1,
    },
  ],
};

// Footer Section
export interface FooterContactItem {
  type: "email" | "phone";
  label: string;
  value: string;
  href: string;
}

export interface FooterSocialItem {
  platform: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  description: string;
  ctaText: string;
  contact: FooterContactItem[];
  locationLabel: string;
  address: string[];
  socialLabel: string;
  socials: FooterSocialItem[];
  logoText: string;
  copyright: string;
  links: { label: string; href: string }[];
}

export const footerConfig: FooterConfig = {
  heading: "Kolaborasi Masa Depan",
  description: "ARISA bermula dari sebuah inisiatif di SMK Marhas Margahayu, Kabupaten Bandung. Jika Anda tergerak untuk merevolusi ekosistem agrikultur cerdas, atau sekadar berbagi visi penelitian yang mendalam, pintu kami senantiasa terbuka.",
  ctaText: "Hubungi Peneliti",
  contact: [
    {
      type: "email",
      label: "research@arisa.ai",
      value: "research@arisa.ai",
      href: "mailto:research@arisa.ai",
    },
    {
      type: "phone",
      label: "SMK Marhas Margahayu",
      value: "",
      href: "#",
    },
  ],
  locationLabel: "Lokasi Penelitian",
  address: ["Tim Fisika Terapan & Rekayasa", "Kabupaten Bandung, Jawa Barat 2026"],
  socialLabel: "Ikuti Kami",
  socials: [
    {
      platform: "instagram",
      href: "https://instagram.com/arisa_project",
    },
    {
      platform: "github",
      href: "https://github.com/arisa-opsi",
    },
  ],
  logoText: "ARISA",
  copyright: "2026 Arief Fajar & Reza Arrofi. Hak Cipta Dilindungi.",
  links: [
    { label: "Basis Penelitian", href: "/research" },
    { label: "Dokumentasi OPSI", href: "/docs" },
  ],
};

