import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PlaygroundConfig } from '../types/landscape';
import { COLOR_PALETTES } from '../data/colorPalettesData';
import { Sun, Sunset, Moon, Eye, Maximize2, RotateCcw } from 'lucide-react';
import { CanvasFallback } from './CanvasFallback';
import {
  isWebGLAvailable,
  deepDisposeObject,
  disposeRenderer,
  getOptimizedPixelRatio
} from '../utils/threeOptimization';

interface LandscapeBuilderCanvasProps {
  config: PlaygroundConfig;
}

export type LightMode = 'day' | 'golden' | 'dusk';
export type CameraPreset = 'perspective' | 'top' | 'wall' | 'focal';

export const LandscapeBuilderCanvas: React.FC<LandscapeBuilderCanvasProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(() => isWebGLAvailable());

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const windSwayObjectsRef = useRef<THREE.Object3D[]>([]);

  const isVisibleRef = useRef<boolean>(true);
  const [lightMode, setLightMode] = useState<LightMode>('golden');
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('perspective');

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x182C24);
    scene.fog = new THREE.FogExp2(0x182C24, 0.025);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      40,
      (container.clientWidth || 800) / (container.clientHeight || 520),
      0.2,
      60
    );
    camera.position.set(7.5, 6.0, 8.5);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      queueMicrotask(() => setWebGlSupported(false));
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getOptimizedPixelRatio());
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minDistance = 2.5;
    controls.maxDistance = 22;
    controls.target.set(0, 1.0, 0);
    controlsRef.current = controls;

    // Ambient Light
    const amb = new THREE.AmbientLight(0xE0D8C8, 0.65);
    scene.add(amb);
    ambientLightRef.current = amb;

    // Main Sun Directional Light
    const sun = new THREE.DirectionalLight(0xFFF4D6, 1.8);
    sun.position.set(10, 15, 9);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 30;
    sun.shadow.camera.left = -6;
    sun.shadow.camera.right = 6;
    sun.shadow.camera.top = 6;
    sun.shadow.camera.bottom = -6;
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    sunLightRef.current = sun;

    // Architectural Night Spotlight
    const spot = new THREE.SpotLight(0xFFE4AA, 0);
    spot.position.set(-1.8, 4.5, 1.5);
    spot.target.position.set(-1.8, 1.2, -1.2);
    spot.angle = Math.PI / 5;
    spot.penumbra = 0.5;
    spot.castShadow = true;
    scene.add(spot);
    scene.add(spot.target);
    spotLightRef.current = spot;

    // Dynamic root group
    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Pause RAF when scrolled offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05, rootMargin: '100px' }
    );
    observer.observe(container);

    const onResize = () => {
      if (!container || !renderer || !camera || container.clientHeight === 0) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    let clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const time = clock.getElapsedTime();
      
      // Wind animation on registered sway objects
      windSwayObjectsRef.current.forEach(child => {
        child.rotation.z = Math.sin(time * 1.8 + child.position.x) * 0.04;
        child.rotation.x = Math.cos(time * 1.5 + child.position.z) * 0.03;
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      deepDisposeObject(scene);
      controls.dispose();
      disposeRenderer(renderer);
      sceneRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
      dynamicGroupRef.current = null;
      windSwayObjectsRef.current = [];
    };
  }, []);

  // Handle Lighting Modes
  useEffect(() => {
    const scene = sceneRef.current;
    const sun = sunLightRef.current;
    const amb = ambientLightRef.current;
    const spot = spotLightRef.current;
    if (!scene || !sun || !amb || !spot) return;

    if (lightMode === 'day') {
      scene.background = new THREE.Color(0x22362C);
      if (scene.fog) scene.fog.color = new THREE.Color(0x22362C);
      amb.color = new THREE.Color(0xF0ECE1);
      amb.intensity = 0.85;
      sun.color = new THREE.Color(0xFFFFFF);
      sun.intensity = 2.0;
      sun.position.set(11, 16, 8);
      spot.intensity = 0;
    } else if (lightMode === 'golden') {
      scene.background = new THREE.Color(0x27241D);
      if (scene.fog) scene.fog.color = new THREE.Color(0x27241D);
      amb.color = new THREE.Color(0xE8BA9B);
      amb.intensity = 0.65;
      sun.color = new THREE.Color(0xFFA566);
      sun.intensity = 2.4;
      sun.position.set(14, 7, 10);
      spot.intensity = 0.2;
    } else {
      scene.background = new THREE.Color(0x0E1714);
      if (scene.fog) scene.fog.color = new THREE.Color(0x0E1714);
      amb.color = new THREE.Color(0x3B4B52);
      amb.intensity = 0.35;
      sun.color = new THREE.Color(0x60809C);
      sun.intensity = 0.4;
      sun.position.set(-6, 8, -6);
      spot.intensity = 3.5;
    }
  }, [lightMode]);

  // Handle Camera Presets
  const applyCameraPreset = (preset: CameraPreset) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;
    setCameraPreset(preset);

    if (preset === 'perspective') {
      camera.position.set(7.5, 6.0, 8.5);
      controls.target.set(0, 1.0, 0);
    } else if (preset === 'top') {
      camera.position.set(0.1, 12.0, 0.1);
      controls.target.set(0, 0, 0);
    } else if (preset === 'wall') {
      camera.position.set(2.5, 2.2, 4.2);
      controls.target.set(0, 0.8, 0);
    } else if (preset === 'focal') {
      camera.position.set(-3.8, 2.4, 1.5);
      controls.target.set(-1.8, 1.4, -1.2);
    }
    controls.update();
  };

  // Rebuild 3D Garden Procedural Geometry cleanly
  const rebuildGarden = useCallback(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

    // Disposes all previous meshes, geometries and materials to prevent memory leakage
    deepDisposeObject(group);
    windSwayObjectsRef.current = [];

    const scale = config.size === 'pocket-courtyard' ? 0.8 : config.size === 'estate-slope' ? 1.3 : 1.0;

    // 1. TERRAIN BASE
    const groundSize = 9 * scale;
    const terrainGeo = new THREE.PlaneGeometry(groundSize, groundSize, 40, 40);
    terrainGeo.rotateX(-Math.PI / 2);
    const pos = terrainGeo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      let elev = 0;

      if (config.terrain === 'terraced-slope') {
        if (vx < -0.3) {
          elev = 1.35 + Math.sin(vz * 0.4) * 0.12;
        } else if (vx > 0.3) {
          elev = 0.05 + Math.sin(vz * 0.5) * 0.08;
        } else {
          elev = (0.7) - (vx / 0.6) * 0.65;
        }
      } else if (config.terrain === 'sunken-scree') {
        const dist = Math.sqrt(vx * vx + vz * vz);
        elev = dist < 2.6 ? -0.55 + (dist * 0.15) : 0.65 + Math.sin(vx * 0.5) * 0.15;
      } else {
        elev = Math.sin(vx * 0.55) * 0.45 + Math.cos(vz * 0.48) * 0.35 + (vx < 0 ? 0.6 : 0);
      }
      pos.setY(i, elev);
    }
    terrainGeo.computeVertexNormals();

    const isAlpine = config.style === 'alpine-rockery';
    const baseGroundColor = isAlpine ? 0x54524C : 0x2A3E2D;
    const terrainMat = new THREE.MeshStandardMaterial({
      color: baseGroundColor,
      roughness: 0.92,
      flatShading: true
    });
    const terrain = new THREE.Mesh(terrainGeo, terrainMat);
    terrain.receiveShadow = true;
    group.add(terrain);

    // 2. PATHWAY
    const pathCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(3.2 * scale, 0.08, 3.5 * scale),
      new THREE.Vector3(1.8 * scale, 0.09, 1.4 * scale),
      new THREE.Vector3(0.3 * scale, 0.12, 0.0),
      new THREE.Vector3(-0.6 * scale, 0.75, -1.0 * scale),
      new THREE.Vector3(-1.8 * scale, 1.42, -2.4 * scale)
    ]);
    const pathPoints = pathCurve.getPoints(24);
    const flagstoneMat = new THREE.MeshStandardMaterial({ color: 0x9A9386, roughness: 0.88 });
    pathPoints.forEach((pt, idx) => {
      if (idx % 2 === 0) {
        const flag = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.05, 7), flagstoneMat);
        flag.position.set(pt.x, pt.y + 0.02, pt.z);
        flag.rotation.y = (idx * 0.7);
        flag.receiveShadow = true;
        group.add(flag);
      }
    });

    // 3. RETAINING WALL
    const wallType = config.wallType || 'dry-stone';
    const wallLength = 6.4 * scale;
    const wallHeight = 1.35;

    if (wallType === 'board-concrete') {
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x82807B, roughness: 0.85 });
      const mainWall = new THREE.Mesh(new THREE.BoxGeometry(0.48, wallHeight, wallLength), wallMat);
      mainWall.position.set(0, wallHeight / 2, 0);
      mainWall.castShadow = true;
      mainWall.receiveShadow = true;
      group.add(mainWall);

      const capMat = new THREE.MeshStandardMaterial({ color: 0x6E6C68, roughness: 0.75 });
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.08, wallLength + 0.1), capMat);
      cap.position.set(0, wallHeight + 0.04, 0);
      cap.castShadow = true;
      group.add(cap);
    } else {
      const stoneColors = [0x7A7468, 0x8A8376, 0x9B9384, 0x666055, 0x857E70];
      const rows = 6;
      const stonesPerRow = Math.floor(12 * scale);
      const rowHeight = wallHeight / rows;
      const stoneLength = wallLength / stonesPerRow;

      for (let r = 0; r < rows; r++) {
        const yPos = r * rowHeight + rowHeight / 2;
        const rowOffset = (r % 2 === 1) ? stoneLength * 0.45 : 0;

        for (let s = 0; s < stonesPerRow; s++) {
          const zPos = -wallLength / 2 + s * stoneLength + stoneLength / 2 + rowOffset;
          if (zPos > wallLength / 2 || zPos < -wallLength / 2) continue;

          const stoneColor = stoneColors[(r * 3 + s * 2) % stoneColors.length];
          const stoneMat = new THREE.MeshStandardMaterial({
            color: stoneColor,
            roughness: 0.95,
            flatShading: true
          });

          const stoneWidth = 0.44 + (Math.sin(r + s) * 0.06);
          const stoneH = rowHeight * 0.94;
          const stoneGeo = new THREE.BoxGeometry(stoneWidth, stoneH, stoneLength * 0.92);
          const stoneMesh = new THREE.Mesh(stoneGeo, stoneMat);
          
          stoneMesh.position.set(-(r * 0.025), yPos, zPos);
          stoneMesh.rotation.y = (Math.sin(s * 1.5) * 0.05);
          stoneMesh.castShadow = true;
          stoneMesh.receiveShadow = true;
          group.add(stoneMesh);

          if (wallType === 'pocket-wall' || (wallType === 'dry-stone' && (s + r) % 5 === 0)) {
            const sedumMat = new THREE.MeshStandardMaterial({
              color: (s % 2 === 0) ? 0x6E8552 : 0x8F5844,
              roughness: 0.9,
              flatShading: true
            });
            const sedum = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09, 1), sedumMat);
            sedum.position.set(stoneWidth / 2 + 0.04, yPos - 0.02, zPos + (Math.sin(s) * 0.08));
            group.add(sedum);
          }
        }
      }

      const copingCount = Math.floor(stonesPerRow * 0.8);
      const copingLen = wallLength / copingCount;
      for (let c = 0; c < copingCount; c++) {
        const capMat = new THREE.MeshStandardMaterial({ color: 0x9C9588, roughness: 0.9, flatShading: true });
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.1, copingLen * 0.95), capMat);
        cap.position.set(-0.15, wallHeight + 0.05, -wallLength / 2 + c * copingLen + copingLen / 2);
        cap.castShadow = true;
        group.add(cap);
      }
    }

    // 4. FOCAL ANCHOR
    const focal = config.focalPoint || 'specimen-pine';

    if (focal === 'specimen-pine') {
      const pineGroup = new THREE.Group();
      pineGroup.position.set(-2.0 * scale, 1.35, -1.4 * scale);

      const barkMat = new THREE.MeshStandardMaterial({ color: 0x3D2D23, roughness: 0.95, flatShading: true });
      const trunk1 = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 1.4, 7), barkMat);
      trunk1.position.set(0, 0.65, 0);
      trunk1.rotation.z = -0.15;
      trunk1.castShadow = true;
      pineGroup.add(trunk1);

      const trunk2 = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.16, 1.2, 6), barkMat);
      trunk2.position.set(0.15, 0.5, 0.12);
      trunk2.rotation.x = 0.25;
      trunk2.rotation.z = 0.3;
      trunk2.castShadow = true;
      pineGroup.add(trunk2);

      const needleMat = new THREE.MeshStandardMaterial({ color: 0x1B3D26, roughness: 0.85, flatShading: true });
      const needlePads = [
        { x: -0.2, y: 1.3, z: 0.1, r: 0.75 },
        { x: 0.35, y: 1.15, z: 0.3, r: 0.6 },
        { x: -0.4, y: 0.95, z: -0.25, r: 0.55 },
        { x: 0.1, y: 1.6, z: -0.1, r: 0.85 }
      ];
      needlePads.forEach(pad => {
        const cloud = new THREE.Mesh(new THREE.DodecahedronGeometry(pad.r, 1), needleMat);
        cloud.position.set(pad.x, pad.y, pad.z);
        cloud.scale.set(1.2, 0.6, 1.1);
        cloud.castShadow = true;
        pineGroup.add(cloud);
        windSwayObjectsRef.current.push(cloud);
      });
      group.add(pineGroup);

    } else if (focal === 'megalithic-boulder') {
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x7E786E, roughness: 0.95, flatShading: true });
      const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(1.35, 1), rockMat);
      boulder.position.set(-1.8 * scale, 1.7, -1.2 * scale);
      boulder.scale.set(1.5, 1.2, 1.1);
      boulder.rotation.set(0.3, 0.6, 0.2);
      boulder.castShadow = true;
      boulder.receiveShadow = true;
      group.add(boulder);

      for (let b = 0; b < 3; b++) {
        const subRock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45 - b * 0.1, 1), rockMat);
        subRock.position.set(
          -1.8 * scale + Math.sin(b * 2) * 1.3,
          1.4,
          -1.2 * scale + Math.cos(b * 2) * 1.1
        );
        subRock.castShadow = true;
        group.add(subRock);
      }

    } else if (focal === 'curving-stone-stair') {
      const stairMat = new THREE.MeshStandardMaterial({ color: 0x948D80, roughness: 0.88 });
      for (let s = 0; s < 6; s++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.22, 0.55), stairMat);
        step.position.set(-0.25 + s * 0.18, 0.15 + s * 0.22, -0.8 + s * 0.42);
        step.rotation.y = s * 0.08;
        step.castShadow = true;
        step.receiveShadow = true;
        group.add(step);
      }

    } else {
      const basinMat = new THREE.MeshStandardMaterial({ color: 0x2A2927, roughness: 0.6 });
      const basinRim = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.85, 0.45, 20), basinMat);
      basinRim.position.set(-1.8 * scale, 1.5, -1.2 * scale);
      basinRim.castShadow = true;
      group.add(basinRim);

      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x1A3835,
        roughness: 0.08,
        metalness: 0.85
      });
      const water = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.42, 20), waterMat);
      water.position.set(-1.8 * scale, 1.53, -1.2 * scale);
      group.add(water);

      const lilyMat = new THREE.MeshStandardMaterial({ color: 0x486B3E, roughness: 0.5 });
      for (let l = 0; l < 4; l++) {
        const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.02, 8), lilyMat);
        pad.position.set(
          -1.8 * scale + Math.sin(l * 1.5) * 0.4,
          1.75,
          -1.2 * scale + Math.cos(l * 1.5) * 0.4
        );
        group.add(pad);
      }
    }

    // 5. COLOR PALETTE BOTANICAL MATRIX
    const pal = COLOR_PALETTES.find(p => p.id === config.paletteId) || COLOR_PALETTES[0];
    const c1 = parseInt(pal.dominantColors[0].replace('#', '0x'), 16);
    const c2 = parseInt(pal.dominantColors[1].replace('#', '0x'), 16);
    const c3 = parseInt(pal.dominantColors[2]?.replace('#', '0x') || '0x64765A', 16);

    const matFlower1 = new THREE.MeshStandardMaterial({ color: c1, roughness: 0.75, flatShading: true });
    const matFlower2 = new THREE.MeshStandardMaterial({ color: c2, roughness: 0.75, flatShading: true });
    const matGrass = new THREE.MeshStandardMaterial({ color: c3, roughness: 0.85, flatShading: true });

    const plantDrifts = [
      { count: 14, xCenter: 1.8 * scale, zCenter: 1.8 * scale, radius: 2.0 * scale, yBase: 0.1 },
      { count: 12, xCenter: -1.6 * scale, zCenter: 1.2 * scale, radius: 1.6 * scale, yBase: 1.4 },
      { count: 8, xCenter: 0.4 * scale, zCenter: -1.2 * scale, radius: 1.2 * scale, yBase: 0.1 }
    ];

    plantDrifts.forEach((drift, driftIdx) => {
      for (let p = 0; p < drift.count; p++) {
        const angle = (p / drift.count) * Math.PI * 2 + (p * 0.3);
        const dist = ((p * 7) % 11 / 11) * drift.radius;
        const px = drift.xCenter + Math.cos(angle) * dist;
        const pz = drift.zCenter + Math.sin(angle) * dist;

        const plantType = (p + driftIdx) % 3;
        const plantGroup = new THREE.Group();
        plantGroup.position.set(px, drift.yBase, pz);
        windSwayObjectsRef.current.push(plantGroup);

        if (plantType === 0) {
          const stem = new THREE.Mesh(
            new THREE.CylinderGeometry(0.015, 0.02, 0.6, 5),
            new THREE.MeshStandardMaterial({ color: 0x364D33 })
          );
          stem.position.y = 0.3;
          plantGroup.add(stem);

          const spire = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.42, 6), matFlower1);
          spire.position.y = 0.55;
          spire.castShadow = true;
          plantGroup.add(spire);

        } else if (plantType === 1) {
          const mound = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 6), matFlower2);
          mound.scale.set(1.1, 0.65, 1.1);
          mound.position.y = 0.18;
          mound.castShadow = true;
          plantGroup.add(mound);

        } else {
          const grassCluster = new THREE.Group();
          for (let b = 0; b < 5; b++) {
            const blade = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.55, 4), matGrass);
            blade.position.set(Math.sin(b * 1.2) * 0.08, 0.26, Math.cos(b * 1.2) * 0.08);
            blade.rotation.z = (Math.sin(b) * 0.22);
            blade.rotation.x = (Math.cos(b) * 0.22);
            grassCluster.add(blade);
          }
          plantGroup.add(grassCluster);
        }

        group.add(plantGroup);
      }
    });

    // 6. PERGOLA
    if (config.climberId) {
      const pergolaGroup = new THREE.Group();
      pergolaGroup.position.set(2.4 * scale, 0.05, -1.8 * scale);

      const timberMat = new THREE.MeshStandardMaterial({ color: 0x48372A, roughness: 0.85 });

      const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.7, 0.14), timberMat);
      post1.position.set(-0.8, 1.35, 0);
      post1.castShadow = true;
      pergolaGroup.add(post1);

      const post2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.7, 0.14), timberMat);
      post2.position.set(0.8, 1.35, 0);
      post2.castShadow = true;
      pergolaGroup.add(post2);

      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.16, 0.16), timberMat);
      beam.position.set(0, 2.65, 0);
      beam.castShadow = true;
      pergolaGroup.add(beam);

      const wireMat = new THREE.MeshStandardMaterial({ color: 0x6E685F });
      for (let w = 1; w <= 5; w++) {
        const slat = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 1.5, 4), wireMat);
        slat.rotation.z = Math.PI / 2;
        slat.position.set(0, w * 0.45, 0);
        pergolaGroup.add(slat);
      }

      const isRedAutumn = config.climberId === 'parthenocissus-quinquefolia';
      const climberLeafMat = new THREE.MeshStandardMaterial({
        color: isRedAutumn ? 0x9B2F2A : 0x3E6335,
        roughness: 0.85,
        flatShading: true
      });

      const leafClusters = [
        { x: -0.65, y: 0.9, z: 0.05, s: 0.35 },
        { x: -0.5, y: 1.6, z: -0.05, s: 0.45 },
        { x: 0.0, y: 2.2, z: 0.08, s: 0.55 },
        { x: 0.55, y: 2.4, z: -0.04, s: 0.48 },
        { x: 0.7, y: 1.4, z: 0.06, s: 0.4 }
      ];

      leafClusters.forEach(lc => {
        const leafMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(lc.s, 1), climberLeafMat);
        leafMesh.position.set(lc.x, lc.y, lc.z);
        leafMesh.scale.set(1.2, 0.9, 0.7);
        leafMesh.castShadow = true;
        pergolaGroup.add(leafMesh);
        windSwayObjectsRef.current.push(leafMesh);
      });

      if (config.climberId === 'wisteria-sinensis' || config.climberId === 'clematis-vitalba') {
        const bloomColor = config.climberId === 'wisteria-sinensis' ? 0x7E68A8 : 0xEAE2CF;
        const bloomMat = new THREE.MeshStandardMaterial({ color: bloomColor, roughness: 0.75, flatShading: true });
        for (let raceme = 0; raceme < 4; raceme++) {
          const floral = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.45, 5), bloomMat);
          floral.position.set(-0.4 + raceme * 0.3, 2.2, 0.12);
          floral.rotation.x = Math.PI;
          floral.castShadow = true;
          pergolaGroup.add(floral);
        }
      }

      group.add(pergolaGroup);
    }
  }, [config]);

  useEffect(() => {
    rebuildGarden();
  }, [rebuildGarden]);

  if (!webGlSupported) {
    return (
      <CanvasFallback
        title="3D Студія ландшафту недоступна"
        message="Апаратне прискорення WebGL не активовано або обмежено. Ви можете продовжувати налаштовувати параметри та генерувати інженерний бриф у 2D-режимі."
        heightClass="h-[520px]"
        onRetry={() => setWebGlSupported(true)}
      />
    );
  }

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-[#A7B39A]/40 bg-[#182C24]">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Controls Bar: Light Mode & Camera Viewpoints */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Light Atmosphere Switcher */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-[#182C24]/90 backdrop-blur-md rounded-xl border border-[#A7B39A]/30 text-xs shadow-lg">
          <button
            onClick={() => setLightMode('day')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              lightMode === 'day' ? 'bg-[#A7B39A] text-[#182C24] font-semibold' : 'text-[#D6D0C3] hover:text-white'
            }`}
            title="Денне освітлення"
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">День</span>
          </button>
          <button
            onClick={() => setLightMode('golden')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              lightMode === 'golden' ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold' : 'text-[#D6D0C3] hover:text-white'
            }`}
            title="Золота година заходу сонця"
          >
            <Sunset className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Захід</span>
          </button>
          <button
            onClick={() => setLightMode('dusk')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
              lightMode === 'dusk' ? 'bg-[#3B4B52] text-[#F4F0E6] font-semibold' : 'text-[#D6D0C3] hover:text-white'
            }`}
            title="Сутінки та підсвітка"
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Сутінки</span>
          </button>
        </div>

        {/* Camera Preset Selectors */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 bg-[#182C24]/90 backdrop-blur-md rounded-xl border border-[#A7B39A]/30 text-xs shadow-lg">
          <button
            onClick={() => applyCameraPreset('perspective')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              cameraPreset === 'perspective' ? 'bg-[#64765A] text-white font-medium' : 'text-[#D6D0C3] hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">3D Перспектива</span>
          </button>
          <button
            onClick={() => applyCameraPreset('top')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              cameraPreset === 'top' ? 'bg-[#64765A] text-white font-medium' : 'text-[#D6D0C3] hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Генплан</span>
          </button>
          <button
            onClick={() => applyCameraPreset('wall')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              cameraPreset === 'wall' ? 'bg-[#64765A] text-white font-medium' : 'text-[#D6D0C3] hover:text-white'
            }`}
          >
            <span className="hidden md:inline">Стінка</span>
          </button>
          <button
            onClick={() => applyCameraPreset('focal')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              cameraPreset === 'focal' ? 'bg-[#64765A] text-white font-medium' : 'text-[#D6D0C3] hover:text-white'
            }`}
          >
            <span className="hidden md:inline">Фокус</span>
          </button>
          <button
            onClick={() => applyCameraPreset('perspective')}
            className="p-1.5 rounded-lg text-[#D6D0C3] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Скинути ракурс"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Status Banner */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between px-3.5 py-2.5 bg-[#182C24]/90 backdrop-blur-md rounded-xl border border-[#A7B39A]/30 text-xs font-mono text-[#D6D0C3]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A7B39A] animate-pulse" />
          <span className="font-semibold text-[#F4F0E6]">Генеративний 3D простір саду</span>
        </div>
        <div className="text-[11px] text-[#A7B39A] hidden sm:block">
          ЛКМ: Обертання • ПКМ: Панорамування • Колесо: Зум
        </div>
      </div>
    </div>
  );
};
