
import { useInView, InViewOptions } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedViewOptions {
  once?: boolean;
  margin?: InViewOptions['margin'];
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Use the margin from options or set a default value with proper typing
  const inViewOptions: InViewOptions = {
    ...options,
    amount: 0.1  // Only needs a small amount visible to trigger
  };
  
  // If margin is provided in options, use it, otherwise set the default
  if (!options.margin) {
    inViewOptions.margin = "-100px 0px -100px 0px";
  }
  
  const isInView = useInView(ref, inViewOptions);
  
  return { ref, isInView };
};
