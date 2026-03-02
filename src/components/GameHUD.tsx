import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Apple, X } from "lucide-react";

interface GameHUDProps {
  activeBuilding: string | null;
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

const buildingContent: Record<string, { title: string; content: React.ReactNode }> = {
  hero: {
    title: "HQ TOWER",
    content: (
      <div className="space-y-4">
        <h2 className="text-3xl font-display font-bold holo-glow tracking-wider">VAIDIK</h2>
        <p className="text-sm font-display tracking-[0.25em] glow-cyan" style={{ color: 'hsl(190 100% 50% / 0.6)' }}>
          Apple Systems Developer & Maker
        </p>
        <p className="text-sm font-body leading-relaxed" style={{ color: 'hsl(200 15% 55%)' }}>
          iOS, macOS, visionOS developer. Building products, exploring Rust, and diving into consciousness research.
        </p>
      </div>
    ),
  },
  apps: {
    title: "APP STORE",
    content: (
      <div className="space-y-3">
        {apps.map((app) => (
          <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer"
            className="block p-3 rounded-lg transition-all hover:bg-white/5"
            style={{ border: '1px solid hsl(190 100% 50% / 0.1)' }}>
            <h3 className="font-display font-semibold text-sm tracking-widest" style={{ color: 'hsl(190 80% 60% / 0.8)' }}>{app.name}</h3>
            <p className="text-xs font-body mt-1" style={{ color: 'hsl(200 15% 45%)' }}>{app.desc}</p>
            {app.isAppStore && (
              <div className="flex items-center gap-1 mt-1 text-xs" style={{ color: 'hsl(350 100% 50% / 0.4)' }}>
                <Apple className="w-3 h-3" /><span>App Store</span>
              </div>
            )}
          </a>
        ))}
      </div>
    ),
  },
  opensource: {
    title: "OPEN SOURCE LAB",
    content: (
      <div className="space-y-2">
        <p className="text-xs font-body mb-3" style={{ color: 'hsl(200 15% 40%)' }}>Recent merged contributions</p>
        {opensource.map((item, i) => (
          <div key={i} className="p-2 rounded-lg" style={{ background: 'hsl(228 50% 8% / 0.5)', border: '1px solid hsl(190 100% 50% / 0.06)' }}>
            <p className="text-[10px] font-mono tracking-wider" style={{ color: 'hsl(185 55% 23% / 0.5)' }}>{item.repo}</p>
            <h4 className="text-xs font-display font-semibold mt-0.5" style={{ color: 'hsl(190 80% 60% / 0.8)' }}>{item.title}</h4>
            <p className="text-[10px] font-body mt-0.5" style={{ color: 'hsl(200 15% 40%)' }}>{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  connect: {
    title: "CONNECT HUB",
    content: (
      <div className="space-y-2">
        {links.map((link) => (
          <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-white/5"
            style={{ border: '1px solid hsl(190 100% 50% / 0.08)' }}>
            <span style={{ color: 'hsl(190 100% 50% / 0.5)' }}>{link.icon}</span>
            <span className="font-body text-sm" style={{ color: 'hsl(190 80% 60% / 0.7)' }}>{link.name}</span>
          </a>
        ))}
      </div>
    ),
  },
  interests: {
    title: "INTEREST DOME",
    content: (
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span key={interest} className="px-3 py-1.5 text-xs font-body rounded-full"
            style={{ background: 'hsl(185 55% 23% / 0.2)', border: '1px solid hsl(190 100% 50% / 0.15)', color: 'hsl(190 80% 60%)' }}>
            {interest}
          </span>
        ))}
      </div>
    ),
  },
  collab: {
    title: "COLLAB CENTER",
    content: (
      <div className="space-y-4">
        <p className="text-sm font-body leading-relaxed" style={{ color: 'hsl(200 15% 45%)' }}>
          Building the future, one project at a time. Open to collaboration on iOS/macOS projects, Rust development, and innovative ideas.
        </p>
        <a href="mailto:vaidik50000@gmail.com"
          className="inline-block px-5 py-2 rounded-full font-display text-xs font-semibold tracking-[0.15em] sw-button">
          GET IN TOUCH
        </a>
      </div>
    ),
  },
};

const GameHUD = ({ activeBuilding }: GameHUDProps) => {
  const content = activeBuilding ? buildingContent[activeBuilding] : null;

  return (
    <div className="game-hud">
      {/* Title */}
      <div className="game-hud-title">
        <h1 className="text-lg font-display font-bold tracking-[0.3em] holo-glow">VAIDIK</h1>
        <p className="text-[10px] font-mono tracking-[0.2em] mt-0.5" style={{ color: 'hsl(190 100% 50% / 0.4)' }}>
          RESUME PLANET
        </p>
      </div>

      {/* Controls hint */}
      <div className="game-hud-controls">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
          </div>
          <span className="text-[10px] font-mono" style={{ color: 'hsl(200 15% 40%)' }}>move & turn</span>
        </div>
        <p className="text-[10px] font-mono mt-1" style={{ color: 'hsl(190 100% 50% / 0.3)' }}>
          joystick on mobile · approach buildings to explore
        </p>
      </div>

      {/* Content panel */}
      <div className={`game-hud-panel ${content ? 'game-hud-panel-active' : ''}`}>
        {content && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-display font-bold tracking-[0.3em]" style={{ color: 'hsl(190 100% 50% / 0.6)' }}>
                ◆ {content.title}
              </h3>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(350 100% 50% / 0.5)' }} />
            </div>
            {content.content}
          </>
        )}
      </div>

      {/* Proximity indicator */}
      {activeBuilding && (
        <div className="game-hud-proximity">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(190 100% 50%)', boxShadow: '0 0 8px hsl(190 100% 50% / 0.5)' }} />
          <span className="text-[10px] font-mono" style={{ color: 'hsl(190 100% 50% / 0.5)' }}>
            NEARBY: {buildingContent[activeBuilding]?.title}
          </span>
        </div>
      )}
    </div>
  );
};

export default GameHUD;
