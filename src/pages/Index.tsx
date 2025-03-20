
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AIDetectionSection } from "@/components/AIDetectionSection";
import { GalaxyBackground } from "@/components/GalaxyBackground";
import { ChatbotSection } from "@/components/ChatbotSection";
import { FloatingParticles } from "@/components/FloatingParticles";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Animation de chargement au premier affichage de la page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen bg-alpha-black text-alpha-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-alpha-gold">Chargement...</div>}>
          <GalaxyBackground />
        </Suspense>
        
        {/* Particules flottantes globales pour tout le site */}
        <FloatingParticles 
          count={10} 
          color="rgba(255, 215, 0, 0.1)" 
          maxSize={150} 
          minSize={80} 
          blurAmount="80px" 
          className="fixed"
          speed={0.5}
        />
        
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Navbar />
          <Hero />
          <ServicesSection />
          <PortfolioSection />
          <AIDetectionSection />
          <ChatbotSection />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
