
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedViewOptions {
  once?: boolean;
  margin?: string;
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Utiliser une seule chaîne de caractères pour la marge avec une valeur plus petite
  const margin = options.margin || "-100px 0px";
  const isInView = useInView(ref, { 
    ...options, 
    margin,
    amount: 0.1  // Only needs a small amount visible to trigger
  });
  
  return { ref, isInView };
};
