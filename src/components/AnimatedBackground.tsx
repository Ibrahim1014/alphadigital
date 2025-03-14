
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedStars = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.075;
    }
  });

  return <Stars ref={starsRef} radius={300} depth={50} count={5000} factor={6} fade speed={1} />;
};

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <AnimatedStars />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};
