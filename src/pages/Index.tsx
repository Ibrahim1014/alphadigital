
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { AIDetectionSection } from "@/components/AIDetectionSection";
import { GalaxyBackground } from "@/components/GalaxyBackground";
import { ChatbotSection } from "@/components/ChatbotSection";
import { FloatingParticles } from "@/components/FloatingParticles";
import { CreativeAISection } from "@/components/CreativeAISection";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense, lazy } from "react";

// Extension du type Navigator pour inclure connection
interface NavigatorConnection {
  effectiveType?: string;
}

interface ExtendedNavigator extends Navigator {
  connection?: NavigatorConnection;
}

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
  
  // Vérification des performances de l'appareil et détection mobile
  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isLowEndDevice = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true;
      const extendedNavigator = navigator as ExtendedNavigator;
      const isSlowConnection = extendedNavigator.connection ? 
        extendedNavigator.connection.effectiveType === '2g' || extendedNavigator.connection.effectiveType === 'slow-2g' : false;
      
      // Mode faible performance pour mobile ou connexion lente
      setIsLowPerfMode(isMobile || isLowEndDevice || isSlowConnection);
    };
    
    checkPerformance();
  }, []);
  
  // Animation de chargement optimisée
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200); // Temps de chargement réduit
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen bg-alpha-black text-alpha-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Suspense fallback={<PremiumLoader />}>
          {!isLowPerfMode && <LazyGalaxyBackground />}
          
          {isLowPerfMode && (
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0a0a1a] to-alpha-black">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-alpha-gold/8 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-alpha-gold/8 blur-[100px] rounded-full"></div>
              </div>
            </div>
          )}
        </Suspense>
        
        {/* Particules flottantes optimisées pour mobile */}
        <FloatingParticles 
          count={isLowPerfMode ? 3 : 8} 
          color="rgba(255, 215, 0, 0.08)" 
          maxSize={isLowPerfMode ? 60 : 120} 
          minSize={isLowPerfMode ? 30 : 60} 
          blurAmount={isLowPerfMode ? "30px" : "60px"} 
          className="fixed"
          speed={isLowPerfMode ? 1 : 0.7}
        />
        
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Navbar />
          <Hero />
          <ServicesSection />
          <PortfolioSection />
          <CreativeAISection />
          <AIDetectionSection />
          <ChatbotSection />
          
          {/* Footer responsive */}
          <footer className="bg-alpha-black py-8 sm:py-10 px-4 border-t border-alpha-gold/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center sm:text-left">
                  <h3 className="text-alpha-gold font-bold text-lg mb-4">Alpha Digital</h3>
                  <p className="text-alpha-gray mb-4 text-sm sm:text-base">
                    Solutions digitales sur mesure et détection avancée des fake news propulsée par l'IA
                  </p>
                  <p className="text-sm text-alpha-gray">
                    Fondé par <span className="text-alpha-gold/90">Ibrahim Lawali</span>
                  </p>
                </div>
                
                <div className="text-center sm:text-left">
                  <h3 className="text-alpha-gold font-bold text-lg mb-4">Contact</h3>
                  <ul className="space-y-2 text-alpha-gray text-sm sm:text-base">
                    <li className="flex items-center justify-center sm:justify-start">
                      <span className="mr-2">✉️</span>
                      <a href="mailto:professe84@gmail.com" className="hover:text-alpha-gold transition-colors break-all sm:break-normal">
                        professe84@gmail.com
                      </a>
                    </li>
                    <li className="flex items-center justify-center sm:justify-start">
                      <span className="mr-2">📱</span>
                      <a href="tel:+22790307168" className="hover:text-alpha-gold transition-colors">
                        +227 90307168
                      </a>
                    </li>
                    <li className="flex items-center justify-center sm:justify-start">
                      <span className="mr-2">📍</span>
                      <span>Niamey, Niger</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center sm:text-left lg:col-span-1 sm:col-span-2 lg:col-span-1">
                  <h3 className="text-alpha-gold font-bold text-lg mb-4">Services</h3>
                  <ul className="space-y-2 text-alpha-gray text-sm sm:text-base">
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Marketing Digital</a></li>
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Site E-Premium</a></li>
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Rédaction & Création de Livres</a></li>
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Production Musicale</a></li>
                    <li><a href="#services" className="hover:text-alpha-gold transition-colors">Développement d'Applications Mobiles</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8 pt-4 border-t border-alpha-gold/10 text-center">
                <p className="text-xs sm:text-sm text-alpha-gray">
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
