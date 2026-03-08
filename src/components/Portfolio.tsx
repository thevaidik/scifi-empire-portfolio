import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Star, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";

const apps = [
  {
    name: "NxtLAP",
    subtitle: "Race Scores & Widgets",
    desc: "Track live results, standings, schedules, and news from 30+ racing series — F1, MotoGP, NASCAR, WEC, IMSA, IndyCar, Super GT, V8 Supercars, WRC, Formula E and more. Includes home screen widgets for quick race countdowns.",
    icon: "/images/nxtlap-icon.jpg",
    url: "https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034",
    rating: 5.0,
    ratingCount: 1,
    category: "Sports",
    price: "Free",
  },
  {
    name: "Briefly",
    subtitle: "RSS Reader & News",
    desc: "Your daily dose of curated RSS feeds and news, sorted by genre. Add custom feeds, browse by categories like Tech, Science, Business, and more. Clean design, dark mode, zero clutter.",
    icon: "/images/briefly-icon.jpg",
    url: "https://apps.apple.com/in/app/briefly-rss-reader-and-news/id6746949720",
    rating: 5.0,
    ratingCount: 3,
    category: "Magazines & Newspapers",
    price: "Free",
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-300" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif' }}>
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Profile Header */}
        <header className="mb-10 flex items-start gap-5">
          <img
            src="/lovable-uploads/6ce87993-46d4-4012-a197-3243da272842.png"
            alt="Vaidik profile photo"
            className="w-20 h-20 rounded-full object-cover border-2 border-neutral-700 flex-shrink-0"
          />
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">Vaidik</h1>
            <p className="text-neutral-400 mt-0.5 font-light">Apple Systems Developer & Maker</p>
            <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
              iOS, macOS & visionOS developer shipping native Swift apps. Passionate about clean architecture, SwiftUI, and the Apple ecosystem. Currently exploring Rust and consciousness research. Open to interesting open source work in the Swift ecosystem — if you're building something cool, let's talk.
            </p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <a href="mailto:founders@nxtlap.com"
                className="flex items-center gap-1.5 text-xs text-white font-medium hover:text-blue-300 transition-colors">
                <Mail className="w-3.5 h-3.5" /> founders@nxtlap.com
              </a>
              <span className="text-neutral-700 text-xs">·</span>
              <a href="mailto:vaidik50000@gmail.com"
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" /> vaidik50000@gmail.com
              </a>
              <a href="https://linkedin.com/in/vaidikxx" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a href="https://github.com/thevaidik" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
            </div>
          </div>
        </header>

        <hr className="border-neutral-800 mb-8" />

        {/* Apps Section */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-5">Apps</h2>
          <div className="space-y-4">
            {apps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl bg-neutral-800/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all group"
              >
                <img
                  src={app.icon}
                  alt={`${app.name} app icon`}
                  className="w-16 h-16 rounded-2xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium group-hover:underline">{app.name}</span>
                    <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                  </div>
                  <p className="text-sm text-neutral-400 mt-0.5">{app.subtitle}</p>
                  <p className="text-xs text-neutral-500 mt-1">{app.desc}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(app.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-600'}`}
                        />
                      ))}
                      <span className="text-xs text-neutral-500 ml-1">{app.rating} ({app.ratingCount})</span>
                    </div>
                    <span className="text-xs text-neutral-600">·</span>
                    <span className="text-xs text-neutral-500">{app.category}</span>
                    <span className="text-xs text-neutral-600">·</span>
                    <span className="text-xs text-green-500/80">{app.price}</span>
                  </div>
                </div>
              </a>
            ))}

            {/* nxtlap.com */}
            <a
              href="https://nxtlap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-neutral-800/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-neutral-700 flex items-center justify-center flex-shrink-0">
                <img src="/nxtlap-favicon.ico" alt="nxtlap.com" className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium group-hover:underline">nxtlap.com</span>
                  <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                </div>
                <p className="text-sm text-neutral-400 mt-0.5">Motorsport news aggregator</p>
                <p className="text-xs text-neutral-500 mt-1">Web platform for racing news & results</p>
              </div>
            </a>
          </div>
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

        {/* Recent Tweets */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Twitter className="w-4 h-4 text-blue-400" /> Recent Tweets
          </h2>
          <div className="space-y-3">
            {[
              {
                text: "Shipped NxtLAP 2.0 with home screen widgets for race countdowns. SwiftUI WidgetKit is magic ✨",
                date: "Mar 2025",
                url: "https://twitter.com/thevaidik_",
                likes: 12,
              },
              {
                text: "Just merged my first PR into Monal — rewrote their onboarding flow in SwiftUI. Open source is the best way to level up 🔥",
                date: "Feb 2025",
                url: "https://twitter.com/thevaidik_",
                likes: 24,
              },
              {
                text: "Briefly is now live on the App Store — a clean RSS reader with genre sorting. No accounts, no tracking, just news.",
                date: "Jan 2025",
                url: "https://twitter.com/thevaidik_",
                likes: 18,
              },
            ].map((tweet, i) => (
              <a
                key={i}
                href={tweet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-neutral-800/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-blue-400">@thevaidik_</span>
                  <span className="text-xs text-neutral-600">· {tweet.date}</span>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">{tweet.text}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-neutral-600">
                  <span>♥ {tweet.likes}</span>
                </div>
              </a>
            ))}
          </div>
          <a href="https://twitter.com/thevaidik_" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            View all tweets →
          </a>
        </section>

        <hr className="border-neutral-800 mb-8" />

        {/* Medium Blog Posts */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-green-400" /> Blog Posts
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Building a Motorsport App with SwiftUI & WidgetKit",
                excerpt: "How I built NxtLAP — from API design to home screen widgets for 30+ racing series.",
                date: "Mar 2025",
                url: "https://medium.com/@thevaidik",
                readTime: "6 min read",
              },
              {
                title: "Contributing to Open Source as a Solo Dev",
                excerpt: "Lessons learned from getting PRs merged into Monal and Prav — two privacy-first messaging apps.",
                date: "Feb 2025",
                url: "https://medium.com/@thevaidik",
                readTime: "4 min read",
              },
              {
                title: "Why I Built an RSS Reader in 2025",
                excerpt: "The case for owning your news feed — no algorithms, no tracking, just content you choose.",
                date: "Jan 2025",
                url: "https://medium.com/@thevaidik",
                readTime: "5 min read",
              },
            ].map((post, i) => (
              <a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl bg-neutral-800/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white font-medium group-hover:underline">{post.title}</span>
                  <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-neutral-400 flex-shrink-0 ml-2" />
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-neutral-600">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </a>
            ))}
          </div>
          <a href="https://medium.com/@thevaidik" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-xs text-green-400 hover:text-green-300 transition-colors">
            Read more on Medium →
          </a>
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
