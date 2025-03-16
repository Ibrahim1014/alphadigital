
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedViewOptions {
  once?: boolean;
  margin?: string;
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true, margin: "-10px 0px -10px 0px" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, options);
  return { ref, isInView };
};

