
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
      title: "Rédaction & Création de Livres",
      description: "Services d'écriture et de publication de haute qualité",
      imagePath: "/lovable-uploads/baffbad0-6e74-4bf2-9f5e-a326a70543b5.png",
      direction: "up" as const,
      value: "writing"
    },
    {
      icon: Code,
      title: "Site E-Premium",
      description: "Solutions techniques sur mesure et performantes",
      imagePath: "/lovable-uploads/540d9550-89b6-4466-ad8e-0ff8d67607bc.png",
      direction: "down" as const,
      value: "development"
    },
    {
      icon: Smartphone,
      title: "Développement d'Applications Mobiles",
      description: "Applications mobiles innovantes et performantes",
      imagePath: "/lovable-uploads/540d9550-89b6-4466-ad8e-0ff8d67607bc.png",
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

  return (
    <section id="services" className="py-32 px-4 relative overflow-hidden">
      {/* Particules flottantes dorées améliorées */}
      <FloatingParticles 
        count={32} 
        color="rgba(255, 215, 0, 0.18)" 
        maxSize={140} 
        minSize={50} 
        blurAmount="60px" 
        speed={0.6}
        interactive={true}
      />
      
      {/* Orbes lumineux animés en arrière plan avec plus d'intensité */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-alpha-gold/15 blur-3xl"
            style={{
              width: `${Math.random() * 350 + 150}px`,
              height: `${Math.random() * 350 + 150}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
            }}
            animate={{
              x: [0, Math.random() * 120 - 60, 0],
              y: [0, Math.random() * 120 - 60, 0],
              scale: [1, 1.3, 1],
              opacity: [0.35, 0.7, 0.35],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
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
          onValueChange={(value) => setActiveTab(value as any)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 bg-transparent mb-28">
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
                  className="data-[state=active]:bg-alpha-gold/20 data-[state=active]:text-alpha-gold border border-alpha-gold/30 hover:bg-alpha-gold/10 transition-all duration-300 overflow-hidden relative group h-14"
                >
                  {/* Effet lumineux au hover amélioré */}
                  <motion.div 
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-alpha-gold/20 blur-xl transition-transform duration-500 ease-in-out" 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <service.icon className="mr-2 h-5 w-5" />
                  <span className="line-clamp-1">{service.title}</span>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
          
          <div className="mt-8">
            {/* Espace ajouté pour éviter le chevauchement */}
            <TabsContent value={activeTab} className="m-0">
              <ServiceDetail serviceType={activeTab} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};
