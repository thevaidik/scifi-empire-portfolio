import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Apple, Gamepad2 } from "lucide-react";

interface PortfolioProps {
  onEnterGame: () => void;
}

const links = [
  { name: "GitHub", url: "https://github.com/thevaidik", icon: <Github className="w-5 h-5" /> },
  { name: "Twitter", url: "https://twitter.com/thevaidik_", icon: <Twitter className="w-5 h-5" /> },
  { name: "YouTube", url: "https://www.youtube.com/@thevaidik_", icon: <Youtube className="w-5 h-5" /> },
  { name: "LinkedIn", url: "https://linkedin.com/in/vaidikxx", icon: <Linkedin className="w-5 h-5" /> },
  { name: "Medium", url: "https://medium.com/@thevaidik", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Email", url: "mailto:vaidik50000@gmail.com", icon: <Mail className="w-5 h-5" /> },
];

const apps = [
  { name: "NxtLap", desc: "Race Scores & Widgets", url: "https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034", isAppStore: true },
  { name: "Briefly", desc: "RSS Reader & News", url: "https://apps.apple.com/in/app/briefly-rss-reader-and-news/id6746949720", isAppStore: true },
  { name: "nxtlap.com", desc: "Motorsport news aggregator", url: "https://nxtlap.com", isAppStore: false },
];

const opensource = [
  { repo: "prav/prav-ios", title: "adding prav server and boarding", desc: "Enhanced server integration and improved onboarding experience", status: "MERGED" },
  { repo: "prav/prav-ios", title: "autoDownloadSettings rewrite #1033", desc: "SwiftUI rewrite of autoDownloadSettings for improved user experience", status: "MERGED" },
  { repo: "monal-im/Monal", title: "Monal Onboarding #1083", desc: "Adding initial onboarding flow to improve new user experience", status: "MERGED" },
  { repo: "monal-im/Monal", title: "Rewrite privacy settings UI #993 #1021", desc: "Complete SwiftUI rewrite of privacy settings interface", status: "MERGED" },
  { repo: "monal-im/Monal", title: "adding icons in privacy settings #1037", desc: "Enhanced privacy settings with intuitive icons for better UX", status: "MERGED" },
];

const interests = [
  "iOS Development", "macOS Development", "Rust Programming",
  "Consciousness & Bicameral Mind", "Space Exploration", "Aviation & Drones",
];

const Portfolio = ({ onEnterGame }: PortfolioProps) => {
  return (
    <div className="min-h-screen space-bg">
      <div className="plankton-layer" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-display font-bold holo-glow tracking-[0.2em] mb-3">VAIDIK</h1>
          <p className="text-sm font-display tracking-[0.25em] glow-cyan" style={{ color: 'hsl(var(--bio-cyan-glow))' }}>
            Apple Systems Developer & Maker
          </p>
          <p className="text-sm font-body mt-4 max-w-md mx-auto leading-relaxed" style={{ color: 'hsl(var(--bio-text-dim))' }}>
            iOS, macOS, visionOS developer. Building products, exploring Rust, and diving into consciousness research.
          </p>
        </header>

        {/* Game Mode Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={onEnterGame}
            className="sw-button flex items-center gap-3 px-8 py-3 rounded-full font-display text-sm font-semibold tracking-[0.15em]"
          >
            <Gamepad2 className="w-5 h-5" />
            EXPLORE IN 3D
          </button>
        </div>

        {/* Divider */}
        <div className="depth-divider" />

        {/* Apps */}
        <section className="mb-12">
          <h2 className="section-title">Apps</h2>
          <div className="space-y-3">
            {apps.map((app) => (
              <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer"
                className="block sw-card-static p-4 pointer-events-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-base tracking-widest" style={{ color: 'hsl(var(--bio-cyan-glow))' }}>{app.name}</h3>
                    <p className="text-sm font-body mt-1" style={{ color: 'hsl(var(--bio-text-dim))' }}>{app.desc}</p>
                  </div>
                  {app.isAppStore && (
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'hsl(var(--bio-red) / 0.5)' }}>
                      <Apple className="w-4 h-4" />
                      <span>App Store</span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="depth-divider" />

        {/* Open Source */}
        <section className="mb-12">
          <h2 className="section-title">Open Source</h2>
          <p className="text-xs font-body mb-4 text-center" style={{ color: 'hsl(var(--bio-text-dim))' }}>Recent merged contributions</p>
          <div className="space-y-2">
            {opensource.map((item, i) => (
              <div key={i} className="sw-card-static p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-mono tracking-wider" style={{ color: 'hsl(var(--bio-teal) / 0.6)' }}>{item.repo}</p>
                  <span className="merged-badge px-2 py-0.5 rounded-full">{item.status}</span>
                </div>
                <h4 className="text-sm font-display font-semibold mt-1" style={{ color: 'hsl(var(--bio-cyan-glow))' }}>{item.title}</h4>
                <p className="text-xs font-body mt-1" style={{ color: 'hsl(var(--bio-text-dim))' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="depth-divider" />

        {/* Interests */}
        <section className="mb-12">
          <h2 className="section-title">Interests</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {interests.map((interest, i) => (
              <span key={interest} className="sw-tag" style={{ '--i': i } as React.CSSProperties}>
                {interest}
              </span>
            ))}
          </div>
        </section>

        <div className="depth-divider" />

        {/* Connect */}
        <section className="mb-12">
          <h2 className="section-title">Connect</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                className="sw-card-static flex items-center gap-2 px-4 py-2 pointer-events-auto hover:scale-105 transition-transform">
                <span style={{ color: 'hsl(var(--bio-cyan) / 0.6)' }}>{link.icon}</span>
                <span className="font-body text-sm" style={{ color: 'hsl(var(--bio-cyan-glow))' }}>{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        <div className="depth-divider" />

        {/* CTA */}
        <section className="text-center mb-8">
          <p className="text-sm font-body mb-4" style={{ color: 'hsl(var(--bio-text-dim))' }}>
            Open to collaboration on iOS/macOS projects, Rust development, and innovative ideas.
          </p>
          <a href="mailto:vaidik50000@gmail.com"
            className="inline-block px-6 py-2 rounded-full font-display text-xs font-semibold tracking-[0.15em] sw-button">
            GET IN TOUCH
          </a>
        </section>

      </div>
    </div>
  );
};

export default Portfolio;
