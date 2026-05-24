import Image from "next/image"
import Link from "next/link"
import { MapPin, Ticket, ArrowRight } from "lucide-react"

const events = [
  {
    id: 1,
    date: "Sat, Jun 27",
    title: "ZAYAS VS ENNIS",
    location: "Barclays Center | Brooklyn, New York City",
    broadcaster: "DAZN",
    image: "/fighter-1.png",
    ticketUrl: "#",
  },
  {
    id: 2,
    date: "Sat, Jul 4 / 8:00 PM ET",
    title: "MASON VS CORDINA",
    location: "CSU Wolstein Center | Cleveland, Ohio",
    broadcaster: "TNT and DAZN",
    image: "/fighter-2.png",
    ticketUrl: "#",
  },
  {
    id: 3,
    date: "Fri, Aug 14 / 7:30 PM ET",
    title: "HERNANDEZ VS RODRIGUEZ",
    location: "Madison Square Garden | New York, NY",
    broadcaster: "ESPN+",
    image: "/fighter-3.png",
    ticketUrl: "#",
  }
]

export function EventsSection() {
  return (
    <section id="events" className="relative w-full scroll-mt-20 overflow-hidden bg-white py-16 md:py-24">
      {/* Background TEXT */}
      <div className="pointer-events-none absolute left-0 right-0 top-10 flex justify-center overflow-hidden">
        <span className="text-[15rem] font-black leading-none text-[#f8f8f8] select-none uppercase tracking-tighter">
          EVENTS
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-6">
            <button className="text-xl font-bold text-[#c5203a] tracking-tight">UPCOMING</button>
            <button className="text-xl font-bold text-gray-300 tracking-tight transition-colors hover:text-gray-500">PAST</button>
          </div>
          <Link href="/events" className="flex items-center gap-2 text-sm font-bold text-black tracking-tight transition-colors hover:text-[#c5203a] uppercase">
            SEE ALL EVENTS <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Event List - 3 across on md+ */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {events.map((event) => (
            <article key={event.id} className="flex w-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm">
              <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <Image src={event.image} alt={event.title} fill className="object-cover object-top" />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4">
                <span className="text-[13px] font-bold text-[#b8962e]">{event.date}</span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-[#1e2d5e]" style={{ fontFamily: "var(--font-bebas), Impact, sans-serif" }}>{event.title}</h3>
                <div className="flex items-center gap-2 text-[13px] text-gray-700">
                  <MapPin className="h-4 w-4 text-[#c5203a]" />
                  <span className="truncate">{event.location}</span>
                </div>
                <span className="text-[13px] text-gray-500">{event.broadcaster}</span>

                <div className="mt-4 flex gap-3">
                  <a href={event.ticketUrl} className="inline-flex items-center gap-2 rounded-md bg-yellow-300 px-4 py-2 text-sm font-bold text-[#0d1124] transition-colors hover:bg-yellow-400">
                    <Ticket className="h-4 w-4" />
                    BUY TICKETS
                  </a>
                  <Link href="#" className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-bold text-[#1e2d5e] transition-colors hover:bg-gray-200">
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
