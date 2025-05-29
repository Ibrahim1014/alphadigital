
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 150 : 350]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4">
      {/* Particules optimisées pour mobile */}
      {!isMobile && (
        <FloatingParticles 
          count={15}
          color="rgba(255, 215, 0, 0.08)"
          maxSize={80}
          minSize={30}
          speed={0.7}
          interactive={false}
        />
      )}
      
      {/* Arrière-plan animé simplifié pour mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {!isMobile ? (
          // Desktop: effets complets
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-alpha-gold/5 blur-[150px]"
              style={{
                width: `${Math.random() * 80 + 60}vw`,
                height: `${Math.random() * 80 + 60}vh`,
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 80}%`,
                zIndex: -1
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 35 + 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))
        ) : (
          // Mobile: effets statiques
          <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-alpha-gold/5 blur-3xl" />
        )}
      </div>

      <motion.div 
        className="container mx-auto relative z-10"
        style={isMobile ? {} : { y, opacity }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            ref={badgeRef} 
            className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full glass-gold mb-8 sm:mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-alpha-gold text-xs sm:text-sm font-medium">
              Bienvenue chez Alpha Digital
            </span>
          </motion.div>
          
          <motion.h1 
            ref={titleRef} 
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Votre Partenaire pour
            <span className="text-gradient-gold block mt-2 sm:mt-4">
              l'Innovation Numérique
            </span>
          </motion.h1>
          
          <motion.p 
            ref={subtitleRef} 
            className="text-alpha-gray text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Solutions digitales sur mesure et détection avancée des fake news propulsée par l'IA
          </motion.p>
          
          <motion.div 
            ref={ctaRef} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              whileHover={isMobile ? {} : { scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-alpha-black group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Commencer
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={isMobile ? {} : { scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto glass hover:glass-gold transition-all duration-300"
              >
                En Savoir Plus
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
