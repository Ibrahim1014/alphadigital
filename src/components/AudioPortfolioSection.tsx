
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SoundCloudPlayer } from './SoundCloudPlayer';
import { Music, Headphones } from 'lucide-react';
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

  return (
    <section id="audio-portfolio" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-alpha-gold/5 to-transparent opacity-40"></div>
      
      {/* Particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
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
        style={{ opacity, y }}
      >
        <div className="text-center mb-12">
          <motion.div className="inline-block">
            <Headphones className="h-10 w-10 mx-auto mb-4 text-alpha-gold" />
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold relative inline-block"
            >
              Notre <span className="text-gradient-gold">Production Audio</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-[2px] bg-alpha-gold/30"
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

        <div className="space-y-8 mt-12">
          {tracks.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                <motion.div
                  className="h-8 w-8 rounded-full bg-alpha-black/70 backdrop-blur-sm flex items-center justify-center border border-alpha-gold/30"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Music className="h-4 w-4 text-alpha-gold" />
                </motion.div>
              </div>
              
              <SoundCloudPlayer url={track.url} title={track.title} />
              
              <motion.div
                className="bg-alpha-black/30 backdrop-blur-sm p-4 rounded-xl mt-2 border border-alpha-gold/10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-alpha-white">{track.title}</h3>
                <p className="text-alpha-gray text-sm">Alpha Digital Niger • Production Audio Premium</p>
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
          <a 
            href="https://soundcloud.com/alpha-digital-niger" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-alpha-gold/10 hover:bg-alpha-gold/20 text-alpha-gold px-6 py-3 rounded-full transition-all duration-300 border border-alpha-gold/20 backdrop-blur-sm"
          >
            <Music className="h-5 w-5" />
            <span>Découvrir plus sur SoundCloud</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
