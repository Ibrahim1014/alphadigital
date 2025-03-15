
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Code, Paintbrush, Music } from "lucide-react";

export const PortfolioSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    timeline.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    );

    timeline.fromTo(
      projectsRef.current?.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
      "-=0.4"
    );
  }, []);

  const projects = [
    {
      title: "Site E-commerce Premium",
      description: "Design moderne et expérience utilisateur optimisée",
      icon: Code,
      image: "/lovable-uploads/project1.jpg",
    },
    {
      title: "Application Mobile",
      description: "Interface native et performances exceptionnelles",
      icon: Paintbrush,
      image: "/lovable-uploads/project2.jpg",
    },
    {
      title: "Production Audio",
      description: "Sound design et musique originale",
      icon: Music,
      image: "/lovable-uploads/project3.jpg",
    },
  ];

  return (
    <section id="portfolio" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 opacity-0">
            Notre <span className="text-gradient-gold">Portfolio</span>
          </h2>
        </div>
        
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden glass hover:glass-gold transition-all duration-500">
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <project.icon className="absolute top-4 right-4 h-6 w-6 text-alpha-gold" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-alpha-white">{project.title}</h3>
                <p className="text-alpha-gray mb-4">{project.description}</p>
                <Button variant="outline" className="group-hover:bg-alpha-gold group-hover:text-alpha-black transition-all duration-300">
                  Voir le projet <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
