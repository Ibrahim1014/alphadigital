
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Brain, Shield, Zap, Bot, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedIcon } from "./AnimatedIcon";
import { useAIDetection } from "@/hooks/useAIDetection";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const AIDetectionSection = () => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { analyzeText, analyzeImage, isAnalyzing, result } = useAIDetection();
  
  const sectionRef = useScrollAnimation();
  const titleRef = useScrollAnimation({ start: "top center" });
  const featuresRef = useScrollAnimation({ start: "top 70%" });

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
    if (selectedFile) {
      await analyzeImage(selectedFile);
    } else if (text.trim()) {
      await analyzeText(text);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setText("");
    }
  };

  return (
    <section ref={sectionRef} id="detection" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-alpha-gold/5 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4">
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
              className="opacity-0"
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
          className="max-w-2xl mx-auto opacity-0"
          ref={useScrollAnimation({ start: "top 80%" }).current}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4">
              <Textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setSelectedFile(null);
                }}
                placeholder="Collez votre texte ici pour l'analyser..."
                className="min-h-[150px] glass"
                disabled={isAnalyzing}
              />
              
              <div className="flex items-center gap-4">
                <span className="text-alpha-gray">OU</span>
                <div className="flex-1">
                  <label className="block">
                    <div className="glass hover:glass-gold transition-all duration-300 p-4 text-center cursor-pointer rounded-lg">
                      <Upload className="h-6 w-6 text-alpha-gold mx-auto mb-2" />
                      <span className="text-alpha-white">
                        {selectedFile ? selectedFile.name : "Choisir une image"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isAnalyzing}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-gold text-alpha-black hover:opacity-90 hover:scale-105 transition-all duration-300"
              disabled={isAnalyzing || (!text.trim() && !selectedFile)}
            >
              {isAnalyzing ? "Analyse en cours..." : "Analyser"}
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
