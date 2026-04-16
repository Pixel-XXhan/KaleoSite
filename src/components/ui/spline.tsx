import { Suspense, lazy, memo } from "react";
import { cn } from "@/lib/utils";

// Optimized: Lazy load the heavy Spline runtime to prevent main-thread lag during transitions
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

// Optimized: Memoize the heavy 3D scene component
export const SplineScene = memo(({ scene, className }: SplineSceneProps) => {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-kaleo-sand/10 animate-pulse">
          Initializing 3D Environment...
        </div>
      }
    >
      <div className={cn("w-full h-full relative", className)}>
        <Spline 
          scene={scene} 
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </Suspense>
  );
});

SplineScene.displayName = "SplineScene";
