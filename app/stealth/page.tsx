'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, EyeOff, Radio, Compass, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface JetRcsData {
  name: string;
  gen: string;
  rcs: number; // in m²
  rcsVisual: string;
  detectDistanceKm: number; // against 1m² standard 100km radar
  color: string;
  notes: string;
}

const rcsComparison: JetRcsData[] = [
  {
    name: 'F-22 Raptor',
    gen: '5th Gen Air Dominance',
    rcs: 0.0001,
    rcsVisual: 'Steel Marble / Bumblebee',
    detectDistanceKm: 10,
    color: '#00f0ff',
    notes: 'All-aspect broadband low observable. Edge alignment, internal weapons, S-ducts, RAM coatings.',
  },
  {
    name: 'F-35 Lightning II',
    gen: '5th Gen Multi-Role',
    rcs: 0.005,
    rcsVisual: 'Golf Ball',
    detectDistanceKm: 27,
    color: '#38bdf8',
    notes: 'Frontal hemisphere optimized stealth, slightly higher rear/infrared signature.',
  },
  {
    name: 'Su-57 Felon',
    gen: '5th Gen Interceptor',
    rcs: 0.3,
    rcsVisual: 'Large Bird / Frisbee',
    detectDistanceKm: 74,
    color: '#fbbf24',
    notes: 'Exposed engine face rivets, circular nozzles, partial frontal RCS treatment.',
  },
  {
    name: 'Eurofighter Typhoon',
    gen: '4.5 Gen Swing-Role',
    rcs: 0.75,
    rcsVisual: 'Manhole Cover',
    detectDistanceKm: 93,
    color: '#f97316',
    notes: 'Semi-recessed weapons, intake radar deflectors, reduced frontal RCS only.',
  },
  {
    name: 'F-15C Eagle',
    gen: '4th Gen Superiority',
    rcs: 15.0,
    rcsVisual: 'Flying Barn Door',
    detectDistanceKm: 196,
    color: '#ef4444',
    notes: 'Zero stealth geometry, large perpendicular tailfins, external hardpoints.',
  },
];

export default function StealthPage() {
  const [selectedJetIndex, setSelectedJetIndex] = useState(0);
  const activeJet = rcsComparison[selectedJetIndex];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-16 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">
        <Link href="/" className="hover:text-cyan-400">Home</Link>
        <span>/</span>
        <span className="text-cyan-400">04. Low Observables &amp; Stealth</span>
      </div>

      {/* Hero Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-4">
          <EyeOff className="w-3.5 h-3.5" />
          <span>ALL-ASPECT VERY LOW OBSERVABLE (VLO) // RADAR CROSS SECTION: ~0.0001 M²</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-6">
          Stealth <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            Perfected &amp; Radar Defiance
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 max-w-3xl font-light leading-relaxed">
          Stealth is not invisibility to the human eye; it is the comprehensive mastery of the electromagnetic spectrum. Through planform edge alignment, Radar Absorbent Materials (RAM), and active electronic countermeasures, the Raptor shrinks its radar presence to that of a metal marble.
        </p>
      </div>

      {/* Interactive RCS Radar Comparator */}
      <section className="mb-20 aerospace-card rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase block mb-1">
              Electromagnetic Spectrum Analysis // RCS Comparison Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase">
              Radar Cross Section &amp; Detection Horizon
            </h2>
          </div>

          <div className="text-xs font-mono text-white/40 px-3 py-1.5 rounded bg-white/5 border border-white/10">
            RADAR FORMULA: RANGE ∝ (RCS)<sup>1/4</sup>
          </div>
        </div>

        {/* Jet Selection Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {rcsComparison.map((jet, idx) => {
            const isSelected = selectedJetIndex === idx;
            return (
              <button
                key={jet.name}
                onClick={() => setSelectedJetIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
              >
                <span className="text-[10px] font-mono block text-white/40 mb-1">{jet.gen}</span>
                <span className="text-sm font-display font-bold text-white block uppercase">
                  {jet.name}
                </span>
                <span className="text-xs font-mono mt-2 block" style={{ color: jet.color }}>
                  {jet.rcs} m²
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Comparison Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070a0e] border border-white/10 rounded-xl p-6 sm:p-8">
          {/* Visual Radar Scope */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[320px]">
            <div className="absolute top-2 left-2 text-[10px] font-mono text-white/40">
              RADAR INTERCEPT RANGE SIMULATION (X-BAND 10 GHz)
            </div>

            {/* Radar Circular Grid with Target Blip */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/15 bg-emerald-950/10 flex items-center justify-center overflow-hidden">
              {/* Range Rings */}
              <div className="absolute w-full h-full rounded-full border border-emerald-500/20 scale-100" />
              <div className="absolute w-full h-full rounded-full border border-emerald-500/20 scale-75" />
              <div className="absolute w-full h-full rounded-full border border-emerald-500/20 scale-50" />
              <div className="absolute w-full h-full rounded-full border border-emerald-500/20 scale-25" />

              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-emerald-500/25" />
              <div className="absolute h-full w-[1px] bg-emerald-500/25" />

              {/* Radar Sweep Effect */}
              <div className="absolute inset-0 origin-center animate-radar-sweep bg-gradient-to-tr from-transparent via-transparent to-emerald-500/20 rounded-full" />

              {/* Detection Radius Circle for current jet */}
              <motion.div
                key={activeJet.name}
                initial={{ scale: 0 }}
                animate={{ scale: activeJet.detectDistanceKm / 200 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute rounded-full border-2 border-dashed pointer-events-none"
                style={{ 
                  borderColor: activeJet.color,
                  width: '100%',
                  height: '100%',
                  backgroundColor: `${activeJet.color}15`
                }}
              />

              {/* Center Radar Transmitter Emitter */}
              <div className="w-2.5 h-2.5 rounded-full bg-white z-10 shadow-[0_0_10px_white]" />
            </div>

            <div className="flex items-center justify-between w-full max-w-xs text-[10px] font-mono text-white/40 mt-4 px-2">
              <span>0 km</span>
              <span>50 km</span>
              <span>100 km</span>
              <span>200 km</span>
            </div>
          </div>

          {/* Detailed Telemetry for Selected Aircraft */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                ACTIVE PROFILE TELEMETRY
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-white mt-1">
                {activeJet.name}
              </h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                {activeJet.notes}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] font-mono text-white/40 block mb-1">RADAR CROSS SECTION</span>
                <span className="text-xl sm:text-2xl font-mono font-bold" style={{ color: activeJet.color }}>
                  {activeJet.rcs} m²
                </span>
                <span className="text-[11px] text-white/50 block mt-1">
                  ≈ {activeJet.rcsVisual}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <span className="text-[10px] font-mono text-white/40 block mb-1">ENEMY RADAR LOCK RANGE</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-white">
                  ~{activeJet.detectDistanceKm} km
                </span>
                <span className="text-[11px] text-white/50 block mt-1">
                  vs 100kW AESA Emitter
                </span>
              </div>
            </div>

            {/* Tactical Advantage Callout */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-white/70 leading-relaxed">
              <span className="font-mono text-cyan-400 font-bold block mb-1">
                FIRST-LOOK, FIRST-SHOT COMBAT ADVANTAGE:
              </span>
              The F-22 detects, tracks, and fires an AMRAAM at enemy targets from 80+ nautical miles away while remaining completely invisible to the opponent&apos;s onboard radar until inside 10 km.
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars of VLO Engineering */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="aerospace-card rounded-xl p-6 sm:p-8">
          <div className="w-10 h-10 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            Planform Edge Alignment
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Every edge of the F-22 aligns to precise angular harmonics. Leading edge wing sweep is precisely 42°, trailing edge sweep is 17°, and vertical tails are canted outward at 28°. Radar returns reflect strictly into narrow spike directions rather than back to the emitter.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• Wing Leading Edge: 42° sweep</li>
            <li>• Vertical Fin Cant: 28° outward slant</li>
            <li>• Sawtooth Doors: Coordinated facet angles</li>
          </ul>
        </div>

        <div className="aerospace-card rounded-xl p-6 sm:p-8">
          <div className="w-10 h-10 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            Radar Absorbent Coatings (RAM)
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            The composite airframe is sealed with multiple layers of carbon-doped elastomeric coatings and metallic radar attenuation paint. Incident electromagnetic radiation induces micro-currents within the magnetic ferrite granules, transforming RF energy into harmless heat.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• Multi-layer elastomeric RAM</li>
            <li>• Gold/Indium tin oxide canopy film</li>
            <li>• Flush gap-sealed panel joints</li>
          </ul>
        </div>

        <div className="aerospace-card rounded-xl p-6 sm:p-8">
          <div className="w-10 h-10 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            Low Probability of Intercept (LPI)
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Emitting high-power radar signals reveals an aircraft like a flashlight in a dark room. The AN/APG-77 radar uses agile pseudorandom frequency hopping over gigahertz bandwidths with microsecond pulses, making its transmissions blend into natural cosmic background noise.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• Agile frequency-hopping AESA</li>
            <li>• Spread-spectrum microsecond pulses</li>
            <li>• Undetectable by standard RWR receivers</li>
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
            05. Cockpit Avionics &amp; Interactive HUD Simulator
          </h3>
        </div>
        <Link 
          href="/cockpit"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-neutral-200 transition-colors"
        >
          <span>Launch Cockpit HUD</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
