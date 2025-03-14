
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .fromTo(titleRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">      
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-gold mb-8">
            <span className="text-alpha-gold text-sm font-medium">Bienvenue chez Alpha Digital</span>
          </div>
          
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-8 opacity-0">
            Votre Partenaire pour
            <span className="text-gradient-gold block mt-2"> l'Innovation Numérique</span>
          </h1>
          
          <p ref={subtitleRef} className="text-alpha-gray text-xl mb-12 opacity-0">
            Solutions digitales sur mesure et détection avancée des fake news propulsée par l'IA
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-alpha-black group">
              Commencer
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto glass hover:glass-gold">
              En Savoir Plus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
