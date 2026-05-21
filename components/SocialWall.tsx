"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Play, ExternalLink, Film, Award, Flame, User, X, Check, Share2, Eye } from "lucide-react"

type MockReel = {
  id: string
  caption: string
  permalink: string
  mediaUrl: string
  timestamp: string
  likeCount: number
  commentsCount: number
  category: "promos" | "training" | "behind-the-scenes"
  duration: string
  views: string
  commentsList: { user: string; text: string }[]
}

const MOCK_REELS: MockReel[] = [
  {
    id: "reel-1",
    caption: "STILL HUNGRY. ⚡️ @marcus_steel gears up for the main event on June 6. Six weeks of relentless camp boils down to one night. Are you ready? #NextUpBoxing #FightCamp #MainEvent #BoxerLife",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&auto=format&fit=crop&q=80",
    timestamp: "2026-05-18T18:00:00Z",
    likeCount: 4820,
    commentsCount: 231,
    category: "training",
    duration: "0:45",
    views: "42.8K",
    commentsList: [
      { user: "champ_boxing", text: "Marcus is looking in absolute peak condition! 💪" },
      { user: "iron_fist99", text: "That heavy bag work is pure speed. June 6 cannot come soon enough." },
      { user: "fight_analyst", text: "Steele's jab is looking noticeably sharper this camp." }
    ]
  },
  {
    id: "reel-2",
    caption: "The atmosphere is building. 🔥 Arena setup in progress for the biggest showdown of the year. Limited tickets remaining via link in bio. #NextUpBoxing #FightNight #SoldOut #ArenaLights",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&auto=format&fit=crop&q=80",
    timestamp: "2026-05-17T12:00:00Z",
    likeCount: 3120,
    commentsCount: 142,
    category: "behind-the-scenes",
    duration: "0:30",
    views: "28.5K",
    commentsList: [
      { user: "nextup_fanatic", text: "Just secured my ringside seat! Let's go!!" },
      { user: "dan_harrison_fc", text: "Vegas styling! Looks massive." },
      { user: "ticket_broker", text: "Unbelievable production value." }
    ]
  },
  {
    id: "reel-3",
    caption: "Precision meets power. 🥊 @elena_tyson showing absolute masterclass speed on the pads. Undefeated champion defending her title. #NextUpBoxing #TysonDefends #WomenInSports #ChampionMindset",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    timestamp: "2026-05-15T09:30:00Z",
    likeCount: 5410,
    commentsCount: 319,
    category: "training",
    duration: "0:58",
    views: "61.2K",
    commentsList: [
      { user: "elena_t_fan", text: "Fastest hands in the division! Undefeated for a reason 👑" },
      { user: "coach_smith", text: "The footwork rotation is textbook. Excellent form." },
      { user: "strike_force", text: "She is going to dominate." }
    ]
  },
  {
    id: "reel-4",
    caption: "GOLD ON THE LINE. 🏆 The official Next Up Boxing League World Championship Belt is polished and ready. Who takes it home? Drop your predictions below! 👇 #NextUpBoxing #AndTheNew #GoldGlory",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=800&auto=format&fit=crop&q=80",
    timestamp: "2026-05-14T20:15:00Z",
    likeCount: 7120,
    commentsCount: 890,
    category: "promos",
    duration: "0:15",
    views: "89.4K",
    commentsList: [
      { user: "boxer_pete", text: "Steele gets it done in the 8th round. Knockout!" },
      { user: "harrison_army", text: "Harrison is taking that belt home, no doubt!" },
      { user: "boxing_weekly", text: "Beautiful design on that strap." }
    ]
  },
  {
    id: "reel-5",
    caption: "A look inside the tunnel. 🚶‍♂️ The heavy silence before the storm. Visualizing the victory. Experience the live walkouts exclusively on nextupboxing.com on June 6. #NextUpBoxing #FighterWalkout #BehindTheScenes",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://images.unsplash.com/photo-1517438476312-10d79c07750d?w=800&auto=format&fit=crop&q=80",
    timestamp: "2026-05-12T14:40:00Z",
    likeCount: 2890,
    commentsCount: 95,
    category: "behind-the-scenes",
    duration: "1:00",
    views: "22.3K",
    commentsList: [
      { user: "the_mental_game", text: "Focus is everything. The walkout tells you who wins before the bell." },
      { user: "boxing_promoter", text: "The walkout production is going to be cinematic!" },
      { user: "ring_side_ricky", text: "Chills down my spine just watching this." }
    ]
  },
  {
    id: "reel-6",
    caption: "IT'S OFFICIAL. 🎙️ Contract signed. Press conference face-off heated up. Tempers flared between Steele and Harrison. The rivalry is real. #NextUpBoxing #SteeleHarrison #PressConference #Rivalry",
    permalink: "https://www.instagram.com/nextupboxingleague/",
    mediaUrl: "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=800&auto=format&fit=crop&q=80",
    timestamp: "2026-05-10T11:00:00Z",
    likeCount: 6150,
    commentsCount: 412,
    category: "promos",
    duration: "0:35",
    views: "74.1K",
    commentsList: [
      { user: "fight_guru", text: "They actually had to be separated! The tension is highly volatile." },
      { user: "jess_sports", text: "Steele looked completely unbothered. Mind games." },
      { user: "heavy_hitter_box", text: "Can't wait to see this erupt in the ring." }
    ]
  }
]

export function SocialWall() {
  const [selectedReel, setSelectedReel] = useState<MockReel | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({})

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setLikedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setCopiedId(id)
    navigator.clipboard.writeText(`https://instagram.com/nextupboxingleague/reel/${id}`)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const posts = MOCK_REELS
  const featuredPost = posts[0]
  const gridPosts = posts.slice(1)

  return (
    <section
      id="social-wall"
      className="relative overflow-hidden bg-white py-20 sm:py-28 border-y border-gray-100"
    >
      {/* Sleek editorial layout grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(13, 17, 36, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13, 17, 36, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-slate-800 shadow-sm">
            <span className="text-[#c5203a]">NEXTUP</span>
            SOCIAL WALL
          </div>

          <h2 className="mx-auto mb-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.8rem)] font-black uppercase tracking-tight text-[#0d1124]">
            Follow the Feed
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Real-time highlights from @nextupboxingleague — fight week, training, promos, and the behind-the-scenes energy that keeps the league moving.
          </p>
        </motion.div>

        <div className="mb-10 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.2)]"
          >
            <div className="relative h-[520px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredPost.mediaUrl}
                alt={featuredPost.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-white/80">
                  @nextupboxingleague
                </span>
                <h3 className="max-w-lg text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                  {featuredPost.caption.length > 70 ? `${featuredPost.caption.slice(0, 70)}...` : featuredPost.caption}
                </h3>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.8rem] uppercase tracking-[0.18em] text-white/70">
                  <span>{featuredPost.views} views</span>
                  <span>{featuredPost.duration}</span>
                  <span>{featuredPost.likeCount} likes</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {gridPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                onClick={() => setSelectedReel(post)}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-slate-950 text-white shadow-xl transition-transform duration-500 hover:-translate-y-1 ${
                  index === gridPosts.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.mediaUrl}
                    alt={post.caption}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-white">
                    {post.duration}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="line-clamp-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">
                      {post.caption.length > 90 ? `${post.caption.slice(0, 90)}...` : post.caption}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-white/70">
                      <span>{post.views} views</span>
                      <span>{post.commentsCount} comments</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-8 shadow-lg"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Official Account</p>
              <p className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-950">@nextupboxingleague</p>
            </div>
            <a
              href="https://www.instagram.com/nextupboxingleague/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#0d1124] px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#1e2d41]"
            >
              Follow on Instagram
            </a>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/90 p-4 text-center shadow-sm">
              <p className="text-3xl font-black text-[#0d1124]">124.6K</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">Followers</p>
            </div>
            <div className="rounded-3xl bg-white/90 p-4 text-center shadow-sm">
              <p className="text-3xl font-black text-[#0d1124]">320</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">Posts</p>
            </div>
            <div className="rounded-3xl bg-white/90 p-4 text-center shadow-sm">
              <p className="text-3xl font-black text-[#0d1124]">Live</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">Updated Hourly</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex items-center justify-center gap-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gray-300"
        >
          <span className="h-px w-8 bg-gray-200" />
          Synchronized & Verified Feed
          <span className="h-px w-8 bg-gray-200" />
        </motion.div>
      </div>

      {/* Spectacular Lightbox Viewer Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative flex h-full max-h-[640px] w-full max-w-[850px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedReel(null)}
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Side: Video/Media Screen */}
              <div className="relative flex-1 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedReel.mediaUrl}
                  alt={selectedReel.caption}
                  className="h-full w-full object-cover opacity-80"
                />
                
                {/* Video Simulation Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  {/* Top overlay */}
                  <div className="flex justify-between items-center">
                    <span className="rounded-full bg-white/20 px-3 py-1 font-sans text-xs font-bold text-white backdrop-blur-sm">
                      {selectedReel.duration}
                    </span>
                    
                    <span className="rounded-full bg-[#c5203a] px-3 py-1 font-sans text-xs font-bold text-white flex items-center gap-1.5 shadow-md animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-white" />
                      LIVE PLAYER
                    </span>
                  </div>

                  {/* Center Play Button (pulsing) */}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 transition-transform duration-300 hover:scale-110">
                    <Play className="h-6 w-6 fill-white" />
                  </div>

                  {/* Bottom overlay inside video */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center font-display text-[10px] font-black italic tracking-tighter text-white border border-white/20">
                        NUB
                      </div>
                      <span className="font-sans text-sm font-bold text-white">@nextupboxingleague</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Editorial Information & Comments */}
              <div className="flex flex-col w-full md:w-[360px] bg-white p-6 justify-between border-l border-gray-100">
                <div className="space-y-5 overflow-y-auto max-h-[440px] pr-1">
                  
                  {/* User Profile Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#c5203a] to-[#b8962e] p-[1.5px]">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white font-display text-[9px] font-black italic tracking-tighter text-black">
                          NUB
                        </div>
                      </div>
                      <span className="font-sans text-xs font-bold text-black">nextupboxingleague</span>
                    </div>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Reel ID: {selectedReel.id}
                    </span>
                  </div>

                  {/* Caption block */}
                  <div className="space-y-2">
                    <p className="font-sans text-xs font-semibold leading-relaxed text-gray-700">
                      {selectedReel.caption.split(" ").map((word, i) => 
                        word.startsWith("#") || word.startsWith("@") ? (
                          <span key={i} className="text-[#c5203a] font-bold">{word} </span>
                        ) : `${word} `
                      )}
                    </p>
                    <p className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Posted 2 days ago
                    </p>
                  </div>

                  {/* Curated Comments Block */}
                  <div className="space-y-3">
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      Discussion ({selectedReel.commentsCount})
                    </h4>
                    
                    <div className="space-y-3">
                      {selectedReel.commentsList.map((comment, index) => (
                        <div key={index} className="rounded-xl bg-[#f5f5f7] p-3 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-sans font-bold text-black">@{comment.user}</span>
                            <span className="text-[9px] text-gray-400">Active</span>
                          </div>
                          <p className="font-sans text-gray-600 font-medium leading-normal">
                            {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Interaction Stats */}
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => handleLike(selectedReel.id, e)}
                        className="flex items-center gap-1.5 text-xs font-bold text-black hover:text-[#c5203a]"
                      >
                        <Heart className={`h-4.5 w-4.5 transition-transform ${likedReels[selectedReel.id] ? "scale-125 fill-[#c5203a] text-[#c5203a]" : "text-black hover:scale-110"}`} />
                        {likedReels[selectedReel.id] ? selectedReel.likeCount + 1 : selectedReel.likeCount}
                      </button>

                      <span className="flex items-center gap-1.5 text-xs font-bold text-black">
                        <MessageCircle className="h-4.5 w-4.5" />
                        {selectedReel.commentsCount}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleShare(selectedReel.id, e)}
                      className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-black"
                    >
                      {copiedId === selectedReel.id ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Share2 className="h-3.5 w-3.5" />
                          Share
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={selectedReel.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#c5203a]"
                  >
                    View Original Reel
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
