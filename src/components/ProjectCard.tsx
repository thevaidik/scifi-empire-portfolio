
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  compact?: boolean;
}

const ProjectCard = ({ title, description, image, link, compact = false }: ProjectCardProps) => {
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="group relative overflow-hidden rounded-xl bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-glass-hover hover:bg-glass-hover transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-glass-glow"
      >
        <div className="flex p-4 gap-4">
          {/* Compact Image */}
          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1 text-foreground truncate">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
            
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View Project
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

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
        
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            View Project
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
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
