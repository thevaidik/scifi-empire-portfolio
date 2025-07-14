
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
          <h2 className="text-4xl font-bold mb-4 text-white">Visit My Bento</h2>
          <p className="text-[#B8B8BA] max-w-2xl mx-auto">
            Discover more about me in a beautiful grid layout
          </p>
          <div className="h-1 w-20 bg-[#A8A8AA]/50 mx-auto mt-6 rounded-full"></div>
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
            className="group block w-full p-8 rounded-xl bg-[#404042]/70 backdrop-blur-sm border border-[#777779]/30 hover:border-[#A8A8AA]/50 transition-all duration-300 text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A8A8AA]/30 to-[#777779]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#D0D0D2] transition-colors">
              Bento Grid
            </h3>
            <p className="text-[#D0D0D2] mb-4">
              A visual story of my journey, skills, and interests
            </p>
            
            <div className="inline-flex items-center text-[#A8A8AA] group-hover:text-white transition-colors">
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
