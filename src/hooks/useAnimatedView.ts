
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedViewOptions {
  once?: boolean;
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Utiliser une seule chaîne de caractères pour la marge
  const isInView = useInView(ref, { ...options, margin: "-10px 0px -10px 0px" });
  return { ref, isInView };
};

