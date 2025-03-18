
import React from "react";
import {
  Webchat,
  WebchatProvider,
  getClient
} from '@botpress/webchat';

export const ChatbotSection = () => {
  const clientId = "ca828dc5-427b-4fd9-8106-d244cfe7c85a";
  
  // Initialize the Botpress client with just the clientId
  const client = getClient({
    clientId
  });

  // Configuration with properly typed values
  const configuration = {
    composerPlaceholder: "Que puis-je faire pour vous aujourd'hui ? (Ex: Demander des informations sur nos services)",
    botName: "Alpha Digital IA",
    botAvatar: "/lovable-uploads/baffbad0-6e74-4bf2-9f5e-a326a70543b5.png",
    botDescription: "Alpha Digital IA est un assistant virtuel polyvalent conçu pour répondre à toutes vos questions",
    website: {},
    email: {
      title: "www.alphadigital8.wordpress.com",
      link: "https://alphadigital8.wordpress.com"
    },
    phone: {
      title: "+227 90307168",
      link: "tel:+22790307168"
    },
    termsOfService: {},
    privacyPolicy: {},
    color: "#3B82F6",
    variant: "solid" as const, // Explicitly type as "solid"
    themeMode: "light" as const, // Explicitly type as "light"
    fontFamily: "inter" as const, // Explicitly type as "inter" - one of the allowed values
    radius: 1
  };

  return (
    <section id="chatbot" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-alpha-black to-[#0f0f1a]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Notre <span className="text-gradient-gold">Assistant</span> IA
          </h2>
          <p className="text-alpha-gray text-lg max-w-2xl mx-auto mb-4">
            Posez toutes vos questions à notre assistant virtuel pour obtenir des réponses instantanées
          </p>
          <p className="text-alpha-gold text-sm max-w-2xl mx-auto">
            Cliquez dans la zone de texte en bas du chat pour commencer la conversation
          </p>
        </div>
        
        <div 
          className="relative rounded-lg overflow-hidden shadow-xl border-2 border-alpha-gold/20 mx-auto bg-black/30 backdrop-blur-sm"
          style={{ width: "100%", maxWidth: "800px", height: "500px" }}
        >
          <WebchatProvider client={client} configuration={configuration}>
            <div className="w-full h-full relative">
              <Webchat />
            </div>
          </WebchatProvider>
        </div>
      </div>
    </section>
  );
};
