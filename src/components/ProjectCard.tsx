
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const ProjectCard = ({ title, description, image, tags, link }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-glass-hover hover:bg-glass-hover transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-glass-glow before:absolute before:inset-0 before:bg-gradient-to-br before:from-glass-reflection before:to-transparent before:pointer-events-none hover:before:animate-glass-shimmer"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-glass-border text-foreground backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          Visit App Store
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
