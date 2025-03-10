
import { motion } from "framer-motion";

const EarthBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-scifi-dark">
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
  );
};

export default EarthBackground;
