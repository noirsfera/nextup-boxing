"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock } from "lucide-react"
import { useCountdown } from "@/hooks/use-countdown"

const EVENT_DATE = new Date("2026-06-06T19:00:00")

const fightCard = [
  { fighter1: "Marcus Williams", fighter2: "Devon Brooks", division: "Heavyweight", rounds: 12 },
  { fighter1: "Jamal Davis", fighter2: "Tommy Reeves", division: "Light Heavyweight", rounds: 10 },
  { fighter1: "Carlos Mendez", fighter2: "Rico Santos", division: "Middleweight", rounds: 12 },
]

export function EventBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const timeLeft = useCountdown(EVENT_DATE)

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs",  value: timeLeft.hours },
    { label: "Min",  value: timeLeft.minutes },
    { label: "Sec",  value: timeLeft.seconds },
  ]

  return (
    <section id="events" className="relative py-20 sm:py-28 bg-white overflow-hidden" ref={ref}>
      {/* Decorative gold rule at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="h-px w-10 bg-[#c5203a]" />
          <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
            Next Event
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,380px] gap-12 lg:gap-16 items-start">
          {/* Left: Event info */}
          <div>
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#c5203a]/8 border border-[#c5203a]/20 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5203a] animate-pulse" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.3em]">Main Event</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="uppercase leading-[0.88] mb-6"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                color: '#1e2d5e',
              }}
            >
              NextUp
              <span className="block" style={{ color: '#c5203a' }}>Championship</span>
              <span className="block" style={{ color: '#0d1124' }}>Night</span>
            </motion.h2>

            {/* Details row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-5 mb-8 pb-8 border-b border-[#1e2d5e]/8"
            >
              {[
                { icon: Calendar, text: "June 6, 2026" },
                { icon: Clock, text: "7:00 PM EST" },
                { icon: MapPin, text: "Madison Square Garden" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-[#1e2d5e]/60">
                  <Icon className="w-3.5 h-3.5 text-[#b8962e]" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Countdown — editorial data display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-[#b8962e]/40" />
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#1e2d5e]/40">
                  Countdown to Fight Night
                </span>
              </div>
              <div className="flex gap-4 sm:gap-6">
                {timeUnits.map((unit, i) => (
                  <div key={unit.label} className="flex items-end gap-1">
                    <div className="text-center">
                      <div
                        className="tabular-nums text-[#1e2d5e] leading-none"
                        style={{
                          fontFamily: 'var(--font-bebas), Impact, sans-serif',
                          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        }}
                      >
                        {unit.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1e2d5e]/40 mt-1">
                        {unit.label}
                      </div>
                    </div>
                    {i < 3 && (
                      <span
                        className="text-[#b8962e]/50 mb-2"
                        style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem' }}
                      >
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#c5203a] hover:bg-[#a01830] text-white font-bold uppercase tracking-[0.15em] text-sm rounded transition-all duration-300 hover:shadow-xl hover:shadow-[#c5203a]/20 hover:-translate-y-0.5"
              >
                Buy Tickets — $49.99
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#1e2d5e]/15 hover:border-[#1e2d5e]/35 text-[#1e2d5e] font-bold uppercase tracking-[0.15em] text-sm rounded transition-all duration-300 hover:-translate-y-0.5"
              >
                View Fight Card
              </a>
            </motion.div>
          </div>

          {/* Right: Fight card + Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Event Poster */}
            <div className="relative rounded-sm overflow-hidden shadow-2xl shadow-[#1e2d5e]/10 border border-[#1e2d5e]/6">
              <Image
                src="/event-poster.png"
                alt="NextUp Championship Night Poster"
                width={380}
                height={480}
                className="w-full h-auto"
              />
              {/* Gold border accent */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />
            </div>

            {/* Fight card table */}
            <div className="bg-[#0d1124] rounded-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-white/8 flex items-center gap-3">
                <span className="h-px w-5 bg-[#c5203a]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
                  Fight Card Preview
                </span>
              </div>
              {fightCard.map((bout, i) => (
                <div
                  key={i}
                  className="px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white truncate">{bout.fighter1}</p>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider mt-0.5">vs {bout.fighter2}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#b8962e]">{bout.division}</p>
                      <p className="text-[9px] text-white/30 mt-0.5">{bout.rounds} Rounds</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/10 to-transparent" />
    </section>
  )
}
