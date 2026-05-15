import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, DollarSign, ShieldCheck, Sprout } from 'lucide-react';

export default function CostBenefit() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const costBreakdown = [
    { label: "Raspberry Pi 4 + Camera", cost: "Rp 1.250.000", pct: 54 },
    { label: "Weatherproof Casing & Cooling", cost: "Rp 400.000", pct: 17 },
    { label: "Baterai & Power Supply", cost: "Rp 400.000", pct: 17 },
    { label: "MicroSD + Lainnya", cost: "Rp 250.000", pct: 12 },
  ];

  return (
    <section className="py-24 md:py-32 bg-background text-foreground" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-foreground/70 mb-4 block">
            Economic Analysis
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            Investasi <span className="italic">vs</span> Manfaat
          </h2>
          <p className="font-prose text-foreground/70 max-w-xl mx-auto italic text-sm md:text-base">
            Apakah alat seharga ini sepadan untuk petani? Data berikut menjawab langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left — Investment Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-foreground/10 p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-medium">Biaya Pembuatan Alat</h3>
                  <p className="font-body text-xs text-foreground/70">One-time investment</p>
                </div>
              </div>

              {/* Total */}
              <div className="mb-8">
                <span className="font-display text-5xl md:text-6xl tracking-tight">Rp 2,3</span>
                <span className="font-display text-2xl text-foreground/70 ml-1">Juta</span>
                <p className="font-body text-xs text-foreground/70 mt-1">Biaya alat (di luar biaya riset & pengembangan)</p>
              </div>

              {/* Cost breakdown */}
              <div className="space-y-4">
                {costBreakdown.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-body text-xs text-foreground/70">{item.label}</span>
                      <span className="font-body text-xs font-medium">{item.cost}</span>
                    </div>
                    <div className="w-full bg-foreground/5 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.pct}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                        className="h-full rounded-full bg-blue-500/40"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-foreground/10 flex justify-between">
                <span className="font-body text-xs text-foreground/70">Total Riset Keseluruhan</span>
                <span className="font-body text-sm font-medium">Rp 4.200.000</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Benefit Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-medium">Potensi Penyelamatan Panen</h3>
                  <p className="font-body text-xs text-foreground/70">Per hektar per musim tanam</p>
                </div>
              </div>

              {/* Key facts */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-medium mb-1">Fakta Kerugian</h4>
                    <p className="font-body text-xs text-foreground/70 leading-relaxed">
                      Penyakit Hawar Daun bisa menurunkan panen hingga <span className="text-red-500 font-medium">15-40%</span> (Mardatila, 2020; Yanti dkk., 2018). 
                      Infeksi &gt;50% pada fase malai menyebabkan penurunan hasil <span className="text-red-500 font-medium">~29%</span> (Noh et al., 2007).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sprout className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-medium mb-1">Nilai ARISA</h4>
                    <p className="font-body text-xs text-foreground/70 leading-relaxed">
                      Dengan investasi pembuatan alat sebesar <span className="text-emerald-600 dark:text-emerald-400 font-medium">±Rp 2,3 Juta</span>, 
                      sistem ARISA mampu menyelamatkan potensi kerugian panen senilai <span className="text-emerald-600 dark:text-emerald-400 font-medium">jutaan rupiah</span> untuk 
                      setiap hektar sawah dalam jangka panjang melalui deteksi dini.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual comparison */}
              <div className="rounded-xl bg-foreground/5 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-foreground/70">Tanpa ARISA</span>
                  <span className="font-body text-xs text-red-500 font-medium">Kerugian s.d. 40%</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '40%' } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-foreground/70">Dengan ARISA</span>
                  <span className="font-body text-xs text-emerald-500 font-medium">Kerugian diminimalkan</span>
                </div>
                <div className="w-full bg-foreground/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '5%' } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
