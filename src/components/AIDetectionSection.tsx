
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "./ui/card";
import { Brain, Shield, Zap, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedIcon } from "./AnimatedIcon";
import { useAIDetection } from "@/hooks/useAIDetection";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";

gsap.registerPlugin(ScrollTrigger);

export const AIDetectionSection = () => {
  const [text, setText] = useState("");
  const { analyzeText, isAnalyzing, result } = useAIDetection();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await analyzeText(text);
    }
  };

  return (
    <section ref={sectionRef} id="detection" className="py-20 px-4 relative overflow-hidden">
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

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass hover:glass-gold transition-all duration-300 group">
                <div className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="glass-gold rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <AnimatedIcon Icon={feature.icon} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-alpha-white">{feature.title}</h3>
                  <p className="text-alpha-gray">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Collez votre texte ici pour l'analyser..."
              className="min-h-[150px] glass"
            />
            <Button
              type="submit"
              className="bg-gradient-gold text-alpha-black hover:opacity-90 hover:scale-105 transition-all duration-300"
              disabled={isAnalyzing || !text.trim()}
            >
              {isAnalyzing ? "Analyse en cours..." : "Analyser le texte"}
            </Button>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 glass rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">Résultats de l'analyse</h3>
              <div className="space-y-2">
                <p>Probabilité IA : {(result.score * 100).toFixed(1)}%</p>
                <p>Niveau de confiance : {result.confidence}</p>
                <p className="text-alpha-gray">{result.details}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
