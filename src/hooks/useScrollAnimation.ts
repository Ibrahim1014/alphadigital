
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  stagger?: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: options.start || "top 80%",
        end: options.end || "bottom 20%",
        scrub: options.scrub ?? 1,
        toggleActions: "play none none reverse",
      }
    });

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
