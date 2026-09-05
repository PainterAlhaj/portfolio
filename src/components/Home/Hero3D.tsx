import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Code2 } from "lucide-react";

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Inner Core: Sleek Icosahedron with Dark Metallic & Glow Edges
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 1);

    // Core Mesh Material - Dark Glossy Metallic
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x111115,
      roughness: 0.15,
      metalness: 0.9,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // Wireframe Outer Layer on Core
    const wireGeo = new THREE.IcosahedronGeometry(1.23, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x444455,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // 2. Outer Technological Cage / Geodesic Sphere
    const cageGeometry = new THREE.IcosahedronGeometry(1.85, 2);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0x22222b,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    mainGroup.add(cageMesh);

    // Outer Cage Node Points (Glowing dots at vertices)
    const cageVertices = cageGeometry.attributes.position.array;
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(cageVertices, 3)
    );
    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    cageMesh.add(nodePoints);

    // 3. Orbital Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const createRing = (radius: number, tube: number, color: number, opacity: number, rotX: number, rotY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        wireframe: false,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    };

    const ring1 = createRing(2.1, 0.008, 0x111111, 0.5, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(2.35, 0.006, 0x6366f1, 0.35, -Math.PI / 4, Math.PI / 4);
    const ring3 = createRing(2.6, 0.005, 0x3b82f6, 0.25, Math.PI / 6, -Math.PI / 3);
    ringGroup.add(ring1, ring2, ring3);

    // 4. Floating Particle Cloud
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      particleScales[i] = Math.random() * 0.04 + 0.01;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x475569,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particlePoints);

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x3b82f6, 2.0);
    directionalLight2.position.set(-5, -5, -2);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x6366f1, 2, 10);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Interactive Mouse Smooth Movement (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous rotations
      coreMesh.rotation.y = elapsedTime * 0.25;
      coreMesh.rotation.x = elapsedTime * 0.15;

      wireMesh.rotation.y = elapsedTime * 0.25;
      wireMesh.rotation.x = elapsedTime * 0.15;

      cageMesh.rotation.y = -elapsedTime * 0.12;
      cageMesh.rotation.z = elapsedTime * 0.08;

      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.z = -elapsedTime * 0.2;
      ring3.rotation.z = elapsedTime * 0.18;

      particlePoints.rotation.y = elapsedTime * 0.04;

      // Mouse inertia / parallax target
      targetRotationY = mouseX * 0.6;
      targetRotationX = mouseY * 0.6;

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Subtle float up and down
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 bg-neutral-300/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* Floating Modern Glassmorphism Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute top-6 left-0 sm:-left-4 lg:left-2 bg-white/70 backdrop-blur-md border border-white/80 shadow-xl shadow-black/5 px-2 py-2 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-3 z-10 hover:scale-105 transition-transform duration-300 pointer-events-auto"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-md">
          <Code2 className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-800 tracking-wide">
            MERN & WebGL
          </p>
          <p className="text-[10px] text-neutral-500 font-medium">
            Full Stack Architecture
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute top-1/3 right-0 sm:-right-4 lg:right-2 bg-white/70 backdrop-blur-md border border-white/80 shadow-xl shadow-black/5 px-2 py-2 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-3 z-10 hover:scale-105 transition-transform duration-300 pointer-events-auto"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white shadow-md">
          <Cpu className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-800 tracking-wide">
            High Performance
          </p>
          <p className="text-[10px] text-neutral-500 font-medium">
            Modern & Scalable APIs
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-4 lg:left-8 bg-white/70 backdrop-blur-md border border-white/80 shadow-xl shadow-black/5 px-2 py-2 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-3 z-10 hover:scale-105 transition-transform duration-300 pointer-events-auto"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-sm">
          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-800 tracking-wide">
            Interactive UI/UX
          </p>
          <p className="text-[10px] text-neutral-500 font-medium">
            3D Motion & Physics
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero3D;
