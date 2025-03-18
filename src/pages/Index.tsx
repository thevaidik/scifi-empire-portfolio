
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
      className="text-white overflow-hidden relative"
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
      <section className="py-20 bg-gradient-to-b from-transparent to-[#404042]/70">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="space-y-4">
            <a
              href="#tools"
              className="block w-full px-8 py-4 rounded-lg bg-[#505052]/80 border border-[#777779]/80 text-white hover:bg-[#606062] transition-all duration-300 text-center font-medium shadow-md"
            >
              Explore My Tools
            </a>
            <a
              href="#companies"
              className="block w-full px-8 py-4 rounded-lg bg-[#606062]/80 border border-[#888889]/60 text-white hover:bg-[#707072] transition-all duration-300 text-center font-medium shadow-md"
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
