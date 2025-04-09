
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { SoundCloudPlayer } from './SoundCloudPlayer';
import { Music, Headphones, WavesIcon } from 'lucide-react';
import gsap from 'gsap';

export const AudioPortfolioSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  // Effets visuels audio
  const audioVisualizer = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Animation pseudo-visualiseur audio
    if (audioVisualizer.current) {
      const bars = audioVisualizer.current.querySelectorAll('.audio-bar');
      
      bars.forEach((bar) => {
        const height = 20 + Math.random() * 40;
        gsap.to(bar, {
          height: `${height}px`,
          duration: 0.5 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random()
        });
      });
    }
  }, []);

  const tracks = [
    {
      url: "https://soundcloud.com/alpha-digital-niger/lumiere",
      title: "Lumière"
    },
    {
      url: "https://soundcloud.com/alpha-digital-niger/allo-pharmacie-hymne",
      title: "Allô pharmacie hymne"
    },
    {
      url: "https://soundcloud.com/alpha-digital-niger/hustle-vibes-alpha-digital",
      title: "Hustle Vibes"
    }
  ];
  
  // Spring animation pour un mouvement plus naturel
  const springY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    y.onChange((latest) => {
      springY.set(latest);
    });
  }, [y, springY]);

  return (
    <section id="audio-portfolio" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-alpha-black via-alpha-black/80 to-alpha-black"></div>
      
      {/* Visualiseur d'onde audio (décoratif) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div 
          ref={audioVisualizer}
          className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-center gap-1"
        >
          {[...Array(120)].map((_, i) => (
            <div 
              key={i}
              className="audio-bar w-1 h-5 bg-alpha-gold/50 rounded-t"
              style={{ height: `${5 + Math.random() * 35}px` }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-alpha-gold/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() * 0.5 + 0.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <motion.div
        ref={containerRef}
        className="max-w-5xl mx-auto relative z-10"
        style={{ opacity, y: springY }}
      >
        <div className="text-center mb-12">
          <motion.div 
            className="inline-block"
            whileInView={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="flex items-center justify-center mb-4 gap-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Headphones className="h-10 w-10 text-alpha-gold" />
              <WavesIcon className="h-8 w-8 text-alpha-gold/70" />
            </motion.div>
            
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold relative inline-block"
            >
              Notre <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500">Production Audio</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-alpha-gold/10 via-alpha-gold to-alpha-gold/10"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </h2>
          </motion.div>
          <motion.p
            className="text-alpha-gray mt-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Découvrez nos créations musicales et productions audio professionnelles développées pour nos clients.
          </motion.p>
        </div>

        <div className="space-y-6 mt-12">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Ligne verticale décorative */}
              <div className="absolute -left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-alpha-gold/0 via-alpha-gold/30 to-alpha-gold/0 hidden md:block"></div>
              
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 hidden md:block">
                <motion.div
                  className="h-10 w-10 rounded-full bg-alpha-black/70 backdrop-blur-sm flex items-center justify-center border border-alpha-gold/30"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Music className="h-5 w-5 text-alpha-gold" />
                </motion.div>
              </div>
              
              <SoundCloudPlayer url={track.url} title={track.title} />
              
              <motion.div
                className="bg-alpha-black/30 backdrop-blur-sm p-4 rounded-xl -mt-3 border border-alpha-gold/10"
                whileHover={{ y: -5, boxShadow: "0 4px 20px rgba(255,215,0,0.1)" }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-alpha-white bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-white">{track.title}</h3>
                    <p className="text-alpha-gray text-sm">Alpha Digital Niger • Production Audio Premium</p>
                  </div>
                  <motion.div 
                    className="h-8 w-8 bg-alpha-gold/10 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    <Music className="h-4 w-4 text-alpha-gold/80" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a 
            href="https://soundcloud.com/alpha-digital-niger" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-alpha-gold/10 hover:bg-alpha-gold/20 text-alpha-gold px-6 py-3 rounded-full transition-all duration-300 border border-alpha-gold/20 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255,215,0,0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Music className="h-5 w-5" />
            <span>Découvrir plus sur SoundCloud</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
