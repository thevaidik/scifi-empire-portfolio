
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import OpenSource from "@/components/OpenSource";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Tools from "@/components/Tools";
import { motion } from "framer-motion";

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-scifi-dark text-white overflow-hidden"
    >
      <Navigation />
      <Hero />
      <Interests />
      <OpenSource />
      <Projects />
      <Blog />
      <Tools />
      
      {/* Action Buttons Section */}
      <section className="py-20 bg-gradient-to-b from-scifi-dark to-black">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-4">
            <a
              href="#tools"
              className="block w-full px-8 py-4 rounded-lg bg-scifi-primary/20 border border-scifi-primary/50 text-white hover:bg-scifi-primary/30 transition-all duration-300 text-center"
            >
              Explore My Tools
            </a>
            <a
              href="#companies"
              className="block w-full px-8 py-4 rounded-lg bg-scifi-dark/50 border border-scifi-light/20 text-white hover:bg-scifi-dark/70 transition-all duration-300 text-center"
            >
              Interesting Companies
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
