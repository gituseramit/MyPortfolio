import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Project } from '../../types';
import { PROJECTS } from '../../data/portfolioData';
import { soundFx } from '../../utils/audio';
import { ExternalLink, Github, Sparkles, X } from 'lucide-react';

interface ProjectEcosystem3DProps {
  onSelectProjectDetail: (project: Project) => void;
}

export const ProjectEcosystem3D: React.FC<ProjectEcosystem3DProps> = ({ onSelectProjectDetail }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(PROJECTS[0]);
  const [isHovered, setIsHovered] = useState(false);

  const activeProjectRef = useRef<Project | null>(PROJECTS[0]);
  activeProjectRef.current = activeProject;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group containing the whole project constellation
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Central Constellation Hub Core
    const hubGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    worldGroup.add(hubMesh);

    // Project Nodes Setup
    interface NodeObject {
      project: Project;
      mesh: THREE.Mesh;
      glowMesh: THREE.Mesh;
      basePos: THREE.Vector3;
      satellites: THREE.Mesh[];
      techGroup: THREE.Group;
    }

    const nodeObjects: NodeObject[] = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const colors = [0x06b6d4, 0x38bdf8, 0x818cf8, 0x10b981];

    PROJECTS.forEach((proj, idx) => {
      const angle = (idx / PROJECTS.length) * Math.PI * 2;
      const radius = 3.2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.7;
      const z = (Math.sin(angle * 2) * 0.8);
      const pos = new THREE.Vector3(x, y, z);

      const color = colors[idx % colors.length];

      // Node Geometry
      const nodeGeo = new THREE.DodecahedronGeometry(0.55);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { projectId: proj.id };
      worldGroup.add(nodeMesh);

      // Node Glow Halo
      const haloGeo = new THREE.SphereGeometry(0.75, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.25,
        wireframe: true
      });
      const glowMesh = new THREE.Mesh(haloGeo, haloMat);
      glowMesh.position.copy(pos);
      worldGroup.add(glowMesh);

      // Connecting line from Hub to Node
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        pos
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.35
      });
      const line = new THREE.Line(lineGeo, lineMat);
      worldGroup.add(line);

      // Orbiting Tech Satellites Group
      const techGroup = new THREE.Group();
      techGroup.position.copy(pos);
      worldGroup.add(techGroup);

      const satellites: THREE.Mesh[] = [];
      const techCount = Math.min(proj.technologies.length, 5);
      for (let t = 0; t < techCount; t++) {
        const satGeo = new THREE.OctahedronGeometry(0.12);
        const satMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          emissive: 0x0284c7,
          emissiveIntensity: 0.8
        });
        const satMesh = new THREE.Mesh(satGeo, satMat);
        satellites.push(satMesh);
        techGroup.add(satMesh);
      }

      nodeObjects.push({
        project: proj,
        mesh: nodeMesh,
        glowMesh,
        basePos: pos,
        satellites,
        techGroup
      });
    });

    // Ambient and Point Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const light1 = new THREE.PointLight(0x06b6d4, 3, 30);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x818cf8, 2, 30);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Mouse events & Raycasting
    let hoveredNodeId: string | null = null;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = nodeObjects.map(n => n.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.projectId;
        if (hoveredNodeId !== hitId) {
          hoveredNodeId = hitId;
          setIsHovered(true);
          soundFx.playHover();
        }
      } else {
        if (hoveredNodeId !== null) {
          hoveredNodeId = null;
          setIsHovered(false);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = nodeObjects.map(n => n.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.projectId;
        const matched = PROJECTS.find(p => p.id === hitId);
        if (matched) {
          setActiveProject(matched);
          soundFx.playClick();
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

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
    let animId: number;
    const clock = new THREE.Clock();
    let cameraTargetPos = new THREE.Vector3(0, 0, 7.5);
    let cameraTargetLook = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Hub slow rotation
      hubMesh.rotation.y = time * 0.3;
      hubMesh.rotation.x = time * 0.2;

      // Check current active node
      const currentActive = activeProjectRef.current;
      let activeNodeObj: NodeObject | null = null;

      nodeObjects.forEach((nodeObj) => {
        const isSelected = currentActive?.id === nodeObj.project.id;
        const isHit = hoveredNodeId === nodeObj.project.id;

        if (isSelected) {
          activeNodeObj = nodeObj;
        }

        // Float slightly
        nodeObj.mesh.position.y = nodeObj.basePos.y + Math.sin(time * 2 + nodeObj.basePos.x) * 0.12;
        nodeObj.glowMesh.position.copy(nodeObj.mesh.position);
        nodeObj.techGroup.position.copy(nodeObj.mesh.position);

        // Rotation
        nodeObj.mesh.rotation.y = time * (isSelected ? 1.2 : 0.4);
        nodeObj.mesh.rotation.x = time * (isSelected ? 0.8 : 0.3);

        // Scale animation on select/hover
        const targetScale = isSelected ? 1.35 : isHit ? 1.15 : 1.0;
        nodeObj.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        nodeObj.glowMesh.scale.lerp(new THREE.Vector3(targetScale * 1.3, targetScale * 1.3, targetScale * 1.3), 0.1);

        // Satellites orbiting active or hovered nodes
        nodeObj.satellites.forEach((sat, satIdx) => {
          const satAngle = time * (isSelected ? 2.0 : 0.8) + (satIdx / nodeObj.satellites.length) * Math.PI * 2;
          const satDist = isSelected ? 1.3 : 0.9;
          sat.position.set(
            Math.cos(satAngle) * satDist,
            Math.sin(satAngle * 1.5) * 0.4,
            Math.sin(satAngle) * satDist
          );
          sat.rotation.x = time * 2;
          sat.rotation.y = time * 2;
        });
      });

      // Target camera position
      if (activeNodeObj) {
        const target = (activeNodeObj as NodeObject).mesh.position;
        cameraTargetPos.set(target.x * 0.6, target.y * 0.6, 5.2);
        cameraTargetLook.set(target.x * 0.8, target.y * 0.8, target.z);
      } else {
        cameraTargetPos.set(0, 0, 7.5);
        cameraTargetLook.set(0, 0, 0);
      }

      camera.position.lerp(cameraTargetPos, 0.05);
      camera.lookAt(cameraTargetLook);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      hubGeo.dispose();
      hubMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-2xl glass-panel-glow overflow-hidden border border-cyan-500/20 shadow-2xl">
      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        id="project-ecosystem-3d-canvas"
        className={`w-full h-full cursor-${isHovered ? 'pointer' : 'grab'}`}
      />

      {/* Top HUD Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-medium text-cyan-300 tracking-wider">
            3D PROJECT CONSTELLATION • INTERACTIVE
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-md">
          <span>CLICK NODES TO FOCUS</span>
        </div>
      </div>

      {/* Bottom Floating Info Card for the Selected Project */}
      {activeProject && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                  {activeProject.category.toUpperCase()} • {activeProject.status}
                </span>
                <h4 className="text-lg font-bold text-white font-display mt-1">
                  {activeProject.title}
                </h4>
              </div>
              <button
                id="close-active-project-card-btn"
                onClick={() => setActiveProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
                aria-label="Close project preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
              {activeProject.description}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {activeProject.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
              {activeProject.technologies.length > 5 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-400">
                  +{activeProject.technologies.length - 5}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                id={`expand-detail-${activeProject.id}`}
                onClick={() => {
                  soundFx.playClick();
                  onSelectProjectDetail(activeProject);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all font-mono shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                EXPLORE ARCHITECTURE
              </button>

              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
