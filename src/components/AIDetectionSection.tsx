
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card } from "./ui/card";
import { Brain, Shield, Zap, Bot } from "lucide-react";
import { Button } from "./ui/button";

export const AIDetectionSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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
      featuresRef.current?.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
      "-=0.4"
    );
  }, []);

  const features = [
    {
      icon: Brain,
      title: "IA Avancée",
      description: "Algorithmes de pointe pour une détection précise"
    },
    {
      icon: Shield,
      title: "Protection Continue",
      description: "Surveillance en temps réel des contenus"
    },
    {
      icon: Zap,
      title: "Analyse Rapide",
      description: "Résultats instantanés et fiables"
    },
    {
      icon: Bot,
      title: "Auto-Apprentissage",
      description: "Amélioration continue des performances"
    }
  ];

  return (
    <section id="detection" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-alpha-gold/5 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4 opacity-0">
            Détection <span className="text-gradient-gold">IA</span>
          </h2>
          <p className="text-alpha-gray text-lg max-w-2xl mx-auto">
            Notre technologie de pointe pour identifier et analyser les contenus générés par l'intelligence artificielle
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass hover:glass-gold transition-all duration-300 group">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="glass-gold rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-alpha-gold" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-alpha-white">{feature.title}</h3>
                <p className="text-alpha-gray">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-gradient-gold text-alpha-black hover:opacity-90 hover:scale-105 transition-all duration-300">
            Essayer la Détection IA
          </Button>
        </div>
      </div>
    </section>
  );
};
