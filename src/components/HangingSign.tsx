import { motion } from "framer-motion";
import { Code, Zap } from "lucide-react";

const HangingSign = () => {
  return (
    <div className="absolute top-6 right-6 z-20 select-none">
      {/* Single hanging chain */}
      <div className="flex justify-center mb-2">
        <div className="w-0.5 h-8 bg-gradient-to-b from-muted-foreground/60 to-transparent"></div>
      </div>
      
      {/* Interactive motel-style sign */}
      <motion.div
        className="relative"
        drag
        dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}
        dragElastic={0.8}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1, rotate: 5 }}
        initial={{ rotate: -1 }}
        animate={{ 
          rotate: [-1, 1, -1],
          y: [0, -2, 0]
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Outer neon glow */}
        <div className="absolute inset-0 neon-glow rounded-lg blur-sm opacity-70"></div>
        
        {/* Main motel sign body */}
        <div className="relative bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm rounded-lg px-4 py-3 neon-border shadow-xl">
          {/* Motel sign header */}
          <div className="flex items-center justify-center gap-2 mb-1">
            <Code className="w-3 h-3 text-primary text-glow" />
            <div className="text-[10px] text-primary font-black tracking-[0.15em] text-glow flicker-animation">
              DEV MOTEL
            </div>
            <Zap className="w-3 h-3 text-accent text-glow" />
          </div>
          
          {/* Main vacancy sign */}
          <div className="text-center border-2 border-primary/40 rounded px-2 py-1 mb-1">
            <div className="text-xs font-bold text-accent text-glow tracking-wider">
              VACANCY
            </div>
          </div>
          
          {/* Bottom services */}
          <div className="text-center space-y-0.5">
            <div className="text-[9px] text-secondary font-semibold tracking-[0.2em]">
              24/7 CODING
            </div>
            <div className="text-[8px] text-muted-foreground tracking-wider">
              WIFI • COFFEE • BUGS
            </div>
          </div>
          
          {/* Corner brackets */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-accent/60"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-accent/60"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-accent/60"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-accent/60"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HangingSign;