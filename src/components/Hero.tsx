
import { motion } from "framer-motion";

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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 bg-glass-bg backdrop-blur-xl rounded-2xl p-6 border border-glass-border shadow-2xl shadow-glass-glow relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-glass-reflection before:to-transparent before:pointer-events-none animate-liquid-flow"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Hey, Vaidik here
            <div className="text-2xl md:text-3xl font-light mt-4 text-muted-foreground">
              "Perception is reality"
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Founder and Apple systems (iOS, visionOS dev) | Feel free to reach out for noble collaborations, or just to say hi!
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-foreground text-sm font-medium bg-glass-bg backdrop-blur-xl px-6 py-3 rounded-full border border-glass-border shadow-lg"
        >
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
