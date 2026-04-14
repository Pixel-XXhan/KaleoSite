import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};

const Journey = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);
  const largeTextRef = useRef<HTMLHeadingElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal Scroll
      const section = horizontalSectionRef.current;
      const wrapper = horizontalWrapperRef.current;

      if (section && wrapper) {
        const getScrollAmount = () => {
          let wrapperWidth = wrapper.scrollWidth;
          return -(wrapperWidth - window.innerWidth);
        };

        gsap.to(wrapper, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerWidth * 3}`, 
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }

      // Marquee Text
      if (largeTextRef.current) {
        gsap.fromTo(largeTextRef.current,
          { x: '10%' },
          {
            x: '-30%',
            scrollTrigger: {
              trigger: largeTextRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            }
          }
        );
      }

      // Parallax Spotlight
      if (parallaxImgRef.current) {
        gsap.to(parallaxImgRef.current.querySelector('img'), {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: parallaxImgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scenes = [
    { title: "Embun Pagi", d: "Suhu dingin dan bias cahaya pagi menguji sensor kalibrasi model.", img: "/grid-1.jpg" },
    { title: "Terik Mentari", d: "Adaptasi Edge-AI untuk beroperasi tanpa henti dalam intensitas cuaca panas.", img: "/grid-2.jpg" },
    { title: "Kanopi Rapat", d: "Identifikasi lesi pada daun padi di bawah rimbunnya jarak tanam rapat jajar legowo.", img: "/grid-3.jpg" },
    { title: "Mendung Senja", d: "Akurasi segmentasi tetap stabil walaupun intensitas dan spektrum sinar menurun tajam.", img: "/grid-4.jpg" }
  ];

  return (
    <motion.div 
      ref={containerRef}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-background text-foreground min-h-screen overflow-x-hidden"
    >
      <div className="h-[80vh] md:h-screen flex flex-col items-center justify-center px-6 text-center">
        <span className="font-body text-foreground/60 uppercase tracking-[0.3em] text-[10px] mb-4 block">Uji Lapangan</span>
        <h1 className="font-display text-[16vw] md:text-[14vw] leading-none mb-6 tracking-tighter">
          Eksplorasi Nyata
        </h1>
        <p className="font-body text-foreground/70 max-w-xl text-sm md:text-xl leading-relaxed">
          Laboratorium kami adalah realitas. Sistem ARISA menjelajahi variabilitas ekosistem padi untuk memastikan teknologi Artificial Intelligence mampu beradaptasi pada segala skenario operasional.
        </p>
      </div>

      <section className="py-24 md:py-48 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="order-2 md:order-1 space-y-8 md:space-y-12">
                <h2 className="font-display text-4xl md:text-7xl tracking-tighter">Catatan <br/> Lapangan.</h2>
                <div className="space-y-6 md:space-y-8 font-body text-base md:text-lg leading-relaxed text-foreground/60">
                    <p>"Raspberry Pi pada pukul 2 siang—suhu sistem stabil optimal, berkat modul fan khusus."</p>
                    <p>"Bercak hawar daun terdeteksi bahkan di balik bayangan rumput ilalang pelindung tanah."</p>
                </div>
            </div>
            <div className="order-1 md:order-2">
                <div ref={parallaxImgRef} className="relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
                    <img src="/breath-bg.jpg" className="absolute inset-x-0 top-0 w-full h-[120%] object-cover" alt="Journey" />
                </div>
            </div>
        </div>
      </section>

      <section ref={horizontalSectionRef} className="h-screen w-full overflow-hidden bg-background border-y border-foreground/10 relative flex items-center">
        <div ref={horizontalWrapperRef} className="flex h-[70vh] items-center gap-10 md:gap-32 px-6 md:px-32 w-[fit-content]">
          {scenes.map((scene, i) => (
            <div key={i} className="flex-shrink-0 w-[85vw] md:w-[60vw] max-w-[800px] h-full flex flex-col justify-center">
              <div className="relative w-full h-1/2 md:h-2/3 overflow-hidden rounded-lg shadow-lg mb-6">
                <img src={scene.img} className="w-full h-full object-cover" alt={scene.title} />
              </div>
              <h2 className="font-display text-3xl md:text-6xl mb-2 tracking-tighter">{scene.title}</h2>
              <p className="font-body text-foreground/60 text-sm md:text-lg leading-relaxed">{scene.d}</p>
            </div>
          ))}
          <div className="w-[10vw]" />
        </div>
      </section>

      <section className="py-24 md:py-48 px-6 bg-foreground text-background text-center">
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-display text-4xl md:text-7xl tracking-tighter italic">"Membaca isyarat tanaman."</h2>
            <p className="font-body text-base md:text-2xl text-background/70 leading-relaxed font-light">
                Kami mengubah bahasa biologis daun menjadi angka risiko yang menyelamatkan iklim ketahanan pangan.
            </p>
        </div>
      </section>

      <section className="py-24 md:py-48 overflow-hidden bg-background relative flex flex-col items-center min-h-[60vh] md:min-h-[80vh] justify-center px-6">
        <h2 ref={largeTextRef} className="font-display text-[25vw] md:text-[20vw] leading-none whitespace-nowrap text-foreground opacity-5 uppercase tracking-tighter absolute select-none pointer-events-none">
          DEDIKASI PERTANIAN
        </h2>
        <div className="max-w-xl mx-auto text-center space-y-8 relative z-10">
          <h3 className="font-display text-4xl md:text-8xl tracking-tighter">Berkolaborasi?</h3>
          <p className="font-body text-base md:text-lg text-foreground/60 leading-relaxed">Bergabunglah dalam revolusi komputasi tepi dalam dunia agrikultur bersama kami.</p>
          <a href="/contact" className="inline-block px-10 py-5 border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all duration-500 font-display text-lg tracking-tight">
              Akses Sistem ARISA
          </a>
        </div>
      </section>
    </motion.div>
  );
};

export default Journey;
