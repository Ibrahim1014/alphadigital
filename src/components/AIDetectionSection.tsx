import { useEffect, useState, useRef } from "react";
import { Card } from "./ui/card";
import { Brain, Shield, Zap, Bot, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedIcon } from "./AnimatedIcon";
import { useAIDetection } from "@/hooks/useAIDetection";
import { motion } from "framer-motion";
import { Textarea } from "./ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AIDetectionSection = () => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { analyzeText, analyzeImage, isAnalyzing, result } = useAIDetection();
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const animationRef = useScrollAnimation<HTMLDivElement>({ start: "top 80%" });

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
    <section ref={sectionRef} id="detection" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-alpha-gold/5 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold mb-4">
            Détection <span className="text-gradient-gold">IA</span>
          </h2>
          <p className="text-alpha-gray text-lg max-w-2xl mx-auto">
            Notre technologie de pointe pour identifier et analyser les contenus générés par l'intelligence artificielle
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass hover:glass-gold transition-all duration-300 group">
                <div className="p-6 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 flex justify-center"
                  >
                    <div className="glass-gold rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-alpha-gold" />
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2 text-alpha-white">{feature.title}</h3>
                  <p className="text-alpha-gray">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={animationRef}
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="w-full mb-6 bg-alpha-black/20">
              <TabsTrigger value="text" className="flex-1">Texte</TabsTrigger>
              <TabsTrigger value="image" className="flex-1">Image</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="text">
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
              </TabsContent>
              
              <TabsContent value="image">
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
              </TabsContent>

              <Button
                type="submit"
                className="w-full bg-gradient-gold text-alpha-black hover:opacity-90 hover:scale-105 transition-all duration-300"
                disabled={isAnalyzing || (!text.trim() && !selectedFile)}
              >
                {isAnalyzing ? "Analyse en cours..." : "Analyser"}
              </Button>
            </form>
          </Tabs>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <Card className="p-6 glass">
                <h3 className="text-xl font-semibold mb-4">Résultats de l'analyse</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Probabilité IA</span>
                    <span className="text-gradient-gold font-semibold">
                      {(result.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Niveau de confiance</span>
                    <span className={`font-semibold ${
                      result.confidence === "Forte" ? "text-green-500" :
                      result.confidence === "Moyenne" ? "text-yellow-500" :
                      "text-red-500"
                    }`}>
                      {result.confidence}
                    </span>
                  </div>
                  <p className="text-alpha-gray">{result.details}</p>
                </div>
              </Card>

              <Card className="p-6 glass">
                <h3 className="text-xl font-semibold mb-4">Raisonnement</h3>
                <ul className="space-y-2">
                  {result.reasoning.map((reason, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="h-2 w-2 rounded-full bg-alpha-gold" />
                      <span>{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
