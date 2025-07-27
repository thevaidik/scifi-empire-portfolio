import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";

const Connect = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/thevaidik",
      icon: <Github className="h-6 w-6" />,
      description: "Code repositories and open source projects"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/thevaidik_", 
      icon: <Twitter className="h-6 w-6" />,
      description: "Thoughts, updates, and tech discussions"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@thevaidik_",
      icon: <Youtube className="h-6 w-6" />,
      description: "Tech tutorials and project walkthroughs"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vaidikxx",
      icon: <Linkedin className="h-6 w-6" />,
      description: "Professional network and career updates"
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-6 w-6" />,
      description: "In-depth articles and technical blogs"
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-6 w-6" />,
      description: "Direct communication for collaborations"
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
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Connect With Me
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Let's connect across different platforms and build something amazing together
          </p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {links.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg">
                <CardContent className="p-6">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-center h-full"
                  >
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 group-hover:bg-primary/10">
                      {link.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {link.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Connect;