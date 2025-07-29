
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import Bento from "@/components/Bento";
import { motion } from "framer-motion";
import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const links = [
    {
      name: "GitHub",
      url: "https://github.com/thevaidik",
      icon: <Github className="h-5 w-5" />,
      description: "Code repositories"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/thevaidik_", 
      icon: <Twitter className="h-5 w-5" />,
      description: "Tech discussions"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@thevaidik_",
      icon: <Youtube className="h-5 w-5" />,
      description: "Tech tutorials"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vaidikxx",
      icon: <Linkedin className="h-5 w-5" />,
      description: "Professional network"
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-5 w-5" />,
      description: "Technical blogs"
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      description: "Direct communication"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-foreground overflow-hidden relative bg-gradient-to-br from-slate-600 via-gray-500/90 to-slate-700 min-h-screen"
    >
      <Navigation />
      <Hero />
      
      {/* Connect Section */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Connect With Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's connect across different platforms and build something amazing together
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
          >
            {links.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-glass-hover transition-all duration-300 group hover:shadow-lg">
                  <CardContent className="p-4">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center h-full"
                    >
                      <div className="w-10 h-10 rounded-full bg-glass-border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                        {link.icon}
                      </div>
                      <h3 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-tight">
                        {link.description}
                      </p>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <Interests />
      <Projects />
      <Bento />
    </motion.div>
  );
};

export default Index;
