
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Code, BookOpen, Music, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";
import { AudioPortfolioSection } from "./AudioPortfolioSection";

export const PortfolioSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

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
      id: "marketing",
      title: "Marketing Digital",
      description: "Stratégies innovantes pour accroître votre visibilité en ligne",
      icon: Code,
      image: "/lovable-uploads/ef069826-012b-44c8-a477-c1c1c9274659.png",
    },
    {
      id: "mobile",
      title: "Développement d'Applications Mobiles",
      description: "Interface native et performances exceptionnelles",
      icon: Smartphone,
      image: "/lovable-uploads/478e3aaa-5e0e-41c2-a27a-c2826179cf80.png",
    },
    {
      id: "writing",
      title: "Rédaction & Création de Livres",
      description: "Publications professionnelles et percutantes",
      icon: BookOpen,
      image: "/lovable-uploads/9ecb88f6-585b-45f6-a29f-745c0ba9d792.png",
    },
    {
      id: "music",
      title: "Production Audio",
      description: "Sound design et musique originale",
      icon: Music,
      image: "/lovable-uploads/5f324228-39e9-4c4c-ac5d-6a6f8db60f4f.png",
    },
  ];

  // Fonction pour afficher le projet sélectionné
  const handleViewProject = (projectId: string) => {
    setSelectedProject(projectId === selectedProject ? null : projectId);
    
    // Scroll vers la section des détails du projet après une courte animation
    setTimeout(() => {
      const detailsElement = document.getElementById("project-details");
      if (detailsElement) {
        window.scrollTo({
          top: detailsElement.offsetTop - 120,
          behavior: "smooth"
        });
      }
    }, 100);
  };

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
                    className={`group-hover:bg-alpha-gold group-hover:text-alpha-black transition-all duration-300 ${selectedProject === project.id ? 'bg-alpha-gold/30 text-alpha-gold' : ''}`}
                    onClick={() => handleViewProject(project.id)}
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

        {/* Section de détails du projet */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              id="project-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 overflow-hidden"
            >
              <motion.div 
                className="relative glass border border-alpha-gold/20 rounded-xl p-6"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", damping: 15 }}
              >
                {/* Ligne décorative */}
                <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-alpha-gold to-transparent" />
                
                {/* Contenu du projet sélectionné */}
                {selectedProject === "music" && (
                  <div>
                    <h3 className="text-2xl font-bold text-alpha-gold mb-8 text-center">
                      Notre Production Audio
                    </h3>
                    <AudioPortfolioSection />
                  </div>
                )}
                
                {selectedProject === "writing" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-alpha-gold mb-4">Rédaction & Création de Livres</h3>
                      <p className="text-alpha-gray mb-4">
                        Notre service de rédaction et de création de livres vous offre une expertise complète pour transformer vos idées en œuvres littéraires professionnelles.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>Rédaction de livres et d'ebooks</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>Édition et publication assistée</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>Création de couvertures professionnelles</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="hover:bg-alpha-gold hover:text-alpha-black">
                        En savoir plus
                      </Button>
                    </div>
                    <div className="flex justify-center items-center">
                      <motion.img
                        src="/lovable-uploads/9ecb88f6-585b-45f6-a29f-745c0ba9d792.png"
                        alt="Rédaction & Création de Livres"
                        className="max-w-full rounded-lg shadow-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                  </div>
                )}
                
                {selectedProject === "marketing" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-alpha-gold mb-4">Marketing Digital</h3>
                      <p className="text-alpha-gray mb-4">
                        Notre agence vous propose des services de marketing digital pour optimiser votre visibilité en ligne et augmenter votre conversion.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>Stratégie de contenu personnalisée</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>SEO & Référencement</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>Campagnes publicitaires ciblées</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="hover:bg-alpha-gold hover:text-alpha-black">
                        En savoir plus
                      </Button>
                    </div>
                    <div className="flex justify-center items-center">
                      <motion.img
                        src="/lovable-uploads/ef069826-012b-44c8-a477-c1c1c9274659.png"
                        alt="Marketing Digital"
                        className="max-w-full rounded-lg shadow-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                  </div>
                )}
                
                {selectedProject === "mobile" && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-alpha-gold mb-4">Développement d'Applications Mobiles</h3>
                      <p className="text-alpha-gray mb-4">
                        Nous développons des applications mobiles performantes et intuitives pour iOS et Android, parfaitement adaptées à vos besoins.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>Applications natives et multiplateforme</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>Interface utilisateur premium</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-alpha-gold">✦</span>
                          <span>Maintenance et support continu</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="hover:bg-alpha-gold hover:text-alpha-black">
                        En savoir plus
                      </Button>
                    </div>
                    <div className="flex justify-center items-center">
                      <motion.img
                        src="/lovable-uploads/478e3aaa-5e0e-41c2-a27a-c2826179cf80.png"
                        alt="Développement d'Applications Mobiles"
                        className="max-w-full rounded-lg shadow-lg"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Bouton de fermeture */}
                <div className="mt-8 text-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSelectedProject(null)}
                    className="text-alpha-gray hover:text-alpha-gold"
                  >
                    Fermer les détails
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
