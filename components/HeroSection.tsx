"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Countdown } from "./Countdown"
import { EmailSignup } from "./email-signup"
import { FloatingElements } from "./FloatingElements"
import { Play, Sparkles } from "lucide-react"

// Event date: June 6, 2026
const EVENT_DATE = new Date("2026-06-06T19:00:00")

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient">
      <FloatingElements />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/logo.png"
              alt="Next Up Boxing League"
              width={280}
              height={180}
              className="w-48 sm:w-64 md:w-72 h-auto drop-shadow-2xl"
              priority
            />
          </motion.div>
          
          {/* Event badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-full px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
                Live Event
              </span>
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="text-xs sm:text-sm font-bold text-accent">
              June 6, 2026
            </span>
          </motion.div>
          
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.9] tracking-tight text-balance">
              THE FUTURE OF
              <br />
              <span className="gradient-text">BOXING</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              Witness the next generation of champions rise. 
              Get exclusive livestream access to the most anticipated boxing event of the year.
            </p>
          </motion.div>
          
          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4 sm:mb-6">
              Event Starts In
            </p>
            <Countdown targetDate={EVENT_DATE} />
          </motion.div>
          
          {/* Email signup */}
          <div className="w-full max-w-lg space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground"
            >
              Sign up to receive livestream notifications and exclusive updates
            </motion.p>
            <EmailSignup />
          </div>
          
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8"
          >
            {[
              { icon: Play, text: "HD Livestream" },
              { icon: Sparkles, text: "Exclusive Access" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <feature.icon className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
