"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

const vertexShader = `
  uniform float time;
  attribute float size;
  attribute float phase;
  varying float vPhase;
  varying vec3 vColor;
  void main() {
    vPhase = phase;
    vColor = color;

    // Animate the position to make the stars float and move
    vec3 animatedPos = position;
    animatedPos.x += sin(time * 0.3 + phase) * 2.0;
    animatedPos.y += cos(time * 0.2 + phase) * 2.0;
    animatedPos.z += sin(time * 0.1 + phase) * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(animatedPos, 1.0);
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

    // Softer, more visible glow for better visibility
    float alpha = smoothstep(0.5, 0.0, dist);

    // Natural twinkling with higher minimum brightness
    float twinkle = (sin(time * 0.7 + vPhase) + 1.0) / 2.0;
    twinkle = 0.7 + 0.3 * pow(twinkle, 2.0);

    gl_FragColor = vec4(vColor, alpha * twinkle);
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
  // Drastically reduced count for performance stability on all hardware
  const count = 200;

    const [positions, colors, sizes, phases] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const siz = new Float32Array(count);
        const pha = new Float32Array(count);

        const seededRandom = createSeededRandom(42);

        const isDark = theme === "dark";

      // Realistic star colors: mostly white with subtle tints
      const c1 = new THREE.Color(isDark ? "#ffffff" : "#0284c7");
      const c2 = new THREE.Color(isDark ? "#e0f2fe" : "#0ea5e9");
      const c3 = new THREE.Color(isDark ? "#fef9c3" : "#0369a1");

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

        // Small, moving realistic stars
        siz[i] = 0.2 + seededRandom() * 0.4;
        pha[i] = seededRandom() * Math.PI * 2;
    }
        return [pos, col, siz, pha];
    }, [theme]);

    const materialRef = useRef<THREE.ShaderMaterial>(null!);
    const pointsRef = useRef<THREE.Points>(null!);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
    }),
    []
  );

    useFrame((state, delta) => {
        if (materialRef.current) {
          materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
        }
        if (pointsRef.current) {
          pointsRef.current.rotation.y += delta * 0.02;
          pointsRef.current.rotation.x += delta * 0.01;
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
              blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
              depthWrite={false}
        uniforms={uniforms}
              vertexColors
      />
    </points>
  );
}

export function HeroScene() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 bg-inherit overflow-hidden">
      {isVisible && (
        <Canvas
          key={theme}
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={1}
          style={{ pointerEvents: "none" }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            stencil: false,
            depth: false
          }}
        >
          <Starfield theme={theme} />
        </Canvas>
      )}
    </div>
  );
}
