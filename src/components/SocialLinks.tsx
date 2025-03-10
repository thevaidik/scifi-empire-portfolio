
import { motion } from "framer-motion";
import { Github, Twitter, Youtube, Globe } from "lucide-react";

const SocialLinks = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://github.com/yourusername",
      icon: <Github className="h-8 w-8" />,
      color: "border-[#6e5494]",
      hoverColor: "group-hover:bg-[#6e5494]",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      icon: <Twitter className="h-8 w-8" />,
      color: "border-[#1DA1F2]",
      hoverColor: "group-hover:bg-[#1DA1F2]",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/yourchannel",
      icon: <Youtube className="h-8 w-8" />,
      color: "border-[#FF0000]",
      hoverColor: "group-hover:bg-[#FF0000]",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: <Globe className="h-8 w-8" />,
      color: "border-[#0077B5]",
      hoverColor: "group-hover:bg-[#0077B5]",
    }
  ];

  return (
    <section id="social" className="py-24 bg-scifi-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Connect With Me</h2>
          <div className="h-1 w-20 bg-scifi-primary/50 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
              className={`group flex flex-col items-center justify-center p-8 rounded-xl bg-scifi-dark/80 backdrop-blur-sm border-2 ${link.color} hover:border-transparent transition-all duration-300 relative overflow-hidden`}
            >
              <div className={`absolute inset-0 -z-10 opacity-0 ${link.hoverColor} transition-all duration-500 group-hover:opacity-20`}></div>
              
              <div className="p-4 rounded-full bg-scifi-dark/50 border border-scifi-primary/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                {link.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white">{link.name}</h3>
              <div className="mt-2 h-0.5 w-0 bg-scifi-primary/50 group-hover:w-16 transition-all duration-300"></div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialLinks;
