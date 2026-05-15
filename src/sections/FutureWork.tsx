import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, LayoutDashboard, Search } from 'lucide-react';

interface FutureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  timeline: string;
  label: string;
}

const futureItems: FutureItem[] = [
  {
    icon: <Database className="w-5 h-5" />,
    label: "PHASE 01",
    title: "Ekspansi Dataset Penyakit",
    description: "Memperluas basis data citra untuk mencakup varietas padi lokal lainnya serta tahap awal deteksi penyakit Blast (Patah Leher).",
    timeline: "2026 - 2027",
  },
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "PHASE 02",
    title: "Dashboard Multi-Node",
    description: "Mengembangkan sistem pemantauan terpusat yang mampu mengelola data dari beberapa perangkat ARISA di petak sawah yang berbeda.",
    timeline: "2027",
  },
  {
    icon: <Search className="w-5 h-5" />,
    label: "PHASE 03",
    title: "Sistem Saran Agronomi",
    description: "Integrasi modul rekomendasi tindakan berbasis literatur pertanian untuk membantu petani memilih penanganan yang tepat sesuai hasil deteksi.",
    timeline: "2027 - 2028",
  },
];

export default function FutureWork() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header - Editorial Style */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-kaleo-terracotta mb-4 block">
              Roadmap
            </span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-foreground">
              Future <br />
              <span className="italic text-foreground/70">Horizons.</span>
            </h2>
          </div>
          <p className="font-prose text-foreground/60 max-w-sm italic text-sm md:text-base leading-relaxed">
            ARISA dirancang sebagai sistem yang adaptif. Pengembangan berkelanjutan adalah kunci untuk menjawab tantangan pertanian di masa depan.
          </p>
        </div>

        {/* Timeline - Premium Horizontal Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-foreground/10">
          {futureItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border-r border-b border-foreground/10 p-10 md:p-12 min-h-[380px] flex flex-col transition-colors duration-500 hover:bg-foreground/[0.02]"
            >
              {/* Background Large Year - Swiss Style */}
              <span className="absolute top-8 right-8 font-display text-[6rem] md:text-[7rem] leading-none opacity-[0.03] select-none group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
                {item.timeline.split(' ')[0]}
              </span>

              {/* Label & Icon */}
              <div className="relative z-10 flex items-center justify-between mb-auto">
                <span className="font-body text-[10px] uppercase tracking-[0.3em] font-bold text-kaleo-terracotta">
                  {item.label}
                </span>
                <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/40 group-hover:border-kaleo-terracotta/30 group-hover:text-kaleo-terracotta transition-all duration-500">
                  {item.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-12">
                <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block mb-2">
                  {item.timeline}
                </span>
                <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight mb-4 group-hover:text-kaleo-terracotta transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="font-prose text-sm text-foreground/80 leading-relaxed italic border-l border-foreground/10 pl-6 group-hover:border-kaleo-terracotta/30 transition-colors duration-500">
                  {item.description}
                </p>
              </div>

              {/* Decorative line at bottom */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-kaleo-terracotta transition-all duration-700 ease-out group-hover:w-full" />
            </motion.div>
          ))}
        </div>

        {/* Final Vision Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left"
        >
          <div className="w-12 h-px bg-foreground/20 hidden md:block" />
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-foreground/40 italic">
            Vision 2026 &bull; Precision Agriculture for Smallholders
          </p>
          <div className="w-12 h-px bg-foreground/20 hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
}
