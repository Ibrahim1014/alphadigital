
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingParticleProps {
  count?: number;
  color?: string;
  maxSize?: number;
  minSize?: number;
  blurAmount?: string;
  opacity?: number;
  className?: string;
  speed?: number;
  interactive?: boolean;
}

export const FloatingParticles = ({
  count = 20,
  color = "rgba(255, 215, 0, 0.2)",
  maxSize = 80,
  minSize = 30,
  blurAmount = "40px",
  opacity = 0.3,
  className = "",
  speed = 1,
  interactive = true,
}: FloatingParticleProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    amplitude: number;
    rotation: number;
  }>>([]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Création des particules
  useEffect(() => {
    try {
      const newParticles = Array(count)
        .fill(null)
        .map((_, index) => ({
          id: index,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (maxSize - minSize) + minSize,
          duration: (Math.random() * 20 + 10) / speed,
          delay: Math.random() * 5,
          amplitude: Math.random() * 60 + 20,
          rotation: Math.random() * 360,
        }));

      setParticles(newParticles);
    } catch (error) {
      console.error("Error creating particles:", error);
    }
  }, [count, maxSize, minSize, speed]);
  
  // Gestion de l'interactivité à la souris
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      try {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setMousePosition({ x, y });
        setIsHovering(true);
      } catch (error) {
        console.error("Error handling mouse move:", error);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [interactive]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => {
        // Calcul de la distance entre la particule et la souris (pour l'interactivité)
        const dx = interactive && isHovering ? (particle.x - mousePosition.x) / 10 : 0;
        const dy = interactive && isHovering ? (particle.y - mousePosition.y) / 10 : 0;
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: color,
              filter: `blur(${blurAmount})`,
              opacity: opacity,
              zIndex: -1,
            }}
            animate={{
              x: [
                0, 
                dx + Math.sin(particle.id) * particle.amplitude * 0.5, 
                dx - Math.cos(particle.id) * particle.amplitude * 0.3, 
                0
              ],
              y: [
                0, 
                dy + Math.cos(particle.id) * particle.amplitude * 0.5, 
                dy + Math.sin(particle.id) * particle.amplitude * 0.3, 
                0
              ],
              scale: [1, Math.random() * 0.4 + 0.8, Math.random() * 0.3 + 0.9, 1],
              rotate: [0, particle.rotation * 0.5, particle.rotation, 0],
              opacity: [opacity, opacity * 1.5, opacity * 0.8, opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
