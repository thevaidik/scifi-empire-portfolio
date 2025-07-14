
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Rocket, Globe, Users } from "lucide-react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", Icon: Star, label: "About", path: "/" },
    { id: "projects", Icon: Rocket, label: "Projects", path: "/#projects" },
    { id: "social", Icon: Users, label: "Connect", path: "/#social" },
    { id: "bento", Icon: Globe, label: "Bento", path: "/#bento" },
  ];

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 py-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#404042]/80 backdrop-blur-lg rounded-full px-6 py-3 border border-[#777779]/50 shadow-lg"
      >
        <ul className="flex space-x-8">
          {navItems.map(({ id, Icon, label, path }) => (
            <li key={id}>
              <a
                href={path}
                className={`flex items-center space-x-2 text-sm transition-colors ${
                  activeSection === id
                    ? "text-[#E8E8EA] font-medium"
                    : "text-[#B8B8BA] hover:text-white"
                }`}
                onClick={(e) => {
                  if (path.includes("#")) {
                    e.preventDefault();
                    setActiveSection(id);
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navigation;
