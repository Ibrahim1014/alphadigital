
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useAnimatedView } from '@/hooks/useAnimatedView';
import { ThreeDErrorBoundary } from './ThreeDErrorBoundary';

const GalaxyParticles = ({ count = 3500 }) => {
  const points = useRef<THREE.Points>(null);
  const particles = useRef<THREE.BufferAttribute>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#FFD700'), // Gold
      new THREE.Color('#FFFFFF'), // White
      new THREE.Color('#FFA500'), // Orange
      new THREE.Color('#87CEFA'), // Light blue pour le contraste
    ];
    
    for(let i = 0; i < count; i++) {
      const radius = Math.random() * 20 + 5;
      const spinAngle = radius * 0.3;
      const branchAngle = (i % 4) / 4 * Math.PI * 2;
      
      const randomOffset = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const randomY = randomOffset * (radius * 0.12);
      
      const x = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 1.5;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 1.5;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      const colorIndex = Math.floor(Math.random() * colorChoices.length);
      const color = colorChoices[colorIndex];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame(({clock}) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.03;
      
      if(particles.current) {
        const positions = particles.current.array as Float32Array;
        for(let i = 0; i < count; i++) {
          const i3 = i * 3;
          const x = positions[i3];
          const z = positions[i3 + 2];
          
          const phase = clock.getElapsedTime() + i;
          const distance = Math.sqrt(x * x + z * z);
          
          positions[i3 + 1] += Math.sin(phase * 0.3 + distance * 0.3) * 0.003;
        }
        particles.current.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          ref={particles}
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={particlesPosition.positions}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          itemSize={3}
          array={particlesPosition.colors}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent
        opacity={0.7}
      />
    </points>
  );
};

const LightOrbs = () => {
  const group = useRef<THREE.Group>(null);
  const orbs = useRef<THREE.Mesh[]>([]);
  
  useFrame(({ clock }) => {
    if (!group.current) return;
    
    group.current.rotation.y = clock.getElapsedTime() * 0.02;
    
    orbs.current.forEach((orb, i) => {
      const t = clock.getElapsedTime() * 0.3 + i * 100;
      orb.position.y = Math.sin(t * 0.3) * 1.5;
      orb.scale.setScalar(0.7 + Math.sin(t * 0.2) * 0.15);
    });
  });
  
  const orbsData = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
      ],
      scale: 0.4 + Math.random() * 1.5,
      color: i % 2 === 0 ? '#FFD700' : '#FFA500',
    }));
  }, []);
  
  return (
    <group ref={group}>
      {orbsData.map((orb, i) => (
        <mesh
          key={i}
          position={[orb.position[0], orb.position[1], orb.position[2]]}
          ref={(el) => {
            if (el) orbs.current[i] = el;
          }}
        >
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

export const GalaxyBackground = () => {
  const { ref, isInView } = useAnimatedView({ once: false });
  
  return (
    <div ref={ref} className="fixed inset-0 -z-10">
      <ThreeDErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 25], fov: 55 }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false
          }}
          dpr={[1, 1.5]} // Optimisation des performances
        >
          <fog attach="fog" args={['#000000', 5, 40]} />
          <ambientLight intensity={0.4} />
          
          <GalaxyParticles count={3500} />
          <LightOrbs />
          
          <EffectComposer enabled={true}>
            <Bloom 
              intensity={0.4} 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </ThreeDErrorBoundary>
    </div>
  );
};
