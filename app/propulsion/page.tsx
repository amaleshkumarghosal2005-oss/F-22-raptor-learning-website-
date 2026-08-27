'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Gauge, Zap, Wind, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function PropulsionPage() {
  // Thrust vectoring pitch angle (-20 to +20 degrees)
  const [pitchAngle, setPitchAngle] = useState(0);
  // Throttle setting (0: Idle, 50: Military/Supercruise, 100: Max Afterburner)
  const [throttle, setThrottle] = useState(65);

  // Derived telemetry
  const isAfterburner = throttle > 55;
  const currentMach = (0.8 + (throttle / 100) * 1.45).toFixed(2);
  const currentThrust = Math.round(26000 + (throttle / 100) * 44000); // 26k to 70k lbf total (both engines)
  const currentEGT = Math.round(620 + (throttle / 100) * 1180); // °C

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-16 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Section Tag */}
      <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">
        <Link href="/" className="hover:text-cyan-400">Home</Link>
        <span>/</span>
        <span className="text-cyan-400">02. Propulsion &amp; Supercruise</span>
      </div>

      {/* Hero Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono mb-4">
          <Flame className="w-3.5 h-3.5" />
          <span>PRATT &amp; WHITNEY F119-PW-100 // DUAL AFTERBURNING TURBOFANS</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-6">
          Supercruise <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            &amp; 2D Thrust Vectoring
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 max-w-3xl font-light leading-relaxed">
          The F-22 is propelled by dual F119 turbofans delivering a thrust-to-weight ratio exceeding 1.2:1. It sustains Mach 1.82 supercruise without afterburner reheat, conserving fuel while outrunning adversary interceptors.
        </p>
      </div>

      {/* Interactive Engine & Vectoring Simulation Lab */}
      <section className="mb-20 aerospace-card rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
        {/* Background glow influenced by afterburner */}
        <div 
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-all duration-500"
          style={{
            background: isAfterburner 
              ? 'radial-gradient(circle, rgba(255, 158, 0, 0.25), transparent)' 
              : 'radial-gradient(circle, rgba(0, 240, 255, 0.15), transparent)'
          }}
        />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-10 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase block mb-1">
              Interactive Test Rig // Edwards AFB Test Cell 3
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase">
              2D Pitch-Vectoring &amp; Throttle Dynamics
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded bg-white/5 border border-white/10">
              <span className="text-white/40 mr-2">STATUS:</span>
              <span className={isAfterburner ? "text-amber-400 font-bold" : "text-cyan-400 font-bold"}>
                {isAfterburner ? "AUGMENTATION (A/B)" : "MILITARY DRY POWER"}
              </span>
            </div>
          </div>
        </div>

        {/* Visualizer and Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Vectoring Nozzle Animated Schematic SVG */}
          <div className="lg:col-span-7 bg-[#080b0f] border border-white/10 rounded-xl p-6 relative flex flex-col items-center justify-center min-h-[340px]">
            <div className="absolute top-4 left-4 text-[10px] font-mono text-white/40 tracking-wider">
              SCHEMATIC: F119 2D CONVERGENT-DIVERGENT NOZZLE
            </div>

            {/* Dynamic SVG Schematic with Unified 2D Vectoring Geometry */}
            <svg 
              viewBox="0 0 540 260" 
              className="w-full max-w-lg h-auto overflow-visible select-none"
            >
              <defs>
                <linearGradient id="titaniumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>

                {/* Primary Plume Gradient */}
                <linearGradient id="flameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="20%" stopColor={isAfterburner ? "#f59e0b" : "#38bdf8"} stopOpacity="0.95" />
                  <stop offset="60%" stopColor={isAfterburner ? "#ea580c" : "#0284c7"} stopOpacity="0.75" />
                  <stop offset="100%" stopColor={isAfterburner ? "#b91c1c" : "#0369a1"} stopOpacity="0" />
                </linearGradient>

                {/* Inner Core Plasma Gradient */}
                <linearGradient id="corePlasmaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="40%" stopColor={isAfterburner ? "#fef08a" : "#bae6fd"} stopOpacity="0.85" />
                  <stop offset="100%" stopColor={isAfterburner ? "#f59e0b" : "#38bdf8"} stopOpacity="0" />
                </linearGradient>

                <filter id="flameGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <filter id="hudGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Reference Neutral Flight Centerline */}
              <line x1="30" y1="130" x2="520" y2="130" stroke="rgba(255,255,255,0.07)" strokeDasharray="4,4" />

              {/* Static Engine Casing & Augmentor Duct (Upstream) */}
              <g>
                {/* Outer Nacelle Heat Shield */}
                <path 
                  d="M 30 75 L 180 75 L 240 85 L 240 175 L 180 185 L 30 185 Z" 
                  fill="url(#titaniumGrad)" 
                  stroke="#64748b" 
                  strokeWidth="2" 
                />
                
                {/* Compressor & Turbine Stages */}
                <line x1="70" y1="80" x2="70" y2="180" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4,3" />
                <line x1="110" y1="80" x2="110" y2="180" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4,3" />
                <line x1="150" y1="80" x2="150" y2="180" stroke="#cbd5e1" strokeWidth="3" />
                <line x1="180" y1="80" x2="180" y2="180" stroke="#e2e8f0" strokeWidth="3.5" />

                {/* Afterburner Augmentor Fuel Spray Rings */}
                <line 
                  x1="215" y1="88" x2="215" y2="172" 
                  stroke={isAfterburner ? "#f59e0b" : "#64748b"} 
                  strokeWidth="3" 
                  strokeDasharray={isAfterburner ? "none" : "2,2"}
                />

                {/* Augmentor internal flame glow */}
                {isAfterburner && (
                  <ellipse cx="230" cy="130" rx="15" ry="35" fill="#f59e0b" opacity="0.3" filter="url(#flameGlow)" />
                )}

                {/* Swivel Hinge / Gimbal Seal Collar */}
                <path d="M 235 84 L 245 84 L 245 176 L 235 176 Z" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                <circle cx="240" cy="130" r="4" fill="#94a3b8" />
              </g>

              {/* ================================================================= */}
              {/* UNIFIED 2D VECTORING NOZZLE ASSEMBLY (Pivots around 240, 130)     */}
              {/* ================================================================= */}
              <g transform={`rotate(${pitchAngle} 240 130)`}>
                {/* Divergent Nozzle Throat Offset (Nozzle expands slightly in Reheat) */}
                {(() => {
                  const throatOffset = isAfterburner ? 6 : 0;
                  const topStartY = 88;
                  const topEndY = 96 - throatOffset;
                  const botStartY = 172;
                  const botEndY = 164 + throatOffset;
                  const exitX = 350;
                  const flameLen = Math.max(80, (throttle / 100) * 165);

                  return (
                    <>
                      {/* Exhaust Plume (Anchored seamlessly to petal exit at exitX) */}
                      <g filter="url(#flameGlow)">
                        {/* Outer Main Reheat / Jet Plume */}
                        <polygon 
                          points={`${exitX - 2},${topEndY + 2} ${exitX + flameLen},${130} ${exitX - 2},${botEndY - 2}`}
                          fill="url(#flameGrad)"
                          opacity={0.88}
                        />

                        {/* Inner Core Plasma Spike */}
                        <polygon 
                          points={`${exitX - 2},${topEndY + 8} ${exitX + (flameLen * 0.65)},${130} ${exitX - 2},${botEndY - 8}`}
                          fill="url(#corePlasmaGrad)"
                          opacity={0.95}
                        />

                        {/* Supersonic Shock Diamonds (Spaced along center vector axis) */}
                        {isAfterburner && (
                          <>
                            <polygon points={`${exitX + 28},123 ${exitX + 44},130 ${exitX + 28},137 ${exitX + 18},130`} fill="#ffffff" opacity="0.95" />
                            <polygon points={`${exitX + 62},124 ${exitX + 76},130 ${exitX + 62},136 ${exitX + 54},130`} fill="#ffffff" opacity="0.88" />
                            <polygon points={`${exitX + 96},125 ${exitX + 108},130 ${exitX + 96},135 ${exitX + 90},130`} fill="#ffffff" opacity="0.75" />
                            {throttle > 80 && (
                              <polygon points={`${exitX + 128},126 ${exitX + 138},130 ${exitX + 128},134 ${exitX + 122},130`} fill="#ffffff" opacity="0.6" />
                            )}
                          </>
                        )}
                      </g>

                      {/* Nozzle Sidewall Pressure Shroud */}
                      <polygon 
                        points={`240,${topStartY + 4} 240,${botStartY - 4} ${exitX - 10},${130 + 12} ${exitX - 10},${130 - 12}`} 
                        fill="#0f172a" 
                        opacity="0.45" 
                      />

                      {/* UPPER VECTORING FLAP (Ceramic thermal barrier tile) */}
                      <g>
                        <polygon 
                          points={`240,${topStartY} ${exitX},${topEndY} ${exitX - 4},${topEndY - 12} 240,${topStartY - 8}`} 
                          fill="#334155" 
                          stroke="#94a3b8" 
                          strokeWidth="1.5" 
                        />
                        {/* Flap Facet Reinforcement Ribs */}
                        <line x1="275" y1={topStartY - 2} x2="275" y2={topStartY + 5} stroke="#64748b" strokeWidth="1.5" />
                        <line x1="315" y1={topEndY - 4} x2="315" y2={topEndY + 3} stroke="#64748b" strokeWidth="1.5" />
                        {/* Thermal Sealing Tip */}
                        <circle cx={exitX} cy={topEndY} r="2.5" fill="#f8fafc" />
                      </g>

                      {/* LOWER VECTORING FLAP (Ceramic thermal barrier tile) */}
                      <g>
                        <polygon 
                          points={`240,${botStartY} ${exitX},${botEndY} ${exitX - 4},${botEndY + 12} 240,${botStartY + 8}`} 
                          fill="#334155" 
                          stroke="#94a3b8" 
                          strokeWidth="1.5" 
                        />
                        {/* Flap Facet Reinforcement Ribs */}
                        <line x1="275" y1={botStartY + 2} x2="275" y2={botStartY - 5} stroke="#64748b" strokeWidth="1.5" />
                        <line x1="315" y1={botEndY + 4} x2="315" y2={botEndY - 3} stroke="#64748b" strokeWidth="1.5" />
                        {/* Thermal Sealing Tip */}
                        <circle cx={exitX} cy={botEndY} r="2.5" fill="#f8fafc" />
                      </g>

                      {/* Dynamic Thrust Vector Arrow from Exit Plane */}
                      <line 
                        x1={exitX} 
                        y1="130" 
                        x2={exitX + 40} 
                        y2="130" 
                        stroke={isAfterburner ? "#f59e0b" : "#38bdf8"} 
                        strokeWidth="1.5" 
                        strokeDasharray="2,2" 
                      />
                    </>
                  );
                })()}
              </g>

              {/* Dedicated High-Visibility HUD Telemetry Box (Top Right, Clean & Isolated) */}
              <g transform="translate(350, 18)">
                <rect 
                  x="0" 
                  y="0" 
                  width="170" 
                  height="34" 
                  rx="6" 
                  fill="#070a0e" 
                  stroke={pitchAngle === 0 ? "rgba(255,255,255,0.15)" : "#38bdf8"} 
                  strokeWidth="1.2" 
                />
                <text 
                  x="12" 
                  y="21" 
                  fill={pitchAngle === 0 ? "#94a3b8" : "#38bdf8"} 
                  fontSize="11" 
                  fontFamily="monospace" 
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  NOZZLE PITCH: {pitchAngle > 0 ? `+${pitchAngle}` : pitchAngle}°
                </text>
              </g>
            </svg>

            <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/30">
              VECTOR RANGE: ±20° PITCH AUTHORITY
            </div>
          </div>

          {/* Controls & Realtime Telemetry Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Throttle Slider */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-white/60 uppercase flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  Throttle Position (PLA)
                </span>
                <span className="text-sm font-mono text-cyan-400 font-bold">{throttle}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={throttle}
                onChange={(e) => setThrottle(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-2">
                <span>IDLE</span>
                <span className="text-cyan-400">MILITARY (SUPERCRUISE)</span>
                <span className="text-amber-400">FULL REHEAT</span>
              </div>
            </div>

            {/* Thrust Vectoring Pitch Angle Slider */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-white/60 uppercase flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-amber-400" />
                  Thrust Vector Angle
                </span>
                <span className="text-sm font-mono text-amber-400 font-bold">
                  {pitchAngle > 0 ? `+${pitchAngle}°` : `${pitchAngle}°`}
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={pitchAngle}
                onChange={(e) => setPitchAngle(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-2">
                <span>-20° PITCH DOWN</span>
                <span>0° NEUTRAL</span>
                <span>+20° PITCH UP</span>
              </div>
            </div>

            {/* Live Telemetry Display */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#0c1015] border border-white/10 rounded-lg p-3 text-center">
                <span className="text-[10px] font-mono text-white/40 block mb-1">TOTAL THRUST</span>
                <span className="text-base sm:text-lg font-mono font-bold text-white">
                  {currentThrust.toLocaleString()} <span className="text-xs font-normal text-white/50">lbf</span>
                </span>
              </div>

              <div className="bg-[#0c1015] border border-white/10 rounded-lg p-3 text-center">
                <span className="text-[10px] font-mono text-white/40 block mb-1">SPEED</span>
                <span className="text-base sm:text-lg font-mono font-bold text-cyan-400">
                  M {currentMach}
                </span>
              </div>

              <div className="bg-[#0c1015] border border-white/10 rounded-lg p-3 text-center">
                <span className="text-[10px] font-mono text-white/40 block mb-1">EXHAUST TEMP</span>
                <span className={`text-base sm:text-lg font-mono font-bold ${isAfterburner ? 'text-amber-400' : 'text-white'}`}>
                  {currentEGT}°C
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Engineering Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="aerospace-card rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            Supercruise Aerodynamics
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Unlike 4th-generation aircraft requiring fuel-thirsty afterburners to break the sound barrier, the F-22 accelerates past Mach 1.82 on dry power alone. This expands combat radius by 50% compared to traditional reheat sprints.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• Dry Thrust: ~26,000 lbf per engine</li>
            <li>• Afterburner: 35,000+ lbf per engine</li>
            <li>• Bypass Ratio: 0.3:1 (Leaned for Mach)</li>
          </ul>
        </div>

        <div className="aerospace-card rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
            <Wind className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            Supermaneuverability &amp; Post-Stall
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            The 2D convergent-divergent vectoring nozzles can pitch ±20 degrees at up to 20°/sec. Coupled with full-authority digital engine controls (FADEC), the Raptor executes maneuvers like the Herbst and Pugachev&apos;s Cobra at zero indicated airspeed.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• Vectoring Rate: 20°/sec hydraulic slew</li>
            <li>• Pitch Authority: Sustained at high AoA (&gt;60°)</li>
            <li>• FADEC: Quadruple-redundant digital</li>
          </ul>
        </div>

        <div className="aerospace-card rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            Infrared &amp; Radar Suppression
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            The rectangular nozzle geometry diffuses hot exhaust gases rapidly into ambient slipstreams, reducing infrared tracking signatures. Curved S-duct air intakes completely shield the front face of the compressor blades from enemy radar illumination.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• S-Duct Intakes: Total compressor masking</li>
            <li>• Cooling Tiles: Ceramic thermal barrier</li>
            <li>• Stealth Nozzle: 2D faceted radar scattering</li>
          </ul>
        </div>
      </section>

      {/* Next Navigation Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
        <div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-1">
            Next Architecture Section
          </span>
          <h3 className="text-2xl font-display font-bold uppercase">
            03. Concealed Armament &amp; Internal Weapons Bays
          </h3>
        </div>
        <Link 
          href="/armament"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-neutral-200 transition-colors"
        >
          <span>Explore Armament</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
