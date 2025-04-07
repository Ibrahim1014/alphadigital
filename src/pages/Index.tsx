
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AIDetectionSection } from "@/components/AIDetectionSection";
import { GalaxyBackground } from "@/components/GalaxyBackground";
import { ChatbotSection } from "@/components/ChatbotSection";
import { FloatingParticles } from "@/components/FloatingParticles";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense, lazy } from "react";

// Lazy load des composants lourds pour améliorer les performances
const LazyGalaxyBackground = lazy(() => import("@/components/GalaxyBackground").then(module => ({ default: module.GalaxyBackground })));

// Composant de chargement élégant
const PremiumLoader = () => (
  <div className="flex items-center justify-center h-screen w-full bg-alpha-black">
    <div className="relative">
      <div className="w-16 h-16 border-2 border-alpha-gold rounded-full animate-spin border-t-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-alpha-gold text-xs font-bold">ALPHA</span>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLowPerfMode, setIsLowPerfMode] = useState(false);
  
  // Vérification des performances de l'appareil
  useEffect(() => {
    // Détecte si l'appareil est potentiellement à faible performance
    const checkPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true;
      setIsLowPerfMode(isMobile && isLowEndDevice);
    };
    
    checkPerformance();
  }, []);
  
  // Animation de chargement au premier affichage de la page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Optimization pour éviter les images non utilisées
    const preloadImages = () => {
      const images = [
        "/lovable-uploads/5466acc5-b12f-432b-9120-7200f22cb17b.png",
        "/lovable-uploads/5f324228-39e9-4c4c-ac5d-6a6f8db60f4f.png",
        "/lovable-uploads/b2ba0c84-8bcb-4eee-a5f4-8362e102af1d.png",
        "/lovable-uploads/baffbad0-6e74-4bf2-9f5e-a326a70543b5.png"
      ];
      
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
    
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
        <Suspense fallback={<PremiumLoader />}>
          {!isLowPerfMode && <LazyGalaxyBackground />}
          
          {isLowPerfMode && (
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0a0a1a] to-alpha-black">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-alpha-gold/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-alpha-gold/10 blur-[150px] rounded-full"></div>
              </div>
            </div>
          )}
        </Suspense>
        
        {/* Particules flottantes globales pour tout le site - moins nombreuses pour les appareils low-end */}
        <FloatingParticles 
          count={isLowPerfMode ? 5 : 10} 
          color="rgba(255, 215, 0, 0.1)" 
          maxSize={isLowPerfMode ? 80 : 150} 
          minSize={isLowPerfMode ? 40 : 80} 
          blurAmount={isLowPerfMode ? "50px" : "80px"} 
          className="fixed"
          speed={isLowPerfMode ? 0.7 : 0.5}
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
          
          {/* Footer avec informations de contact */}
          <footer className="bg-alpha-black py-10 px-4 border-t border-alpha-gold/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-alpha-gold font-bold text-lg mb-4">Alpha Digital</h3>
                  <p className="text-alpha-gray mb-4">
                    Solutions digitales sur mesure et détection avancée des fake news propulsée par l'IA
                  </p>
                  <p className="text-sm text-alpha-gray">
                    Fondé par <span className="text-alpha-gold/90">Ibrahim Lawali</span>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-alpha-gold font-bold text-lg mb-4">Contact</h3>
                  <ul className="space-y-2 text-alpha-gray">
                    <li className="flex items-center">
                      <span className="mr-2">✉️</span>
                      <a href="mailto:professe84@gmail.com" className="hover:text-alpha-gold transition-colors">
                        professe84@gmail.com
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">📱</span>
                      <a href="tel:+22790307168" className="hover:text-alpha-gold transition-colors">
                        +227 90307168
                      </a>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>Niamey, Niger</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-alpha-gold font-bold text-lg mb-4">Services</h3>
                  <ul className="space-y-2 text-alpha-gray">
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Marketing Digital</a></li>
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Site E-Premium</a></li>
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Rédaction & Création de Livres</a></li>
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Production Musicale</a></li>
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Développement d'Applications Mobiles</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-alpha-gold/10 text-center">
                <p className="text-sm text-alpha-gray">
                  © {new Date().getFullYear()} Alpha Digital. Tous droits réservés.
                </p>
              </div>
            </div>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
