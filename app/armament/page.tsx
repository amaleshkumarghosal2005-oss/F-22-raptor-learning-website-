'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Crosshair, ShieldCheck, Zap, ArrowRight, Shield, Layers } from 'lucide-react';
import Link from 'next/link';

type MissionProfile = 'air_superiority' | 'strike_jdam' | 'precision_sdb';

interface WeaponLoadout {
  title: string;
  code: string;
  description: string;
  mainBay: { name: string; count: number; type: string; range: string }[];
  sideBays: { name: string; count: number; type: string; range: string }[];
  rcsImpact: string;
}

const loadoutData: Record<MissionProfile, WeaponLoadout> = {
  air_superiority: {
    title: 'Air Dominance / CAP Intercept',
    code: 'CONFIG-AA-ALPHA',
    description: 'Optimized for beyond-visual-range (BVR) multi-target engagement and within-visual-range dogfighting without aerodynamic compromise.',
    mainBay: [
      { name: 'AIM-120D AMRAAM', count: 6, type: 'Radar Active Homing (BVR)', range: '86+ nmi (160 km)' },
    ],
    sideBays: [
      { name: 'AIM-9X Sidewinder', count: 2, type: 'High Off-Boresight IR', range: '18+ nmi (35 km)' },
    ],
    rcsImpact: 'ZERO EXTERNAL DRAG // RCS: < 0.0001 m²',
  },
  strike_jdam: {
    title: 'Deep Strike / High-Value Target',
    code: 'CONFIG-AG-BRAVO',
    description: 'Internal heavy ordnance deployment against hardened subterranean bunkers and integrated air defense radar installations.',
    mainBay: [
      { name: 'GBU-32 JDAM (1,000 lb)', count: 2, type: 'GPS/INS Precision Guided', range: '15+ nmi (Glide)' },
      { name: 'AIM-120D AMRAAM', count: 2, type: 'Self-Defense Escort', range: '86+ nmi' },
    ],
    sideBays: [
      { name: 'AIM-9X Sidewinder', count: 2, type: 'Close-in Defense', range: '18+ nmi' },
    ],
    rcsImpact: 'INTERNALLY STOWED // RCS REMAINS UNCOMPROMISED',
  },
  precision_sdb: {
    title: 'Precision Stand-Off / Multi-Target Strike',
    code: 'CONFIG-SDB-CHARLIE',
    description: 'Maximum bomb density loadout using BRU-61/A smart miniature munitions carriage to eliminate multiple dispersed targets simultaneously.',
    mainBay: [
      { name: 'GBU-39 Small Diameter Bomb', count: 8, type: '250 lb Precision Stand-Off Glide', range: '40+ nmi' },
      { name: 'AIM-120D AMRAAM', count: 2, type: 'Self-Defense BVR', range: '86+ nmi' },
    ],
    sideBays: [
      { name: 'AIM-9X Sidewinder', count: 2, type: 'High Off-Boresight IR', range: '18+ nmi' },
    ],
    rcsImpact: 'LOW OBSERVABLE MAINTAINED // 8 INDEPENDENT GPS TRACKS',
  },
};

export default function ArmamentPage() {
  const [selectedProfile, setSelectedProfile] = useState<MissionProfile>('air_superiority');
  const [bayOpen, setBayOpen] = useState(false);

  const activeLoadout = loadoutData[selectedProfile];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-16 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">
        <Link href="/" className="hover:text-cyan-400">Home</Link>
        <span>/</span>
        <span className="text-cyan-400">03. Concealed Armament</span>
      </div>

      {/* Hero Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono mb-4">
          <Target className="w-3.5 h-3.5" />
          <span>INTERNAL WEAPONS STATIONS // ZERO EXTERNAL RADAR EXPOSURE</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-6">
          Concealed <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            Lethality &amp; Munitions
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 max-w-3xl font-light leading-relaxed">
          Carrying weapons externally destroys stealth by reflecting radar pulses and creating parasitic drag. The Raptor houses an entire lethal arsenal internally within high-speed hydraulic bays that open, eject munitions at supersonic speeds, and seal shut in under one second.
        </p>
      </div>

      {/* Interactive Weapons Bay Configurator */}
      <section className="mb-20 aerospace-card rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase block mb-1">
              Munitions Management System // SMS-22
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase">
              Tactical Mission Loadout Selector
            </h2>
          </div>

          {/* Quick Bay Actuation Trigger */}
          <button
            onClick={() => setBayOpen(!bayOpen)}
            className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
              bayOpen 
                ? 'bg-red-500/20 border-red-500 text-red-300' 
                : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>BAY DOORS: {bayOpen ? 'DEPLOYED (FIRE STATE)' : 'CLOSED (STEALTH)'}</span>
          </button>
        </div>

        {/* Mission Selector Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {(['air_superiority', 'strike_jdam', 'precision_sdb'] as MissionProfile[]).map((key) => {
            const isSelected = selectedProfile === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedProfile(key)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-white/40">{loadoutData[key].code}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </div>
                <span className="text-sm font-display font-bold uppercase block text-white">
                  {loadoutData[key].title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Weapons Bay Interactive Blueprint Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070a0e] border border-white/10 rounded-xl p-6 mb-8">
          {/* Visual SVG Bay Diagram */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 relative min-h-[300px]">
            <div className="absolute top-2 left-2 text-[10px] font-mono text-white/40">
              INTERNAL VENTRAL &amp; LATERAL BAYS SCHEMATIC
            </div>

            <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto select-none">
              <defs>
                <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="400" height="320" fill="url(#gridPattern)" />

              {/* Jet Fuselage Centerline Silhouette */}
              <path 
                d="M 200 20 L 250 80 L 290 160 L 320 280 L 200 300 L 80 280 L 110 160 L 150 80 Z" 
                fill="#0b0f15" 
                stroke="#1e293b" 
                strokeWidth="2" 
              />

              {/* Left Side Bay (AIM-9X) */}
              <rect 
                x="85" 
                y="140" 
                width="30" 
                height="80" 
                rx="4"
                fill={bayOpen ? '#1e293b' : '#0f172a'} 
                stroke={bayOpen ? '#38bdf8' : '#334155'} 
                strokeWidth={bayOpen ? '2' : '1'} 
              />
              <text x="70" y="130" fill="#94a3b8" fontSize="9" fontFamily="monospace">SIDE BAY L</text>
              {/* AIM-9X missile representation */}
              <line x1="100" y1="150" x2="100" y2="210" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />

              {/* Right Side Bay (AIM-9X) */}
              <rect 
                x="285" 
                y="140" 
                width="30" 
                height="80" 
                rx="4"
                fill={bayOpen ? '#1e293b' : '#0f172a'} 
                stroke={bayOpen ? '#38bdf8' : '#334155'} 
                strokeWidth={bayOpen ? '2' : '1'} 
              />
              <text x="270" y="130" fill="#94a3b8" fontSize="9" fontFamily="monospace">SIDE BAY R</text>
              {/* AIM-9X missile representation */}
              <line x1="300" y1="150" x2="300" y2="210" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />

              {/* Main Ventral Bay */}
              <rect 
                x="145" 
                y="110" 
                width="110" 
                height="150" 
                rx="6"
                fill={bayOpen ? '#131b26' : '#0b1118'} 
                stroke={bayOpen ? '#00f0ff' : '#475569'} 
                strokeWidth={bayOpen ? '2' : '1.5'} 
              />
              <text x="155" y="100" fill="#00f0ff" fontSize="10" fontFamily="monospace">MAIN VENTRAL BAY</text>

              {/* Render dynamic ordnance inside main bay */}
              {selectedProfile === 'air_superiority' && (
                // 6x AMRAAM
                <g>
                  {[158, 175, 192, 208, 225, 242].map((xPos, idx) => (
                    <line 
                      key={idx} 
                      x1={xPos} 
                      y1="125" 
                      x2={xPos} 
                      y2="245" 
                      stroke="#38bdf8" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                    />
                  ))}
                </g>
              )}

              {selectedProfile === 'strike_jdam' && (
                // 2x JDAM + 2x AMRAAM
                <g>
                  {/* Two 1000lb JDAMs */}
                  <rect x="165" y="135" width="18" height="95" rx="3" fill="#fbbf24" stroke="#d97706" />
                  <rect x="217" y="135" width="18" height="95" rx="3" fill="#fbbf24" stroke="#d97706" />
                  {/* Two flanking AMRAAMs */}
                  <line x1="152" y1="130" x2="152" y2="240" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="248" y1="130" x2="248" y2="240" stroke="#38bdf8" strokeWidth="3" />
                </g>
              )}

              {selectedProfile === 'precision_sdb' && (
                // 8x SDB + 2x AMRAAM
                <g>
                  {[168, 185, 202, 219].map((xPos, idx) => (
                    <g key={idx}>
                      <rect x={xPos} y="130" width="10" height="45" rx="2" fill="#10b981" />
                      <rect x={xPos} y="185" width="10" height="45" rx="2" fill="#10b981" />
                    </g>
                  ))}
                  <line x1="152" y1="130" x2="152" y2="240" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="248" y1="130" x2="248" y2="240" stroke="#38bdf8" strokeWidth="3" />
                </g>
              )}

              {/* Bay Door Open Indicators */}
              {bayOpen && (
                <>
                  <line x1="140" y1="110" x2="135" y2="260" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                  <line x1="260" y1="110" x2="265" y2="260" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
                </>
              )}
            </svg>

            <div className="text-[10px] font-mono text-white/40 mt-2 text-center">
              LAU-142/A AVEL (AMRAAM VERTICAL EJECTION LAUNCHER) // PNEUMATIC PUSH AT 25G ACCELERATION
            </div>
          </div>

          {/* Munition Specs Breakdown for Active Config */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase block">
                CONFIGURATION SUMMARY
              </span>
              <h3 className="text-xl font-display font-bold uppercase text-white mt-1">
                {activeLoadout.title}
              </h3>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                {activeLoadout.description}
              </p>
            </div>

            {/* Main Bay Stations */}
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
              <span className="text-xs font-mono text-white/40 block mb-2">
                MAIN VENTRAL BAY (STATIONS 3, 4, 5, 6, 7, 8)
              </span>
              <div className="space-y-2">
                {activeLoadout.mainBay.map((weapon, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-1.5">
                    <div>
                      <span className="font-bold text-white mr-2">{weapon.count}x {weapon.name}</span>
                      <span className="text-xs text-white/40">({weapon.type})</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">{weapon.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Bay Stations */}
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10">
              <span className="text-xs font-mono text-white/40 block mb-2">
                LATERAL SIDE BAYS (STATIONS 1 &amp; 2)
              </span>
              <div className="space-y-2">
                {activeLoadout.sideBays.map((weapon, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-1.5">
                    <div>
                      <span className="font-bold text-white mr-2">{weapon.count}x {weapon.name}</span>
                      <span className="text-xs text-white/40">({weapon.type})</span>
                    </div>
                    <span className="text-xs font-mono text-amber-400">{weapon.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stealth Signature Retention Badge */}
            <div className="px-3 py-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{activeLoadout.rcsImpact}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vulcan Cannon & Ejection Launcher Deep Dives */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* M61A2 Rotary Cannon */}
        <div className="aerospace-card rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-display font-bold uppercase">
              M61A2 20mm Vulcan
            </h3>
            <span className="px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30 text-[10px] font-mono text-red-400">
              CLOSE-IN WEAPON SYSTEM
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Mounted internally over the right air intake, the M61A2 is a 6-barrel Gatling rotary cannon firing 100 rounds per second. To preserve stealth, the muzzle is concealed behind a hydraulically actuated door that snaps open in milliseconds only during trigger actuation.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-white/40 block mb-1">RATE OF FIRE</span>
              <span className="text-white font-bold text-base">6,000 RPM</span>
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-white/40 block mb-1">AMMO CAPACITY</span>
              <span className="text-white font-bold text-base">480 Rounds</span>
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-white/40 block mb-1">MUZZLE VELOCITY</span>
              <span className="text-white font-bold text-base">3,450 ft/s (1,050 m/s)</span>
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-white/40 block mb-1">PORT COVER ACTION</span>
              <span className="text-cyan-400 font-bold text-base">&lt; 0.15 sec deploy</span>
            </div>
          </div>
        </div>

        {/* LAU-142/A AVEL Pneumatic Launcher */}
        <div className="aerospace-card rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-display font-bold uppercase">
              Supersonic Missile Ejection
            </h3>
            <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
              LAU-142/A AVEL
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed mb-6">
            Dropping a missile via gravity at Mach 1.5+ causes boundary-layer turbulence to toss the weapon back into the aircraft. The Raptor utilizes the LAU-142/A pneumatic ejector launcher to forcefully thrust the missile 27 inches clear of the bay at 25G before motor ignition.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-white/40 block mb-1">EJECTION FORCE</span>
              <span className="text-white font-bold text-base">25G Acceleration</span>
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-white/40 block mb-1">DOOR CYCLE TIME</span>
              <span className="text-white font-bold text-base">&lt; 1.0 sec total</span>
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-white/40 block mb-1">RELEASE ENVELOPE</span>
              <span className="text-white font-bold text-base">Mach 0 to 1.8+</span>
            </div>
            <div className="p-3 bg-white/5 rounded border border-white/5">
              <span className="text-white/40 block mb-1">DRIVE MECHANISM</span>
              <span className="text-amber-400 font-bold text-base">Cold-gas pneumatic</span>
            </div>
          </div>
        </div>
      </section>

      {/* Next Navigation Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
        <div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-1">
            Next Architecture Section
          </span>
          <h3 className="text-2xl font-display font-bold uppercase">
            04. Low Observables &amp; Radar Cross Section
          </h3>
        </div>
        <Link 
          href="/stealth"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-neutral-200 transition-colors"
        >
          <span>Explore Stealth</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
