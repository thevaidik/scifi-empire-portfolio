
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const Bento = () => {
  return (
    <section id="bento" className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Note Section - Left */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Let's Collaborate</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                I am always up for research and industry collaborations so if you like my work and think we can collaborate on something cool, reach out to me via email or message me on Twitter{" "}
                <a href="https://twitter.com/serious_mehta" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  @serious_mehta
                </a>
                .
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You can also connect with me on{" "}
                <a href="https://linkedin.com/in/vaidikxx" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  LinkedIn
                </a>
                , see my projects on{" "}
                <a href="https://github.com/thevaidik" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  Github
                </a>
                , see my work on{" "}
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  Kaggle
                </a>
                {" "}or read my blogs on{" "}
                <a href="https://medium.com/@thevaidik" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                  my blog
                </a>
                .
              </p>
            </div>
          </div>

          {/* Bento Card - Right */}
          <div className="flex justify-center lg:justify-end">
            <div className="max-w-md w-full">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Visit My Bento</h3>
                <p className="text-muted-foreground">
                  Discover more about me in a beautiful grid layout
                </p>
              </div>
              
              <a
                href="https://bento.me/thevaidik"
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full p-8 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border hover:border-glass-hover hover:bg-glass-hover transition-all duration-500 text-center shadow-lg hover:shadow-xl hover:shadow-glass-glow"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-glass-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ExternalLink className="w-8 h-8 text-foreground" />
                  </div>
                </div>
                
                <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  Bento Grid
                </h4>
                <p className="text-muted-foreground mb-4">
                  A visual story of my journey, skills, and interests
                </p>
                
                <div className="inline-flex items-center text-muted-foreground group-hover:text-foreground transition-colors">
                  Visit Bento
                  <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bento;
