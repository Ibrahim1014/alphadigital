
import { useInView, UseInViewOptions } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedViewOptions {
  once?: boolean;
  amount?: number;
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Créer un objet d'options correctement typé pour useInView
  const inViewOptions: UseInViewOptions = {
    once: options.once ?? true,
    amount: options.amount ?? 0.15
  };
  
  const isInView = useInView(ref, inViewOptions);
  
  return { ref, isInView };
};
