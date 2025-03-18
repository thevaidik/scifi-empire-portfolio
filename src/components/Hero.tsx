
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
          className="space-y-6 bg-[#333335]/60 backdrop-blur-lg rounded-xl p-8 border border-[#777779]/30 shadow-lg"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Hey, Vaidik here
            <div className="text-2xl md:text-3xl font-light mt-4 text-[#D8D8DA]">
              "perception is reality"
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-[#E8E8EA] max-w-2xl mx-auto">
            Normally I do development for Apple platforms (iOS, macOS, etc)
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-sm font-medium bg-[#333335]/40 backdrop-blur-md px-4 py-2 rounded-full"
        >
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
