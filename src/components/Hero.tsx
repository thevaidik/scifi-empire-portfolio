const Hero = () => {
  return (
    <section className="py-16 border-b-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground font-mono">
              EST. JANUARY 1, 2030 • VOLUME XCVII • PRICE: FREE
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground mb-6 tracking-tight">
            THE VAIDIK POST
          </h1>
          <div className="border-t border-b border-foreground py-4 mb-6">
            <p className="text-lg font-serif font-semibold text-foreground uppercase tracking-widest">
              Apple Systems Developer and Maker
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              iOS, macOS dev, also playing with Rust and server-side Swift + founding stuff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;