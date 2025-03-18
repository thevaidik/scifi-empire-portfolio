
import { motion } from "framer-motion";

const EarthBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Dark gradient around the globe */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#222222]/70 to-[#111111]/90"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Earth Globe Container - Increased size and adjusted position */}
        <div className="relative w-[120vh] h-[120vh] -mt-[10vh]">
          {/* Titanium Earth Base - Darkened slightly for better contrast */}
          <div className="absolute inset-0 bg-[#5A5A5C] rounded-full opacity-70"></div>
          
          {/* City lights - Titanium tones */}
          <motion.div 
            className="absolute top-[25%] left-[25%] w-[20%] h-[15%] bg-[#8B8B8D]/40 blur-xl rounded-full"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          
          {/* Other motion divs with adjusted colors for better visibility */}
          <motion.div 
            className="absolute top-[20%] left-[55%] w-[10%] h-[10%] bg-[#A8A8AA]/40 blur-xl rounded-full"
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute top-[25%] left-[65%] w-[20%] h-[15%] bg-[#8D8D8F]/40 blur-xl rounded-full"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute top-[50%] left-[35%] w-[10%] h-[15%] bg-[#A8A8AA]/40 blur-xl rounded-full"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute top-[60%] left-[75%] w-[8%] h-[8%] bg-[#9B9B9D]/40 blur-xl rounded-full"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          />
          
          {/* Grid pattern overlay - Enhanced visibility */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(30,1fr)] opacity-40">
              {[...Array(900)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-[#C4C4C6]/20"
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
          
          {/* Atmospheric glow - Enhanced visibility */}
          <motion.div 
            className="absolute inset-0 bg-[#8D8D8F]/20 blur-3xl rounded-full"
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
          
          {/* Atmospheric rings with more visible titanium colors */}
          <motion.div 
            className="absolute inset-0 border-2 border-[#B8B8BA]/40 rounded-full"
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
            className="absolute inset-0 border border-[#A8A8AA]/35 rounded-full"
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
          
          {/* Additional visible ring */}
          <motion.div 
            className="absolute inset-0 border-4 border-[#C8C8CA]/20 rounded-full"
            animate={{ 
              rotate: -360,
              scale: [0.97, 0.99, 0.97]
            }}
            transition={{ 
              rotate: {
                repeat: Infinity, 
                duration: 95, 
                ease: "linear"
              },
              scale: {
                repeat: Infinity, 
                duration: 12, 
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
