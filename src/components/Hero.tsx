
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Animation badge
    timeline.fromTo(badgeRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Animation titre avec effet machine à écrire
    timeline.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    ).to(titleRef.current?.querySelector('.typing'), {
      duration: 2,
      text: "l'Innovation Numérique",
      ease: "none"
    });

    // Animation sous-titre
    timeline.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );

    // Animation CTA
    timeline.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    // Parallax effect
    gsap.to(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: (_, target) => -target.offsetHeight * 0.2,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">      
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div ref={badgeRef} className="inline-flex items-center px-4 py-2 rounded-full glass-gold mb-8 animate-float">
            <span className="text-alpha-gold text-sm font-medium">Bienvenue chez Alpha Digital</span>
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-8 opacity-0">
            Votre Partenaire pour
            <span className="typing text-gradient-gold block mt-4"></span>
          </h1>
          
          <p ref={subtitleRef} className="text-alpha-gray text-xl md:text-2xl mb-12 opacity-0 leading-relaxed">
            Solutions digitales sur mesure et détection avancée des fake news propulsée par l'IA
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-gold hover:opacity-90 text-alpha-black group animate-pulse"
            >
              Commencer
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto glass hover:glass-gold transition-all duration-300"
            >
              En Savoir Plus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
