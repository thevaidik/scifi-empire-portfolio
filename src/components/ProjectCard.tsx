interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  compact?: boolean;
}

const ProjectCard = ({ title, description, image, tags, link, compact = false }: ProjectCardProps) => {
  if (compact) {
    return (
      <div className="h-full bg-card p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-16 h-16 overflow-hidden border border-border/50">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">
              <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                {title}
              </a>
            </h3>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 border border-border/50 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-[10px] px-1.5 py-0.5 border border-border/50 text-muted-foreground">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card border border-border/50">
      <div className="aspect-video overflow-hidden border-b border-border/50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            {title}
          </a>
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 border border-border/50 text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;