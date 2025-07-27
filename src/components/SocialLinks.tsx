import { Github, Twitter, Youtube, Linkedin, Mail, ExternalLink, BookOpen } from "lucide-react";

const SocialLinks = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/thevaidik",
      icon: <Github className="h-4 w-4 text-foreground" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/thevaidik_", 
      icon: <Twitter className="h-4 w-4 text-foreground" />,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@thevaidik_",
      icon: <Youtube className="h-4 w-4 text-foreground" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vaidikxx",
      icon: <Linkedin className="h-4 w-4 text-foreground" />,
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-4 w-4 text-foreground" />,
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-4 w-4 text-foreground" />,
    }
  ];

  return (
    <section id="social" className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2 text-foreground">Connect With Me</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Let's connect across different platforms
          </p>
          <div className="h-0.5 w-12 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                {link.icon}
              </div>
              
              <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                {link.name}
              </span>
              
              <ExternalLink className="w-2.5 h-2.5 text-muted-foreground group-hover:text-foreground transition-colors opacity-70" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;