"use client"

import Image from "next/image"


const footerLinks = {
  "The League": ["About Us", "Our Story", "Press", "Careers"],
  Events: ["Upcoming Fights", "Past Events", "Fight Calendar", "Tickets"],
  Streaming: ["Live PPV", "On Demand", "Subscriptions", "Apps"],
  Support: ["Help Center", "Contact Us", "FAQs", "Terms"],
}



export function Footer() {
  return (
    <footer id="about" className="relative bg-[#0d1124] text-white overflow-hidden">
      {/* Brand gradient top rule */}
      <div className="h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1e2d5e]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c5203a]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Masthead wordmark */}
        <div className="border-b border-white/5 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            {/* Big wordmark */}
            <div>
              <div
                className="uppercase leading-none text-white/6 select-none mb-1"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  letterSpacing: '0.04em',
                  WebkitTextStroke: '1px rgba(184, 150, 46, 0.15)',
                  color: 'transparent',
                }}
              >
                NEXTUP
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="NextUp Boxing"
                  width={140}
                  height={70}
                  className="w-28 sm:w-36 h-auto"
                />
                <div className="w-px h-12 bg-white/10" />
                <p className="text-xs text-white/35 leading-relaxed max-w-[180px]">
                  The future of boxing entertainment. Premium fights, world-class streaming.
                </p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
                Follow the League
              </span>
            </div>
          </div>
        </div>

        {/* Links columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 py-12 sm:py-16">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#b8962e]/70 mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/30 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#b8962e]/30" />
            <p className="text-[10px] text-white/20">
              © 2026 NextUp Boxing League. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] text-white/20 hover:text-white/50 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
