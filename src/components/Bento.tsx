import { ExternalLink } from "lucide-react";

const Bento = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-3 text-foreground">
        Let's Collaborate
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Building the future, one project at a time
      </p>

      <div className="space-y-4 text-sm text-foreground leading-relaxed mb-6">
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

      <div className="border border-border rounded-lg p-6 hover:bg-accent/50 transition-colors">
        <div className="flex items-center gap-3 mb-2">
          <ExternalLink className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Visit My Bento</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
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
  );
};

export default Bento;