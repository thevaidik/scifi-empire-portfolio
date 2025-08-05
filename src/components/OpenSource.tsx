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
    <section className="py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Open Source Contributions</h2>
          <p className="text-[#B8B8BA] max-w-2xl mx-auto">
            Contributing to the future of technology through open collaboration
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-glass-bg backdrop-blur-xl border border-glass-border rounded-xl">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="text-left p-6 text-foreground font-semibold">Pull Request</th>
                <th className="text-left p-6 text-foreground font-semibold">Organization</th>
                <th className="text-left p-6 text-foreground font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {openSourcePRs.map((pr, index) => (
                <tr key={pr.title} className="border-b border-glass-border last:border-b-0">
                  <td className="p-6">
                    <div>
                      <h3 className="text-foreground font-medium mb-1">
                        {pr.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{pr.description}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2">
                      <Github className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{pr.repository}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2">
                      <GitMerge className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">Merged</span>
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