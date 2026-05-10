"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Fights", href: "#events" },
  { label: "Rankings", href: "#rankings" },
  { label: "Live", href: "#livestream" },
  { label: "About", href: "#about" },
]

export function Navbar() {
  const [visible, setVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50"
          id="main-navbar"
        >
          {/* Top crimson accent line */}
          <div className="h-[3px] bg-[#c5203a]" />

          <div className="navbar-editorial">
            {/* Ticker bar — desktop only */}
            <div className="hidden lg:block border-b border-white/5 overflow-hidden">
              <div className="max-w-7xl mx-auto px-8 py-1.5 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8962e]/70">
                  Next Up Boxing League
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                  Fight Night &nbsp;·&nbsp; June 6, 2026 &nbsp;·&nbsp; Madison Square Garden &nbsp;·&nbsp; 7:00 PM EST
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8962e]/70">
                  Vol. I · Est. 2026
                </span>
              </div>
            </div>

            {/* Main nav row */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14 sm:h-16">
                {/* Logo */}
                <a href="#" className="flex items-center group">
                  <Image
                    src="/logo.png"
                    alt="NextUp Boxing"
                    width={120}
                    height={60}
                    className="w-[90px] sm:w-[110px] h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-0.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="relative px-5 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors duration-300 group"
                    >
                      {link.label}
                      <span className="absolute bottom-1 left-5 right-5 h-px bg-[#c5203a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </a>
                  ))}
                </div>

                {/* CTA + mobile toggle */}
                <div className="flex items-center gap-3">
                  <a
                    href="#livestream"
                    className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-[#c5203a] hover:bg-[#a01830] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 hover:shadow-lg hover:shadow-[#c5203a]/30 hover:-translate-y-0.5"
                  >
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                    </span>
                    Watch Live
                  </a>

                  {/* Mobile toggle */}
                  <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                    aria-label="Toggle menu"
                  >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden border-t border-white/8"
                >
                  <div className="px-4 py-4 space-y-0.5">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-4 py-3 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                    <a
                      href="#livestream"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 mt-3 px-5 py-3 bg-[#c5203a] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded"
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                      </span>
                      Watch Live
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
