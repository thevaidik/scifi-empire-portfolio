
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

        {/* Table Format - 2 Rows */}
        <div className="max-w-6xl mx-auto">
          {/* First Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          >
            {projectsData.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <ProjectCard {...project} compact={true} />
              </motion.div>
            ))}
          </motion.div>

          {/* Second Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            {projectsData.slice(2, 3).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group w-full max-w-md"
              >
                <ProjectCard {...project} compact={true} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
