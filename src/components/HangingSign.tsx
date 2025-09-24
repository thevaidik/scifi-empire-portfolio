import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Code2, Coffee } from "lucide-react";

const HangingSign = () => {
  // Real pendulum physics - rotation based on horizontal displacement
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-25, 25]);
  
  // Chain angle follows the sign rotation
  const chainRotate = useTransform(rotate, [-25, 25], [-8, 8]);
  
  useEffect(() => {
    // Gentle idle sway
    const controls = animate(x, [-8, 8, -8], {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [x]);

  return (
    <div className="fixed top-0 right-8 z-50 select-none pointer-events-auto">
      {/* Hanging chains that follow the swing */}
      <div className="flex justify-center gap-16">
        {/* Left chain */}
        <motion.div style={{ rotate: chainRotate }} className="origin-top">
          <div
            className="w-1 h-24"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, hsl(var(--muted-foreground)) 0 6px, transparent 6px 12px)",
              backgroundColor: "hsl(var(--muted-foreground) / 0.7)",
            }}
          />
          {/* Chain ring */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-muted-foreground/60 bg-background/80"></div>
        </motion.div>
        
        {/* Right chain */}
        <motion.div style={{ rotate: chainRotate }} className="origin-top">
          <div
            className="w-1 h-24"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, hsl(var(--muted-foreground)) 0 6px, transparent 6px 12px)",
              backgroundColor: "hsl(var(--muted-foreground) / 0.7)",
            }}
          />
          {/* Chain ring */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-muted-foreground/60 bg-background/80"></div>
        </motion.div>
      </div>

      {/* Swinging sign with realistic pendulum physics */}
      <motion.div
        className="relative -mt-1"
        style={{ 
          x,
          rotate,
          transformOrigin: "50% -24px" // Pivot point at chain attachment
        }}
        drag="x"
        dragConstraints={{ left: -150, right: 150 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          // Apply physics-based momentum for realistic swing
          const velocity = info.velocity.x;
          const momentum = velocity * 0.3;
          
          animate(x, [x.get(), x.get() + momentum, 0], {
            type: "spring",
            stiffness: 80,
            damping: 12,
            mass: 0.8,
            duration: 3
          });
        }}
        whileHover={{ scale: 1.01 }}
        whileDrag={{ scale: 1.02 }}
      >
        {/* Motel sign body */}
        <div className="relative w-48 bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-sm rounded-lg neon-border shadow-2xl">
          {/* Neon glow */}
          <div className="absolute inset-0 rounded-lg neon-glow blur-sm opacity-60"></div>
          
          {/* Sign content */}
          <div className="relative px-5 py-4 text-center">
            {/* Header */}
            <div className="mb-3">
              <div className="text-sm font-black tracking-[0.3em] text-primary text-glow">
                DEV MOTEL
              </div>
              <div className="w-12 h-0.5 bg-primary/60 mx-auto mt-1"></div>
            </div>
            
            {/* Vacancy */}
            <div className="mb-3">
              <div className="inline-block border-2 border-secondary/60 rounded px-3 py-1 bg-secondary/10">
                <div className="text-xs font-bold text-secondary text-glow flicker-animation tracking-[0.2em]">
                  VACANCY
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Code2 className="w-3 h-3 text-primary text-glow" />
                <div className="text-xs text-primary font-semibold tracking-[0.25em] text-glow">
                  24/7 CODING
                </div>
                <Coffee className="w-3 h-3 text-primary text-glow" />
              </div>
              <div className="text-[9px] text-muted-foreground tracking-[0.15em] opacity-90">
                FREE WIFI • COFFEE • DEBUG
              </div>
            </div>
          </div>
          
          {/* Chain attachment points */}
          <div className="absolute -top-2 left-4 w-4 h-3 bg-muted/30 border border-muted-foreground/40 rounded-sm"></div>
          <div className="absolute -top-2 right-4 w-4 h-3 bg-muted/30 border border-muted-foreground/40 rounded-sm"></div>
          
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
