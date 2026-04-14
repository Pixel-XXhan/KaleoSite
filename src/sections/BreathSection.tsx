import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { breathSectionConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const BreathSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const text = textRef.current;
      const subtitle = subtitleRef.current;

      if (!section || !container || !text || !subtitle) return;

      // Initial state
      gsap.set(container, { scale: 0.85, borderRadius: '60px' });
      gsap.set(text, { opacity: 0, scale: 1.1 });
      gsap.set(subtitle, { opacity: 0, y: 20 });

      // Scale up animation on scroll
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'center center',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;

          // Container scale and border radius
          gsap.set(container, {
            scale: 0.85 + progress * 0.15,
            borderRadius: `${60 - progress * 40}px`,
          });

          // Text reveal
          gsap.set(text, {
            opacity: progress,
            scale: 1.1 - progress * 0.1,
          });

          // Subtitle reveal
          if (progress > 0.4) {
            const subtitleProgress = (progress - 0.4) * 1.66;
            gsap.set(subtitle, {
              opacity: Math.min(subtitleProgress, 1),
              y: 20 - Math.min(subtitleProgress, 1) * 20,
            });
          }
        },
      });

      triggerRef.current = trigger;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!breathSectionConfig.title && !breathSectionConfig.backgroundImage) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-background"
    >
      <div className="px-4 md:px-8">
        <div
          ref={containerRef}
          className="relative w-full max-w-7xl mx-auto overflow-hidden shadow-2xl"
          style={{ willChange: 'transform, border-radius' }}
        >
          {/* Background Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <img
              src={breathSectionConfig.backgroundImage}
              alt={breathSectionConfig.backgroundAlt}
              className="w-full h-full object-cover"
            />

            {/* Solid fixed overlay to guarantee text contrast regardless of theme */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content OVER the image is always white */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h2
                ref={textRef}
                className="font-display text-4xl md:text-7xl lg:text-[7rem] text-white tracking-tight"
                style={{
                  willChange: 'transform, opacity',
                  textShadow: '0 4px 30px rgba(0,0,0,0.5)'
                }}
              >
                {breathSectionConfig.title}
              </h2>
              <p
                ref={subtitleRef}
                className="font-body text-white/80 text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.5em] mt-6 drop-shadow-md"
                style={{ willChange: 'transform, opacity' }}
              >
                {breathSectionConfig.subtitle}
              </p>
            </div>

            {/* Subtle gradient edges inside the frame */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      {breathSectionConfig.description && (
        <div className="max-w-4xl mx-auto px-6 md:px-8 mt-24 md:mt-32 text-center">
          <p className="font-body text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {breathSectionConfig.description}
          </p>
        </div>
      )}
    </section>
  );
};

export default BreathSection;
