
import { motion } from 'framer-motion';

export const VideoSection = () => {
  return (
    <motion.div 
      className="w-full relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '177.778%' }}>
        <iframe 
          allow="fullscreen;autoplay" 
          allowFullScreen 
          height="100%" 
          src="https://streamable.com/e/ukzowm?autoplay=1&muted=1&nocontrols=1&loop=1" 
          width="100%" 
          style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0', top: '0', overflow: 'hidden' }}
          title="Alpha Digital Presentation"
        >
        </iframe>
      </div>
    </motion.div>
  );
};
