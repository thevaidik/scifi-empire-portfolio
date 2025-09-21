import { ExternalLink } from "lucide-react";

const Bento = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Note Section - Left */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary neon-border inline-block pb-2 px-4 text-glow">
              LET'S COLLABORATE
            </h2>
            <div className="space-y-4 text-secondary">
              <p className="leading-relaxed">
                I am always up for research and industry collaborations so if you like my work and think we can collaborate on something cool, reach out to me via email or message me on Twitter{" "}
                <a href="https://twitter.com/thevaidik_" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-glow font-semibold">
                  @thevaidik_
                </a>
                .
              </p>
              <p className="leading-relaxed">
                You can also connect with me on{" "}
                <a href="https://linkedin.com/in/vaidikxx" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-glow font-semibold">
                  LinkedIn
                </a>
                , see my projects on{" "}
                <a href="https://github.com/thevaidik" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-glow font-semibold">
                  GitHub
                </a>
                {" "}or read my blogs on{" "}
                <a href="https://medium.com/@thevaidik" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-glow font-semibold">
                  Medium
                </a>
                .
              </p>
            </div>
          </div>

          {/* Bento Card - Right */}
          <div className="neon-border-secondary pl-12">
            <div className="neon-border bg-card p-8 hover:neon-glow-accent transition-all duration-300 group">
              <div className="text-center">
                <div className="w-12 h-12 neon-border-secondary flex items-center justify-center mx-auto mb-4 group-hover:text-glow">
                  <ExternalLink className="w-6 h-6 text-accent" />
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-glow">Visit My Bento</h3>
                <p className="text-secondary mb-6">
                  Discover more about me in a beautiful grid layout
                </p>
                
                <a
                  href="https://bento.me/thevaidik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent hover:text-glow font-semibold"
                >
                  Visit Bento Grid
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bento;