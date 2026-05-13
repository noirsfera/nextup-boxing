"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

const factoids = [
  { label: "4K Ultra HD", detail: "Crystal clear" },
  { label: "Zero Latency", detail: "< 1 sec delay" },
  { label: "50+ Countries", detail: "Global access" },
  { label: "Multi-Angle", detail: "6 camera feeds" },
]

export function LiveStreamPromo() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="livestream"
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#0d1124]"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px',
          mixBlendMode: 'overlay',
          opacity: 0.7,
        }}
      />

      {/* Background image — low opacity */}
      <div className="absolute inset-0">
        <Image
          src="/broadcast-scene.png"
          alt="Live broadcast production"
          fill
          className="object-cover object-center opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/98 via-[#0d1124]/85 to-[#0d1124]/60" />
      </div>

      {/* Top/bottom editorial rules */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
                Live Streaming
              </span>
            </motion.div>

            {/* Big "LIVE" wordmark behind headline */}
            <div className="relative mb-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.1 }}
                className="absolute -top-4 -left-2 select-none pointer-events-none"
                style={{
                  fontFamily: 'var(--font-bebas), Impact, sans-serif',
                  fontSize: 'clamp(6rem, 18vw, 14rem)',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(184, 150, 46, 0.06)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                LIVE
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative uppercase leading-[0.88] mb-6"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
              }}
            >
              <span className="block text-white">Never Miss</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #c5203a 0%, #b8962e 60%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                A Moment
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/45 max-w-lg mb-10 leading-relaxed"
              style={{ fontSize: '0.95rem', lineHeight: '1.75' }}
            >
              Stream every fight in crystal-clear 4K from any device, anywhere
              in the world. Multi-angle cameras, instant replays, and expert
              commentary bring you ringside for every punch.
            </motion.p>

            {/* Factoid boxes — editorial style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {factoids.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                  className="border border-white/8 rounded-sm p-4 hover:border-[#b8962e]/30 transition-colors duration-300"
                >
                  <div
                    className="font-bold text-[#b8962e] mb-0.5"
                    style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: '1.25rem', letterSpacing: '0.05em' }}
                  >
                    {f.label}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                    {f.detail}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c5203a] hover:bg-[#a01830] text-white font-bold uppercase tracking-[0.15em] text-sm rounded transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5203a]/30 hover:-translate-y-1"
              >
                Subscribe Now — $9.99/mo
              </a>
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#b8962e]/25 hover:border-[#b8962e]/60 text-[#b8962e] font-bold uppercase tracking-[0.15em] text-sm rounded transition-all duration-300 hover:-translate-y-1"
              >
                <Play className="w-4 h-4 transition-transform group-hover:scale-110" />
                Watch Preview
              </a>
            </motion.div>
          </div>

          {/* Right: broadcast visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-6 bg-gradient-to-br from-[#c5203a]/10 via-[#b8962e]/5 to-transparent rounded-sm blur-3xl" />

            <div className="relative rounded-sm overflow-hidden border border-white/8 shadow-2xl shadow-black/60">
              <Image
                src="/broadcast-scene.png"
                alt="Live streaming broadcast"
                width={700}
                height={400}
                className="w-full h-auto"
              />

              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#0d1124]/30 group cursor-pointer hover:bg-[#0d1124]/15 transition-colors">
                <div className="w-18 h-18 rounded-full bg-[#c5203a]/90 flex items-center justify-center shadow-2xl shadow-[#c5203a]/50 group-hover:scale-110 transition-transform duration-300"
                  style={{ width: '4.5rem', height: '4.5rem' }}
                >
                  <Play className="w-7 h-7 text-white ml-0.5" fill="white" />
                </div>
              </div>

              {/* Live badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#c5203a] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-white text-[10px] font-bold uppercase tracking-[0.25em]">Live</span>
              </div>

              {/* Caption bar — editorial inset */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-[#0d1124]/95 to-transparent">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8962e]">
                  NextUp Championship Night
                </p>
                <p className="text-[9px] text-white/35 mt-0.5">
                  June 6, 2026 · Madison Square Garden · 7PM EST
                </p>
              </div>
            </div>

            {/* Gold bar accent below image */}
            <div className="h-1 bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a] mt-0 rounded-b-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
