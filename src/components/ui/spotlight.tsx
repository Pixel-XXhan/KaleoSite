import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export const Spotlight = ({ className, fill = "white" }: SpotlightProps) => {
  return (
    <div
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] w-[150%] md:w-[138%] h-[150%] md:h-[169%] opacity-0",
        className
      )}
      style={{
        background: `radial-gradient(circle at center, ${fill} 0%, transparent 60%)`,
        mixBlendMode: "normal",
        filter: "blur(80px)",
        transform: "matrix(-0.82, -0.56, -0.56, 0.82, 0, 0)",
      }}
    />
  );
};
