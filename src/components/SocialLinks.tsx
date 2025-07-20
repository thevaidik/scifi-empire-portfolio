
import { motion } from "framer-motion";
import { Github, Twitter, Youtube, Linkedin, Mail, ExternalLink, BookOpen } from "lucide-react";

const SocialLinks = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/thevaidik",
      icon: <Github className="h-6 w-6 text-foreground" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/thevaidik_", 
      icon: <Twitter className="h-6 w-6 text-foreground" />,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@thevaidik_",
      icon: <Youtube className="h-6 w-6 text-foreground" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vaidikxx",
      icon: <Linkedin className="h-6 w-6 text-foreground" />,
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-6 w-6 text-foreground" />,
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-6 w-6 text-foreground" />,
    }
  ];

  return (
    <section id="social" className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">Connect With Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Let's connect across different platforms
          </p>
          <div className="h-1 w-20 bg-glass-border mx-auto rounded-full shadow-sm"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto"
        >
          {links.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group block p-6 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-glass-hover hover:bg-glass-hover transition-all duration-500 text-center shadow-lg hover:shadow-xl hover:shadow-glass-glow relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-glass-reflection before:to-transparent before:pointer-events-none group-hover:animate-liquid-flow"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-glass-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {link.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                {link.name}
              </h3>
              
              <div className="inline-flex items-center text-muted-foreground group-hover:text-foreground transition-colors text-sm">
                Connect
                <ExternalLink className="w-3 h-3 ml-1" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialLinks;
