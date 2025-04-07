
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { ThreeDErrorBoundary } from './ThreeDErrorBoundary';

const AnimatedStars = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = clock.getElapsedTime() * 0.03;
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.04;
    }
  });

  return <Stars ref={starsRef} radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />;
};

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <ThreeDErrorBoundary>
        <Canvas 
          camera={{ position: [0, 0, 1] }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
          }}
          dpr={[1, 1.5]} // Optimisation des performances
        >
          <AnimatedStars />
          <ambientLight intensity={0.3} />
        </Canvas>
      </ThreeDErrorBoundary>
    </div>
  );
};
