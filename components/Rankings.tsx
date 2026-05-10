"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Trophy, ChevronRight } from "lucide-react"

const fighters = [
  {
    rank: 1,
    name: "Marcus 'The Storm' Williams",
    nickname: "The Storm",
    division: "Heavyweight",
    record: "28-1-0",
    ko: 22,
    image: "/fighter-1.png",
    champion: true,
  },
  {
    rank: 2,
    name: "Jamal 'Iron Jaw' Davis",
    nickname: "Iron Jaw",
    division: "Light Heavyweight",
    record: "25-2-0",
    ko: 18,
    image: "/fighter-2.png",
    champion: false,
  },
  {
    rank: 3,
    name: "Carlos 'El Relámpago' Mendez",
    nickname: "El Relámpago",
    division: "Middleweight",
    record: "30-1-1",
    ko: 24,
    initials: "CM",
    champion: false,
  },
  {
    rank: 4,
    name: "Viktor 'The Machine' Petrov",
    nickname: "The Machine",
    division: "Welterweight",
    record: "22-3-0",
    ko: 15,
    initials: "VP",
    champion: false,
  },
  {
    rank: 5,
    name: "Kenji 'Thunder' Tanaka",
    nickname: "Thunder",
    division: "Super Middleweight",
    record: "27-2-0",
    ko: 20,
    initials: "KT",
    champion: false,
  },
]

export function Rankings() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="rankings" ref={ref} className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b8962e]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-px w-10 bg-[#c5203a]" />
              <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
                Fighter Rankings
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="uppercase leading-[0.88]"
              style={{
                fontFamily: 'var(--font-bebas), Impact, sans-serif',
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                color: '#1e2d5e',
              }}
            >
              Pound For
              <span className="block" style={{ color: '#c5203a' }}>Pound</span>
            </motion.h2>
          </div>

          <div className="flex items-end gap-6">
            {/* Last updated */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-right"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1e2d5e]/35 mb-0.5">Last Updated</p>
              <p className="text-xs font-medium text-[#1e2d5e]/50">May 2026 · Vol. I</p>
            </motion.div>

            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="hidden sm:inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/50 hover:text-[#c5203a] transition-colors group"
            >
              View All
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Column headers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden sm:grid grid-cols-[64px,1fr,120px,80px,80px,48px] gap-4 px-4 pb-3 border-b-2 border-[#1e2d5e]/8 mb-0"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1e2d5e]/30">#</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1e2d5e]/30">Fighter</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1e2d5e]/30">Division</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1e2d5e]/30 text-right">Record</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1e2d5e]/30 text-right">KOs</span>
          <span />
        </motion.div>

        {/* Fighter Rows */}
        <div className="divide-y divide-[#1e2d5e]/6">
          {fighters.map((fighter, index) => (
            <motion.div
              key={fighter.name}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
              className={`group relative flex items-center gap-4 py-5 px-4 cursor-pointer transition-all duration-300 hover:bg-[#1e2d5e]/[0.025] ${
                fighter.champion ? 'bg-[#b8962e]/[0.03]' : ''
              }`}
            >
              {/* Champion gold bar */}
              {fighter.champion && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#b8962e]" />
              )}

              {/* Rank — huge editorial number */}
              <div className="w-16 flex-shrink-0 flex items-center justify-center">
                <span
                  className="leading-none tabular-nums"
                  style={{
                    fontFamily: 'var(--font-bebas), Impact, sans-serif',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: fighter.champion ? '#b8962e' : 'rgba(30, 45, 94, 0.18)',
                  }}
                >
                  {fighter.rank}
                </span>
              </div>

              {/* Photo / Initials */}
              <div className="flex-shrink-0 relative">
                <div
                  className={`absolute -inset-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity ${
                    fighter.champion ? 'bg-[#b8962e]' : 'bg-[#c5203a]'
                  }`}
                  style={{ opacity: fighter.champion ? 0.15 : 0 }}
                />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-sm overflow-hidden bg-[#1e2d5e]/8 group-hover:shadow-md transition-shadow">
                  {"image" in fighter && fighter.image ? (
                    <Image
                      src={fighter.image}
                      alt={fighter.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: fighter.champion
                          ? 'linear-gradient(135deg, #b8962e, #c9a435)'
                          : 'linear-gradient(135deg, #1e2d5e, #2a3d7a)',
                      }}
                    >
                      <span className="text-sm font-black text-white">
                        {"initials" in fighter ? fighter.initials : ""}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Fighter Info — flex layout */}
              <div className="flex-1 min-w-0 sm:grid sm:grid-cols-[1fr,120px,80px,80px] sm:gap-4 sm:items-center">
                {/* Name + division */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm sm:text-[15px] font-bold text-[#0d1124] truncate group-hover:text-[#1e2d5e] transition-colors">
                      {fighter.name}
                    </h3>
                    {fighter.champion && (
                      <Trophy className="w-3 h-3 text-[#b8962e] flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e2d5e]/40 sm:hidden">
                    {fighter.division}
                  </p>
                </div>

                {/* Division — desktop */}
                <p className="hidden sm:block text-xs font-medium text-[#1e2d5e]/50 uppercase tracking-wider">
                  {fighter.division}
                </p>

                {/* Record */}
                <div className="hidden sm:block text-right">
                  <span className="text-sm font-bold text-[#0d1124]">{fighter.record}</span>
                </div>

                {/* KOs */}
                <div className="hidden sm:block text-right">
                  <span className="text-sm font-bold" style={{ color: '#b8962e' }}>{fighter.ko}</span>
                </div>
              </div>

              {/* Mobile record */}
              <div className="sm:hidden text-right flex-shrink-0">
                <span className="text-sm font-bold text-[#0d1124]">{fighter.record}</span>
                <span className="block text-[9px] text-[#1e2d5e]/35 uppercase tracking-wider mt-0.5">W-L-D</span>
              </div>

              {/* Arrow */}
              <ChevronRight className="w-4 h-4 text-[#1e2d5e]/15 group-hover:text-[#c5203a] transition-colors flex-shrink-0" />
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-4 mt-10 pt-8 border-t border-[#1e2d5e]/6"
        >
          <span className="h-px w-12 bg-[#b8962e]/25" />
          <Trophy className="w-4 h-4 text-[#b8962e]/40" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1e2d5e]/30">
            Official NextUp Rankings · May 2026
          </span>
          <Trophy className="w-4 h-4 text-[#b8962e]/40" />
          <span className="h-px w-12 bg-[#b8962e]/25" />
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e2d5e]/8 to-transparent" />
    </section>
  )
}
