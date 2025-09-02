const Hero = () => {
  return (
    <section className="py-16 border-b-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            THE VAIDIK TIMES
          </h1>
          <div className="border-t border-b border-foreground py-4 mb-6">
            <p className="text-lg font-semibold text-foreground uppercase tracking-widest">
              Founder & Apple Systems Developer
            </p>
          </div>
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground font-mono">
              EST. JANUARY 1, 2030 • VOLUME XCVII
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specializing in iOS, macOS, and visionOS development. Building the future of technology through innovative applications and open-source contributions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;