
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Code, BookOpen, Music, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";

export const PortfolioSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });

    timeline.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    timeline.fromTo(
      projectsRef.current?.children,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
      "-=0.4"
    );
  }, []);

  const projects = [
    {
      title: "Site E-Premium",
      description: "Design moderne et expérience utilisateur optimisée",
      icon: Code,
      image: "/lovable-uploads/540d9550-89b6-4466-ad8e-0ff8d67607bc.png",
    },
    {
      title: "Développement d'Applications Mobiles",
      description: "Interface native et performances exceptionnelles",
      icon: Smartphone,
      image: "/lovable-uploads/540d9550-89b6-4466-ad8e-0ff8d67607bc.png",
    },
    {
      title: "Rédaction & Création de Livres",
      description: "Publications professionnelles et percutantes",
      icon: BookOpen,
      image: "/lovable-uploads/baffbad0-6e74-4bf2-9f5e-a326a70543b5.png",
    },
    {
      title: "Production Audio",
      description: "Sound design et musique originale",
      icon: Music,
      image: "/lovable-uploads/5f324228-39e9-4c4c-ac5d-6a6f8db60f4f.png",
    },
  ];

  return (
    <section id="portfolio" className="py-24 px-4 relative overflow-hidden">
      <FloatingParticles 
        count={20} 
        color="rgba(255, 215, 0, 0.12)" 
        maxSize={100} 
        minSize={30} 
        speed={0.5}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef} 
            className="text-3xl md:text-4xl font-bold mb-4 opacity-0 relative inline-block"
          >
            Notre <span className="text-gradient-gold">Portfolio</span>
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-[2px] bg-alpha-gold/30"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </h2>
        </div>
        
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden glass hover:glass-gold transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                />
                <project.icon className="absolute top-4 right-4 h-6 w-6 text-alpha-gold z-20" />
              </div>
              <div className="p-6">
                <motion.h3 
                  className="text-xl font-semibold mb-2 text-alpha-white"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  className="text-alpha-gray mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                >
                  {project.description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <Button 
                    variant="outline" 
                    className="group-hover:bg-alpha-gold group-hover:text-alpha-black transition-all duration-300"
                  >
                    Voir le projet 
                    <motion.span
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
