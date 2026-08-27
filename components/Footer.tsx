'use client';

import Link from 'next/link';
import { Shield, Radio, Activity, Compass, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#07090c] text-white/70 overflow-hidden z-20">
      {/* Top Accent Line with glowing radar sweep dot */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1: Brand & Classification */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded border border-cyan-500/40 bg-cyan-950/20 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white uppercase">
                Lockheed Martin F-22
              </span>
            </div>

            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              The world&apos;s premier 5th-generation air dominance stealth fighter. Combining stealth, supercruise, supermaneuverability, and integrated avionics.
            </p>

            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/[0.02] text-[11px] font-mono text-white/40 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLASSIFICATION: UNCLASSIFIED // PUBLIC RELEASE</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase mb-5 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  01. Overview
                </Link>
              </li>
              <li>
                <Link href="/propulsion" className="hover:text-cyan-400 transition-colors">
                  02. Propulsion &amp; Supercruise
                </Link>
              </li>
              <li>
                <Link href="/armament" className="hover:text-cyan-400 transition-colors">
                  03. Concealed Armament
                </Link>
              </li>
              <li>
                <Link href="/stealth" className="hover:text-cyan-400 transition-colors">
                  04. Stealth &amp; Radar Cross Section
                </Link>
              </li>
              <li>
                <Link href="/cockpit" className="hover:text-cyan-400 transition-colors">
                  05. Cockpit &amp; Avionics HUD
                </Link>
              </li>
              <li>
                <Link href="/specs" className="hover:text-cyan-400 transition-colors">
                  06. Technical Specifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Specifications */}
          <div>
            <h4 className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase mb-5 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Flight Envelope
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40">Top Speed</span>
                <span className="text-white/90">Mach 2.25 (1,500 mph)</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40">Supercruise</span>
                <span className="text-cyan-400">Mach 1.82</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40">Service Ceiling</span>
                <span className="text-white/90">&gt; 65,000 ft</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40">G-Limits</span>
                <span className="text-white/90">+9.0G / -3.0G</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-white/40">Thrust (Full AB)</span>
                <span className="text-amber-400">70,000+ lbf total</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Radar Simulation Mini Widget */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase mb-5 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              AESA Radar Sweep
            </h4>
            <div className="relative w-28 h-28 rounded-full border border-emerald-500/20 bg-emerald-950/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-75" />
              <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-50" />
              <div className="absolute w-full h-[1px] bg-emerald-500/20" />
              <div className="absolute h-full w-[1px] bg-emerald-500/20" />
              {/* Radar sweep beam */}
              <div className="absolute inset-0 origin-center animate-radar-sweep bg-gradient-to-tr from-transparent via-transparent to-emerald-500/30 rounded-full" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold z-10">
                APG-77
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/40 mt-3">
              120° AZIMUTH COVERAGE
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>F-22 RAPTOR AIR DOMINANCE INTERACTIVE SYSTEM // BUILT FOR HIGH PERFORMANCE</span>
          </div>
          <div>
            <span>UNITED STATES AIR FORCE AIR COMBAT COMMAND</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
