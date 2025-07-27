import { motion } from "framer-motion";
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
    <section id="social" className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-3 text-foreground">Connect With Me</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-4">
            Let's connect across different platforms
          </p>
          <div className="h-0.5 w-16 bg-glass-border mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
        >
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-glass-hover hover:bg-glass-hover transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-glass-glow relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-glass-reflection before:to-transparent before:pointer-events-none"
            >
              <div className="w-8 h-8 rounded-lg bg-glass-border flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                {link.icon}
              </div>
              
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {link.name}
              </span>
              
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialLinks;