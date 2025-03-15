
import { useState } from 'react';

export const useAIDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    confidence: string;
    details: string;
  } | null>(null);

  const analyzeText = async (text: string) => {
    setIsAnalyzing(true);
    try {
      // Simuler une analyse IA avec un délai
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const score = Math.random();
      const result = {
        score: score,
        confidence: score > 0.7 ? "Forte" : score > 0.4 ? "Moyenne" : "Faible",
        details: score > 0.7 
          ? "Ce texte présente des caractéristiques typiques d'un contenu généré par IA" 
          : "Ce texte semble avoir été écrit par un humain"
      };
      
      setResult(result);
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeText, isAnalyzing, result };
};
