"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-secondary/20 to-transparent blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-accent/5 to-transparent blur-3xl"
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        animate={{
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-20 right-[20%] w-16 h-16 border-2 border-secondary/30 rounded-xl"
      />
      
      <motion.div
        animate={{
          rotate: -360,
          x: [0, 15, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-32 left-[15%] w-12 h-12 border-2 border-primary/20 rounded-full"
      />
      
      <motion.div
        animate={{
          rotate: 180,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-1/2 right-[10%] w-8 h-8 bg-secondary/20 rounded-sm"
      />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  )
}
