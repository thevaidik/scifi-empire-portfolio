
import { motion } from "framer-motion";
import { Code, Brain, Cpu, Plane } from "lucide-react";

const interestData = [
  {
    title: "iOS Development",
    description: "Creating elegant and efficient mobile experiences with Swift and SwiftUI",
    icon: Code,
  },
  {
    title: "Consciousness & Bicameral Mind",
    description: "Exploring the nature of consciousness and Julian Jaynes' theories",
    icon: Brain,
  },
  {
    title: "Robotics with Swift Embedded",
    description: "Building intelligent robotic systems using Swift for embedded systems",
    icon: Cpu,
  },
  {
    title: "Aviation",
    description: "Passion for flight and aerospace technology",
    icon: Plane,
  },
  {
    title: "Human Evolution",
    description: "Understanding our past to shape our future",
    icon: Brain,
  },
];

const Interests = () => {
  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-transparent to-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fields of Interest</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of consciousness, technology, and artificial intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {interestData.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <div className="p-8 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-glass-hover hover:bg-glass-hover transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-glass-glow relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-glass-reflection before:to-transparent before:pointer-events-none group-hover:animate-liquid-flow">
                <div className="w-16 h-16 rounded-full bg-glass-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <interest.icon className="w-8 h-8 text-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">{interest.title}</h3>
                <p className="text-muted-foreground">{interest.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
