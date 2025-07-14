
import { motion } from "framer-motion";
import { Github, Twitter, Youtube, Linkedin, Mail, ExternalLink, BookOpen } from "lucide-react";

const SocialLinks = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: <Github className="h-6 w-6 text-white" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername", 
      icon: <Twitter className="h-6 w-6 text-white" />,
    },
    {
      name: "YouTube",
      url: "https://youtube.com/yourchannel",
      icon: <Youtube className="h-6 w-6 text-white" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: <Linkedin className="h-6 w-6 text-white" />,
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-6 w-6 text-white" />,
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-6 w-6 text-white" />,
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
          <h2 className="text-4xl font-bold mb-4 text-white">Connect With Me</h2>
          <p className="text-[#B8B8BA] max-w-2xl mx-auto mb-6">
            Let's connect across different platforms
          </p>
          <div className="h-1 w-20 bg-[#A8A8AA]/50 mx-auto rounded-full"></div>
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
              className="group block p-6 rounded-xl bg-[#404042]/70 backdrop-blur-sm border border-[#777779]/30 hover:border-[#A8A8AA]/50 transition-all duration-300 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A8A8AA]/30 to-[#777779]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[#D0D0D2] transition-colors">
                {link.name}
              </h3>
              
              <div className="inline-flex items-center text-[#A8A8AA] group-hover:text-white transition-colors text-sm">
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
