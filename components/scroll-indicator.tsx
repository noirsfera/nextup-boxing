"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
  targetId: string
  className?: string
  label?: string
}

export function ScrollIndicator({
  targetId,
  className,
  label,
}: ScrollIndicatorProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        "absolute left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3",
        "group cursor-pointer",
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-label="Scroll to learn more"
    >
      {label ? (
        <span className="section-eyebrow text-[0.65rem] text-white/42 transition-colors group-hover:text-[#d4ae44]">
          {label}
        </span>
      ) : null}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="scroll-glow-indicator relative"
      >
        <div className="flex h-14 w-8 items-start justify-center rounded-full border border-white/18 bg-white/[0.03] p-2 backdrop-blur-sm transition-colors group-hover:border-[#d4ae44]/60">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-3 w-1.5 rounded-full bg-gradient-to-b from-[#d4ae44] to-[#c5203a]"
          />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      >
        <ChevronDown className="h-5 w-5 text-white/45 transition-colors group-hover:text-[#d4ae44]" />
      </motion.div>
    </motion.button>
  )
}
