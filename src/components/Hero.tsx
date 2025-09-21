const Hero = () => {
  return (
    <section className="py-16 border-b-2 neon-border relative scanlines">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-secondary font-mono text-glow">
              EST. JANUARY 1, 2030 • VOLUME XCVII • PRICE: FREE
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary mb-6 tracking-tight text-glow flicker-animation">
            THE VAIDIK POST
          </h1>
          <div className="neon-border-secondary py-4 mb-6 glow-pulse">
            <p className="text-lg font-serif font-semibold text-accent uppercase tracking-widest text-glow">
              Apple Systems Developer and Maker
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              iOS, macOS dev, also playing with Rust and server-side Swift + founding stuff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;