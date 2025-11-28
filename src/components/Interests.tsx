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
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-3 text-foreground">
        Technical Interests
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Areas of focus and exploration
      </p>

      <div className="space-y-4">
        {interestData.map((interest) => (
          <div key={interest.title} className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <interest.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-foreground mb-1">{interest.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{interest.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interests;