import rocketBlueprint from "@/assets/rocket-blueprint.png";

const Hero = () => {
  return (
    <section className="py-24 border-b border-border/30 relative overflow-hidden">
      {/* Blueprint Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <img 
          src={rocketBlueprint} 
          alt="" 
          className="w-full max-w-2xl object-contain"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground font-mono tracking-widest">
              CLASSIFIED // PROJECT ID: VK-2030 // CLEARANCE LEVEL: PUBLIC
            </p>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight text-center">
            THE VAIDIK PROJECT
          </h1>
          
          <div className="border-t border-b border-border/50 py-3 text-center">
            <p className="text-sm font-medium text-primary uppercase tracking-widest">
              Apple Systems Developer and Maker
            </p>
          </div>
          
          <p className="text-base text-muted-foreground text-center font-mono leading-relaxed">
            iOS, macOS dev, also playing with Rust and server-side Swift + founding stuff.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;