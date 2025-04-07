
import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface SoundCloudPlayerProps {
  title: string;
  url: string;
}

export const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ title, url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  
  // Extraire l'ID de la piste à partir de l'URL SoundCloud
  const trackId = url.split('/').pop();
  const embedUrl = `https://w.soundcloud.com/player/?url=${url}&color=%23FFD700&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
  
  useEffect(() => {
    let widget: any = null;
    let progressInterval: NodeJS.Timeout;
    
    // Fonction pour initialiser le widget SoundCloud
    const initWidget = () => {
      if (!(window as any).SC) return;
      
      widget = (window as any).SC.Widget(document.getElementById(`soundcloud-iframe-${trackId}`));
      
      widget.bind((window as any).SC.Widget.Events.READY, () => {
        setIframeLoaded(true);
        
        widget.bind((window as any).SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
          
          // Mettre à jour la progression pendant la lecture
          progressInterval = setInterval(() => {
            widget.getPosition((position: number) => {
              widget.getDuration((duration: number) => {
                setProgress((position / duration) * 100);
              });
            });
          }, 500);
        });
        
        widget.bind((window as any).SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false);
          clearInterval(progressInterval);
        });
        
        widget.bind((window as any).SC.Widget.Events.FINISH, () => {
          setIsPlaying(false);
          setProgress(0);
          clearInterval(progressInterval);
        });
      });
    };
    
    // Charger le SDK SoundCloud s'il n'est pas déjà chargé
    if (!(window as any).SC) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      initWidget();
    }
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [url, trackId]);
  
  const handlePlayPause = () => {
    if (!iframeLoaded) return;
    
    const widget = (window as any).SC.Widget(document.getElementById(`soundcloud-iframe-${trackId}`));
    
    if (isPlaying) {
      widget.pause();
    } else {
      widget.play();
    }
  };
  
  const handleMute = () => {
    if (!iframeLoaded) return;
    
    const widget = (window as any).SC.Widget(document.getElementById(`soundcloud-iframe-${trackId}`));
    
    if (isMuted) {
      widget.setVolume(100);
    } else {
      widget.setVolume(0);
    }
    
    setIsMuted(!isMuted);
  };
  
  return (
    <Card className="overflow-hidden bg-alpha-black/50 border border-alpha-gold/20">
      <div className="relative">
        {/* Iframe caché qui communique avec l'API SoundCloud */}
        <iframe
          id={`soundcloud-iframe-${trackId}`}
          title={title}
          src={embedUrl}
          className="w-0 h-0 absolute"
        />
        
        {/* Interface utilisateur personnalisée */}
        <div className="p-3 flex items-center">
          <motion.div 
            className="w-10 h-10 rounded-full bg-alpha-gold/10 flex items-center justify-center mr-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="text-alpha-gold" size={20} />
            ) : (
              <Play className="text-alpha-gold" size={20} />
            )}
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Music className="text-alpha-gold mr-2" size={16} />
                <span className="text-alpha-white font-medium">{title}</span>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMute}
              >
                {isMuted ? (
                  <VolumeX className="text-alpha-gray" size={18} />
                ) : (
                  <Volume2 className="text-alpha-gold" size={18} />
                )}
              </motion.div>
            </div>
            
            {/* Barre de progression */}
            <div className="w-full h-1.5 bg-alpha-gold/10 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-gold"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
