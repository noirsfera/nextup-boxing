"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ScrollIndicatorProps {
  targetId: string
}

export function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-label="Scroll to learn more"
    >
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">
        Scroll Down
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="relative"
      >
        <div className="w-8 h-14 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 group-hover:border-primary/60 transition-colors">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1.5 h-3 bg-secondary rounded-full"
          />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.2
        }}
      >
        <ChevronDown className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
      </motion.div>
    </motion.button>
  )
}
