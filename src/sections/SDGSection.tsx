import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sprout, Cpu, Droplets } from 'lucide-react';

interface SDGItem {
  number: string;
  title: string;
  titleEn: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const sdgs: SDGItem[] = [
  {
    number: "02",
    title: "Tanpa Kelaparan",
    titleEn: "Zero Hunger",
    description: "Mendukung ketahanan pangan melalui stabilitas produksi padi. Deteksi dini penyakit mencegah gagal panen yang dapat mengancam ketersediaan beras nasional.",
    color: "#DDA63A",
    icon: <Sprout className="w-5 h-5" />,
  },
  {
    number: "09",
    title: "Industri, Inovasi, & Infrastruktur",
    titleEn: "Industry, Innovation & Infrastructure",
    description: "Membawa inovasi Artificial Intelligence dan IoT (Edge Computing) ke sektor pertanian pelosok. Menjembatani kesenjangan teknologi antara kota dan desa.",
    color: "#FD6925",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    number: "12",
    title: "Produksi Bertanggung Jawab",
    titleEn: "Responsible Consumption & Production",
    description: "Deteksi dini mengurangi penggunaan pestisida kimia berlebihan. Petani menyemprot hanya saat ada indikator risiko - lebih efisien dan ramah lingkungan.",
    color: "#BF8B2E",
    icon: <Droplets className="w-5 h-5" />,
  },
];

export default function SDGSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header - Editorial Style */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-body text-[0.65rem] uppercase tracking-[0.4em] text-kaleo-terracotta mb-4 block">
              Global Impact
            </span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-foreground">
              Sustainable <br />
              <span className="italic text-foreground/70">Development.</span>
            </h2>
          </div>
          <p className="font-prose text-foreground/70 max-w-sm italic text-sm md:text-base leading-relaxed">
            ARISA selaras dengan target PBB dalam menciptakan masa depan pertanian yang cerdas, inklusif, dan berkelanjutan.
          </p>
        </div>

        {/* SDG Grid - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-foreground/10">
          {sdgs.map((sdg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border-r border-b border-foreground/10 p-10 md:p-12 min-h-[400px] flex flex-col transition-colors duration-500 hover:bg-foreground/[0.02]"
            >
              {/* Background Large Number - Swiss Style */}
              <span className="absolute top-8 right-8 font-display text-[8rem] md:text-[10rem] leading-none opacity-[0.03] select-none group-hover:opacity-[0.06] transition-opacity duration-700">
                {sdg.number}
              </span>

              {/* Icon & Mini Label */}
              <div className="relative z-10 flex items-center gap-3 mb-auto">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-[15deg]"
                  style={{ backgroundColor: `${sdg.color}15`, color: sdg.color }}
                >
                  {sdg.icon}
                </div>
                <span className="font-body text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: sdg.color }}>
                  Goal {sdg.number}
                </span>
              </div>

              {/* Title & Content */}
              <div className="relative z-10 mt-12">
                <h3 className="font-display text-2xl md:text-3xl tracking-tight leading-tight mb-2">
                  {sdg.title}
                </h3>
                <p className="font-body text-[10px] uppercase tracking-widest opacity-50 mb-6">
                  {sdg.titleEn}
                </p>
                <p className="font-prose text-sm text-foreground/80 leading-relaxed italic border-l-2 border-foreground/10 pl-6 group-hover:border-foreground/30 transition-colors duration-500">
                  {sdg.description}
                </p>
              </div>

              {/* Subtle hover accent line at bottom */}
              <div 
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-700 ease-out group-hover:w-full"
                style={{ color: sdg.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
