"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { z } from "zod"
import { X, User, Mail, ShieldAlert, Sparkles, CheckCircle2, Clock, Calendar, MapPin, Loader2 } from "lucide-react"

import { useCountdown } from "@/hooks/use-countdown"
import { EVENT_CONFIG, EVENT_DATE } from "@/lib/event"

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
}

// Client-side Zod validation and sanitization schema
const clientSignupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be less than 100 characters.")
    .transform((val) => val.replace(/<\/?[^>]+(>|$)/g, "")),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .toLowerCase(),
})

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const timeLeft = useCountdown(EVENT_DATE)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Reset form when modal closes or opens
  useEffect(() => {
    if (isOpen) {
      setName("")
      setEmail("")
      setErrors({})
      setServerError(null)
      setIsSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen])

  const validateField = (field: "name" | "email", value: string) => {
    try {
      if (field === "name") {
        clientSignupSchema.shape.name.parse(value)
        setErrors((prev) => ({ ...prev, name: undefined }))
      } else {
        clientSignupSchema.shape.email.parse(value)
        setErrors((prev) => ({ ...prev, email: undefined }))
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.issues[0].message }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    // Validate both fields using Zod
    const validationResult = clientSignupSchema.safeParse({ name, email })

    if (!validationResult.success) {
      const formattedErrors: { name?: string; email?: string } = {}
      validationResult.error.issues.forEach((err) => {
        const path = err.path[0] as "name" | "email"
        formattedErrors[path] = err.message
      })
      setErrors(formattedErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/premium-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: validationResult.data.name,
          email: validationResult.data.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setIsSuccess(true)
    } catch (error) {
      console.error("Premium sign-in error:", error)
      setServerError(error instanceof Error ? error.message : "An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-3 py-4 sm:items-center sm:p-4">
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#060812]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 bg-[#0d1124]/90 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:rounded-3xl md:grid md:grid-cols-12"
          >
            {/* Top Accent Gradient Bar */}
            <div className="absolute left-0 right-0 top-0 h-[4px] bg-gradient-to-r from-[#1e2d5e] via-[#c5203a] to-[#d4ae44]" />

            {/* Left Column - Branding and Countdown (Visible on md+) */}
            <div className="relative hidden flex-col justify-between bg-gradient-to-b from-[#161c36] to-[#090b16] p-8 md:col-span-5 md:flex border-r border-white/5">
              {/* Subtle background glow */}
              <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-full bg-[#d4ae44]/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -z-10 h-32 w-32 rounded-full bg-[#c5203a]/10 blur-3xl" />

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d4ae44]/30 bg-[#d4ae44]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#d4ae44]">
                  <Sparkles size={10} className="animate-pulse" />
                  Fight Club Premium
                </div>
                <h3 className="mt-4 font-impact text-2xl uppercase leading-none tracking-wide text-white">
                  Next Up <br />
                  <span className="text-gradient-gold bg-gradient-to-r from-[#b8962e] to-[#d4ae44] bg-clip-text text-transparent">
                    VIP ACCESS
                  </span>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  Unlock priority event announcements, premium stream access, and notifications directly to your inbox.
                </p>
              </div>

              {/* Event Countdown */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#d4ae44] flex items-center gap-1.5">
                  <Clock size={12} />
                  June 6 Event Approaching
                </p>
                
                <div className="mt-3 grid grid-cols-4 gap-1.5">
                  {[
                    { label: "Days", val: timeLeft.days },
                    { label: "Hrs", val: timeLeft.hours },
                    { label: "Mins", val: timeLeft.minutes },
                    { label: "Secs", val: timeLeft.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="rounded-lg bg-white/5 p-1.5 text-center border border-white/5">
                      <span className="block text-sm font-bold text-white tabular-nums">
                        {unit.val.toString().padStart(2, "0")}
                      </span>
                      <span className="text-[8px] font-medium uppercase tracking-wider text-white/40">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-1.5 text-white/50 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={10} className="text-[#c5203a]" />
                    <span>{EVENT_CONFIG.displayDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={10} className="text-[#c5203a]" />
                    <span className="truncate">{EVENT_CONFIG.venue}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form / Success Content */}
            <div className="flex min-w-0 flex-col justify-between p-5 pt-8 sm:p-8 md:col-span-7">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-white/5 p-1.5 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="signup-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5203a] md:hidden">
                        VIP SIGN IN
                      </span>
                      <h4 className="text-xl sm:text-2xl font-impact uppercase tracking-wide text-white">
                        Enter the Inner Circle
                      </h4>
                      <p className="mt-1 text-xs text-white/60">
                        Receive instant reminders, fight card news, and links for the live June 6 stream.
                      </p>
                    </div>

                    {/* Server Error Alert */}
                    {serverError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400"
                      >
                        <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                        <span>{serverError}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name Input */}
                      <div className="space-y-1">
                        <label htmlFor="premium-name" className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                            <User size={16} />
                          </span>
                          <input
                            id="premium-name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value)
                              if (errors.name) validateField("name", e.target.value)
                            }}
                            onBlur={() => validateField("name", name)}
                            disabled={isSubmitting}
                            className={`w-full rounded-xl border ${
                              errors.name ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/5"
                            } py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 transition-all outline-none focus:border-[#d4ae44]/60 focus:ring-1 focus:ring-[#d4ae44]/60 disabled:opacity-50`}
                          />
                        </div>
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] font-semibold text-red-400 pl-1"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      {/* Email Input */}
                      <div className="space-y-1">
                        <label htmlFor="premium-email" className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
                            <Mail size={16} />
                          </span>
                          <input
                            id="premium-email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (errors.email) validateField("email", e.target.value)
                            }}
                            onBlur={() => validateField("email", email)}
                            disabled={isSubmitting}
                            className={`w-full rounded-xl border ${
                              errors.email ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/5"
                            } py-3 pl-10 pr-4 text-sm text-white placeholder-white/20 transition-all outline-none focus:border-[#d4ae44]/60 focus:ring-1 focus:ring-[#d4ae44]/60 disabled:opacity-50`}
                          />
                        </div>
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] font-semibold text-red-400 pl-1"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b8962e] via-[#d4ae44] to-[#b8962e] py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_4px_20px_rgba(212,174,68,0.25)] transition-all hover:scale-[1.01] hover:shadow-[0_4px_30px_rgba(212,174,68,0.4)] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Securing Entry...</span>
                          </>
                        ) : (
                          <>
                            <span>Unlock Premium Alerts</span>
                          </>
                        )}
                      </button>
                    </form>

                    <p className="mt-4 text-[10px] text-center text-white/40">
                      We value your privacy. Unsubscribe at any time with a single click.
                    </p>
                  </motion.div>
                ) : (
                  /* Success State Animation */
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                      className="rounded-full bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/25"
                    >
                      <CheckCircle2 size={44} />
                    </motion.div>

                    <h4 className="mt-4 font-impact text-2xl uppercase tracking-wide text-white">
                      You Are In!
                    </h4>
                      <p className="mt-2 max-w-sm break-words text-xs leading-relaxed text-white/70 [overflow-wrap:anywhere]">
                        Congratulations <strong>{name}</strong>! Your premium access is activated. We have dispatched a confirmation email to <strong>{email}</strong>.
                      </p>

                    <div className="mt-6 w-full rounded-2xl bg-white/5 border border-white/5 p-4 text-left space-y-3">
                      <div className="text-[10px] font-bold text-[#d4ae44] uppercase tracking-wider">
                        Next Up Details:
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-white/40 text-[10px] uppercase">Event</div>
                          <div className="font-semibold text-white truncate">{EVENT_CONFIG.name}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-[10px] uppercase">Date</div>
                          <div className="font-semibold text-white">{EVENT_CONFIG.displayDate}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-[10px] uppercase">Location</div>
                          <div className="font-semibold text-[#c5203a] truncate">{EVENT_CONFIG.venue}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-[10px] uppercase">Time</div>
                          <div className="font-semibold text-white">{EVENT_CONFIG.displayTime}</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="mt-6 w-full rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Return to Fight Hub
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
