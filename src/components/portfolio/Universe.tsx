import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { destinations, type Destination } from '@/lib/portfolio';

function usePalette() {
  return useMemo(() => {
    const style = getComputedStyle(document.documentElement);
    const read = (name: string) => style.getPropertyValue(`--scene-${name}`).trim();
    return { space: read('space'), mint: read('mint'), gold: read('gold'), ice: read('ice'), surface: read('surface') };
  }, []);
}

function Galaxy({ paused }: { paused: boolean }) {
  const palette = usePalette();
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = [], colors = [];
    const green = new THREE.Color(palette.mint), gold = new THREE.Color(palette.gold);
    for (let i = 0; i < 2900; i++) {
      const n = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      const random = n - Math.floor(n);
      const radius = 1.65 + random * 7.7;
      const angle = i * 2.39996 + radius * 0.48;
      const scatter = Math.sin(i * 17.3);
      positions.push(Math.cos(angle) * radius, scatter * (0.13 + radius * 0.045), Math.sin(angle) * radius * 0.74);
      const color = green.clone().lerp(gold, i % 11 === 0 ? 0.9 : 0.08).multiplyScalar(0.35 + random * 0.65);
      colors.push(color.r, color.g, color.b);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [palette]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((_, delta) => { if (ref.current && !paused) ref.current.rotation.y += Math.min(delta, 0.05) * 0.025; });
  return <points ref={ref} geometry={geometry}><pointsMaterial size={0.018} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} /></points>;
}

function Orbit({ radius, color, rotation = 0 }: { radius: number; color: string; rotation?: number }) {
  return <mesh rotation={[Math.PI / 2 + rotation, 0, 0]}><torusGeometry args={[radius, 0.008, 5, 180]} /><meshBasicMaterial color={color} transparent opacity={0.3} /></mesh>;
}

function Monument({ index, active, paused, onSelect }: { index: number; active: boolean; paused: boolean; onSelect: (id: Destination) => void }) {
  const node = destinations[index] ?? destinations[0];
  const palette = usePalette();
  const ref = useRef<THREE.Group>(null);
  const phase = useRef(index);
  const texture = useMemo(() => {
    const data = new Uint8Array(64 * 64 * 4);
    for (let i = 0; i < 64 * 64; i++) { const v = 80 + Math.floor((Math.sin(i * 76.3) + 1) * 70); data.set([v, v, v, 255], i * 4); }
    const map = new THREE.DataTexture(data, 64, 64); map.needsUpdate = true; return map;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  const projected = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }, rawDelta) => {
    const group = ref.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 0.05);
    if (!paused) { phase.current += delta * 0.4; group.rotation.y += delta * 0.13; group.position.y = Math.sin(phase.current) * 0.13; }
    const target = active ? 1.17 : 1;
    group.scale.lerp(new THREE.Vector3(target, target, target), 1 - Math.exp(-3 * delta));
    const label = document.getElementById(`world-label-${node.id}`);
    if (label) {
      group.getWorldPosition(projected);
      projected.y -= index === 0 ? 2 : 0.85;
      projected.project(camera);
      label.style.transform = `translate(-50%, -50%) translate(${(projected.x * 0.5 + 0.5) * size.width}px, ${(-projected.y * 0.5 + 0.5) * size.height}px)`;
    }
  });
  const color = index === 2 || index === 4 ? palette.gold : palette.mint;
  return <group position={[...node.position]}>
    <group ref={ref} onClick={e => { e.stopPropagation(); onSelect(node.id); }} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
      {index === 0 ? <>
        <mesh><icosahedronGeometry args={[1.17, 2]} /><meshStandardMaterial color={palette.surface} metalness={0.85} roughness={0.42} bumpMap={texture} bumpScale={0.12} /></mesh>
        <mesh><icosahedronGeometry args={[1.19, 2]} /><meshBasicMaterial color={palette.mint} wireframe transparent opacity={0.18} /></mesh>
        {[0.35, -0.7, 1.25].map((r, i) => <mesh key={r} rotation={[r, i * 0.75, 0.4]}><torusGeometry args={[1.63 + i * 0.13, 0.025, 8, 120]} /><meshStandardMaterial color={palette.mint} emissive={palette.mint} emissiveIntensity={1.2} metalness={0.5} roughness={0.25} /></mesh>)}
      </> : <>
        <mesh rotation={[0.4, 0.3, Math.PI / 4]}>
          {index === 1 ? <octahedronGeometry args={[0.53, 0]} /> : index === 2 ? <torusKnotGeometry args={[0.34, 0.095, 80, 10, 2, 3]} /> : index === 3 ? <icosahedronGeometry args={[0.48, 0]} /> : <torusGeometry args={[0.36, 0.075, 12, 64]} />}
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.28} metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh rotation-x={Math.PI / 2}><torusGeometry args={[0.75, 0.009, 5, 64]} /><meshBasicMaterial color={color} transparent opacity={0.5} /></mesh>
      </>}
    </group>
  </group>;
}

function Rig({ active }: { active: Destination | null }) {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useRef(new THREE.Vector3(-1.7, 0, 0));
  useFrame(({ pointer }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const node = destinations.find(item => item.id === active);
    const narrow = size.width < 700;
    const portrait = size.height > size.width;
    target.set(narrow ? 1 : -1.7, portrait ? 10.5 : 7.5, narrow ? 25 : portrait ? 26 : 15.5);
    target.x += pointer.x * 0.3 + (node ? node.position[0] * 0.22 : 0);
    camera.position.lerp(target, 1 - Math.exp(-2 * delta));
    const aim = new THREE.Vector3(narrow ? 1 : portrait ? 0 : -1.7, active ? 0.25 : 0, 0);
    look.current.lerp(aim, 1 - Math.exp(-2 * delta));
    camera.lookAt(look.current);
  });
  return null;
}

function Scene({ active, paused, onSelect }: { active: Destination | null; paused: boolean; onSelect: (id: Destination) => void }) {
  const palette = usePalette();
  return <>
    <color attach="background" args={[palette.space]} />
    <ambientLight intensity={0.6} />
    <directionalLight position={[3, 6, 7]} intensity={3} color={palette.ice} />
    <pointLight position={[-4, 2, 3]} intensity={20} color={palette.gold} />
    <Environment resolution={64}><Lightformer intensity={3} position={[0, 6, 0]} scale={[10, 10, 1]} /><Lightformer intensity={2} color={palette.mint} position={[4, 1, 2]} scale={[5, 5, 1]} /></Environment>
    <group position={[1, 0, 0]} rotation={[0, -0.25, 0.08]}>
      <Galaxy paused={paused} />
      {[2.7, 4.2, 6.1, 7.8].map((r, i) => <Orbit key={r} radius={r} color={i % 2 ? palette.gold : palette.mint} rotation={i * 0.025} />)}
      {destinations.map((node, index) => <Monument key={node.id} index={index} active={active === node.id} paused={paused} onSelect={onSelect} />)}
    </group>
    <Rig active={active} />
  </>;
}

export function Universe(props: { active: Destination | null; paused: boolean; onSelect: (id: Destination) => void }) {
  return <div className="universe" aria-label="Interactive 3D portfolio galaxy"><Canvas dpr={[1, 1.5]} camera={{ position: [-1.7, 7.5, 15.5], fov: 43 }} gl={{ antialias: true }}><Suspense fallback={null}><Scene {...props} /></Suspense></Canvas><div className="world-labels">{destinations.map((node, index) => <Button key={node.id} id={`world-label-${node.id}`} variant="navigation" className={`world-label world-label-${node.id} ${props.active === node.id ? 'world-label-active' : ''}`} onClick={() => props.onSelect(node.id)}><span className="world-index">0{index + 1}</span><span>{node.label}</span><span className="label-arrow">↗</span></Button>)}</div></div>;
}