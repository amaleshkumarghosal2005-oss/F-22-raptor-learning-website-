'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Overview', href: '#' },
  { name: 'Propulsion', href: '#' },
  { name: 'Armament', href: '#' },
  { name: 'Stealth', href: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between mix-blend-difference text-white">
        {/* Logo */}
        <div className="text-xl font-bold tracking-widest uppercase cursor-pointer">
          F-22 Raptor
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 hover:opacity-70 transition-opacity"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Full-screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-md flex flex-col"
          >
            {/* Header inside overlay */}
            <div className="px-6 py-6 flex items-center justify-between border-b border-white/10">
              <div className="text-xl font-bold tracking-widest uppercase text-white">
                F-22 Raptor
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 text-white hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 flex flex-col justify-center items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1, duration: 0.4 }}
                className="mt-8 px-8 py-4 border border-white/20 text-white font-semibold tracking-widest uppercase text-sm hover:bg-white hover:text-black transition-colors"
              >
                Pre-order Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
