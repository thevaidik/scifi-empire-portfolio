import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme as "light" | "dark");
    // Add dark class for dark mode, remove for light mode
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    // Add dark class for dark mode, remove for light mode
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 neon-border bg-card text-primary hover:neon-glow-accent transition-all duration-300 font-serif text-xs uppercase tracking-widest text-glow"
      aria-label="Toggle theme"
    >
      <div className="flex items-center gap-1">
        {theme === "dark" ? (
          <>
            <Sun className="w-3 h-3" />
            <span className="hidden md:inline">Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-3 h-3" />
            <span className="hidden md:inline">Dark Mode</span>
          </>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;