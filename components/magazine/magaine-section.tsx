"use client"

import { MagazineCard } from "./magazine-card"

const magazines = [
  {
    coverImage: "/nextupmagcover.jpg",
    issueName: "The Championship",
    issueNumber: "Issue 01",
    releaseDate: "Summer 2026",
  },
]

export function MagazineSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background px-4 py-16 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,100,50,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(50,200,100,0.03),transparent_50%)]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary">
              Exclusive Content
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
              The Magazine
            </span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            Dive deep into the world of elite sports with exclusive stories,
            behind-the-scenes access, and legendary player profiles.
          </p>

          {/* Decorative Element */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <div className="h-1 w-8 rounded-full bg-primary/50" />
            <div className="h-1 w-1 rounded-full bg-primary" />
          </div>
        </div>

        {/* Magazine Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {magazines.map((magazine, index) => (
            <div
              key={magazine.issueNumber}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
            >
              <MagazineCard {...magazine} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-lg border border-border bg-card/50 p-8 backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-foreground">
                Get Notified
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Be the first to know when new issues drop
              </p>
            </div>
            <button className="group relative overflow-hidden rounded-full bg-primary px-8 py-3 font-bold uppercase tracking-wider text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25">
              <span className="relative z-10">Subscribe Now</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="pointer-events-none absolute left-10 top-1/4 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-40 w-40 rounded-full bg-accent/5 blur-3xl" />
    </section>
  )
}
