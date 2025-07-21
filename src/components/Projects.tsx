
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: "Briefly - AI News",
    description: "News Aggregator written in Swift and Go.",
    image: "https://drive.google.com/file/d/1oHDTnCFD6HEfEy35yyv8aDr4mzBqi0-O/view?usp=share_link",
    tags: ["React", "Three.js", "GSAP"],
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
];

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-20 bg-transparent relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my latest works that push the boundaries of web development
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-accent to-primary h-full opacity-60"></div>
          
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg shadow-primary/30 z-10"></div>
              
              {/* Project Card */}
              <div className={`w-full max-w-md ${index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"}`}>
                <ProjectCard {...project} compact={true} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
