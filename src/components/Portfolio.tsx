import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Apple, Gamepad2 } from "lucide-react";

interface PortfolioProps {
  onEnterGame: () => void;
}

const links = [
  { name: "GitHub", url: "https://github.com/thevaidik", icon: <Github className="w-4 h-4" /> },
  { name: "Twitter", url: "https://twitter.com/thevaidik_", icon: <Twitter className="w-4 h-4" /> },
  { name: "YouTube", url: "https://www.youtube.com/@thevaidik_", icon: <Youtube className="w-4 h-4" /> },
  { name: "LinkedIn", url: "https://linkedin.com/in/vaidikxx", icon: <Linkedin className="w-4 h-4" /> },
  { name: "Medium", url: "https://medium.com/@thevaidik", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Email", url: "mailto:vaidik50000@gmail.com", icon: <Mail className="w-4 h-4" /> },
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
    <div className="paper-bg">
      <div className="paper-sheet">

        {/* Header */}
        <header className="mb-10 border-b-2 border-stone-800 pb-6">
          <h1 className="paper-name">Vaidik</h1>
          <p className="paper-subtitle">Apple Systems Developer & Maker</p>
          <p className="paper-body mt-3">
            iOS, macOS, visionOS developer. Building products, exploring Rust, and diving into consciousness research.
          </p>
        </header>

        {/* Game Mode Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={onEnterGame}
            className="paper-game-btn"
          >
            <Gamepad2 className="w-4 h-4" />
            Explore this resume in 3D →
          </button>
        </div>

        {/* Apps */}
        <section className="mb-10">
          <h2 className="paper-heading">Apps</h2>
          <div className="space-y-3">
            {apps.map((app) => (
              <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer"
                className="paper-item group">
                <div>
                  <h3 className="paper-item-title">{app.name}</h3>
                  <p className="paper-body text-sm">{app.desc}</p>
                </div>
                {app.isAppStore && (
                  <span className="paper-badge">
                    <Apple className="w-3 h-3" /> App Store
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>

        <hr className="paper-hr" />

        {/* Open Source */}
        <section className="mb-10">
          <h2 className="paper-heading">Open Source Contributions</h2>
          <p className="paper-body text-sm mb-4 italic">Recent merged pull requests</p>
          <div className="space-y-3">
            {opensource.map((item, i) => (
              <div key={i} className="paper-item flex-col !items-start">
                <div className="flex items-center justify-between w-full">
                  <code className="text-xs text-stone-500">{item.repo}</code>
                  <span className="paper-merged">✓ {item.status}</span>
                </div>
                <h4 className="paper-item-title mt-1">{item.title}</h4>
                <p className="paper-body text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="paper-hr" />

        {/* Interests */}
        <section className="mb-10">
          <h2 className="paper-heading">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span key={interest} className="paper-tag">
                {interest}
              </span>
            ))}
          </div>
        </section>

        <hr className="paper-hr" />

        {/* Connect */}
        <section className="mb-10">
          <h2 className="paper-heading">Connect</h2>
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                className="paper-link">
                {link.icon}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        <hr className="paper-hr" />

        {/* CTA */}
        <section className="text-center">
          <p className="paper-body mb-4">
            Open to collaboration on iOS/macOS projects, Rust development, and innovative ideas.
          </p>
          <a href="mailto:vaidik50000@gmail.com" className="paper-game-btn inline-flex">
            Get in touch →
          </a>
        </section>

      </div>
    </div>
  );
};

export default Portfolio;
