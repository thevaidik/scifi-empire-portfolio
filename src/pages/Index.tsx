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
        <section className="py-16 bg-ios-card backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary mb-4">
                CONNECT
              </h2>
              <p className="text-secondary text-lg max-w-2xl mx-auto mt-6">
                Professional networks and communication channels
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {links.map((link, index) => (
                <div key={index} className="bg-ios-card backdrop-blur-md p-4 text-center hover:scale-105 transition-all duration-300 group rounded-2xl border border-white/10">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-2 text-accent">
                      {link.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-primary">
                      {link.name}
                    </h3>
                    <p className="text-xs text-secondary mt-1">
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
        <div className="min-h-screen bg-gradient-to-br from-ios-bg to-ios-secondary">
          {/* Status Bar */}
          <div className="h-12 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <span className="ml-2">Verizon</span>
            </div>
            <span>9:41 AM</span>
            <div className="flex items-center space-x-1">
              <span>100%</span>
              <div className="w-6 h-3 border border-white rounded-sm">
                <div className="w-full h-full bg-green-500 rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-ios-card/80 backdrop-blur-md p-4 flex items-center">
            <button
              onClick={handleBackToHome}
              className="text-blue-500 font-medium"
            >
              ← Home
            </button>
            <h1 className="flex-1 text-center font-semibold text-primary">
              {app?.name}
            </h1>
          </div>

          {/* App Content */}
          <div className="flex-1">
            {app?.component}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-ios-bg to-ios-secondary">
        {/* Status Bar */}
        <div className="h-12 bg-black/20 backdrop-blur-md flex items-center justify-between px-4 text-white text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <span className="ml-2">Verizon</span>
          </div>
          <span>9:41 AM</span>
          <div className="flex items-center space-x-1">
            <span>100%</span>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-full h-full bg-green-500 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Home Screen */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              THE VAIDIK POST
            </h1>
            <p className="text-white/70">Apple Systems Developer</p>
          </div>

          {/* App Grid */}
          <div className="grid grid-cols-4 gap-6 max-w-sm mx-auto">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className="flex flex-col items-center group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-2 shadow-lg group-active:scale-95 transition-transform`}>
                  <div className="text-white">
                    {app.icon}
                  </div>
                </div>
                <span className="text-xs text-white font-medium text-center">
                  {app.name}
                </span>
              </button>
            ))}
          </div>

          {/* Dock */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2 flex space-x-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
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
    <div className="text-foreground bg-gradient-to-br from-ios-bg to-ios-secondary min-h-screen relative">
      {/* Mode Switcher */}
      <div className="fixed top-4 left-4 z-50 bg-ios-card/80 backdrop-blur-sm rounded-full p-3 border border-white/10">
        <div className="flex items-center space-x-3">
          <Globe className="w-4 h-4 text-primary" />
          <Switch
            checked={isOSMode}
            onCheckedChange={setIsOSMode}
          />
          <Smartphone className="w-4 h-4 text-primary" />
        </div>
      </div>

      <HangingSign />
      <Hero />
      
      {/* Connect Section */}
      <section className="py-16 bg-ios-card/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              CONNECT
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto mt-6">
              Professional networks and communication channels
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {links.map((link, index) => (
              <div key={index} className="bg-ios-card backdrop-blur-md p-4 text-center hover:scale-105 transition-all duration-300 group rounded-2xl border border-white/10">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <div className="w-8 h-8 flex items-center justify-center mb-2 text-accent">
                    {link.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-primary">
                    {link.name}
                  </h3>
                  <p className="text-xs text-secondary mt-1">
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