
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // S'assurer que la vidéo se lance correctement sur mobile
    const handleInteraction = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Erreur de lecture automatique:", error);
        });
      }
    };

    document.addEventListener('touchstart', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <motion.div 
      className="w-full relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video 
        ref={videoRef}
        className="w-full h-auto" 
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="https://drive.google.com/uc?id=1O_CAhpHa29AQa8U6tUmGETNO04_0QHK6" type="video/mp4" />
        Ton navigateur ne prend pas en charge l'élément vidéo.
      </video>
    </motion.div>
  );
};
