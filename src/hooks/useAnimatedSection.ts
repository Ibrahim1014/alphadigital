
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useAnimatedSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.children;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(elements,
      { 
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    return () => {
      tl.kill();
    };
  }, [isInView]);

  return { sectionRef, isInView };
};
