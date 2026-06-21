import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  activePerson: "waqas" | "shakeel";
  theme: "dark" | "light";
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ activePerson, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Keep references to animate and morph colors in real-time
  const stateRef = useRef({
    activePerson,
    theme,
    scrollY: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  // Keep state updated in refs for the loop to access without rebuilding
  useEffect(() => {
    stateRef.current.activePerson = activePerson;
    stateRef.current.theme = theme;
  }, [activePerson, theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        stateRef.current.scrollY = window.scrollY;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== "undefined") {
        // Normalize mouse coordinates to [-0.5, 0.5]
        stateRef.current.targetMouseX = (e.clientX / window.innerWidth) - 0.5;
        stateRef.current.targetMouseY = (e.clientY / window.innerHeight) - 0.5;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    // --- GEOMETRIES & MATERIALS ---
    // Floating particle field
    const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 150 : 400;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Scatter particles in a large 3D box
      particlePositions[i] = (Math.random() - 0.5) * 45; // X
      particlePositions[i + 1] = (Math.random() - 0.5) * 45; // Y
      particlePositions[i + 2] = (Math.random() - 0.5) * 20; // Z
      particleSpeeds[i / 3] = 0.05 + Math.random() * 0.1;
    }
    
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Custom Canvas Texture for perfectly circular glowing particles
    const createParticleTexture = () => {
      const pCanvas = document.createElement("canvas");
      pCanvas.width = 16;
      pCanvas.height = 16;
      const ctx = pCanvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.25,
      map: createParticleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Main central geometry - Torus Knot representing complex tech connections
    const torusGeometry = new THREE.TorusKnotGeometry(2.5, 0.7, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusMesh);

    // Secondary decoration - floating Icosahedron (skills / block wireframe)
    const icoGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    icoMesh.position.set(-6, 3, -2);
    scene.add(icoMesh);

    // Third decoration - secondary floating Ring
    const ringGeometry = new THREE.TorusGeometry(1.2, 0.15, 8, 24);
    const ringMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.position.set(7, -4, -3);
    scene.add(ringMesh);

    // --- LIQUID COLOR LOGIC ---
    // Target and current colors for interpolating seamlessly between states
    const targetMainColor = new THREE.Color();
    const targetSecondaryColor = new THREE.Color();
    const currentMainColor = new THREE.Color();
    const currentSecondaryColor = new THREE.Color();

    const updateTargetColors = () => {
      const activeP = stateRef.current.activePerson;
      const actTheme = stateRef.current.theme;

      if (actTheme === "dark") {
        if (activeP === "waqas") {
          // Luxury Champagne Gold & Warm Ivory Cream
          targetMainColor.setHex(0xceab7c); // Champagne Gold
          targetSecondaryColor.setHex(0xebdcd0); // warm Cream
        } else {
          // Luxury Copper/Rose Gold & Soft Peach
          targetMainColor.setHex(0xdf9e82); // Copper/Rose Gold
          targetSecondaryColor.setHex(0xfad1b8); // Soft Peach
        }
      } else {
        // Light theme values - more elegant and subdued
        if (activeP === "waqas") {
          targetMainColor.setHex(0x0e7490); // Darker cyan
          targetSecondaryColor.setHex(0x059669); // Darker emerald
        } else {
          targetMainColor.setHex(0x6366f1); // Indigo
          targetSecondaryColor.setHex(0xd97706); // Darker amber
        }
      }
    };

    // Set initial values
    updateTargetColors();
    currentMainColor.copy(targetMainColor);
    currentSecondaryColor.copy(targetSecondaryColor);

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas.parentElement || canvas);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smoothly morph colors toward current selected target
      updateTargetColors();
      currentMainColor.lerp(targetMainColor, 0.05);
      currentSecondaryColor.lerp(targetSecondaryColor, 0.05);

      // Apply colors to materials
      const isDark = stateRef.current.theme === "dark";
      torusMaterial.color.copy(currentMainColor);
      torusMaterial.opacity = isDark ? 0.35 : 0.25;

      icoMaterial.color.copy(currentSecondaryColor);
      icoMaterial.opacity = isDark ? 0.2 : 0.15;

      ringMaterial.color.copy(currentMainColor);
      ringMaterial.opacity = isDark ? 0.25 : 0.15;

      particleMaterial.color.copy(currentMainColor);
      // Reduce particle opacity on white backgrounds for contrast
      particleMaterial.opacity = isDark ? 0.7 : 0.45;

      // Damp mouse coordinates for fluid, slow lag
      const state = stateRef.current;
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.05;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.05;

      // Rotate Main meshes based on elapsed time and mouse
      torusMesh.rotation.x = time * 0.08 + state.mouseY * 0.5;
      torusMesh.rotation.y = time * 0.05 + state.mouseX * 0.5;

      icoMesh.rotation.x = -time * 0.05 + state.mouseY * 0.8;
      icoMesh.rotation.y = time * 0.1 + state.mouseX * 0.8;
      // Drifting motion
      icoMesh.position.y = 3 + Math.sin(time * 0.5) * 0.5;

      ringMesh.rotation.x = time * 0.12;
      ringMesh.rotation.z = time * 0.06;
      ringMesh.position.y = -4 + Math.cos(time * 0.4) * 0.4;

      // Parallax effect on whole camera based on scroll
      const scrollRatio = typeof window !== "undefined" ? state.scrollY / (document.documentElement.scrollHeight || 1) : 0;
      camera.position.y = -scrollRatio * 15;
      camera.position.x = state.mouseX * 2;
      camera.lookAt(0, -scrollRatio * 15, 0);

      // Animate particles flowing upwards
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const yIndex = i * 3 + 1;
        // Float particles up. Scroll velocity can speed them up.
        const speedMultiplier = 1 + scrollRatio * 2;
        positions[yIndex] += particleSpeeds[i] * delta * 4 * speedMultiplier;
        
        // Wrap around if gone too high
        if (positions[yIndex] > 20) {
          positions[yIndex] = -20;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Render frame
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      torusGeometry.dispose();
      torusMaterial.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="three-background-canvas"
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: 1 }}
    />
  );
};
