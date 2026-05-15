"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play, Ticket } from "lucide-react"

import { EmailSignup } from "@/components/email-signup"

type HeroSlide = {
  id: string
  eyebrow: string
  label: string
  title: [string, string, string]
  accentLine: number
  description: string
  image:
    | {
        kind: "single"
        src: string
        alt: string
        className: string
      }
    | {
        kind: "duo"
        backgroundSrc: string
        leftSrc: string
        rightSrc: string
        alt: string
      }
  primaryCta: {
    href: string
    label: string
    icon: "ticket" | "play"
  }
  secondaryCta: {
    href: string
    label: string
  }
  stats: Array<{
    value: string
    label: string
  }>
}

const heroSlides: HeroSlide[] = [
  {
    id: "main-event",
    eyebrow: "Main Event - June 6, 2026",
    label: "June 6 Fight Night",
    title: ["June 6", "Fight Night", "Starts Here"],
    accentLine: 2,
    description:
      "NextUp Boxing League lands on June 6 with a stacked fight card, title implications, and a main event built for a packed arena and a global stream.",
    image: {
      kind: "single",
      src: "/hero-boxers.png",
      alt: "Two boxers in an intense match",
      className: "object-cover object-center",
    },
    primaryCta: {
      href: "#events",
      label: "Get Tickets",
      icon: "ticket",
    },
    secondaryCta: {
      href: "#livestream",
      label: "See Fight Night",
    },
    stats: [
      { value: "06", label: "June Main Event" },
      { value: "10", label: "Fights On The Card" },
      { value: "1", label: "Biggest Night Yet" },
    ],
  },
  {
    id: "broadcast",
    eyebrow: "Global Livestream - June 6, 2026",
    label: "Live Broadcast",
    title: ["From The Ring", "To Every", "Screen"],
    accentLine: 1,
    description:
      "For the fans who cannot be cageside, NextUp brings June 6 live with sharp production, real-time commentary, and every momentum swing from first bell to final result.",
    image: {
      kind: "single",
      src: "/broadcast-scene.png",
      alt: "A boxing ring under bright lights with live production cameras nearby",
      className: "object-cover object-center",
    },
    primaryCta: {
      href: "#livestream",
      label: "Watch Live",
      icon: "play",
    },
    secondaryCta: {
      href: "#magazine",
      label: "Preview The Night",
    },
    stats: [
      { value: "4K", label: "Livestream Quality" },
      { value: "12", label: "Camera Angles" },
      { value: "24/7", label: "Fight Week Access" },
    ],
  },
  {
    id: "prospects",
    eyebrow: "Prospect Showcase - Next Up On June 6",
    label: "New Wave Fighters",
    title: ["The Next", "Up", "Takes Over"],
    accentLine: 0,
    description:
      "Before the headliners close the show, a new class of fighters steps into the light with ranking pressure, breakout energy, and everything to prove.",
    image: {
      kind: "duo",
      backgroundSrc: "/hero-bg.png",
      leftSrc: "/fighter-1.png",
      rightSrc: "/fighter-2.png",
      alt: "Two rising boxing stars posing ahead of a major event",
    },
    primaryCta: {
      href: "#rankings",
      label: "View Rankings",
      icon: "ticket",
    },
    secondaryCta: {
      href: "#social-wall",
      label: "Track The Build-Up",
    },
    stats: [
      { value: "12", label: "Prospects To Watch" },
      { value: "6", label: "Divisions In Action" },
      { value: "3", label: "Breakout Matchups" },
    ],
  },
]

const fightResults = [
  { weight: "Heavyweight", date: "May 10", f1: "Joshua", f1Res: "W", f2: "Dubois", f2Res: "L", method: "KO 5" },
  { weight: "Super Middle", date: "Apr 28", f1: "Alvarez", f1Res: "W", f2: "Munguia", f2Res: "L", method: "UD 12" },
  { weight: "Lightweight", date: "Apr 15", f1: "Davis", f1Res: "W", f2: "Martin", f2Res: "L", method: "KO 8" },
  { weight: "Super Bantam", date: "Mar 30", f1: "Inoue", f1Res: "W", f2: "Nery", f2Res: "L", method: "KO 6" },
  { weight: "Heavyweight", date: "Mar 15", f1: "Usyk", f1Res: "W", f2: "Fury", f2Res: "L", method: "SD 12" },
  { weight: "Lightweight", date: "Feb 10", f1: "Lopez", f1Res: "W", f2: "Ortiz", f2Res: "L", method: "UD 12" },
]

const autoplayDelayMs = 6500

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.35])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.08, 1])

  const autoplayEnabled = isAutoPlaying && !shouldReduceMotion

  useEffect(() => {
    if (!autoplayEnabled || heroSlides.length < 2) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentSlide((index) => (index + 1) % heroSlides.length)
    }, autoplayDelayMs)

    return () => window.clearTimeout(timeoutId)
  }, [autoplayEnabled, currentSlide])

  const activeSlide = heroSlides[currentSlide]

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const advanceSlide = (direction: 1 | -1) => {
    setCurrentSlide((index) => {
      const nextIndex = index + direction
      if (nextIndex < 0) {
        return heroSlides.length - 1
      }
      return nextIndex % heroSlides.length
    })
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0d1124]"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.image.kind === "single" ? (
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                className={slide.image.className}
                priority={index === 0}
                sizes="100vw"
              />
            ) : (
              <>
                <Image
                  src={slide.image.backgroundSrc}
                  alt={slide.image.alt}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,174,68,0.16),_transparent_52%)]" />
                <div className="absolute inset-x-[8%] bottom-0 top-[16%] hidden items-end justify-between lg:flex">
                  <div
                    className={`relative h-[78%] w-[36%] transition-all duration-[1400ms] ${
                      index === currentSlide
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-8 opacity-0"
                    }`}
                  >
                    <Image
                      src={slide.image.leftSrc}
                      alt=""
                      fill
                      className="object-contain object-bottom"
                      sizes="36vw"
                    />
                  </div>
                  <div
                    className={`relative h-[88%] w-[40%] transition-all duration-[1400ms] ${
                      index === currentSlide
                        ? "translate-x-0 opacity-100"
                        : "translate-x-8 opacity-0"
                    }`}
                  >
                    <Image
                      src={slide.image.rightSrc}
                      alt=""
                      fill
                      className="object-contain object-bottom"
                      sizes="40vw"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1124]/98 via-[#0d1124]/74 to-[#0d1124]/18" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-[#0d1124]/20 to-[#0d1124]/54" />
          </div>
        ))}
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          mixBlendMode: "overlay",
        }}
      />

      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#b8962e]/40 to-transparent" />
        <span
          className="section-eyebrow text-white/25"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Fight Night - June 6, 2026
        </span>
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-[#b8962e]/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-48 pt-32 sm:px-8 lg:px-16">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
          <motion.div style={{ y, opacity }} className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: "easeOut" }}
              >
                <div className="mb-8 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#c5203a]" />
                  <span className="section-eyebrow text-[#c5203a]">{activeSlide.eyebrow}</span>
                </div>

                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/62 backdrop-blur-sm">
                    {activeSlide.label}
                  </span>
                  <span className="h-px w-12 bg-[#b8962e]/40" />
                  <span className="editorial-meta text-white/38">
                    {String(currentSlide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
                  </span>
                </div>

                <h1
                  className="mb-6 uppercase leading-[0.85]"
                  style={{
                    fontFamily: "var(--font-bebas), Impact, sans-serif",
                    fontSize: "clamp(4.6rem, 11vw, 10rem)",
                  }}
                >
                  {activeSlide.title.map((line, index) => (
                    <span
                      key={line}
                      className={index === activeSlide.accentLine ? "hero-gradient-text block" : "block text-white"}
                    >
                      {line}
                    </span>
                  ))}
                </h1>

                <p className="editorial-body mb-10 max-w-xl text-base text-white/62 sm:text-lg">
                  {activeSlide.description}
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href={activeSlide.primaryCta.href}
                    className="editorial-button inline-flex items-center justify-center gap-3 rounded-full bg-[#c5203a] px-8 py-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#a01830] hover:shadow-[0_24px_54px_rgba(197,32,58,0.32)]"
                  >
                    {activeSlide.primaryCta.icon === "ticket" ? (
                      <Ticket className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    {activeSlide.primaryCta.label}
                  </a>
                  <a
                    href={activeSlide.secondaryCta.href}
                    className="editorial-button inline-flex items-center justify-center gap-3 rounded-full border border-[#b8962e]/30 bg-white/5 px-8 py-4 text-[#d4ae44] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b8962e]/70 hover:bg-white/[0.08]"
                  >
                    <div className="relative">
                      <Play className="h-4 w-4" />
                      <div className="absolute inset-0 animate-ping">
                        <Play className="h-4 w-4 opacity-30" />
                      </div>
                    </div>
                    {activeSlide.secondaryCta.label}
                  </a>
                </div>

                <div className="mt-8 max-w-2xl">
                  <EmailSignup variant="hero" />
                </div>

                <div className="mt-10 flex items-center gap-3 xl:hidden">
                  <button
                    type="button"
                    onClick={() => advanceSlide(-1)}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/12 hover:text-white"
                    aria-label="Show previous hero slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => advanceSlide(1)}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/12 hover:text-white"
                    aria-label="Show next hero slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <div className="ml-2 flex flex-1 gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => goToSlide(index)}
                        className="group flex-1"
                        aria-label={`Show ${slide.label} slide`}
                        aria-pressed={index === currentSlide}
                      >
                        <span className="block h-1.5 overflow-hidden rounded-full bg-white/10">
                          <span
                            className={`block h-full rounded-full transition-all duration-500 ${
                              index === currentSlide ? "w-full bg-[#d4ae44]" : "w-1/3 bg-white/25"
                            }`}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-16 border-t border-white/8 pt-8">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-6 bg-[#b8962e]/50" />
                    <span className="editorial-meta text-white/30">Featured Numbers</span>
                  </div>
                  <div className="flex gap-10 sm:gap-14">
                    {activeSlide.stats.map((stat) => (
                      <div key={stat.label}>
                        <span
                          className="mb-1 block leading-none text-[#d4ae44]"
                          style={{
                            fontFamily: "var(--font-bebas), Impact, sans-serif",
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                          }}
                        >
                          {stat.value}
                        </span>
                        <span className="editorial-meta text-white/38">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="hidden xl:flex xl:flex-col xl:justify-end">
            <div className="editorial-surface-dark overflow-hidden p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="editorial-meta text-[#b8962e]">Hero Rotation</p>
                  <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-white/52">
                    Rotate between fight-night drama, live coverage, and the athletes driving the next wave.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAutoPlaying((value) => !value)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                  aria-label={autoplayEnabled ? "Pause automatic hero rotation" : "Resume automatic hero rotation"}
                >
                  {autoplayEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`w-full rounded-[1.35rem] border px-4 py-4 text-left transition-all duration-300 ${
                      index === currentSlide
                        ? "border-[#b8962e]/40 bg-white/9 shadow-[0_20px_50px_rgba(0,0,0,0.22)]"
                        : "border-white/6 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]"
                    }`}
                    aria-pressed={index === currentSlide}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="section-eyebrow text-white/26">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-10 bg-[#b8962e]/25" />
                    </div>
                    <div className="text-[1.55rem] uppercase leading-none tracking-[0.04em] text-white">
                      <span style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
                        {slide.title[0]} {slide.title[1]}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/46">{slide.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => advanceSlide(-1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    aria-label="Show previous hero slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => advanceSlide(1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    aria-label="Show next hero slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <span className="editorial-meta text-white/28">
                  {String(currentSlide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#d9d5cd] bg-[#efeae1] shadow-[0_-10px_30px_rgba(0,0,0,0.16)]">
        <div className="flex h-auto flex-col items-stretch md:h-[92px] md:flex-row">
          <div className="relative shrink-0 overflow-hidden bg-[#c5203a] px-6 py-4 text-white md:w-[220px] md:py-0">
            <div className="relative z-10 flex h-full flex-col justify-center">
              <span className="editorial-meta mb-1 text-white/90">Fight Desk</span>
              <span
                className="text-2xl uppercase leading-none tracking-[0.06em] text-white"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
              >
                Results
              </span>
            </div>
            <div className="absolute bottom-0 right-[-20px] top-0 w-10 -skew-x-[20deg] bg-black/10" />
          </div>

          <div
            className="flex flex-1 items-center gap-2 overflow-x-auto p-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style dangerouslySetInnerHTML={{ __html: "::-webkit-scrollbar { display: none; }" }} />

            {fightResults.map((result, index) => (
              <div
                key={index}
                className="relative flex h-[76px] w-[248px] flex-shrink-0 flex-col justify-between rounded-2xl border border-[#0d1124]/6 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(13,17,36,0.06)] transition-colors duration-300 hover:bg-[#faf8f3]"
              >
                <div className="mb-1.5 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#0d1124]/46">
                  <span className="truncate pr-2 text-[#c5203a]">{result.weight}</span>
                  <span className="shrink-0">{result.date}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex w-full max-w-[150px] flex-col gap-1">
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`truncate text-xs font-semibold uppercase tracking-[0.04em] ${
                          result.f1Res === "W" ? "text-[#0d1124]" : "text-[#0d1124]/35"
                        }`}
                      >
                        {result.f1}
                      </span>
                      {result.f1Res === "W" ? (
                        <span className="ml-2 text-[0.68rem] font-semibold leading-none text-[#c5203a]">
                          W
                        </span>
                      ) : null}
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`truncate text-xs font-semibold uppercase tracking-[0.04em] ${
                          result.f2Res === "W" ? "text-[#0d1124]" : "text-[#0d1124]/35"
                        }`}
                      >
                        {result.f2}
                      </span>
                      {result.f2Res === "W" ? (
                        <span className="ml-2 text-[0.68rem] font-semibold leading-none text-[#c5203a]">
                          W
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-[2px] ml-2 flex-shrink-0 border-l border-[#0d1124]/6 pl-3 text-[0.68rem] font-semibold text-[#0d1124]/42">
                    {result.method}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
