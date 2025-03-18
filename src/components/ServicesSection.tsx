
import { useState } from "react";
import { MessageSquare, Paintbrush, Code, Music } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { ServiceDetail } from "./ServiceDetail";
import { motion } from "framer-motion";

export const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<'marketing' | 'design' | 'development' | 'music'>('marketing');
  
  const services = [
    {
      icon: MessageSquare,
      title: "Marketing Digital",
      description: "Stratégies innovantes pour accroître votre visibilité en ligne",
      imagePath: "/lovable-uploads/ef069826-012b-44c8-a477-c1c1c9274659.png",
      direction: "left" as const,
      value: "marketing"
    },
    {
      icon: Paintbrush,
      title: "Conception Graphique",
      description: "Designs créatifs et professionnels qui captivent votre audience",
      imagePath: "/lovable-uploads/5466acc5-b12f-432b-9120-7200f22cb17b.png",
      direction: "up" as const,
      value: "design"
    },
    {
      icon: Code,
      title: "Développement Web & Mobile",
      description: "Solutions techniques sur mesure et performantes",
      imagePath: "/lovable-uploads/540d9550-89b6-4466-ad8e-0ff8d67607bc.png",
      direction: "down" as const,
      value: "development"
    },
    {
      icon: Music,
      title: "Production Musicale",
      description: "Création sonore unique pour vos projets multimédia",
      imagePath: "/lovable-uploads/5f324228-39e9-4c4c-ac5d-6a6f8db60f4f.png",
      direction: "right" as const,
      value: "music"
    }
  ];

  return (
    <section id="services" className="py-20 px-4 relative">
      {/* Ajout d'orbes lumineux animés en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-alpha-gold/20 blur-3xl"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            animate={{ 
              textShadow: ["0px 0px 15px rgba(255,215,0,0.3)", "0px 0px 30px rgba(255,215,0,0.7)", "0px 0px 15px rgba(255,215,0,0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Nos <span className="text-gradient-gold">Services</span>
          </motion.h2>
          <p className="text-alpha-gray text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de services digitaux pour transformer votre présence en ligne
          </p>
        </AnimatedSection>
        
        <Tabs 
          defaultValue="marketing" 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'marketing' | 'design' | 'development' | 'music')}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent mb-12">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <TabsTrigger 
                  value={service.value}
                  className="data-[state=active]:bg-alpha-gold/20 data-[state=active]:text-alpha-gold border border-alpha-gold/30 hover:bg-alpha-gold/10 transition-all duration-300 overflow-hidden relative group"
                >
                  {/* Effet lumineux au hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-alpha-gold/20 blur-xl transition-transform duration-700 ease-in-out" />
                  <service.icon className="mr-2 h-4 w-4" />
                  {service.title}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
          
          <div className="mt-12 pt-8">
            {/* Zone des détails de service avec marge importante pour éviter le chevauchement */}
            <TabsContent value={activeTab} className="m-0">
              <ServiceDetail serviceType={activeTab} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};
