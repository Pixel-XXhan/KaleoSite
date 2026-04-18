import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { motion } from "framer-motion";


// --- Animasi Mata Bawaan ---
interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full shadow-inner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full shadow-sm"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};
// --- Batas Animasi ---

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocusedOnMessage, setIsFocusedOnMessage] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  useEffect(() => {
    if (isFocusedOnMessage) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(() => {
          setIsPurplePeeking(true);
          setTimeout(() => {
            setIsPurplePeeking(false);
          }, 800);
        }, Math.random() * 3000 + 2000);
        return peekInterval;
      };
      const firstPeek = schedulePeek();
      return () => clearTimeout(firstPeek);
    } else {
      setIsPurplePeeking(false);
    }
  }, [isFocusedOnMessage, isPurplePeeking]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (name && email && message) {
      setSuccess("Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setError("Silakan isi semua field yang tersedia.");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-transparent text-foreground font-body w-full relative">
      
      {/* Intro Hero Section (Scroll first) */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-kaleo-terracotta/40 hidden md:block"></span>
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] font-medium text-kaleo-terracotta">
              Menyapa Kami
            </span>
            <span className="h-px w-8 bg-kaleo-terracotta/40 hidden md:block"></span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-medium text-foreground tracking-tight leading-tight">
            Mari Bicarakan <br className="hidden sm:block" /> 
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-kaleo-terracotta to-kaleo-earth dark:from-white dark:to-kaleo-terracotta">
              Masa Depan.
            </span>
          </h1>
          
          <p className="mt-8 text-base font-prose text-muted-foreground/80 max-w-xl mx-auto leading-[1.85] italic">
            Hubungi kami untuk mengeksplorasi potensi Agronomi Presisi dan sistem cerdas dalam ekosistem perladangan Anda. Kami menyimak.
          </p>
        </motion.div>
      </div>

      {/* Main Container Form */}
      <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 overflow-hidden transition-colors duration-500 pb-32">
        {/* Ambient Background Orbs */}
        <div className="absolute top-[10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-orange-500/5 dark:bg-orange-500/10 blur-[120px] pointer-events-none" />
        
        {/* Main Glass Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1200px] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-border/60 dark:border-white/[0.05] rounded-[2.5rem] overflow-hidden shadow-soft dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row relative z-10 transition-colors duration-500"
        >
          {/* Left Content Section (Stage) */}
          <div className="relative hidden lg:flex w-[55%] p-12 flex-col justify-between overflow-hidden border-r border-border/40 dark:border-white/[0.05] transition-colors duration-500">
            {/* Nav Removed Kaleo References */}
            <div className="relative z-20 flex gap-4">
               <div className="h-px w-12 bg-white/20 mt-3" />
               <p className="text-sm tracking-widest text-foreground/40 uppercase">Sambung Rasa</p>
            </div>

            <div className="relative z-20 flex items-end justify-center h-[450px] mt-10">
              {/* Glowing Floor Stage */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[30px] bg-white/50 dark:bg-white/10 blur-2xl rounded-[100%] transition-colors duration-500" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[10px] bg-primary/20 dark:bg-purple-500/30 blur-md rounded-[100%] transition-colors duration-500" />

              {/* Cartoon Characters - Colorful */}
              <div className="relative" style={{ width: '550px', height: '400px' }}>
                {/* Purple character */}
                <div 
                  ref={purpleRef}
                  className="absolute bottom-0 transition-all duration-700 ease-in-out shadow-[inset_0_0_40px_rgba(0,0,0,0.2),0_20px_40px_rgba(0,0,0,0.4)]"
                  style={{
                    left: '70px',
                    width: '180px',
                    height: (isTyping || isFocusedOnMessage) ? '440px' : '400px',
                    backgroundColor: '#6C3FF5',
                    backgroundImage: 'linear-gradient(180deg, #8155FF 0%, #5B2CE0 100%)',
                    borderRadius: '16px 16px 0 0',
                    zIndex: 1,
                    transform: isFocusedOnMessage
                      ? `skewX(0deg)`
                      : (isTyping)
                        ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)` 
                        : `skewX(${purplePos.bodySkew || 0}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                >
                  <div 
                    className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                    style={{
                      left: isFocusedOnMessage ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + purplePos.faceX}px`,
                      top: isFocusedOnMessage ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + purplePos.faceY}px`,
                    }}
                  >
                    <EyeBall 
                      size={20} 
                      pupilSize={8} 
                      maxDistance={6} 
                      eyeColor="white" 
                      pupilColor="#1A1A1A" 
                      isBlinking={isPurpleBlinking}
                      forceLookX={isFocusedOnMessage ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                      forceLookY={isFocusedOnMessage ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                    />
                    <EyeBall 
                      size={20} 
                      pupilSize={8} 
                      maxDistance={6} 
                      eyeColor="white" 
                      pupilColor="#1A1A1A" 
                      isBlinking={isPurpleBlinking}
                      forceLookX={isFocusedOnMessage ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                      forceLookY={isFocusedOnMessage ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                    />
                  </div>
                </div>

                {/* Black character */}
                <div 
                  ref={blackRef}
                  className="absolute bottom-0 transition-all duration-700 ease-in-out shadow-[inset_0_0_30px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)]"
                  style={{
                    left: '240px',
                    width: '120px',
                    height: '310px',
                    backgroundColor: '#1A1A1A',
                    backgroundImage: 'linear-gradient(180deg, #2A2A2A 0%, #111111 100%)',
                    borderRadius: '12px 12px 0 0',
                    zIndex: 2,
                    transform: isFocusedOnMessage
                      ? `skewX(0deg)`
                      : isLookingAtEachOther
                        ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                        : (isTyping)
                          ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)` 
                          : `skewX(${blackPos.bodySkew || 0}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                >
                  <div 
                    className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                    style={{
                      left: isFocusedOnMessage ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + blackPos.faceX}px`,
                      top: isFocusedOnMessage ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + blackPos.faceY}px`,
                    }}
                  >
                    <EyeBall 
                      size={18} 
                      pupilSize={7} 
                      maxDistance={5} 
                      eyeColor="white" 
                      pupilColor="#1A1A1A" 
                      isBlinking={isBlackBlinking}
                      forceLookX={isFocusedOnMessage ? -4 : isLookingAtEachOther ? 0 : undefined}
                      forceLookY={isFocusedOnMessage ? -4 : isLookingAtEachOther ? -4 : undefined}
                    />
                    <EyeBall 
                      size={18} 
                      pupilSize={7} 
                      maxDistance={5} 
                      eyeColor="white" 
                      pupilColor="#1A1A1A" 
                      isBlinking={isBlackBlinking}
                      forceLookX={isFocusedOnMessage ? -4 : isLookingAtEachOther ? 0 : undefined}
                      forceLookY={isFocusedOnMessage ? -4 : isLookingAtEachOther ? -4 : undefined}
                    />
                  </div>
                </div>

                {/* Orange character */}
                <div 
                  ref={orangeRef}
                  className="absolute bottom-0 transition-all duration-700 ease-in-out shadow-[inset_0_0_40px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.4)]"
                  style={{
                    left: '0px',
                    width: '240px',
                    height: '200px',
                    zIndex: 3,
                    backgroundColor: '#FF9B6B',
                    backgroundImage: 'linear-gradient(180deg, #FFB08A 0%, #E87A45 100%)',
                    borderRadius: '120px 120px 0 0',
                    transform: isFocusedOnMessage ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                >
                  <div 
                    className="absolute flex gap-8 transition-all duration-200 ease-out"
                    style={{
                      left: isFocusedOnMessage ? `${50}px` : `${82 + (orangePos.faceX || 0)}px`,
                      top: isFocusedOnMessage ? `${85}px` : `${90 + (orangePos.faceY || 0)}px`,
                    }}
                  >
                    <Pupil size={14} maxDistance={6} pupilColor="#1A1A1A" forceLookX={isFocusedOnMessage ? -5 : undefined} forceLookY={isFocusedOnMessage ? -4 : undefined} />
                    <Pupil size={14} maxDistance={6} pupilColor="#1A1A1A" forceLookX={isFocusedOnMessage ? -5 : undefined} forceLookY={isFocusedOnMessage ? -4 : undefined} />
                  </div>
                </div>

                {/* Yellow character */}
                <div 
                  ref={yellowRef}
                  className="absolute bottom-0 transition-all duration-700 ease-in-out shadow-[inset_0_0_30px_rgba(255,255,255,0.3),0_20px_40px_rgba(0,0,0,0.4)]"
                  style={{
                    left: '310px',
                    width: '140px',
                    height: '230px',
                    backgroundColor: '#E8D754',
                    backgroundImage: 'linear-gradient(180deg, #F9E96A 0%, #D1C03A 100%)',
                    borderRadius: '70px 70px 0 0',
                    zIndex: 4,
                    transform: isFocusedOnMessage ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                >
                  <div 
                    className="absolute flex gap-6 transition-all duration-200 ease-out"
                    style={{
                      left: isFocusedOnMessage ? `${20}px` : `${52 + (yellowPos.faceX || 0)}px`,
                      top: isFocusedOnMessage ? `${35}px` : `${40 + (yellowPos.faceY || 0)}px`,
                    }}
                  >
                    <Pupil size={14} maxDistance={6} pupilColor="#1A1A1A" forceLookX={isFocusedOnMessage ? -5 : undefined} forceLookY={isFocusedOnMessage ? -4 : undefined} />
                    <Pupil size={14} maxDistance={6} pupilColor="#1A1A1A" forceLookX={isFocusedOnMessage ? -5 : undefined} forceLookY={isFocusedOnMessage ? -4 : undefined} />
                  </div>
                  <div 
                    className="absolute w-20 h-[5px] bg-[#1A1A1A] rounded-full transition-all duration-200 ease-out shadow-inner"
                    style={{
                      left: isFocusedOnMessage ? `${10}px` : `${40 + (yellowPos.faceX || 0)}px`,
                      top: isFocusedOnMessage ? `${88}px` : `${88 + (yellowPos.faceY || 0)}px`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="relative z-20 flex items-center gap-8 text-sm text-foreground/50 font-medium">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <a href="/story" className="hover:text-primary transition-colors">Research</a>
              <a href="/craft" className="hover:text-primary transition-colors">Method</a>
            </div>
          </div>

          {/* Right Contact Section */}
          <div className="w-full lg:w-[45%] p-8 sm:p-12 lg:p-16 bg-white/20 dark:bg-black/40 flex flex-col justify-center relative transition-colors duration-500">
            <div className="w-full max-w-[400px] mx-auto">
              
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-display font-bold tracking-tight mb-3 text-foreground">
                  Kirim Pesan
                </h2>
                <p className="text-muted-foreground text-sm">Gagasan Anda siap kami terima.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground/80 ml-1">Nama Lengkap</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Budi Santoso"
                    value={name}
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="h-12 bg-background/60 dark:bg-background/20 border-border/80 dark:border-white/10 text-foreground placeholder:text-muted-foreground focus:bg-background dark:focus:bg-background/40 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all duration-300 px-4 text-base shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground/80 ml-1">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="budi@example.com"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    required
                    className="h-12 bg-background/60 dark:bg-background/20 border-border/80 dark:border-white/10 text-foreground placeholder:text-muted-foreground focus:bg-background dark:focus:bg-background/40 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all duration-300 px-4 text-base shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground/80 ml-1">Pesan</Label>
                  <Textarea
                    id="message"
                    placeholder="Jelaskan kebutuhan..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setIsFocusedOnMessage(true)}
                    onBlur={() => setIsFocusedOnMessage(false)}
                    required
                    className="min-h-[100px] bg-background/60 dark:bg-background/20 border-border/80 dark:border-white/10 text-foreground placeholder:text-muted-foreground focus:bg-background dark:focus:bg-background/40 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl transition-all duration-300 p-4 text-base resize-y shadow-sm"
                  />
                </div>

                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    {success}
                  </div>
                )}

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="size-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Mengirim...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="size-4" />
                        Kirim Pesan
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
