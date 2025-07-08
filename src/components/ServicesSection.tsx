
import { useState } from "react";
import { MessageSquare, Paintbrush, Code, Music, BookOpen, Smartphone } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { ServiceDetail } from "./ServiceDetail";
import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState<'marketing' | 'design' | 'development' | 'music' | 'writing' | 'mobile'>('marketing');
  
  // Optimisation : Définir les services en dehors du rendu pour éviter de les recréer à chaque rendu
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
      icon: BookOpen,
      title: "Rédaction & Livres",
      description: "Services d'écriture et de publication de haute qualité",
      // Nouvelle image pour Rédaction & Livres
      imagePath: "/lovable-uploads/9619a51b-2520-437c-a026-211e644a4aab.png",
      direction: "up" as const,
      value: "writing"
    },
    {
      icon: Code,
      title: "Site Premium",
      description: "Solutions techniques sur mesure et performantes",
      // Nouvelle image pour Site Premium
      imagePath: "/lovable-uploads/de58a503-0a9c-4e7b-a01c-dfbc3021fda1.png",
      direction: "down" as const,
      value: "development"
    },
    {
      icon: Smartphone,
      title: "Apps Mobiles",
      description: "Applications mobiles innovantes et performantes",
      imagePath: "/lovable-uploads/478e3aaa-5e0e-41c2-a27a-c2826179cf80.png",
      direction: "down" as const,
      value: "mobile"
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

  // Optimisation : Réduire le nombre de particules et d'effets pour améliorer les performances
  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden">
      <FloatingParticles 
        count={12} // Réduction du nombre de particules
        color="rgba(255, 215, 0, 0.12)" 
        maxSize={100} 
        minSize={40} 
        blurAmount="60px" 
        speed={0.6}
        interactive={true}
      />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Réduction du nombre d'effets d'arrière-plan */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-alpha-gold/10 blur-3xl"
            style={{
              width: `${Math.random() * 250 + 150}px`,
              height: `${Math.random() * 250 + 150}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 20, // Ralentissement des animations
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            animate={{ 
              textShadow: ["0px 0px 10px rgba(255,215,0,0.2)", "0px 0px 15px rgba(255,215,0,0.3)", "0px 0px 10px rgba(255,215,0,0.2)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Nos <span className="text-gradient-gold">Services</span>
          </motion.h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de services digitaux pour transformer votre présence en ligne
          </p>
        </AnimatedSection>
        
        <Tabs 
          defaultValue="marketing" 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 bg-transparent mb-12 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <TabsTrigger 
                  value={service.value}
                  className="data-[state=active]:bg-alpha-gold/30 data-[state=active]:text-white border border-alpha-gold/50 hover:bg-alpha-gold/20 transition-all duration-300 overflow-hidden relative group h-14 w-full text-sm text-gray-900 data-[state=active]:border-alpha-gold"
                >
                  <motion.div 
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-alpha-gold/20 blur-xl transition-transform duration-500 ease-in-out" 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <service.icon className="mr-2 h-4 w-4" />
                  <span className="line-clamp-1">{service.title}</span>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value={activeTab} className="m-0">
              <ServiceDetail serviceType={activeTab} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};
