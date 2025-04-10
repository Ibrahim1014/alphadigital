
import { motion } from 'framer-motion';

export const VideoSection = () => {
  return (
    <motion.div 
      className="w-full relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video 
        className="w-full h-auto" 
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="auto"
      >
        <source 
          src="https://res.cloudinary.com/dlmb5u7jd/video/upload/v1744253431/0123_2_o3qhju.mp4" 
          type="video/mp4" 
        />
        Votre navigateur ne supporte pas la lecture de vidéos HTML5.
      </video>
    </motion.div>
  );
};
