
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Loader2, AlertCircle, Volume2, VolumeX, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const MusicGenerator = () => {
  const [style, setStyle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    if (!style.trim()) {
      toast.error("Veuillez entrer un style musical");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("https://api.topmediai.com/v1/music", {
        method: "POST",
        headers: {
          "x-api-key": "4e09f51ebfca4ed1a7e8dad68eb33424",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          is_auto: 1,
          prompt: style,
          lyrics: lyrics.trim() || undefined,
          instrumental: lyrics.trim() ? 0 : 1
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la génération de la musique");
      }

      const musicUrl = data.url || data.audio_url || data.result;
      
      if (!musicUrl) {
        throw new Error("Aucun fichier audio n'a été généré");
      }

      setAudioUrl(musicUrl);
      
      // Préparer l'élément audio pour la lecture
      const audio = new Audio(musicUrl);
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => setIsPlaying(false));
      setAudioRef(audio);
      
      toast.success("Musique générée avec succès");
    } catch (err) {
      console.error("Erreur de génération:", err);
      setError("Une erreur est survenue lors de la génération de la musique. Veuillez réessayer.");
      toast.error("Échec de la génération de la musique");
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef) return;
    
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `alpha-digital-music-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Musique téléchargée");
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="music-style" className="block text-alpha-gold text-sm font-medium mb-2">
          Style de musique
        </label>
        <div className="relative">
          <Input
            id="music-style"
            placeholder="Jazz, Hip Hop, Classique, Lo-Fi..."
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="bg-alpha-black/50 border-alpha-gold/30 focus:border-alpha-gold transition-colors text-white placeholder:text-alpha-gray/60 py-6"
            disabled={isGenerating}
          />
          <div className="absolute right-3 top-3 text-alpha-gold/50">
            <Music2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="music-lyrics" className="block text-alpha-gold text-sm font-medium mb-2">
          Paroles (facultatif)
        </label>
        <Textarea
          id="music-lyrics"
          placeholder="Entrez des paroles pour votre musique..."
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          className="bg-alpha-black/50 border-alpha-gold/30 focus:border-alpha-gold transition-colors text-white placeholder:text-alpha-gray/60 min-h-[100px]"
          disabled={isGenerating}
        />
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !style.trim()}
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
            "Générer la musique"
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
        {audioUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6"
          >
            <div className="glass-gold rounded-lg p-5 flex flex-col items-center">
              <div className="w-full mb-4">
                <div className="h-16 w-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-alpha-gold mx-0.5 w-1.5 rounded-full"
                        animate={{
                          height: isPlaying 
                            ? [15, 30 + Math.random() * 20, 15] 
                            : 15
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-3 mb-5">
                <Button
                  variant="secondary"
                  size="icon"
                  className={`rounded-full w-12 h-12 ${isPlaying ? 'bg-alpha-gold text-alpha-black' : 'glass-gold'}`}
                  onClick={togglePlay}
                >
                  {isPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="glass-gold rounded-full w-12 h-12" 
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="glass-gold rounded-full w-12 h-12"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-alpha-gray text-sm">
                <span className="text-alpha-gold">Style:</span> {style}
                {lyrics && (
                  <>
                    <br />
                    <span className="text-alpha-gold">Paroles:</span> {lyrics.substring(0, 100)}{lyrics.length > 100 ? '...' : ''}
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
