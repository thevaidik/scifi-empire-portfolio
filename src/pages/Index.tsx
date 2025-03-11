
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import OpenSource from "@/components/OpenSource";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import SocialLinks from "@/components/SocialLinks";
import Companies from "@/components/Companies";
import EarthBackground from "@/components/EarthBackground";
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
      className="bg-transparent text-white overflow-hidden relative"
    >
      <EarthBackground />
      <Navigation />
      <Hero />
      <Interests />
      <OpenSource />
      <Projects />
      <Blog />
      <SocialLinks />
      <Companies />
      
      {/* Action Buttons Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-scifi-secondary/30">
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
              className="block w-full px-8 py-4 rounded-lg bg-scifi-secondary/40 border border-scifi-light/20 text-white hover:bg-scifi-secondary/60 transition-all duration-300 text-center"
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
