'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Compass, Shield, Terminal } from 'lucide-react';

const navLinks = [
  { name: 'Overview', href: '/', id: '01' },
  { name: 'Propulsion', href: '/propulsion', id: '02' },
  { name: 'Armament', href: '/armament', id: '03' },
  { name: 'Stealth', href: '/stealth', id: '04' },
  { name: 'Cockpit', href: '/cockpit', id: '05' },
  { name: 'Specs', href: '/specs', id: '06' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Floating Top Nav Container Matching Reference Image 2 */}
      <header className="fixed top-6 left-0 w-full z-50 px-4 sm:px-10 flex items-center justify-between pointer-events-none">
        {/* Left: Floating Frosted Pill Capsule Navigation */}
        <div className="pointer-events-auto flex items-center">
          {/* Desktop Pill Menu */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-full p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-white/25 text-white shadow-[0_2px_12px_rgba(255,255,255,0.15)] backdrop-blur-md'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="pillIndicator"
                      className="absolute inset-0 bg-white/20 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Pill Minimal Brand + Toggle */}
          <div className="lg:hidden flex items-center gap-2 bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-full p-1.5 shadow-2xl">
            <Link
              href="/"
              className="px-3.5 py-1 text-xs font-syne font-bold uppercase tracking-wider text-white"
            >
              F-22 Raptor
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Floating Capsule CTA Button Matching Reference Image 2 */}
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/cockpit"
            className="group bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-2.5 text-xs font-medium tracking-wider uppercase text-white/90 hover:bg-white/[0.15] transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <span className="text-[11px] font-sans font-semibold">Launch Cockpit</span>
            <span className="w-6 h-6 rounded-full border border-white/30 bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <Terminal className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </header>

      {/* Full-screen Overlay Menu for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 flex flex-col"
          >
            {/* Header inside overlay */}
            <div className="px-6 py-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-base font-syne font-bold tracking-widest uppercase text-white">
                  F-22 RAPTOR
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col justify-center px-8 max-w-xl mx-auto w-full gap-5">
              <span className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase mb-2">
                Sections
              </span>
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between py-3 border-b border-white/10 group ${
                        isActive ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-white/30">
                          {link.id}
                        </span>
                        <span className="text-3xl font-syne font-bold uppercase tracking-wide">
                          {link.name}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="/specs"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3.5 bg-white text-black font-syne font-bold tracking-widest uppercase text-xs hover:bg-neutral-200 rounded-full transition-colors"
                >
                  View Technical Specifications
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


