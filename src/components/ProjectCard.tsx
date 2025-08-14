
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  compact?: boolean;
}

const ProjectCard = ({ title, description, image, tags, link, compact = false }: ProjectCardProps) => {
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="group relative overflow-hidden rounded-xl hud-element hover:bg-glass-hover transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-glass-glow animate-hud-flicker"
      >
        <div className="flex p-4 gap-4">
          {/* HUD Corner Markers */}
          <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-primary/40"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-r border-t border-primary/40"></div>
          
          {/* Compact Image */}
          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-primary/20">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold mb-1 text-foreground truncate font-retro tracking-wider">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 font-mono">&gt; {description}</p>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-glass-border text-foreground backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-glass-border text-muted-foreground backdrop-blur-sm">
                  +{tags.length - 2}
                </span>
              )}
            </div>
            
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                view
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
      className="group relative overflow-hidden rounded-2xl hud-element hover:bg-glass-hover transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-glass-glow before:absolute before:inset-0 before:bg-gradient-to-br before:from-glass-reflection before:to-transparent before:pointer-events-none hover:before:animate-glass-shimmer animate-hud-flicker"
    >
      {/* HUD Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-primary/60 z-10"></div>
      <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-primary/60 z-10"></div>
      
      <div className="aspect-video overflow-hidden border-b border-primary/20">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground font-retro tracking-wider">{title}</h3>
        <p className="text-muted-foreground mb-4 font-mono">&gt; {description}</p>
        
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
        
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            view
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
