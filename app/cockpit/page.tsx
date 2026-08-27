'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Crosshair, Cpu, Radio, Shield, Zap, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';

export default function CockpitPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // HUD Interactive States
  const [hudColor, setHudColor] = useState<'emerald' | 'cyan' | 'amber'>('emerald');
  const [isArmed, setIsArmed] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentSpeed, setCurrentSpeed] = useState(485); // Knots
  const [currentAlt, setCurrentAlt] = useState(38400); // Feet

  // HUD Colors
  const colorMap = {
    emerald: {
      primary: '#10b981',
      secondary: '#059669',
      glow: 'rgba(16, 185, 129, 0.4)',
      class: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
    },
    cyan: {
      primary: '#00f0ff',
      secondary: '#0284c7',
      glow: 'rgba(0, 240, 255, 0.4)',
      class: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
    },
    amber: {
      primary: '#ffb703',
      secondary: '#d97706',
      glow: 'rgba(255, 183, 3, 0.4)',
      class: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
    },
  };

  const activeColor = colorMap[hudColor];

  // Mouse tracking over HUD display
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  }, []);

  // Canvas HUD Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const renderHUD = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const color = activeColor.primary;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1.5;
      ctx.font = '12px monospace';

      const cx = width / 2;
      const cy = height / 2;

      // Simulated aircraft pitch and roll influenced by mouse look
      const pitchOffset = mousePos.y * 60;
      const rollAngle = mousePos.x * 0.25;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rollAngle);

      // Pitch Ladder (Horizon line and bars)
      // Horizon 0°
      ctx.beginPath();
      ctx.setLineDash([8, 8]);
      ctx.moveTo(-160, -pitchOffset);
      ctx.lineTo(160, -pitchOffset);
      ctx.stroke();
      ctx.setLineDash([]);

      // Pitch +10 deg
      ctx.beginPath();
      ctx.moveTo(-60, -pitchOffset - 50);
      ctx.lineTo(60, -pitchOffset - 50);
      ctx.stroke();
      ctx.fillText('+10', 70, -pitchOffset - 46);
      ctx.fillText('+10', -95, -pitchOffset - 46);

      // Pitch -10 deg
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(-60, -pitchOffset + 50);
      ctx.lineTo(60, -pitchOffset + 50);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillText('-10', 70, -pitchOffset + 54);
      ctx.fillText('-10', -95, -pitchOffset + 54);

      // Flight Path Marker (Velocity Vector)
      const vvx = mousePos.x * 30;
      const vvy = mousePos.y * 20;
      ctx.beginPath();
      ctx.arc(vvx, vvy, 6, 0, Math.PI * 2);
      ctx.moveTo(vvx - 14, vvy);
      ctx.lineTo(vvx - 6, vvy);
      ctx.moveTo(vvx + 6, vvy);
      ctx.lineTo(vvx + 14, vvy);
      ctx.moveTo(vvx, vvy - 6);
      ctx.lineTo(vvx, vvy - 12);
      ctx.stroke();

      ctx.restore();

      // Bore sight reticle in center
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // Heading Tape at top
      const heading = Math.round(180 + mousePos.x * 35);
      ctx.strokeRect(cx - 50, 20, 100, 24);
      ctx.fillText(`HDG ${heading}°`, cx - 28, 36);

      // Left Airspeed Tape
      ctx.strokeRect(40, cy - 80, 55, 160);
      ctx.fillText('IAS', 45, cy - 60);
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`${currentSpeed}`, 45, cy);
      ctx.font = '11px monospace';
      ctx.fillText('KTAS', 45, cy + 20);
      ctx.fillText(`M 1.72`, 45, cy + 45);

      // Right Altitude Tape
      ctx.strokeRect(width - 95, cy - 80, 65, 160);
      ctx.fillText('ALT', width - 85, cy - 60);
      ctx.font = 'bold 15px monospace';
      ctx.fillText(`${currentAlt}`, width - 85, cy);
      ctx.font = '11px monospace';
      ctx.fillText('FT MSL', width - 85, cy + 20);
      ctx.fillText('RALT 35K', width - 85, cy + 45);

      // G-Meter at bottom left
      const gForce = (1.0 + Math.abs(mousePos.y) * 4.2).toFixed(1);
      ctx.fillText(`G: ${gForce}`, 45, height - 40);
      ctx.fillText('G-MAX: 9.0', 45, height - 25);

      // Weapon Status at bottom center
      ctx.fillText(isArmed ? 'ARMED // AIM-120D' : 'MASTER SAFE', cx - 60, height - 35);
      ctx.fillText('RADAR: LPI TRACK', cx - 45, height - 20);

      // Dynamic Target Lock Reticle tracking cursor
      const targetX = cx + mousePos.x * 120;
      const targetY = cy + mousePos.y * 100;
      ctx.strokeRect(targetX - 18, targetY - 18, 36, 36);
      ctx.beginPath();
      ctx.arc(targetX, targetY, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('TGT-01 // 42 NM', targetX - 35, targetY + 32);

      animId = requestAnimationFrame(renderHUD);
    };

    renderHUD();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeColor, mousePos, isArmed, currentSpeed, currentAlt]);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-16 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-white/40 mb-6 uppercase tracking-widest">
        <Link href="/" className="hover:text-cyan-400">Home</Link>
        <span>/</span>
        <span className="text-cyan-400">05. Cockpit &amp; Integrated Avionics</span>
      </div>

      {/* Hero Header */}
      <div className="mb-14">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-4 ${activeColor.class}`}>
          <Terminal className="w-3.5 h-3.5" />
          <span>PILOT-VEHICLE INTERFACE // SENSOR FUSION DATA HIGHWAY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight mb-6">
          Cockpit Avionics <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
            &amp; Heads-Up Display (HUD)
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 max-w-3xl font-light leading-relaxed">
          The F-22 cockpit revolutionizes aerial combat through Sensor Fusion. Rather than overwhelming the pilot with raw radar displays, two Central Integrated Processors fuse radar, electronic warfare, and infrared sensors into a singular, unified tactical battlefield picture.
        </p>
      </div>

      {/* Interactive HUD Flight Simulator Canvas */}
      <section className="mb-20 aerospace-card rounded-2xl p-6 sm:p-10 border border-white/10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase block mb-1">
              Kaiser Electronics Wide-Field HUD // Symbology Generator
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase">
              Tactical Flight Simulator Viewport
            </h2>
          </div>

          {/* Color Mode & Master Arm Controls */}
          <div className="flex items-center gap-3">
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              {(['emerald', 'cyan', 'amber'] as const).map((colorKey) => (
                <button
                  key={colorKey}
                  onClick={() => setHudColor(colorKey)}
                  className={`px-2.5 py-1 text-xs font-mono rounded uppercase transition-all ${
                    hudColor === colorKey ? 'bg-white/20 text-white font-bold' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {colorKey}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsArmed(!isArmed)}
              className={`px-3 py-1.5 rounded font-mono text-xs uppercase border transition-all ${
                isArmed 
                  ? 'bg-red-500/20 border-red-500 text-red-300' 
                  : 'bg-white/5 border-white/20 text-white/60'
              }`}
            >
              {isArmed ? 'MASTER: ARMED' : 'MASTER: SAFE'}
            </button>
          </div>
        </div>

        {/* HUD Viewport Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[450px] bg-[#020508] border border-white/20 rounded-xl overflow-hidden cursor-crosshair flex items-center justify-center scanlines select-none"
        >
          {/* Subtle cockpit glass gradient reflections */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
          
          <canvas
            ref={canvasRef}
            width={720}
            height={450}
            className="w-full h-full max-w-3xl"
          />

          {/* Prompt overlay */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30 tracking-widest uppercase pointer-events-none">
            [MOVE CURSOR INSIDE TO PITCH &amp; ROLL HUD TACTICAL RETICLE]
          </div>
        </div>
      </section>

      {/* Sensor Fusion Triad */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="aerospace-card rounded-xl p-6 sm:p-8">
          <div className="w-10 h-10 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            AN/APG-77 Active AESA Radar
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Features approximately 2,000 gallium arsenide transmit/receive (T/R) modules that steer beams electronically at the speed of light. Capable of simultaneous air-to-air tracking, electronic jamming, and ground synthetic aperture radar (SAR) imaging.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• Detection: 125+ nmi against 1m² target</li>
            <li>• T/R Modules: ~2,000 independent elements</li>
            <li>• Agile Beam Steering: Microsecond retargeting</li>
          </ul>
        </div>

        <div className="aerospace-card rounded-xl p-6 sm:p-8">
          <div className="w-10 h-10 rounded-lg border border-amber-500/30 bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            AN/ALR-94 Electronic Warfare
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Over 30 individual antennas embedded into the composite wings and fuselage create a 360-degree radar warning and passive emitter locating sphere. It can cue AMRAAM missile launches entirely passively without ever turning on the main radar.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• Passive Detection: 250+ nautical miles</li>
            <li>• 360° Spherical Azimuth &amp; Elevation</li>
            <li>• Passive Weapon Cueing Enabled</li>
          </ul>
        </div>

        <div className="aerospace-card rounded-xl p-6 sm:p-8">
          <div className="w-10 h-10 rounded-lg border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-display font-bold uppercase mb-2">
            Central Integrated Processors
          </h3>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Dual liquid-cooled CIP supercomputers process sensor streams concurrently. Software correlates radar tracks, EW signals, and JTIDS Link-16 datalinks into clear friend-or-foe tactical tracks, freeing the pilot to act as a battlefield commander.
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-white/40">
            <li>• Ada software architecture</li>
            <li>• Fiber-optic high-bandwidth databus</li>
            <li>• Redundant automatic failure isolation</li>
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
            06. Technical Specifications &amp; Envelope Ledger
          </h3>
        </div>
        <Link 
          href="/specs"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-bold uppercase tracking-wider text-xs rounded hover:bg-neutral-200 transition-colors"
        >
          <span>View Specifications</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
