import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardStackConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const CardStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);


  const cards = cardStackConfig.cards;

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !wrapper || cardElements.length === 0) return;

    // Set initial positions - cards start at screen center
    cardElements.forEach((card, index) => {
      gsap.set(card, {
        y: index === 0 ? 0 : window.innerHeight * 0.5,
        rotation: cards[index].rotation,
        opacity: index === 0 ? 1 : 0,
      });
    });

    // Create optimized pinned timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${cardElements.length * 100}%`,
        pin: wrapper,
        pinSpacing: true,
        scrub: 1,
      }
    });

    cardElements.forEach((card, index) => {
      if (index === 0) {
        // First card fades slightly
        tl.to(card, {
          opacity: 0.7,
          scale: 0.95,
          ease: 'none',
        }, 0);
      } else {
        // Other cards slide in sequentially
        tl.fromTo(card,
          { y: window.innerHeight * 0.8, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          (index - 1) / (cardElements.length - 1) // Stagger cards along the timeline
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === section) t.kill();
      });
    };
  }, []);

  if (!cardStackConfig.sectionTitle && cards.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background"
      style={{ minHeight: `${(cards.length + 1) * 100}vh` }}
    >
      {/* Section Header */}
      <div className="absolute top-0 left-0 right-0 py-12 md:py-16 text-center z-10">
        <h2 className="font-display text-headline text-foreground">
          {cardStackConfig.sectionTitle}
        </h2>
        <p className="font-body text-sm text-kaleo-terracotta uppercase tracking-[0.2em] mt-4">
          {cardStackConfig.sectionSubtitle}
        </p>
      </div>

      {/* Pinned Card Wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-4xl mx-auto px-6 md:px-8 aspect-[4/3]">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="absolute inset-0"
              style={{
                willChange: 'transform, opacity',
                zIndex: index,
              }}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-deep bg-kaleo-cream h-full">
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Image Overlay always dark to ensure white text is readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="font-prose text-base md:text-lg text-white/90 leading-[1.85] italic">
                    {card.description}
                  </p>
                </div>

                {/* Card Number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="font-body text-xs text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </section>
  );
};

export default CardStack;
