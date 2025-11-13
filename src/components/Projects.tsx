import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: "nxtlap.com",
    description: "Racing leagues platform",
    image: "/nxtlap-favicon.ico",
    tags: ["Racing", "F1", "Web", "Platform"],
    link: "https://nxtlap.com",
  },
  {
    title: "Briefly - RSS reader and News",
    description: "RSS reader and News",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/24/fa/2f/24fa2f8f-ab6e-a94c-a16f-4dc22c4a8d7f/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.png",
    tags: ["Swift", "SwiftUI", "iOS", "AI"],
    link: "https://apps.apple.com/in/app/briefly-rss-feeds-and-news/id6746949720",
  },
  {
    title: "OneCorpApps",
    description: "founder of OneCorpApps",
    image: "/lovable-uploads/6ce87993-46d4-4012-a197-3243da272842.png",
    tags: ["Swift", "iOS", "Startup", "Product"],
    link: "https://www.linkedin.com/company/luxswipe/?viewAsMember=true",
  },
  {
    title: "LogoGuess",
    description: "Guess brand logos.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
    tags: ["SwiftUI", "Game", "iOS", "UI/UX"],
    link: "https://apps.apple.com/app/logoguess/id123456790",
  },
  {
    title: "Swift Robotics",
    description: "Playing with Swift Embedded",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    tags: ["Swift", "Embedded", "Robotics", "Hardware"],
    link: "https://github.com/swift-robotics",
  },
  {
    title: "Aviation Tracker",
    description: "Real-time flight tracking.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    tags: ["Swift", "APIs", "Data", "Real-time"],
    link: "https://apps.apple.com/app/aviation-tracker/id123456792",
  },
];

const Projects = () => {
  return (
    <section className="py-20 border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-4">
          <div className="flex items-center justify-center gap-12 mb-2">
            <span className="text-xs text-muted-foreground font-mono tracking-wider">SECTOR: DEVELOPMENT</span>
            <span className="text-xs text-muted-foreground font-mono tracking-wider">STATUS: LIVE</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground tracking-tight">
            ACTIVE PROJECTS
          </h2>
          
          <p className="text-sm text-muted-foreground text-center font-mono max-w-xl mx-auto">
            Current projects and innovations in technology
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <div key={project.title} className="border border-border/50 hover:border-primary/30 transition-colors">
                <ProjectCard {...project} compact={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;