import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import ZoomShowcase from '../sections/ZoomShowcase';

gsap.registerPlugin(ScrollTrigger);

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeInOut' as const }
  }
};

const Craft = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  const crafts = [
    {
      title: 'Perangkat Keras',
      desc: 'Raspberry Pi 4 Model B dirakit dalam casing pelindung yang tahan banting. Pusat komputasi independen di lapangan.',
      img: '/card-1.jpg',
      bgColor: 'bg-background',
      textColor: 'text-foreground'
    },
    {
      title: 'Vision AI',
      desc: 'Kamera mikroskopik menangkap detail terkecil dari lesi daun. Mengartikulasikan dunia biologis ke dalam data biner.',
      img: '/card-2.jpg',
      bgColor: 'bg-foreground',
      textColor: 'text-background' 
    },
    {
      title: 'Algoritma Analitik',
      desc: 'Integrasi arsitektur U-Net dan EfficientNet untuk pengenalan pola yang presisi, diuji langsung di lahan pertanian.',
      img: '/card-3.jpg',
      bgColor: 'bg-background',
      textColor: 'text-foreground'
    },
    {
      title: 'Penerapan Mandiri',
      desc: 'Semua komputasi dilakukan secara lokal menggunakan format TensorFlow Lite. Memastikan latensi rendah tanpa koneksi awan.',
      img: '/hero-bg.jpg',
      bgColor: 'bg-foreground',
      textColor: 'text-background'
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Stacked Pinning Effect
      const panels = panelsRef.current.filter((p): p is HTMLDivElement => !!p);
      panels.forEach((panel, i) => {
        if (i !== panels.length - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false,
          });
          
          const overlay = panel.querySelector('.darken-overlay');
          gsap.to(overlay, {
            opacity: 0.7,
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: true,
            }
          });

          const content = panel.querySelector('.panel-content');
          gsap.to(content, {
            scale: 0.95, // Less scale for mobile stability
            y: -30,
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: () => `+=${window.innerHeight}`,
              scrub: true,
            }
          });
        }
      });

      // Parallax Grid Reveal
      const galleryItems = galleryRef.current?.querySelectorAll('.gallery-item');
      if (galleryItems) {
        galleryItems.forEach((item, index) => {
          gsap.fromTo(item, 
            { y: index % 2 === 0 ? 50 : 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: galleryRef.current,
                start: "top 90%",
                end: "center center",
                scrub: 1.5,
              }
            }
          );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-background text-foreground overflow-x-hidden"
    >
      <div className="pt-32 pb-16 md:pb-20 px-6 max-w-5xl mx-auto text-center min-h-[50vh] flex flex-col justify-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[16vw] md:text-[8vw] leading-none mb-6 tracking-tighter"
        >
          Metodologi
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-prose text-foreground/70 max-w-xl mx-auto text-base md:text-lg leading-[1.85] italic"
        >
          Sebuah dedikasi pada presisi ilmiah. ARISA meramu rekayasa komputasi mutakhir dengan pendekatan agronomis yang sangat dihormati.
        </motion.p>
      </div>

      {/* Stacked Panels - MOBILE OPTIMIZED */}
      <div className="relative w-full">
        {crafts.map((craft, i) => (
          <div 
            key={i}
            ref={(el) => { panelsRef.current[i] = el; }}
            className={`w-full h-screen md:h-screen sticky top-0 overflow-hidden shadow-2xl ${craft.bgColor} ${craft.textColor} border-t border-foreground/5`}
          >
            <div className="darken-overlay absolute inset-0 bg-black opacity-0 z-20 pointer-events-none" />
            
            <div className="panel-content w-full h-full flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center h-1/2 md:h-full z-10">
                <span className="font-body opacity-50 uppercase tracking-[0.3em] text-[10px] md:text-sm mb-2 md:mb-4">
                  0{i + 1} // Medium
                </span>
                <h2 className="font-display text-4xl md:text-7xl mb-4 md:mb-6 tracking-tighter">{craft.title}</h2>
                <p className="font-prose opacity-80 text-sm md:text-base max-w-md leading-[1.85] italic">
                  {craft.desc}
                </p>
              </div>
              
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                <img 
                  src={craft.img} 
                  alt={craft.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Materials Deep Dive */}
      <section className="py-24 md:py-48 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div className="space-y-10 md:space-y-16 order-2 lg:order-1">
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-display text-5xl md:text-8xl tracking-tighter">Esensi <br/> Data.</h2>
                <p className="font-prose text-base md:text-lg text-foreground/70 leading-[1.85] italic">
                  Dataset kami dibangun perlahan, divalidasi lapis demi lapis bersama Balai Penyuluhan Pertanian setempat untuk melacak rekam jejak agronomi yang otentik.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                  <h4 className="font-display text-xl md:text-2xl mb-2">Anotasi Piksel</h4>
                  <p className="font-prose text-xs md:text-sm text-foreground/60 italic">Tiap citra daun diisolasi menggunakan perangkat lunak presisi agar lesi tak luput terhitung.</p>
                </div>
                <div>
                  <h4 className="font-display text-xl md:text-2xl mb-2">Optimasi Edge</h4>
                  <p className="font-prose text-xs md:text-sm text-foreground/60 italic">Model dilatih kemudian diformulasikan ke kuantisasi terendah agar irit daya, namun tetap presisi.</p>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 w-full max-w-md lg:max-w-none mx-auto">
              <div className="aspect-square rounded-[40px] md:rounded-[100px] overflow-hidden rotate-3 shadow-2xl">
                <img src="/breath-bg.jpg" alt="Texture" className="w-full h-full object-cover scale-125" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Ritual */}
      <section className="py-24 md:py-48 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-6 text-left md:text-center">
          <h2 className="font-display text-4xl md:text-8xl mb-12 md:mb-24 tracking-tighter">Algoritma.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {[
              { t: "Akuisisi", d: "Menyerap data visual dari daun padi dalam fraksi detik." },
              { t: "Segmentasi", d: "U-Net mengisolasi wilayah yang terinfeksi patogen." },
              { t: "Keputusan", d: "Interpretasi klasifikasi untuk tindakan agronomi segera." }
            ].map((step, i) => (
              <div key={i}>
                <span className="text-primary font-display text-2xl md:text-4xl mb-4 md:mb-8 block italic">0{i+1}. {step.t}</span>
                <p className="font-prose text-background/70 text-sm md:text-base leading-relaxed italic">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-Driven Zoom Scale Showcase - Process Pipeline */}
      <ZoomShowcase />
      
      {/* Gallery */}
      <section ref={galleryRef} className="py-20 md:py-48 bg-background relative z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-32">
            <h2 className="font-display text-4xl md:text-7xl tracking-tighter mb-4">Presisi dalam <br className="md:hidden"/> Kesederhanaan.</h2>
            <p className="font-prose text-sm md:text-lg text-foreground/70 max-w-xl italic">Dari kerumitan matematika jaringan saraf menjadi sekian baris instruksi arif bagi sang petani.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
            <div className="gallery-item aspect-[4/5] rounded-tl-[40px] md:rounded-tl-[100px] overflow-hidden">
              <img src="/grid-1.jpg" className="w-full h-full object-cover" alt="Craft 1" loading="lazy" />
            </div>
            <div className="gallery-item aspect-[3/4] md:mt-32 rounded-br-[40px] md:rounded-br-[100px] overflow-hidden">
              <img src="/grid-2.jpg" className="w-full h-full object-cover" alt="Craft 2" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Final Callout */}
      <section className="py-24 md:py-48 bg-background flex flex-col items-center justify-center relative z-30 px-6">
        <h2 className="font-display text-[15vw] md:text-[10vw] text-center leading-none uppercase tracking-tighter opacity-10 select-none">
          DIBUAT DENGAN PRESISI
        </h2>
        <div className="mt-8 md:mt-[-5vw] text-center">
           <p className="font-display text-2xl md:text-5xl tracking-tighter">Kemanusiaan menyertai inovasi, <br/> <span className="italic">ilmu menjawab tantangan.</span></p>
        </div>
      </section>
    </motion.div>
  );
};

export default Craft;
