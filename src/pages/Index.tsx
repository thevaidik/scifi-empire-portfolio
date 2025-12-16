import { useState } from "react";
import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Code, Brain, Cpu, Plane, GitMerge, ExternalLink, ChevronRight, Terminal, Zap } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const links = [
    { name: "GitHub", url: "https://github.com/thevaidik", icon: Github },
    { name: "Twitter", url: "https://twitter.com/thevaidik_", icon: Twitter },
    { name: "YouTube", url: "https://www.youtube.com/@thevaidik_", icon: Youtube },
    { name: "LinkedIn", url: "https://linkedin.com/in/vaidikxx", icon: Linkedin },
    { name: "Medium", url: "https://medium.com/@thevaidik", icon: BookOpen },
    { name: "Email", url: "mailto:vaidik50000@gmail.com", icon: Mail }
  ];

  const projects = [
    { title: "nxtlap.com", desc: "Racing leagues platform", tags: ["Racing", "F1", "Web"], link: "https://nxtlap.com" },
    { title: "Briefly - RSS reader", desc: "RSS reader and News", tags: ["Swift", "iOS", "AI"], link: "https://apps.apple.com/in/app/briefly-rss-feeds-and-news/id6746949720" },
    { title: "OneCorpApps", desc: "Founder of OneCorpApps", tags: ["Swift", "iOS", "Startup"], link: "https://www.linkedin.com/company/luxswipe/" },
    { title: "LogoGuess", desc: "Guess brand logos", tags: ["SwiftUI", "Game", "iOS"], link: "#" },
    { title: "Swift Robotics", desc: "Playing with Swift Embedded", tags: ["Swift", "Embedded", "Robotics"], link: "https://github.com/swift-robotics" },
    { title: "Aviation Tracker", desc: "Real-time flight tracking", tags: ["Swift", "APIs", "Real-time"], link: "#" }
  ];

  const interests = [
    { title: "iOS Development", desc: "Creating elegant mobile experiences with Swift and SwiftUI", icon: Code },
    { title: "Consciousness & Bicameral Mind", desc: "Exploring Julian Jaynes' theories", icon: Brain },
    { title: "Robotics with Swift Embedded", desc: "Building intelligent robotic systems", icon: Cpu },
    { title: "Aviation", desc: "Passion for flight and aerospace technology", icon: Plane },
    { title: "Human Evolution", desc: "Understanding our past to shape our future", icon: Brain }
  ];

  const openSource = [
    { title: "adding prav server and boarding", repo: "prav/prav-ios", desc: "Enhanced server integration" },
    { title: "autoDownloadSettings rewrite #1033", repo: "monal-im/Monal", desc: "SwiftUI rewrite" },
    { title: "Monal Onboarding #1083", repo: "monal-im/Monal", desc: "Adding initial onboarding flow" },
    { title: "Privacy settings UI rewrite #993 #1021", repo: "monal-im/Monal", desc: "Complete SwiftUI rewrite" },
    { title: "adding icons in privacy settings #1037", repo: "monal-im/Monal", desc: "Enhanced UX with icons" }
  ];

  const sections = [
    { id: "about", label: "ABOUT.SYS", icon: Terminal },
    { id: "projects", label: "PROJECTS.EXE", icon: Zap },
    { id: "interests", label: "INTERESTS.DAT", icon: Brain },
    { id: "opensource", label: "OPENSOURCE.LOG", icon: GitMerge },
    { id: "connect", label: "CONNECT.NET", icon: Mail }
  ];

  if (activeSection) {
    return (
      <div className="min-h-screen retro-grid relative">
        <div className="crt-overlay" />
        
        {/* Header */}
        <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => setActiveSection(null)}
              className="retro-btn flex items-center gap-2"
            >
              <span>←</span> BACK
            </button>
            <span className="text-primary/60 text-sm tracking-widest uppercase">{activeSection}.VIEW</span>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          {activeSection === "about" && (
            <section className="space-y-8">
              <div className="text-primary/50 text-xs tracking-widest mb-4">// CLASSIFIED // PROJECT ID: VK-2030</div>
              <h1 className="text-4xl font-bold text-glow-strong">THE VAIDIK PROJECT</h1>
              <p className="text-accent text-lg">Apple Systems Developer and Maker</p>
              <p className="text-foreground/80 text-lg leading-relaxed">
                iOS, macOS dev, also playing with Rust and server-side Swift + founding stuff.
              </p>
              <div className="retro-divider my-8" />
              <div className="text-muted-foreground text-sm">
                <span className="text-primary">STATUS:</span> <span className="status-online">● ONLINE</span>
              </div>
            </section>
          )}

          {activeSection === "projects" && (
            <section className="space-y-6">
              <h1 className="text-3xl font-bold text-glow mb-8">CURRENT PROJECTS</h1>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-card p-5 block group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">{project.desc}</p>
                        <div className="flex gap-2 mt-3">
                          {project.tags.map((tag) => (
                            <span key={tag} className="retro-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {activeSection === "interests" && (
            <section className="space-y-6">
              <h1 className="text-3xl font-bold text-glow mb-8">TECHNICAL INTERESTS</h1>
              <div className="space-y-4">
                {interests.map((interest) => (
                  <div key={interest.title} className="retro-card p-5 flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-primary/30 rounded">
                      <interest.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{interest.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{interest.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === "opensource" && (
            <section className="space-y-6">
              <h1 className="text-3xl font-bold text-glow mb-8">OPEN SOURCE ACTIVITY</h1>
              <div className="space-y-3">
                {openSource.map((pr) => (
                  <div key={pr.title} className="retro-card p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground text-sm flex-1">{pr.title}</h3>
                      <div className="flex items-center gap-1.5 ml-2">
                        <GitMerge className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs font-medium">MERGED</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs mb-2">{pr.desc}</p>
                    <div className="flex items-center gap-2">
                      <Github className="w-3 h-3 text-muted-foreground" />
                      <span className="text-primary/80 text-xs">{pr.repo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeSection === "connect" && (
            <section className="space-y-8">
              <h1 className="text-3xl font-bold text-glow mb-8">ESTABLISH CONNECTION</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-card p-4 flex items-center gap-3 group"
                  >
                    <link.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
                    <span className="text-sm font-medium text-foreground">{link.name}</span>
                  </a>
                ))}
              </div>
              <div className="retro-divider my-8" />
              <div className="retro-card p-6">
                <p className="text-foreground/80 leading-relaxed mb-4">
                  I am always up for research and industry collaborations. If you like my work and think we can collaborate on something cool, reach out via{" "}
                  <a href="mailto:vaidik50000@gmail.com" className="text-primary hover:text-accent">email</a> or{" "}
                  <a href="https://twitter.com/thevaidik_" className="text-primary hover:text-accent">Twitter</a>.
                </p>
                <a
                  href="https://bento.me/thevaidik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn inline-flex items-center gap-2"
                >
                  Visit Bento Grid <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen retro-grid relative">
      <div className="crt-overlay" />
      
      {/* Hero Section */}
      <header className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-primary/50 text-xs tracking-[0.3em] mb-6 flicker">
            // SYSTEM INITIALIZED //
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-glow-strong mb-4 tracking-tight">
            VAIDIK
          </h1>
          <p className="text-accent text-lg md:text-xl tracking-wide mb-2">
            Apple Systems Developer & Maker
          </p>
          <p className="text-muted-foreground text-sm tracking-widest">
            iOS • macOS • visionOS • Swift • Rust
          </p>
          
          {/* Quick Links */}
          <div className="flex justify-center gap-4 mt-8">
            {links.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all rounded"
                title={link.name}
              >
                <link.icon className="w-4 h-4 text-primary" />
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="retro-divider max-w-2xl mx-auto" />

      {/* Navigation Grid */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-primary/50 text-xs tracking-widest mb-8 text-center">
          SELECT MODULE TO EXECUTE
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="retro-card p-6 text-left group pulse-glow"
            >
              <div className="flex items-center gap-3 mb-3">
                <section.icon className="w-5 h-5 text-primary" />
                <span className="text-xs text-primary/60 tracking-widest">/{section.id.toUpperCase()}</span>
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                {section.label}
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
            </button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 text-xs text-muted-foreground tracking-wider">
            <span>SYS.STATUS: <span className="status-online">OPERATIONAL</span></span>
            <span className="text-primary/30">|</span>
            <span>UPTIME: 99.9%</span>
            <span className="text-primary/30">|</span>
            <span>LOC: EARTH</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-xs tracking-wider">
            © 2024 VAIDIK SYSTEMS • ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
