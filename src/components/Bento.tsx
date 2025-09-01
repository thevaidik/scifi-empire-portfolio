import { ExternalLink } from "lucide-react";

const Bento = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Note Section - Left */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground border-b-2 border-foreground inline-block pb-2">
              LET'S COLLABORATE
            </h2>
            <div className="space-y-4 text-foreground">
              <p className="leading-relaxed">
                I am always up for research and industry collaborations so if you like my work and think we can collaborate on something cool, reach out to me via email or message me on Twitter{" "}
                <a href="https://twitter.com/thevaidik_" target="_blank" rel="noopener noreferrer" className="hover-underline font-semibold">
                  @thevaidik_
                </a>
                .
              </p>
              <p className="leading-relaxed">
                You can also connect with me on{" "}
                <a href="https://linkedin.com/in/vaidikxx" target="_blank" rel="noopener noreferrer" className="hover-underline font-semibold">
                  LinkedIn
                </a>
                , see my projects on{" "}
                <a href="https://github.com/thevaidik" target="_blank" rel="noopener noreferrer" className="hover-underline font-semibold">
                  GitHub
                </a>
                {" "}or read my blogs on{" "}
                <a href="https://medium.com/@thevaidik" target="_blank" rel="noopener noreferrer" className="hover-underline font-semibold">
                  Medium
                </a>
                .
              </p>
            </div>
          </div>

          {/* Bento Card - Right */}
          <div className="border-l border-muted pl-12">
            <div className="border border-border p-8 bg-muted/20">
              <div className="text-center">
                <div className="w-12 h-12 border border-foreground flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6 text-foreground" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">Visit My Bento</h3>
                <p className="text-muted-foreground mb-6">
                  Discover more about me in a beautiful grid layout
                </p>
                
                <a
                  href="https://bento.me/thevaidik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-foreground hover-underline font-semibold"
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