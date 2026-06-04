const sponsors = [
  { name: "BULOVAS RESTORATIONS", url: "https://www.bulovasrestorations.com/index.html" },
  { name: "M&T STRONG CONCRETE", url: "https://mbstrongconcrete.com/" },
]

const sponsorTickerItems = Array.from({ length: 6 }, () => sponsors).flat()
const sponsorTickerTrack = [...sponsorTickerItems, ...sponsorTickerItems]

export function SponsorsStrip() {
  return (
    <section className="relative overflow-hidden bg-[#080c18] py-0">


      <div className="h-[3px] bg-gradient-to-r from-[#1e2d5e] via-[#b8962e] to-[#c5203a]" />

      <div
        className="flex items-center justify-center gap-4 px-4 py-8 text-center sm:px-0"
      >
        <span className="hidden h-px w-16 bg-[#b8962e]/25 sm:block" />
        <span className="section-eyebrow block max-w-[17rem] text-center text-white sm:max-w-none">
          Official Partners and Sponsors
        </span>
        <span className="hidden h-px w-16 bg-[#b8962e]/25 sm:block" />
      </div>

      <div
        className="relative mb-8 overflow-hidden"
      >
        <div className="sponsor-ticker-wrap" aria-label="Official sponsor ticker">
          <div className="sponsor-ticker-fade sponsor-ticker-fade--l" aria-hidden="true" />
          <div className="sponsor-ticker-fade sponsor-ticker-fade--r" aria-hidden="true" />

          <div className="sponsor-ticker-track">
            {sponsorTickerTrack.map((sponsor, i) => (
              <a
                key={`${sponsor.name}-${i}`}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-ticker-item"
              >
                {sponsor.name}
                <span className="sponsor-ticker-gem" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-[#b8962e]/30 to-transparent" />
    </section>
  )
}
