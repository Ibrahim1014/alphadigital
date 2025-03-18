
import { useState } from "react";
import { MessageSquare, Paintbrush, Code, Music } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { Card } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { ServiceDetail } from "./ServiceDetail";

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
    <section id="services" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nos <span className="text-gradient-gold">Services</span>
          </h2>
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
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent mb-8">
            {services.map((service, index) => (
              <TabsTrigger 
                key={index}
                value={service.value}
                className="data-[state=active]:bg-alpha-gold/20 data-[state=active]:text-alpha-gold border border-alpha-gold/30 hover:bg-alpha-gold/10 transition-all duration-300"
              >
                <service.icon className="mr-2 h-4 w-4" />
                {service.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-12">
            {services.map((service, index) => (
              <TabsContent key={index} value={service.value} className="m-0">
                <AnimatedSection
                  delay={0.1}
                  direction={service.direction}
                >
                  <Card 
                    className="glass hover:glass-gold transition-all duration-500 overflow-hidden group cursor-pointer"
                    onClick={() => setActiveTab(service.value as 'marketing' | 'design' | 'development' | 'music')}
                  >
                    <div className="relative p-6">
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                        <img
                          src={service.imagePath}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="relative z-10">
                        <div className="glass-gold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="h-6 w-6 text-alpha-gold" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-alpha-white text-center">
                          {service.title}
                        </h3>
                        <p className="text-alpha-gray text-center">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedSection>
              </TabsContent>
            ))}
          </div>
          
          {/* Détail du service sélectionné */}
          <TabsContent value={activeTab} className="m-0">
            <ServiceDetail serviceType={activeTab} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
