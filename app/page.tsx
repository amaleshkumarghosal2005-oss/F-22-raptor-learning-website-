'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import RaptorScrollSequence from '@/components/RaptorScrollSequence';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <main ref={containerRef} className="relative w-full h-[400vh] bg-[#050505]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Canvas Animation */}
        <div className="absolute inset-0 z-0">
          <RaptorScrollSequence scrollYProgress={scrollYProgress} />
        </div>

        {/* Overlays Wrapper */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Beat A: 0-20% */}
          <OverlayBeat 
            scrollYProgress={scrollYProgress}
            start={0.0}
            end={0.2}
            className="flex flex-col items-center justify-center text-center h-full"
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tight text-white/90 mb-4 uppercase">
              Air Dominance
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light">
              Experience the pinnacle of fifth-generation stealth.
            </p>
          </OverlayBeat>

          {/* Beat B: 25-45% */}
          <OverlayBeat 
            scrollYProgress={scrollYProgress}
            start={0.25}
            end={0.45}
            className="flex flex-col justify-center h-full px-8 md:px-24"
          >
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-4 uppercase">
                Supercruise Propulsion
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-light">
                Dual Pratt & Whitney F119 engines with 2D thrust vectoring.
              </p>
            </div>
          </OverlayBeat>

          {/* Beat C: 50-70% */}
          <OverlayBeat 
            scrollYProgress={scrollYProgress}
            start={0.5}
            end={0.7}
            className="flex flex-col justify-center items-end text-right h-full px-8 md:px-24"
          >
            <div className="max-w-xl">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white/90 mb-4 uppercase">
                Concealed Lethality
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-light">
                Internal weapons bays maintain a radar cross-section the size of a marble.
              </p>
            </div>
          </OverlayBeat>

          {/* Beat D: 75-95% */}
          <OverlayBeat 
            scrollYProgress={scrollYProgress}
            start={0.75}
            end={0.95}
            className="flex flex-col items-center justify-center text-center h-full"
          >
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 mb-6 uppercase">
              Stealth Perfected
            </h2>
            <p className="text-xl md:text-2xl text-white/60 font-light mb-12">
              The ultimate air superiority fighter.
            </p>
            <button className="pointer-events-auto px-8 py-4 bg-white text-black font-semibold tracking-widest uppercase text-sm hover:bg-white/90 transition-colors">
              Pre-order Now
            </button>
          </OverlayBeat>
        </div>
      </div>
    </main>
  );
}

interface OverlayBeatProps {
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  className?: string;
  children: React.ReactNode;
}

function OverlayBeat({ scrollYProgress, start, end, className, children }: OverlayBeatProps) {
  // Fade in over first 10% of the range (which means 0.1 of the TOTAL progress, or 10% of the beat?)
  // The prompt says: [start, start + 0.1, end - 0.1, end] -> [0, 1, 1, 0]
  const opacityMapping = [
    start, 
    Math.min(start + 0.1, end), 
    Math.max(end - 0.1, start), 
    end
  ];
  
  const opacity = useTransform(scrollYProgress, opacityMapping, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, opacityMapping, [20, 0, 0, -20]);

  return (
    <motion.div 
      className={`absolute inset-0 ${className || ''}`}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  );
}
