"use client"

import { useEffect, useRef } from "react"

type ScrollRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  distance?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 64,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let ctx: any = null
    let cancelled = false

    async function initGsap() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])

      if (cancelled) {
        return
      }

      gsap.registerPlugin(ScrollTrigger)

      const element = ref.current

      if (!element) {
        return
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(element, { opacity: 1, y: 0, filter: "blur(0px)" })
        return
      }

      ctx = gsap.context(() => {
        gsap.set(element, {
          opacity: 0,
          y: distance,
          filter: "blur(18px)",
          willChange: "transform, opacity, filter",
        })

        gsap.to(element, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
          onComplete: () => {
            gsap.set(element, { clearProps: "willChange,filter" })
          },
        })
      }, element)
    }

    initGsap()

    return () => {
      cancelled = true
      ctx?.revert?.()
    }
  }, [delay, distance])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
