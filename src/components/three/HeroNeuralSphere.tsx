import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroNeuralSphereProps {
  className?: string;
}

export const HeroNeuralSphere: React.FC<HeroNeuralSphereProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire sphere assembly
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Core Glow (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Inner Glowing Core
    const innerCoreGeo = new THREE.SphereGeometry(0.8, 24, 24);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      wireframe: false
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    rootGroup.add(innerCoreMesh);

    // 3. Holographic Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.45
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    rootGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.9, 0.01, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.35
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    rootGroup.add(ring3);

    // 4. Neural Nodes and Connecting Lines
    const nodeCount = 38;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const nodesGroup = new THREE.Group();

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.6 + Math.random() * 0.4;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.copy(pos);
      nodesGroup.add(nodeMesh);
    }
    rootGroup.add(nodesGroup);

    // Synaptic Neural Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.35
    });
    const lineGeometry = new THREE.BufferGeometry();
    const linePoints: number[] = [];

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.35) {
          linePoints.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const neuralLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    rootGroup.add(neuralLines);

    // 5. Cloud of Ambient Neural Particles
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random() * 0.04 + 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 6. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 20);
    pointLightCyan.position.set(3, 3, 3);
    scene.add(pointLightCyan);

    const pointLightPurple = new THREE.PointLight(0x818cf8, 2, 20);
    pointLightPurple.position.set(-3, -3, 2);
    scene.add(pointLightPurple);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse parallax
      targetX += (mouseX * 0.6 - targetX) * 0.05;
      targetY += (mouseY * 0.6 - targetY) * 0.05;

      rootGroup.rotation.y = elapsedTime * 0.15 + targetX;
      rootGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 + targetY;

      // Orbiting rings individual rotations
      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.y = -elapsedTime * 0.2;
      ring3.rotation.x = elapsedTime * 0.18;

      // Pulse core scale slightly
      const pulse = 1 + Math.sin(elapsedTime * 2) * 0.03;
      innerCoreMesh.scale.set(pulse, pulse, pulse);

      // Rotate particle cloud
      particles.rotation.y = -elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div 
      id="hero-neural-sphere-container"
      ref={mountRef} 
      className={`w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] relative pointer-events-auto ${className}`}
      aria-label="3D Interactive Neural Core"
    />
  );
};
