
import React, { useEffect, useRef, useState } from "react";
import {
  Webchat,
  WebchatProvider,
  getClient
} from '@botpress/webchat';
import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";
import { Mail, Phone, MapPin } from "lucide-react";

export const ChatbotSection = () => {
  const clientId = "ca828dc5-427b-4fd9-8106-d244cfe7c85a";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWebchatInitialized, setIsWebchatInitialized] = useState(false);
  
  // Initialize the Botpress client with just the clientId
  const client = getClient({
    clientId
  });

  // Configuration avec des valeurs optimisées pour la performance et l'esthétique
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
    color: "#FFD700", // Couleur or pour un aspect premium
    variant: "solid" as const,
    themeMode: "dark" as const, // Mode sombre pour un rendu premium
    fontFamily: "inter" as const,
    fontSize: "medium" as const,
    showConversationButton: true,
    showCloseButton: true,
    hideWidget: false,
    disableAnimations: false,
    enableConversationDeletion: true,
    enableTranscriptDownload: true,
    stylesheet: `
      /* Style premium pour le chatbot */
      .bpw-chat-bubble-content {
        background-color: rgba(30, 30, 30, 0.8) !important;
        border: 1px solid rgba(255, 215, 0, 0.3) !important;
        backdrop-filter: blur(10px) !important;
        color: white !important;
      }
      .bpw-from-bot .bpw-chat-bubble .bpw-chat-bubble-content {
        background-color: rgba(20, 20, 20, 0.8) !important;
      }
      .bpw-from-user .bpw-chat-bubble .bpw-chat-bubble-content {
        background-color: rgba(40, 40, 40, 0.8) !important;
      }
      .bpw-date-container {
        color: rgba(255, 215, 0, 0.6) !important;
      }
      .bpw-composer {
        background-color: rgba(30, 30, 30, 0.8) !important;
        backdrop-filter: blur(10px) !important;
        border-top: 1px solid rgba(255, 215, 0, 0.3) !important;
      }
      .bpw-composer textarea {
        color: white !important;
        background-color: rgba(50, 50, 50, 0.5) !important;
        border: 1px solid rgba(255, 215, 0, 0.2) !important;
        padding: 8px !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      .bpw-composer textarea::placeholder {
        color: rgba(255, 255, 255, 0.6) !important;
      }
      .bpw-header-container {
        background-color: rgba(20, 20, 20, 0.9) !important;
        backdrop-filter: blur(10px) !important;
        border-bottom: 1px solid rgba(255, 215, 0, 0.3) !important;
      }
      .bpw-header-name {
        color: rgba(255, 215, 0, 0.9) !important;
        font-weight: bold !important;
      }
      .bpw-header-subtitle {
        color: rgba(255, 255, 255, 0.8) !important;
      }
      .bpw-widget-container {
        border: 1px solid rgba(255, 215, 0, 0.3) !important;
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.2) !important;
      }
      .bpw-send-button {
        background-color: rgba(255, 215, 0, 0.8) !important;
        color: black !important;
      }
      .bpw-send-button:hover {
        background-color: rgba(255, 215, 0, 1) !important;
      }
      .bpw-typing-group {
        background-color: rgba(255, 215, 0, 0.2) !important;
      }
      .bpw-message-read-icon {
        color: rgba(255, 215, 0, 0.7) !important;
      }
      /* Amélioration du défilement */
      .bpw-chat-container::-webkit-scrollbar {
        width: 6px;
      }
      .bpw-chat-container::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
      }
      .bpw-chat-container::-webkit-scrollbar-thumb {
        background: rgba(255, 215, 0, 0.3);
        border-radius: 3px;
      }
      .bpw-chat-container::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 215, 0, 0.5);
      }
      /* Styles fixes pour assurer que les éléments du chat sont visibles */
      .bpw-chat-container {
        display: flex !important;
        flex-direction: column !important;
        opacity: 1 !important;
      }
      .bpw-composer {
        display: flex !important;
        opacity: 1 !important;
      }
      .bpw-composer textarea {
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
    `,
    radius: 1
  };

  // Force le rechargement du chatbot quand il est visible
  useEffect(() => {
    const initializeWebchat = () => {
      // Force re-render for webchat if not already initialized
      if (!isWebchatInitialized) {
        setIsWebchatInitialized(true);
        console.log("Webchat initialized");
      }
    };

    if (containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              initializeWebchat();
              
              // Ajouter un délai pour s'assurer que le chatbot est complètement chargé
              setTimeout(() => {
                // Sélectionner tous les éléments de chatbot pour s'assurer qu'ils sont visibles
                const chatElements = document.querySelectorAll(".bpw-chat-container, .bpw-composer");
                chatElements.forEach(el => {
                  (el as HTMLElement).style.display = "flex";
                  (el as HTMLElement).style.opacity = "1";
                });
                
                // Focus sur le textarea pour s'assurer que le clignotement du curseur est visible
                const textarea = document.querySelector(".bpw-composer textarea") as HTMLTextAreaElement;
                if (textarea) {
                  textarea.style.opacity = "1";
                  textarea.style.visibility = "visible";
                }
                
                console.log("Chatbot elements enforced visibility");
              }, 1000);
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
  }, [isWebchatInitialized]);

  // Section contact pour afficher les informations de contact
  const ContactSection = () => (
    <div id="contact" className="pt-20 pb-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gradient-gold">Contact</span>
        </h2>
        <p className="text-alpha-gray text-lg max-w-2xl mx-auto mb-8">
          N'hésitez pas à nous contacter pour toute demande d'information
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col items-center bg-alpha-black/30 backdrop-blur-md border border-alpha-gold/10 rounded-xl p-6 w-full md:w-auto min-w-[250px] hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all duration-300">
          <Mail className="text-alpha-gold mb-4 h-8 w-8" />
          <h3 className="text-alpha-white font-medium mb-1">Email</h3>
          <a 
            href="mailto:professe84@gmail.com" 
            className="text-alpha-gray hover:text-alpha-gold transition-colors"
          >
            professe84@gmail.com
          </a>
        </div>

        <div className="flex flex-col items-center bg-alpha-black/30 backdrop-blur-md border border-alpha-gold/10 rounded-xl p-6 w-full md:w-auto min-w-[250px] hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all duration-300">
          <Phone className="text-alpha-gold mb-4 h-8 w-8" />
          <h3 className="text-alpha-white font-medium mb-1">Téléphone</h3>
          <a 
            href="tel:+22790307168" 
            className="text-alpha-gray hover:text-alpha-gold transition-colors"
          >
            +227 90307168
          </a>
        </div>

        <div className="flex flex-col items-center bg-alpha-black/30 backdrop-blur-md border border-alpha-gold/10 rounded-xl p-6 w-full md:w-auto min-w-[250px] hover:shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all duration-300">
          <MapPin className="text-alpha-gold mb-4 h-8 w-8" />
          <h3 className="text-alpha-white font-medium mb-1">Adresse</h3>
          <span className="text-alpha-gray">Niamey, Niger</span>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section 
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
        </motion.div>
        
        <motion.div 
          className="relative rounded-xl overflow-hidden shadow-[0_0_25px_rgba(255,215,0,0.3)] border-2 border-alpha-gold/30 mx-auto bg-black/50 backdrop-blur-md"
          style={{ width: "100%", maxWidth: "800px", height: "500px" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {isWebchatInitialized && (
            <WebchatProvider client={client} configuration={configuration}>
              <div className="w-full h-full relative webchat-container">
                <Webchat />
              </div>
            </WebchatProvider>
          )}
          
          {!isWebchatInitialized && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-alpha-gold/50 border-t-alpha-gold rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-alpha-gold font-medium">Chargement de l'assistant IA...</p>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Section de contact avec les informations demandées */}
        <ContactSection />
      </div>
    </section>
  );
};
