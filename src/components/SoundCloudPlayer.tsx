
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

// Define the SoundCloud API types
interface SCWidget {
  bind: (event: string, callback: () => void) => void;
  play: () => void;
  pause: () => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
}

interface SoundCloudAPI {
  Widget: {
    Events: {
      READY: string;
      PLAY: string;
      PAUSE: string;
      FINISH: string;
    };
    (iframe: HTMLIFrameElement): SCWidget;
  };
}

// Function to dynamically load the SoundCloud API
const loadSoundCloudAPI = (): Promise<void> => {
  return new Promise((resolve) => {
    // Check if window.SC is already defined
    if (window.SC) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

interface SoundCloudPlayerProps {
  url: string;
  title?: string;
}

export const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ url, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidget | null>(null);
  const glowControls = useAnimationControls();
  
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
    let isMounted = true;
    
    const setupWidget = async () => {
      try {
        await loadSoundCloudAPI();
        
        if (!isMounted || !iframeRef.current || !window.SC) return;
        
        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;
        
        widget.bind(window.SC.Widget.Events.READY, () => {
          setIsLoaded(true);
        });
        
        widget.bind(window.SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
        });
        
        widget.bind(window.SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false);
        });
        
        widget.bind(window.SC.Widget.Events.FINISH, () => {
          setIsPlaying(false);
        });
      } catch (error) {
        console.error("Erreur lors de l'initialisation du lecteur SoundCloud:", error);
      }
    };
    
    setupWidget();
    
    return () => {
      isMounted = false;
    };
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
      
      <motion.div 
        className="absolute inset-0 rounded-xl border border-alpha-gold/30 overflow-hidden"
        animate={glowControls}
      />
      
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
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-alpha-black/50 backdrop-blur-sm rounded-xl z-30">
          <div className="w-8 h-8 border-2 border-alpha-gold rounded-full animate-spin border-t-transparent"></div>
        </div>
      )}
      
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
