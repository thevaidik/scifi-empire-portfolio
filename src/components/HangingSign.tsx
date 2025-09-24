import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const HangingSign = () => {
  // Pendulum-like rotation controlled by drag + idle sway
  const rawRotate = useMotionValue(0);
  const rotate = useSpring(rawRotate, { stiffness: 40, damping: 6, mass: 0.3 });
  const chainAngle = useTransform(rotate, [-15, 15], [-6, 6]);

  useEffect(() => {
    // Subtle idle swing
    const controls = animate(rawRotate, [-1.4, 1.4, -1.4], {
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [rawRotate]);

  return (
    <div className="fixed top-0 right-6 z-50 select-none pointer-events-auto">
      {/* Chains from ceiling to sign anchors */}
      <div className="flex justify-center gap-10">
        {/* Left chain */}
        <motion.div style={{ rotate: chainAngle }} className="relative">
          <div
            className="w-1 h-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, hsl(var(--muted-foreground)) 0 8px, transparent 8px 16px)",
              backgroundColor: "hsl(var(--muted-foreground) / 0.6)",
            }}
          />
          {/* Ring */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-accent/60 bg-background"></div>
        </motion.div>
        {/* Right chain */}
        <motion.div style={{ rotate: chainAngle }} className="relative">
          <div
            className="w-1 h-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, hsl(var(--muted-foreground)) 0 8px, transparent 8px 16px)",
              backgroundColor: "hsl(var(--muted-foreground) / 0.6)",
            }}
          />
          {/* Ring */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-accent/60 bg-background"></div>
        </motion.div>
      </div>

      {/* Sign wrapper with pivot at top for realistic swing */}
      <motion.div
        className="relative -mt-1 origin-top"
        drag
        dragConstraints={{ left: -120, right: 120, top: -20, bottom: 80 }}
        dragElastic={0.25}
        onDrag={(e, info) => {
          const tilt = Math.max(-12, Math.min(12, info.offset.x * 0.06));
          rawRotate.set(tilt);
        }}
        onDragEnd={(e, info) => {
          // Inertia kick + spring back to rest to simulate chain physics
          const kick = Math.max(-10, Math.min(10, info.velocity.x * 0.01));
          rawRotate.set(kick);
          animate(rawRotate, 0, { type: "spring", stiffness: 30, damping: 4, mass: 0.25 });
        }}
        style={{ rotate }}
        whileHover={{ scale: 1.02 }}
        whileDrag={{ scale: 1.04 }}
      >
        {/* Compact motel sign with a single curved arrow */}
        <div className="relative w-[220px]">
          {/* Arrow-shaped panel (rounded head via rotated rounded square) */}
          <div className="relative px-4 pt-3 pb-9 rounded-lg neon-border bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-sm shadow-2xl">
            <div className="absolute inset-0 rounded-lg neon-glow blur-sm opacity-60"></div>

            <div className="relative text-center">
              <div className="text-[11px] font-black tracking-[0.28em] text-primary text-glow">
                DEV MOTEL
              </div>
              <div className="mt-1 text-[10px] tracking-[0.2em] text-secondary text-glow flicker-animation">
                VACANCY
              </div>
            </div>

            {/* Curved arrow head */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-1 w-9 h-9 bg-gradient-to-b from-primary/90 to-primary/70 rounded-[14px] rotate-45 neon-border border-t-0 border-l-0"></div>
          </div>

          {/* Arrow shaft connector */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-1.5 h-5 bg-primary/70 rounded-full"></div>

          {/* Corner brackets (subtle metal reinforcements) */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-accent/40 rounded-tl"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-accent/40 rounded-tr"></div>
        </div>

        {/* Hinge plates matching chain positions */}
        <div className="absolute -top-2 left-5 w-5 h-2 bg-accent/20 border border-accent/40 rounded-sm"></div>
        <div className="absolute -top-2 right-5 w-5 h-2 bg-accent/20 border border-accent/40 rounded-sm"></div>
      </motion.div>
    </div>
  );
};

export default HangingSign;
