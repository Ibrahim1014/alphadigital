
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export const Logo = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline.fromTo(imageRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 }
    ).fromTo(logoRef.current?.querySelector('.logo-glow'),
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.5"
    );
  }, []);

  // Animation interactive au survol
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(logoRef.current?.querySelector('.logo-glow'), {
        opacity: 0.8,
        scale: 1.1,
        duration: 0.3
      });
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
      
      gsap.to(logoRef.current?.querySelector('.logo-glow'), {
        opacity: 0.5,
        scale: 1,
        duration: 0.5
      });
    }
  };

  return (
    <motion.div 
      ref={logoRef} 
      className="relative w-48 h-12 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="logo-glow absolute inset-0 bg-gradient-gold opacity-0 blur-lg"
        animate={{
          filter: isHovered 
            ? ["blur(15px)", "blur(20px)", "blur(15px)"] 
            : ["blur(10px)", "blur(15px)", "blur(10px)"],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        ref={imageRef}
        src="/lovable-uploads/b2ba0c84-8bcb-4eee-a5f4-8362e102af1d.png"
        alt="Alpha Digital"
        className="w-full h-full object-contain relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      
      {isHovered && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-alpha-gold/30"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20],
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 1 + 0.5,
                ease: "easeOut",
                delay: Math.random() * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
