
import { useEffect, useRef } from "react";

// Define the Botpress window interface
declare global {
  interface Window {
    botpressWebChat: {
      init: (config: any) => void;
      onEvent: (event: string, handler: Function) => void;
      sendEvent: (payload: any) => void;
    };
  }
}

export const ChatbotSection = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Initialize Botpress Web Chat
    if (window.botpressWebChat) {
      window.botpressWebChat.init({
        containerEl: chatContainerRef.current,
        hideWidget: true,
        showConversationButtons: true,
        enableTranscriptDownload: false,
        composerPlaceholder: "Posez votre question ici...",
        stylesheet: 'https://webchat-styler-css.botpress.app/prod/code/54639cce-52d1-44e0-9d2d-60967a100d01/v19044/style.css'
      });
      
      // Open the chat once it's ready
      window.botpressWebChat.onEvent('LIFECYCLE.LOADED', () => {
        console.log('Botpress chat loaded successfully');
      });
    } else {
      console.error('Botpress Web Chat is not available');
      
      // Try to initialize again if scripts load later
      const checkInterval = setInterval(() => {
        if (window.botpressWebChat) {
          clearInterval(checkInterval);
          window.botpressWebChat.init({
            containerEl: chatContainerRef.current,
            hideWidget: true,
            enableTranscriptDownload: false,
            showConversationButtons: true,
            composerPlaceholder: "Posez votre question ici...",
            stylesheet: 'https://webchat-styler-css.botpress.app/prod/code/54639cce-52d1-44e0-9d2d-60967a100d01/v19044/style.css'
          });
        }
      }, 1000);
      
      // Clean up interval if component unmounts
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
          <div 
            ref={chatContainerRef}
            className="w-full h-full"
            style={{ overflowY: "auto" }}
          ></div>
        </div>
      </div>
    </section>
  );
};
