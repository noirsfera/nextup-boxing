"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const sponsors = [
  { name: "BULOVAS RESTORATIONS", url: "https://www.bulovasrestorations.com/index.html" },
  { name: "M&T STRONG CONCRETE", url: "https://mbstrongconcrete.com/" },
]

const sponsorTickerItems = Array.from({ length: 6 }, () => sponsors).flat()
const sponsorTickerTrack = [...sponsorTickerItems, ...sponsorTickerItems]

export function SponsorsStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#080c18] py-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');

        @keyframes sponsor-ticker {
          to {
            transform: translateX(-50%);
          }
        }

        .sponsor-ticker-wrap {
          position: relative;
          overflow: hidden;
          background: rgba(184,150,46,.038);
          border-top: 1px solid rgba(184,150,46,.08);
          border-bottom: 1px solid rgba(184,150,46,.1);
          padding: 9px 0;
        }

        .sponsor-ticker-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 90px;
          z-index: 2;
          pointer-events: none;
        }

        .sponsor-ticker-fade--l {
          left: 0;
          background: linear-gradient(90deg, #080c18, transparent);
        }

        .sponsor-ticker-fade--r {
          right: 0;
          background: linear-gradient(270deg, #080c18, transparent);
        }

        .sponsor-ticker-track {
          display: flex;
          width: max-content;
          animation: sponsor-ticker 32s linear infinite;
          will-change: transform;
        }

        .sponsor-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 24px;
          padding: 0 28px;
          white-space: nowrap;
          font-family: 'Barlow Condensed', var(--font-bebas), sans-serif;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,255,255,.95);
          text-decoration: none;
          transition: color .28s ease, transform .28s ease;
        }

        .sponsor-ticker-item:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        .sponsor-ticker-gem {
          width: 5px;
          height: 5px;
          flex-shrink: 0;
          background: rgba(197,32,58,.45);
          transform: rotate(45deg);
        }

        @media (max-width: 768px) {
          .sponsor-ticker-item {
            font-size: 0.9rem;
            letter-spacing: .12em;
          }
        }
      `}</style>

      <div className="h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative mb-8 overflow-hidden"
      >
        <div className="sponsor-ticker-wrap" aria-label="Official sponsor ticker">
          <div className="sponsor-ticker-fade sponsor-ticker-fade--l" aria-hidden="true" />
          <div className="sponsor-ticker-fade sponsor-ticker-fade--r" aria-hidden="true" />

          <div className="sponsor-ticker-track">
            {sponsorTickerTrack.map((sponsor, i) => (
              <a
                key={`${sponsor.name}-${i}`}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-ticker-item"
              >
                {sponsor.name}
                <span className="sponsor-ticker-gem" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#b8962e]/30 to-transparent" />
    </section>
  )
}