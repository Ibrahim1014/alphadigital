
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Use a different name to avoid collision with framer-motion's internal MarginType
interface AnimatedViewOptions {
  once?: boolean;
  margin?: string | number | { top?: number | string; right?: number | string; bottom?: number | string; left?: number | string };
  amount?: number;
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create a properly typed options object for useInView
  const inViewOptions = {
    once: options.once ?? true,
    amount: options.amount ?? 0.1,  // Only needs a small amount visible to trigger
    margin: options.margin ?? "-100px 0px -100px 0px"
  };
  
  const isInView = useInView(ref, inViewOptions);
  
  return { ref, isInView };
};
