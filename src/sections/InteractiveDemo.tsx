import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Leaf, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface SampleData {
  image: string;
  label: string;
  result: {
    stadium: string;
    dsi: number;
    status: 'healthy' | 'mild' | 'severe';
    statusLabel: string;
    statusColor: string;
    statusIcon: React.ReactNode;
    description: string;
  };
}

const samples: SampleData[] = [
  {
    image: "/science/leaf-healthy.webp",
    label: "Daun Sehat",
    result: {
      stadium: "Vegetatif",
      dsi: 2.1,
      status: 'healthy',
      statusLabel: "Risiko Rendah",
      statusColor: "text-emerald-500",
      statusIcon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      description: "Kondisi daun sehat. Tidak ditemukan lesi atau gejala penyakit pada area yang dipindai.",
    },
  },
  {
    image: "/science/leaf-mild.webp",
    label: "Sakit Ringan",
    result: {
      stadium: "Pembentukan Malai",
      dsi: 18.5,
      status: 'mild',
      statusLabel: "Risiko Sedang",
      statusColor: "text-amber-500",
      statusIcon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      description: "Gejala awal hawar daun bakteri teridentifikasi. Bercak kekuningan pada 18.5% area daun. Monitor lebih intensif.",
    },
  },
  {
    image: "/science/leaf-severe.webp",
    label: "Sakit Parah",
    result: {
      stadium: "Vegetatif",
      dsi: 52.3,
      status: 'severe',
      statusLabel: "Risiko Tinggi",
      statusColor: "text-red-500",
      statusIcon: <XCircle className="w-5 h-5 text-red-500" />,
      description: "Infeksi berat - lesi menutupi >50% area daun. Segera konsultasi PPL untuk tindakan fungisida/bakterisida.",
    },
  },
];

export default function InteractiveDemo() {
  const [selectedSample, setSelectedSample] = useState<number | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (isScanning) return;
    setSelectedSample(index);
    setShowResult(false);
    setIsScanning(true);

    // Simulate scanning time
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 2200);
  };

  const reset = () => {
    setSelectedSample(null);
    setShowResult(false);
    setIsScanning(false);
  };

  return (
    <section className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden">
      {/* Subtle ambient */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-emerald-500/[0.02] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <ScanLine className="w-4 h-4 text-emerald-500" />
            <span className="font-body text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Interactive Demo</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            Coba <span className="italic">Deteksi AI</span>
          </h2>
          <p className="font-prose text-foreground/70 max-w-xl mx-auto italic text-sm md:text-base">
            Simulasi cara kerja ARISA. Pilih salah satu foto daun padi, lalu saksikan proses deteksi AI secara interaktif.
          </p>
        </div>

        {/* Sample Selection */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-12">
          {samples.map((sample, i) => (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                selectedSample === i
                  ? 'border-foreground/30 shadow-lg ring-2 ring-foreground/10'
                  : 'border-foreground/5 hover:border-foreground/15'
              }`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={sample.image}
                  alt={sample.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                <div className="flex items-center gap-2">
                  <Leaf className="w-3 h-3 text-white/70" />
                  <span className="font-body text-xs md:text-sm text-white font-medium">{sample.label}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {selectedSample !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="rounded-2xl border border-foreground/10 overflow-hidden bg-foreground/[0.02]">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image with scanning overlay */}
                  <div className="relative aspect-square md:aspect-auto overflow-hidden bg-black">
                    <img
                      src={samples[selectedSample].image}
                      alt="Selected sample"
                      className="w-full h-full object-cover"
                    />

                    {/* Scanning animation */}
                    {isScanning && (
                      <motion.div
                        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                      />
                    )}

                    {/* Green/Red overlay when result shows */}
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        className={`absolute inset-0 ${
                          samples[selectedSample].result.status === 'healthy'
                            ? 'bg-emerald-500'
                            : samples[selectedSample].result.status === 'mild'
                            ? 'bg-gradient-to-br from-emerald-500/50 to-amber-500/50'
                            : 'bg-gradient-to-br from-amber-500/30 to-red-500/50'
                        }`}
                      />
                    )}

                    {/* Processing indicator */}
                    {isScanning && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                        <span className="font-body text-xs text-white/80">Memproses citra melalui Edge-AI...</span>
                      </div>
                    )}
                  </div>

                  {/* Result panel */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    {isScanning ? (
                      <div className="space-y-4">
                        <div className="h-4 bg-foreground/5 rounded-full animate-pulse w-3/4" />
                        <div className="h-8 bg-foreground/5 rounded-full animate-pulse w-1/2" />
                        <div className="h-4 bg-foreground/5 rounded-full animate-pulse w-full" />
                        <div className="h-4 bg-foreground/5 rounded-full animate-pulse w-2/3" />
                      </div>
                    ) : showResult ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-5"
                      >
                        <div className="flex items-center gap-2">
                          {samples[selectedSample].result.statusIcon}
                          <span className={`font-body text-sm font-semibold ${samples[selectedSample].result.statusColor}`}>
                            {samples[selectedSample].result.statusLabel}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-body text-xs text-foreground/70 uppercase tracking-wider">Stadium</span>
                            <span className="font-body text-sm">{samples[selectedSample].result.stadium}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-body text-xs text-foreground/70 uppercase tracking-wider">DSI Score</span>
                            <span className="font-display text-2xl">{samples[selectedSample].result.dsi}%</span>
                          </div>
                          <div className="w-full bg-foreground/10 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${samples[selectedSample].result.dsi}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                samples[selectedSample].result.status === 'healthy'
                                  ? 'bg-emerald-500'
                                  : samples[selectedSample].result.status === 'mild'
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                            />
                          </div>
                        </div>

                        <p className="font-body text-xs text-foreground/70 leading-relaxed border-t border-foreground/10 pt-4">
                          {samples[selectedSample].result.description}
                        </p>

                        <button
                          onClick={reset}
                          className="w-full px-4 py-2.5 rounded-xl border border-foreground/10 font-body text-xs uppercase tracking-wider hover:bg-foreground/5 transition-colors"
                        >
                          Coba Sampel Lain
                        </button>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Technical note */}
              <p className="text-center mt-6 font-body text-[10px] text-foreground/70">
                * Simulasi interaktif. Proses asli berjalan di Raspberry Pi 4 secara offline menggunakan TFLite INT8 quantization.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
