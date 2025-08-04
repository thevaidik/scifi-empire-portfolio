import { Github, GitMerge } from "lucide-react";

const openSourcePRs = [
  {
    title: "Add TypeScript support to React Router",
    repository: "remix-run/react-router",
    status: "merged",
    description: "Enhanced type safety and developer experience",
    link: "#",
  },
  {
    title: "Optimize bundle size in Framer Motion",
    repository: "framer/motion",
    status: "merged", 
    description: "Reduced bundle size by 15% through tree-shaking improvements",
    link: "#",
  },
  {
    title: "Fix accessibility issues in Radix UI",
    repository: "radix-ui/primitives",
    status: "merged",
    description: "Improved keyboard navigation and screen reader support",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {openSourcePRs.map((pr, index) => (
            <a
              key={pr.title}
              href={pr.link}
              className="group"
            >
              <div className="p-6 rounded-xl bg-[#454547]/70 backdrop-blur-lg border border-[#777779]/30 hover:border-[#A8A8AA]/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Github className="w-6 h-6 text-[#A8A8AA]" />
                  <div className="flex items-center space-x-2">
                    <GitMerge className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Merged</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{pr.title}</h3>
                <p className="text-[#B8B8BA] text-sm mb-3">{pr.repository}</p>
                <p className="text-[#D0D0D2]">{pr.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;