import { motion } from "framer-motion";

const EarthBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#2A2A2C]">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Smaller Earth Globe Container */}
        <div className="relative w-[110vh] h-[110vh] -mt-[15vh]">
          {/* Titanium Earth Base */}
          <div className="absolute inset-0 bg-[#7A7A7C] rounded-full opacity-70"></div>
          
          {/* City lights - Titanium tones */}
          <motion.div 
            className="absolute top-[25%] left-[25%] w-[20%] h-[15%] bg-[#9B9B9D]/40 blur-xl rounded-full"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          
          {/* Keep the other motion divs with adjusted colors */}
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
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(30,1fr)] opacity-30">
              {[...Array(900)].map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-[#B4B4B6]/20"
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
            className="absolute inset-0 bg-[#8D8D8F]/15 blur-3xl rounded-full"
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
          
          {/* Atmospheric rings with titanium colors */}
          <motion.div 
            className="absolute inset-0 border-2 border-[#A8A8AA]/30 rounded-full"
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
            className="absolute inset-0 border border-[#8D8D8F]/25 rounded-full"
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
