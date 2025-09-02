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
    <section className="py-16 border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground font-mono">NOVEMBER 20, 2029</p>
            <h2 className="text-4xl font-bold text-foreground border-b-2 border-foreground inline-block pb-2">
              OPEN SOURCE CONTRIBUTIONS
            </h2>
            <p className="text-sm text-muted-foreground font-mono">PAGE 3</p>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
            Contributing to the future of technology through collaborative development
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden max-w-full mx-auto">
          {openSourcePRs.map((pr, index) => (
            <div key={pr.title} className="border border-border mb-4 p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground text-sm flex-1">
                  {pr.title}
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  <GitMerge className="w-3 h-3 text-green-600" />
                  <span className="text-green-600 text-xs font-semibold">MERGED</span>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mb-2">{pr.description}</p>
              <div className="flex items-center space-x-2">
                <Github className="w-3 h-3 text-muted-foreground" />
                <span className="text-foreground text-xs">{pr.repository}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-6xl mx-auto overflow-x-auto">
          <table className="newspaper-table min-w-full">
            <thead>
              <tr>
                <th className="text-left">Pull Request</th>
                <th className="text-left">Repository</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {openSourcePRs.map((pr, index) => (
                <tr key={pr.title}>
                  <td>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {pr.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{pr.description}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Github className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{pr.repository}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <GitMerge className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-semibold">MERGED</span>
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