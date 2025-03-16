
import { MessageSquare, Paintbrush, Code, Music } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { Card } from "./ui/card";

export const ServicesSection = () => {
  const { sectionRef, isInView } = useAnimatedSection();

  const services = [
    {
      icon: MessageSquare,
      title: "Marketing Digital",
      description: "Stratégies innovantes pour accroître votre visibilité en ligne",
      imagePath: "/lovable-uploads/marketing.jpg"
    },
    {
      icon: Paintbrush,
      title: "Conception Graphique",
      description: "Designs créatifs et professionnels qui captivent votre audience",
      imagePath: "/lovable-uploads/design.jpg"
    },
    {
      icon: Code,
      title: "Développement Web & Mobile",
      description: "Solutions techniques sur mesure et performantes",
      imagePath: "/lovable-uploads/development.jpg"
    },
    {
      icon: Music,
      title: "Production Musicale",
      description: "Création sonore unique pour vos projets multimédia",
      imagePath: "/lovable-uploads/music.jpg"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nos <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-alpha-gray text-lg max-w-2xl mx-auto">
            Découvrez notre gamme complète de services digitaux pour transformer votre présence en ligne
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <Card className="glass hover:glass-gold transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <img
                    src={service.imagePath}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative p-6 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-gold rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto"
                  >
                    <service.icon className="h-6 w-6 text-alpha-gold" />
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-alpha-white text-center">
                    {service.title}
                  </h3>
                  <p className="text-alpha-gray text-center">
                    {service.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
