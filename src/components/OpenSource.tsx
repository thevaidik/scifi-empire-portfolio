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
          <h2 className="text-4xl font-bold text-foreground mb-4 border-b-2 border-foreground inline-block pb-2">
            OPEN SOURCE CONTRIBUTIONS
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
            Contributing to the future of technology through collaborative development
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <table className="newspaper-table">
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
                      <GitMerge className="w-4 h-4 text-accent" />
                      <span className="status-merged">MERGED</span>
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