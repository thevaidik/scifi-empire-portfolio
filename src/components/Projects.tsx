
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: "Briefly - AI News",
    description: "News Aggregator written in Swift and Go.",
    image: "https://drive.google.com/file/d/1oHDTnCFD6HEfEy35yyv8aDr4mzBqi0-O/view?usp=share_link",
    tags: ["Swift", "Go", "iOS"],
    link: "https://apps.apple.com/app/quantum-portfolio/id123456789",
  },
  {
    title: "XMPP Open Source blog",
    description: "AI-powered blog platform with dynamic content generation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/95/XMPP_logo.svg",
    tags: ["Next.js", "TailwindCSS", "AI"],
    link: "https://medium.com/@thevaidik/google-summer-of-code-gsoc-my-experience-1-xmpp-standards-foundation-da781ac95560",
  },
  {
    title: "Cyberpunk Dashboard",
    description: "Futuristic dashboard interface with real-time data visualization.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["Vue", "D3.js", "Firebase"],
    link: "https://apps.apple.com/app/cyberpunk-dashboard/id123456791",
  },
  {
    title: "Swift Robotics",
    description: "Embedded systems programming with Swift for robotics.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    tags: ["Swift", "Embedded", "Robotics"],
    link: "https://github.com/swift-robotics",
  },
  {
    title: "Consciousness AI",
    description: "Exploring artificial consciousness and cognitive architectures.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
    tags: ["AI", "Research", "Python"],
    link: "https://consciousness-ai.demo",
  },
  {
    title: "Aviation Tracker",
    description: "Real-time flight tracking and aviation data analysis.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    tags: ["React", "APIs", "Data"],
    link: "https://aviation-tracker.demo",
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
