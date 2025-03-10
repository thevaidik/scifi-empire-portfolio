
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="about" className="py-20 flex items-center justify-center relative overflow-hidden">
      {/* Earth Background with Night Continent Lights */}
      <div className="absolute inset-0 bg-scifi-dark">
        <div className="absolute inset-0">
          {/* Earth with Night Lights Pattern */}
          <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
            {/* Dark Earth Base */}
            <div className="absolute inset-0 bg-[#221F26] rounded-full opacity-70 max-w-3xl max-h-3xl mx-auto my-auto"></div>
            
            {/* City lights - North America */}
            <motion.div 
              className="absolute top-[25%] left-[25%] w-[20%] h-[15%] bg-[#FEF7CD]/20 blur-xl rounded-full"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            
            {/* City lights - Europe */}
            <motion.div 
              className="absolute top-[20%] left-[55%] w-[10%] h-[10%] bg-[#FEC6A1]/20 blur-xl rounded-full"
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            
            {/* City lights - Asia */}
            <motion.div 
              className="absolute top-[25%] left-[65%] w-[20%] h-[15%] bg-[#FEF7CD]/20 blur-xl rounded-full"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            />
            
            {/* City lights - South America */}
            <motion.div 
              className="absolute top-[50%] left-[35%] w-[10%] h-[15%] bg-[#FEC6A1]/20 blur-xl rounded-full"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            />
            
            {/* City lights - Australia */}
            <motion.div 
              className="absolute top-[60%] left-[75%] w-[8%] h-[8%] bg-[#FEF7CD]/20 blur-xl rounded-full"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            />
            
            {/* Grid pattern overlay for continents */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(30,1fr)] opacity-30">
                {[...Array(900)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="border border-scifi-primary/5"
                    animate={{
                      opacity: [
                        0.1 + Math.random() * 0.2,
                        0.2 + Math.random() * 0.3,
                        0.1 + Math.random() * 0.2
                      ]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + Math.random() * 2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Atmospheric glow */}
            <motion.div 
              className="absolute inset-0 bg-[#1EAEDB]/5 blur-3xl max-w-4xl max-h-4xl mx-auto my-auto rounded-full"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Subtle atmospheric rings */}
            <motion.div 
              className="absolute inset-0 border-2 border-[#0FA0CE]/10 rounded-full max-w-[70%] max-h-[70%] mx-auto my-auto"
              animate={{ 
                rotate: 360,
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                rotate: {
                  repeat: Infinity, 
                  duration: 60, 
                  ease: "linear"
                },
                scale: {
                  repeat: Infinity, 
                  duration: 8, 
                  ease: "easeInOut"
                }
              }}
            />
            
            <motion.div 
              className="absolute inset-0 border border-[#0FA0CE]/5 rounded-full max-w-[80%] max-h-[80%] mx-auto my-auto"
              animate={{ 
                rotate: 360,
                scale: [1, 1.01, 1]
              }}
              transition={{ 
                rotate: {
                  repeat: Infinity, 
                  duration: 80, 
                  ease: "linear"
                },
                scale: {
                  repeat: Infinity, 
                  duration: 10, 
                  ease: "easeInOut"
                }
              }}
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
