
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Définir un type pour les options de marge spécifique à framer-motion
type MarginType = string | number | { top?: number | string; right?: number | string; bottom?: number | string; left?: number | string };

interface AnimatedViewOptions {
  once?: boolean;
  margin?: MarginType;
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Créer un objet d'options typé correctement pour useInView
  const inViewOptions = {
    ...options,
    amount: 0.1  // Only needs a small amount visible to trigger
  };
  
  // Si margin n'est pas fourni, définir une valeur par défaut
  if (!options.margin) {
    inViewOptions.margin = "-100px 0px -100px 0px";
  }
  
  const isInView = useInView(ref, inViewOptions);
  
  return { ref, isInView };
};
