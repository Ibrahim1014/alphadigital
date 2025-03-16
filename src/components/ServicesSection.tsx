
import { MessageSquare, Paintbrush, Code, Music } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { Card } from "./ui/card";

export const ServicesSection = () => {
  const services = [
    {
      icon: MessageSquare,
      title: "Marketing Digital",
      description: "Stratégies innovantes pour accroître votre visibilité en ligne",
      imagePath: "/lovable-uploads/marketing.jpg",
      direction: "left" as const
    },
    {
      icon: Paintbrush,
      title: "Conception Graphique",
      description: "Designs créatifs et professionnels qui captivent votre audience",
      imagePath: "/lovable-uploads/design.jpg",
      direction: "up" as const
    },
    {
      icon: Code,
      title: "Développement Web & Mobile",
      description: "Solutions techniques sur mesure et performantes",
      imagePath: "/lovable-uploads/development.jpg",
      direction: "down" as const
    },
    {
      icon: Music,
      title: "Production Musicale",
      description: "Création sonore unique pour vos projets multimédia",
      imagePath: "/lovable-uploads/music.jpg",
      direction: "right" as const
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimatedSection
              key={index}
              delay={index * 0.2}
              direction={service.direction}
            >
              <Card className="glass hover:glass-gold transition-all duration-500 overflow-hidden group">
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
          ))}
        </div>
      </div>
    </section>
  );
};
