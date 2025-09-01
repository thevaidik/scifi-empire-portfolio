import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
      <Card className="h-full bg-card border border-border hover:bg-muted/50 transition-colors duration-200">
        <div className="flex p-4 gap-3">
          <div className="flex-shrink-0 w-16 h-16 overflow-hidden border border-border">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground mb-1 hover-underline line-clamp-1">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </h3>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs px-1 py-0 h-4 border-border text-muted-foreground bg-muted"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-1 py-0 h-4 border-border text-muted-foreground bg-muted">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-card border border-border hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden border-b border-border">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3 hover-underline">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-border text-foreground bg-muted hover:bg-muted/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;