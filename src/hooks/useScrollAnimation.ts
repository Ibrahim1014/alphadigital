
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ScrollAnimationOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  stagger?: number;
}

export const useScrollAnimation = <T extends HTMLElement>(options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const timeline = gsap.timeline();

    timeline.fromTo(
      element,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    return () => {
      timeline.kill();
    };
  }, [options]);

  return elementRef;
};
