"use client"

import { motion } from "framer-motion"
import { useCountdown } from "@/hooks/use-countdown"

interface CountdownProps {
  targetDate: Date
}

export function Countdown({ targetDate }: CountdownProps) {
  const timeLeft = useCountdown(targetDate)

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-6 min-w-[60px] sm:min-w-[100px] pulse-glow">
            <motion.span
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="block text-2xl sm:text-5xl md:text-6xl font-bold text-primary tabular-nums"
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.span>
          </div>
          <span className="mt-2 text-[10px] sm:text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
