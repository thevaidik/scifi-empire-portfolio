import propellerPlane from "@/assets/propeller-plane-blueprint.png";

const Hero = () => {
  return (
    <section className="py-16 border-b-2 neon-border relative scanlines overflow-hidden">
      {/* Blueprint Background Images */}
      <div className="absolute inset-0 opacity-25 pointer-events-none overflow-visible">
        <img 
          src={propellerPlane} 
          alt="" 
          className="absolute top-1/2 left-1/2 w-1/2 h-auto object-contain -translate-x-1/2 -translate-y-1/2"
          style={{ 
            animation: 'spin 60s linear infinite'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground font-mono text-glow tracking-wider">
              CLASSIFIED // PROJECT ID: VK-2030 // CLEARANCE LEVEL: PUBLIC
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight text-glow glow-pulse">
            THE VAIDIK PROJECT
          </h1>
          <div className="neon-border-secondary py-4 mb-6 glow-pulse bg-card/30 backdrop-blur-sm">
            <p className="text-lg font-bold text-accent uppercase tracking-widest text-glow">
              Apple Systems Developer and Maker
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-mono">
              iOS, macOS dev, also playing with Rust and server-side Swift + founding stuff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;