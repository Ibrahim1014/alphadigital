
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useAnimatedView = (options = { once: true, margin: "-10%" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, options);
  return { ref, isInView };
};
