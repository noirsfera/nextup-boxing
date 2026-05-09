"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Countdown } from "./Countdown"
import { EmailSignup } from "./email-signup"
import { Play, Sparkles, Trophy, Users, Zap } from "lucide-react"

// Event date: June 6, 2026
const EVENT_DATE = new Date("2026-06-06T19:00:00")

const features = [
  {
    icon: Play,
    title: "HD Livestream",
    description: "Crystal clear 4K streaming with multiple camera angles",
  },
  {
    icon: Trophy,
    title: "Championship Bouts",
    description: "Watch rising stars compete for glory in the ring",
  },
  {
    icon: Users,
    title: "Exclusive Access",
    description: "Behind-the-scenes content and fighter interviews",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Live stats, scores, and instant notifications",
  },
]

export function ContentSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      id="content" 
      className="relative min-h-screen bg-background py-20 sm:py-32"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6" ref={ref}>
        {/* Countdown section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">
            The Countdown Begins
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-primary mb-8 sm:mb-12">
            EVENT STARTS IN
          </h2>
          <Countdown targetDate={EVENT_DATE} />
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-strong rounded-2xl p-6 sm:p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mx-auto mb-4 group-hover:from-secondary/30 group-hover:to-secondary/10 transition-colors">
                <feature.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Email signup section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="glass-strong rounded-3xl p-8 sm:p-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
                Get Notified
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-primary mb-4">
              {"Don't"} Miss The Action
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              Sign up now to receive livestream notifications and exclusive updates. Be the first to know when we go live.
            </p>
            <EmailSignup />
            <p className="text-xs text-muted-foreground/60 mt-6">
              By signing up, you agree to receive event notifications. We respect your privacy.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </section>
  )
}
