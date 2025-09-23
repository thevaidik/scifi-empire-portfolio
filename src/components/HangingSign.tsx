import { Code, Zap } from "lucide-react";

const HangingSign = () => {
  return (
    <div className="fixed top-4 right-4 z-50 select-none">
      {/* Hanging chains */}
      <div className="flex justify-center mb-2 space-x-6">
        <div className="w-0.5 h-8 bg-gradient-to-b from-muted-foreground to-transparent"></div>
        <div className="w-0.5 h-6 bg-gradient-to-b from-muted-foreground to-transparent"></div>
        <div className="w-0.5 h-8 bg-gradient-to-b from-muted-foreground to-transparent"></div>
      </div>
      
      {/* Main sign */}
      <div className="relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
        <div className="neon-border bg-card px-4 py-3 rounded-lg shadow-2xl glow-pulse">
          <div className="flex items-center gap-2 mb-1">
            <Code className="w-4 h-4 text-primary text-glow" />
            <Zap className="w-3 h-3 text-accent text-glow" />
          </div>
          
          <div className="text-center">
            <div className="text-sm font-bold text-primary text-glow flicker-animation">
              DEV DRIVE
            </div>
            <div className="text-xs text-secondary font-semibold tracking-wider">
              THRU
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-1 text-center">
            24/7 CODING
          </div>
        </div>
        
        {/* Corner brackets for vintage look */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent opacity-60"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-accent opacity-60"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-accent opacity-60"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent opacity-60"></div>
      </div>
      
      {/* Subtle shadow */}
      <div className="absolute inset-0 bg-black/20 rounded-lg transform translate-x-1 translate-y-1 -z-10"></div>
    </div>
  );
};

export default HangingSign;