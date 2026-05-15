import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

interface DownloadItem {
  title: string;
  description: string;
  href: string;
  fileSize: string;
  fileType: string;
}

const downloads: DownloadItem[] = [
  {
    title: "Berkas Proposal Penelitian",
    description: "Proposal lengkap yang telah lolos seleksi administrasi OPSI 2026 - mencakup pendahuluan, kajian pustaka, metode, RAB, dan jadwal.",
    href: "/assets/administrasi/Berkas-Proposal-ARISA.pdf",
    fileSize: "330 KB",
    fileType: "PDF",
  },
  {
    title: "Rancangan Anggaran Biaya",
    description: "Rincian komponen biaya penelitian ARISA yang telah difinalisasi dan disetujui oleh pihak sekolah.",
    href: "/assets/administrasi/Rancangan-Anggaran-Biaya-ARISA.pdf",
    fileSize: "124 KB",
    fileType: "PDF",
  },
  {
    title: "Pernyataan Keaslian Karya",
    description: "Surat pernyataan bermaterai bahwa penelitian ini merupakan karya asli dan orisinal dari tim ARISA-CHAN.",
    href: "/assets/administrasi/Pernyataan-Keaslian-Karya.pdf",
    fileSize: "124 KB",
    fileType: "PDF",
  },
  {
    title: "Rekomendasi Kepala Sekolah",
    description: "Surat rekomendasi resmi dari Kepala SMK Marhas Margahayu untuk keikutsertaan tim di OPSI 2026.",
    href: "/assets/administrasi/Rekomendasi-Kepala-Sekolah.pdf",
    fileSize: "133 KB",
    fileType: "PDF",
  },
  {
    title: "Surat Pernyataan Kecerdasan Buatan",
    description: "Pernyataan terkait penggunaan teknologi kecerdasan buatan dalam proses penelitian sesuai ketentuan OPSI.",
    href: "/assets/administrasi/Surat-Pernyataan-Kecerdasan-Buatan.pdf",
    fileSize: "138 KB",
    fileType: "PDF",
  },
];

export default function Downloads() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-kaleo-terracotta mb-4 block">
            Dokumen Administrasi
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            Berkas <span className="italic">Resmi</span>
          </h2>
          <p className="font-prose text-muted-foreground max-w-xl mx-auto italic text-sm md:text-base">
            Seluruh dokumen administrasi OPSI 2026 yang telah difinalisasi dan diverifikasi.
          </p>
        </div>

        {/* Prominent PDF List */}
        <div className="space-y-4">
          {downloads.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex items-center gap-5 md:gap-6 rounded-2xl border border-border bg-background p-5 md:p-6 hover:border-foreground/25 hover:bg-muted/30 transition-all duration-500"
            >
              {/* PDF Icon — Large */}
              <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-destructive/8 border border-destructive/15 flex flex-col items-center justify-center group-hover:bg-destructive/12 transition-colors duration-500">
                <FileText className="w-6 h-6 md:w-7 md:h-7 text-destructive/70 group-hover:text-destructive transition-colors" />
                <span className="font-body text-[8px] md:text-[9px] font-bold text-destructive uppercase mt-0.5">{item.fileType}</span>
              </div>

              {/* Content */}
              <div className="flex-grow min-w-0">
                <h3 className="font-body text-sm md:text-base font-medium mb-0.5 group-hover:text-foreground transition-colors truncate">{item.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2 hidden sm:block">{item.description}</p>
              </div>

              {/* Right side — Size + Action */}
              <div className="flex-shrink-0 flex items-center gap-3 md:gap-4">
                <span className="font-body text-[10px] text-muted-foreground hidden md:block">{item.fileSize}</span>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-foreground/30 group-hover:bg-foreground/5 transition-all duration-500">
                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Architecture Diagram Link */}
        <motion.a
          href="/science/architecture.webp"
          target="_blank"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="group mt-8 flex items-center gap-5 md:gap-6 rounded-2xl border border-kaleo-terracotta/20 bg-kaleo-terracotta/5 p-5 md:p-6 hover:border-kaleo-terracotta/40 transition-all duration-500"
        >
          <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-kaleo-terracotta/10 border border-kaleo-terracotta/20 flex items-center justify-center">
            <ExternalLink className="w-6 h-6 text-kaleo-terracotta/70" />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-body text-sm md:text-base font-medium mb-0.5">Diagram Arsitektur Sistem</h3>
            <p className="font-body text-xs text-muted-foreground hidden sm:block">Bagan alur: Kamera → Raspberry Pi 4 → Model TFLite → WiFi Lokal → HP Petani</p>
          </div>
          <div className="flex-shrink-0 w-10 h-10 rounded-full border border-kaleo-terracotta/20 flex items-center justify-center group-hover:border-kaleo-terracotta/40 transition-all">
            <ExternalLink className="w-4 h-4 text-kaleo-terracotta/60" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
