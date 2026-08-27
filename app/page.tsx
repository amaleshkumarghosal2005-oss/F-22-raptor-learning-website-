'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useScroll, useSpring, useTransform, motion, MotionValue } from 'framer-motion';
import RaptorScrollSequence from '@/components/RaptorScrollSequence';
import { Compass, Activity, ArrowRight, ArrowUpRight, Terminal } from 'lucide-react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    mass: 0.15,
    restDelta: 0.0001
  });

  // Canvas smoothly fades out into the pure blank black page at the end of its sequence
  const canvasOpacity = useTransform(smoothProgress, [0.78, 0.88], [1, 0]);

  // Ambient aura fades out as well
  const auraOpacity = useTransform(smoothProgress, [0.75, 0.86], [0.35, 0]);

  return (
    <main ref={containerRef} className="relative w-full h-[650vh] bg-[#050505] text-white selection:bg-purple-500/30 selection:text-white">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">
        
        {/* Ethereal Purple & Cyan Ambient Aura */}
        <motion.div 
          style={{ opacity: auraOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[720px] h-[450px] sm:h-[720px] rounded-full bg-gradient-to-tr from-purple-900/40 via-fuchsia-600/20 to-cyan-500/25 blur-[140px] pointer-events-none -z-10" 
        />

        {/* 3D Canvas Jet Animation */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <RaptorScrollSequence 
            smoothProgress={smoothProgress} 
            canvasOpacity={canvasOpacity}
          />
        </div>

        {/* ========================================================================= */}
        {/* 0. HERO INTRO OVERLAY (0% - 15%) */}
        {/* ========================================================================= */}
        <ScrollSection
          smoothProgress={smoothProgress}
          start={0.0}
          end={0.15}
          className="flex flex-col items-center justify-center text-center px-6"
        >
          {/* Top Left Dropcap (Image 2 Style) */}
          <div className="absolute top-24 left-6 sm:left-12 max-w-xs text-left hidden md:block">
            <div className="flex items-start gap-2.5">
              <span className="text-3xl font-syne font-extrabold text-white leading-none">
                W
              </span>
              <p className="text-[11px] font-sans text-white/60 leading-relaxed font-light">
                here air dominance meets stealth engineering and physical limits know no bounds!
              </p>
            </div>
          </div>

          {/* Giant Futuristic Headline */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-syne font-extrabold uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white drop-shadow-[0_0_60px_rgba(168,85,247,0.3)]">
            RAPTOR
          </h1>

          {/* Center Floating Circular Badge */}
          <div className="mt-8 pointer-events-auto">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/25 bg-white/[0.08] backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-[0_0_35px_rgba(255,255,255,0.18)] hover:scale-105 transition-transform cursor-pointer group">
              <div className="absolute inset-0 rounded-full border border-purple-400/30 animate-ping opacity-30" />
              <span className="text-[11px] sm:text-xs font-syne font-extrabold uppercase leading-tight tracking-wider text-white">
                MACH<br />
                <span className="text-cyan-400">2.25</span>
              </span>
            </div>
          </div>

          {/* Floating Left Telemetry Coordinates */}
          <div className="absolute bottom-10 left-6 sm:left-12 flex items-center gap-4 text-[11px] font-mono text-white/40">
            <span>34°54&apos;N</span>
            <span>•</span>
            <span>117°53&apos;W</span>
            <span>•</span>
            <span className="text-emerald-400">DEFCON 1</span>
          </div>

          {/* Floating Right "Scroll to Explore" */}
          <div className="absolute bottom-10 right-6 sm:right-12 flex flex-col items-end gap-1 text-[11px] font-sans text-white/50 tracking-wider">
            <span>Scroll to Explore</span>
            <span className="text-xs">↓</span>
          </div>
        </ScrollSection>

        {/* ========================================================================= */}
        {/* 1. SECTION 01: "WHO WE ARE?" (18% - 33%) */}
        {/* ========================================================================= */}
        <ScrollSection
          smoothProgress={smoothProgress}
          start={0.17}
          end={0.33}
          className="flex items-center justify-center px-6 sm:px-12 max-w-7xl mx-auto w-full"
        >
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-14 items-center bg-black/40 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div>
              <h2 className="text-4xl sm:text-6xl font-syne font-extrabold uppercase tracking-tight text-white leading-[1.05]">
                Who We<br />Are?
              </h2>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-5xl sm:text-6xl font-syne font-extrabold text-white leading-none shrink-0">
                W
              </span>
              <p className="text-sm sm:text-base text-white/75 font-sans font-light leading-relaxed">
                e redefine the standards of aerial dominance by embracing fifth-generation stealth, celebrating extreme aerodynamic supercruise, and nurturing unmatched sensor-fused situational awareness.
              </p>
            </div>

            <div className="flex flex-col justify-between h-full gap-6">
              <h3 className="text-xl sm:text-2xl font-syne font-semibold text-white/95 leading-snug">
                Be a Part Of Something Greater
              </h3>
              <Link 
                href="/cockpit"
                className="w-fit flex items-center bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-full pl-5 pr-1.5 py-1.5 gap-3 hover:bg-white/[0.16] transition-all shadow-xl group pointer-events-auto"
              >
                <span className="text-xs font-syne font-bold uppercase tracking-wider text-white">
                  Flight Deck HUD
                </span>
                <span className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </ScrollSection>

        {/* ========================================================================= */}
        {/* 2. SECTION 02: "WE'RE NOT JUST A FIGHTER JET // 01" (36% - 51%) */}
        {/* ========================================================================= */}
        <ScrollSection
          smoothProgress={smoothProgress}
          start={0.35}
          end={0.51}
          className="flex items-center justify-center px-6 sm:px-12 max-w-7xl mx-auto w-full"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="lg:col-span-6 flex flex-col">
              <h2 className="text-3xl sm:text-5xl font-syne font-extrabold uppercase tracking-tight text-white mb-2">
                WE&apos;RE NOT JUST<br />A FIGHTER JET
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 mb-4" />

              <p className="text-sm text-white/70 font-sans font-light leading-relaxed max-w-lg mb-6">
                Dual Pratt &amp; Whitney F119 turbofans sustain Mach 1.82 supercruise without afterburners, coupled with 2D pitch vectoring nozzles delivering post-stall air superiority.
              </p>

              <span className="text-4xl font-syne font-bold text-white/20 block mb-4">
                01
              </span>

              <Link 
                href="/propulsion"
                className="w-fit inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-syne font-bold uppercase tracking-wider text-white transition-all pointer-events-auto"
              >
                <span>Explore F119 Propulsion Rig</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="aerospace-card rounded-2xl p-6 border border-white/15 bg-gradient-to-br from-purple-950/20 via-black to-cyan-950/20">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs font-mono">
                  <span className="text-cyan-400">F119-PW-100</span>
                  <span className="text-amber-400">70,000+ LBF TOTAL</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/50">DRY SUPERCRUISE</span>
                    <span className="text-cyan-400 font-bold">26,000 lbf (Mach 1.82)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/50">REHEAT THRUST</span>
                    <span className="text-amber-400 font-bold">35,000+ lbf each</span>
                  </div>
                  <div className="flex justify-between pb-1.5">
                    <span className="text-white/50">THRUST VECTORING</span>
                    <span className="text-white font-bold">±20° Pitch Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* ========================================================================= */}
        {/* 3. SECTION 03: "CONCEALED INTERNAL LETHALITY // 02" (54% - 69%) */}
        {/* ========================================================================= */}
        <ScrollSection
          smoothProgress={smoothProgress}
          start={0.53}
          end={0.69}
          className="flex items-center justify-center px-6 sm:px-12 max-w-7xl mx-auto w-full"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="aerospace-card rounded-2xl p-6 border border-white/15 bg-gradient-to-br from-cyan-950/20 via-black to-emerald-950/20">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs font-mono">
                  <span className="text-emerald-400">INTERNAL WEAPONS BAY</span>
                  <span className="text-white/50">LAU-142/A AVEL</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/50">MAIN VENTRAL BAY</span>
                    <span className="text-cyan-400 font-bold">6x AIM-120D AMRAAM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-white/50">LATERAL SIDE BAYS</span>
                    <span className="text-amber-400 font-bold">2x AIM-9X Sidewinder</span>
                  </div>
                  <div className="flex justify-between pb-1.5">
                    <span className="text-white/50">20MM VULCAN CANNON</span>
                    <span className="text-white font-bold">480 Rds @ 6,000 RPM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col">
              <h2 className="text-3xl sm:text-5xl font-syne font-extrabold uppercase tracking-tight text-white mb-2">
                CONCEALED<br />INTERNAL LETHALITY
              </h2>
              <div className="w-24 h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-500 mb-4" />

              <p className="text-sm text-white/70 font-sans font-light leading-relaxed max-w-lg mb-6">
                Internal weapons bays eliminate parasitic drag and prevent radar reflection. Supersonic pneumatic ejectors launch ordnance into Mach 1.5+ airflow in under one second.
              </p>

              <span className="text-4xl font-syne font-bold text-white/20 block mb-4">
                02
              </span>

              <Link 
                href="/armament"
                className="w-fit inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-syne font-bold uppercase tracking-wider text-white transition-all pointer-events-auto"
              >
                <span>Inspect Weapons Bays</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </ScrollSection>

        {/* ========================================================================= */}
        {/* 4. SECTION 04: "WE BELIEVE STEALTH KNOWS NO BOUNDARIES // 03" (71% - 84%) */}
        {/* ========================================================================= */}
        <ScrollSection
          smoothProgress={smoothProgress}
          start={0.71}
          end={0.84}
          className="flex flex-col items-center justify-center px-6 sm:px-12 max-w-7xl mx-auto w-full"
        >
          <div className="w-full bg-black/50 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-start gap-4 mb-8">
              <span className="text-5xl sm:text-7xl font-syne font-extrabold text-white leading-none shrink-0">
                W
              </span>
              <h2 className="text-3xl sm:text-5xl font-syne font-extrabold uppercase tracking-tight text-white leading-[1.05]">
                e Believe Stealth<br />Knows No Boundaries.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="text-xs font-mono text-cyan-400 block mb-1">EDGE HARMONICS</span>
                <h3 className="text-base font-syne font-bold uppercase text-white mb-1">42° Planform Sweep</h3>
                <p className="text-xs text-white/60">
                  Every seam and leading edge aligns to reflect radar returns into narrow spike voids.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="text-xs font-mono text-amber-400 block mb-1">ABSORBENT RAM</span>
                <h3 className="text-base font-syne font-bold uppercase text-white mb-1">Ferrite Micro-Coatings</h3>
                <p className="text-xs text-white/60">
                  Elastomeric RAM absorbs incident RF energy, dissipating radar pulses harmlessly.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <span className="text-xs font-mono text-emerald-400 block mb-1">PROFILE</span>
                <h3 className="text-base font-syne font-bold uppercase text-white mb-1">&lt; 0.0001 m² RCS</h3>
                <p className="text-xs text-white/60">
                  Reflects an electromagnetic presence equivalent to a steel marble.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-4xl font-syne font-bold text-white/20">03</span>
              <Link 
                href="/stealth"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-xs font-syne font-bold uppercase tracking-wider text-white transition-all pointer-events-auto"
              >
                <span>Launch RCS Radar Scope</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </ScrollSection>

        {/* ========================================================================= */}
        {/* 5. SECTION 05: FINAL STAGE ON BLANK BLACK PAGE (EXACT IMAGE 1 REPLICA) (86% - 100%) */}
        {/* ========================================================================= */}
        <ScrollSection
          smoothProgress={smoothProgress}
          start={0.86}
          end={1.0}
          className="flex items-center justify-center px-6 sm:px-12 max-w-7xl mx-auto w-full z-30"
        >
          {/* Exact Replica of User's Image 1 on Pure Blank Black Stage */}
          <div className="w-full rounded-3xl p-8 sm:p-14 border border-white/20 bg-[#050505] shadow-[0_0_80px_rgba(0,0,0,0.9)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20">
              
              {/* Left Column: Exactly from User's First Image */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-5 h-5 rounded-full border border-cyan-400/50 flex items-center justify-center text-cyan-400">
                    <Compass className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/60 uppercase font-medium">
                    NAVIGATION
                  </span>
                </div>

                <div className="space-y-5 text-base sm:text-lg font-sans font-medium text-white/90">
                  <Link href="/" className="block hover:text-cyan-400 transition-colors pointer-events-auto">
                    01. Overview
                  </Link>
                  <Link href="/propulsion" className="block hover:text-cyan-400 transition-colors pointer-events-auto">
                    02. Propulsion &amp; Supercruise
                  </Link>
                  <Link href="/armament" className="block hover:text-cyan-400 transition-colors pointer-events-auto">
                    03. Concealed Armament
                  </Link>
                  <Link href="/stealth" className="block hover:text-cyan-400 transition-colors pointer-events-auto">
                    04. Stealth &amp; Radar Cross Section
                  </Link>
                  <Link href="/cockpit" className="block hover:text-cyan-400 transition-colors pointer-events-auto">
                    05. Cockpit &amp; Avionics HUD
                  </Link>
                  <Link href="/specs" className="block hover:text-cyan-400 transition-colors pointer-events-auto">
                    06. Technical Specifications
                  </Link>
                </div>
              </div>

              {/* Right Column: Exactly from User's First Image */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-amber-400">
                    <Activity className="w-4 h-4" />
                  </span>
                  <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/60 uppercase font-medium">
                    FLIGHT ENVELOPE
                  </span>
                </div>

                <div className="space-y-4 text-sm sm:text-base font-mono">
                  <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                    <span className="text-white/50">Top Speed</span>
                    <span className="text-white font-bold text-base sm:text-lg text-right">
                      Mach 2.25 (1,500 mph)
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                    <span className="text-white/50">Supercruise</span>
                    <span className="text-cyan-400 font-bold text-base sm:text-lg text-right">
                      Mach 1.82
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                    <span className="text-white/50">Service Ceiling</span>
                    <span className="text-white font-bold text-base sm:text-lg text-right">
                      &gt; 65,000 ft
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                    <span className="text-white/50">G-Limits</span>
                    <span className="text-white font-bold text-base sm:text-lg text-right">
                      +9.0G / -3.0G
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1">
                    <span className="text-white/50">Thrust (Full AB)</span>
                    <div className="text-right">
                      <span className="text-amber-400 font-bold text-base sm:text-lg block">
                        70,000+ lbf
                      </span>
                      <span className="text-amber-400 font-bold text-xs sm:text-sm block">
                        total
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollSection>

      </div>
    </main>
  );
}

// Section transition component with smooth fade, scale, and blur
interface ScrollSectionProps {
  smoothProgress: MotionValue<number>;
  start: number;
  end: number;
  className?: string;
  children: React.ReactNode;
}

function ScrollSection({ smoothProgress, start, end, className, children }: ScrollSectionProps) {
  const isFirst = start === 0;
  const isLast = end >= 1;

  // Window for entry and exit transitions
  const duration = end - start;
  const inWindow = isFirst ? 0 : duration * 0.22;
  const outWindow = isLast ? 0 : duration * 0.22;

  const inStart = start;
  const inEnd = start + inWindow;
  const outStart = end - outWindow;
  const outEnd = end;

  const opacity = useTransform(
    smoothProgress,
    isFirst 
      ? [start, end - outWindow, end] 
      : isLast 
      ? [start, start + inWindow, end] 
      : [inStart, inEnd, outStart, outEnd],
    isFirst 
      ? [1, 1, 0] 
      : isLast 
      ? [0, 1, 1] 
      : [0, 1, 1, 0]
  );

  const y = useTransform(
    smoothProgress,
    isFirst 
      ? [start, end - outWindow, end] 
      : isLast 
      ? [start, start + inWindow, end] 
      : [inStart, inEnd, outStart, outEnd],
    isFirst 
      ? [0, 0, -30] 
      : isLast 
      ? [30, 0, 0] 
      : [30, 0, 0, -30]
  );

  const scale = useTransform(
    smoothProgress,
    isFirst 
      ? [start, end - outWindow, end] 
      : isLast 
      ? [start, start + inWindow, end] 
      : [inStart, inEnd, outStart, outEnd],
    isFirst 
      ? [1, 1, 0.96] 
      : isLast 
      ? [0.96, 1, 1] 
      : [0.96, 1, 1, 0.96]
  );

  const blur = useTransform(
    smoothProgress,
    isFirst 
      ? [start, end - outWindow, end] 
      : isLast 
      ? [start, start + inWindow, end] 
      : [inStart, inEnd, outStart, outEnd],
    isFirst 
      ? ['blur(0px)', 'blur(0px)', 'blur(10px)'] 
      : isLast 
      ? ['blur(10px)', 'blur(0px)', 'blur(0px)'] 
      : ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)']
  );

  // Pointer events only when this section is active
  const pointerEvents = useTransform(smoothProgress, (val) => {
    return val >= inStart && val <= outEnd ? 'auto' : 'none';
  });

  return (
    <motion.div 
      className={`absolute inset-0 pointer-events-none will-change-transform ${className || ''}`}
      style={{ opacity, y, scale, filter: blur, pointerEvents }}
    >
      {children}
    </motion.div>
  );
}



