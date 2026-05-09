"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FloatingElements } from "./FloatingElements"
import { ScrollIndicator } from "./scroll-indicator"
import { Sparkles } from "lucide-react"

export function SplashSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden animated-gradient">
      <FloatingElements />
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/logo.png"
              alt="Next Up Boxing League"
              width={320}
              height={200}
              className="w-56 sm:w-72 md:w-80 h-auto drop-shadow-2xl"
              priority
            />
          </motion.div>
          
          {/* Event badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-full px-5 sm:px-8 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-4"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
                Live Event
              </span>
            </span>
            <span className="w-px h-5 bg-border" />
            <span className="text-sm sm:text-base font-black text-accent tracking-wide">
              JUNE 6, 2026
            </span>
          </motion.div>
          
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-primary leading-[0.85] tracking-tighter text-balance">
              THE FUTURE
              <br />
              <span className="gradient-text">OF BOXING</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed text-pretty"
          >
            Witness the next generation of champions rise
          </motion.p>
        </div>
      </div>
      
      <ScrollIndicator targetId="content" />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
