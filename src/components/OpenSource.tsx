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
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-3 text-foreground">
        Open Source Activity
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Recent contributions to open-source projects
      </p>

      <div className="space-y-3">
        {openSourcePRs.map((pr) => (
          <div key={pr.title} className="p-4 rounded-lg hover:bg-accent/50 transition-colors border border-border">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-foreground text-sm flex-1">
                {pr.title}
              </h3>
              <div className="flex items-center gap-1.5 ml-2">
                <GitMerge className="w-3 h-3 text-primary" />
                <span className="text-primary text-xs font-medium">MERGED</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs mb-2">{pr.description}</p>
            <div className="flex items-center gap-2">
              <Github className="w-3 h-3 text-muted-foreground" />
              <span className="text-foreground text-xs">{pr.repository}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenSource;