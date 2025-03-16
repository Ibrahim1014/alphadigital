
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedViewOptions {
  once?: boolean;
  // Remove margin from our interface since we'll pass it directly
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Pass margin as string values which matches framer-motion's expected type
  const isInView = useInView(ref, { ...options, margin: ['-10px', '0px', '-10px', '0px'] });
  return { ref, isInView };
};

