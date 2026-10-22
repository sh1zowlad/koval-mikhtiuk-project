import * as THREE from 'three';
import { useEffect, useState, type RefObject } from 'react';

/**
 * Validates WebGL and WebGL2 availability with error guarding
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Deep recursive disposal of Three.js Object3D hierarchies (geometries, materials, textures)
 * Eliminates VRAM and JS heap leaks on component unmount and state transitions.
 */
export function deepDisposeObject(obj: THREE.Object3D | null | undefined): void {
  if (!obj) return;

  obj.traverse((child) => {
    // 1. Mesh geometry & materials
    if (child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.Points) {
      if (child.geometry) {
        child.geometry.dispose();
      }

      if (child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          // Dispose textures attached to material
          Object.keys(mat).forEach((key) => {
            const prop = (mat as unknown as Record<string, unknown>)[key];
            if (prop && typeof prop === 'object' && 'isTexture' in prop && Boolean((prop as { isTexture: boolean }).isTexture)) {
              (prop as THREE.Texture).dispose();
            }
          });
          mat.dispose();
        });
      }
    }

    // 2. Light shadow maps
    if ('shadow' in child && child.shadow && typeof child.shadow === 'object') {
      const shadowObj = child.shadow as { map?: THREE.WebGLRenderTarget | null };
      if (shadowObj.map) {
        shadowObj.map.dispose();
      }
    }
  });

  // Clear children array
  while (obj.children.length > 0) {
    const first = obj.children[0];
    obj.remove(first);
  }
}

/**
 * Safely disposes WebGLRenderer and releases WebGL context
 */
export function disposeRenderer(renderer: THREE.WebGLRenderer | null | undefined): void {
  if (!renderer) return;

  try {
    renderer.renderLists?.dispose();
    renderer.dispose();
    // Force context loss to immediately free GPU memory on low-memory mobile devices
    renderer.forceContextLoss();
    if (renderer.domElement && renderer.domElement.parentElement) {
      renderer.domElement.remove();
    }
  } catch (err) {
    console.warn('[ThreeOptimization] Error during renderer disposal:', err);
  }
}

/**
 * React hook to track if canvas container is currently visible in viewport.
 * Used to halt requestAnimationFrame when the canvas is offscreen.
 */
export function useCanvasVisibility(containerRef: RefObject<HTMLElement | null>): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '100px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  return isVisible;
}

/**
 * Calculates safe Device Pixel Ratio capped at 1.5 for mobile / high-DPI screens
 * to prevent GPU fill-rate thermal throttling and frame drops.
 */
export function getOptimizedPixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  return isMobile ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 1.75);
}
