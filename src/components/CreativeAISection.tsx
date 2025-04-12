import { useState } from "react";
import { motion } from "framer-motion";
import { ImageGenerator } from "./ImageGenerator";
import { MusicGenerator } from "./MusicGenerator";
import { Sparkle, Image as ImageIcon, Music } from "lucide-react";

export const CreativeAISection = () => {
  const [activeTab, setActiveTab] = useState<"image" | "music">("image");

  return (
    <section id="creative-ai" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vh] bg-alpha-gold/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vh] bg-alpha-gold/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-5 py-2 rounded-full glass-gold mb-4">
            <Sparkle className="w-4 h-4 mr-2 text-alpha-gold" />
            <span className="text-alpha-gold text-sm font-medium">Création IA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Générateur Créatif</span>
          </h2>
          <p className="text-alpha-gray max-w-2xl mx-auto text-lg">
            Explorez l'intelligence artificielle pour générer des images extraordinaires et composer des mélodies uniques
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex justify-center space-x-4 mb-10">
            <motion.button
              className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                activeTab === "image" 
                  ? "bg-gradient-gold text-alpha-black font-medium" 
                  : "glass hover:glass-gold text-alpha-white"
              }`}
              onClick={() => setActiveTab("image")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Générateur d'Images
            </motion.button>
            
            <motion.button
              className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                activeTab === "music" 
                  ? "bg-gradient-gold text-alpha-black font-medium" 
                  : "glass hover:glass-gold text-alpha-white"
              }`}
              onClick={() => setActiveTab("music")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Music className="w-5 h-5 mr-2" />
              Générateur de Musique
            </motion.button>
          </div>

          <motion.div 
            className="glass-premium rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 md:p-10">
              {activeTab === "image" ? (
                <ImageGenerator />
              ) : (
                <MusicGenerator />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CreativeAISection;
