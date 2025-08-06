
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: "Briefly - RSS feeds and News",
    description: "AI-powered RSS reader and news aggregator that curates and summarizes content from multiple sources.",
    image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a",
  },
  {
    title: "XMPP Open Source blog",
    description: "Technical blog about XMPP protocol development and open source contributions.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/95/XMPP_logo.svg",
    link: "https://medium.com/@thevaidik/google-summer-of-code-gsoc-my-experience-1-xmpp-standards-foundation-da781ac95560",
  },
  {
    title: "LogoGuess",
    description: "Interactive game where users test their knowledge by guessing brand logos from various industries.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
  },
  {
    title: "Swift Robotics",
    description: "Embedded systems programming with Swift for robotics applications and hardware control.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    link: "https://github.com/swift-robotics",
  },
  {
    title: "MotorSports.ai",
    description: "AI-powered app to track race scores, analyze performance, and discover amateur racing events worldwide.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
  },
  {
    title: "Aviation Tracker",
    description: "Real-time flight tracking and aviation data analysis with comprehensive route information.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
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
