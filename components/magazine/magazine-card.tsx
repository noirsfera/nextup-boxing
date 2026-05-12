"use client"

import { useState } from "react"
import Image from "next/image"

interface MagazineCardProps {
  coverImage: string
  issueName: string
  issueNumber: string
  releaseDate?: string
}

export function MagazineCard({
  coverImage,
  issueName,
  issueNumber,
  releaseDate,
}: MagazineCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-card border border-border transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:border-primary/50">
        {/* Magazine Cover */}
        <Image
          src={coverImage}
          alt={issueName}
          fill
          className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-50"
        />

        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Scanline Effect */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Coming Soon Overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Animated Ring */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 animate-spin rounded-full border-2 border-transparent border-t-primary" style={{ animationDuration: "3s" }} />
            <div className="absolute -inset-8 animate-spin rounded-full border border-transparent border-b-accent" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-background">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Coming Soon Text */}
          <div className="text-center">
            <p className="mt-3 text-sm text-muted-foreground">
              Stay tuned for the release
            </p>
          </div>

          {/* Corner Accents */}
          <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-primary/50" />
          <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-primary/50" />
          <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-primary/50" />
          <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-primary/50" />
        </div>

        {/* Issue Number Badge */}
        <div className="absolute left-3 top-3 z-10">
          <div className="flex items-center gap-1 rounded bg-primary px-2 py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground">
              {issueNumber}
            </span>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-0" />
      </div>

      {/* Card Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Issue
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
        </div>
        <h3 className="text-center text-lg font-bold uppercase tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
          {issueName}
        </h3>
        {releaseDate && (
          <p className="text-center text-xs text-muted-foreground">
            {releaseDate}
          </p>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-px rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" style={{ zIndex: -1 }} />
    </div>
  )
}
