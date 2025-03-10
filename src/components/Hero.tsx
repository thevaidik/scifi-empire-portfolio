
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="about" className="py-20 flex items-center justify-center relative overflow-hidden">
      {/* Grid Earth Pattern Background */}
      <div className="absolute inset-0 bg-scifi-dark">
        <div className="absolute inset-0">
          {/* Wave-like Grid Earth Pattern */}
          <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
            {/* Main grid pattern */}
            <div className="absolute w-full h-full grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)]">
              {[...Array(1600)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-scifi-primary/10 flex items-center justify-center"
                  animate={{
                    opacity: [
                      0.1 + Math.random() * 0.2,
                      0.2 + Math.random() * 0.3,
                      0.1 + Math.random() * 0.2
                    ],
                    z: [
                      Math.sin((i % 40) / 5) * 20,
                      Math.sin((i % 40) / 5 + 1) * 20,
                      Math.sin((i % 40) / 5) * 20
                    ]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    ease: "easeInOut"
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${Math.sin((i % 40) / 5 + (Math.floor(i / 40) / 5)) * 20}px)`
                  }}
                />
              ))}
            </div>

            {/* Subtle wave overlay */}
            <div className="absolute w-full h-full">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-t border-scifi-primary/5"
                  animate={{
                    y: [i * 50, (i * 50) + 30, i * 50]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4 + i,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Horizontal wave lines */}
            <div className="absolute w-full h-full">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-l border-scifi-primary/5"
                  animate={{
                    x: [i * 50, (i * 50) + 30, i * 50]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + i,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Atmospheric glow */}
            <motion.div 
              className="absolute inset-0 bg-scifi-primary/5 blur-2xl"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
      
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
          className="space-y-6 bg-black/20 backdrop-blur-lg rounded-xl p-8 border border-scifi-primary/10"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Hey, Vaidik here
            <div className="text-2xl md:text-3xl font-light mt-4 text-scifi-primary">
              "perception is reality"
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Normally I do development for Apple platforms (iOS, macOS, etc)
          </p>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 text-sm"
        >
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
