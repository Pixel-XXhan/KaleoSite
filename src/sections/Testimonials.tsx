import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Dulu saya harus keliling sawah tiap pagi buat ngecek daun kuning. Sekarang tinggal duduk di saung, buka HP, langsung kelihatan area mana yang sakit.",
    name: "Petani Mitra",
    role: "Petani Padi, Kec. Margaasih",
  },
  {
    quote: "Sistem ini membantu kami mendapatkan data kuantitatif yang objektif, bukan sekadar perkiraan visual. Sangat berguna untuk rekomendasi tindakan yang tepat sasaran.",
    name: "Penyuluh Pertanian",
    role: "PPL - Balai Penyuluhan Pertanian, Kab. Bandung",
  },
  {
    quote: "Biasanya kalau sudah kelihatan parah baru ketahuan. Pakai alat ini, saya jadi bisa tahu lebih awal sebelum menyebar ke petak sebelah.",
    name: "Petani Mitra",
    role: "Petani Padi, Kec. Margaasih",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-muted/50 text-foreground border-y border-border">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-kaleo-terracotta mb-4 block">
            Respons Lapangan
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            Tanggapan <span className="italic">Pengguna</span>
          </h2>
          <p className="font-prose text-muted-foreground max-w-xl mx-auto italic text-sm">
            Kutipan dari petani mitra dan penyuluh pertanian selama proses uji usability sistem ARISA.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-border bg-background p-8 hover:border-foreground/20 transition-all duration-500 flex flex-col">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-kaleo-terracotta/30" />
                </div>

                {/* Quote text */}
                <p className="font-prose text-base md:text-lg text-foreground/80 leading-[1.85] italic flex-grow">
                  "{item.quote}"
                </p>

                {/* Author */}
                <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-kaleo-terracotta/10 flex items-center justify-center text-xs font-body font-bold text-kaleo-terracotta">
                    🌾
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium">{item.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Source note */}
        <p className="text-center mt-10 font-body text-[10px] text-muted-foreground">
          * Berdasarkan rencana uji usability dengan 8 petani mitra dan validasi PPL BPP Kec. Margaasih.
        </p>
      </div>
    </section>
  );
}
