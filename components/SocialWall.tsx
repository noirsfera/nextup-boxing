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

const categories = [
  { id: "all", name: "All Reels", icon: Film },
  { id: "promos", name: "Fight Promos", icon: Flame },
  { id: "training", name: "Training Camp", icon: Award },
  { id: "behind-the-scenes", name: "Behind The Scenes", icon: User },
]

export function SocialWall() {
  const [activeCategory, setActiveCategory] = useState("all")
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

  const filteredReels = activeCategory === "all" 
    ? MOCK_REELS 
    : MOCK_REELS.filter(reel => reel.category === activeCategory)

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
        
        {/* Main Nike-Style Condensed Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-[#c5203a]" />
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#c5203a]">
              Inside NextUp League
            </span>
            <span className="h-[2px] w-8 bg-[#c5203a]" />
          </div>

          <h2
            className="mb-4 font-display font-black uppercase text-black leading-none tracking-tighter"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.8rem)",
              fontStyle: "italic",
            }}
          >
            Follow The <span className="bg-gradient-to-r from-[#c5203a] to-[#b8962e] bg-clip-text text-transparent">Action</span>
          </h2>

          <p className="mx-auto max-w-2xl font-sans text-sm font-medium leading-relaxed text-gray-500 sm:text-base">
            Get exclusive behind-the-scenes access, real-time training camp footage, 
            and official fight week announcements. Click on any card below to experience the action.
          </p>
        </motion.div>

        {/* Profile Card & Stats Strip (Light Mode Premium Editorial) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 flex flex-col items-center justify-between gap-6 rounded-3xl border border-gray-100 bg-[#f9f9fb] p-6 shadow-sm sm:flex-row md:p-8"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row text-center sm:text-left">
            <div
              className="relative h-16 w-16 flex-shrink-0 rounded-full p-[2px] shadow-sm"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white">
                <span className="font-display text-2xl font-black italic tracking-tighter text-black">
                  NUB
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="font-sans text-base font-bold text-black">@nextupboxingleague</span>
                <span className="rounded-full bg-black px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                  Official Feed
                </span>
              </div>
              <p className="mt-1 font-sans text-xs font-semibold text-gray-400">
                124.6K Followers • 320 Posts • Updated Hourly
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
            <a
              href="https://www.instagram.com/nextupboxingleague/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#c5203a] hover:-translate-y-0.5 hover:shadow-md"
            >
              Follow Us
              <ExternalLink className="h-3.5 w-3.5 opacity-80 group-hover:opacity-100" />
            </a>
          </div>
        </motion.div>

        {/* Filter Tabs using framer-motion */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 rounded-xl px-5 py-3 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  isActive 
                    ? "text-white" 
                    : "bg-[#f5f5f7] text-gray-500 hover:bg-gray-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-xl bg-black"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Dynamic Animate Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredReels.map((reel) => {
              const isLiked = likedReels[reel.id]
              return (
                <motion.div
                  key={reel.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedReel(reel)}
                  className="group relative aspect-[9/16] cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* High Quality Unsplash Images */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={reel.mediaUrl}
                    alt={reel.caption}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  
                  {/* Premium Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/20" />
                  
                  {/* Red highlight line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 bg-[#c5203a] transition-transform duration-500 origin-left group-hover:scale-x-100" />

                  {/* Play Button Indicator (Top-Right) */}
                  <div className="absolute right-3.5 top-3.5 z-10">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c5203a]">
                      <Play className="h-3 w-3 fill-white" />
                    </div>
                  </div>

                  {/* Top Left Tag: Category & Time */}
                  <div className="absolute left-3.5 top-3.5 z-10 rounded-lg bg-black/40 px-2 py-1 font-sans text-[0.6rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {reel.duration}
                  </div>

                  {/* Interactive Hearts & Comments Layer (Framer Motion popups on hover) */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-3.5">
                    <p className="mb-3 line-clamp-3 font-sans text-[0.7rem] font-semibold leading-normal text-white drop-shadow-sm transition-all duration-300 group-hover:line-clamp-none">
                      {reel.caption.split(" ").map((word, i) => 
                        word.startsWith("#") || word.startsWith("@") ? (
                          <span key={i} className="text-[#c5203a] font-bold">{word} </span>
                        ) : `${word} `
                      )}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => handleLike(reel.id, e)}
                          className="flex items-center gap-1 text-[0.68rem] font-bold text-white transition-colors hover:text-[#c5203a]"
                        >
                          <Heart className={`h-3.5 w-3.5 transition-transform ${isLiked ? "scale-125 fill-[#c5203a] text-[#c5203a]" : "text-white hover:scale-110"}`} />
                          {isLiked ? reel.likeCount + 1 : reel.likeCount}
                        </button>
                        
                        <span className="flex items-center gap-1 text-[0.68rem] font-bold text-white">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {reel.commentsCount}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[0.62rem] font-bold text-white/60">
                        <Eye className="h-3 w-3" />
                        {reel.views}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Footer Brand Info */}
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
