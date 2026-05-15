import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxDepthField — Advanced Lenis scroll effect
 * 
 * Unlike horizontal scroll (Field Test) or zoom scale (Method),
 * this creates a DEPTH PARALLAX effect where elements move at 
 * dramatically different speeds as you scroll. Left column content
 * moves UPWARD faster than scroll, right column content moves UPWARD
 * slower (or even slightly downward), creating a beautiful crossing
 * motion that directly benefits from Lenis's smooth interpolation.
 * 
 * This is the quintessential "Lenis effect" — smooth velocity-based
 * parallax that would look janky with native scroll.
 */

const insights = [
  {
    number: '01',
    label: 'SEGMENTASI',
    title: 'Analisis Citra Daun',
    description:
      'Model U-Net+MobileNetV2 menganalisis setiap piksel citra daun untuk memisahkan jaringan sehat dan area lesi penyakit secara otomatis.',
    stat: 'U-Net',
    statLabel: 'Segmentation Model',
    image: '/science/leaf-healthy.webp',
  },
  {
    number: '02',
    label: 'EDGE-AI',
    title: 'Inferensi Lokal',
    description:
      'Komputasi berjalan langsung di Raspberry Pi 4 tanpa koneksi internet. Model TFLite INT8 memastikan latensi rendah di lingkungan lapangan.',
    stat: 'TFLite',
    statLabel: 'INT8 Quantized',
    image: '/science/leaf-mild.webp',
  },
  {
    number: '03',
    label: 'VALIDASI',
    title: 'Uji Lapangan',
    description:
      'Sistem divalidasi dengan 50+ sampel citra baru dan dinilai oleh penyuluh pertanian BPP untuk memastikan relevansi klinis di lapangan.',
    stat: '50+',
    statLabel: 'Sampel Uji',
    image: '/science/ai-segmentation.webp',
  },
];

const ParallaxDepthField = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const leftItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < 768;

      // ─── Header fade-in ───
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      }

      // ─── Left column items: FAST parallax (move up faster) ───
      const leftItems = leftItemsRef.current.filter(Boolean) as HTMLDivElement[];
      leftItems.forEach((item, i) => {
        // Each item has progressively more parallax
        const speed = isMobile ? (i + 1) * -30 : (i + 1) * -80;

        gsap.fromTo(
          item,
          { y: Math.abs(speed), opacity: 0 },
          {
            y: speed,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      });

      // ─── Right column items: SLOW parallax (move up slower / counter) ───
      const rightItems = rightItemsRef.current.filter(Boolean) as HTMLDivElement[];
      rightItems.forEach((item, i) => {
        // Opposite direction - items move DOWN relative to scroll
        const speed = isMobile ? (i + 1) * 15 : (i + 1) * 40;

        gsap.fromTo(
          item,
          { y: -Math.abs(speed) * 0.5, opacity: 0 },
          {
            y: speed,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-muted/50 text-foreground py-32 md:py-48 overflow-hidden border-y border-border"
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-kaleo-terracotta/3 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-foreground/3 blur-[100px]" />
      </div>

      {/* Section Header */}
      <div ref={headerRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-kaleo-terracotta block mb-4">
              Temuan Teknis
            </span>
            <h2 className="font-display text-4xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95]">
              Temuan <br />
              <span className="italic text-foreground/70">Riset.</span>
            </h2>
          </div>
          <p className="font-prose text-sm md:text-base text-muted-foreground max-w-sm leading-[1.85] italic md:text-right">
            Tiga aspek utama yang membentuk arsitektur ARISA di lapangan.
          </p>
        </div>
      </div>

      {/* Parallax Depth Columns */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24">
          
          {/* LEFT COLUMN — fast parallax (images + numbers) */}
          <div ref={leftColRef} className="flex flex-col gap-16 md:gap-32">
            {insights.map((insight, i) => (
              <div
                key={`left-${i}`}
                ref={(el) => { leftItemsRef.current[i] = el; }}
                className="relative"
              >
                {/* Large image card */}
                <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl mb-6">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Number overlay */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="font-display text-5xl md:text-7xl text-white/15 italic">
                      {insight.number}
                    </span>
                  </div>

                  {/* Stat overlay at bottom */}
                  <div className="absolute bottom-6 right-6 text-right">
                    <span className="font-display text-3xl md:text-5xl text-white/90 tracking-tight block">
                      {insight.stat}
                    </span>
                    <span className="font-body text-[0.55rem] uppercase tracking-[0.2em] text-white/50">
                      {insight.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN — slow/counter parallax (text content) */}
          <div ref={rightColRef} className="flex flex-col gap-16 md:gap-32 md:pt-40">
            {insights.map((insight, i) => (
              <div
                key={`right-${i}`}
                ref={(el) => { rightItemsRef.current[i] = el; }}
                className="relative"
              >
                {/* Label */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-kaleo-terracotta/50" />
                  <span className="font-body text-[0.6rem] uppercase tracking-[0.3em] text-kaleo-terracotta">
                    {insight.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6 leading-[1.05]">
                  {insight.title}
                </h3>

                {/* Description */}
                <p className="font-prose text-sm md:text-base text-muted-foreground leading-[1.85] italic max-w-sm">
                  {insight.description}
                </p>

                {/* Decorative line */}
                <div className="mt-8 w-full h-px bg-border" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxDepthField;
