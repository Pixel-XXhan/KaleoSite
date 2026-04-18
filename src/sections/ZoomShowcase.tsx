import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: 'I',
    title: 'Akuisisi Citra',
    description:
      'Kamera presisi tinggi menangkap tekstur daun dalam resolusi mikroskopik. Setiap detail biologis terekam tanpa distorsi.',
    image: '/grid-1.jpg',
  },
  {
    number: 'II',
    title: 'Segmentasi Cerdas',
    description:
      'Arsitektur U-Net memisahkan wilayah sehat dari lesi patogen. Batas segmentasi presisi hingga tingkat piksel individual.',
    image: '/grid-2.jpg',
  },
  {
    number: 'III',
    title: 'Klasifikasi Mendalam',
    description:
      'EfficientNet mengidentifikasi jenis dan stadium penyakit. Setiap klasifikasi disertai skor kepercayaan terukur secara ilmiah.',
    image: '/grid-3.jpg',
  },
];

const ZoomShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];

      if (!section || !wrapper || panels.length === 0) return;

      // Set initial states: first visible, others scaled down
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          scale: i === 0 ? 1 : 0.15,
          opacity: i === 0 ? 1 : 0,
          zIndex: panels.length - i,
        });
      });

      // Create pinned scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${panels.length * 120}%`,
          pin: wrapper,
          pinSpacing: true,
          scrub: 1.5,
        },
      });

      const totalPanels = panels.length;
      const segmentSize = 1 / totalPanels;

      panels.forEach((panel, i) => {
        if (i < totalPanels - 1) {
          // Current panel zooms past viewer and fades
          tl.to(
            panel,
            {
              scale: 2.5,
              opacity: 0,
              ease: 'none',
              duration: segmentSize * 0.6,
            },
            i * segmentSize + segmentSize * 0.4
          );

          // Next panel scales up from center
          tl.to(
            panels[i + 1],
            {
              scale: 1,
              opacity: 1,
              ease: 'none',
              duration: segmentSize * 0.6,
            },
            i * segmentSize + segmentSize * 0.4
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-background">
      <div
        ref={wrapperRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Section label */}
        <div className="absolute top-8 left-0 right-0 z-20 text-center">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-foreground/30">
            Process Pipeline
          </span>
        </div>

        {/* Phase counter */}
        <div className="absolute bottom-8 left-0 right-0 z-20 text-center">
          <span className="font-body text-[0.55rem] uppercase tracking-[0.4em] text-foreground/20">
            Scroll to explore
          </span>
        </div>

        {/* Panels */}
        {stages.map((stage, index) => (
          <div
            key={index}
            ref={(el) => {
              panelsRef.current[index] = el;
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[85vw] md:w-[70vw] max-w-4xl aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={stage.image}
                alt={stage.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-display text-3xl md:text-5xl text-white/20 italic">
                    {stage.number}
                  </span>
                  <div className="w-10 h-px bg-white/30" />
                </div>
                <h3 className="font-display text-2xl md:text-4xl text-white tracking-tight mb-3">
                  {stage.title}
                </h3>
                <p className="font-prose text-sm md:text-base text-white/70 max-w-lg leading-[1.8] italic">
                  {stage.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ZoomShowcase;
