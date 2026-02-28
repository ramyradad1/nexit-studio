"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

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

        // Small sizes for subtle stars, slightly larger to be visible
        siz[i] = 0.05 + seededRandom() * 0.10;
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
              <Starfield theme={theme} />
      </Canvas>
    </div>
  );
}
