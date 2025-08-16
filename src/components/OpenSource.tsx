import { Github, GitMerge } from "lucide-react";

const openSourcePRs = [
  {
    title: "autoDownloadSettings rewrite #1033",
    repository: "monal-im/Monal",
    status: "merged",
    description: "SwiftUI rewrite of autoDownloadSettings for improved user experience",
    link: "#",
  },
  {
    title: "Monal Onboarding #1083",
    repository: "monal-im/Monal",
    status: "merged", 
    description: "Adding initial onboarding flow to improve new user experience",
    link: "#",
  },
  {
    title: "[Feature]: Rewrite the privacy settings UI using SwiftUI #993 #1021",
    repository: "monal-im/Monal",
    status: "merged",
    description: "Complete SwiftUI rewrite of privacy settings interface",
    link: "#",
  },
  {
    title: "adding icons in privacy settings #1037",
    repository: "monal-im/Monal",
    status: "merged",
    description: "Enhanced privacy settings with intuitive icons for better UX",
    link: "#",
  },
];

const OpenSource = () => {
  return (
    <section className="py-20 bg-transparent relative terminal-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-retro tracking-wider retro-text">
            [OPEN_SOURCE.LOG]
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-mono">
            &gt; Contributing to the future of technology through open collaboration
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="hud-element bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl relative overflow-hidden animate-hud-flicker">
            {/* HUD Corner Brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-primary/60 z-10"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-primary/60 z-10"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-primary/60 z-10"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-primary/60 z-10"></div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="text-left p-6 text-foreground font-semibold font-retro tracking-wide">[PULL_REQUEST]</th>
                    <th className="text-left p-6 text-foreground font-semibold font-retro tracking-wide">[ORGANIZATION]</th>
                    <th className="text-left p-6 text-foreground font-semibold font-retro tracking-wide">[STATUS]</th>
                  </tr>
                </thead>
                <tbody>
                  {openSourcePRs.map((pr, index) => (
                    <tr key={pr.title} className="border-b border-glass-border last:border-b-0 hover:bg-glass-hover transition-colors group">
                      <td className="p-6">
                        <div>
                          <h3 className="text-foreground font-medium mb-1 font-mono group-hover:text-primary transition-colors">
                            &gt; {pr.title}
                          </h3>
                          <p className="text-muted-foreground text-sm font-mono opacity-80">{pr.description}</p>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <Github className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground font-mono">{pr.repository}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center space-x-2">
                          <GitMerge className="w-4 h-4 text-accent" />
                          <span className="text-accent font-medium font-mono">[MERGED]</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;