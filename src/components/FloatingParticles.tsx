
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
}

export const FloatingParticles = ({
  count = 20,
  color = "rgba(255, 215, 0, 0.2)",
  maxSize = 80,
  minSize = 30,
  blurAmount = "40px",
  opacity = 0.3,
  className = "",
}: FloatingParticleProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const newParticles = Array(count)
      .fill(null)
      .map((_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      }));

    setParticles(newParticles);
  }, [count, maxSize, minSize]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
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
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, Math.random() * 0.4 + 0.8, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
