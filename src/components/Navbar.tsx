
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { AnimatedNavItem } from "./AnimatedNavItem";
import { ContactModal } from "./ContactModal";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Vérifier l'état initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détecte si l'utilisateur est sur mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Ferme le menu mobile lorsqu'un élément est cliqué
  const handleNavItemClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Ouvre la modal de contact
  const handleContactClick = () => {
    setIsOpen(false); // Ferme le menu mobile si ouvert
    setContactModalOpen(true);
  };

  // Liste des éléments de navigation
  const navItems = [
    { label: "Accueil", href: "#", action: () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleNavItemClick();
    }},
    { label: "Services", href: "#services", action: () => {
      const element = document.getElementById("services");
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth"
        });
      }
      handleNavItemClick();
    }},
    { label: "Portfolio", href: "#portfolio", action: () => {
      const element = document.getElementById("portfolio");
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth"
        });
      }
      handleNavItemClick();
    }},
    { label: "Production Audio", href: "#audio-portfolio", action: () => {
      const element = document.getElementById("audio-portfolio");
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth"
        });
      }
      handleNavItemClick();
    }},
    { label: "IA Détection", href: "#ai-detection", action: () => {
      const element = document.getElementById("ai-detection");
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth"
        });
      }
      handleNavItemClick();
    }},
    { label: "Contact", href: "#", action: handleContactClick }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 backdrop-blur-lg bg-alpha-black/80" : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} 
            className="flex items-center"
          >
            <Logo />
            <span className="ml-2 text-white font-bold text-xl">Alpha Digital</span>
          </a>

          {/* Menu de navigation desktop */}
          <ul className="hidden md:flex gap-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <AnimatedNavItem 
                  href={item.href} 
                  index={index}
                  onClick={item.action}
                >
                  {item.label}
                </AnimatedNavItem>
              </li>
            ))}
          </ul>

          {/* Bouton de menu mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center h-10 w-10"
          >
            <motion.div
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { scale: 1.2 },
                closed: { scale: 1 },
              }}
              className="relative h-6 w-6"
            >
              {isOpen ? (
                <X className="text-alpha-gold absolute top-0 left-0" />
              ) : (
                <Menu className="text-alpha-gold absolute top-0 left-0" />
              )}
            </motion.div>
          </button>

          {/* Menu mobile */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed top-[60px] left-0 right-0 bg-alpha-black/95 backdrop-blur-lg"
              >
                <ul className="flex flex-col py-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        className="block py-3 px-6 text-white hover:text-alpha-gold hover:bg-alpha-gold/10 transition-all"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.action) item.action();
                        }}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      
      {/* Modal de contact */}
      <AnimatePresence>
        {contactModalOpen && (
          <ContactModal 
            isOpen={contactModalOpen} 
            onClose={() => setContactModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};
