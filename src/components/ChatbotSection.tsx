
import React, { useEffect, useRef } from "react";
import {
  Webchat,
  WebchatProvider,
  getClient
} from '@botpress/webchat';
import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export const ChatbotSection = () => {
  const clientId = "ca828dc5-427b-4fd9-8106-d244cfe7c85a";
  const containerRef = useRef<HTMLDivElement>(null);
  
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
      title: "professe84@gmail.com",
      link: "mailto:professe84@gmail.com"
    },
    phone: {
      title: "+227 90307168",
      link: "tel:+22790307168"
    },
    termsOfService: {},
    privacyPolicy: {},
    color: "#FFD700", // Gold color for premium look
    variant: "solid" as const,
    themeMode: "dark" as const, // Dark mode for premium feel
    fontFamily: "inter" as const,
    fontSize: "medium" as const, // Ajout d'une taille de police lisible
    showConversationButton: true,
    showCloseButton: true,
    hideWidget: false,
    disableAnimations: false,
    enableConversationDeletion: true,
    enableTranscriptDownload: true,
    stylesheet: `
      .bpw-chat-bubble-content {
        background-color: rgba(50, 50, 50, 0.8) !important;
        border: 1px solid rgba(255, 215, 0, 0.2) !important;
        backdrop-filter: blur(10px) !important;
      }
      .bpw-from-bot .bpw-chat-bubble .bpw-chat-bubble-content {
        background-color: rgba(30, 30, 30, 0.8) !important;
      }
      .bpw-from-user .bpw-chat-bubble .bpw-chat-bubble-content {
        background-color: rgba(50, 50, 50, 0.8) !important;
      }
      .bpw-composer {
        background-color: rgba(30, 30, 30, 0.6) !important;
        backdrop-filter: blur(10px) !important;
        border-top: 1px solid rgba(255, 215, 0, 0.2) !important;
      }
      .bpw-composer textarea {
        color: white !important;
      }
      .bpw-header-container {
        background-color: rgba(30, 30, 30, 0.8) !important;
        backdrop-filter: blur(10px) !important;
        border-bottom: 1px solid rgba(255, 215, 0, 0.3) !important;
      }
      .bpw-widget-container {
        border: 1px solid rgba(255, 215, 0, 0.3) !important;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.2) !important;
      }
    `,
    radius: 1
  };

  // Scroll chatbot into view when mounted
  useEffect(() => {
    if (containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Force remounting of chatbot when visible
              const chatElement = containerRef.current?.querySelector(".bp-widget-web");
              if (chatElement) {
                chatElement.classList.add("chatbot-visible");
              }
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(containerRef.current);
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, []);

  return (
    <section 
      id="chatbot" 
      className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-alpha-black to-[#0f0f1a]"
      ref={containerRef}
    >
      {/* Premium gold light effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-alpha-gold/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-alpha-gold/20 blur-[100px] rounded-full"></div>
      </div>
      
      {/* Premium particles */}
      <FloatingParticles 
        count={15} 
        color="rgba(255, 215, 0, 0.15)" 
        maxSize={100} 
        minSize={40} 
        blurAmount="60px" 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Notre <span className="text-gradient-gold">Assistant</span> IA
          </h2>
          <p className="text-alpha-gray text-lg max-w-2xl mx-auto mb-4">
            Posez toutes vos questions à notre assistant virtuel pour obtenir des réponses instantanées
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-alpha-gold/80">
            <div className="flex items-center">
              <span className="mr-2">✉️</span>
              <a href="mailto:professe84@gmail.com" className="hover:text-alpha-gold transition-colors">
                professe84@gmail.com
              </a>
            </div>
            <div className="hidden md:block h-4 w-px bg-alpha-gold/30"></div>
            <div className="flex items-center">
              <span className="mr-2">📱</span>
              <a href="tel:+22790307168" className="hover:text-alpha-gold transition-colors">
                +227 90307168
              </a>
            </div>
            <div className="hidden md:block h-4 w-px bg-alpha-gold/30"></div>
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span>Niamey, Niger</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative rounded-xl overflow-hidden shadow-[0_0_25px_rgba(255,215,0,0.3)] border-2 border-alpha-gold/30 mx-auto bg-black/50 backdrop-blur-md"
          style={{ width: "100%", maxWidth: "800px", height: "500px" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <WebchatProvider client={client} configuration={configuration}>
            <div className="w-full h-full relative">
              <Webchat />
            </div>
          </WebchatProvider>
        </motion.div>
        
        <div className="text-center mt-8 text-alpha-gray/70 text-sm">
          <p>Alpha Digital, fondé par <span className="text-alpha-gold/90">Ibrahim Lawali</span> à Niamey, Niger</p>
        </div>
      </div>
    </section>
  );
};
