
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

export const HuggingFaceMusicGenerator = () => {
  return (
    <div className="space-y-6">
      <div className="text-alpha-gray text-sm mb-4 p-4 glass-premium rounded-lg">
        <p>La composition musicale par IA peut prendre quelques instants. Notre service utilise l'IA de pointe de HuggingFace pour créer des mélodies uniques basées sur vos descriptions.</p>
      </div>
      
      <div className="glass-premium rounded-xl overflow-hidden">
        <div className="bg-alpha-gold/10 py-3 px-4 flex items-center border-b border-alpha-gold/20">
          <Music2 className="w-5 h-5 text-alpha-gold mr-2" />
          <h3 className="text-alpha-gold font-medium">AlphaMusic IA - Générateur de musique</h3>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-1 sm:p-2 w-full flex justify-center"
        >
          <iframe 
            src="https://huggingface.co/spaces/facebook/MusicGen" 
            className="w-full rounded-lg border border-alpha-gold/10"
            height="620px"
            title="Alpha Digital - Générateur de musique IA"
            loading="lazy"
            aria-label="Générateur de musique par IA HuggingFace"
          />
        </motion.div>
      </div>
      
      <div className="text-center text-alpha-gray text-sm">
        <p>Créez des compositions musicales uniques pour accompagner vos projets multimédias.</p>
        <p className="text-xs mt-1 text-alpha-gray/80">Propulsé par Facebook MusicGen via HuggingFace</p>
      </div>
    </div>
  );
};
