import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Camera, RotateCcw, Eye } from 'lucide-react';
import { PlantSpecies } from '../types/botanical';
import { PLANTS_DATABASE } from '../data/plantsData';
import { CanvasFallback } from './CanvasFallback';
import {
  isWebGLAvailable,
  deepDisposeObject,
  disposeRenderer,
  getOptimizedPixelRatio
} from '../utils/threeOptimization';

interface MasterGardenCanvasProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

interface Viewpoint {
  id: string;
  label: string;
  position: THREE.Vector3;
  target: THREE.Vector3;
  description: string;
}

const MASTER_VIEWPOINTS: Viewpoint[] = [
  {
    id: 'overview',
    label: '1. Загальна панорама',
    position: new THREE.Vector3(14, 12, 16),
    target: new THREE.Vector3(0, 1.5, 0),
    description: 'Повна композиція природного саду з усіма висотними відмітками рельєфу.'
  },
  {
    id: 'alpine',
    label: '2. Альпійський рокарій',
    position: new THREE.Vector3(-4, 3.5, 5),
    target: new THREE.Vector3(-3.5, 1.2, 0),
    description: 'Вапнякові брили, мінеральний осип та низькорослі подушкові сукуленти.'
  },
  {
    id: 'retaining-wall',
    label: '3. Підпірна стінка',
    position: new THREE.Vector3(2, 4.0, 7),
    target: new THREE.Vector3(1.5, 1.8, 1),
    description: 'Суха кам\'яна кладка тераси зі скельними рослинами у швах.'
  },
  {
    id: 'climbers',
    label: '4. Шпалера з ліанами',
    position: new THREE.Vector3(6, 4.5, 4),
    target: new THREE.Vector3(4.8, 3.0, -1),
    description: 'Дерев\'яна пергола, увита запашною жимолостю та плетистою трояндою.'
  },
  {
    id: 'colors',
    label: '5. Колірна гармонія',
    position: new THREE.Vector3(1, 3.2, 10),
    target: new THREE.Vector3(0, 1.0, 2),
    description: 'Матричні хвилі сеслерії, ковили та фіолетові суцвіття шавлії.'
  }
];

export const MasterGardenCanvas: React.FC<MasterGardenCanvasProps> = ({ onSelectPlant }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeViewpoint, setActiveViewpoint] = useState<string>('overview');
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(() => isWebGLAvailable());
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const isAnimatingRef = useRef<boolean>(isAnimating);
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const isVisibleRef = useRef<boolean>(true);
  const pointerDownPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const hotspotsRef = useRef<{ id: string; mesh: THREE.Mesh; plantId?: string; title: string; category: string }[]>([]);
  const foliageObjectsRef = useRef<{ mesh: THREE.Mesh; speed: number }[]>([]);
  const targetCamPosRef = useRef<THREE.Vector3 | null>(null);
  const targetControlsTargetRef = useRef<THREE.Vector3 | null>(null);
  const onSelectPlantRef = useRef(onSelectPlant);
  useEffect(() => {
    onSelectPlantRef.current = onSelectPlant;
  }, [onSelectPlant]);

  const setCameraView = useCallback((vpId: string) => {
    const vp = MASTER_VIEWPOINTS.find(v => v.id === vpId);
    if (!vp) return;
    setActiveViewpoint(vpId);
    targetCamPosRef.current = vp.position.clone();
    targetControlsTargetRef.current = vp.target.clone();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x182C24);
    scene.fog = new THREE.FogExp2(0x182C24, 0.022);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      (container.clientWidth || 1000) / (container.clientHeight || 650),
      0.5,
      100
    );
    camera.position.set(14, 12, 16);
    cameraRef.current = camera;

    // 3. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch {
      queueMicrotask(() => setWebGlAvailable(false));
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getOptimizedPixelRatio());
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 35;
    controls.target.set(0, 1.5, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xD6D0C3, 0.65);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xFFF9E6, 1.6);
    sunLight.position.set(18, 24, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0xA7B39A, 0x182C24, 0.5);
    scene.add(hemiLight);

    // 6. Procedural Undulating Terrain
    const terrainGeo = new THREE.PlaneGeometry(28, 28, 64, 64);
    terrainGeo.rotateX(-Math.PI / 2);
    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      let elevation = -vx * 0.18 + Math.sin(vx * 0.4) * 0.45 + Math.cos(vz * 0.35) * 0.4;
      if (vx < -2) {
        elevation += 1.2;
      }
      pos.setY(i, elevation);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x384D3B,
      roughness: 0.88,
      metalness: 0.05,
      flatShading: true
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // 7. Retaining Wall in the middle slope
    const wallGroup = new THREE.Group();
    const stoneBlockGeo = new THREE.BoxGeometry(0.7, 0.35, 0.5);
    const stoneMat1 = new THREE.MeshStandardMaterial({ color: 0xB8B0A2, roughness: 0.9 });
    const stoneMat2 = new THREE.MeshStandardMaterial({ color: 0x9E978A, roughness: 0.92 });

    for (let row = 0; row < 5; row++) {
      for (let col = -6; col <= 5; col++) {
        const mat = (col + row) % 2 === 0 ? stoneMat1 : stoneMat2;
        const block = new THREE.Mesh(stoneBlockGeo, mat);
        const stagger = (row % 2) * 0.3;
        const curveOffset = Math.sin((col + 6) * 0.4) * 0.4;
        block.position.set(-2.2 + curveOffset, row * 0.34 + 0.3, col * 0.65 + stagger);
        block.rotation.y = Math.sin(col * 0.3) * 0.15;
        block.castShadow = true;
        block.receiveShadow = true;
        wallGroup.add(block);
      }
    }
    scene.add(wallGroup);

    // 8. Curving Stone Pathway
    const pathGroup = new THREE.Group();
    const flagGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.08, 7);
    const flagMat = new THREE.MeshStandardMaterial({ color: 0xD6D0C3, roughness: 0.95 });

    for (let t = 0; t <= 32; t++) {
      const step = t / 32;
      const px = -6 + step * 12 + Math.sin(step * Math.PI * 2) * 2.2;
      const pz = -7 + step * 14;
      const py = -px * 0.18 + (px < -2 ? 1.2 : 0) + 0.06;
      const flag = new THREE.Mesh(flagGeo, flagMat);
      flag.position.set(px, py, pz);
      flag.rotation.y = (t * 1.3) % Math.PI;
      flag.receiveShadow = true;
      pathGroup.add(flag);
    }
    scene.add(pathGroup);

    // 9. Natural Rock Formations (Alpine Zone)
    const rockGroup = new THREE.Group();
    const rockGeo = new THREE.DodecahedronGeometry(1, 1);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x8C887E, roughness: 0.95, flatShading: true });

    const rockCoords = [
      { x: -5, z: 2, scale: [1.6, 1.2, 1.4], rot: 0.4 },
      { x: -4, z: 3.5, scale: [1.2, 0.9, 1.0], rot: -0.8 },
      { x: -6.5, z: 1.5, scale: [2.0, 1.5, 1.7], rot: 1.2 },
      { x: -3.5, z: -1, scale: [1.4, 1.0, 1.1], rot: 0.2 },
      { x: 3.5, z: -4, scale: [1.1, 0.8, 1.2], rot: -0.5 },
    ];

    rockCoords.forEach(rc => {
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.scale.set(rc.scale[0], rc.scale[1], rc.scale[2]);
      const ry = -rc.x * 0.18 + (rc.x < -2 ? 1.2 : 0) + 0.3;
      rock.position.set(rc.x, ry, rc.z);
      rock.rotation.set(0.2, rc.rot, -0.1);
      rock.castShadow = true;
      rock.receiveShadow = true;
      rockGroup.add(rock);
    });
    scene.add(rockGroup);

    // 10. Specimen Pine (Pinus mugo)
    const pineGroup = new THREE.Group();
    const trunkGeo = new THREE.CylinderGeometry(0.18, 0.28, 1.6, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x423126, roughness: 0.95 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(-6, 2.8, -2);
    trunk.rotation.z = -0.15;
    trunk.castShadow = true;
    pineGroup.add(trunk);

    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x1F3F29, roughness: 0.85, flatShading: true });
    const needleGeo = new THREE.SphereGeometry(0.85, 7, 6);
    
    const foliageOffsets = [
      { x: -6.1, y: 3.6, z: -2.0, s: 1.3 },
      { x: -5.4, y: 3.4, z: -1.7, s: 1.1 },
      { x: -6.8, y: 3.1, z: -2.2, s: 1.0 },
      { x: -5.9, y: 4.3, z: -2.1, s: 0.9 },
    ];

    foliageOffsets.forEach(fo => {
      const clump = new THREE.Mesh(needleGeo, foliageMat);
      clump.position.set(fo.x, fo.y, fo.z);
      clump.scale.set(fo.s, fo.s * 0.75, fo.s);
      clump.castShadow = true;
      clump.receiveShadow = true;
      pineGroup.add(clump);
      foliageObjectsRef.current.push({ mesh: clump, speed: 0.8 });
    });
    scene.add(pineGroup);

    // 11. Billowy Grasses & Perennial Tufts
    const plantGroup = new THREE.Group();
    const grassBladeGeo = new THREE.ConeGeometry(0.35, 1.1, 4);
    const stipaMat = new THREE.MeshStandardMaterial({ color: 0xC8BF89, roughness: 0.8, flatShading: true });
    const salviaMat = new THREE.MeshStandardMaterial({ color: 0x4C3B71, roughness: 0.85 });
    const echinaceaMat = new THREE.MeshStandardMaterial({ color: 0xA24A6A, roughness: 0.85 });
    const sedumMat = new THREE.MeshStandardMaterial({ color: 0x7A8B7B, roughness: 0.9 });

    for (let i = 0; i < 28; i++) {
      const gx = -1 + ((i * 17) % 31 / 31) * 4;
      const gz = 1 + ((i * 13) % 29 / 29) * 6;
      const gy = -gx * 0.18 + 0.45;
      const grass = new THREE.Mesh(grassBladeGeo, stipaMat);
      grass.position.set(gx, gy, gz);
      grass.scale.set(0.8 + (i % 5) * 0.08, 0.9 + (i % 4) * 0.1, 0.8 + (i % 5) * 0.08);
      grass.rotation.y = (i * 0.4);
      grass.castShadow = true;
      plantGroup.add(grass);
      foliageObjectsRef.current.push({ mesh: grass, speed: 1.2 + (i % 3) * 0.3 });
    }

    const salviaSpireGeo = new THREE.CylinderGeometry(0.06, 0.12, 1.2, 5);
    for (let i = 0; i < 18; i++) {
      const sx = 1.5 + ((i * 19) % 27 / 27) * 3.5;
      const sz = -1 + ((i * 11) % 23 / 23) * 4;
      const sy = -sx * 0.18 + 0.5;
      const salvia = new THREE.Mesh(salviaSpireGeo, salviaMat);
      salvia.position.set(sx, sy, sz);
      salvia.rotation.x = ((i % 5) - 2) * 0.03;
      salvia.rotation.z = ((i % 7) - 3) * 0.03;
      salvia.castShadow = true;
      plantGroup.add(salvia);
      foliageObjectsRef.current.push({ mesh: salvia, speed: 1.0 });
    }

    const cushionGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.15, 6);
    for (let i = 0; i < 22; i++) {
      const cx = -6.5 + ((i * 17) % 29 / 29) * 4;
      const cz = 0.5 + ((i * 13) % 23 / 23) * 4.5;
      const cy = -cx * 0.18 + 1.2 + 0.1;
      const cushion = new THREE.Mesh(cushionGeo, i % 2 === 0 ? sedumMat : echinaceaMat);
      cushion.position.set(cx, cy, cz);
      cushion.scale.set(0.6 + (i % 4) * 0.12, 0.5, 0.6 + (i % 4) * 0.12);
      plantGroup.add(cushion);
    }
    scene.add(plantGroup);

    // 12. Timber Pergola / Trellis on the East terrace
    const trellisGroup = new THREE.Group();
    const postGeo = new THREE.BoxGeometry(0.18, 3.2, 0.18);
    const beamGeo = new THREE.BoxGeometry(0.14, 0.18, 4.2);
    const timberMat = new THREE.MeshStandardMaterial({ color: 0x4A3B32, roughness: 0.85 });

    const post1 = new THREE.Mesh(postGeo, timberMat);
    post1.position.set(4.5, 1.6, -1.8);
    const post2 = new THREE.Mesh(postGeo, timberMat);
    post2.position.set(4.5, 1.6, 1.8);
    const post3 = new THREE.Mesh(postGeo, timberMat);
    post3.position.set(6.8, 1.3, -1.8);
    const post4 = new THREE.Mesh(postGeo, timberMat);
    post4.position.set(6.8, 1.3, 1.8);

    const beam1 = new THREE.Mesh(beamGeo, timberMat);
    beam1.position.set(4.5, 3.2, 0);
    const beam2 = new THREE.Mesh(beamGeo, timberMat);
    beam2.position.set(6.8, 2.9, 0);

    post1.castShadow = post2.castShadow = post3.castShadow = post4.castShadow = true;
    trellisGroup.add(post1, post2, post3, post4, beam1, beam2);

    const rafterGeo = new THREE.BoxGeometry(2.8, 0.12, 0.12);
    for (let r = -4; r <= 4; r++) {
      const rafter = new THREE.Mesh(rafterGeo, timberMat);
      rafter.position.set(5.65, 3.1 - (r * 0.03), r * 0.45);
      rafter.castShadow = true;
      trellisGroup.add(rafter);
    }

    const vineGeo = new THREE.SphereGeometry(0.4, 5, 5);
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x2E5A36, roughness: 0.8 });
    for (let v = 0; v < 14; v++) {
      const vine = new THREE.Mesh(vineGeo, vineMat);
      vine.position.set(4.5 + ((v * 7) % 11 - 5) * 0.03, 0.6 + v * 0.22, -1.8 + ((v * 5) % 13 - 6) * 0.03);
      vine.scale.set(0.8, 0.8, 0.8);
      trellisGroup.add(vine);
    }
    scene.add(trellisGroup);

    // 13. Interactive 3D Hotspot Pins
    const hotspotData = [
      { id: 'pinus', x: -6, y: 4.8, z: -2, plantId: 'pinus-mugo-pumilio', title: 'Сосна гірська «Пуміліо»', category: 'Головна домінанта' },
      { id: 'alpine', x: -4.5, y: 2.2, z: 2.5, plantId: 'sempervivum-tectorum', title: 'Молодило в альпійському осипу', category: 'Дренажний біотоп' },
      { id: 'wall', x: -2.0, y: 2.2, z: 0.5, plantId: 'campanula-poscharskyana', title: 'Дзвоники у сухій стінці', category: 'Інженерія терас' },
      { id: 'climber', x: 4.5, y: 3.5, z: -1.8, plantId: 'lonicera-periclymenum', title: 'Пергола з жимолостю в\'юнкою', category: 'Вертикальна опора' },
      { id: 'matrix', x: 1.0, y: 1.8, z: 3.5, plantId: 'stipa-tenuissima', title: 'Матричний масив ковили та шавлії', category: 'Динаміка вітру' },
      { id: 'path', x: -1.5, y: 1.0, z: -2.0, title: 'Серпантинна кам\'яна стежка', category: 'Маршрут руху' }
    ];

    const pinGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const pinRingGeo = new THREE.RingGeometry(0.3, 0.42, 24);

    hotspotData.forEach(hd => {
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xF4F0E6 });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(hd.x, hd.y, hd.z);

      const ringMat = new THREE.MeshBasicMaterial({ color: 0xAD765B, side: THREE.DoubleSide });
      const ringMesh = new THREE.Mesh(pinRingGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      pinMesh.add(ringMesh);

      pinMesh.userData = { id: hd.id, plantId: hd.plantId, title: hd.title, category: hd.category };
      ringMesh.userData = { id: hd.id, plantId: hd.plantId, title: hd.title, category: hd.category };
      scene.add(pinMesh);

      hotspotsRef.current.push({
        id: hd.id,
        mesh: pinMesh,
        plantId: hd.plantId,
        title: hd.title,
        category: hd.category
      });
    });

    // 14. Pointer interaction with drag disambiguation
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const findHotspotHit = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = hotspotsRef.current.map(h => h.mesh);
      // recursive: true to hit pinMesh and its child ringMesh
      const intersects = raycaster.intersectObjects(meshes, true);
      if (intersects.length > 0) {
        let hit = intersects[0].object as THREE.Mesh;
        if (!hit.userData.title && hit.parent instanceof THREE.Mesh) {
          hit = hit.parent;
        }
        return hit;
      }
      return null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const hit = findHotspotHit(e.clientX, e.clientY);
      if (hit) {
        renderer.domElement.style.cursor = 'pointer';
        setHoveredHotspot(hit.userData.title || null);
      } else {
        renderer.domElement.style.cursor = 'default';
        setHoveredHotspot(null);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dx = Math.abs(e.clientX - pointerDownPos.current.x);
      const dy = Math.abs(e.clientY - pointerDownPos.current.y);
      if (dx > 5 || dy > 5) return;

      const hit = findHotspotHit(e.clientX, e.clientY);
      if (hit && hit.userData.plantId) {
        const plant = PLANTS_DATABASE.find(p => p.id === hit.userData.plantId);
        if (plant) onSelectPlantRef.current(plant);
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05, rootMargin: '100px' }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container || !renderer || !camera || container.clientHeight === 0) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 15. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation toward target
      if (targetCamPosRef.current && targetControlsTargetRef.current) {
        camera.position.lerp(targetCamPosRef.current, 0.05);
        controls.target.lerp(targetControlsTargetRef.current, 0.05);

        if (camera.position.distanceTo(targetCamPosRef.current) < 0.08) {
          targetCamPosRef.current = null;
          targetControlsTargetRef.current = null;
        }
      }

      // Wind sway using ref (NO React re-creation of scene)
      if (isAnimatingRef.current) {
        foliageObjectsRef.current.forEach((item, index) => {
          const wave = Math.sin(elapsedTime * item.speed + index * 0.4) * 0.06;
          item.mesh.rotation.z = wave;
        });

        hotspotsRef.current.forEach(h => {
          const scale = 1.0 + Math.sin(elapsedTime * 3.0 + h.mesh.position.x) * 0.15;
          h.mesh.scale.set(scale, scale, scale);
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);

      deepDisposeObject(scene);
      controls.dispose();
      disposeRenderer(renderer);
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
      hotspotsRef.current = [];
      foliageObjectsRef.current = [];
    };
  }, []); // Static dependency array: scene is initialized ONCE and NOT destroyed on wind toggle!

  if (!webGlAvailable) {
    return (
      <CanvasFallback
        title="3D-панорама саду тимчасово недоступна"
        message="Апаратне прискорення WebGL не активовано або обмежено. Всі описи рослин, фото та композиційні схеми залишаються повністю доступними для ознайомлення."
        heightClass="h-[620px] lg:h-[720px]"
        onRetry={() => setWebGlAvailable(true)}
      />
    );
  }

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] rounded-[20px] overflow-hidden shadow-xl border border-[#A7B39A]/30 bg-[#182C24]">
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Viewpoint Controls Bar */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-10 flex flex-wrap gap-1.5 p-1.5 bg-[#182C24]/90 backdrop-blur-md rounded-xl border border-[#A7B39A]/30 shadow-md">
        {MASTER_VIEWPOINTS.map(vp => (
          <button
            key={vp.id}
            onClick={() => setCameraView(vp.id)}
            className={`px-3 py-1.5 text-xs font-sans rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewpoint === vp.id
                ? 'bg-[#64765A] text-[#F4F0E6] shadow-xs font-medium'
                : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-[#64765A]/30'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{vp.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom Information Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-[#182C24]/90 backdrop-blur-md rounded-xl border border-[#A7B39A]/30 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#AD765B]" />
          <div>
            <p className="text-xs font-sans text-[#A7B39A]">
              Активний ракурс
            </p>
            <p className="text-sm font-sans font-medium text-[#F4F0E6]">
              {hoveredHotspot ? (
                <span className="text-[#AD765B] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AD765B]" /> Дослідити: {hoveredHotspot}
                </span>
              ) : (
                MASTER_VIEWPOINTS.find(v => v.id === activeViewpoint)?.description
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setCameraView('overview')}
            className="px-3 py-1.5 text-xs font-sans bg-[#262925] hover:bg-[#64765A] text-[#F4F0E6] rounded-lg border border-[#A7B39A]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Скинути камеру на панораму"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Загальний вигляд
          </button>
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-3 py-1.5 text-xs font-sans bg-[#262925] hover:bg-[#64765A] text-[#F4F0E6] rounded-lg border border-[#A7B39A]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Перемкнути рух рослин від вітру"
          >
            <Camera className="w-3.5 h-3.5" /> {isAnimating ? 'Пауза вітру' : 'Рух вітру'}
          </button>
        </div>
      </div>

      {/* Interactive Helper Overlay */}
      <div className="absolute top-4 right-4 hidden md:flex items-center gap-2 px-3 py-1 text-xs font-sans text-[#A7B39A] bg-[#182C24]/85 backdrop-blur-sm rounded-lg border border-[#A7B39A]/25 pointer-events-none">
        <span>Обертання: миша / жест</span>
        <span>•</span>
        <span>Масштаб: коліщатко</span>
        <span>•</span>
        <span>Мітки: деталі рослини</span>
      </div>
    </div>
  );
};
