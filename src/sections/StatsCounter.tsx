import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wifi, ShieldAlert, FlaskConical, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  icon: React.ReactNode;
  value: string;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: StatItem[] = [
  {
    icon: <Leaf className="w-6 h-6" />,
    value: "15-40",
    suffix: "%",
    label: "Potensi Kerugian Panen",
    sublabel: "Dapat dicegah melalui deteksi dini berbasis citra (Mardatila, 2020)",
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    value: "0",
    suffix: " Byte",
    label: "Kebutuhan Internet",
    sublabel: "Seluruh inferensi berjalan lokal di perangkat Edge-AI",
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    value: "3",
    suffix: " Level",
    label: "Klasifikasi Risiko",
    sublabel: "Rendah, Sedang, Tinggi - berdasarkan skor DSI",
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    value: "50",
    suffix: "+",
    label: "Sampel Uji Lapangan",
    sublabel: "Divalidasi langsung di sawah mitra Kec. Margaasih",
  },
];

function AnimatedNumber({ target, suffix, triggered }: { target: string; suffix: string; triggered: boolean }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!triggered) return;
    if (target.includes("-")) {
      setDisplay(target);
      return;
    }
    const num = parseInt(target);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: num,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        setDisplay(Math.round(obj.val).toString());
      },
    });
  }, [triggered, target]);

  return (
    <span className="tabular-nums">
      {display}<span className="text-foreground/70">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => setTriggered(true),
    });
    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-muted/50 text-foreground overflow-hidden border-y border-border"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-kaleo-terracotta mb-4 block">
            Ringkasan Data
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight">
            Angka-Angka <span className="italic">Kunci</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-border bg-background p-8 hover:border-foreground/20 transition-all duration-500"
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center mb-6 text-kaleo-terracotta group-hover:border-foreground/20 transition-all duration-500">
                  {stat.icon}
                </div>

                {/* Value */}
                <div className="font-display text-4xl md:text-5xl tracking-tight mb-3">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} triggered={triggered} />
                </div>

                {/* Label */}
                <h3 className="font-body text-sm font-medium mb-2">{stat.label}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
