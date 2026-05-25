"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [20, -20])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.04, 1])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 30])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation with stagger
      gsap.fromTo(
        textRef.current?.querySelectorAll(".animate-text") || [],
        { 
          y: 50, 
          opacity: 0,
          clipPath: "inset(0 0 100% 0)"
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3
        }
      )

      // Image reveal with clip-path from left
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          scale: 1.1
        },
        {
          clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
          scale: 1,
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.2
        }
      )

      // Stats counter animation
      const stats = statsRef.current?.querySelectorAll(".stat-number")
      stats?.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-value") || "0")
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // Diagonal lines animation
      gsap.to(".diagonal-line", {
        x: "100%",
        duration: 20,
        repeat: -1,
        ease: "none"
      })

    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[600px] h-[85vh] flex-col overflow-hidden bg-[#0d1124]"
    >
      {/* Futuristic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal speed lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="diagonal-line absolute h-[1px] w-[200%] bg-gradient-to-r from-transparent via-[#c5203a] to-transparent"
              style={{
                top: `${10 + i * 12}%`,
                left: "-100%",
                transform: "rotate(-15deg)"
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 futuristic-grid opacity-20" />
        
        {/* Glow effects */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c5203a]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#b8962e]/10 rounded-full blur-[100px]" />
      </div>

      {/* Main content grid - Image LEFT, Text RIGHT */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 sm:px-8 lg:px-16 flex items-center">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 items-center w-full pt-20 lg:pt-0">
          
          {/* LEFT: Hero Image - Centered */}
          <motion.div 
            ref={imageRef}
            style={{ y: imageY }}
            className="relative h-[350px] lg:h-[520px] order-2 lg:order-1 flex items-center justify-center"
          >
            {/* HUD-style frame */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Top left corner */}
              <div className="absolute top-4 left-4">
                <div className="w-6 h-6 border-l-2 border-t-2 border-[#c5203a]" />
                <div className="mt-2 w-12 h-[2px] bg-gradient-to-r from-[#c5203a] to-transparent" />
              </div>
              {/* Bottom right corner */}
              <div className="absolute bottom-4 right-4">
                <div className="w-6 h-6 border-r-2 border-b-2 border-[#b8962e] ml-auto" />
                <div className="mt-2 w-12 h-[2px] bg-gradient-to-l from-[#b8962e] to-transparent ml-auto" />
              </div>
              {/* Left side accent */}
              <div className="absolute left-0 top-1/3 w-1 h-20 bg-gradient-to-b from-transparent via-[#c5203a] to-transparent" />
            </div>

            {/* Actual image */}
            <motion.div className="absolute inset-0" style={{ scale }}>
              <Image
                src="/hero-boxers.png"
                alt="Main Event - Adebayo vs Cole"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0d1124]/20 to-[#0d1124]/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124]/50 via-transparent to-transparent" />
            </motion.div>

            {/* Fighter stats overlay - Bottom centered */}
            <div ref={statsRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden lg:block">
              <div className="glass-dark rounded-lg px-6 py-3 flex items-center gap-6">
                <div className="text-center">
                  <span className="stat-number block text-xl font-bold text-[#b8962e]" data-value="24">0</span>
                  <span className="text-[0.6rem] tracking-[0.15em] text-white/60 uppercase">Wins</span>
                </div>
                <div className="text-center border-x border-white/10 px-6">
                  <span className="stat-number block text-xl font-bold text-white" data-value="18">0</span>
                  <span className="text-[0.6rem] tracking-[0.15em] text-white/60 uppercase">KOs</span>
                </div>
                <div className="text-center">
                  <span className="stat-number block text-xl font-bold text-[#c5203a]" data-value="0">0</span>
                  <span className="text-[0.6rem] tracking-[0.15em] text-white/60 uppercase">Losses</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Text Content - Compact like Ring Magazine */}
          <motion.div 
            ref={textRef}
            style={{ y, opacity }} 
            className="flex flex-col items-start text-left z-20 order-1 lg:order-2"
          >
            {/* Event badge - smaller */}
            <div className="animate-text mb-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-[#c5203a]/20 border border-[#c5203a]/40 px-3 py-1.5 rounded-sm">
                <span className="w-1.5 h-1.5 bg-[#c5203a] rounded-full animate-pulse" />
                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/90">MAIN EVENT</span>
              </span>
              <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/50">12 ROUNDS</span>
            </div>

            {/* Main title - SMALLER */}
            <h1 className="animate-text mb-1">
              <span 
                className="block uppercase leading-[0.9] text-white"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  textShadow: "0 8px 30px rgba(0,0,0,0.5)"
                }}
              >
                ADEBAYO
              </span>
            </h1>
            
            <div className="animate-text flex items-center gap-3 mb-1">
              <span className="h-[2px] w-8 bg-gradient-to-r from-[#c5203a] to-transparent" />
              <span 
                className="text-[#c5203a] tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(1rem, 2vw, 1.5rem)",
                }}
              >
                VS
              </span>
              <span className="h-[2px] w-8 bg-gradient-to-l from-[#c5203a] to-transparent" />
            </div>

            <h1 className="animate-text mb-4">
              <span 
                className="block uppercase leading-[0.9] text-white"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  textShadow: "0 8px 30px rgba(0,0,0,0.5)"
                }}
              >
                COLE
              </span>
            </h1>

            {/* Event details - compact */}
            <div className="animate-text flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-[3px] h-6 bg-gradient-to-b from-[#b8962e] to-[#c5203a]" />
                <div>
                  <span 
                    className="block text-base font-bold uppercase tracking-widest text-white"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    JUNE 6
                  </span>
                  <span className="text-[0.6rem] tracking-[0.15em] text-white/50">2026</span>
                </div>
              </div>
              <span className="hidden sm:block text-[#c5203a]/60 text-lg">|</span>
              <span 
                className="text-sm font-bold uppercase tracking-widest text-white/70"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                MADISON SQUARE GARDEN
              </span>
            </div>

            {/* CTA Buttons - smaller */}
            <div className="animate-text flex flex-wrap items-center gap-3">
              <a
                href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-[#b8962e] px-6 py-3 text-sm font-bold text-[#0d1124] transition-all duration-300 hover:shadow-[0_0_25px_rgba(184,150,46,0.4)]"
              >
                <span className="relative z-10 editorial-button">GET TICKETS</span>
                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a
                href="#livestream"
                className="group relative overflow-hidden border-2 border-white/30 bg-transparent px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-white"
              >
                <span className="relative z-10 editorial-button">WATCH ON NEXTUP</span>
                <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1124] to-transparent z-10" />
    </section>
  )
}
