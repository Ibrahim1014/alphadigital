
import React from "react";
import { AnimatedSection } from "./AnimatedSection";
import { Card } from "./ui/card";
import { MessageSquare, Paintbrush, Code, Music } from "lucide-react";

interface ServiceDetailProps {
  serviceType: 'marketing' | 'design' | 'development' | 'music';
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceType }) => {
  // Configurations spécifiques pour chaque type de service
  const serviceConfigs = {
    marketing: {
      title: "Marketing Digital",
      icon: MessageSquare,
      description: "Nos solutions de marketing digital sont conçues pour maximiser votre présence en ligne et générer des leads qualifiés.",
      features: [
        "Stratégie de contenu personnalisée",
        "Gestion des réseaux sociaux",
        "Campagnes publicitaires ciblées",
        "Analyse de données et optimisation",
        "Marketing par email"
      ],
      imagePath: "/lovable-uploads/ef069826-012b-44c8-a477-c1c1c9274659.png"
    },
    design: {
      title: "Conception Graphique",
      icon: Paintbrush,
      description: "Nos services de design créent une identité visuelle distinctive qui capte l'attention et renforce votre marque.",
      features: [
        "Création de logo et identité de marque",
        "Design d'interface utilisateur (UI)",
        "Création de visuels pour les réseaux sociaux",
        "Conception de matériel imprimé",
        "Illustrations personnalisées"
      ],
      imagePath: "/lovable-uploads/5466acc5-b12f-432b-9120-7200f22cb17b.png"
    },
    development: {
      title: "Développement Web & Mobile",
      icon: Code,
      description: "Nous développons des solutions digitales sur mesure qui répondent parfaitement à vos besoins métier.",
      features: [
        "Développement de sites web responsifs",
        "Création d'applications web sur mesure",
        "Développement d'applications mobiles (iOS & Android)",
        "Intégration de systèmes et API",
        "Maintenance et support technique"
      ],
      imagePath: "/lovable-uploads/540d9550-89b6-4466-ad8e-0ff8d67607bc.png"
    },
    music: {
      title: "Production Musicale",
      icon: Music,
      description: "Notre service de production musicale crée des compositions uniques pour vos projets multimédias.",
      features: [
        "Composition originale",
        "Sound design pour applications et jeux",
        "Jingles et identités sonores",
        "Mixage et mastering audio",
        "Licences musicales pour vos projets"
      ],
      imagePath: "/lovable-uploads/5f324228-39e9-4c4c-ac5d-6a6f8db60f4f.png"
    }
  };

  const config = serviceConfigs[serviceType];
  const Icon = config.icon;

  return (
    <AnimatedSection className="w-full">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/2">
          <Card className="glass p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img
                src={config.imagePath}
                alt={config.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center md:items-start">
              <div className="glass-gold rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Icon className="h-8 w-8 text-alpha-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-alpha-white">
                {config.title}
              </h3>
              <p className="text-alpha-gray mb-6">
                {config.description}
              </p>
              <ul className="space-y-2">
                {config.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-alpha-gray">
                    <span className="text-alpha-gold mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
        <div className="w-full md:w-1/2">
          <Card className="glass-gold p-6">
            <h4 className="text-xl font-semibold mb-4 text-alpha-white">
              Comment nous pouvons vous aider
            </h4>
            <p className="text-alpha-gray mb-4">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nos services de {config.title.toLowerCase()} peuvent répondre à vos besoins spécifiques.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="text-alpha-gold mr-2">✓</span>
                <span className="text-alpha-white">Solutions personnalisées</span>
              </div>
              <div className="flex items-center">
                <span className="text-alpha-gold mr-2">✓</span>
                <span className="text-alpha-white">Approche collaborative</span>
              </div>
              <div className="flex items-center">
                <span className="text-alpha-gold mr-2">✓</span>
                <span className="text-alpha-white">Expert dédié à votre projet</span>
              </div>
              <div className="flex items-center">
                <span className="text-alpha-gold mr-2">✓</span>
                <span className="text-alpha-white">Support continu</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
};
