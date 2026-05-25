"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

// Use event sponsors / partners provided
const sponsors = [
  { name: "BULOVAS RESTORATIONS", url: "https://www.bulovasrestorations.com/index.html" },
  { name: "M&T STRONG CONCRETE", url: "https://mbstrongconcrete.com/" },
]

// Duplicate for seamless loop
const track1 = [...sponsors, ...sponsors]
const track2 = [...sponsors].reverse().concat([...sponsors].reverse())

export function SponsorsStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-0">
      {/* Top brand gradient rule */}
      <div className="h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-4 py-8"
      >
        <span className="h-px w-16 bg-[#b8962e]/25" />
        <span className="section-eyebrow text-white">
          Official Partners &amp; Sponsors
        </span>
        <span className="h-px w-16 bg-[#b8962e]/25" />
      </motion.div>

      {/* Ticker Row 1 — LTR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative overflow-hidden mb-4"
      >
        <div className="marquee-track">
          {track1.map((sponsor, i) => (
            <div
              key={`t1-${i}`}
              className="flex-shrink-0 flex items-center mx-8 sm:mx-10"
            >
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-black uppercase text-white hover:text-[#b8962e] transition-colors duration-500 select-none"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                  letterSpacing: "0.08em",
                }}
              >
                {sponsor.name}
              </a>

              <span className="ml-6 sm:ml-8 w-1 h-1 rounded-full bg-[#b8962e]/25 flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Ticker Row 2 — RTL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative overflow-hidden mb-8"
      >
        <div className="marquee-track-reverse">
          {track2.map((sponsor, i) => (
            <div
              key={`t2-${i}`}
              className="flex-shrink-0 flex items-center mx-8 sm:mx-10"
            >
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-black uppercase text-white hover:text-[#c5203a] transition-colors duration-500 select-none"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(0.95rem, 2.25vw, 1.1rem)",
                  letterSpacing: "0.1em",
                }}
              >
                {sponsor.name}
              </a>

              <span className="ml-6 sm:ml-8 w-1 h-1 rounded-full bg-[#c5203a]/20 flex-shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  )
}