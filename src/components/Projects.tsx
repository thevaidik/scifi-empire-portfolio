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
    <section className="py-16 neon-border-secondary border-b-2 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
            <p className="text-xs md:text-sm text-muted-foreground font-mono order-2 md:order-1 text-glow tracking-wider">SECTOR: DEVELOPMENT</p>
            <h2 className="text-2xl md:text-4xl font-bold text-primary neon-border inline-block pb-2 px-6 order-1 md:order-2 text-glow glow-pulse bg-card/30 backdrop-blur-sm">
              ACTIVE PROJECTS
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-mono order-3 text-glow tracking-wider">STATUS: LIVE</p>
          </div>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto mt-6 font-mono">
            Current projects and innovations in technology
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsData.map((project, index) => (
              <div key={project.title} className="group">
                <div className="neon-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 elegant-hover">
                  <ProjectCard {...project} compact={true} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;