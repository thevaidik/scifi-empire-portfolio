import { motion, useMotionValue, useTransform, animate } from "framer-motion";
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
      {/* Hanging chains */}
      <div className="flex justify-center gap-16">
        <motion.div style={{ rotate: chainRotate }} className="origin-top">
          <div
            className="w-0.5 h-24 bg-border/50"
          />
        </motion.div>
        
        <motion.div style={{ rotate: chainRotate }} className="origin-top">
          <div
            className="w-0.5 h-24 bg-border/50"
          />
        </motion.div>
      </div>

      {/* Swinging sign */}
      <motion.div
        className="relative -mt-1"
        style={{ 
          x,
          rotate,
          transformOrigin: "50% -24px"
        }}
        drag="x"
        dragConstraints={{ left: -150, right: 150 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
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
        {/* Sign body */}
        <div className="relative w-48 bg-card border border-border/50">
          <div className="px-5 py-4 text-center space-y-3">
            {/* Header */}
            <div>
              <div className="text-sm font-bold tracking-[0.3em] text-foreground">
                DEV MOTEL
              </div>
              <div className="w-12 h-px bg-border/50 mx-auto mt-1"></div>
            </div>
            
            {/* Vacancy */}
            <div className="inline-block border border-border/50 px-3 py-1">
              <div className="text-xs font-semibold text-primary tracking-[0.2em]">
                VACANCY
              </div>
            </div>
            
            {/* Services */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Code2 className="w-3 h-3 text-primary" />
                <div className="text-xs text-foreground font-medium tracking-[0.25em]">
                  24/7 CODING
                </div>
                <Coffee className="w-3 h-3 text-primary" />
              </div>
              <div className="text-[9px] text-muted-foreground tracking-[0.15em]">
                FREE WIFI • COFFEE • DEBUG
              </div>
            </div>
          </div>
          
          {/* Chain attachment points */}
          <div className="absolute -top-1.5 left-4 w-3 h-2 border border-border/50"></div>
          <div className="absolute -top-1.5 right-4 w-3 h-2 border border-border/50"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HangingSign;
