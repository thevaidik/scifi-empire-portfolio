import { ExternalLink } from "lucide-react";

const Bento = () => {
  return (
    <section className="py-20 border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              LET'S COLLABORATE
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I am always up for research and industry collaborations so if you like my work and think we can collaborate on something cool, reach out to me via email or message me on Twitter{" "}
                <a href="https://twitter.com/thevaidik_" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                  @thevaidik_
                </a>
                .
              </p>
              <p>
                You can also connect with me on{" "}
                <a href="https://linkedin.com/in/vaidikxx" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                  LinkedIn
                </a>
                , see my projects on{" "}
                <a href="https://github.com/thevaidik" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                  GitHub
                </a>
                {" "}or read my blogs on{" "}
                <a href="https://medium.com/@thevaidik" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                  Medium
                </a>
                .
              </p>
            </div>
          </div>

          <div className="border border-border/50 p-8 hover:border-primary/30 transition-colors">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border border-border/50 flex items-center justify-center mx-auto">
                <ExternalLink className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground">Visit My Bento</h3>
              <p className="text-sm text-muted-foreground">
                Discover more about me in a beautiful grid layout
              </p>
              
              <a
                href="https://bento.me/thevaidik"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
              >
                Visit Bento Grid
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bento;