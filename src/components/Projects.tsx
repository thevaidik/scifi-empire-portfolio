
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: "Quantum Portfolio",
    description: "A revolutionary way to showcase creative work with quantum-inspired animations.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    tags: ["React", "Three.js", "GSAP"],
    link: "https://apps.apple.com/app/quantum-portfolio/id123456789",
  },
  {
    title: "Neural Network Blog",
    description: "AI-powered blog platform with dynamic content generation.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    tags: ["Next.js", "TailwindCSS", "AI"],
    link: "https://apps.apple.com/app/neural-network-blog/id123456790",
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Work</h2>
          <p className="text-[#B8B8BA] max-w-2xl mx-auto">
            Explore my latest works that push the boundaries of web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
