
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { gsap } from 'gsap';

interface UseAnimatedSectionOptions {
  amount?: number;
  triggerOnce?: boolean;
}

export const useAnimatedSection = (options: UseAnimatedSectionOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: options.amount || 0.1,
    once: options.triggerOnce !== false
  });

  useEffect(() => {
    if (isInView && ref.current) {
      const timeline = gsap.timeline();
      
      timeline.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [isInView]);

  return ref;
};
