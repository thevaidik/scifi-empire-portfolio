
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: "Briefly - RSS feeds and News",
    description: "AI-powered RSS reader and news aggregator that curates and summarizes content from multiple sources.",
    image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a",
    tags: ["Swift", "SwiftUI", "iOS", "AI"],
    link: "https://apps.apple.com/app/briefly/id123456789",
  },
  {
    title: "OneCorpApps",
    description: "Founder of OneCorpApps - creating connected experiences in mobile applications with seamless integration.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    tags: ["Swift", "iOS", "Startup", "Product"],
    link: "https://onecorpapps.com",
  },
  {
    title: "LogoGuess",
    description: "Interactive game where users test their knowledge by guessing brand logos from various industries.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
    tags: ["SwiftUI", "Game", "iOS", "UI/UX"],
    link: "https://apps.apple.com/app/logoguess/id123456790",
  },
  {
    title: "Swift Robotics",
    description: "Embedded systems programming with Swift for robotics applications and hardware control.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    tags: ["Swift", "Embedded", "Robotics", "Hardware"],
    link: "https://github.com/swift-robotics",
  },
  {
    title: "MotorSports.ai",
    description: "AI-powered app to track race scores, analyze performance, and discover amateur racing events worldwide.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    tags: ["SwiftUI", "AI", "Sports", "iOS"],
    link: "https://apps.apple.com/app/motorsports-ai/id123456791",
  },
  {
    title: "Aviation Tracker",
    description: "Real-time flight tracking and aviation data analysis with comprehensive route information.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    tags: ["Swift", "APIs", "Data", "Real-time"],
    link: "https://apps.apple.com/app/aviation-tracker/id123456792",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-12 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my latest works that push the boundaries of technology
          </p>
        </motion.div>

        {/* Table Format - 3x2 Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - 3 projects */}
            <div className="space-y-4">
              {projectsData.slice(0, 3).map((project) => (
                <div key={project.title} className="group">
                  <ProjectCard {...project} compact={true} />
                </div>
              ))}
            </div>

            {/* Right Column - 3 projects */}
            <div className="space-y-4">
              {projectsData.slice(3, 6).map((project) => (
                <div key={project.title} className="group">
                  <ProjectCard {...project} compact={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
