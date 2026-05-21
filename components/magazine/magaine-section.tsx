"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

import { MagazineCard } from "./magazine-card"

const magazines = [
  {
    coverImage: "/nextupmagcover.jpg",
    issueName: "The Championship",
    issueNumber: "Issue 01",
    releaseDate: "Summer 2026",
  },
]

export function MagazineSection() {
  const ref = useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -50])
  const wordOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.1, 0.18, 0.08])
  const featuredIssue = magazines[0]

  return (
    <section
      id="magazine"
      ref={ref}
      className="relative overflow-hidden bg-[#0a0a0a] px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c5203a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,32,58,0.08),transparent_38%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(184,150,46,0.06),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:38px_38px] opacity-25" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#c5203a]" />
            <span className="section-eyebrow text-[#c5203a]">Magazine</span>
            <span className="h-px w-12 bg-[#c5203a]" />
          </div>

          <h2
            className="text-[clamp(3.2rem,8vw,6rem)] uppercase leading-[0.88] text-white animate-fade-in"
            style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
          >
            Inside The
            <span className="block text-[#b8962e]">Fight Issue</span>
          </h2>

          <p className="editorial-body mx-auto mt-5 max-w-2xl text-sm text-white/70 sm:text-base">
            Long-form reporting, fighter profiles, championship analysis, and the stories that shape
            the sport beyond the final bell. Our magazine is built to feel collectible, informed, and
            rooted in the culture of boxing.
          </p>
        </motion.div>

        <div className="relative mt-20">
          <motion.div
            className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 text-white/5 uppercase"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              opacity: wordOpacity,
              fontFamily: "var(--font-bebas), Impact, sans-serif",
              fontSize: "clamp(7rem, 18vw, 16rem)",
              letterSpacing: "0.08em",
            }}
          >
            Ring
          </motion.div>

          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />

          <motion.div
            style={{ y: cardY }}
            className="relative z-10 flex justify-center"
          >
            <div className="w-full max-w-[360px] sm:max-w-[430px] lg:max-w-[500px] flex flex-col items-center">
              <MagazineCard {...featuredIssue} />
              
              {/* Elegant digital release label that blends well */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#b8962e]/30 bg-[#b8962e]/5 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#b8962e] animate-pulse" />
                <span 
                  className="text-[0.7rem] uppercase tracking-[0.25em] text-[#b8962e] font-bold"
                  style={{ fontFamily: "var(--font-sans), sans-serif" }}
                >
                  Digital versions dropping soon
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#b8962e] animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 border-y border-white/10 px-6 py-8 bg-white/[0.01] backdrop-blur-sm rounded-2xl">
            <p className="section-eyebrow text-[#b8962e]/90 font-bold uppercase tracking-widest text-xs">Editorial Release</p>
            <p className="editorial-body max-w-xl text-sm text-white/70 sm:text-base">
              Be first to read each new issue, from cover features and ringside essays to the sharp
              analysis behind boxing&apos;s biggest moments.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row w-full justify-center">
              <button className="editorial-button rounded-full bg-[#b8962e] px-8 py-3 text-black font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c9a435] shadow-lg">
                Read The Issue
              </button>
              <button className="editorial-button rounded-full border border-white/20 bg-transparent px-8 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b8962e] hover:text-[#b8962e]">
                Join The List
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
