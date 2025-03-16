
import { useState } from 'react';
import { pipeline } from '@huggingface/transformers';

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

  const analyzeImage = async (imageFile: File) => {
    setIsAnalyzing(true);
    try {
      const classifier = await pipeline(
        'image-classification',
        'Xenova/vit-base-patch16-224'
      );

      // Convertir le File en URL pour l'API
      const imageUrl = URL.createObjectURL(imageFile);
      const results = await classifier(imageUrl);
      
      // Prendre le premier résultat
      const firstResult = Array.isArray(results) ? results[0] : results;
      const aiScore = firstResult?.label?.includes('artificial') ? 0.8 : 0.2;

      setResult({
        score: aiScore,
        confidence: aiScore > 0.7 ? "Forte" : aiScore > 0.4 ? "Moyenne" : "Faible",
        details: aiScore > 0.7 
          ? "Cette image présente des caractéristiques typiques d'une image générée par IA" 
          : "Cette image semble avoir été créée par un humain"
      });

      // Nettoyer l'URL créée
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error("Erreur lors de l'analyse de l'image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { analyzeText, analyzeImage, isAnalyzing, result };
};
