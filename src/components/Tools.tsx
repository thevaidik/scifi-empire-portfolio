
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

const toolsData = [
  {
    name: "React Forge",
    description: "Advanced component development environment",
    category: "Development",
  },
  {
    name: "Neural Design",
    description: "AI-powered design system generator",
    category: "Design",
  },
  {
    name: "Quantum Analytics",
    description: "Next-gen performance tracking",
    category: "Analytics",
  },
];

const Tools = () => {
  return (
    <section id="tools" className="min-h-screen py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tools & Technologies</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Exploring the cutting-edge tools that power my workflow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolsData.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 rounded-xl bg-scifi-dark/50 border border-scifi-light/10 backdrop-blur-lg hover:border-scifi-primary/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-scifi-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Wrench className="w-6 h-6 text-scifi-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{tool.name}</h3>
                <p className="text-white/70 mb-4">{tool.description}</p>
                
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-scifi-primary/20 text-scifi-primary">
                  {tool.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
