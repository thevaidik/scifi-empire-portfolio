
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Interests from "@/components/Interests";
import Projects from "@/components/Projects";
import SocialLinks from "@/components/SocialLinks";
import Bento from "@/components/Bento";

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
      className="text-foreground overflow-hidden relative bg-gradient-to-br from-slate-800 via-gray-700/80 to-slate-900 min-h-screen"
    >
      <Navigation />
      <Hero />
      <Interests />
      <Projects />
      <SocialLinks />
      <Bento />
    </motion.div>
  );
};

export default Index;
