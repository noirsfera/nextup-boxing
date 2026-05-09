import type { Metadata } from "next";
import { Inter, Oswald, Geist } from "next/font/google";
import "./globals.css";
import { MonitorPlay, Menu } from 'lucide-react';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Next Up Boxing League",
  description: "The future is Next Up. Amateur Boxing. Real Opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "dark", inter.variable, oswald.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col font-sans text-foreground bg-background">
        
        {/* Global Navigation */}
        <header className="w-full sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="flex items-center gap-2">
                  <span className="font-oswald font-bold text-3xl italic tracking-tighter">
                    <span className="text-white">NEXT</span>
                    <span className="text-crimson ml-1">UP</span>
                  </span>
                </a>
              </div>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-8 items-center font-oswald tracking-widest text-sm uppercase">
                <a href="#" className="text-white hover:text-crimson transition-colors">Home</a>
                <a href="#" className="text-white hover:text-crimson transition-colors">Events</a>
                <a href="#" className="text-white hover:text-crimson transition-colors">Rankings</a>
                <a href="#" className="text-white hover:text-crimson transition-colors">Fighters</a>
                <a href="#" className="text-white hover:text-crimson transition-colors">News</a>
                <a href="#" className="text-white hover:text-crimson transition-colors">About</a>
                <a href="#" className="text-gold hover:text-white transition-colors">NUBL.TV</a>
                <a href="#" className="bg-crimson hover:bg-crimson-dark text-white px-6 py-2 transition-colors font-bold tracking-widest">
                  Watch Live
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button className="text-white hover:text-crimson">
                  <Menu size={28} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
              <div className="flex items-center">
                 <span className="font-oswald font-bold text-4xl italic tracking-tighter">
                    <span className="text-white">NEXT</span>
                    <span className="text-crimson ml-1">UP</span>
                  </span>
                  <div className="ml-2 mt-2 border border-crimson rounded-sm px-1 py-0.5 text-[0.6rem] font-bold text-crimson uppercase tracking-widest">
                    Boxing League
                  </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="font-oswald text-gold tracking-widest text-sm mb-4">Our Partners</span>
                <div className="flex gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
                  <span className="font-oswald font-bold text-xl italic">TITLE</span>
                  <span className="font-oswald font-bold text-xl">STING</span>
                  <span className="font-oswald font-bold text-xl italic">RINGSIDE</span>
                  <span className="font-oswald font-black text-2xl">C4</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-zinc-500 text-sm font-inter">
                &copy; 2025 NEXT UP BOXING LEAGUE. ALL RIGHTS RESERVED.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-zinc-500 text-sm font-inter">FOLLOW US</span>

              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
