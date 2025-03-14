
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, MessageSquare } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-alpha-black -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)] -z-10" />
      
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-gold mb-8 animate-fade-in">
            <span className="text-alpha-gold text-sm font-medium">Bienvenue chez Alpha Digital</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Votre Partenaire pour
            <span className="text-gradient-gold"> l'Innovation Numérique</span>
          </h1>
          
          <p className="text-alpha-gray text-xl mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Solutions digitales sur mesure et détection avancée des fake news propulsée par l'IA
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button size="lg" className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-alpha-black">
              Commencer <ArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto glass">
              En Savoir Plus
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {[
              {
                icon: <Zap className="h-6 w-6 text-alpha-gold" />,
                title: "Services Digitaux",
                description: "Marketing digital et développement sur mesure"
              },
              {
                icon: <Shield className="h-6 w-6 text-alpha-gold" />,
                title: "Détection IA",
                description: "Analyse avancée des contenus manipulés"
              },
              {
                icon: <MessageSquare className="h-6 w-6 text-alpha-gold" />,
                title: "Support 24/7",
                description: "Assistance IA et experts humains"
              }
            ].map((feature, index) => (
              <div key={index} className="glass hover:glass-gold transition-all duration-300 p-6 rounded-xl">
                <div className="glass-gold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-alpha-white">{feature.title}</h3>
                <p className="text-alpha-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
