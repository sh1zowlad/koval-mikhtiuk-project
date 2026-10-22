import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CanvasFallback } from './CanvasFallback';
import { isWebGLAvailable, deepDisposeObject, disposeRenderer, getOptimizedPixelRatio } from '../utils/threeOptimization';

export interface Scene3DContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  clock: THREE.Clock;
}

export interface Scene3DProps {
  onInit: (ctx: Scene3DContext) => (() => void) | void;
  onAnimate?: (ctx: Scene3DContext, delta: number) => void;
  className?: string;
  heightClass?: string;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  cameraFov?: number;
  enableShadows?: boolean;
  backgroundColor?: number;
  fogColor?: number;
  fogDensity?: number;
  fallbackTitle?: string;
  fallbackMessage?: string;
  children?: ReactNode;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  onInit,
  onAnimate,
  className = '',
  heightClass = 'h-[480px]',
  cameraPosition = [0, 4.5, 6.5],
  cameraTarget = [0, 0.8, 0],
  cameraFov = 40,
  enableShadows = true,
  backgroundColor = 0x1F2922,
  fogColor = 0x1F2922,
  fogDensity = 0.04,
  fallbackTitle,
  fallbackMessage,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(() => isWebGLAvailable());
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    if (!hasWebGL) return;

    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Environment
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);
    if (fogDensity > 0) {
      scene.fog = new THREE.FogExp2(fogColor, fogDensity);
    }

    // 2. Camera
    const aspect = (container.clientWidth || 800) / (container.clientHeight || 480);
    const camera = new THREE.PerspectiveCamera(cameraFov, aspect, 0.2, 100);
    camera.position.set(...cameraPosition);

    // 3. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getOptimizedPixelRatio());
    if (enableShadows) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.replaceChildren(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 2.0;
    controls.maxDistance = 40;
    controls.target.set(...cameraTarget);

    const clock = new THREE.Clock();
    const ctx: Scene3DContext = { scene, camera, renderer, controls, clock };

    // Execute user custom initialization
    const userCleanup = onInit(ctx);

    // IntersectionObserver to pause requestAnimationFrame when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05, rootMargin: '100px' }
    );
    observer.observe(container);

    // Resize handler
    const onResize = () => {
      if (!container || !renderer || !camera || container.clientHeight === 0) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      controls.update();
      if (onAnimate) {
        onAnimate(ctx, delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);

      if (typeof userCleanup === 'function') {
        userCleanup();
      }

      deepDisposeObject(scene);
      controls.dispose();
      disposeRenderer(renderer);
    };
  }, [
    backgroundColor,
    cameraFov,
    cameraPosition,
    cameraTarget,
    enableShadows,
    fogColor,
    fogDensity,
    onAnimate,
    onInit
  ]);

  if (!hasWebGL) {
    return (
      <CanvasFallback
        title={fallbackTitle}
        message={fallbackMessage}
        heightClass={heightClass}
        onRetry={() => setHasWebGL(true)}
      />
    );
  }

  return (
    <div
      className={`relative w-full ${heightClass} rounded-xl overflow-hidden shadow-xl border border-[#A7B39A]/40 bg-[#1F2922] ${className}`}
    >
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {children}
    </div>
  );
};

export default Scene3D;
