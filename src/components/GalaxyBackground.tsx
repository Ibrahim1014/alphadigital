
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { useAnimatedView } from '@/hooks/useAnimatedView';
import { ThreeDErrorBoundary } from './ThreeDErrorBoundary';

const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : true;

const PERFORMANCE_LEVEL = {
  HIGH: {
    particleCount: 3800,
    bloomEnabled: true,
    effectsEnabled: true,
    orbCount: 5,
    animation: true
  },
  MEDIUM: {
    particleCount: 2500,
    bloomEnabled: true,
    effectsEnabled: true,
    orbCount: 3,
    animation: true
  },
  LOW: {
    particleCount: 1500,
    bloomEnabled: false,
    effectsEnabled: false,
    orbCount: 2,
    animation: true
  },
  ULTRA_LOW: {
    particleCount: 800,
    bloomEnabled: false,
    effectsEnabled: false,
    orbCount: 0,
    animation: false
  }
};

const getPerformanceLevel = () => {
  if (isMobile && isLowEnd) return PERFORMANCE_LEVEL.ULTRA_LOW;
  if (isMobile || isLowEnd) return PERFORMANCE_LEVEL.LOW;
  return PERFORMANCE_LEVEL.HIGH;
};

const PERF = getPerformanceLevel();

const GalaxyParticles = ({ count = PERF.particleCount }) => {
  const points = useRef<THREE.Points>(null);
  const particles = useRef<THREE.BufferAttribute | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    if (PERF.animation) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#FFD700'), // Gold
      new THREE.Color('#FFFFFF'), // White
      new THREE.Color('#FFA500'), // Orange
      new THREE.Color('#FFDF00'), // Or plus clair
      new THREE.Color('#F0E68C'), // Khaki (teinte dorée)
    ];
    
    for(let i = 0; i < count; i++) {
      const radius = Math.random() * 18 + 5;
      const spinAngle = radius * 0.25;
      const branchAngle = (i % 5) / 5 * Math.PI * 2;
      
      const randomOffset = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1);
      const randomY = randomOffset * (radius * 0.1);
      
      const x = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 1.2;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 1.2;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      const colorIndex = Math.random() < 0.6 
        ? 0 // Gold (60% de chance)
        : Math.floor(Math.random() * colorChoices.length);
      
      const color = colorChoices[colorIndex];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame(({clock}) => {
    if (!PERF.animation || !points.current) return;
    
    points.current.rotation.y = clock.getElapsedTime() * 0.025;
    
    points.current.rotation.x = THREE.MathUtils.lerp(
      points.current.rotation.x,
      mousePosition.y * 0.05,
      0.01
    );
    
    points.current.rotation.z = THREE.MathUtils.lerp(
      points.current.rotation.z,
      -mousePosition.x * 0.05,
      0.01
    );
    
    if(particles.current && PERF.animation) {
      const positions = particles.current.array as Float32Array;
      for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const z = positions[i3 + 2];
        
        const phase = clock.getElapsedTime() * 0.1 + i * 0.01;
        const distance = Math.sqrt(x * x + z * z);
        
        if (i % 4 === 0) {
          positions[i3 + 1] += Math.sin(phase + distance * 0.2) * 0.002;
        }
      }
      particles.current.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          ref={(attr) => { particles.current = attr as THREE.BufferAttribute; }}
          attachObject={['attributes', 'position']}
          args={[particlesPosition.positions, 3]}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          args={[particlesPosition.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={true}
        transparent={true}
        opacity={0.7}
      />
    </points>
  );
};

const LightOrbs = () => {
  if (PERF.orbCount === 0) return null;
  
  const group = useRef<THREE.Group>(null);
  const orbs = useRef<THREE.Mesh[]>([]);
  
  useFrame(({ clock }) => {
    if (!group.current || !PERF.animation) return;
    
    group.current.rotation.y = clock.getElapsedTime() * 0.015;
    
    orbs.current.forEach((orb, i) => {
      if (!orb) return;
      const t = clock.getElapsedTime() * 0.2 + i * 100;
      orb.position.y = Math.sin(t * 0.25) * 1.3;
      orb.scale.setScalar(0.7 + Math.sin(t * 0.15) * 0.12);
    });
  });
  
  const orbsData = useMemo(() => {
    return Array.from({ length: PERF.orbCount }, (_, i) => {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = 15 + Math.random() * 5;
      
      return {
        position: [
          r * Math.sin(theta) * Math.cos(phi),
          r * Math.cos(theta),
          r * Math.sin(theta) * Math.sin(phi),
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 1.2,
        color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FFA500' : '#FFDF00',
        intensity: 0.4 + Math.random() * 0.6,
      };
    });
  }, [PERF.orbCount]);
  
  return (
    <group ref={group}>
      {orbsData.map((orb, i) => (
        <mesh
          key={i}
          position={orb.position}
          ref={(el) => {
            if (el) orbs.current[i] = el;
          }}
        >
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial 
            color={orb.color}
            transparent={true}
            opacity={0.4 * orb.intensity}
          />
        </mesh>
      ))}
    </group>
  );
};

const GoldenFog = () => {
  return (
    <fog attach="fog" args={['#000000', 8, 50]} />
  );
};

export const GalaxyBackground = () => {
  const { ref, isInView } = useAnimatedView({ once: false });
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  return (
    <div ref={ref} className="fixed inset-0 -z-10">
      <ThreeDErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 25], fov: 50 }}
          gl={{ 
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
            depth: true,
            stencil: false,
            logarithmicDepthBuffer: true,
          }}
          dpr={[1, isMobile ? 1.5 : 2]}
          performance={{ min: 0.5 }}
        >
          <GoldenFog />
          <ambientLight intensity={0.4} />
          
          <GalaxyParticles count={PERF.particleCount} />
          <LightOrbs />
          
          {PERF.effectsEnabled && (
            <EffectComposer enabled={loaded}>
              {PERF.bloomEnabled && (
                <Bloom 
                  intensity={0.4} 
                  luminanceThreshold={0.2} 
                  luminanceSmoothing={0.9} 
                  mipmapBlur
                />
              )}
              {PERF.effectsEnabled && (
                <ChromaticAberration 
                  offset={new THREE.Vector2(0.0, 0.0)} 
                  radialModulation={false} 
                  modulationOffset={1.0} 
                />
              )}
            </EffectComposer>
          )}
        </Canvas>
      </ThreeDErrorBoundary>
    </div>
  );
};

export default GalaxyBackground;
