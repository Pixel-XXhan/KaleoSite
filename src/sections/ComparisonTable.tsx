import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, Target, BarChart3, Zap, Eye, BrainCircuit } from 'lucide-react';

interface ComparisonItem {
  dimension: string;
  icon: React.ReactNode;
  manual: { title: string; desc: string };
  arisa: { title: string; desc: string };
}

const comparisons: ComparisonItem[] = [
  {
    dimension: "Kecepatan Deteksi",
    icon: <Clock className="w-5 h-5" />,
    manual: {
      title: "Terjadwal & Terlambat",
      desc: "Bergantung pada jadwal kunjungan petani ke sawah. Bisa terlambat berhari-hari sebelum gejala teridentifikasi.",
    },
    arisa: {
      title: "Real-Time 24/7",
      desc: "Pemantauan berkelanjutan. Hasil observasi langsung tersedia saat terkoneksi ke WiFi perangkat ARISA.",
    },
  },
  {
    dimension: "Akurasi & Konsistensi",
    icon: <Target className="w-5 h-5" />,
    manual: {
      title: "Subjektif & Bervariasi",
      desc: "Dipengaruhi kelelahan visual, pengalaman petani, dan kondisi cahaya saat pengamatan.",
    },
    arisa: {
      title: "Objektif & Terkalibrasi",
      desc: "Divalidasi AI (U-Net+MobileNetV2 & EfficientNet-B0), dikalibrasi sesuai standar BPP setempat.",
    },
  },
  {
    dimension: "Cakupan Monitoring",
    icon: <Eye className="w-5 h-5" />,
    manual: {
      title: "Terbatas Area Jangkau",
      desc: "Hanya area yang dikunjungi secara fisik. Titik buta di area sawah yang jauh dari jalan akses.",
    },
    arisa: {
      title: "Sistematis per Blok",
      desc: "Setiap blok sawah dipindai sistematis. Data tercatat otomatis tanpa ketergantungan memori petani.",
    },
  },
  {
    dimension: "Interpretasi Data",
    icon: <BrainCircuit className="w-5 h-5" />,
    manual: {
      title: "Kualitatif (Estimasi)",
      desc: "Penilaian berdasarkan pengalaman. Tidak ada angka pasti - 'agak kuning' atau 'lumayan parah'.",
    },
    arisa: {
      title: "Kuantitatif (DSI Score)",
      desc: "Disease Severity Index memberikan angka presisi (e.g., DSI 12.5%) untuk keputusan berbasis data.",
    },
  },
];

export default function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-foreground/70 mb-4 block">
            Comparative Analysis
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            ARISA <span className="italic text-foreground/70">vs</span> Pemantauan Manual
          </h2>
          <p className="font-prose text-foreground/70 max-w-xl mx-auto italic text-sm md:text-base">
            Evaluasi perbandingan kinerja sistem berdasarkan empat dimensi kritis pemantauan penyakit tanaman.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-6">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_2fr] gap-4 lg:gap-0 rounded-2xl border border-foreground/10 overflow-hidden hover:border-foreground/20 transition-colors duration-500">
                {/* Dimension Label */}
                <div className="bg-foreground/[0.03] p-6 lg:p-8 flex items-center gap-3 lg:border-r border-foreground/10">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground/70">
                    {item.icon}
                  </div>
                  <span className="font-body text-sm font-medium tracking-wide">{item.dimension}</span>
                </div>

                {/* Manual Column */}
                <div className="p-6 lg:p-8 lg:border-r border-foreground/10 relative">
                  <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                    <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[0.6rem] uppercase tracking-wider font-medium">
                      Manual
                    </span>
                  </div>
                  <h4 className="font-display text-lg md:text-xl mb-2 text-foreground/70">{item.manual.title}</h4>
                  <p className="font-body text-xs md:text-sm text-foreground/70 leading-relaxed">{item.manual.desc}</p>
                </div>

                {/* ARISA Column */}
                <div className="p-6 lg:p-8 relative bg-emerald-500/[0.02] group-hover:bg-emerald-500/[0.05] transition-colors duration-500">
                  <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[0.6rem] uppercase tracking-wider font-medium">
                      ARISA
                    </span>
                  </div>
                  <h4 className="font-display text-lg md:text-xl mb-2">{item.arisa.title}</h4>
                  <p className="font-body text-xs md:text-sm text-foreground/70 leading-relaxed">{item.arisa.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <BarChart3 className="w-4 h-4 text-foreground/70" />
          <p className="font-body text-xs text-foreground/70 text-center">
            Perbandingan berdasarkan rumusan masalah penelitian ARISA - OPSI 2026
          </p>
          <Zap className="w-4 h-4 text-foreground/70" />
        </div>
      </div>
    </section>
  );
}
