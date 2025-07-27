import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ConnectCard = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/thevaidik",
      icon: <Github className="h-4 w-4" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/thevaidik_", 
      icon: <Twitter className="h-4 w-4" />,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@thevaidik_",
      icon: <Youtube className="h-4 w-4" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vaidikxx",
      icon: <Linkedin className="h-4 w-4" />,
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-4 w-4" />,
    }
  ];

  return (
    <section id="connect" className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-foreground">Connect With Me</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Let's connect across different platforms
          </p>
          <div className="h-0.5 w-12 bg-primary mx-auto rounded-full"></div>
        </div>

        <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ConnectCard;