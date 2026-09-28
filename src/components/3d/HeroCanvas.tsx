'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function EmberParticlesCount() {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const particleCount = 180;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;

    const currentPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      currentPositions[i * 3 + 1] += delta * 0.4;
      if (currentPositions[i * 3 + 1] > 5) {
        currentPositions[i * 3 + 1] = -5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FF7A30"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingMetallicWeights() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, index) => {
      child.position.y += Math.sin(t * 1.5 + index) * 0.003;
      child.rotation.x += 0.005;
      child.rotation.y += 0.008;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Floating Plate Left */}
      <mesh position={[-3.8, 1.2, -1]}>
        <cylinderGeometry args={[0.9, 0.9, 0.15, 32]} />
        <meshStandardMaterial color="#1f1f1f" roughness={0.2} metalness={0.9} />
      </mesh>
      
      {/* Floating Dumbbell Right */}
      <mesh position={[3.6, -0.8, 0]}>
        <torusGeometry args={[0.7, 0.2, 16, 32]} />
        <meshStandardMaterial color="#FF4B1F" roughness={0.3} metalness={0.8} emissive="#FF4B1F" emissiveIntensity={0.2} />
      </mesh>

      {/* Floating Kettlebell Top Right */}
      <mesh position={[2.8, 2.0, -2]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#331A12" roughness={0.1} metalness={0.95} wireframe={true} />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, 2, 2]} intensity={3} color="#FF4B1F" distance={10} />
        <pointLight position={[4, -2, 2]} intensity={2} color="#FF9F45" distance={10} />

        <EmberParticlesCount />
        <FloatingMetallicWeights />
      </Canvas>
    </div>
  );
}
