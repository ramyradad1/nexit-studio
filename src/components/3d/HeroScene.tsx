"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Text } from "@react-three/drei";

const vertexShader = `
  attribute float size;
  attribute float phase;
  varying float vPhase;
  varying vec3 vColor;
  void main() {
    vPhase = phase;
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float time;
  varying float vPhase;
  varying vec3 vColor;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.1, dist);
    // Slower twinkle effect
    float twinkle = (sin(time * 0.5 + vPhase) + 1.0) / 2.0;
    float currentOpacity = 0.1 + 0.9 * twinkle;

    gl_FragColor = vec4(vColor, alpha * currentOpacity);
  }
`;

function TechSymbol({
    text,
    position,
    color,
    fontSize = 1,
    speed = 1
}: {
    text: string;
    position: [number, number, number];
    color: string;
    fontSize?: number;
    speed?: number;
}) {
    const ref = useRef<THREE.Mesh>(null!);
    const initialY = position[1];

    useFrame((state) => {
      const t = state.clock.elapsedTime * speed;
      if (ref.current) {
          // Gentle floating motion
          ref.current.position.y = initialY + Math.sin(t) * 0.3;
          // Gentle rotation
          ref.current.rotation.y = Math.sin(t * 0.5) * 0.5;
          ref.current.rotation.z = Math.cos(t * 0.3) * 0.1;
      }
  });

    return (
        <Text
            ref={ref}
            position={position}
            fontSize={fontSize}
            color={color}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
            outlineWidth={0.02}
            outlineColor={color}
            fillOpacity={0.8}
        >
            {text}
        </Text>
    );
}

function LightModeGeometry() {
    return (
        <group>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />

          {/* Code Symbols */}
          <TechSymbol text="< />" position={[-4, 2, -2]} color="#0284c7" fontSize={1.2} speed={0.8} />
          <TechSymbol text="{ }" position={[4, -1, -1]} color="#0f766e" fontSize={1.5} speed={1.2} />
          <TechSymbol text="[]" position={[-2, -3, -3]} color="#0369a1" fontSize={1.3} speed={0.9} />
          <TechSymbol text="/" position={[3, 3, -2]} color="#0ea5e9" fontSize={1.6} speed={1.1} />

          {/* Decorative Particles for light mode */}
          <TechSymbol text="+" position={[-5, 0, -4]} color="#10b981" fontSize={0.6} speed={1.5} />
          <TechSymbol text="*" position={[5, 2, -5]} color="#0284c7" fontSize={0.8} speed={0.7} />
          <TechSymbol text="+" position={[1, -4, -3]} color="#0369a1" fontSize={0.5} speed={1.3} />
      </group>
  );
}

function createSeededRandom(seed: number) {
    let currentSeed = seed;
    return () => {
        currentSeed = (currentSeed * 16807) % 2147483647;
        return (currentSeed - 1) / 2147483646;
    };
}

function Starfield({ theme }: { theme: "light" | "dark" }) {
    const count = 1500;

    const [positions, colors, sizes, phases] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const siz = new Float32Array(count);
        const pha = new Float32Array(count);

        const seededRandom = createSeededRandom(42);

        const isDark = theme === "dark";

        // In dark mode: cyan, sky, and white stars.
        // In light mode: much darker blues and teals to be visible on white.
        const c1 = new THREE.Color(isDark ? "#ffffff" : "#0284c7"); // Bright white vs Dark Sky Blue
        const c2 = new THREE.Color(isDark ? "#06b6d4" : "#0f766e"); // Cyan vs Dark Teal
        const c3 = new THREE.Color(isDark ? "#38bdf8" : "#0369a1"); // Light Sky vs Dark Blue

    for (let i = 0; i < count; i++) {
        const r = 10 + seededRandom() * 40;
        const theta = seededRandom() * 2 * Math.PI;
        const phi = Math.acos(2 * seededRandom() - 1);

        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);

        const randType = seededRandom();
        let c = c1;
        if (randType > 0.66) c = c2;
        else if (randType > 0.33) c = c3;

        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;

        // Make stars much larger
        siz[i] = 0.3 + seededRandom() * 0.6;
        pha[i] = seededRandom() * Math.PI * 2;
    }
        return [pos, col, siz, pha];
    }, [theme]);

    const materialRef = useRef<THREE.ShaderMaterial>(null!);
    const pointsRef = useRef<THREE.Points>(null!);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = state.clock.elapsedTime;
        }
        if (pointsRef.current) {
            // Simulate travelling through space by rotating the sphere
            pointsRef.current.rotation.y += delta * 0.03;
            pointsRef.current.rotation.x += delta * 0.015;
        }
  });

  return (
      <points ref={pointsRef}>
      <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
              <bufferAttribute attach="attributes-color" args={[colors, 3]} />
              <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
              <bufferAttribute attach="attributes-phase" args={[phases, 1]} />
      </bufferGeometry>
          <shaderMaterial
              ref={materialRef}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
        transparent
              // Additive blending works best in dark mode.
              blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
              depthWrite={false}
              uniforms={{ time: { value: 0 } }}
              vertexColors
      />
    </points>
  );
}

export function HeroScene() {
    const { theme } = useTheme();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
        gl={{ antialias: true, alpha: true }}
      >
              {theme === "light" ? <LightModeGeometry /> : <Starfield theme={theme} />}
      </Canvas>
    </div>
  );
}
