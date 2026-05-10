"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Play, Ticket } from "lucide-react"

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.08, 1])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0d1124]"
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/hero-boxers.png"
          alt="Two boxers in an intense match"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/97 via-[#0d1124]/75 to-[#0d1124]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-transparent to-[#0d1124]/50" />
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px',
        mixBlendMode: 'overlay',
      }} />

      {/* Top crimson editorial line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c5203a]" />

      {/* Left vertical editorial label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#b8962e]/40 to-transparent" />
        <span
          className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/25"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Fight Night — June 6, 2026
        </span>
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#b8962e]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full py-32">
        <motion.div style={{ y, opacity }} className="max-w-3xl">

          {/* Editorial badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-10 bg-[#c5203a]" />
            <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
              Main Event · June 6, 2026
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="uppercase leading-[0.85] mb-6"
            style={{
              fontFamily: 'var(--font-bebas), Impact, sans-serif',
              fontSize: 'clamp(5rem, 11vw, 10rem)',
            }}
          >
            <span className="block text-white">Where</span>
            <span className="block text-white">Legends</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #c5203a 0%, #b8962e 55%, #c5203a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% auto',
                animation: 'shimmer-gradient 4s ease-in-out infinite',
              }}
            >
              Are Made
            </span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-white/50 max-w-xl mb-10 leading-relaxed"
          >
            The most anticipated boxing event of 2026. Ten championship bouts.
            One unforgettable night. Stream it live from anywhere in the world.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#events"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#c5203a] hover:bg-[#a01830] text-white font-bold uppercase tracking-[0.15em] text-sm rounded transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5203a]/30 hover:-translate-y-1"
            >
              <Ticket className="w-4 h-4" />
              Get Tickets
            </a>
            <a
              href="#livestream"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#b8962e]/30 hover:border-[#b8962e]/70 text-[#b8962e] font-bold uppercase tracking-[0.15em] text-sm rounded transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              <div className="relative">
                <Play className="w-4 h-4" />
                <div className="absolute inset-0 animate-ping">
                  <Play className="w-4 h-4 opacity-30" />
                </div>
              </div>
              Watch Trailer
            </a>
          </motion.div>

          {/* Stats row — editorial horizontal rule style */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 pt-8 border-t border-white/8"
          >
            {/* Rule label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-6 bg-[#b8962e]/50" />
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/25">
                Event Statistics
              </span>
            </div>
            <div className="flex gap-10 sm:gap-14">
              {[
                { value: "10", label: "Championship Bouts" },
                { value: "20", label: "Elite Fighters" },
                { value: "4K", label: "Live Stream" },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <span
                    className="block font-bold text-white leading-none mb-1"
                    style={{
                      fontFamily: 'var(--font-bebas), Impact, sans-serif',
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      color: '#b8962e',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-white/35 uppercase tracking-[0.2em] font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent" />
    </section>
  )
}
