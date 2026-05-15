import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Cpu, CloudRain, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "technical",
    label: "Teknis & Arsitektur",
    icon: <Cpu className="w-4 h-4" />,
    items: [
      {
        question: "Mengapa menggunakan Raspberry Pi 4 untuk ARISA?",
        answer: "Raspberry Pi 4 dipilih karena kemampuannya memproses model AI secara lokal (Edge Computing) dengan konsumsi daya yang rendah. Ini memungkinkan sistem bekerja mandiri di area persawahan tanpa server besar.",
      },
      {
        question: "Bagaimana cara kerja AI dalam mendeteksi penyakit?",
        answer: "Sistem menggunakan kamera untuk mengambil gambar daun, kemudian model AI yang telah dilatih akan menganalisis pola visual pada daun untuk menentukan apakah ada gejala infeksi atau tidak.",
      },
      {
        question: "Apa itu Disease Severity Index (DSI) di sistem ini?",
        answer: "DSI adalah cara kami mengukur seberapa parah penyakit pada tanaman. AI menghitung perbandingan luas area yang sakit dengan total luas daun yang terlihat oleh kamera.",
      },
      {
        question: "Apakah data hasil deteksi aman?",
        answer: "Ya, karena semua pemrosesan dilakukan langsung di alat (lokal), data tidak dikirim ke internet, sehingga lebih privat dan aman bagi pengguna.",
      },
    ],
  },
  {
    id: "operation",
    label: "Operasional Lapangan",
    icon: <CloudRain className="w-4 h-4" />,
    items: [
      {
        question: "Bagaimana ketahanan alat terhadap cuaca?",
        answer: "Unit ARISA dilindungi oleh box panel yang tahan terhadap cipratan air hujan dan debu. Kami menyarankan pemasangan di bawah sedikit naungan untuk menjaga keawetan jangka panjang.",
      },
      {
        question: "Apakah sistem ini butuh sinyal internet di sawah?",
        answer: "Sama sekali tidak. Alat ini menciptakan jaringan WiFi sendiri. Petani cukup menyambungkan HP ke WiFi ARISA untuk melihat hasil deteksi di browser, seperti membuka website offline.",
      },
      {
        question: "Berapa lama alat ini bisa menyala?",
        answer: "Alat ini dirancang untuk dapat menyala selama jam operasional pemantauan menggunakan power bank atau adaptor listrik standar yang tersedia di saung petani.",
      },
      {
        question: "Apakah alat ini berat dan susah dipasang?",
        answer: "Alat ini cukup ringan (sekitar 1kg) dan bisa dipasang dengan mudah pada tiang bambu atau kayu sederhana yang umum ada di sawah.",
      },
    ],
  },
  {
    id: "accuracy",
    label: "Akurasi & Validasi",
    icon: <ShieldCheck className="w-4 h-4" />,
    items: [
      {
        question: "Seberapa akurat alat ini mendeteksi penyakit?",
        answer: "Berdasarkan uji coba kami dengan puluhan sampel daun, alat ini menunjukkan tingkat keberhasilan deteksi yang konsisten dan cukup tinggi untuk membantu petani melakukan pengecekan awal.",
      },
      {
        question: "Apakah alat bisa salah mendeteksi (salah sangka)?",
        answer: "Sama seperti manusia, AI bisa melakukan kesalahan jika gambar tidak jelas atau terlalu gelap. Karena itu, kami menyarankan pengambilan gambar dengan cahaya yang cukup untuk hasil terbaik.",
      },
      {
        question: "Penyakit apa saja yang bisa dideteksi?",
        answer: "Saat ini alat difokuskan untuk mendeteksi penyakit Hawar Daun Bakteri (HDB) yang sering menyerang padi di daerah kami.",
      },
      {
        question: "Siapa yang memvalidasi hasil dari alat ini?",
        answer: "Kami melakukan pengecekan ulang (cross-check) hasil deteksi alat dengan bantuan literatur pertanian dan konsultasi dengan pembimbing riset kami.",
      },
    ],
  },
  {
    id: "future",
    label: "Rencana Kedepan",
    icon: <Zap className="w-4 h-4" />,
    items: [
      {
        question: "Apakah nantinya bisa mendeteksi penyakit lain?",
        answer: "Ya, rencana kami selanjutnya adalah menambah database gambar penyakit lain seperti Blast (patah leher) agar alat ini semakin bermanfaat bagi petani.",
      },
      {
        question: "Bisa tidak alat ini mengirim laporan ke WhatsApp?",
        answer: "Ini adalah salah satu ide pengembangan kami ke depan jika sistem ini sudah terhubung dengan modul komunikasi tambahan atau jaringan internet.",
      },
      {
        question: "Apakah alat ini akan diproduksi banyak?",
        answer: "Untuk saat ini ARISA masih dalam tahap pengembangan riset untuk kebutuhan kompetisi OPSI, namun potensinya sangat terbuka untuk dikembangkan lebih lanjut.",
      },
    ],
  },
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(faqCategories[0].id);

  return (
    <section className="py-24 md:py-32 bg-background text-foreground border-y border-border">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-kaleo-terracotta" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-6 leading-none">
            FAQ & <span className="italic text-foreground/70">Support.</span>
          </h2>
          <p className="font-prose text-muted-foreground max-w-xl mx-auto italic text-sm md:text-base leading-relaxed">
            Jawaban teknis atas pertanyaan umum mengenai implementasi, keandalan, dan metodologi riset ARISA.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Categories Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl border transition-all duration-300 text-left whitespace-nowrap lg:whitespace-normal group ${
                  activeTab === category.id
                    ? 'border-kaleo-terracotta bg-kaleo-terracotta/5 text-kaleo-terracotta shadow-sm'
                    : 'border-border bg-transparent text-muted-foreground hover:border-foreground/20 hover:text-foreground'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  activeTab === category.id ? 'bg-kaleo-terracotta/10' : 'bg-muted'
                }`}>
                  {category.icon}
                </div>
                <span className="font-body text-xs md:text-sm font-semibold tracking-wide uppercase">
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          {/* FAQ Accordion Content */}
          <div className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {faqCategories.find(c => c.id === activeTab)?.items.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${activeTab}-${i}`}
                      className="border border-border rounded-2xl px-8 bg-muted/30 data-[state=open]:bg-background data-[state=open]:border-kaleo-terracotta/30 transition-all duration-500 overflow-hidden"
                    >
                      <AccordionTrigger className="text-left font-display text-lg md:text-xl py-6 hover:no-underline group">
                        <span className="group-hover:text-kaleo-terracotta transition-colors duration-300">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="font-body text-sm md:text-base text-muted-foreground leading-relaxed pb-8 pr-4">
                        <div className="flex gap-4">
                          <Zap className="w-5 h-5 text-kaleo-terracotta flex-shrink-0 mt-1 opacity-50" />
                          <p className="italic">{item.answer}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Support Note */}
        <div className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <p className="font-body text-xs uppercase tracking-widest text-center md:text-left">
            Butuh detail teknis lebih lanjut?
          </p>
          <div className="flex gap-8">
            <a href="mailto:smkmarhasmargahayu2004@gmail.com" className="font-body text-xs font-bold hover:text-kaleo-terracotta transition-colors border-b border-transparent hover:border-current pb-1">
              EMAIL SUPPORT
            </a>
            <a href="/research" className="font-body text-xs font-bold hover:text-kaleo-terracotta transition-colors border-b border-transparent hover:border-current pb-1">
              RESEARCH BASE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
