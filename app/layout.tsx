import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "F-22 Raptor // Air Dominance Engineering Experience",
  description: "Experience the pinnacle of fifth-generation stealth aviation, supercruise propulsion, and integrated avionics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
      <body className="antialiased bg-[#050505] text-white selection:bg-cyan-500/30 selection:text-white relative min-h-screen flex flex-col font-sans">
        {/* Subtle Vertical Editorial Grid Lines from Reference Photo */}
        <div className="fixed inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-3 border-x border-dashed border-white/[0.07]">
          <div className="border-r border-dashed border-white/[0.07] h-full" />
          <div className="border-r border-dashed border-white/[0.07] h-full" />
          <div className="h-full" />
        </div>


        <Navbar />
        
        <div className="relative z-10 flex-1 pt-[22px]">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}

