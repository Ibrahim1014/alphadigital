
import { useEffect, useRef } from "react";

export const ChatbotSection = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // S'assurer que le script Botpress est chargé et initialisé
    const initializeBot = () => {
      if (window.botpress) {
        window.botpress.on("webchat:ready", () => {
          window.botpress.open();
        });
      }
    };
    
    // Si le script est déjà chargé, initialiser le bot
    if (window.botpress) {
      initializeBot();
    } else {
      // Si le script n'est pas encore chargé, attendre et vérifier régulièrement
      const checkInterval = setInterval(() => {
        if (window.botpress) {
          clearInterval(checkInterval);
          initializeBot();
        }
      }, 500);

      // Nettoyer l'intervalle si le composant est démonté
      return () => clearInterval(checkInterval);
    }
  }, []);
  
  return (
    <section id="chatbot" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-alpha-black to-[#0f0f1a]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Notre <span className="text-gradient-gold">Assistant</span> IA
          </h2>
          <p className="text-alpha-gray text-lg max-w-2xl mx-auto">
            Posez toutes vos questions à notre assistant virtuel pour obtenir des réponses instantanées
          </p>
        </div>
        
        <div 
          className="relative rounded-lg overflow-hidden shadow-xl border-2 border-alpha-gold/20 mx-auto" 
          style={{ width: "100%", maxWidth: "800px", height: "500px" }}
        >
          <div 
            id="webchat" 
            ref={chatContainerRef}
            className="w-full h-full"
          ></div>
        </div>
      </div>
    </section>
  );
};

// Déclaration pour TypeScript
declare global {
  interface Window {
    botpress: any;
  }
}
