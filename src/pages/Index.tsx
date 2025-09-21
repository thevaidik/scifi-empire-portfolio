import { useEffect } from "react";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import Bento from "@/components/Bento";
import ThemeToggle from "@/components/ThemeToggle";
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
    <div className="text-foreground bg-background min-h-screen">
      <ThemeToggle />
      <Hero />
      
      {/* Connect Section - Newspaper Style */}
      <section className="py-16 border-b-2 border-foreground">
        <div className="container mx-auto px-4">
          {/* Newspaper Header */}
          <div className="text-center mb-8">
            <div className="border-t-2 border-b-2 border-foreground py-3 mb-6">
              <h2 className="text-3xl font-headline font-bold text-foreground tracking-wider">
                CORRESPONDENCE & NETWORKS
              </h2>
              <div className="flex items-center justify-center mt-2">
                <div className="border-t border-foreground w-16"></div>
                <span className="mx-4 text-xs font-mono text-muted-foreground">EST. 2030</span>
                <div className="border-t border-foreground w-16"></div>
              </div>
            </div>
            <p className="font-serif text-sm italic text-muted-foreground">
              "Maintaining professional connections across digital platforms for the modern era"
            </p>
          </div>

          {/* Newspaper-style grid layout */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {links.map((link, index) => (
                <article key={index} className="border-b border-foreground pb-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 border border-foreground flex items-center justify-center bg-muted/20 flex-shrink-0">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <h3 className="font-headline font-bold text-lg text-foreground group-hover:underline mb-1">
                          {link.name.toUpperCase()}
                        </h3>
                        <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                          {link.description}. Access professional updates, technical discussions, and collaborative opportunities.
                        </p>
                        <div className="text-xs font-mono text-muted-foreground mt-2 opacity-70">
                          ■ ACTIVE DAILY ■
                        </div>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Newspaper footer */}
          <div className="text-center mt-8 pt-6 border-t border-foreground">
            <p className="text-xs font-mono text-muted-foreground">
              All correspondence channels verified and maintained • Updated regularly for optimal connectivity
            </p>
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