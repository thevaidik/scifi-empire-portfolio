import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import Bento from "@/components/Bento";
import HangingSign from "@/components/HangingSign";
import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Smartphone, Globe, Code, Users, Heart, Info, Briefcase, Coffee } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const [isOSMode, setIsOSMode] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const links = [
    {
      name: "GitHub",
      url: "https://github.com/thevaidik",
      icon: <Github className="h-4 w-4" />,
      description: "Code repositories"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/thevaidik_", 
      icon: <Twitter className="h-4 w-4" />,
      description: "Tech discussions"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@thevaidik_",
      icon: <Youtube className="h-4 w-4" />,
      description: "Tech tutorials"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vaidikxx",
      icon: <Linkedin className="h-4 w-4" />,
      description: "Professional network"
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Technical blogs"
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-4 w-4" />,
      description: "Direct communication"
    }
  ];

  const apps = [
    {
      id: "about",
      name: "About",
      icon: <Info className="w-8 h-8" />,
      color: "from-blue-400 to-blue-600",
      component: <Hero />
    },
    {
      id: "projects",
      name: "Current Events",
      icon: <Briefcase className="w-8 h-8" />,
      color: "from-purple-400 to-purple-600",
      component: <Projects />
    },
    {
      id: "opensource",
      name: "Open Source",
      icon: <Code className="w-8 h-8" />,
      color: "from-green-400 to-green-600",
      component: <OpenSource />
    },
    {
      id: "connect",
      name: "Connect",
      icon: <Users className="w-8 h-8" />,
      color: "from-orange-400 to-orange-600",
      component: (
        <section className="py-16 vintage-neon-bg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-headline font-bold text-primary mb-4 uppercase tracking-wide border-b-4 border-t-4 border-border py-4 inline-block px-8">
                CONNECTIONS & CORRESPONDENCE
              </h2>
              <p className="text-secondary text-lg max-w-2xl mx-auto mt-8 font-serif italic">
                Professional networks and communication channels for the modern era
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {links.map((link, index) => (
                <div key={index} className="bg-card border-2 border-border p-4 text-center hover:bg-muted transition-all duration-300 group shadow-sm">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-2 text-accent">
                      {link.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                      {link.name}
                    </h3>
                    <p className="text-xs text-secondary mt-1 font-mono">
                      {link.description}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    },
    {
      id: "interests",
      name: "Interests",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-400 to-pink-600",
      component: <Interests />
    },
    {
      id: "more",
      name: "More",
      icon: <Coffee className="w-8 h-8" />,
      color: "from-yellow-400 to-yellow-600",
      component: <Bento />
    }
  ];

  const handleAppClick = (appId: string) => {
    setSelectedApp(selectedApp === appId ? null : appId);
  };

  const handleBackToHome = () => {
    setSelectedApp(null);
  };

  const renderOSMode = () => {
    if (selectedApp) {
      const app = apps.find(a => a.id === selectedApp);
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 relative">
          {/* Mode Switcher - Always visible */}
          <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 border border-gray-200 shadow-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-4 h-4 text-gray-600" />
              <Switch
                checked={isOSMode}
                onCheckedChange={setIsOSMode}
              />
              <Smartphone className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          {/* Menu Bar */}
          <div className="h-8 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 text-gray-800 text-sm border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">🍎</span>
              <span className="font-medium">{app?.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Thu 9:41 AM</span>
            </div>
          </div>

          {/* Window */}
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 min-h-[calc(100vh-120px)]">
              {/* Window Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBackToHome}
                    className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600"
                  ></button>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <h1 className="font-semibold text-gray-800 text-sm">
                  {app?.name}
                </h1>
                <div className="w-16"></div>
              </div>

              {/* App Content */}
              <div className="overflow-hidden">
                {app?.component}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 relative" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.05'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E")` }}>
        
        {/* Mode Switcher - Always visible */}
        <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 border border-gray-200 shadow-lg">
          <div className="flex items-center space-x-3">
            <Globe className="w-4 h-4 text-gray-600" />
            <Switch
              checked={isOSMode}
              onCheckedChange={setIsOSMode}
            />
            <Smartphone className="w-4 h-4 text-gray-600" />
          </div>
        </div>

        {/* Menu Bar */}
        <div className="h-8 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 text-gray-800 text-sm border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">🍎</span>
            <span className="font-medium">Finder</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>🔋</span>
            <span>📶</span>
            <span>Thu 9:41 AM</span>
          </div>
        </div>

        {/* Desktop */}
        <div className="flex-1 p-8">
          <div className="text-center mb-8 mt-16">
            <h1 className="text-4xl font-semibold text-gray-800 mb-2">
              THE VAIDIK POST
            </h1>
            <p className="text-gray-600 text-lg">macOS Developer Workspace</p>
          </div>
        </div>

        {/* Dock */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-2 border border-white/30 shadow-2xl">
            <div className="flex space-x-1">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className="group relative"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all duration-200`}>
                    <div className="text-white">
                      {app.icon}
                    </div>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {app.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isOSMode) {
    return renderOSMode();
  }

  return (
    <div className="text-foreground vintage-neon-bg min-h-screen relative">
      {/* Mode Switcher */}
      <div className="fixed top-4 left-4 z-50 bg-background border-2 border-border rounded-sm p-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <Globe className="w-4 h-4 text-foreground" />
          <Switch
            checked={isOSMode}
            onCheckedChange={setIsOSMode}
          />
          <Smartphone className="w-4 h-4 text-foreground" />
        </div>
      </div>

      <Hero />
      
      {/* Connect Section */}
      <section className="py-16 border-b-2 neon-border-secondary relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-headline font-bold text-primary mb-4 uppercase tracking-wide border-b-4 border-t-4 border-border py-4 inline-block px-8">
              CONNECTIONS & CORRESPONDENCE
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto mt-8 font-serif italic">
              Professional networks and communication channels for the modern era
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {links.map((link, index) => (
              <div key={index} className="bg-card border-2 border-border p-4 text-center hover:bg-muted transition-all duration-300 group shadow-sm">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-8 h-8 flex items-center justify-center mb-2 text-accent">
                    {link.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {link.name}
                  </h3>
                  <p className="text-xs text-secondary mt-1 font-mono">
                    {link.description}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Projects />
      <OpenSource />
      <Interests />
      <Bento />
    </div>
  );
};

export default Index;