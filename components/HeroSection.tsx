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
          clipPath: "inset(0 0 100% 0)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.3,
        },
      )

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          scale: 1.1,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          duration: 1.2,
          ease: "power4.inOut",
          delay: 0.2,
        },
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
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      // Diagonal lines animation
      gsap.to(".diagonal-line", {
        x: "100%",
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[700px] h-[100vh] flex-col overflow-hidden bg-[#0d1124]"
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
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 futuristic-grid opacity-20" />

        {/* Glow effects */}
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[#c5203a]/10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#b8962e]/10 blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 sm:px-8 lg:px-16">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* LEFT: TEXT */}
          <motion.div
            ref={textRef}
            style={{ y, opacity }}
            className="order-2 flex flex-col items-start text-left lg:order-1"
          >
            {/* Event badge */}
            <div className="animate-text mb-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-sm border border-[#c5203a]/40 bg-[#c5203a]/20 px-3 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c5203a]" />

                <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/90">
                  MAIN EVENT
                </span>
              </span>

              <span className="text-[0.65rem] font-bold tracking-[0.2em] text-white/50">
                12 ROUNDS
              </span>
            </div>

            {/* Main title */}
            <h1 className="animate-text mb-1">
              <span
                className="block uppercase leading-[0.9] text-white"
                style={{
                  fontFamily: "var(--font-bebas), Impact, sans-serif",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  textShadow: "0 8px 30px rgba(0,0,0,0.5)",
                }}
              >
                ADEBAYO
              </span>
            </h1>

            <div className="animate-text mb-1 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-gradient-to-r from-[#c5203a] to-transparent" />

              <span
                className="tracking-[0.3em] text-[#c5203a]"
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
                  textShadow: "0 8px 30px rgba(0,0,0,0.5)",
                }}
              >
                COLE
              </span>
            </h1>

            {/* Event details */}
            <div className="animate-text mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <div className="h-6 w-[3px] bg-gradient-to-b from-[#b8962e] to-[#c5203a]" />

                <div>
                  <span
                    className="block text-base font-bold uppercase tracking-widest text-white"
                    style={{ fontFamily: "var(--font-bebas)" }}
                  >
                    JUNE 6
                  </span>

                  <span className="text-[0.6rem] tracking-[0.15em] text-white/50">
                    2026
                  </span>
                </div>
              </div>

              <span className="hidden text-lg text-[#c5203a]/60 sm:block">
                |
              </span>

              <span
                className="text-sm font-bold uppercase tracking-widest text-white/70"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                MADISON SQUARE GARDEN
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="animate-text flex flex-wrap items-center gap-3">
              <a
                href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-[#b8962e] px-6 py-3 text-sm font-bold text-[#0d1124] transition-all duration-300 hover:shadow-[0_0_25px_rgba(184,150,46,0.4)]"
              >
                <span className="editorial-button relative z-10">
                  GET TICKETS
                </span>

                <div className="absolute inset-0 translate-x-[-100%] bg-white transition-transform duration-300 group-hover:translate-x-0" />
              </a>

              <a
                href="#livestream"
                className="group relative overflow-hidden border-2 border-white/30 bg-transparent px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:border-white"
              >
                <span className="editorial-button relative z-10">
                  WATCH ON NEXTUP
                </span>

                <div className="absolute inset-0 translate-x-[-100%] bg-white/10 transition-transform duration-300 group-hover:translate-x-0" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Stats overlay - positioned in grid */}
          <div className="relative order-1 flex items-end justify-center pb-10 lg:order-2">
            <div
              ref={statsRef}
              className="z-30 hidden lg:block"
            >
              <div className="glass-dark flex items-center gap-6 rounded-lg px-6 py-3">
                <div className="text-center">
                  <span
                    className="stat-number block text-xl font-bold text-[#b8962e]"
                    data-value="24"
                  >
                    0
                  </span>

                  <span className="text-[0.6rem] uppercase tracking-[0.15em] text-white/60">
                    Wins
                  </span>
                </div>

                <div className="border-x border-white/10 px-6 text-center">
                  <span
                    className="stat-number block text-xl font-bold text-white"
                    data-value="18"
                  >
                    0
                  </span>

                  <span className="text-[0.6rem] uppercase tracking-[0.15em] text-white/60">
                    KOs
                  </span>
                </div>

                <div className="text-center">
                  <span
                    className="stat-number block text-xl font-bold text-[#c5203a]"
                    data-value="0"
                  >
                    0
                  </span>

                  <span className="text-[0.6rem] uppercase tracking-[0.15em] text-white/60">
                    Losses
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Background Cover Image */}
      <motion.div
        ref={imageRef}
        style={{ y: imageY }}
        className="absolute inset-0 z-[1]"
      >
        {/* HUD Frame */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* Top left */}
          <div className="absolute left-6 top-6">
            <div className="h-6 w-6 border-l-2 border-t-2 border-[#c5203a]" />

            <div className="mt-2 h-[2px] w-12 bg-gradient-to-r from-[#c5203a] to-transparent" />
          </div>

          {/* Bottom right */}
          <div className="absolute bottom-6 right-6">
            <div className="ml-auto h-6 w-6 border-b-2 border-r-2 border-[#b8962e]" />

            <div className="ml-auto mt-2 h-[2px] w-12 bg-gradient-to-l from-[#b8962e] to-transparent" />
          </div>

          {/* Side accent */}
          <div className="absolute left-0 top-1/3 h-20 w-1 bg-gradient-to-b from-transparent via-[#c5203a] to-transparent" />
        </div>

        {/* Image container - full cover */}
        <motion.div
          style={{ scale }}
          className="relative h-full w-full"
        >
          <Image
            src="/hero-boxers.png"
            alt="Main Event - Adebayo vs Cole"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/70 via-[#0d1124]/40 to-[#0d1124]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124]/50 via-transparent to-transparent" />
        </motion.div>
      </motion.div>

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
      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-t from-[#0d1124] to-transparent" />
    </section>
  )
}
