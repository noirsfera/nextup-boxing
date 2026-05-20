import Image from "next/image"
import Link from "next/link"
import { Trophy, ChevronRight, ChevronLeft, Users } from "lucide-react"

const champions = [
  {
    id: 1,
    firstName: "VERGIL",
    lastName: "ORTIZ JR.",
    weightClass: "SUPER WELTERWEIGHT",
    titles: ["WBC Interim"],
    stats: { win: 24, loss: 0, draw: 0, kos: 22 },
    image: "/fighter-1.png"
  },
  {
    id: 2,
    firstName: "RYAN",
    lastName: "GARCIA",
    weightClass: "WELTERWEIGHT",
    titles: ["WBC"],
    stats: { win: 25, loss: 2, draw: 0, kos: 20 },
    image: "/fighter-2.png"
  },
  {
    id: 3,
    firstName: "RICARDO",
    lastName: "SANDOVAL",
    weightClass: "FLYWEIGHT",
    titles: ["WBC", "WBA"],
    stats: { win: 27, loss: 2, draw: 0, kos: 18 },
    image: "/fighter-1.png"
  },
  {
    id: 4,
    firstName: "GABRIELA",
    lastName: "FUNDORA",
    weightClass: "FLYWEIGHT",
    titles: ["IBF", "WBO", "WBC", "WBA"],
    stats: { win: 18, loss: 0, draw: 0, kos: 10 },
    image: "/fighter-2.png"
  }
]

const bannerFighters = [
  { id: 1, name: "CAPETILLO", image: "/fighter-1.png" },
  { id: 2, name: "BARBOZA JR.", image: "/fighter-2.png" },
  { id: 3, name: "FLORES", image: "/fighter-1.png" },
  { id: 4, name: "PRIEST", image: "/fighter-2.png" },
  { id: 5, name: "CONWELL", image: "/fighter-1.png" }
]

export function ChampionsSection() {
  return (
    <section className="bg-[#0a0a0a] py-16 w-full overflow-hidden border-t border-[#b8962e]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="relative mb-12 flex flex-col items-center justify-center text-center">
          {/* Horizontal Line behind */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#b8962e] opacity-40 z-0"></div>
          
          <div className="relative z-10 bg-[#0a0a0a] px-6 flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-white mb-[-10px] drop-shadow-lg" style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>
              WORLD
            </h2>
            <h2 
              className="text-5xl md:text-6xl font-bold uppercase tracking-widest text-transparent drop-shadow-md" 
              style={{ 
                fontFamily: "var(--font-bebas), Impact, sans-serif",
                WebkitTextStroke: "1.5px #b8962e"
              }}
            >
              CHAMPIONS
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Nav arrows (absolute) */}
          <button className="absolute left-0 top-1/3 -translate-y-1/2 z-20 bg-black/60 p-2 text-white hover:bg-[#c5203a] transition-colors lg:-left-6 hidden md:block border border-white/10 shadow-lg">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="absolute right-0 top-1/3 -translate-y-1/2 z-20 bg-black/60 p-2 text-white hover:bg-[#c5203a] transition-colors lg:-right-6 hidden md:block border border-white/10 shadow-lg">
            <ChevronRight className="h-6 w-6" />
          </button>

          {champions.map((fighter) => (
            <div key={fighter.id} className="flex flex-col transform transition-transform hover:-translate-y-1 hover:shadow-2xl">
              
              {/* Image & Gradient Container */}
              <div className="relative h-[360px] w-full bg-gradient-to-b from-[#d4ae44] to-[#b8962e] overflow-hidden">
                <Image
                  src={fighter.image}
                  alt={`${fighter.firstName} ${fighter.lastName}`}
                  fill
                  className="object-cover object-top drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>
                
                {/* Fighter Info Overlay */}
                <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                  <div className="uppercase tracking-widest text-xl drop-shadow-lg" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                    <span className="text-white font-normal">{fighter.firstName} </span>
                    <span className="text-[#b8962e] font-bold">{fighter.lastName}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-gray-300 tracking-[0.2em] mb-2 uppercase drop-shadow-sm">
                    {fighter.weightClass}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {fighter.titles.map((title, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-[11px] font-bold text-[#b8962e] tracking-wider uppercase drop-shadow-md">
                        <Trophy className="h-3.5 w-3.5 text-[#c5203a]" />
                        {title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Block */}
              <div className="grid grid-cols-4 text-center border-b border-[#1e2d5e]/20">
                <div className="bg-[#b8962e] py-2 text-[11px] font-bold text-white uppercase tracking-wider">WIN</div>
                <div className="bg-[#b8962e] py-2 text-[11px] font-bold text-white uppercase tracking-wider border-l border-[#c9a435]">LOSS</div>
                <div className="bg-[#b8962e] py-2 text-[11px] font-bold text-white uppercase tracking-wider border-l border-[#c9a435]">DRAW</div>
                <div className="bg-[#b8962e] py-2 text-[11px] font-bold text-white uppercase tracking-wider border-l border-[#c9a435]">KOs</div>
                
                <div className="bg-[#1a1a1a] py-3 text-[15px] font-bold text-white">{fighter.stats.win}</div>
                <div className="bg-[#1a1a1a] py-3 text-[15px] font-bold text-white border-l border-white/10">{fighter.stats.loss}</div>
                <div className="bg-[#1a1a1a] py-3 text-[15px] font-bold text-white border-l border-white/10">{fighter.stats.draw}</div>
                <div className="bg-[#1a1a1a] py-3 text-[15px] font-bold text-white border-l border-white/10">{fighter.stats.kos}</div>
              </div>

              {/* Action Button */}
              <button className="mt-4 border-2 border-[#b8962e] py-3 text-[13px] font-bold text-[#b8962e] transition-all duration-300 hover:bg-[#b8962e] hover:text-black uppercase tracking-wider shadow-sm">
                FIGHTER PROFILE
              </button>

            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-white shadow-sm"></div>
          <div className="h-2 w-2 rounded-full border border-white bg-transparent"></div>
        </div>

        {/* Bottom Banner Strip */}
        <div className="mt-12 relative w-full overflow-hidden bg-gradient-to-r from-[#b8962e] to-[#d4ae44] px-6 py-4 flex flex-col md:flex-row items-center justify-between shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
          {/* Diagonal Stripes Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 12px)" }}>
          </div>
          
          <div className="relative z-10 flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center gap-3 text-white mb-3 drop-shadow-md">
              <Users className="h-7 w-7" />
              <span className="text-4xl font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>FIGHTERS</span>
            </div>
            <Link 
              id="view-all-fighters-btn"
              href="/boxers" 
              className="flex items-center gap-2 bg-[#0a0a0a] px-6 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#c5203a] uppercase tracking-wider shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
              VIEW ALL
            </Link>
          </div>

          <div className="relative z-10 flex w-full md:w-auto items-end justify-between md:justify-end gap-2 md:gap-8 overflow-x-auto pb-1 scrollbar-hide">
            {bannerFighters.map((bf) => (
              <div key={bf.id} className="flex flex-col items-center shrink-0 w-[80px] md:w-[110px] transform transition-transform hover:-translate-y-1">
                <div className="relative h-[90px] md:h-[120px] w-full mb-1">
                  <Image
                    src={bf.image}
                    alt={bf.name}
                    fill
                    className="object-contain object-bottom drop-shadow-lg"
                  />
                </div>
                <div className="w-full border-t-2 border-black/30 pt-1.5 text-center">
                  <span className="text-[12px] md:text-[14px] font-bold text-black uppercase tracking-wider" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
                    {bf.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
