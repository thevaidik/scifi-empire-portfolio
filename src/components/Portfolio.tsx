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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-300" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Helvetica Neue", sans-serif' }}>
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Profile Header */}
        <header className="mb-10">
          <h1 className="text-5xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}>Vaidik</h1>
          <div className="space-y-4 text-base text-neutral-400 leading-relaxed">
            <p>
              I am an independent iOS & macOS developer, with hardware interest in robotics and UAVs — and I massively value the Swift ecosystem. My open source work has been primarily in the XMPP Standards Foundation / Jabber and similar fully encrypted chat systems and protocols.
            </p>
            <p>
              I have worked on the <a href="https://monal-im.org" target="_blank" rel="noopener noreferrer" className="text-neutral-300 underline hover:text-white transition-colors">Monal</a> iOS client through the Google Summer of Code program, and have been actively contributing to <a href="https://prav.app" target="_blank" rel="noopener noreferrer" className="text-neutral-300 underline hover:text-white transition-colors">Prav — Private Messenger</a>.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
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
        </header>

        <hr className="border-neutral-800 mb-8" />

        {/* Google Summer of Code */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <img src="/images/gsoc-logo.png" alt="Google Summer of Code" className="w-10 h-10" />
            <h2 className="text-lg font-semibold text-white">Google Summer of Code 2024</h2>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed mb-3">
            Selected as a contributor for GSoC 2024 under the <strong className="text-neutral-300">XMPP Standards Foundation</strong>. Worked on improving the Monal iOS XMPP client — rewriting onboarding flows, privacy settings UI, and contributing core protocol features.
          </p>
          <a
            href="https://summerofcode.withgoogle.com/archive/2024/organizations/xmpp-standards-foundation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View on GSoC Archive <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>

        <hr className="border-neutral-800 mb-8" />

        {/* Apps Section */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-lg font-semibold text-white">My Apps</h2>
            <img src="/images/app-store-badge.svg" alt="Download on the App Store" className="h-8" />
          </div>
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

        {/* Recent Tweets - Embedded Timeline */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Twitter className="w-4 h-4 text-blue-400" /> Recent Tweets
          </h2>
          <div className="rounded-xl overflow-hidden border border-neutral-800">
            <a
              className="twitter-timeline"
              data-theme="dark"
              data-height="400"
              data-chrome="noheader nofooter noborders transparent"
              href="https://twitter.com/thevaidik_"
            >
              Loading tweets...
            </a>
          </div>
          <a href="https://twitter.com/thevaidik_" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            Follow @thevaidik_ →
          </a>
        </section>

        <hr className="border-neutral-800 mb-8" />

        {/* Medium Blog Posts - Real */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-green-400" /> Blog Posts
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Google Summer Of Code (GSoC) — My experience #2 — midterm evaluations @ XMPP standards foundation",
                date: "Jul 31, 2024",
                url: "https://thevaidik.medium.com/google-summer-of-code-gsoc-my-experience-2-midterm-evaluations-xmpp-standards-foundation-3be8b27dc653",
                claps: 52,
              },
              {
                title: "Google Summer Of Code (GSoC) — My experience #1 @ XMPP standards foundation",
                date: "Jun 25, 2024",
                url: "https://thevaidik.medium.com/google-summer-of-code-gsoc-my-experience-1-xmpp-standards-foundation-da781ac95560",
                claps: 52,
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
                <div className="flex items-center gap-2 mt-2 text-xs text-neutral-600">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>👏 {post.claps}</span>
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
