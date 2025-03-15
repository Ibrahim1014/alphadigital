
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

const GalaxyParticles = () => {
  const particles = useRef<THREE.Points>(null);
  const count = 5000;
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for(let i = 0; i < count; i++) {
      const radius = Math.random() * 20;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      
      const randomX = Math.random() * 2 - 1;
      const randomY = Math.random() * 2 - 1;
      const randomZ = Math.random() * 2 - 1;
      
      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }
    
    return positions;
  }, []);

  useFrame(({clock}) => {
    if (particles.current) {
      particles.current.rotation.y = clock.getElapsedTime() * 0.05;
      particles.current.rotation.z = clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={particlesPosition}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent
        color="#FFD700"
      />
    </points>
  );
};

export const GalaxyBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: true }}
      >
        <fog attach="fog" args={['#000000', 0, 25]} />
        <ambientLight intensity={0.5} />
        <GalaxyParticles />
      </Canvas>
    </div>
  );
};
