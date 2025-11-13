import { Github, GitMerge } from "lucide-react";

const openSourcePRs = [
  {
    title: "adding prav server and boarding",
    repository: "prav/prav-ios",
    status: "merged",
    description: "Enhanced server integration and improved onboarding experience",
    link: "#",
  },
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
    <section className="py-20 border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-4">
          <div className="flex items-center justify-center gap-12 mb-2">
            <span className="text-xs text-muted-foreground font-mono tracking-wider">NOV 20, 2029</span>
            <span className="text-xs text-muted-foreground font-mono tracking-wider">PAGE 3</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground tracking-tight">
            OPEN SOURCE CONTRIBUTIONS
          </h2>
          
          <p className="text-sm text-muted-foreground text-center font-mono max-w-xl mx-auto">
            Contributing to the future of technology through collaborative development
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden max-w-full mx-auto space-y-4">
          {openSourcePRs.map((pr) => (
            <div key={pr.title} className="border border-border/50 p-4 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground text-sm flex-1">
                  {pr.title}
                </h3>
                <div className="flex items-center gap-1.5 ml-2">
                  <GitMerge className="w-3 h-3 text-primary" />
                  <span className="text-primary text-xs font-medium">MERGED</span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mb-3">{pr.description}</p>
              <div className="flex items-center gap-2">
                <Github className="w-3 h-3 text-muted-foreground" />
                <span className="text-foreground text-xs">{pr.repository}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-6xl mx-auto overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left pb-3 font-semibold text-foreground text-sm">Pull Request</th>
                <th className="text-left pb-3 font-semibold text-foreground text-sm">Repository</th>
                <th className="text-left pb-3 font-semibold text-foreground text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {openSourcePRs.map((pr) => (
                <tr key={pr.title} className="border-b border-border/30 hover:bg-card/30 transition-colors">
                  <td className="py-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {pr.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{pr.description}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground text-sm">{pr.repository}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <GitMerge className="w-4 h-4 text-primary" />
                      <span className="text-primary font-medium text-sm">MERGED</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;