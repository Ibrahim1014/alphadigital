
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface SoundCloudPlayerProps {
  url: string;
  title?: string;
}

export const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ url, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Référence pour contrôler l'iframe SoundCloud via l'API
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const glowControls = useAnimationControls();
  
  // Effet de pulsation pour le contour doré
  useEffect(() => {
    const pulseAnimation = async () => {
      while (true) {
        await glowControls.start({
          boxShadow: "0 0 15px rgba(255,215,0,0.4)",
          transition: { duration: 1.5 }
        });
        await glowControls.start({
          boxShadow: "0 0 5px rgba(255,215,0,0.2)",
          transition: { duration: 1.5 }
        });
      }
    };
    
    if (isPlaying) {
      pulseAnimation();
    } else {
      glowControls.stop();
      glowControls.set({ boxShadow: isHovered ? "0 0 10px rgba(255,215,0,0.3)" : "none" });
    }
  }, [isPlaying, isHovered, glowControls]);
  
  useEffect(() => {
    // Fonction pour initialiser le widget SoundCloud
    const setupWidget = () => {
      if (iframeRef.current && window.SC) {
        widgetRef.current = window.SC.Widget(iframeRef.current);
        
        // Écouter les événements du lecteur
        widgetRef.current.bind(window.SC.Events.PLAY, () => {
          setIsPlaying(true);
        });
        
        widgetRef.current.bind(window.SC.Events.PAUSE, () => {
          setIsPlaying(false);
        });
        
        widgetRef.current.bind(window.SC.Events.FINISH, () => {
          setIsPlaying(false);
        });
        
        widgetRef.current.bind(window.SC.Events.READY, () => {
          setIsLoaded(true);
        });
      }
    };
    
    // Vérifier si l'API SC est disponible
    if (window.SC) {
      setupWidget();
    } else {
      // Si l'API n'est pas encore chargée, attendre qu'elle le soit
      const checkSC = setInterval(() => {
        if (window.SC) {
          clearInterval(checkSC);
          setupWidget();
        }
      }, 100);
      
      return () => clearInterval(checkSC);
    }
  }, []);
  
  const togglePlay = () => {
    if (widgetRef.current) {
      if (isPlaying) {
        widgetRef.current.pause();
      } else {
        widgetRef.current.play();
      }
    }
  };
  
  const toggleMute = () => {
    if (widgetRef.current) {
      if (isMuted) {
        widgetRef.current.setVolume(100);
      } else {
        widgetRef.current.setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[140px] mb-6 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0.9, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Overlay de contrôle premium */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-between px-4 backdrop-blur-sm bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div 
          className="h-12 w-12 rounded-full bg-alpha-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-alpha-gold/40"
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          animate={{
            borderColor: isPlaying ? "rgba(255,215,0,0.8)" : "rgba(255,215,0,0.4)"
          }}
        >
          {isPlaying ? 
            <Pause className="h-6 w-6 text-alpha-gold" /> : 
            <Play className="h-6 w-6 text-alpha-gold ml-1" />
          }
        </motion.div>
        
        <div className="flex items-center space-x-3">
          <motion.div 
            className="h-10 w-10 rounded-full bg-alpha-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-alpha-gold/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
          >
            {isMuted ? 
              <VolumeX className="h-5 w-5 text-alpha-gold" /> : 
              <Volume2 className="h-5 w-5 text-alpha-gold" />
            }
          </motion.div>
          
          {title && (
            <motion.div 
              className="py-2 px-4 rounded-full bg-alpha-black/70 backdrop-blur-sm text-sm text-alpha-gold border border-alpha-gold/30 flex items-center gap-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Music className="h-4 w-4" />
              <span>{title}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Effet de brillance sur le contour */}
      <motion.div 
        className="absolute inset-0 rounded-xl border border-alpha-gold/30 overflow-hidden"
        animate={glowControls}
      />
      
      {/* Indicateur de lecture */}
      {isPlaying && (
        <motion.div 
          className="absolute bottom-4 right-4 h-3 w-3 rounded-full bg-alpha-gold z-20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Overlay de chargement */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-alpha-black/50 backdrop-blur-sm rounded-xl z-30">
          <div className="w-8 h-8 border-2 border-alpha-gold rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}
      
      {/* SoundCloud iframe */}
      <div className="w-full h-full bg-alpha-black/50 backdrop-blur-md rounded-xl overflow-hidden border border-alpha-gold/20">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${url}&color=%23FFD700&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
          frameBorder="0"
          title={title || "SoundCloud Player"}
          loading="lazy"
          className="w-full h-full"
        ></iframe>
      </div>
    </motion.div>
  );
};
