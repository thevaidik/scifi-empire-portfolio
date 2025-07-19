
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
      className="text-white overflow-hidden relative bg-gradient-to-br from-blue-100/30 via-slate-50/20 to-blue-200/20 min-h-screen"
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
