
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section id="about" className="py-20 flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, rotateX: -15 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="space-y-4 bg-glass-bg backdrop-blur-xl rounded-2xl p-6 border border-glass-border shadow-2xl shadow-glass-glow relative overflow-hidden"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-foreground"
          >
            Hey, Vaidik here
          </motion.h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Founder and Apple systems (iOS, macOS, visionOS dev)
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <ChevronDown className="w-6 h-6 text-foreground/60" />
          <ChevronDown className="w-6 h-6 text-foreground/40 -mt-3" />
        </motion.div>
        
        <div className="flex space-x-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-foreground/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
