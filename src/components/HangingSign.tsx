import { motion } from "framer-motion";
import { ArrowDown, Code2, Coffee } from "lucide-react";

const HangingSign = () => {
  return (
    <div className="fixed top-0 right-8 z-50 select-none">
      {/* Hanging chains from ceiling */}
      <div className="flex justify-center gap-16">
        <div className="w-0.5 h-16 bg-gradient-to-b from-muted-foreground/80 to-muted-foreground/40"></div>
        <div className="w-0.5 h-16 bg-gradient-to-b from-muted-foreground/80 to-muted-foreground/40"></div>
      </div>
      
      {/* Interactive hanging motel sign with physics */}
      <motion.div
        className="relative -mt-2"
        drag
        dragConstraints={{ left: -80, right: 80, top: -40, bottom: 60 }}
        dragElastic={0.6}
        whileHover={{ scale: 1.02 }}
        whileDrag={{ scale: 1.05 }}
        animate={{ 
          rotate: [-0.5, 0.5, -0.5],
          y: [0, -1, 0]
        }}
        transition={{
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Main motel sign structure */}
        <div className="relative">
          {/* Top sign with arrow */}
          <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 backdrop-blur-sm rounded-t-lg px-4 py-2 neon-border">
            <div className="absolute inset-0 neon-glow rounded-t-lg blur-sm opacity-60"></div>
            <div className="relative flex items-center justify-between">
              <div className="text-xs font-black text-background tracking-[0.15em]">
                DEV MOTEL
              </div>
              <ArrowDown className="w-4 h-4 text-background transform rotate-45" />
            </div>
          </div>
          
          {/* Main sign body */}
          <div className="relative bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm px-4 py-3 neon-border border-t-0">
            <div className="absolute inset-0 neon-glow blur-sm opacity-50"></div>
            
            {/* Vacancy indicator */}
            <div className="relative text-center mb-2">
              <div className="inline-block border-2 border-accent/60 rounded px-3 py-1 bg-accent/10">
                <div className="text-sm font-bold text-accent text-glow flicker-animation tracking-wider">
                  VACANCY
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div className="relative text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Code2 className="w-3 h-3 text-primary text-glow" />
                <div className="text-xs text-primary font-semibold tracking-[0.2em] text-glow">
                  24/7 CODING
                </div>
                <Coffee className="w-3 h-3 text-secondary text-glow" />
              </div>
              <div className="text-[10px] text-muted-foreground tracking-wider opacity-80">
                FREE WIFI • COFFEE • DEBUG
              </div>
            </div>
          </div>
          
          {/* Bottom arrow pointer */}
          <div className="relative bg-gradient-to-b from-primary/90 to-primary/70 backdrop-blur-sm rounded-b-lg px-2 py-1 neon-border border-t-0">
            <div className="absolute inset-0 neon-glow rounded-b-lg blur-sm opacity-60"></div>
            <div className="relative text-center">
              <ArrowDown className="w-4 h-4 text-background mx-auto" />
            </div>
          </div>
          
          {/* Corner reinforcements */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-accent/40 rounded-tl"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-accent/40 rounded-tr"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-accent/40 rounded-bl"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-accent/40 rounded-br"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HangingSign;