
import { useEffect, useRef } from "react";

export const ChatbotSection = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Attendre que window.botpress soit disponible
    const initializeBot = () => {
      if (window.botpress) {
        window.botpress.on("webchat:ready", () => {
          window.botpress.open();
        });
        
        window.botpress.init({
          "botId": "c10be2e2-f274-46aa-b715-f57aee5a0d11",
          "configuration": {
            "composerPlaceholder": "Que puis-je faire pour vous aujourd'hui ? (Ex:Demander des informations sur nos services)",
            "botName": "Alpha Digital IA",
            "botAvatar": "https://files.bpcontent.cloud/2025/03/02/13/20250302132142-H9CZJBY6.jpeg",
            "botDescription": "Alpha Digital IA est un assistant virtuel polyvalent conçu pour répondre à toutes vos questions",
            "website": {},
            "email": {
              "title": "www.alphadigital8.wordpress.com",
              "link": "www.alphadigital8.wordpress.com"
            },
            "phone": {
              "title": "+227 90307168",
              "link": "+227 90307168"
            },
            "termsOfService": {},
            "privacyPolicy": {},
            "color": "#3B82F6",
            "variant": "solid",
            "themeMode": "light",
            "fontFamily": "inter",
            "radius": 1
          },
          "clientId": "ca828dc5-427b-4fd9-8106-d244cfe7c85a",
          "selector": "#webchat"
        });
      }
    };
    
    // S'assurer que le script est chargé
    if (window.botpress) {
      initializeBot();
    } else {
      // Si le script n'est pas encore chargé, attendre un peu
      const checkInterval = setInterval(() => {
        if (window.botpress) {
          clearInterval(checkInterval);
          initializeBot();
        }
      }, 500);
    }
    
    return () => {
      // Cleanup si nécessaire
    };
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
        
        <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-alpha-gold/20 mx-auto" style={{ width: "100%", maxWidth: "800px", height: "500px" }}>
          <div id="webchat" style={{ width: "100%", height: "100%" }}></div>
        </div>
      </div>
    </section>
  );
};

// Ajout de la déclaration pour TypeScript
declare global {
  interface Window {
    botpress: any;
  }
}
