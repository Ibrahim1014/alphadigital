
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface AnimatedNavItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  index?: number;
}

export const AnimatedNavItem = ({ href, children, onClick, index = 0 }: AnimatedNavItemProps) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  
  // Vérification de la section active au scroll
  useEffect(() => {
    const checkActive = () => {
      if (href === "#") {
        setIsActive(window.scrollY < 100);
        return;
      }
      
      const hash = href.substring(1);
      const element = document.getElementById(hash);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        // Section considérée comme active si elle est visible dans le viewport
        const isVisible = rect.top <= 200 && rect.bottom >= 200;
        setIsActive(isVisible);
      }
    };
    
    window.addEventListener('scroll', checkActive);
    checkActive(); // Vérification initiale
    
    return () => window.removeEventListener('scroll', checkActive);
  }, [href]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
      return; // Si un gestionnaire personnalisé est fourni, on s'arrête là
    }
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      // Animation de défilement fluide
      window.scrollTo({
        top: element.offsetTop - 80, // 80px pour compenser la hauteur de la navbar
        behavior: "smooth"
      });
      
      // Mettre à jour l'URL avec le hash sans déclencher de rechargement
      window.history.pushState(null, "", href);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <a
        href={href}
        onClick={handleClick}
        className={`relative group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          isActive 
            ? "text-alpha-gold" 
            : "text-white/80 hover:text-alpha-gold"
        }`}
      >
        <motion.span
          className="absolute inset-0 rounded-lg bg-alpha-gold/5"
          initial={false}
          animate={{
            scale: isActive ? 1 : 0.95,
            opacity: isActive ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span 
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-alpha-gold"
            layoutId="activeTab"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </a>
    </motion.div>
  );
};
