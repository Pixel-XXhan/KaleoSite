import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isFirstVisit] = useState(() => {
    // Only show the big entrance animation on first page load ever
    if (sessionStorage.getItem('arisa-hero-seen')) return false;
    sessionStorage.setItem('arisa-hero-seen', 'true');
    return true;
  });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;

    if (!section || !title || !subtitle || !image || !overlay) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // ─── Entrance Animation ───
      // Only play the big cinematic entrance on very first page load.
      // On route changes back to Home, elements are already visible
      // and the Framer Motion page fade handles the transition.
      if (isFirstVisit) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          image,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2 }
        )
        .fromTo(
          title,
          { scale: 1.05, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5 },
          '-=1.5'
        )
        .fromTo(
          subtitle,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.8'
        );
      }

      // ─── Scroll-Driven Parallax (always active) ───
      // Image parallax: moves down as you scroll
      gsap.to(image, {
        y: isMobile ? 60 : 150,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Overlay darkens as you scroll
      gsap.to(overlay, {
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // ─── Text Fade on Scroll (BIDIRECTIONAL) ───
      // CRITICAL: Using `fromTo` ensures the animation is fully reversible.
      // Without explicit "from" values, GSAP can't reverse back to the original state
      // when scrubbing backwards (scrolling up), causing text to permanently disappear.
      gsap.fromTo(
        [title, subtitle],
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '50% top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [isFirstVisit]);

  if (!heroConfig.title && !heroConfig.backgroundImage) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroConfig.backgroundImage}
          alt={heroConfig.backgroundAlt}
          className="w-full h-full object-cover md:ken-burns"
          loading="eager"
        />
      </div>

      {/* Gradient overlay for depth */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-kaleo-charcoal opacity-0"
      />

      {/* Subtle fog effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-kaleo-sand/20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-display text-kaleo-cream text-display tracking-tight select-none"
          style={{
            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          {heroConfig.title}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-kaleo-cream/90 text-sm md:text-base uppercase tracking-[0.3em] mt-6"
        >
          {heroConfig.subtitle}
        </p>
      </div>

      {/* Bottom gradient for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kaleo-sand to-transparent" />
    </section>
  );
};

export default Hero;
