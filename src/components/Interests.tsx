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
    <section className="py-20 border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground tracking-tight">
            FIELDS OF INTEREST
          </h2>
          <p className="text-sm text-muted-foreground text-center max-w-xl mx-auto">
            Exploring the intersection of consciousness, technology, and artificial intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {interestData.map((interest) => (
            <div key={interest.title} className="border border-border/50 p-6 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-border/50 flex items-center justify-center flex-shrink-0">
                  <interest.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-2">{interest.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{interest.description}</p>
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