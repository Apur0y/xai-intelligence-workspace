"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

function MorphingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -time * 0.15;
      wireRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <group>
      {/* Central morphing sphere */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.15 : 1}
        >
          <icosahedronGeometry args={[1.2, 4]} />
          <MeshDistortMaterial
            color={hovered ? "#8b5cf6" : "#4f7cff"}
            speed={2}
            distort={hovered ? 0.5 : 0.3}
            radius={1}
            transparent
            opacity={0.7}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Wireframe overlay */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh ref={wireRef} scale={1.6}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={0x4f7cff}
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </Float>

      {/* Orbital rings */}
      {[1.8, 2.2, 2.6].map((radius, i) => (
        <OrbitalRing key={i} radius={radius} index={i} />
      ))}

      {/* Floating data nodes */}
      <DataNodes />
    </group>
  );
}

function OrbitalRing({ radius, index }: { radius: number; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.3 + index) * 0.2;
      ref.current.rotation.z = time * (0.1 + index * 0.05);
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.005, 8, 64]} />
      <meshBasicMaterial
        color={0x4f7cff}
        transparent
        opacity={0.15 + index * 0.05}
      />
    </mesh>
  );
}

function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 20;

  const nodes = (() => {
    return Array.from({ length: count }, (_, i) => {
      const theta = (i / count) * Math.PI * 2;
      const phi = Math.acos(2 * ((i * 7 + 3) % count) / count - 1);
      const r = 2.8 + Math.sin(i * 1.3) * 0.4;
      const pr = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      const rand = pr - Math.floor(pr);
      return {
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ] as [number, number, number],
        scale: 0.03 + rand * 0.03,
        speed: 0.5 + rand * 0.5,
      };
    });
  })();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.scale, 8, 8]} />
          <meshBasicMaterial color={0x4f7cff} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={0x4f7cff} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color={0x8b5cf6} />
      <MorphingCore />
    </>
  );
}

export default function SignatureInteraction() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const canvasScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const canvasOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Signature Interaction
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Intelligence{" "}
              <span className="gradient-text">in motion</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-lg">
              Watch as raw data points converge, connect, and crystallize into
              structured intelligence. This is how Xai thinks — in real time,
              in multi-dimensional space.
            </p>

            <div className="space-y-4">
              {[
                { label: "Multi-dimensional analysis", desc: "Data mapped across 20+ feature dimensions" },
                { label: "Real-time convergence", desc: "Patterns emerge as clusters self-organize" },
                { label: "Interactive exploration", desc: "Hover to influence the formation process" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-text-muted">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Canvas */}
          <motion.div
            style={{ scale: canvasScale, opacity: canvasOpacity }}
            className="aspect-square max-h-[600px] rounded-2xl border border-border bg-surface/30 backdrop-blur-sm overflow-hidden relative"
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ alpha: true, antialias: true }}
              dpr={[1, 2]}
              style={{ background: "transparent" }}
            >
              <Scene />
            </Canvas>

            {/* Overlay label */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-md glass text-[10px] text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              Live data processing
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
