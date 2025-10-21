import droneBlueprint from "@/assets/drone-blueprint.png";
import rocketBlueprint from "@/assets/rocket-blueprint.png";

const Hero = () => {
  return (
    <section className="py-16 border-b-2 neon-border relative scanlines overflow-hidden">
      {/* Blueprint Background Images */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <img 
          src={droneBlueprint} 
          alt="" 
          className="absolute top-0 left-0 w-1/2 h-auto object-contain"
          style={{ 
            animation: 'rotate-slow 20s linear infinite, pulse 6s ease-in-out infinite',
            transformOrigin: 'center'
          }}
        />
        <img 
          src={rocketBlueprint} 
          alt="" 
          className="absolute top-0 right-0 w-1/2 h-auto object-contain"
          style={{ 
            animation: 'rotate-slow-reverse 25s linear infinite, pulse 8s ease-in-out infinite',
            transformOrigin: 'center'
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