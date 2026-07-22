"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function DataParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 600;
  const mouse = useRef(new THREE.Vector2(0, 0));

  const { positions, colors } = (() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = pseudoRandom(i * 3) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(i * 7 + 1) - 1);
      const r = 1.5 + pseudoRandom(i * 11 + 2) * 2;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const mix = pseudoRandom(i * 13 + 3);
      color.setHex(0x4f7cff).lerp(new THREE.Color(0x8b5cf6), mix);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return { positions, colors };
  })();

  const dummy = useRef(new THREE.Object3D()).current;
  const tempColor = useRef(new THREE.Color()).current;

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const instanceColor = meshRef.current.instanceColor;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const wave = Math.sin(time * 0.5 + i * 0.1) * 0.15;
      const orbit = time * 0.15 + i * 0.01;

      dummy.position.set(
        positions[i3] + Math.sin(orbit) * 0.3 + mouse.current.x * 0.2,
        positions[i3 + 1] + wave + mouse.current.y * 0.2,
        positions[i3 + 2] + Math.cos(orbit) * 0.3
      );

      const scale = 0.015 + Math.sin(time * 2 + i) * 0.005;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      if (instanceColor) {
        tempColor.setRGB(colors[i3], colors[i3 + 1], colors[i3 + 2]);
        const pulse = Math.sin(time * 1.5 + i * 0.5) * 0.2 + 0.8;
        tempColor.multiplyScalar(pulse);
        instanceColor.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (instanceColor) instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial transparent opacity={0.85} vertexColors />
    </instancedMesh>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const count = 150;

  const positions = (() => {
    const arr = new Float32Array(count * 6);
    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      const theta1 = pseudoRandom(i * 17) * Math.PI * 2;
      const phi1 = Math.acos(2 * pseudoRandom(i * 19 + 1) - 1);
      const r1 = 1.5 + pseudoRandom(i * 23 + 2) * 1.5;
      const theta2 = theta1 + (pseudoRandom(i * 29 + 3) - 0.5) * 1;
      const phi2 = phi1 + (pseudoRandom(i * 31 + 4) - 0.5) * 0.8;
      const r2 = 1.5 + pseudoRandom(i * 37 + 5) * 1.5;

      arr[i6] = r1 * Math.sin(phi1) * Math.cos(theta1);
      arr[i6 + 1] = r1 * Math.sin(phi1) * Math.sin(theta1);
      arr[i6 + 2] = r1 * Math.cos(phi1);
      arr[i6 + 3] = r2 * Math.sin(phi2) * Math.cos(theta2);
      arr[i6 + 4] = r2 * Math.sin(phi2) * Math.sin(theta2);
      arr[i6 + 5] = r2 * Math.cos(phi2);
    }
    return arr;
  })();

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.elapsedTime;
    lineRef.current.rotation.y = time * 0.05;
    lineRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count * 2}
        />
      </bufferGeometry>
      <lineBasicMaterial color={0x4f7cff} transparent opacity={0.08} />
    </lineSegments>
  );
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.position.y = -2 + Math.sin(time * 0.3) * 0.2;
  });

  return (
    <gridHelper
      ref={ref}
      args={[20, 40, 0x1e1e2e, 0x1e1e2e]}
    />
  );
}

function Scene() {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(time * 0.1) * 0.5;
    state.camera.position.y = 0.5 + Math.sin(time * 0.15) * 0.2;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <DataParticles />
      <ConnectionLines />
      <GridFloor />
    </>
  );
}

export default function DataParticlesScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
