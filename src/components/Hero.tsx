const Hero = () => {
  return (
    <div className="p-8">
      <div className="mb-2">
        <p className="text-xs text-muted-foreground">
          CLASSIFIED // PROJECT ID: VK-2030
        </p>
      </div>
      
      <h1 className="text-4xl font-bold text-foreground mb-4">
        THE VAIDIK PROJECT
      </h1>
      
      <div className="mb-4">
        <p className="text-sm font-semibold text-primary">
          Apple Systems Developer and Maker
        </p>
      </div>
      
      <p className="text-base text-foreground leading-relaxed">
        iOS, macOS dev, also playing with Rust and server-side Swift + founding stuff.
      </p>
    </div>
  );
};

export default Hero;