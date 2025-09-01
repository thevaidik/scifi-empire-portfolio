import { useEffect } from "react";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import Bento from "@/components/Bento";
import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen } from "lucide-react";

const Index = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const links = [
    {
      name: "GitHub",
      url: "https://github.com/thevaidik",
      icon: <Github className="h-4 w-4" />,
      description: "Code repositories"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/thevaidik_", 
      icon: <Twitter className="h-4 w-4" />,
      description: "Tech discussions"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@thevaidik_",
      icon: <Youtube className="h-4 w-4" />,
      description: "Tech tutorials"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vaidikxx",
      icon: <Linkedin className="h-4 w-4" />,
      description: "Professional network"
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Technical blogs"
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-4 w-4" />,
      description: "Direct communication"
    }
  ];

  return (
    <div className="text-foreground bg-background min-h-screen dark">
      <Hero />
      
      {/* Connect Section */}
      <section className="py-16 border-b border-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4 border-b-2 border-foreground inline-block pb-2">
              CONNECT
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-6">
              Professional networks and communication channels
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {links.map((link, index) => (
              <div key={index} className="border border-border bg-background p-4 text-center hover:bg-muted/50 transition-colors">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-8 h-8 flex items-center justify-center mb-2">
                    {link.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground hover-underline">
                    {link.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {link.description}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Projects />
      <OpenSource />
      <Interests />
      <Bento />
    </div>
  );
};

export default Index;