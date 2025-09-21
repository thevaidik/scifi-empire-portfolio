import ProjectCard from "./ProjectCard";

const projectsData = [
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
    title: "MotorSports.ai",
    description: "AI race tracking.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    tags: ["SwiftUI", "AI", "Sports", "iOS"],
    link: "https://apps.apple.com/app/motorsports-ai/id123456791",
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
    <section className="py-16 border-b-2 border-foreground">
      <div className="container mx-auto px-4">
        {/* Newspaper Header */}
        <div className="text-center mb-12">
          <div className="border-t-2 border-b-2 border-foreground py-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs font-mono text-muted-foreground">DEC 15, 2029</div>
              <div className="text-xs font-mono text-muted-foreground">PAGE 2</div>
            </div>
            <h2 className="text-4xl font-headline font-black text-foreground tracking-wider">
              CURRENT EVENTS
            </h2>
            <div className="text-xs font-mono text-muted-foreground italic mt-2">
              "Latest developments in technology and innovation"
            </div>
          </div>
        </div>

        {/* Newspaper Layout */}    
        <div className="max-w-7xl mx-auto">
          {/* Lead Story */}
          <div className="border-b-2 border-foreground pb-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-headline font-bold text-foreground mb-3 leading-tight">
                  {projectsData[0].title.toUpperCase()}
                </h3>
                <p className="font-serif text-base text-muted-foreground leading-relaxed mb-4">
                  Revolutionary approach to {projectsData[0].description.toLowerCase()} transforms the digital news consumption landscape. 
                  Built with cutting-edge {projectsData[0].tags.join(", ")} technologies, this application represents a significant 
                  breakthrough in information accessibility and user experience design.
                </p>
                <div className="text-xs font-mono text-muted-foreground">
                  TECHNOLOGIES: {projectsData[0].tags.join(" • ")}
                </div>
              </div>
              <div className="md:col-span-1">
                <img 
                  src={projectsData[0].image} 
                  alt={projectsData[0].title}
                  className="w-full h-48 object-cover border border-foreground"
                />
              </div>
            </div>
          </div>

          {/* Secondary Stories - Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 mb-8">
            {projectsData.slice(1, 3).map((project, index) => (
              <article key={project.title} className="border-b border-foreground pb-6">
                <div className="mb-4">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-32 object-cover border border-foreground mb-3"
                  />
                </div>
                <h4 className="text-lg font-headline font-bold text-foreground mb-2 leading-tight">
                  {project.title.toUpperCase()}
                </h4>
                <p className="font-serif text-sm text-muted-foreground leading-relaxed mb-3">
                  {project.description}. This initiative showcases advanced implementation of {project.tags.slice(0, 2).join(" and ")} 
                  technologies, marking significant progress in the field.
                </p>
                <div className="text-xs font-mono text-muted-foreground">
                  {project.tags.join(" • ")}
                </div>
              </article>
            ))}
          </div>

          {/* Brief News Items */}
          <div className="border-t-2 border-foreground pt-8">
            <h3 className="text-xl font-headline font-bold text-foreground mb-6 text-center">
              BRIEF DISPATCHES
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {projectsData.slice(3).map((project, index) => (
                <div key={project.title} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 border border-foreground overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="font-headline font-bold text-sm text-foreground mb-2">
                    {project.title.toUpperCase()}
                  </h5>
                  <p className="font-serif text-xs text-muted-foreground leading-relaxed mb-2">
                    {project.description}
                  </p>
                  <div className="text-xs font-mono text-muted-foreground opacity-70">
                    {project.tags.slice(0, 2).join(" • ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newspaper Footer */}
          <div className="text-center mt-8 pt-6 border-t border-foreground">
            <p className="text-xs font-mono text-muted-foreground">
              All projects verified and continuously updated • For detailed information visit respective platforms
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;