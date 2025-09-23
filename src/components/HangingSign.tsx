import { Terminal, Coffee } from "lucide-react";

const HangingSign = () => {
  return (
    <div className="fixed top-4 right-4 z-50 select-none">
      {/* Hanging chains with different lengths */}
      <div className="flex justify-between mb-1 px-2">
        <div className="w-px h-6 bg-gradient-to-b from-muted-foreground/80 to-transparent"></div>
        <div className="w-px h-4 bg-gradient-to-b from-muted-foreground/60 to-transparent"></div>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/80 to-transparent"></div>
        <div className="w-px h-5 bg-gradient-to-b from-muted-foreground/70 to-transparent"></div>
      </div>
      
      {/* Main sign with vintage diner aesthetic */}
      <div className="relative transform -rotate-2 hover:rotate-0 transition-all duration-700 elegant-hover">
        {/* Outer glow effect */}
        <div className="absolute inset-0 neon-glow rounded-xl blur-sm opacity-60"></div>
        
        {/* Main sign body */}
        <div className="relative neon-border bg-gradient-to-br from-card to-card/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-2xl">
          {/* Top decorative line */}
          <div className="absolute top-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
          
          {/* Header with icons */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <Terminal className="w-5 h-5 text-primary text-glow subtle-pulse" />
            <div className="text-xs text-accent font-bold tracking-[0.2em] text-glow">
              DEVELOPER
            </div>
            <Coffee className="w-4 h-4 text-secondary text-glow" />
          </div>
          
          {/* Main text */}
          <div className="text-center space-y-1">
            <div className="text-lg font-black text-primary text-glow flicker-animation tracking-wider">
              DRIVE THRU
            </div>
            <div className="text-xs text-secondary font-semibold tracking-[0.3em] opacity-90">
              OPEN
            </div>
          </div>
          
          {/* Bottom text */}
          <div className="text-center mt-2 pt-2 border-t border-primary/20">
            <div className="text-xs text-accent font-bold tracking-wider">
              24/7 WORK
            </div>
          </div>
          
          {/* Bottom decorative line */}
          <div className="absolute bottom-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-40"></div>
        </div>
        
        {/* Vintage corner details */}
        <div className="absolute -top-2 -left-2 w-4 h-4">
          <div className="absolute top-0 left-0 w-3 h-px bg-accent"></div>
          <div className="absolute top-0 left-0 w-px h-3 bg-accent"></div>
        </div>
        <div className="absolute -top-2 -right-2 w-4 h-4">
          <div className="absolute top-0 right-0 w-3 h-px bg-accent"></div>
          <div className="absolute top-0 right-0 w-px h-3 bg-accent"></div>
        </div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4">
          <div className="absolute bottom-0 left-0 w-3 h-px bg-accent"></div>
          <div className="absolute bottom-0 left-0 w-px h-3 bg-accent"></div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4">
          <div className="absolute bottom-0 right-0 w-3 h-px bg-accent"></div>
          <div className="absolute bottom-0 right-0 w-px h-3 bg-accent"></div>
        </div>
      </div>
    </div>
  );
};

export default HangingSign;