import Image from "next/image"

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nextupboxingleague/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCo1IceoT57YLFphnf3Iqj5A",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590315922265",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <>


      <footer id="about" className="nub-footer">
        <div className="nub-top-border" aria-hidden="true" />

        <div className="nub-inner">
          <div className="nub-grid">
            <div className="nub-brand">
              <div className="nub-bracket">
                <Image
                  src="/logo-footer.png"
                  alt="NextUp Boxing"
                  width={140}
                  height={56}
                  className="h-auto w-28 sm:w-36"
                />
              </div>
              <p className="nub-tagline">
                Premium boxing events, live fight nights, and fighter stories.
              </p>
            </div>

            <div className="nub-social-col">
              <div className="nub-icon-row">
                {SOCIAL_LINKS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="nub-icon-btn"
                  >
                    <span className="nub-icon-cell">{icon}</span>
                    <span className="nub-icon-label">{label}</span>
                  </a>
                ))}
              </div>

              <a
                href="https://www.simpletix.com/e/strong-island-fight-night-11-tickets-254611"
                target="_blank"
                rel="noopener noreferrer"
                className="nub-cta"
              >
                <span>Buy Tickets — Fight Night 11</span>
              </a>
            </div>
          </div>

          <div className="nub-hud">
            <div className="nub-hud-left">
              <span className="nub-hud-gem" aria-hidden="true">◆</span>
              <span className="nub-copyright">
                © 2026 NextUp Boxing League. All rights reserved.
              </span>
              <div className="nub-hud-sanc">
                <Image
                  src="/usa-boxing-metro-logo.png"
                  alt="USA Boxing Metro"
                  width={72}
                  height={28}
                  className="h-auto opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
