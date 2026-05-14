"use client"

import { motion } from "framer-motion"
import { AlertCircle, ExternalLink, Heart, Loader2, MessageCircle, Play } from "lucide-react"
import { useEffect, useState } from "react"

type InstagramReel = {
  id: string
  caption: string
  permalink: string
  mediaType: string
  mediaUrl: string | null
  thumbnailUrl: string | null
  timestamp: string
  likeCount: number | null
  commentsCount: number | null
}

type InstagramFeedPayload = {
  handle: string
  profileUrl: string
  reels: InstagramReel[]
  error?: string
}

const DEFAULT_HANDLE = "nextupboxingleague"

const gradients = [
  "linear-gradient(135deg, #1e2d5e 0%, #c5203a 50%, #b8962e 100%)",
  "linear-gradient(135deg, #c5203a 0%, #0d1124 60%, #b8962e 100%)",
  "linear-gradient(135deg, #b8962e 0%, #1e2d5e 50%, #c5203a 100%)",
  "linear-gradient(135deg, #0d1124 0%, #c5203a 40%, #1e2d5e 100%)",
  "linear-gradient(135deg, #c5203a 0%, #b8962e 50%, #0d1124 100%)",
  "linear-gradient(135deg, #1e2d5e 0%, #b8962e 60%, #c5203a 100%)",
]

function formatCompactCount(value: number | null) {
  if (value === null) {
    return "--"
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function formatPublishedDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Latest reel"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

export function SocialWall() {
  const [feed, setFeed] = useState<InstagramFeedPayload>({
    handle: DEFAULT_HANDLE,
    profileUrl: `https://www.instagram.com/${DEFAULT_HANDLE}/`,
    reels: [],
  })
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    let isMounted = true

    async function loadFeed() {
      try {
        const response = await fetch("/api/instagram/reels", {
          cache: "no-store",
        })
        const payload: InstagramFeedPayload = await response.json()

        if (!isMounted) {
          return
        }

        setFeed(payload)
        setErrorMessage(payload.error || "")
        setStatus(response.ok ? "ready" : "error")
      } catch {
        if (!isMounted) {
          return
        }

        setErrorMessage("We couldn't load the latest Instagram reels right now.")
        setStatus("error")
      }
    }

    loadFeed()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section
      id="social-wall"
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "#0d1124" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
          backgroundSize: "256px",
          mixBlendMode: "overlay",
          opacity: 0.5,
        }}
      />

      <div
        className="absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(197, 32, 58, 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c5203a]" />
            <span className="text-[#c5203a] text-[10px] font-bold uppercase tracking-[0.35em]">
              Social Wall
            </span>
            <span className="h-px w-10 bg-[#c5203a]" />
          </div>

          <h2
            className="mb-4 uppercase leading-[0.9]"
            style={{
              fontFamily: "var(--font-bebas), Impact, sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "white",
            }}
          >
            Follow The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c5203a 0%, #b8962e 60%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Action
            </span>
          </h2>

          <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/40 sm:text-base">
            Live reels from our Instagram account, refreshed from the server when Instagram credentials are connected.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 flex flex-col items-center justify-between gap-4 rounded-xl px-6 py-4 sm:flex-row"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="relative h-14 w-14 flex-shrink-0 rounded-full p-[2.5px]"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#0d1124]">
                <span
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
                >
                  NUB
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">@{feed.handle}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    background:
                      "linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)",
                    color: "white",
                  }}
                >
                  Reels
                </span>
              </div>
              <p className="mt-0.5 text-xs text-white/35">
                Next Up Boxing - Official League Account
              </p>
            </div>
          </div>

          <a
            href={feed.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-lg px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
          >
            Follow
            <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />
          </a>
        </motion.div>

        {status === "error" && errorMessage ? (
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#c5203a]/20 bg-[#c5203a]/8 px-4 py-3 text-sm text-white/70">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c5203a]" />
            <span>{errorMessage}</span>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {status === "loading"
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[9/16] animate-pulse rounded-xl border border-white/5 bg-white/5"
                />
              ))
            : feed.reels.map((post, index) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-xl"
                  style={{
                    background: gradients[index % gradients.length],
                  }}
                >
                  {post.thumbnailUrl || post.mediaUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.thumbnailUrl || post.mediaUrl || ""}
                        alt={post.caption || `Instagram reel ${index + 1}`}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10" />
                    </>
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: gradients[index % gradients.length],
                        opacity: 0.95,
                      }}
                    />
                  )}

                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
                      backgroundSize: "200% 200%",
                      animation: "shimmer-gradient 3s ease-in-out infinite",
                    }}
                  />

                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/25">
                      <Play className="h-3 w-3 fill-white text-white" />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 z-10 rounded-full bg-black/30 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                    {formatPublishedDate(post.timestamp)}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-3">
                    <p className="mb-2 line-clamp-3 text-[10px] leading-tight text-white">
                      {post.caption || "Watch the latest reel from Next Up Boxing."}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[9px] text-white/70">
                        <Heart className="h-3 w-3" />
                        {formatCompactCount(post.likeCount)}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] text-white/70">
                        <MessageCircle className="h-3 w-3" />
                        {formatCompactCount(post.commentsCount)}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
        </div>

        {status !== "loading" && feed.reels.length === 0 ? (
          <div className="mt-8 rounded-xl border border-white/5 bg-white/5 px-5 py-6 text-center text-sm leading-relaxed text-white/55">
            Connect the Instagram Graph API credentials in `.env.local` to show live reels from @{feed.handle}.
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <div
            className="rounded-xl p-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                Live Feed Status
              </span>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-white/6 bg-white/4 px-4 py-4">
              {status === "loading" ? (
                <Loader2 className="mt-0.5 h-4 w-4 flex-shrink-0 animate-spin text-[#b8962e]" />
              ) : status === "ready" ? (
                <Play className="mt-0.5 h-4 w-4 flex-shrink-0 fill-[#b8962e] text-[#b8962e]" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c5203a]" />
              )}

              <div>
                <p className="text-sm font-semibold text-white">
                  {status === "loading"
                    ? "Loading Instagram reels"
                    : status === "ready"
                      ? "Instagram reels connected"
                      : "Instagram reels need configuration"}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/45">
                  {status === "ready"
                    ? "The reels grid is using live media returned by the Instagram Graph API."
                    : errorMessage || "Add your Instagram business account ID and access token in `.env.local` to power the live reels wall."}
                </p>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-center justify-center rounded-xl p-8 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(197, 32, 58, 0.08) 0%, rgba(30, 45, 94, 0.08) 50%, rgba(184, 150, 46, 0.06) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="mb-6 h-20 w-20 rounded-full p-[3px]"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0d1124]">
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}
                >
                  IG
                </span>
              </div>
            </div>

            <h3
              className="mb-3 text-white uppercase"
              style={{
                fontFamily: "var(--font-bebas), Impact, sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              }}
            >
              Don&apos;t Miss A Moment
            </h3>

            <p className="mb-8 max-w-sm text-sm leading-relaxed text-white/35">
              Follow @{feed.handle} for exclusive behind-the-scenes content, fight night announcements, fighter profiles, and real-time updates.
            </p>

            <a
              href={feed.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-lg px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              Follow on Instagram
              <ExternalLink className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20"
        >
          <span className="h-px w-8 bg-white/10" />
          Follow All The Action
          <span className="h-px w-8 bg-white/10" />
        </motion.div>
      </div>
    </section>
  )
}
