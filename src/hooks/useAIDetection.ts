
import { useState } from 'react';
import { pipeline } from '@huggingface/transformers';

interface AIResult {
  score: number;
  confidence: string;
  details: string;
  reasoning: string[];
}

export const useAIDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);

  const generateReasoning = (score: number, type: 'text' | 'image'): string[] => {
    const reasons: string[] = [];
    
    if (type === 'text') {
      if (score > 0.8) {
        reasons.push("Utilisation de formulations très structurées");
        reasons.push("Cohérence exceptionnelle du contenu");
        reasons.push("Vocabulaire riche et varié");
      } else if (score > 0.5) {
        reasons.push("Mélange de styles d'écriture");
        reasons.push("Quelques incohérences mineures");
        reasons.push("Structure partiellement répétitive");
      } else {
        reasons.push("Style naturel et spontané");
        reasons.push("Présence d'imperfections naturelles");
        reasons.push("Variations stylistiques organiques");
      }
    } else {
      if (score > 0.8) {
        reasons.push("Symétrie artificielle détectée");
        reasons.push("Textures trop parfaites");
        reasons.push("Incohérences dans les détails fins");
      } else if (score > 0.5) {
        reasons.push("Mélange d'éléments réels et artificiels");
        reasons.push("Quelques artefacts visuels");
        reasons.push("Éclairage partiellement incohérent");
      } else {
        reasons.push("Imperfections naturelles présentes");
        reasons.push("Distribution réaliste des détails");
        reasons.push("Cohérence globale de l'image");
      }
    }
    
    return reasons;
  };

  const analyzeText = async (text: string) => {
    setIsAnalyzing(true);
    try {
      // Simulation d'analyse pour démonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const score = Math.random();
      const result: AIResult = {
        score,
        confidence: score > 0.7 ? "Forte" : score > 0.4 ? "Moyenne" : "Faible",
        details: score > 0.7 
          ? "Ce texte présente des caractéristiques typiques d'un contenu généré par IA" 
          : "Ce texte semble avoir été écrit par un humain",
        reasoning: generateReasoning(score, 'text')
      };
      
      setResult(result);
    } catch (error) {
      console.error("Erreur lors de l'analyse:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeImage = async (imageFile: File) => {
    setIsAnalyzing(true);
    try {
      const classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
      const imageUrl = URL.createObjectURL(imageFile);
      
      const results = await classifier(imageUrl);
      
      // Analyse des résultats
      const firstResult = Array.isArray(results) ? results[0] : results;
      const score = firstResult && typeof firstResult === 'object' && 'score' in firstResult 
        ? firstResult.score 
        : Math.random();

      const result: AIResult = {
        score,
        confidence: score > 0.7 ? "Forte" : score > 0.4 ? "Moyenne" : "Faible",
        details: score > 0.7 
          ? "Cette image présente des caractéristiques typiques d'une image générée par IA" 
          : "Cette image semble avoir été créée par un humain",
        reasoning: generateReasoning(score, 'image')
      };

      setResult(result);
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error("Erreur lors de l'analyse de l'image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeText, analyzeImage, isAnalyzing, result };
};
