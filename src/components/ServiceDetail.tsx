import React from "react";
import { AnimatedSection } from "./AnimatedSection";
import { Card } from "./ui/card";
import { MessageSquare, Paintbrush, Code, Music, BookOpen, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { SoundCloudPlayer } from "./SoundCloudPlayer";

interface ServiceDetailProps {
  serviceType: 'marketing' | 'design' | 'development' | 'music' | 'writing' | 'mobile';
}

interface SoundCloudTrack {
  title: string;
  url: string;
}

interface ServiceConfig {
  title: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  imagePath: string;
  soundCloudTracks?: SoundCloudTrack[];
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceType }) => {
  const serviceConfigs: Record<string, ServiceConfig> = {
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
      title: "Site E-Premium",
      icon: Code,
      description: "Nous développons des sites web premium avec des fonctionnalités avancées qui dépassent les sites e-commerce classiques.",
      features: [
        "Expérience utilisateur ultra-premium",
        "Design sur mesure et animations exclusives",
        "Performance et sécurité optimales",
        "Solution e-commerce avancée",
        "Maintenance et support technique dédié"
      ],
      imagePath: "/lovable-uploads/540d9550-89b6-4466-ad8e-0ff8d67607bc.png"
    },
    mobile: {
      title: "Développement d'Applications Mobiles",
      icon: Smartphone,
      description: "Nous créons des applications mobiles innovantes qui transforment votre vision en solutions digitales performantes.",
      features: [
        "Applications iOS et Android natives",
        "Interface utilisateur intuitive et élégante",
        "Performance et fluidité optimales",
        "Intégration des dernières technologies",
        "Maintenance et mises à jour régulières"
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
      imagePath: "/lovable-uploads/5f324228-39e9-4c4c-ac5d-6a6f8db60f4f.png",
      soundCloudTracks: [
        {
          title: "Lumière",
          url: "https://soundcloud.com/spleenfrappeur/lumiere"
        },
        {
          title: "Allô Pharmacie (Hymne)",
          url: "https://soundcloud.com/spleenfrappeur/allo-pharmacie-hymne"
        },
        {
          title: "Hustle Vibes",
          url: "https://soundcloud.com/spleenfrappeur/hustle-vibes"
        }
      ]
    },
    writing: {
      title: "Rédaction & Création de Livres",
      icon: BookOpen,
      description: "Notre service d'écriture et de publication vous accompagne dans la création d'ouvrages de qualité professionnelle.",
      features: [
        "Rédaction et publication de livres & e-books",
        "Écriture de discours percutants et professionnels",
        "Révision et amélioration de manuscrits",
        "Ghostwriting pour autobiographies",
        "Conseils éditoriaux et mise en page"
      ],
      imagePath: "/lovable-uploads/baffbad0-6e74-4bf2-9f5e-a326a70543b5.png"
    }
  };

  const config = serviceConfigs[serviceType];
  const Icon = config.icon;

  const imageVariants = {
    hidden: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.6 } }
  };

  return (
    <AnimatedSection className="w-full">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/2">
          <Card className="glass p-6 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 opacity-20"
              variants={imageVariants}
              initial="hidden"
              whileHover="hover"
            >
              <img
                src={config.imagePath}
                alt={config.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="relative z-10 flex flex-col items-center md:items-start">
              <motion.div 
                className="glass-gold rounded-full w-16 h-16 flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(255,215,0,0.5)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="h-8 w-8 text-alpha-gold" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-alpha-white">
                {config.title}
              </h3>
              <p className="text-alpha-gray mb-6">
                {config.description}
              </p>
              <ul className="space-y-3">
                {config.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center text-alpha-gray"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-alpha-gold mr-2">•</span>
                    {feature}
                  </motion.li>
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
            <div className="flex flex-col space-y-4 mb-6">
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-alpha-gold mr-2">✓</span>
                <span className="text-alpha-white">Solutions personnalisées</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-alpha-gold mr-2">✓</span>
                <span className="text-alpha-white">Approche collaborative</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-alpha-gold mr-2">✓</span>
                <span className="text-alpha-white">Expert dédié à votre projet</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-alpha-gold mr-2">✓</span>
                <span className="text-alpha-white">Support continu</span>
              </motion.div>
            </div>
            
            {serviceType === 'music' && config.soundCloudTracks && (
              <div className="mt-6 space-y-4">
                <h5 className="text-lg font-semibold text-alpha-white mb-3">
                  Écoutez nos réalisations
                </h5>
                {config.soundCloudTracks.map((track, index) => (
                  <SoundCloudPlayer 
                    key={index}
                    title={track.title}
                    url={track.url} 
                  />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
};
