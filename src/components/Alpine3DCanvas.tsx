import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AlpineGardenStyleId } from '../types/landscape';
import { PlantSpecies } from '../types/botanical';
import { PLANTS_DATABASE } from '../data/plantsData';
import { CanvasFallback } from './CanvasFallback';
import {
  isWebGLAvailable,
  deepDisposeObject,
  disposeRenderer,
  getOptimizedPixelRatio
} from '../utils/threeOptimization';

interface Alpine3DCanvasProps {
  currentStyle: AlpineGardenStyleId;
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const Alpine3DCanvas: React.FC<Alpine3DCanvasProps> = ({ currentStyle, onSelectPlant }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(() => isWebGLAvailable());

  const sceneRef = useRef<THREE.Scene | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const clickableMeshesRef = useRef<{ mesh: THREE.Mesh; plantId: string; title: string }[]>([]);
  const onSelectPlantRef = useRef(onSelectPlant);
  useEffect(() => {
    onSelectPlantRef.current = onSelectPlant;
  }, [onSelectPlant]);

  const isVisibleRef = useRef<boolean>(true);
  const pointerDownPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Core Scene Lifecycle
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1F2922);
    scene.fog = new THREE.FogExp2(0x1F2922, 0.04);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      (container.clientWidth || 800) / (container.clientHeight || 480),
      0.2,
      50
    );
    camera.position.set(0, 4.5, 6.5);

    // 3. Renderer
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
    renderer.toneMappingExposure = 1.1;

    container.replaceChildren(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 14;
    controls.target.set(0, 0.8, 0);

    // 5. Lights
    const amb = new THREE.AmbientLight(0xD6D0C3, 0.7);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xFFFBF0, 1.5);
    sun.position.set(6, 12, 5);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.bias = -0.001;
    scene.add(sun);

    // 6. Base Trough / Scree Tray
    const baseGeo = new THREE.BoxGeometry(6.4, 0.4, 4.8);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x2A322C, roughness: 0.9 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.2;
    baseMesh.receiveShadow = true;
    scene.add(baseMesh);

    // Scree Ground Bed
    const screeGeo = new THREE.BoxGeometry(6.2, 0.1, 4.6);
    const screeMat = new THREE.MeshStandardMaterial({ color: 0x8C887E, roughness: 0.95 });
    const screeMesh = new THREE.Mesh(screeGeo, screeMat);
    screeMesh.position.y = 0.05;
    screeMesh.receiveShadow = true;
    scene.add(screeMesh);

    // Dynamic Style Group
    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Raycasting with pointer event drag disambiguation
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const targets = clickableMeshesRef.current.map(c => c.mesh);
      const hits = raycaster.intersectObjects(targets, false);

      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh;
        const info = clickableMeshesRef.current.find(c => c.mesh === hit);
        renderer.domElement.style.cursor = 'pointer';
        setHoveredName(info?.title || null);
      } else {
        renderer.domElement.style.cursor = 'default';
        setHoveredName(null);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      const dx = Math.abs(e.clientX - pointerDownPos.current.x);
      const dy = Math.abs(e.clientY - pointerDownPos.current.y);
      // If user was dragging OrbitControls, ignore click
      if (dx > 5 || dy > 5) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const targets = clickableMeshesRef.current.map(c => c.mesh);
      const hits = raycaster.intersectObjects(targets, false);

      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh;
        const info = clickableMeshesRef.current.find(c => c.mesh === hit);
        if (info) {
          const plant = PLANTS_DATABASE.find(p => p.id === info.plantId);
          if (plant) onSelectPlantRef.current(plant);
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // Visibility Observer to pause rendering when offscreen
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
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);

      // Complete cleanup of scene resources
      deepDisposeObject(scene);
      controls.dispose();
      disposeRenderer(renderer);
      sceneRef.current = null;
      dynamicGroupRef.current = null;
    };
  }, []);

  // 2. Rebuild 3D objects cleanly whenever currentStyle changes
  const buildStyleObjects = useCallback(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

    // Safely dispose all previous geometries and materials
    deepDisposeObject(group);
    clickableMeshesRef.current = [];

    const rockGeo = new THREE.DodecahedronGeometry(0.8, 1);
    const cushionGeo = new THREE.CylinderGeometry(0.3, 0.38, 0.16, 8);

    if (currentStyle === 'mountain-scree') {
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0x8A847A, roughness: 0.95, flatShading: true });
      const rockCoords = [
        { x: -1.4, z: 0.2, s: [1.4, 1.1, 1.2], r: 0.3 },
        { x: -0.6, z: -0.5, s: [1.8, 1.4, 1.5], r: -0.4 },
        { x: 1.2, z: 0.4, s: [1.2, 0.9, 1.1], r: 0.8 },
        { x: 0.5, z: 1.1, s: [0.9, 0.6, 0.8], r: -0.2 }
      ];

      rockCoords.forEach(rc => {
        const rock = new THREE.Mesh(rockGeo, stoneMat);
        rock.scale.set(rc.s[0], rc.s[1], rc.s[2]);
        rock.position.set(rc.x, rc.s[1] * 0.4, rc.z);
        rock.rotation.set(0.2, rc.r, 0.1);
        rock.castShadow = true;
        rock.receiveShadow = true;
        group.add(rock);
      });

      const houseleekMat = new THREE.MeshStandardMaterial({ color: 0x7A8B7B, roughness: 0.8 });
      const saxifragaMat = new THREE.MeshStandardMaterial({ color: 0xB5C2B5, roughness: 0.85 });
      const pineMat = new THREE.MeshStandardMaterial({ color: 0x22442C, roughness: 0.9, flatShading: true });

      const plantLocs = [
        { x: -1.8, z: 0.8, mat: houseleekMat, plantId: 'sempervivum-tectorum', title: 'Sempervivum tectorum (Houseleek)' },
        { x: -0.8, z: 0.6, mat: saxifragaMat, plantId: 'saxifraga-paniculata', title: 'Saxifraga paniculata (Silver Saxifrage)' },
        { x: 0.2, z: -0.2, mat: houseleekMat, plantId: 'sempervivum-tectorum', title: 'Sempervivum crevice cluster' },
        { x: 1.7, z: 0.9, mat: saxifragaMat, plantId: 'saxifraga-paniculata', title: 'Saxifraga crevice drift' },
      ];

      plantLocs.forEach(pl => {
        const c = new THREE.Mesh(cushionGeo, pl.mat);
        c.position.set(pl.x, 0.15, pl.z);
        c.castShadow = true;
        group.add(c);
        clickableMeshesRef.current.push({ mesh: c, plantId: pl.plantId, title: pl.title });
      });

      const pineCone = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.1, 6), pineMat);
      pineCone.position.set(-0.5, 1.4, -0.4);
      pineCone.castShadow = true;
      group.add(pineCone);
      clickableMeshesRef.current.push({ mesh: pineCone, plantId: 'pinus-mugo-pumilio', title: 'Pinus mugo (Anchor Conifer)' });

    } else if (currentStyle === 'minimalist') {
      const slabGeo = new THREE.BoxGeometry(2.4, 0.45, 1.4);
      const slabMat = new THREE.MeshStandardMaterial({ color: 0x484644, roughness: 0.75 });

      const slab1 = new THREE.Mesh(slabGeo, slabMat);
      slab1.position.set(-0.8, 0.3, -0.2);
      slab1.rotation.y = 0.15;
      slab1.castShadow = true;
      slab1.receiveShadow = true;
      group.add(slab1);

      const slab2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 1.1), slabMat);
      slab2.position.set(1.2, 0.22, 0.4);
      slab2.rotation.y = -0.25;
      slab2.castShadow = true;
      slab2.receiveShadow = true;
      group.add(slab2);

      const fescueMat = new THREE.MeshStandardMaterial({ color: 0x7B949A, roughness: 0.85, flatShading: true });
      const fescueLocs = [
        { x: -1.6, z: 0.8 },
        { x: 0.2, z: 0.9 },
        { x: 1.8, z: -0.6 }
      ];

      fescueLocs.forEach(fl => {
        const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.65, 5), fescueMat);
        tuft.position.set(fl.x, 0.35, fl.z);
        tuft.castShadow = true;
        group.add(tuft);
        clickableMeshesRef.current.push({ mesh: tuft, plantId: 'festuca-glauca', title: "Festuca glauca 'Elijah Blue'" });
      });

      const soloHouseleek = new THREE.Mesh(cushionGeo, new THREE.MeshStandardMaterial({ color: 0x64765A }));
      soloHouseleek.position.set(-0.4, 0.58, 0.2);
      soloHouseleek.scale.set(0.8, 0.8, 0.8);
      group.add(soloHouseleek);
      clickableMeshesRef.current.push({ mesh: soloHouseleek, plantId: 'sempervivum-tectorum', title: 'Solitary Sempervivum Specimen' });

    } else {
      const tufaMat = new THREE.MeshStandardMaterial({ color: 0xA39B8C, roughness: 0.98, flatShading: true });
      const tufaCoords = [
        { x: -1.0, z: -0.3, s: [1.6, 1.0, 1.3] },
        { x: 0.8, z: 0.2, s: [1.4, 0.8, 1.1] }
      ];

      tufaCoords.forEach(tc => {
        const rock = new THREE.Mesh(rockGeo, tufaMat);
        rock.scale.set(tc.s[0], tc.s[1], tc.s[2]);
        rock.position.set(tc.x, 0.4, tc.z);
        rock.castShadow = true;
        rock.receiveShadow = true;
        group.add(rock);
      });

      const phloxMat = new THREE.MeshStandardMaterial({ color: 0xB97799, roughness: 0.8 });
      const armeriaMat = new THREE.MeshStandardMaterial({ color: 0xD689A4, roughness: 0.8 });
      const sedumMat = new THREE.MeshStandardMaterial({ color: 0x8C4356, roughness: 0.85 });
      const campanulaMat = new THREE.MeshStandardMaterial({ color: 0x7C89B8, roughness: 0.8 });

      const tapestryDrifts = [
        { x: -1.8, z: 0.6, mat: phloxMat, plantId: 'phlox-subulata', title: 'Phlox subulata (Creeping Phlox Carpet)' },
        { x: -1.1, z: 0.8, mat: armeriaMat, plantId: 'armeria-maritima', title: 'Armeria maritima (Sea Thrift Pompoms)' },
        { x: -0.4, z: 0.3, mat: sedumMat, plantId: 'sedum-spurium', title: 'Sedum spurium (Bronze-Rose Stonecrop)' },
        { x: 0.5, z: 0.8, mat: campanulaMat, plantId: 'campanula-poscharskyana', title: 'Campanula poscharskyana (Serbian Bellflower)' },
        { x: 1.4, z: 0.6, mat: phloxMat, plantId: 'phlox-subulata', title: 'Phlox subulata cascade' },
        { x: 1.9, z: -0.4, mat: armeriaMat, plantId: 'armeria-maritima', title: 'Armeria cushion' },
      ];

      tapestryDrifts.forEach(td => {
        const cushion = new THREE.Mesh(cushionGeo, td.mat);
        cushion.position.set(td.x, 0.16, td.z);
        cushion.scale.set(1.2, 0.8, 1.2);
        cushion.castShadow = true;
        group.add(cushion);
        clickableMeshesRef.current.push({ mesh: cushion, plantId: td.plantId, title: td.title });
      });
    }
  }, [currentStyle]);

  useEffect(() => {
    buildStyleObjects();
  }, [buildStyleObjects]);

  if (!webGlSupported) {
    return (
      <CanvasFallback
        title="3D-модель альпінарію недоступна"
        message="Апаратне прискорення WebGL не активовано або обмежено. Ви можете ознайомитись із пошаровими схемами та правилами композиції нижче."
        onRetry={() => setWebGlSupported(true)}
      />
    );
  }

  return (
    <div className="relative w-full h-[480px] rounded-[18px] overflow-hidden shadow-lg border border-[#A7B39A]/30 bg-[#1F2922]">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Style State Banner */}
      <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-[#182C24]/90 backdrop-blur-md rounded-lg border border-[#A7B39A]/30 flex items-center gap-2 text-xs font-sans text-[#F4F0E6]">
        <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
        <span>Стиль експозиції: <strong className="font-medium text-[#A7B39A]">
          {currentStyle === 'mountain-scree' ? 'Гірський осип' : currentStyle === 'minimalist' ? 'Мінімалістичний' : 'Квітучий килим'}
        </strong></span>
      </div>

      {/* Hover Callout */}
      {hoveredName && (
        <div className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-[#182C24]/90 backdrop-blur-md rounded-lg border border-[#AD765B]/60 text-xs font-sans font-medium text-[#F4F0E6] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#AD765B]" />
          <span>Рослина: {hoveredName}</span>
        </div>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 px-3 py-2 bg-[#182C24]/85 backdrop-blur-sm rounded-lg border border-[#A7B39A]/20 text-xs font-sans text-[#D6D0C3]">
        <span>Обертання: миша / жест • Зум: коліщатко</span>
        <span className="text-[#A7B39A]">Клікніть по рослині для відкриття картки</span>
      </div>
    </div>
  );
};
