
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface SoundCloudPlayerProps {
  url: string;
  title?: string; // Propriété title optionnelle
}

export const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ url, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Référence pour contrôler l'iframe SoundCloud via l'API
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  
  const togglePlay = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const widget = SC.Widget(iframe);
      
      if (isPlaying) {
        widget.pause();
      } else {
        widget.play();
      }
      
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const widget = SC.Widget(iframe);
      
      if (isMuted) {
        widget.setVolume(100);
      } else {
        widget.setVolume(0);
      }
      
      setIsMuted(!isMuted);
    }
  };
  
  React.useEffect(() => {
    // Charger l'API SoundCloud
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <motion.div 
      className="relative w-full h-[100px] mb-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0.9, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Overlay de contrôle premium */}
      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <motion.div 
          className="h-10 w-10 rounded-full bg-alpha-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-alpha-gold/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
        >
          {isPlaying ? 
            <Pause className="h-5 w-5 text-alpha-gold" /> : 
            <Play className="h-5 w-5 text-alpha-gold" />
          }
        </motion.div>
        
        <div className="flex items-center space-x-2">
          <motion.div 
            className="h-8 w-8 rounded-full bg-alpha-black/70 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-alpha-gold/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
          >
            {isMuted ? 
              <VolumeX className="h-4 w-4 text-alpha-gold" /> : 
              <Volume2 className="h-4 w-4 text-alpha-gold" />
            }
          </motion.div>
          
          {title && (
            <motion.div 
              className="py-1 px-3 rounded-full bg-alpha-black/70 backdrop-blur-sm text-xs text-alpha-gold border border-alpha-gold/30"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Effet de brillance sur le contour */}
      <motion.div 
        className="absolute inset-0 rounded-xl border border-alpha-gold/30 overflow-hidden"
        animate={{
          boxShadow: isHovered 
            ? ["0 0 10px rgba(255,215,0,0.2)", "0 0 20px rgba(255,215,0,0.4)", "0 0 10px rgba(255,215,0,0.2)"]
            : "none"
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* SoundCloud iframe */}
      <div className="w-full h-full bg-alpha-black/50 backdrop-blur-md rounded-xl overflow-hidden border border-alpha-gold/20">
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          allow="autoplay; encrypted-media"
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
