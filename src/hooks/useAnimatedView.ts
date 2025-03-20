
import { useInView, UseInViewOptions } from 'framer-motion';
import { useRef } from 'react';

// Define our options interface without specifying the margin type directly
interface AnimatedViewOptions {
  once?: boolean;
  amount?: number;
  // We'll use Framer Motion's expected type for margin by omitting it here
  // and handling it specially in the hook implementation
}

export const useAnimatedView = (options: AnimatedViewOptions = { once: true }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create a properly typed options object for useInView
  const inViewOptions: UseInViewOptions = {
    once: options.once ?? true,
    amount: options.amount ?? 0.1,  // Only needs a small amount visible to trigger
  };
  
  // We won't pass a margin option to useInView since it's causing type conflicts
  const isInView = useInView(ref, inViewOptions);
  
  return { ref, isInView };
};
