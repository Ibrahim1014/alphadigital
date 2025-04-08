
import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface SoundCloudPlayerProps {
  title: string;
  url: string;
}

export const SoundCloudPlayer: React.FC<SoundCloudPlayerProps> = ({ title, url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Extraire l'ID de la piste à partir de l'URL SoundCloud
  const trackId = url.split('/').pop();
  const embedUrl = `https://w.soundcloud.com/player/?url=${url}&color=%23FFD700&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
  
  useEffect(() => {
    let widget: any = null;
    let progressInterval: NodeJS.Timeout;
    let loadTimeout: NodeJS.Timeout;
    
    // Fonction pour initialiser le widget SoundCloud
    const initWidget = () => {
      if (!(window as any).SC) {
        console.log("SoundCloud API not loaded yet");
        return;
      }
      
      try {
        if (!document.getElementById(`soundcloud-iframe-${trackId}`)) {
          console.log("Iframe not found in DOM");
          return;
        }
        
        widget = (window as any).SC.Widget(document.getElementById(`soundcloud-iframe-${trackId}`));
        
        widget.bind((window as any).SC.Widget.Events.READY, () => {
          console.log("SoundCloud widget ready");
          setIframeLoaded(true);
          
          widget.bind((window as any).SC.Widget.Events.PLAY, () => {
            console.log("SoundCloud play event");
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
            console.log("SoundCloud pause event");
            setIsPlaying(false);
            clearInterval(progressInterval);
          });
          
          widget.bind((window as any).SC.Widget.Events.FINISH, () => {
            console.log("SoundCloud finish event");
            setIsPlaying(false);
            setProgress(0);
            clearInterval(progressInterval);
          });
          
          widget.bind((window as any).SC.Widget.Events.ERROR, () => {
            console.log("SoundCloud error event");
            setIsError(true);
            clearInterval(progressInterval);
          });
        });
      } catch (error) {
        console.error("Error initializing SoundCloud widget:", error);
        setIsError(true);
      }
    };
    
    // Charger le SDK SoundCloud s'il n'est pas déjà chargé
    const loadSoundCloudAPI = () => {
      if (!(window as any).SC) {
        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.onload = () => {
          console.log("SoundCloud API loaded");
          initWidget();
        };
        script.onerror = () => {
          console.error("Failed to load SoundCloud API");
          setIsError(true);
        };
        document.body.appendChild(script);
      } else {
        initWidget();
      }
    };
    
    // Set a timeout to detect loading failures
    loadTimeout = setTimeout(() => {
      if (!iframeLoaded) {
        console.log("SoundCloud loading timeout");
        setIsError(true);
      }
    }, 10000);
    
    // Wait a bit to ensure iframe is in the DOM
    setTimeout(loadSoundCloudAPI, 500);
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (loadTimeout) clearTimeout(loadTimeout);
    };
  }, [url, trackId]);
  
  const handlePlayPause = () => {
    if (!iframeLoaded) {
      console.log("Cannot play/pause, iframe not loaded");
      return;
    }
    
    try {
      const widget = (window as any).SC.Widget(document.getElementById(`soundcloud-iframe-${trackId}`));
      
      if (isPlaying) {
        widget.pause();
      } else {
        widget.play();
      }
    } catch (error) {
      console.error("Error in play/pause:", error);
      setIsError(true);
    }
  };
  
  const handleMute = () => {
    if (!iframeLoaded) return;
    
    try {
      const widget = (window as any).SC.Widget(document.getElementById(`soundcloud-iframe-${trackId}`));
      
      if (isMuted) {
        widget.setVolume(100);
      } else {
        widget.setVolume(0);
      }
      
      setIsMuted(!isMuted);
    } catch (error) {
      console.error("Error toggling mute:", error);
    }
  };
  
  // Option de secours - lien direct
  const openSoundCloudLink = () => {
    window.open(url, '_blank');
  };
  
  return (
    <Card className="overflow-hidden bg-alpha-black/50 border border-alpha-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
      <div className="relative">
        {/* Iframe caché qui communique avec l'API SoundCloud */}
        <iframe
          id={`soundcloud-iframe-${trackId}`}
          ref={iframeRef}
          title={title}
          src={embedUrl}
          className="w-full h-0"
          allow="autoplay"
        />
        
        {/* Interface utilisateur personnalisée */}
        <div className="p-4 flex flex-col">
          <div className="flex items-center mb-2">
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
          
          {isError && (
            <div className="mt-3 text-center">
              <p className="text-alpha-gray text-sm mb-2">
                Le lecteur audio ne fonctionne pas correctement.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs glass-gold hover:bg-alpha-gold/20"
                onClick={openSoundCloudLink}
              >
                Écouter sur SoundCloud
              </Button>
            </div>
          )}
          
          {!iframeLoaded && !isError && (
            <div className="mt-2 flex justify-center">
              <div className="w-5 h-5 border-2 border-alpha-gold/50 border-t-alpha-gold rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
