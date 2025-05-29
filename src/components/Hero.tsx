
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current || !badgeRef.current) return;
    
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    timeline.fromTo(badgeRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    );

    timeline.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    timeline.fromTo(subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );

    timeline.fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <FloatingParticles 
        count={30}
        color="rgba(255, 215, 0, 0.08)"
        maxSize={100}
        minSize={30}
        speed={0.5}
      />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
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
        ))}
      </div>
      
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
        }}
      >
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-alpha-gold/10 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-alpha-gold/10 blur-3xl" />
      </motion.div>

      <motion.div 
        className="container px-4 mx-auto relative z-10"
        style={{ y, opacity }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            ref={badgeRef} 
            className="inline-flex items-center px-5 py-2.5 rounded-full glass-gold mb-10"
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [0, -10, 0],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.span 
              className="text-alpha-gold text-sm font-medium"
              animate={{
                textShadow: [
                  "0px 0px 5px rgba(255, 215, 0, 0.3)",
                  "0px 0px 10px rgba(255, 215, 0, 0.4)",
                  "0px 0px 5px rgba(255, 215, 0, 0.3)"
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Bienvenue chez Alpha Digital
            </motion.span>
          </motion.div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-8 opacity-0">
            Votre Partenaire pour
            <motion.span 
              className="text-gradient-gold block mt-4"
              animate={{
                textShadow: [
                  "0px 0px 5px rgba(255, 215, 0, 0.2)",
                  "0px 0px 10px rgba(255, 215, 0, 0.3)",
                  "0px 0px 5px rgba(255, 215, 0, 0.2)"
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              l'Innovation Numérique
            </motion.span>
          </h1>
          
          <p ref={subtitleRef} className="text-alpha-gray text-xl md:text-2xl mb-12 opacity-0 leading-relaxed">
            Solutions digitales sur mesure et détection avancée des fake news propulsée par l'IA
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-alpha-black group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Commencer
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-alpha-gold"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(255, 215, 0, 0.3)",
                      "0 0 20px rgba(255, 215, 0, 0.4)",
                      "0 0 10px rgba(255, 215, 0, 0.3)"
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto glass hover:glass-gold transition-all duration-300"
              >
                En Savoir Plus
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[40vh]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,215,0,0.1) 0%, rgba(0,0,0,0) 70%)",
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0])
        }}
      />
    </div>
  );
};
