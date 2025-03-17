
import { motion } from "framer-motion";
import { Github } from "lucide-react";

const openSourceProjects = [
  {
    title: "AI Research Framework",
    description: "An open-source framework for consciousness research in artificial intelligence",
    stars: 234,
    forks: 45,
    link: "#",
  },
  {
    title: "SwiftBot Core",
    description: "Robotics control system written in Swift for embedded systems",
    stars: 567,
    forks: 123,
    link: "#",
  },
];

const OpenSource = () => {
  return (
    <section className="py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Open Source Work</h2>
          <p className="text-[#B8B8BA] max-w-2xl mx-auto">
            Contributing to the future of technology through open collaboration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {openSourceProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="p-6 rounded-xl bg-[#454547]/70 backdrop-blur-lg border border-[#777779]/30 hover:border-[#A8A8AA]/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Github className="w-6 h-6 text-[#A8A8AA]" />
                  <div className="flex items-center space-x-4">
                    <span className="text-[#B8B8BA]">
                      ★ {project.stars}
                    </span>
                    <span className="text-[#B8B8BA]">
                      ⑂ {project.forks}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-[#D0D0D2]">{project.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
