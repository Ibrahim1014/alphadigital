
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Logo = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline.fromTo(imageRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 }
    ).fromTo(logoRef.current?.querySelector('.logo-glow'),
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=0.5"
    );
  }, []);

  return (
    <div ref={logoRef} className="relative w-48 h-12">
      <div className="logo-glow absolute inset-0 bg-gradient-gold opacity-0 blur-lg" />
      <img
        ref={imageRef}
        src="/lovable-uploads/b2ba0c84-8bcb-4eee-a5f4-8362e102af1d.png"
        alt="Alpha Digital"
        className="w-full h-full object-contain relative z-10"
      />
    </div>
  );
};
