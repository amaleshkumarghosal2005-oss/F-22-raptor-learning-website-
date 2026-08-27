'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Activity, Ruler, Weight, Gauge, Shield, Cpu, Award } from 'lucide-react';
import Link from 'next/link';

interface SpecCategory {
  category: string;
  icon: any;
  items: { label: string; value: string; detail: string }[];
}

const specSections: SpecCategory[] = [
  {
    category: 'Dimensional Geometry',
    icon: Ruler,
    items: [
      { label: 'Overall Length', value: '62 ft 1 in (18.92 m)', detail: 'Extended nose cone to vectoring nozzle edge' },
      { label: 'Wingspan', value: '44 ft 6 in (13.56 m)', detail: 'Trapezoidal cropped-delta design' },
      { label: 'Overall Height', value: '16 ft 8 in (5.08 m)', detail: 'Top of twin canted vertical stabilizers' },
      { label: 'Wing Area', value: '840 sq ft (78.04 m²)', detail: 'Generates low wing loading for tight turn rate' },
      { label: 'Vertical Fin Cant', value: '28° Outward', detail: 'Deflects radar illumination upwards and downwards' },
    ],
  },
  {
    category: 'Mass & Fuel Capacities',
    icon: Weight,
    items: [
      { label: 'Empty Weight', value: '43,340 lb (19,700 kg)', detail: 'Advanced titanium alloys & carbon bismaleimide' },
      { label: 'Gross Operating Weight', value: '64,840 lb (29,410 kg)', detail: 'Full internal fuel + standard air combat loadout' },
      { label: 'Max Takeoff Weight (MTOW)', value: '83,500 lb (38,000 kg)', detail: 'With auxiliary external fuel tanks' },
      { label: 'Internal Fuel Capacity', value: '18,000 lb (8,200 kg)', detail: 'Distributed through fuselage and wing fuel cells' },
      { label: 'External Fuel Tanks', value: '2x 600 gal (2,270 L)', detail: 'Supersonic stealth drop tanks on wing pylons' },
    ],
  },
  {
    category: 'Propulsion & Performance',
    icon: Gauge,
    items: [
      { label: 'Powerplant', value: '2x Pratt & Whitney F119-PW-100', detail: 'Afterburning turbofans with 2D pitch vectoring' },
      { label: 'Dry Thrust (Each)', value: '~26,000 lbf (116 kN)', detail: 'Permits continuous Mach 1.82 supercruise' },
      { label: 'Max Thrust with Reheat', value: '35,000+ lbf (156 kN)', detail: 'Total thrust exceeds 70,000 lbf combined' },
      { label: 'Maximum Sprint Speed', value: 'Mach 2.25 (1,500 mph / 2,414 km/h)', detail: 'At high altitude (above 36,000 ft)' },
      { label: 'Supercruise Velocity', value: 'Mach 1.82 (1,220 mph / 1,963 km/h)', detail: 'No afterburner fuel penalty' },
      { label: 'Service Ceiling', value: '65,000+ ft (19,812 m)', detail: 'Operates in the thin stratosphere out of SAM range' },
      { label: 'Structural G-Limits', value: '+9.0G / -3.0G', detail: 'Full combat maneuver envelope with FBW limiters' },
      { label: 'Combat Radius', value: '460 nmi (850 km)', detail: 'Clean internal fuel including 100 nmi supercruise' },
      { label: 'Ferry Range', value: '1,600+ nmi (2,960 km)', detail: 'With two external wing fuel drop tanks' },
    ],
  },
  {
    category: 'Stealth & Avionics Suite',
    icon: Cpu,
    items: [
      { label: 'Radar Cross Section (RCS)', value: '~0.0001 m² (-40 dBsm)', detail: 'Broadband all-aspect low observability' },
      { label: 'Primary Radar', value: 'AN/APG-77 AESA Radar', detail: '~2,000 active T/R modules with LPI capability' },
      { label: 'Electronic Warfare (EW)', value: 'AN/ALR-94 Passive Receiver', detail: '360° spherical threat detection up to 250+ nmi' },
      { label: 'Missile Warning System', value: 'AN/AAR-56 IR MLD', detail: 'Spherical infrared threat detection sensors' },
      { label: 'Mission Processing', value: 'Dual CIP Supercomputers', detail: 'Executes sensor fusion, correlates tracks in Ada' },
    ],
  },
];

export default function SpecsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-16 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">
        <Link href="/" className="hover:text-cyan-400">Home</Link>
        <span>/</span>
        <span className="text-cyan-400">06. Technical Specifications</span>
      </div>

      {/* Hero Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>TECHNICAL SPECIFICATIONS &amp; FLIGHT ENVELOPE LEDGER</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-6">
          Engineering <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            Specifications &amp; Metrics
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 max-w-3xl font-light leading-relaxed">
          Detailed technical ledger covering structural dimensions, material composition, twin F119 propulsion parameters, flight envelope margins, and sensor fusion architectures.
        </p>
      </div>

      {/* Quick Summary Highlights Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-white/40 block mb-1">TOP SPEED</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white">Mach 2.25</span>
          <span className="text-xs text-white/50 block mt-1">1,500 mph (High Alt)</span>
        </div>

        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-white/40 block mb-1">SUPERCRUISE</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400">Mach 1.82</span>
          <span className="text-xs text-white/50 block mt-1">Sustained dry power</span>
        </div>

        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-white/40 block mb-1">SERVICE CEILING</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-400">&gt; 65,000 ft</span>
          <span className="text-xs text-white/50 block mt-1">Near-stratosphere</span>
        </div>

        <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono text-white/40 block mb-1">RADAR CROSS SECTION</span>
          <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">0.0001 m²</span>
          <span className="text-xs text-white/50 block mt-1">Steel marble profile</span>
        </div>
      </div>

      {/* Comprehensive Specification Tables */}
      <div className="space-y-12 mb-20">
        {specSections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <section key={idx} className="aerospace-card rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-8 h-8 rounded border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-wide">
                  {section.category}
                </h2>
              </div>

              <div className="divide-y divide-white/5">
                {section.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-2 hover:bg-white/[0.02] px-2 rounded transition-colors"
                  >
                    <div className="md:w-1/3">
                      <span className="text-sm font-semibold text-white/90">{item.label}</span>
                    </div>
                    <div className="md:w-1/3">
                      <span className="text-sm font-mono text-cyan-300 font-medium">{item.value}</span>
                    </div>
                    <div className="md:w-1/3">
                      <span className="text-xs text-white/50 font-light">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Peer Fighter Comparison Matrix */}
      <section className="aerospace-card rounded-2xl p-6 sm:p-8 border border-white/10 mb-20">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-2xl font-display font-bold uppercase tracking-wide">
            5th-Generation Air Superiority Matrix
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase">
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Primary Role</th>
                <th className="py-3 px-4">Top Speed</th>
                <th className="py-3 px-4">Supercruise</th>
                <th className="py-3 px-4">Ceiling</th>
                <th className="py-3 px-4">Thrust-to-Weight</th>
                <th className="py-3 px-4">Est. RCS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              <tr className="bg-cyan-950/20 text-white font-bold">
                <td className="py-4 px-4 text-cyan-400">F-22 Raptor (USAF)</td>
                <td className="py-4 px-4">Air Dominance</td>
                <td className="py-4 px-4">Mach 2.25</td>
                <td className="py-4 px-4 text-cyan-300">Mach 1.82 (Dry)</td>
                <td className="py-4 px-4">&gt;65,000 ft</td>
                <td className="py-4 px-4 text-emerald-400">1.26 : 1</td>
                <td className="py-4 px-4 text-cyan-300">&lt; 0.0001 m²</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold">F-35A Lightning II</td>
                <td className="py-4 px-4">Multi-Role Strike</td>
                <td className="py-4 px-4">Mach 1.6</td>
                <td className="py-4 px-4 text-white/40">None (Sprint only)</td>
                <td className="py-4 px-4">50,000 ft</td>
                <td className="py-4 px-4">0.87 : 1</td>
                <td className="py-4 px-4">~0.005 m²</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold">Su-57 Felon</td>
                <td className="py-4 px-4">Air Superiority</td>
                <td className="py-4 px-4">Mach 2.0</td>
                <td className="py-4 px-4">Mach 1.3</td>
                <td className="py-4 px-4">65,000 ft</td>
                <td className="py-4 px-4">1.15 : 1</td>
                <td className="py-4 px-4 text-amber-400">~0.3 m²</td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold">Eurofighter Typhoon</td>
                <td className="py-4 px-4">Swing-Role Fighter</td>
                <td className="py-4 px-4">Mach 2.0</td>
                <td className="py-4 px-4">Mach 1.2</td>
                <td className="py-4 px-4">55,000 ft</td>
                <td className="py-4 px-4">1.18 : 1</td>
                <td className="py-4 px-4 text-amber-400">~0.75 m²</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Return to Overview Hero */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
        <div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-1">
            Experience Complete
          </span>
          <h3 className="text-2xl font-display font-bold uppercase">
            Experience the 3D Scroll Journey Again
          </h3>
        </div>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-neutral-200 transition-colors"
        >
          <span>Return to 3D Scroller</span>
        </Link>
      </div>
    </main>
  );
}
