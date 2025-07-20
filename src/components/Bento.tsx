
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const Bento = () => {
  return (
    <section id="bento" className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">Visit My Bento</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover more about me in a beautiful grid layout
          </p>
          <div className="h-1 w-20 bg-glass-border mx-auto mt-6 rounded-full shadow-sm"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <a
            href="https://bento.me/thevaidik"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full p-8 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-glass-hover hover:bg-glass-hover transition-all duration-500 text-center shadow-lg hover:shadow-xl hover:shadow-glass-glow relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-glass-reflection before:to-transparent before:pointer-events-none group-hover:animate-liquid-flow"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-glass-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <ExternalLink className="w-8 h-8 text-foreground" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
              Bento Grid
            </h3>
            <p className="text-muted-foreground mb-4">
              A visual story of my journey, skills, and interests
            </p>
            
            <div className="inline-flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
              Visit Bento
              <ExternalLink className="w-4 h-4 ml-2" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Bento;
