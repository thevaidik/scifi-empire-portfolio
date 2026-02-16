import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Sparkles, Apple } from "lucide-react";
import deathStar from "@/assets/death-star.png";
import HeroScene3D from "@/components/HeroScene3D";

const Index = () => {
  const links = [
    { name: "GitHub", url: "https://github.com/thevaidik", icon: <Github className="w-5 h-5" /> },
    { name: "Twitter", url: "https://twitter.com/thevaidik_", icon: <Twitter className="w-5 h-5" /> },
    { name: "YouTube", url: "https://www.youtube.com/@thevaidik_", icon: <Youtube className="w-5 h-5" /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/vaidikxx", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Medium", url: "https://medium.com/@thevaidik", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Email", url: "mailto:vaidik50000@gmail.com", icon: <Mail className="w-5 h-5" /> },
  ];

  const apps = [
    { 
      name: "NxtLap", 
      desc: "Race Scores & Widgets", 
      url: "https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034",
      isAppStore: true
    },
    { 
      name: "Briefly", 
      desc: "RSS Reader & News", 
      url: "https://apps.apple.com/in/app/briefly-rss-reader-and-news/id6746949720",
      isAppStore: true
    },
    { 
      name: "nxtlap.com", 
      desc: "Motorsport news aggregator", 
      url: "https://nxtlap.com",
      isAppStore: false
    },
  ];

  const interests = [
    "iOS Development",
    "macOS Development", 
    "Rust Programming",
    "Consciousness & Bicameral Mind",
    "Space Exploration",
    "Aviation & Drones",
  ];

  const opensource = [
    { repo: "prav/prav-ios", title: "adding prav server and boarding", desc: "Enhanced server integration and improved onboarding experience", status: "MERGED" },
    { repo: "prav/prav-ios", title: "autoDownloadSettings rewrite #1033", desc: "SwiftUI rewrite of autoDownloadSettings for improved user experience", status: "MERGED" },
    { repo: "monal-im/Monal", title: "Monal Onboarding #1083", desc: "Adding initial onboarding flow to improve new user experience", status: "MERGED" },
    { repo: "monal-im/Monal", title: "Rewrite privacy settings UI #993 #1021", desc: "Complete SwiftUI rewrite of privacy settings interface", status: "MERGED" },
    { repo: "monal-im/Monal", title: "adding icons in privacy settings #1037", desc: "Enhanced privacy settings with intuitive icons for better UX", status: "MERGED" },
  ];

  return (
    <div className="min-h-screen space-bg text-foreground">
      {/* Ambient top tagline */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 text-white/15 text-xs font-mono tracking-[0.3em] z-20">
        A long time ago in a galaxy far, far away...
      </div>

      {/* Corner decorations — subtle organic dots */}
      <div className="fixed top-8 left-4 text-white/8 text-lg z-20">○</div>
      <div className="fixed top-8 right-4 text-white/8 text-lg z-20">○</div>
      <div className="fixed bottom-4 left-4 text-white/8 text-lg z-20">○</div>
      <div className="fixed bottom-4 right-4 text-white/8 text-lg z-20">○</div>

      <div className="relative z-10 container mx-auto px-6 py-20 max-w-3xl">
        
        {/* 3D Sentient Core */}
        <section className="mb-12 -mx-6">
          <HeroScene3D />
        </section>

        {/* Hero */}
        <header className="text-center mb-20 animate-fade-in">
          <div className="scan-flourish mb-8">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-5 holo-glow tracking-wider">
            VAIDIK
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-display tracking-[0.25em] mb-5 font-light">
            Apple Systems Developer & Maker
          </p>
          <div className="w-40 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mx-auto my-6" />
          <p className="text-white/40 max-w-lg mx-auto font-body text-lg leading-relaxed tracking-wide">
            iOS, macOS, visionOS developer. Building products, exploring Rust, 
            and diving into consciousness research.
          </p>
        </header>

        {/* Connect */}
        <section className="mb-16">
          <h2 className="section-title">CONNECT</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sw-card px-4 py-2.5 flex items-center gap-2.5 hover:scale-105 transition-all text-sm"
              >
                <span className="text-white/50">{link.icon}</span>
                <span className="font-body font-medium tracking-wide text-white/70">{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* My Projects and Apps */}
        <section className="mb-16">
          <h2 className="section-title">MY PROJECTS & APPS</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {apps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sw-card p-5 hover:scale-105 transition-all block text-center scan-line-effect"
              >
                <h3 className="text-white/80 font-display font-semibold text-sm mb-1.5 tracking-widest">{app.name}</h3>
                <p className="text-sm text-white/35 font-body leading-relaxed mb-2 tracking-wide">{app.desc}</p>
                {app.isAppStore && (
                  <div className="flex items-center justify-center gap-1.5 text-white/30 text-xs font-display tracking-[0.15em]">
                    <Apple className="w-3.5 h-3.5" />
                    <span>App Store</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section className="mb-16">
          <h2 className="section-title">OPEN SOURCE</h2>
          <p className="text-center text-white/25 mb-6 font-body text-sm tracking-wide">Recent contributions to open-source projects</p>
          <div className="space-y-3">
            {opensource.map((item, index) => (
              <div key={index} className="sw-card p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-white/30 text-xs font-mono tracking-wider mb-0.5">{item.repo}</p>
                    <h3 className="text-white/80 font-display font-semibold text-sm mb-1 tracking-wide">{item.title}</h3>
                    <p className="text-xs text-white/30 font-body leading-relaxed tracking-wide">{item.desc}</p>
                  </div>
                  <span className="px-2.5 py-0.5 text-xs rounded-full merged-badge shrink-0">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="mb-16">
          <h2 className="section-title">INTERESTS</h2>
          <div className="flex flex-wrap justify-center gap-2.5">
            {interests.map((interest) => (
              <span
                key={interest}
                className="sw-tag text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Collaborate */}
        <section className="mb-16 text-center">
          <h2 className="section-title">LET'S COLLABORATE</h2>
          <div className="sw-card p-8 max-w-xl mx-auto scan-line-effect">
            <p className="text-base mb-6 text-white/35 font-body leading-relaxed tracking-wide">
              Building the future, one project at a time. 
              Open to collaboration on iOS/macOS projects, Rust development, 
              and innovative ideas.
            </p>
            <a
              href="mailto:vaidik50000@gmail.com"
              className="inline-block px-6 py-2.5 sw-button rounded-full font-semibold text-xs"
            >
              GET IN TOUCH
            </a>
          </div>
        </section>

        {/* Blueprint — circular organism cell */}
        <section className="mb-12">
          <div className="blueprint-container p-4 max-w-[200px] mx-auto aspect-square flex items-center justify-center">
            <img 
              src={deathStar} 
              alt="Death Star Blueprint Schematic" 
              className="w-full"
            />
          </div>
          <p className="text-center text-white/15 mt-4 font-mono text-xs tracking-[0.2em]">
            "Do. Or do not. There is no try." — Yoda
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center text-white/15 text-xs py-6 border-t border-white/5">
          <p className="font-body tracking-wide">© 2024 Vaidik. Built with passion.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
