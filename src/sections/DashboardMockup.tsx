import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Wifi, Leaf, AlertTriangle, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

interface DashboardData {
  stadium: string;
  dsi: number;
  risk: 'low' | 'medium' | 'high';
  riskLabel: string;
  riskColor: string;
  riskBg: string;
  riskIcon: React.ReactNode;
  suggestion: string;
  blockName: string;
  timestamp: string;
}

const dashboardStates: DashboardData[] = [
  {
    stadium: "Vegetatif",
    dsi: 5.2,
    risk: 'low',
    riskLabel: "Aman",
    riskColor: "text-emerald-400",
    riskBg: "bg-emerald-500/20",
    riskIcon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    suggestion: "Kondisi tanaman sehat. Lanjutkan pemantauan rutin sesuai jadwal.",
    blockName: "Blok A-1",
    timestamp: "14 Mei 2026, 09:32 WIB",
  },
  {
    stadium: "Pembentukan Malai",
    dsi: 22.8,
    risk: 'medium',
    riskLabel: "Perlu Perhatian",
    riskColor: "text-amber-400",
    riskBg: "bg-amber-500/20",
    riskIcon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    suggestion: "Gejala awal hawar daun terdeteksi. Monitor area ini lebih intensif dalam 48 jam ke depan.",
    blockName: "Blok B-3",
    timestamp: "14 Mei 2026, 09:45 WIB",
  },
  {
    stadium: "Vegetatif",
    dsi: 45.0,
    risk: 'high',
    riskLabel: "Tindakan Cepat",
    riskColor: "text-red-400",
    riskBg: "bg-red-500/20",
    riskIcon: <XCircle className="w-5 h-5 text-red-400" />,
    suggestion: "Risiko Tinggi terdeteksi pada blok C. Segera konsultasi dengan PPL untuk aplikasi fungisida/bakterisida.",
    blockName: "Blok C-2",
    timestamp: "14 Mei 2026, 10:01 WIB",
  },
];

function DSIGauge({ value, color }: { value: number; color: string }) {
  const angle = (value / 100) * 180;
  const radius = 70;
  const centerX = 80;
  const centerY = 80;

  const endX = centerX + radius * Math.cos(((180 - angle) * Math.PI) / 180);
  const endY = centerY - radius * Math.sin(((180 - angle) * Math.PI) / 180);

  const largeArc = angle > 180 ? 1 : 0;

  return (
    <svg width="160" height="90" viewBox="0 0 160 90" className="mx-auto">
      {/* Background arc */}
      <path
        d={`M 10 80 A 70 70 0 0 1 150 80`}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        className="text-white/10"
        strokeLinecap="round"
      />
      {/* Value arc */}
      <motion.path
        d={`M 10 80 A 70 70 0 ${largeArc} 1 ${endX} ${endY}`}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* Center value */}
      <text x="80" y="75" textAnchor="middle" className="fill-white font-display text-2xl">
        {value}%
      </text>
      <text x="80" y="88" textAnchor="middle" className="fill-white/40 font-body" fontSize="8">
        DSI Score
      </text>
    </svg>
  );
}

export default function DashboardMockup() {
  const [activeState, setActiveState] = useState(0);
  const data = dashboardStates[activeState];

  const gaugeColors: Record<string, string> = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  return (
    <section className="py-24 md:py-32 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-foreground/70 mb-4 block">
            Farmer Interface
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-4">
            Dashboard <span className="italic">Petani</span>
          </h2>
          <p className="font-prose text-foreground/70 max-w-xl mx-auto italic text-sm md:text-base">
            Tampilan yang dilihat petani di HP mereka saat terkoneksi ke WiFi lokal ARISA. Informasi kompleks disederhanakan menjadi aksi yang jelas.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center">
          {/* Phone Mockup */}
          <div className="relative">
            {/* Phone frame */}
            <div className="relative w-[300px] md:w-[340px] rounded-[2.5rem] bg-[#111] border-[6px] border-[#222] shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#111] rounded-b-2xl z-20" />

              {/* Screen content */}
              <div className="bg-gradient-to-b from-[#0a0f1a] to-[#0d1117] min-h-[580px] md:min-h-[640px] p-5 pt-8">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-6 text-white/40 text-[10px]">
                  <span className="font-body">ARISA Network</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" />
                    <span>Local</span>
                  </div>
                </div>

                {/* Logo area */}
                <div className="flex items-center gap-2 mb-6">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/80 font-body text-xs tracking-wider uppercase">ARISA Monitor</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeState}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Block name & timestamp */}
                    <div className="mb-4">
                      <h3 className="text-white font-display text-xl">{data.blockName}</h3>
                      <p className="text-white/30 font-body text-[10px] mt-1">{data.timestamp}</p>
                    </div>

                    {/* DSI Gauge */}
                    <div className="mb-4">
                      <DSIGauge value={data.dsi} color={gaugeColors[data.risk]} />
                    </div>

                    {/* Stadium */}
                    <div className="rounded-xl bg-white/5 p-3 mb-3 flex items-center gap-3">
                      <TrendingUp className="w-4 h-4 text-white/40" />
                      <div>
                        <span className="text-white/40 text-[9px] uppercase tracking-wider font-body block">Stadium Pertumbuhan</span>
                        <span className="text-white font-body text-sm">{data.stadium}</span>
                      </div>
                    </div>

                    {/* Risk Status */}
                    <div className={`rounded-xl ${data.riskBg} p-3 mb-3 flex items-center gap-3`}>
                      {data.riskIcon}
                      <div>
                        <span className="text-white/40 text-[9px] uppercase tracking-wider font-body block">Status Risiko</span>
                        <span className={`font-body text-sm font-medium ${data.riskColor}`}>{data.riskLabel}</span>
                      </div>
                    </div>

                    {/* Suggestion */}
                    <div className="rounded-xl bg-white/5 border border-white/5 p-3">
                      <span className="text-white/40 text-[9px] uppercase tracking-wider font-body block mb-1">Saran Tindakan</span>
                      <p className="text-white/70 font-body text-xs leading-relaxed">{data.suggestion}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/20" />
            </div>

            {/* Connection indicator */}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center z-30">
              <Wifi className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Scenario Selector */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            <h3 className="font-body text-xs uppercase tracking-[0.2em] text-foreground/70 mb-2">Pilih Skenario</h3>
            {dashboardStates.map((state, i) => (
              <button
                key={i}
                onClick={() => setActiveState(i)}
                className={`text-left p-5 rounded-2xl border transition-all duration-500 ${
                  activeState === i
                    ? 'border-foreground/20 bg-foreground/[0.03] shadow-soft'
                    : 'border-foreground/5 hover:border-foreground/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    state.risk === 'low' ? 'bg-emerald-500' : state.risk === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className="font-body text-sm font-medium">{state.blockName}</span>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-[0.6rem] uppercase tracking-wider font-body ${
                    state.risk === 'low' ? 'bg-emerald-500/10 text-emerald-600' : 
                    state.risk === 'medium' ? 'bg-amber-500/10 text-amber-600' : 
                    'bg-red-500/10 text-red-600'
                  }`}>
                    DSI {state.dsi}%
                  </span>
                </div>
                <p className="font-body text-xs text-foreground/70">{state.suggestion}</p>
              </button>
            ))}

            {/* Connection note */}
            <div className="flex items-center gap-2 mt-4 text-foreground/70">
              <Smartphone className="w-4 h-4" />
              <p className="font-body text-[10px]">
                Petani mengakses dashboard via WiFi lokal ARISA - tanpa pulsa atau paket data internet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
