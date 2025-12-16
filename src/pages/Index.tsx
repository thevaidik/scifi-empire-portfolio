import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen } from "lucide-react";

const Index = () => {
  const links = [
    { name: "GitHub", url: "https://github.com/thevaidik", icon: <Github className="w-5 h-5" /> },
    { name: "Twitter", url: "https://twitter.com/thevaidik_", icon: <Twitter className="w-5 h-5" /> },
    { name: "YouTube", url: "https://www.youtube.com/@thevaidik_", icon: <Youtube className="w-5 h-5" /> },
    { name: "LinkedIn", url: "https://linkedin.com/in/vaidikxx", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Medium", url: "https://medium.com/@thevaidik", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Email", url: "mailto:vaidik50000@gmail.com", icon: <Mail className="w-5 h-5" /> },
  ];

  const projects = [
    { name: "nxtlap.com", desc: "Motorsport news aggregator", url: "https://nxtlap.com" },
    { name: "Briefly", desc: "Minimalist RSS reader for iOS", url: "#" },
    { name: "Vaidik.life", desc: "Personal portfolio (this site)", url: "#" },
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
    <div className="min-h-screen bg-synthwave-dark text-synthwave-text">
      {/* Grid Background */}
      <div className="fixed inset-0 synthwave-grid opacity-20 pointer-events-none" />
      
      {/* Sun Gradient */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-t-full bg-gradient-to-t from-synthwave-pink via-synthwave-orange to-transparent opacity-30 blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Hero */}
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 synthwave-glow">
            VAIDIK
          </h1>
          <p className="text-xl md:text-2xl text-synthwave-cyan font-mono">
            Apple Systems Developer & Maker
          </p>
          <p className="text-synthwave-text/70 mt-4 max-w-xl mx-auto">
            iOS, macOS, visionOS developer. Building products, exploring Rust, 
            and diving into consciousness research.
          </p>
        </header>

        {/* Connect */}
        <section className="mb-16">
          <h2 className="section-title">CONNECT</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="synthwave-card px-6 py-3 flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <span className="text-synthwave-cyan">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16">
          <h2 className="section-title">PROJECTS</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                className="synthwave-card p-6 hover:scale-105 transition-transform block"
              >
                <h3 className="text-synthwave-pink font-bold text-lg mb-2">{project.name}</h3>
                <p className="text-sm text-synthwave-text/70">{project.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="mb-16">
          <h2 className="section-title">INTERESTS</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="synthwave-tag"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section className="mb-16">
          <h2 className="section-title">OPEN SOURCE ACTIVITY</h2>
          <p className="text-center text-synthwave-text/60 mb-8">Recent contributions to open-source projects</p>
          <div className="space-y-4">
            {opensource.map((item, index) => (
              <div key={index} className="synthwave-card p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-synthwave-purple text-xs font-mono mb-1">{item.repo}</p>
                    <h3 className="text-synthwave-cyan font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-synthwave-text/70">{item.desc}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded bg-green-500/20 text-green-400 border border-green-500/40 shrink-0">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collaborate */}
        <section className="mb-16 text-center">
          <h2 className="section-title">LET'S COLLABORATE</h2>
          <div className="synthwave-card p-8 max-w-2xl mx-auto">
            <p className="text-lg mb-6 text-synthwave-text/80">
              Building the future, one project at a time. 
              Open to collaboration on iOS/macOS projects, Rust development, 
              and innovative ideas.
            </p>
            <a
              href="mailto:vaidik50000@gmail.com"
              className="inline-block px-8 py-3 bg-gradient-to-r from-synthwave-pink to-synthwave-purple text-white font-bold rounded-lg hover:scale-105 transition-transform synthwave-button-glow"
            >
              Get In Touch
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-synthwave-text/50 text-sm py-8 border-t border-synthwave-purple/30">
          <p>© 2024 Vaidik. Built with passion.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
