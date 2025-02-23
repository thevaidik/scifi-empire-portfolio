
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Rocket, Wrench, BookOpen } from "lucide-react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", Icon: Star, label: "Home" },
    { id: "projects", Icon: Rocket, label: "Projects" },
    { id: "blog", Icon: BookOpen, label: "Blog" },
    { id: "tools", Icon: Wrench, label: "Tools" },
  ];

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 py-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/10 backdrop-blur-lg rounded-full px-6 py-3 border border-scifi-light/20"
      >
        <ul className="flex space-x-8">
          {navItems.map(({ id, Icon, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex items-center space-x-2 text-sm transition-colors ${
                  activeSection === id
                    ? "text-scifi-primary"
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
