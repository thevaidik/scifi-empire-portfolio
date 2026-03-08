import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen } from "lucide-react";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-neutral-800 text-neutral-300" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif' }}>
      <div className="max-w-2xl mx-auto px-6 py-16">

        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-white tracking-tight">Vaidik</h1>
          <p className="text-neutral-400 mt-1 font-light">Apple Systems Developer & Maker</p>
          <p className="text-sm text-neutral-500 mt-3 leading-relaxed">
            iOS, macOS, visionOS developer. Building products, exploring Rust, and diving into consciousness research.
          </p>
        </header>

        <button
          onClick={onEnterGame}
          className="flex items-center gap-2 text-sm text-neutral-400 border border-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-800 hover:text-white transition-colors mb-12"
        >
          <Gamepad2 className="w-4 h-4" />
          Explore this portfolio in 3D
        </button>

        <hr className="border-neutral-800 mb-8" />

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Apps</h2>
          {[
            { name: "NxtLap", desc: "Race Scores & Widgets", url: "https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034", appStore: true },
            { name: "Briefly", desc: "RSS Reader & News", url: "https://apps.apple.com/in/app/briefly-rss-reader-and-news/id6746949720", appStore: true },
            { name: "nxtlap.com", desc: "Motorsport news aggregator", url: "https://nxtlap.com", appStore: false },
          ].map((app) => (
            <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer"
              className="block py-2 group">
              <span className="text-white group-hover:underline">{app.name}</span>
              <span className="text-neutral-500 text-sm ml-2">— {app.desc}</span>
              {app.appStore && <span className="text-neutral-600 text-xs ml-2">↗ App Store</span>}
            </a>
          ))}
        </section>

        <hr className="border-neutral-800 mb-8" />

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Open Source</h2>
          <p className="text-xs text-neutral-500 mb-4">Recent merged contributions</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-left">
                  <th className="pb-2 font-medium text-neutral-400 pr-4">Repo</th>
                  <th className="pb-2 font-medium text-neutral-400 pr-4">Contribution</th>
                  <th className="pb-2 font-medium text-neutral-400 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { repo: "prav/prav-ios", title: "adding prav server and boarding" },
                  { repo: "prav/prav-ios", title: "autoDownloadSettings rewrite #1033" },
                  { repo: "monal-im/Monal", title: "Monal Onboarding #1083" },
                  { repo: "monal-im/Monal", title: "Rewrite privacy settings UI #993 #1021" },
                  { repo: "monal-im/Monal", title: "adding icons in privacy settings #1037" },
                ].map((item, i) => (
                  <tr key={i} className="border-b border-neutral-800/50">
                    <td className="py-2.5 pr-4 font-mono text-xs text-neutral-500">{item.repo}</td>
                    <td className="py-2.5 pr-4 text-neutral-300">{item.title}</td>
                    <td className="py-2.5 text-right"><span className="text-xs text-green-500/80 font-medium">MERGED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-neutral-800 mb-8" />

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Interests</h2>
          <p className="text-sm text-neutral-400">
            iOS Development · macOS Development · Rust Programming · Consciousness & Bicameral Mind · Space Exploration · Aviation & Drones
          </p>
        </section>

        <hr className="border-neutral-800 mb-8" />

        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Connect</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { name: "GitHub", url: "https://github.com/thevaidik", icon: <Github className="w-4 h-4" /> },
              { name: "Twitter", url: "https://twitter.com/thevaidik_", icon: <Twitter className="w-4 h-4" /> },
              { name: "YouTube", url: "https://www.youtube.com/@thevaidik_", icon: <Youtube className="w-4 h-4" /> },
              { name: "LinkedIn", url: "https://linkedin.com/in/vaidikxx", icon: <Linkedin className="w-4 h-4" /> },
              { name: "Medium", url: "https://medium.com/@thevaidik", icon: <BookOpen className="w-4 h-4" /> },
              { name: "Email", url: "mailto:vaidik50000@gmail.com", icon: <Mail className="w-4 h-4" /> },
            ].map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors">
                {link.icon} {link.name}
              </a>
            ))}
          </div>
        </section>

        <hr className="border-neutral-800 mb-8" />

        <p className="text-sm text-neutral-500">
          Open to collaboration. <a href="mailto:vaidik50000@gmail.com" className="text-neutral-300 underline hover:text-white">Get in touch →</a>
        </p>

      </div>
    </div>
  );
};

export default Portfolio;
