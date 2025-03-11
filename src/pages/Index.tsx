
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
      className="bg-transparent text-[#333] overflow-hidden relative"
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
      <section className="py-20 bg-gradient-to-b from-transparent to-[#A9AAAB]/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-4">
            <a
              href="#tools"
              className="block w-full px-8 py-4 rounded-lg bg-[#B8B9BA]/20 border border-[#9F9EA1]/50 text-[#333] hover:bg-[#B8B9BA]/30 transition-all duration-300 text-center"
            >
              Explore My Tools
            </a>
            <a
              href="#companies"
              className="block w-full px-8 py-4 rounded-lg bg-[#A9AAAB]/40 border border-[#D1D2D4]/20 text-[#333] hover:bg-[#A9AAAB]/60 transition-all duration-300 text-center"
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
