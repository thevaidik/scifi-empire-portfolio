import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Feather } from "lucide-react";
import davinciHelicopter from "@/assets/davinci-helicopter.png";

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
    <div className="min-h-screen parchment-bg text-davinci-ink">
      {/* Tribute to Da Vinci */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 text-davinci-sketch/50 text-xs font-body italic tracking-wide">
        Design inspired by Leonardo da Vinci (1452–1519)
      </div>

      {/* Decorative corner ornaments */}
      <div className="fixed top-8 left-4 text-davinci-gold/30 text-4xl font-display">❧</div>
      <div className="fixed top-8 right-4 text-davinci-gold/30 text-4xl font-display rotate-90">❧</div>
      <div className="fixed bottom-4 left-4 text-davinci-gold/30 text-4xl font-display -rotate-90">❧</div>
      <div className="fixed bottom-4 right-4 text-davinci-gold/30 text-4xl font-display rotate-180">❧</div>

      <div className="relative z-10 container mx-auto px-6 py-16 max-w-3xl">
        
        {/* Hero */}
        <header className="text-center mb-20 animate-fade-in">
          <div className="flourish mb-8">
            <Feather className="w-6 h-6" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 davinci-glow tracking-wide">
            VAIDIK
          </h1>
          <p className="text-xl md:text-2xl text-davinci-sepia font-display tracking-widest">
            Apple Systems Developer & Maker
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-davinci-gold to-transparent mx-auto my-6" />
          <p className="text-davinci-sketch italic max-w-xl mx-auto font-body text-lg leading-relaxed">
            iOS, macOS, visionOS developer. Building products, exploring Rust, 
            and diving into consciousness research.
          </p>
        </header>

        {/* Connect */}
        <section className="mb-20">
          <h2 className="section-title">CONNECT</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="davinci-card px-5 py-3 flex items-center gap-3 hover:scale-105 transition-transform"
              >
                <span className="text-davinci-copper">{link.icon}</span>
                <span className="font-body">{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-20">
          <h2 className="section-title">PROJECTS</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                className="davinci-card p-6 hover:scale-105 transition-transform block text-center"
              >
                <h3 className="text-davinci-copper font-display font-semibold text-lg mb-2 tracking-wide">{project.name}</h3>
                <p className="text-sm text-davinci-sketch italic font-body">{project.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Da Vinci Blueprint */}
        <section className="mb-20">
          <div className="blueprint-container p-4 rounded-sm max-w-2xl mx-auto">
            <img 
              src={davinciHelicopter} 
              alt="Leonardo da Vinci's Aerial Screw - Flying Machine Blueprint" 
              className="w-full"
            />
          </div>
          <p className="text-center text-davinci-sketch/70 italic mt-4 font-body text-sm">
            "Learning never exhausts the mind." — Leonardo da Vinci
          </p>
        </section>

        {/* Interests */}
        <section className="mb-20">
          <h2 className="section-title">INTERESTS</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="davinci-tag"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section className="mb-20">
          <h2 className="section-title">OPEN SOURCE ACTIVITY</h2>
          <p className="text-center text-davinci-sketch italic mb-8 font-body">Recent contributions to open-source projects</p>
          <div className="space-y-4">
            {opensource.map((item, index) => (
              <div key={index} className="davinci-card p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <p className="text-davinci-gold text-xs font-display tracking-wider mb-1">{item.repo}</p>
                    <h3 className="text-davinci-sepia font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-davinci-sketch italic font-body">{item.desc}</p>
                  </div>
                  <span className="px-3 py-1 rounded-sm merged-badge shrink-0">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collaborate */}
        <section className="mb-20 text-center">
          <h2 className="section-title">LET'S COLLABORATE</h2>
          <div className="davinci-card p-10 max-w-2xl mx-auto">
            <p className="text-lg mb-8 text-davinci-sketch italic font-body leading-relaxed">
              Building the future, one project at a time. 
              Open to collaboration on iOS/macOS projects, Rust development, 
              and innovative ideas.
            </p>
            <a
              href="mailto:vaidik50000@gmail.com"
              className="inline-block px-8 py-3 davinci-button rounded-sm font-semibold tracking-widest text-sm"
            >
              GET IN TOUCH
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-davinci-sketch/60 text-sm py-8 border-t border-davinci-sepia/20">
          <div className="flourish mb-4">✦</div>
          <p className="font-body italic">© 2024 Vaidik. Built with passion.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;