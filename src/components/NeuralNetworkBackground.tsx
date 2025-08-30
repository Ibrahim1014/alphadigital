import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';

interface NeuralNetworkBackgroundProps {
  isVisible?: boolean;
  className?: string;
}

// Configuration object
const config = {
  paused: false,
  activePaletteIndex: 0,
  currentFormation: 0,
  numFormations: 4,
  densityFactor: 1
};

// Color palettes adapted for Alpha Digital
const colorPalettes = [
  [new THREE.Color(0xB8860B), new THREE.Color(0xDAA520), new THREE.Color(0xFFD700), new THREE.Color(0xFFA500), new THREE.Color(0xCD853F)], // Gold theme
  [new THREE.Color(0x2C3E50), new THREE.Color(0x34495E), new THREE.Color(0x5D6D7E), new THREE.Color(0x85929E), new THREE.Color(0xAEB6BF)], // Dark theme
  [new THREE.Color(0x1B4F72), new THREE.Color(0x2E86C1), new THREE.Color(0x5DADE2), new THREE.Color(0x85C1E9), new THREE.Color(0xAED6F1)], // Blue theme
  [new THREE.Color(0x922B21), new THREE.Color(0xC0392B), new THREE.Color(0xE74C3C), new THREE.Color(0xF1948A), new THREE.Color(0xF8C471)] // Red theme
];

// Shader uniforms
const pulseUniforms = {
  uTime: { value: 0.0 },
  uPulsePositions: { value: [new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3)] },
  uPulseTimes: { value: [-1e3, -1e3, -1e3] },
  uPulseColors: { value: [new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1)] },
  uPulseSpeed: { value: 15.0 },
  uBaseNodeSize: { value: 0.5 },
  uActivePalette: { value: 0 }
};

// Noise functions for shaders
const noiseFunctions = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m*=m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p,float time){
    float value=0.0;float amplitude=0.5;float frequency=1.0;int octaves=3;
    for(int i=0;i<octaves;i++){
        value+=amplitude*snoise(p*frequency+time*0.2*frequency);
        amplitude*=0.5;frequency*=2.0;
    }
    return value;
}`;

// Node shader
const nodeShader = {
  vertexShader: `${noiseFunctions}
  attribute float nodeSize;attribute float nodeType;attribute vec3 nodeColor;attribute vec3 connectionIndices;attribute float distanceFromRoot;
  uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;uniform float uBaseNodeSize;
  varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;

  float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
      if (pulseTime < 0.0) return 0.0;
      float timeSinceClick = uTime - pulseTime;
      if (timeSinceClick < 0.0 || timeSinceClick > 3.0) return 0.0;

      float pulseRadius = timeSinceClick * uPulseSpeed;
      float distToClick = distance(worldPos, pulsePos);
      float pulseThickness = 2.0;
      float waveProximity = abs(distToClick - pulseRadius);

      return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(3.0, 0.0, timeSinceClick);
  }

  void main() {
      vNodeType = nodeType;
      vColor = nodeColor;
      vDistanceFromRoot = distanceFromRoot;

      vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
      vPosition = worldPos;

      float totalPulseIntensity = 0.0;
      for (int i = 0; i < 3; i++) {
          totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
      }
      vPulseIntensity = min(totalPulseIntensity, 1.0);

      float timeScale = 0.5 + 0.5 * sin(uTime * 0.8 + distanceFromRoot * 0.2);
      float baseSize = nodeSize * (0.8 + 0.2 * timeScale);
      float pulseSize = baseSize * (1.0 + vPulseIntensity * 2.0);

      vec3 modifiedPosition = position;
      if (nodeType > 0.5) {
          float noise = fbm(position * 0.1, uTime * 0.1);
          modifiedPosition += normal * noise * 0.2;
      }

      vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
      gl_PointSize = pulseSize * uBaseNodeSize * (800.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
  }`,

  fragmentShader: `
  uniform float uTime;uniform vec3 uPulseColors[3];uniform int uActivePalette;
  varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;

  void main() {
      vec2 center = 2.0 * gl_PointCoord - 1.0;
      float dist = length(center);
      if (dist > 1.0) discard;

      float glowStrength = 1.0 - smoothstep(0.0, 1.0, dist);
      glowStrength = pow(glowStrength, 1.4);

      vec3 baseColor = vColor * (0.8 + 0.2 * sin(uTime * 0.5 + vDistanceFromRoot * 0.3));
      vec3 finalColor = baseColor;

      if (vPulseIntensity > 0.0) {
          vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.3);
          finalColor = mix(baseColor, pulseColor, vPulseIntensity);
          finalColor *= (1.0 + vPulseIntensity * 0.7);
      }

      float alpha = glowStrength * (0.9 - 0.5 * dist);

      float camDistance = length(vPosition - cameraPosition);
      float distanceFade = smoothstep(80.0, 10.0, camDistance);

      if (vNodeType > 0.5) {
          alpha *= 0.85;
      } else {
          finalColor *= 1.2;
      }

      gl_FragColor = vec4(finalColor, alpha * distanceFade);
  }`
};

// Node class
class Node {
  public position: THREE.Vector3;
  public connections: Array<{ node: Node; strength: number }> = [];
  public level: number;
  public type: number;
  public size: number;
  public distanceFromRoot: number = 0;

  constructor(position: THREE.Vector3, level = 0, type = 0) {
    this.position = position;
    this.level = level;
    this.type = type;
    this.size = type === 0 ? THREE.MathUtils.randFloat(0.7, 1.2) : THREE.MathUtils.randFloat(0.4, 0.9);
  }

  addConnection(node: Node, strength = 1.0) {
    if (!this.isConnectedTo(node)) {
      this.connections.push({ node, strength });
      node.connections.push({ node: this, strength });
    }
  }

  isConnectedTo(node: Node): boolean {
    return this.connections.some(conn => conn.node === node);
  }
}

// Neural network generator
function generateNeuralNetwork(formationIndex: number, densityFactor = 1.0): Node[] {
  let nodes: Node[] = [];
  let rootNode: Node;

  function generateQuantumCortex() {
    rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0);
    rootNode.size = 1.5;
    nodes.push(rootNode);
    
    const layers = 5;
    const primaryAxes = 6;
    const nodesPerAxis = Math.floor(8 * densityFactor);
    const axisLength = 20;

    for (let a = 0; a < primaryAxes; a++) {
      const phi = Math.acos(-1 + (2 * a) / primaryAxes);
      const theta = Math.PI * (1 + Math.sqrt(5)) * a;
      const dirVec = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      );

      let prevNode = rootNode;
      for (let i = 1; i <= nodesPerAxis; i++) {
        const t = i / nodesPerAxis;
        const distance = axisLength * Math.pow(t, 0.8);
        const pos = new THREE.Vector3().copy(dirVec).multiplyScalar(distance);
        const nodeType = (i === nodesPerAxis) ? 1 : 0;
        const newNode = new Node(pos, i, nodeType);
        newNode.distanceFromRoot = distance;
        nodes.push(newNode);
        prevNode.addConnection(newNode, 1.0 - (t * 0.3));
        prevNode = newNode;
      }
    }
  }

  // Generate different formations based on index
  switch (formationIndex) {
    case 0:
    default:
      generateQuantumCortex();
      break;
  }

  return nodes;
}

// Neural Network Component
const NeuralNetwork: React.FC<{ nodes: Node[] }> = ({ nodes }) => {
  const meshRef = useRef<THREE.Points>(null);
  const { camera, gl } = useThree();
  
  const [nodePositions, nodeColors, nodeSizes, nodeTypes] = React.useMemo(() => {
    const positions = new Float32Array(nodes.length * 3);
    const colors = new Float32Array(nodes.length * 3);
    const sizes = new Float32Array(nodes.length);
    const types = new Float32Array(nodes.length);
    
    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
      
      const palette = colorPalettes[config.activePaletteIndex];
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = node.size;
      types[i] = node.type;
    });
    
    return [positions, colors, sizes, types];
  }, [nodes]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      pulseUniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={nodes.length}
          array={nodePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-nodeColor"
          count={nodes.length}
          array={nodeColors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-nodeSize"
          count={nodes.length}
          array={nodeSizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-nodeType"
          count={nodes.length}
          array={nodeTypes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={pulseUniforms}
        vertexShader={nodeShader.vertexShader}
        fragmentShader={nodeShader.fragmentShader}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

// Control Panel Component
const ControlPanel: React.FC<{
  onThemeChange: (index: number) => void;
  onFormationChange: () => void;
  onPauseToggle: () => void;
  onResetCamera: () => void;
  density: number;
  onDensityChange: (value: number) => void;
}> = ({ onThemeChange, onFormationChange, onPauseToggle, onResetCamera, density, onDensityChange }) => {
  return (
    <>
      {/* Instructions Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-5 left-5 glass-surface-white border border-alpha-gold/20 rounded-xl p-4 max-w-xs z-20"
      >
        <div className="font-semibold text-alpha-text mb-2 text-sm">Réseau Neuronal Alpha</div>
        <div className="text-alpha-text/80 text-xs leading-relaxed">
          Cliquez pour créer des impulsions d'énergie à travers le réseau. Glissez pour faire pivoter.
        </div>
      </motion.div>

      {/* Theme Selector */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-5 right-5 glass-surface-white border border-alpha-gold/20 rounded-xl p-4 max-w-[150px] z-20"
      >
        <div className="font-semibold text-alpha-text mb-3 text-sm">Thème Visuel</div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {colorPalettes.map((_, index) => (
            <button
              key={index}
              onClick={() => onThemeChange(index)}
              className={`w-9 h-9 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                config.activePaletteIndex === index 
                  ? 'border-alpha-gold shadow-lg shadow-alpha-gold/30' 
                  : 'border-alpha-text/20 hover:border-alpha-text/40'
              }`}
              style={{
                background: index === 0 ? 'linear-gradient(45deg, #B8860B, #DAA520, #FFD700, #FFA500)' :
                           index === 1 ? 'linear-gradient(45deg, #2C3E50, #34495E, #5D6D7E, #85929E)' :
                           index === 2 ? 'linear-gradient(45deg, #1B4F72, #2E86C1, #5DADE2, #85C1E9)' :
                           'linear-gradient(45deg, #922B21, #C0392B, #E74C3C, #F1948A)'
              }}
              aria-label={`Thème ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-alpha-text">
            <span>Densité</span>
            <span>{Math.round(density * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1"
            step="0.1"
            value={density}
            onChange={(e) => onDensityChange(parseFloat(e.target.value))}
            className="w-full h-1 bg-alpha-gold/20 rounded-full appearance-none cursor-pointer slider"
            aria-label="Densité du réseau"
          />
        </div>
      </motion.div>

      {/* Control Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 z-20"
      >
        <button
          onClick={onFormationChange}
          className="glass-surface-white border border-alpha-gold/20 text-alpha-text px-4 py-2 rounded-lg font-medium text-sm hover:bg-alpha-gold/10 transition-all duration-200"
        >
          Formation
        </button>
        <button
          onClick={onPauseToggle}
          className="glass-surface-white border border-alpha-gold/20 text-alpha-text px-4 py-2 rounded-lg font-medium text-sm hover:bg-alpha-gold/10 transition-all duration-200"
        >
          {config.paused ? 'Reprendre' : 'Pause'}
        </button>
        <button
          onClick={onResetCamera}
          className="glass-surface-white border border-alpha-gold/20 text-alpha-text px-4 py-2 rounded-lg font-medium text-sm hover:bg-alpha-gold/10 transition-all duration-200"
        >
          Reset Cam
        </button>
      </motion.div>
    </>
  );
};

export const NeuralNetworkBackground: React.FC<NeuralNetworkBackgroundProps> = ({ 
  isVisible = true, 
  className 
}) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [density, setDensity] = useState(1.0);
  const orbitControlsRef = useRef<any>(null);

  // Initialize neural network
  useEffect(() => {
    const initialNodes = generateNeuralNetwork(config.currentFormation, density);
    setNodes(initialNodes);
  }, [density]);

  const handleThemeChange = useCallback((index: number) => {
    config.activePaletteIndex = index;
    pulseUniforms.uActivePalette.value = index;
  }, []);

  const handleFormationChange = useCallback(() => {
    config.currentFormation = (config.currentFormation + 1) % config.numFormations;
    const newNodes = generateNeuralNetwork(config.currentFormation, density);
    setNodes(newNodes);
  }, [density]);

  const handlePauseToggle = useCallback(() => {
    config.paused = !config.paused;
    if (orbitControlsRef.current) {
      orbitControlsRef.current.autoRotate = !config.paused;
    }
  }, []);

  const handleResetCamera = useCallback(() => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  }, []);

  const handleClick = useCallback((event: React.MouseEvent) => {
    // Add pulse effect on click
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Convert screen coordinates to world coordinates
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(new THREE.PerspectiveCamera());
    
    // Add pulse
    const currentTime = performance.now() / 1000;
    pulseUniforms.uPulsePositions.value[0].copy(vector);
    pulseUniforms.uPulseTimes.value[0] = currentTime;
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 -z-10 ${className || ''}`} onClick={handleClick}>
      <Canvas
        camera={{ position: [0, 5, 22], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 30, 120]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        <NeuralNetwork nodes={nodes} />
        
        <OrbitControls
          ref={orbitControlsRef}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minDistance={5}
          maxDistance={100}
          autoRotate
          autoRotateSpeed={0.15}
          enablePan={false}
        />
        
        <EffectComposer>
          <Bloom 
            intensity={1.5} 
            luminanceThreshold={0.4} 
            luminanceSmoothing={0.68} 
          />
        </EffectComposer>
      </Canvas>

      <ControlPanel
        onThemeChange={handleThemeChange}
        onFormationChange={handleFormationChange}
        onPauseToggle={handlePauseToggle}
        onResetCamera={handleResetCamera}
        density={density}
        onDensityChange={setDensity}
      />
    </div>
  );
};