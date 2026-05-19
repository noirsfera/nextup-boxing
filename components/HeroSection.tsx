"use client"

import { useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Play, Ticket } from "lucide-react"

import { EmailSignup } from "@/components/email-signup"
import { ScrollIndicator } from "@/components/scroll-indicator"

const fightPreview = [
  { division: "Heavyweight", matchup: "Adebayo vs Cole", slot: "Main Event" },
  { division: "Welterweight", matchup: "Mokoena vs Price", slot: "Co-Main" },
  { division: "Featherweight", matchup: "Santos vs Reed", slot: "Feature Bout" },
  { division: "Lightweight", matchup: "King vs Alvarez", slot: "Prospect Clash" },
]

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isSignupFocused, setIsSignupFocused] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.35])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.08, 1])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d1124]"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div className="absolute inset-0">
          <Image
            src="/hero-boxers.png"
            alt="Main Event"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1124]/70 via-[#0d1124]/30 to-[#0d1124]/90" />
        </div>
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.1\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-32 pb-48 sm:px-8 lg:px-16 text-center">
        <motion.div 
          style={{ y, opacity }} 
          className="flex w-full max-w-5xl flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="text-sm font-bold tracking-[0.2em] text-white/80 drop-shadow-md">MAIN EVENT</span>
            <span className="h-1 w-1 rounded-full bg-[#c5203a]" />
            <span className="text-sm font-bold tracking-[0.2em] text-white/80 drop-shadow-md">12 ROUNDS</span>
          </div>

          <h1
            className="mb-6 uppercase leading-[0.85] text-white drop-shadow-2xl"
            style={{
              fontFamily: "var(--font-bebas), Impact, sans-serif",
              fontSize: "clamp(6rem, 15vw, 14rem)",
            }}
          >
            <span className="block text-white" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>ADEBAYO</span>
            <span className="block text-[#c5203a] text-[0.4em] leading-tight my-2 drop-shadow-lg">VS</span>
            <span className="block text-white" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>COLE</span>
          </h1>

          <div className="mt-4 mb-10 flex flex-col items-center justify-center gap-3">
            <span className="text-3xl font-bold uppercase tracking-widest text-white drop-shadow-lg" style={{ fontFamily: "var(--font-bebas)" }}>
              JUNE 6 <span className="mx-3 text-[#c5203a]">|</span> MADISON SQUARE GARDEN
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
            <a
              href="#events"
              className="editorial-button inline-flex items-center justify-center gap-3 bg-[#1e9b46] px-10 py-5 text-white transition-all duration-300 hover:bg-[#157a35] text-lg font-bold shadow-[0_10px_30px_rgba(30,155,70,0.3)] hover:-translate-y-1"
            >
              GET TICKETS
            </a>
            <a
              href="#livestream"
              className="editorial-button inline-flex items-center justify-center gap-3 bg-white px-10 py-5 text-[#0d1124] transition-all duration-300 hover:bg-gray-100 text-lg font-bold shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
            >
              WATCH ON NEXTUP
            </a>
          </div>

          <div
            className="mt-16 w-full max-w-lg"
            onFocusCapture={() => setIsSignupFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsSignupFocused(false)
              }
            }}
          >
            <EmailSignup variant="hero" />
          </div>

        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#b8962e]/20 bg-[#1e2d5e] shadow-[0_-10px_30px_rgba(0,0,0,0.16)]">
        <div className="flex h-auto flex-col items-stretch md:h-[92px] md:flex-row">
          <div className="relative shrink-0 overflow-hidden bg-[#c5203a] px-6 py-4 text-white md:w-[220px] md:py-0">
            <div className="relative z-10 flex h-full flex-col justify-center">
              <span className="editorial-meta mb-1 text-white/90">June 6</span>
              <span
                className="text-2xl uppercase leading-none tracking-[0.06em] text-white"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
              >
                Fight Card
              </span>
            </div>
            <div className="absolute bottom-0 right-[-20px] top-0 w-10 -skew-x-[20deg] bg-black/10" />
          </div>

          <div
            className="flex flex-1 items-center gap-2 overflow-x-auto p-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style dangerouslySetInnerHTML={{ __html: "::-webkit-scrollbar { display: none; }" }} />

            {fightPreview.map((fight) => (
              <div
                key={fight.matchup}
                className="relative flex h-[76px] w-[232px] flex-shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-white/96 px-4 py-3 shadow-[0_10px_24px_rgba(13,17,36,0.18)]"
              >
                <div className="mb-1.5 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#0d1124]/46">
                  <span className="truncate pr-2 text-[#c5203a]">{fight.division}</span>
                  <span className="shrink-0 text-[#1e2d5e]/55">{fight.slot}</span>
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0d1124]">
                  {fight.matchup}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
