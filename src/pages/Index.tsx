import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import Bento from "@/components/Bento";
import HangingSign from "@/components/HangingSign";
import { Github, Twitter, Youtube, Linkedin, Mail, BookOpen, Monitor, Newspaper, Code, Users, Heart, Info, Briefcase, Coffee } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const [isOSMode, setIsOSMode] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [showWifiMenu, setShowWifiMenu] = useState(false);
  const [showBatteryMenu, setShowBatteryMenu] = useState(false);
  const [openNote, setOpenNote] = useState<string | null>(null);

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
      icon: <Github className="h-4 w-4" />
    },
    {
      name: "Twitter",
      url: "https://twitter.com/thevaidik_", 
      icon: <Twitter className="h-4 w-4" />
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@thevaidik_",
      icon: <Youtube className="h-4 w-4" />
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/vaidikxx",
      icon: <Linkedin className="h-4 w-4" />
    },
    {
      name: "Medium",
      url: "https://medium.com/@thevaidik",
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      name: "Email",
      url: "mailto:vaidik50000@gmail.com",
      icon: <Mail className="h-4 w-4" />
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
        <div className="min-h-screen relative" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif'
        }}>
          {/* Mode Switcher - Always visible */}
          <div className="fixed top-6 left-6 z-50 bg-gray-900/80 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-white/20 shadow-2xl">
            <div className="flex items-center space-x-3">
              <Newspaper className="w-4 h-4 text-gray-300" />
              <Switch
                checked={isOSMode}
                onCheckedChange={setIsOSMode}
              />
              <Monitor className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          {/* Menu Bar */}
          <div className="h-7 bg-gray-900/30 backdrop-blur-2xl flex items-center justify-between px-4 text-white text-[13px] font-medium border-b border-white/10">
            <div className="flex items-center space-x-5">
              <span className="text-lg">🍎</span>
              <span className="font-semibold">{app?.name}</span>
              <span className="text-white/70 hover:text-white cursor-pointer transition">File</span>
              <span className="text-white/70 hover:text-white cursor-pointer transition">Edit</span>
              <span className="text-white/70 hover:text-white cursor-pointer transition">View</span>
              <span className="text-white/70 hover:text-white cursor-pointer transition">Window</span>
              <span className="text-white/70 hover:text-white cursor-pointer transition">Help</span>
            </div>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="relative">
                <button 
                  onClick={() => setShowBatteryMenu(!showBatteryMenu)}
                  className="text-sm hover:bg-white/10 px-2 py-1 rounded transition"
                >
                  🔋
                </button>
                {showBatteryMenu && (
                  <div className="absolute right-0 top-8 bg-gray-800/95 backdrop-blur-xl rounded-lg p-4 shadow-2xl border border-white/10 w-64 text-sm">
                    <div className="text-white/90 mb-2">Battery</div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/70">Power Source:</span>
                      <span className="text-white">Power Adapter</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Charge:</span>
                      <span className="text-white">100%</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowWifiMenu(!showWifiMenu)}
                  className="text-sm hover:bg-white/10 px-2 py-1 rounded transition"
                >
                  📶
                </button>
                {showWifiMenu && (
                  <div className="absolute right-0 top-8 bg-gray-800/95 backdrop-blur-xl rounded-lg p-4 shadow-2xl border border-white/10 w-64 text-sm">
                    <div className="text-white/90 mb-3">Wi-Fi</div>
                    <div className="flex items-center space-x-2 bg-blue-500/20 p-2 rounded mb-2">
                      <span className="text-blue-400">✓</span>
                      <span className="text-white">Mars WiFi</span>
                    </div>
                    <div className="text-white/50 text-xs mt-2">Other Networks...</div>
                  </div>
                )}
              </div>
              <span className="text-xs">Thu 9:41 AM</span>
            </div>
          </div>

          {/* Window */}
          <div className="p-6 pt-8">
            <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-black/10 min-h-[calc(100vh-140px)] overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-gray-50 to-gray-100/50 border-b border-gray-200/80">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBackToHome}
                    className="w-3 h-3 bg-[#ff5f57] rounded-full hover:bg-[#ff4b42] transition-colors shadow-sm flex items-center justify-center group"
                  >
                    <span className="text-[8px] text-black/40 opacity-0 group-hover:opacity-100">×</span>
                  </button>
                  <button className="w-3 h-3 bg-[#ffbd2e] rounded-full hover:bg-[#ffaa00] transition-colors shadow-sm flex items-center justify-center group">
                    <span className="text-[8px] text-black/40 opacity-0 group-hover:opacity-100">−</span>
                  </button>
                  <button className="w-3 h-3 bg-[#28c840] rounded-full hover:bg-[#1fb832] transition-colors shadow-sm flex items-center justify-center group">
                    <span className="text-[8px] text-black/40 opacity-0 group-hover:opacity-100">⤢</span>
                  </button>
                </div>
                <h1 className="font-medium text-gray-700 text-[13px] tracking-tight absolute left-1/2 transform -translate-x-1/2">
                  {app?.name}
                </h1>
                <div className="w-16"></div>
              </div>

              {/* App Content */}
              <div className="overflow-auto max-h-[calc(100vh-200px)]">
                {app?.component}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen relative" style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif'
      }}>
        
        {/* Mode Switcher - Always visible */}
        <div className="fixed top-6 left-6 z-50 bg-gray-900/80 backdrop-blur-xl rounded-xl px-4 py-2.5 border border-white/20 shadow-2xl">
          <div className="flex items-center space-x-3">
            <Newspaper className="w-4 h-4 text-gray-300" />
            <Switch
              checked={isOSMode}
              onCheckedChange={setIsOSMode}
            />
            <Monitor className="w-4 h-4 text-blue-400" />
          </div>
        </div>

        {/* Menu Bar */}
        <div className="h-7 bg-gray-900/30 backdrop-blur-2xl flex items-center justify-between px-4 text-white text-[13px] font-medium border-b border-white/10">
          <div className="flex items-center space-x-5">
            <span className="text-lg">🍎</span>
            <span className="font-semibold">Finder</span>
            <span className="text-white/70 hover:text-white cursor-pointer transition">File</span>
            <span className="text-white/70 hover:text-white cursor-pointer transition">Edit</span>
            <span className="text-white/70 hover:text-white cursor-pointer transition">View</span>
            <span className="text-white/70 hover:text-white cursor-pointer transition">Go</span>
            <span className="text-white/70 hover:text-white cursor-pointer transition">Window</span>
            <span className="text-white/70 hover:text-white cursor-pointer transition">Help</span>
          </div>
          <div className="flex items-center space-x-4 text-white/90">
            <div className="relative">
              <button 
                onClick={() => setShowBatteryMenu(!showBatteryMenu)}
                className="text-sm hover:bg-white/10 px-2 py-1 rounded transition"
              >
                🔋
              </button>
              {showBatteryMenu && (
                <div className="absolute right-0 top-8 bg-gray-800/95 backdrop-blur-xl rounded-lg p-4 shadow-2xl border border-white/10 w-64 text-sm">
                  <div className="text-white/90 mb-2">Battery</div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70">Power Source:</span>
                    <span className="text-white">Power Adapter</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Charge:</span>
                    <span className="text-white">100%</span>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowWifiMenu(!showWifiMenu)}
                className="text-sm hover:bg-white/10 px-2 py-1 rounded transition"
              >
                📶
              </button>
              {showWifiMenu && (
                <div className="absolute right-0 top-8 bg-gray-800/95 backdrop-blur-xl rounded-lg p-4 shadow-2xl border border-white/10 w-64 text-sm">
                  <div className="text-white/90 mb-3">Wi-Fi</div>
                  <div className="flex items-center space-x-2 bg-blue-500/20 p-2 rounded mb-2">
                    <span className="text-blue-400">✓</span>
                    <span className="text-white">Mars WiFi</span>
                  </div>
                  <div className="text-white/50 text-xs mt-2">Other Networks...</div>
                </div>
              )}
            </div>
            <span className="text-xs">Thu 9:41 AM</span>
          </div>
        </div>

        {/* Desktop */}
        <div className="flex-1 p-12 pt-20">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-semibold text-white mb-3 drop-shadow-lg" style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              THE VAIDIK POST
            </h1>
            <p className="text-white/90 text-xl drop-shadow-md">macOS Developer Workspace</p>
          </div>
        </div>

        {/* Dock */}
        <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/10 backdrop-blur-2xl rounded-[22px] px-3 py-2 border border-white/20 shadow-2xl" style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}>
            <div className="flex space-x-2">
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  className="group relative"
                >
                  <div className={`w-[60px] h-[60px] rounded-[14px] bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg transition-all duration-200 ease-out group-hover:-translate-y-2 group-hover:scale-110 group-active:scale-95`}
                       style={{
                         boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                       }}>
                    <div className="text-white drop-shadow-lg">
                      {app.icon}
                    </div>
                  </div>
                  
                  {/* Active indicator */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800/95 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none"
                       style={{
                         boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                       }}>
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

  const notes = [
    {
      id: 'about',
      title: 'THE VAIDIK PROJECT',
      preview: 'Apple Systems Developer and Maker - iOS, macOS dev, also playing with Rust...',
      date: 'Nov 28',
      component: <Hero />
    },
    {
      id: 'connect',
      title: 'Connect',
      preview: 'Professional networks and communication channels',
      date: 'Nov 27',
      component: (
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-3 text-foreground">
            Connect
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Professional networks and communication channels
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="text-primary">
                  {link.icon}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'projects',
      title: 'Current Events & Projects',
      preview: 'Recent work and ongoing initiatives - nxtlap.com, Briefly RSS reader...',
      date: 'Nov 26',
      component: <Projects />
    },
    {
      id: 'interests',
      title: 'Technical Interests',
      preview: 'Areas of focus and exploration - iOS Development, Consciousness & Bicameral Mind...',
      date: 'Nov 25',
      component: <Interests />
    },
    {
      id: 'opensource',
      title: 'Open Source Activity',
      preview: 'Recent contributions to open-source projects',
      date: 'Nov 24',
      component: <OpenSource />
    },
    {
      id: 'collaborate',
      title: "Let's Collaborate",
      preview: 'Building the future, one project at a time',
      date: 'Nov 23',
      component: <Bento />
    }
  ];

  if (openNote) {
    const note = notes.find(n => n.id === openNote);
    return (
      <div className="min-h-screen bg-background">
        {/* Mode Switcher */}
        <div className="fixed top-4 left-4 z-50 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center gap-3">
            <Newspaper className="w-4 h-4 text-muted-foreground" />
            <Switch
              checked={isOSMode}
              onCheckedChange={setIsOSMode}
            />
            <Monitor className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Note Header */}
        <div className="bg-card border-b border-border sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setOpenNote(null)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="text-xl">‹</span>
              <span className="text-sm font-medium">Notes</span>
            </button>
            <div className="flex-1"></div>
            <span className="text-sm text-muted-foreground">{note?.date}</span>
          </div>
        </div>

        {/* Note Content */}
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="bg-card rounded-xl shadow-lg overflow-hidden">
            {note?.component}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mode Switcher */}
      <div className="fixed top-4 left-4 z-50 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <Newspaper className="w-4 h-4 text-muted-foreground" />
          <Switch
            checked={isOSMode}
            onCheckedChange={setIsOSMode}
          />
          <Monitor className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Notes Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-sm text-muted-foreground mt-1">{notes.length} notes</p>
        </div>
      </div>

      {/* Notes List */}
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="space-y-3">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setOpenNote(note.id)}
              className="w-full bg-card rounded-xl shadow-[var(--note-shadow)] hover:shadow-[var(--note-shadow-hover)] transition-all duration-200 p-5 text-left border border-transparent hover:border-primary/20"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-lg font-semibold text-foreground">{note.title}</h2>
                <span className="text-xs text-muted-foreground">{note.date}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{note.preview}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;