
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Rocket, Wrench, BookOpen, Building2 } from "lucide-react";

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
    { id: "about", Icon: Star, label: "About" },
    { id: "projects", Icon: Rocket, label: "Projects" },
    { id: "companies", Icon: Building2, label: "Companies" },
    { id: "tools", Icon: Wrench, label: "Tools" },
  ];

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 py-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-scifi-secondary/30 backdrop-blur-lg rounded-full px-6 py-3 border border-scifi-light/20"
      >
        <ul className="flex space-x-8">
          {navItems.map(({ id, Icon, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex items-center space-x-2 text-sm transition-colors ${
                  activeSection === id
                    ? "text-scifi-accent"
                    : "text-white/70 hover:text-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(id);
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
