
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedViewOptions {
  once?: boolean;
  // Remove margin from our interface since we'll pass it directly
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Pass margin directly as a number array which matches framer-motion's expected type
  const isInView = useInView(ref, { ...options, margin: [-10, 0, -10, 0] });
  return { ref, isInView };
};

