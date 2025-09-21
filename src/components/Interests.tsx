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
    <section className="py-16 neon-border-secondary border-b-2 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4 neon-border inline-block pb-2 px-4 text-glow">
            FIELDS OF INTEREST
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto mt-6">
            Exploring the intersection of consciousness, technology, and artificial intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {interestData.map((interest, index) => (
            <div key={interest.title} className={`p-6 neon-border bg-card hover:neon-glow-secondary transition-all duration-300 group ${index >= 3 ? 'md:col-span-1 lg:col-span-1' : ''}`}>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 neon-border-secondary flex items-center justify-center flex-shrink-0 mt-1 group-hover:text-glow">
                  <interest.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-glow">{interest.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{interest.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;