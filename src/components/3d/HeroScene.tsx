"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function GradientSphere({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#06b6d4"
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function GlowTorus({ position, scale, color }: { position: [number, number, number]; scale: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.4;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 48]} />
        <MeshWobbleMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          factor={0.2}
          speed={1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function FloatingCube({ position, scale }: { position: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#10b981"
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    // Seeded pseudo-random for deterministic output
    let seed = 42;
    const seededRandom = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom() - 0.5) * 20;
      pos[i * 3 + 1] = (seededRandom() - 0.5) * 20;
      pos[i * 3 + 2] = (seededRandom() - 0.5) * 10;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#22d3ee"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#06b6d4" />
        <pointLight position={[-5, -3, 2]} intensity={0.5} color="#10b981" />
        <pointLight position={[3, 4, -3]} intensity={0.3} color="#0ea5e9" />

        <GradientSphere position={[-3.5, 1.5, -2]} scale={0.8} speed={1.2} />
        <GradientSphere position={[4, -1, -3]} scale={0.6} speed={0.8} />
        <GlowTorus position={[3, 2, -1]} scale={0.5} color="#06b6d4" />
        <GlowTorus position={[-2, -2.5, -2]} scale={0.4} color="#10b981" />
        <FloatingCube position={[-4, -1, 0]} scale={0.7} />
        <FloatingCube position={[4.5, 1.5, -1]} scale={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
