import { motion } from "framer-motion";
import { ArrowDown, Code2, Coffee } from "lucide-react";

const HangingSign = () => {
  return (
    <div className="fixed top-0 right-12 z-50 select-none">
      {/* Hanging chains from ceiling */}
      <div className="flex justify-center gap-12">
        <div className="w-0.5 h-20 bg-gradient-to-b from-muted-foreground/90 to-muted-foreground/60 shadow-sm"></div>
        <div className="w-0.5 h-20 bg-gradient-to-b from-muted-foreground/90 to-muted-foreground/60 shadow-sm"></div>
      </div>
      
      {/* Interactive hanging motel sign with realistic swing physics */}
      <motion.div
        className="relative -mt-1"
        drag
        dragConstraints={{ left: -120, right: 120, top: -20, bottom: 80 }}
        dragElastic={0.3}
        dragTransition={{ 
          bounceStiffness: 300, 
          bounceDamping: 20,
          power: 0.2
        }}
        whileHover={{ scale: 1.02 }}
        whileDrag={{ 
          scale: 1.05,
          rotateZ: 5
        }}
        animate={{ 
          rotate: [-1, 1, -1],
          y: [0, -2, 0]
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          originY: 0, // Pivot point at top for realistic swinging
        }}
      >
        {/* Classic Motel Sign Structure */}
        <div className="relative bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-sm rounded-lg shadow-2xl neon-border">
          {/* Neon glow effect */}
          <div className="absolute inset-0 neon-glow rounded-lg blur-sm opacity-70"></div>
          
          {/* Main sign content */}
          <div className="relative px-6 py-4">
            {/* Motel header */}
            <div className="text-center mb-3">
              <div className="text-lg font-black text-primary tracking-[0.3em] text-glow">
                DEV MOTEL
              </div>
              <div className="w-16 h-0.5 bg-primary/60 mx-auto mt-1"></div>
            </div>
            
            {/* Large central arrow */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-b from-accent/20 to-accent/10 rounded-full border-2 border-accent/40">
                <ArrowDown className="w-8 h-8 text-accent text-glow animate-pulse" />
              </div>
            </div>
            
            {/* Vacancy indicator */}
            <div className="text-center mb-3">
              <div className="inline-block border-2 border-secondary/60 rounded-md px-4 py-1.5 bg-secondary/10">
                <div className="text-sm font-bold text-secondary text-glow flicker-animation tracking-[0.2em]">
                  VACANCY
                </div>
              </div>
            </div>
            
            {/* Services row */}
            <div className="text-center space-y-1.5">
              <div className="flex items-center justify-center gap-3">
                <Code2 className="w-4 h-4 text-primary text-glow" />
                <div className="text-xs text-primary font-semibold tracking-[0.25em] text-glow">
                  24/7 CODING
                </div>
                <Coffee className="w-4 h-4 text-primary text-glow" />
              </div>
              <div className="text-[10px] text-muted-foreground tracking-[0.15em] opacity-90">
                FREE WIFI • COFFEE • DEBUG
              </div>
            </div>
          </div>
          
          {/* Decorative corner brackets */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-accent/50 rounded-tl-sm"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-accent/50 rounded-tr-sm"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-accent/50 rounded-bl-sm"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-accent/50 rounded-br-sm"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HangingSign;