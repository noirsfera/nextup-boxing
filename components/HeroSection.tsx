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
import { ChevronLeft, ChevronRight, Play, Ticket } from "lucide-react"

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
}

const heroSlides: HeroSlide[] = [
  {
    id: "main-event",
    eyebrow: "Main Event - June 6, 2026",
    label: "Fight Night",
    title: ["June 6", "Fight Night", "Starts Here"],
    accentLine: 2,
    description:
      "June 6 at Madison Square Garden. A stacked NextUp card, title pressure, and a main event built for a sold-out night.",
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
      label: "Watch Live",
    },
  },
  {
    id: "broadcast",
    eyebrow: "Global Livestream - June 6, 2026",
    label: "Livestream",
    title: ["From The Ring", "To Every", "Screen"],
    accentLine: 1,
    description:
      "Catch the full June 6 card live with sharp production, live commentary, and every shift in momentum from first bell to final result.",
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
      label: "Read Preview",
    },
  },
  {
    id: "prospects",
    eyebrow: "Prospect Showcase - Next Up On June 6",
    label: "Prospects",
    title: ["The Next", "Up", "Takes Over"],
    accentLine: 0,
    description:
      "Before the headliners take over, the next wave of contenders steps in with rankings on the line and everything to prove.",
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
      label: "Follow Build-Up",
    },
  },
]

const fightPreview = [
  { division: "Heavyweight", matchup: "Adebayo vs Cole", slot: "Main Event" },
  { division: "Welterweight", matchup: "Mokoena vs Price", slot: "Co-Main" },
  { division: "Featherweight", matchup: "Santos vs Reed", slot: "Feature Bout" },
  { division: "Lightweight", matchup: "King vs Alvarez", slot: "Prospect Clash" },
]

const autoplayDelayMs = 6500

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSignupFocused, setIsSignupFocused] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.35])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1.08, 1])

  const autoplayEnabled = !shouldReduceMotion && !isSignupFocused

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
        <motion.div style={{ y, opacity }} className="max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-[#c5203a]" />
            <span className="section-eyebrow text-[#c5203a]">{activeSlide.eyebrow}</span>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/62 backdrop-blur-sm">
              {activeSlide.label}
            </span>
            <span className="editorial-meta text-white/30">June 6 | Madison Square Garden</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: "easeOut" }}
            >
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

              <p className="editorial-body mb-8 max-w-xl text-base text-white/62 sm:text-lg">
                {activeSlide.description}
              </p>

              <div className="flex flex-wrap items-center gap-5">
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
                  className="editorial-button text-[#d4ae44] transition-colors duration-300 hover:text-white"
                >
                  {activeSlide.secondaryCta.label}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <div
            className="mt-8 max-w-2xl"
            onFocusCapture={() => setIsSignupFocused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsSignupFocused(false)
              }
            }}
          >
            <EmailSignup variant="hero" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => advanceSlide(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/12 hover:text-white"
                aria-label="Show previous hero slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => advanceSlide(1)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/12 hover:text-white"
                aria-label="Show next hero slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`rounded-full border px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    index === currentSlide
                      ? "border-[#b8962e]/45 bg-white/10 text-white"
                      : "border-white/8 bg-white/[0.03] text-white/45 hover:border-white/18 hover:text-white/72"
                  }`}
                  aria-label={`Show ${slide.label} slide`}
                  aria-pressed={index === currentSlide}
                >
                  {slide.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#b8962e]/20 bg-[#1e2d5e] shadow-[0_-10px_30px_rgba(0,0,0,0.16)]">
        <div className="flex h-auto flex-col items-stretch md:h-[92px] md:flex-row">
          <div className="relative shrink-0 overflow-hidden bg-[#c5203a] px-6 py-4 text-white md:w-[220px] md:py-0">
            <div className="relative z-10 flex h-full flex-col justify-center">
              <span className="editorial-meta mb-1 text-white/90">June 6</span>
              <span
                className="text-2xl uppercase leading-none tracking-[0.06em] text-white"
                style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
              >
                Fight Card
              </span>
            </div>
            <div className="absolute bottom-0 right-[-20px] top-0 w-10 -skew-x-[20deg] bg-black/10" />
          </div>

          <div
            className="flex flex-1 items-center gap-2 overflow-x-auto p-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style dangerouslySetInnerHTML={{ __html: "::-webkit-scrollbar { display: none; }" }} />

            {fightPreview.map((fight) => (
              <div
                key={fight.matchup}
                className="relative flex h-[76px] w-[232px] flex-shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-white/96 px-4 py-3 shadow-[0_10px_24px_rgba(13,17,36,0.18)]"
              >
                <div className="mb-1.5 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#0d1124]/46">
                  <span className="truncate pr-2 text-[#c5203a]">{fight.division}</span>
                  <span className="shrink-0 text-[#1e2d5e]/55">{fight.slot}</span>
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.08em] text-[#0d1124]">
                  {fight.matchup}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
