
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

// Extension du type Navigator pour inclure connection
declare global {
  interface Navigator {
    connection?: {
      effectiveType?: string;
    };
  }
}

// Lazy load des composants lourds pour améliorer les performances
const LazyGalaxyBackground = lazy(() => import("@/components/GalaxyBackground").then(module => ({ default: module.GalaxyBackground })));

// Composant de chargement simple pour mobile
const MobileLoader = () => (
  <div className="flex items-center justify-center h-screen w-full bg-white">
    <div className="text-center">
      <div className="w-12 h-12 border-2 border-alpha-gold rounded-full animate-spin border-t-transparent mx-auto mb-4"></div>
      <span className="text-alpha-gold text-sm font-bold">ALPHA DIGITAL</span>
    </div>
  </div>
);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Détection mobile simplifiée
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Chargement optimisé pour mobile
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, isMobile ? 500 : 200); // Plus de temps pour mobile
    
    return () => clearTimeout(loadTimer);
  }, [isMobile]);
  
  // Si pas encore chargé, afficher le loader
  if (!isLoaded) {
    return <MobileLoader />;
  }
  
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Arrière-plan optimisé */}
      {!isMobile ? (
        <Suspense fallback={null}>
          <LazyGalaxyBackground />
        </Suspense>
      ) : (
        // Arrière-plan statique pour mobile
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/3 bg-alpha-gold/5 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/3 bg-alpha-gold/3 blur-[100px] rounded-full"></div>
          </div>
        </div>
      )}
      
      {/* Particules réduites pour mobile */}
      {!isMobile && (
        <FloatingParticles 
          count={6} 
          color="rgba(255, 215, 0, 0.06)" 
          maxSize={80} 
          minSize={40} 
          blurAmount="40px" 
          className="fixed"
          speed={1.2}
          interactive={false}
        />
      )}
      
      {/* Contenu principal avec animations simplifiées pour mobile */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isMobile ? 0.3 : 0.5 }}
      >
        <Navbar />
        
        {/* Sections avec espacement optimisé mobile */}
        <div className="space-y-0">
          <Hero />
          
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <ServicesSection />
          </motion.div>
          
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.6, delay: isMobile ? 0 : 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <PortfolioSection />
          </motion.div>
          
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.6, delay: isMobile ? 0 : 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <AIDetectionSection />
          </motion.div>
          
          <motion.div
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.2 : 0.6, delay: isMobile ? 0 : 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <ChatbotSection />
          </motion.div>
        </div>
        
        {/* Footer responsive */}
        <footer className="bg-gray-100 py-8 sm:py-10 px-4 border-t border-alpha-gold/20 mt-0">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center sm:text-left">
                <h3 className="text-alpha-gold font-bold text-lg mb-4">Alpha Digital</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                  Solutions digitales sur mesure et détection avancée des fake news propulsée par l'IA
                </p>
                <p className="text-sm text-gray-600">
                  Fondé par <span className="text-alpha-gold/90">Ibrahim Lawali</span>
                </p>
              </div>
              
              <div className="text-center sm:text-left">
                <h3 className="text-alpha-gold font-bold text-lg mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
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
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li><a href="#services" className="hover:text-alpha-gold transition-colors">Marketing Digital</a></li>
                  <li><a href="#services" className="hover:text-alpha-gold transition-colors">Site E-Premium</a></li>
                  <li><a href="#services" className="hover:text-alpha-gold transition-colors">Rédaction & Création de Livres</a></li>
                  <li><a href="#services" className="hover:text-alpha-gold transition-colors">Production Musicale</a></li>
                  <li><a href="#services" className="hover:text-alpha-gold transition-colors">Développement d'Applications Mobiles</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 pt-4 border-t border-alpha-gold/20 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                © {new Date().getFullYear()} Alpha Digital. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default Index;
