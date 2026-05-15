import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface GalleryStep {
  image: string;
  label: string;
  badge: string;
  desc: string;
}

const steps: GalleryStep[] = [
  {
    image: "/science/leaf-mild.webp",
    label: "Citra Asli (Raw Image)",
    badge: "INPUT",
    desc: "Foto daun padi yang terindikasi terinfeksi, diakuisisi oleh kamera Raspberry Pi Camera Module v2 (8MP) langsung di lapangan.",
  },
  {
    image: "/science/ai-segmentation.webp",
    label: "Ground Truth (Anotasi Manual)",
    badge: "ANOTASI",
    desc: "Hasil tracing manual di LabelMe/CVAT oleh 2 anotator independen. Target inter-annotator agreement IoU >= 0.75.",
  },
  {
    image: "/science/leaf-severe.webp",
    label: "Hasil Segmentasi AI (Masking)",
    badge: "OUTPUT",
    desc: "Prediksi model U-Net+MobileNetV2: area hijau = jaringan sehat, area merah = lesi. Dikonversi TFLite INT8 untuk edge deployment.",
  },
];

export default function AIGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-muted/50 text-foreground overflow-hidden border-y border-border">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-kaleo-terracotta mb-4 block">
            Pipeline Segmentasi
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            Alur Kerja <span className="italic">AI</span>
          </h2>
          <p className="font-prose text-muted-foreground max-w-2xl mx-auto italic text-sm md:text-base">
            Proses pengolahan citra dari akuisisi di sawah hingga prediksi area terinfeksi oleh model segmentasi.
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="rounded-2xl border border-border bg-background overflow-hidden hover:border-foreground/20 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Step indicator */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-foreground/80 backdrop-blur-md flex items-center justify-center text-xs font-body font-bold text-background">
                      {i + 1}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[0.6rem] uppercase tracking-wider font-medium bg-background/80 backdrop-blur-sm text-foreground/70 border border-border">
                      {step.badge}
                    </span>
                  </div>
                  {/* Arrow connector */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-5 z-20 w-10 h-10 rounded-full bg-muted border border-border items-center justify-center text-foreground/70">
                      →
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="p-6">
                  <h3 className="font-display text-xl md:text-2xl mb-2">{step.label}</h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 rounded-2xl border border-border p-6 md:p-8 bg-background"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-kaleo-terracotta/10 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-kaleo-terracotta text-sm">📐</span>
            </div>
            <div>
              <h4 className="font-body text-sm font-medium mb-1">Catatan Teknis</h4>
              <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">
                Segmentasi piksel biner digunakan untuk menghitung <span className="text-foreground font-medium">Disease Severity Index (DSI)</span>. 
                Model berjalan di <span className="text-foreground font-medium">Raspberry Pi 4</span> dengan konversi
                <span className="text-foreground font-medium"> TFLite Dynamic Range Quantization (INT8)</span> - menekan latensi inferensi tanpa penurunan akurasi signifikan.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
