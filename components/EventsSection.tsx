"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin, Clock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const upcomingEvents = [
  {
    id: 1,
    title: "STRONG ISLAND FIGHT NIGHT 11",
    date: "June 6, 2026",
    time: "7:00 PM EST",
    venue: "Madison Square Garden",
    location: "New York, NY",
    mainEvent: "Adebayo vs Cole",
    image: "/events/event-1.jpg",
    ticketsUrl: "https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611",
    featured: true,
  },
  {
    id: 2,
    title: "NEXTUP CHAMPIONSHIP SERIES",
    date: "July 15, 2026",
    time: "8:00 PM EST",
    venue: "Barclays Center",
    location: "Brooklyn, NY",
    mainEvent: "Steel vs Harrison",
    image: "/events/event-2.jpg",
    ticketsUrl: "#",
    featured: false,
  },
  {
    id: 3,
    title: "SUMMER SHOWDOWN",
    date: "August 22, 2026",
    time: "7:30 PM EST",
    venue: "T-Mobile Arena",
    location: "Las Vegas, NV",
    mainEvent: "King vs Mendez",
    image: "/events/event-3.jpg",
    ticketsUrl: "#",
    featured: false,
  },
]

export function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".events-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll(".event-card")
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="events" 
      className="relative py-20 md:py-28 bg-white overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 diagonal-stripes opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="events-header mb-12 md:mb-16">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2 mb-4">
            <span 
              className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none text-[#0d1124]"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              UPCOMING
            </span>
            <span 
              className="pb-1 text-[clamp(1rem,2.5vw,1.75rem)] font-black uppercase tracking-[0.26em] text-[#c5203a]"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              EVENTS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-[3px] w-20 bg-gradient-to-r from-[#c5203a] via-[#b8962e] to-transparent" />
            <p className="text-sm text-gray-600 max-w-xl">
              Don&apos;t miss the action. Get your tickets now for the most anticipated boxing events of the year.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className={`event-card group relative overflow-hidden bg-[#0d1124] ${
                event.featured ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative ${event.featured ? "h-[400px] lg:h-full" : "h-[280px]"}`}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={event.featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-[#0d1124]/40 to-transparent" />
                
                {/* HUD corners */}
                <div className="absolute top-4 left-4">
                  <div className="w-6 h-6 border-l-2 border-t-2 border-[#c5203a]" />
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-6 h-6 border-r-2 border-b-2 border-[#b8962e]" />
                </div>

                {/* Featured badge */}
                {event.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#c5203a] px-3 py-1.5">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-bold tracking-[0.15em] text-white uppercase">Featured</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3 text-white/60">
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {event.time}
                  </span>
                </div>

                <h3 
                  className={`font-black uppercase text-white leading-[0.95] mb-2 ${
                    event.featured ? "text-3xl md:text-4xl" : "text-2xl"
                  }`}
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {event.title}
                </h3>

                <p className="text-[#b8962e] text-sm font-bold uppercase tracking-wider mb-3">
                  {event.mainEvent}
                </p>

                <div className="flex items-center gap-1.5 text-white/50 text-xs mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {event.venue}, {event.location}
                </div>

                <Link
                  href={event.ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#c5203a] hover:border-[#c5203a]"
                >
                  Get Tickets
                  <span className="text-[#b8962e]">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center">
          <Link
            href="#events"
            className="inline-flex items-center gap-3 text-[#0d1124] font-bold uppercase tracking-wider text-sm hover:text-[#c5203a] transition-colors group"
          >
            <span className="h-[1px] w-8 bg-current transition-all group-hover:w-12" />
            View All Events
            <span className="h-[1px] w-8 bg-current transition-all group-hover:w-12" />
          </Link>
        </div>
      </div>
    </section>
  )
}
