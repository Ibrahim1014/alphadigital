
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Loader2, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Veuillez entrer une description pour votre image");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
          "Api-Key": "2c436c43-1aba-4a38-b3ec-23d1669bfb0a",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: prompt
        })
      });

      const data = await response.json();
      
      if (!response.ok || !data.output_url) {
        throw new Error(data.message || "Erreur lors de la génération de l'image");
      }

      setGeneratedImage(data.output_url);
      toast.success("Image générée avec succès");
    } catch (err) {
      console.error("Erreur de génération:", err);
      setError("Une erreur est survenue lors de la génération de l'image. Veuillez réessayer.");
      toast.error("Échec de la génération de l'image");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `alpha-digital-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image téléchargée");
  };

  return (
    <div className="space-y-6">
      <div className="text-alpha-gray text-sm mb-4 p-4 glass-premium rounded-lg">
        <p>La génération d'image peut prendre quelques instants. Soyez patient pendant que notre IA transforme vos idées en œuvres visuelles exceptionnelles.</p>
      </div>
      
      <div>
        <label htmlFor="image-prompt" className="block text-alpha-gold text-sm font-medium mb-2">
          Description de l'image
        </label>
        <div className="relative">
          <Textarea
            id="image-prompt"
            placeholder="Décrivez l'image que vous souhaitez générer en détail..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-alpha-black/50 border-alpha-gold/30 focus:border-alpha-gold transition-colors text-white placeholder:text-alpha-gray/60 min-h-[120px]"
            disabled={isGenerating}
          />
          <div className="absolute right-3 top-3 text-alpha-gold/50">
            <Wand2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className={`relative overflow-hidden ${
            isGenerating 
              ? "bg-alpha-black border border-alpha-gold/30" 
              : "bg-gradient-gold hover:opacity-90 text-alpha-black"
          } px-8 py-6 h-auto text-base`}
        >
          {isGenerating ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Génération en cours...
            </span>
          ) : (
            "Générer l'image"
          )}
          {!isGenerating && (
            <motion.div 
              className="absolute inset-0 bg-alpha-gold -z-10"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(255, 215, 0, 0.3)",
                  "0 0 20px rgba(255, 215, 0, 0.4)",
                  "0 0 10px rgba(255, 215, 0, 0.3)"
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-200">{error}</p>
        </div>
      )}

      <AnimatePresence>
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 flex flex-col items-center"
          >
            <div className="relative group">
              <img
                src={generatedImage}
                alt="Image générée par IA"
                className="rounded-lg border border-alpha-gold/20 shadow-lg max-w-full h-auto"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-alpha-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center p-4">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass-gold" 
                    onClick={handleDownload}
                  >
                    <Download className="w-4 h-4 mr-1" /> Télécharger
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-alpha-gray text-sm mt-4 text-center max-w-lg">
              <span className="text-alpha-gold">Prompt:</span> {prompt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
