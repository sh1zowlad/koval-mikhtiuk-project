import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RetainingWallId } from '../types/landscape';
import { PlantSpecies } from '../types/botanical';
import { PLANTS_DATABASE } from '../data/plantsData';
import { Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { CanvasFallback } from './CanvasFallback';
import {
  isWebGLAvailable,
  deepDisposeObject,
  disposeRenderer,
  getOptimizedPixelRatio
} from '../utils/threeOptimization';

interface RetainingWall3DCanvasProps {
  wallType: RetainingWallId;
  showDrainageCutaway: boolean;
  onToggleDrainage: () => void;
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const RetainingWall3DCanvas: React.FC<RetainingWall3DCanvasProps> = ({
  wallType,
  showDrainageCutaway,
  onToggleDrainage,
  onSelectPlant
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(() => isWebGLAvailable());

  const sceneRef = useRef<THREE.Scene | null>(null);
  const wallGroupRef = useRef<THREE.Group | null>(null);
  const cutawayGroupRef = useRef<THREE.Group | null>(null);
  const interactiveObjectsRef = useRef<{ mesh: THREE.Mesh; label: string; plantId?: string }[]>([]);
  const onSelectPlantRef = useRef(onSelectPlant);
  useEffect(() => {
    onSelectPlantRef.current = onSelectPlant;
  }, [onSelectPlant]);

  const isVisibleRef = useRef<boolean>(true);
  const pointerDownPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!webGlSupported) return;

    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1B231F);
    scene.fog = new THREE.FogExp2(0x1B231F, 0.04);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      42,
      (container.clientWidth || 800) / (container.clientHeight || 480),
      0.2,
      50
    );
    camera.position.set(4.5, 3.2, 5.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebGlSupported(false);
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getOptimizedPixelRatio());
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.replaceChildren(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 14;
    controls.target.set(0, 1.2, 0);

    const amb = new THREE.AmbientLight(0xD6D0C3, 0.7);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xFFF9E6, 1.6);
    sun.position.set(8, 12, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.bias = -0.001;
    scene.add(sun);

    // Ground Planes
    const lowerGroundGeo = new THREE.PlaneGeometry(8, 5);
    lowerGroundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x384D3B, roughness: 0.9 });
    const lowerGround = new THREE.Mesh(lowerGroundGeo, groundMat);
    lowerGround.position.set(0, 0, 2.5);
    lowerGround.receiveShadow = true;
    scene.add(lowerGround);

    const upperGroundGeo = new THREE.PlaneGeometry(8, 5);
    upperGroundGeo.rotateX(-Math.PI / 2);
    const upperGround = new THREE.Mesh(upperGroundGeo, groundMat);
    upperGround.position.set(0, 2.2, -2.5);
    upperGround.receiveShadow = true;
    scene.add(upperGround);

    // Wall dynamic group
    const wallGroup = new THREE.Group();
    scene.add(wallGroup);
    wallGroupRef.current = wallGroup;

    // Cutaway group (drainage layers)
    const cutawayGroup = new THREE.Group();
    scene.add(cutawayGroup);
    cutawayGroupRef.current = cutawayGroup;

    // Raycaster with pointer event drag disambiguation
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const targets = interactiveObjectsRef.current.map(o => o.mesh);
      const hits = raycaster.intersectObjects(targets, false);

      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh;
        const obj = interactiveObjectsRef.current.find(o => o.mesh === hit);
        renderer.domElement.style.cursor = 'pointer';
        setHoveredPart(obj?.label || null);
      } else {
        renderer.domElement.style.cursor = 'default';
        setHoveredPart(null);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      const dx = Math.abs(e.clientX - pointerDownPos.current.x);
      const dy = Math.abs(e.clientY - pointerDownPos.current.y);
      if (dx > 5 || dy > 5) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const targets = interactiveObjectsRef.current.map(o => o.mesh);
      const hits = raycaster.intersectObjects(targets, false);

      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh;
        const obj = interactiveObjectsRef.current.find(o => o.mesh === hit);
        if (obj?.plantId) {
          const plant = PLANTS_DATABASE.find(p => p.id === obj.plantId);
          if (plant) onSelectPlantRef.current(plant);
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // Pause rendering when canvas is outside viewport
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

      deepDisposeObject(scene);
      controls.dispose();
      disposeRenderer(renderer);
      sceneRef.current = null;
      wallGroupRef.current = null;
      cutawayGroupRef.current = null;
    };
  }, []);

  // Rebuild wall and cutaway geometry cleanly without memory leaks
  const rebuildWall = useCallback(() => {
    const wallGroup = wallGroupRef.current;
    const cutawayGroup = cutawayGroupRef.current;
    if (!wallGroup || !cutawayGroup) return;

    // Disposes all previous meshes, geometries and materials
    deepDisposeObject(wallGroup);
    deepDisposeObject(cutawayGroup);
    interactiveObjectsRef.current = [];

    const crevicePlantGeo = new THREE.SphereGeometry(0.32, 6, 6);
    const bellflowerMat = new THREE.MeshStandardMaterial({ color: 0x7C89B8, roughness: 0.8 });
    const sedumMat = new THREE.MeshStandardMaterial({ color: 0x8C4356, roughness: 0.85 });
    const thymeMat = new THREE.MeshStandardMaterial({ color: 0x8F6593, roughness: 0.85 });

    if (wallType === 'dry-stone') {
      const stoneGeo = new THREE.BoxGeometry(0.8, 0.32, 0.6);
      const stoneMat1 = new THREE.MeshStandardMaterial({ color: 0x9E978A, roughness: 0.95 });
      const stoneMat2 = new THREE.MeshStandardMaterial({ color: 0xB5ADA0, roughness: 0.92 });

      for (let r = 0; r < 7; r++) {
        const rowY = r * 0.32 + 0.16;
        const batterZ = r * 0.05;
        for (let c = -4; c <= 4; c++) {
          const stone = new THREE.Mesh(stoneGeo, (r + c) % 2 === 0 ? stoneMat1 : stoneMat2);
          const stagger = (r % 2) * 0.35;
          stone.position.set(c * 0.78 + stagger, rowY, -batterZ);
          stone.rotation.y = ((c * 17) % 7 - 3) * 0.015;
          stone.castShadow = true;
          stone.receiveShadow = true;
          wallGroup.add(stone);
        }
      }

      const bellflower = new THREE.Mesh(crevicePlantGeo, bellflowerMat);
      bellflower.position.set(-0.8, 1.2, 0.3);
      bellflower.scale.set(1.4, 0.8, 1.2);
      wallGroup.add(bellflower);
      interactiveObjectsRef.current.push({
        mesh: bellflower,
        label: 'Serbian Bellflower (Campanula poscharskyana) у швах сухої кладки',
        plantId: 'campanula-poscharskyana'
      });

      const thyme = new THREE.Mesh(crevicePlantGeo, thymeMat);
      thyme.position.set(1.2, 2.3, -0.4);
      thyme.scale.set(1.8, 0.6, 1.2);
      wallGroup.add(thyme);
      interactiveObjectsRef.current.push({
        mesh: thyme,
        label: 'Wild Creeping Thyme (Thymus serpyllum) на гребені стінки',
        plantId: 'thymus-serpyllum'
      });

    } else if (wallType === 'natural-stone') {
      const blockGeo = new THREE.BoxGeometry(1.2, 0.42, 0.7);
      const sandMat = new THREE.MeshStandardMaterial({ color: 0xC8BCA7, roughness: 0.85 });

      for (let r = 0; r < 5; r++) {
        const rowY = r * 0.44 + 0.22;
        for (let c = -3; c <= 3; c++) {
          const block = new THREE.Mesh(blockGeo, sandMat);
          const stagger = (r % 2) * 0.5;
          block.position.set(c * 1.18 + stagger, rowY, 0);
          block.castShadow = true;
          block.receiveShadow = true;
          wallGroup.add(block);
        }
      }

      const weepGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 8);
      weepGeo.rotateX(Math.PI / 2);
      const weepMat = new THREE.MeshStandardMaterial({ color: 0x262925 });
      for (let w = -2; w <= 2; w++) {
        const weep = new THREE.Mesh(weepGeo, weepMat);
        weep.position.set(w * 1.8, 0.15, 0.05);
        wallGroup.add(weep);
        interactiveObjectsRef.current.push({
          mesh: weep,
          label: 'Дренажні трубки-барбакани (скидання підземного тиску води)'
        });
      }

    } else if (wallType === 'board-concrete') {
      const concreteGeo = new THREE.BoxGeometry(7.2, 2.2, 0.5);
      const concreteMat = new THREE.MeshStandardMaterial({ color: 0x999690, roughness: 0.7 });
      const concreteWall = new THREE.Mesh(concreteGeo, concreteMat);
      concreteWall.position.set(0, 1.1, 0);
      concreteWall.castShadow = true;
      concreteWall.receiveShadow = true;
      wallGroup.add(concreteWall);

      const lineGeo = new THREE.BoxGeometry(7.22, 0.03, 0.52);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0x6E6B65 });
      for (let bl = 1; bl <= 7; bl++) {
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.set(0, bl * 0.28, 0);
        wallGroup.add(line);
      }

      interactiveObjectsRef.current.push({
        mesh: concreteWall,
        label: 'Архітектурна щитова бетонна стіна з дерев\'яною текстурою'
      });

    } else {
      const mainWallGeo = new THREE.BoxGeometry(7.2, 2.2, 0.5);
      const pocketWallMat = new THREE.MeshStandardMaterial({ color: 0xB5ADA0, roughness: 0.9 });
      const mainWall = new THREE.Mesh(mainWallGeo, pocketWallMat);
      mainWall.position.set(0, 1.1, 0);
      mainWall.castShadow = true;
      wallGroup.add(mainWall);

      const pocketGeo = new THREE.BoxGeometry(1.2, 0.3, 0.7);
      const pocketMat = new THREE.MeshStandardMaterial({ color: 0x8C8478, roughness: 0.95 });

      const pocketCoords = [
        { x: -1.8, y: 0.8 },
        { x: 0.5, y: 1.4 },
        { x: 1.9, y: 0.6 }
      ];

      pocketCoords.forEach((pc, idx) => {
        const pBox = new THREE.Mesh(pocketGeo, pocketMat);
        pBox.position.set(pc.x, pc.y, 0.4);
        pBox.castShadow = true;
        wallGroup.add(pBox);

        const plant = new THREE.Mesh(crevicePlantGeo, idx % 2 === 0 ? bellflowerMat : sedumMat);
        plant.position.set(pc.x, pc.y + 0.25, 0.45);
        plant.scale.set(1.5, 0.9, 1.2);
        wallGroup.add(plant);

        interactiveObjectsRef.current.push({
          mesh: plant,
          label: idx % 2 === 0 
            ? 'Дзвоники Пожарського в консольній кишені' 
            : 'Седум несправжній у консольній кишені',
          plantId: idx % 2 === 0 ? 'campanula-poscharskyana' : 'sedum-spurium'
        });
      });
    }

    if (showDrainageCutaway) {
      const gravelGeo = new THREE.BoxGeometry(6.8, 1.8, 0.9);
      const gravelMat = new THREE.MeshStandardMaterial({ 
        color: 0x757065, 
        roughness: 0.95, 
        transparent: true, 
        opacity: 0.75 
      });
      const gravelMesh = new THREE.Mesh(gravelGeo, gravelMat);
      gravelMesh.position.set(0, 1.0, -0.7);
      cutawayGroup.add(gravelMesh);
      interactiveObjectsRef.current.push({
        mesh: gravelMesh,
        label: 'Дренуюча щебенева призма (чистий щебінь фр. 20–40 мм)'
      });

      const geoFabric = new THREE.Mesh(
        new THREE.PlaneGeometry(6.8, 2.0),
        new THREE.MeshBasicMaterial({ color: 0x3A3A3A, side: THREE.DoubleSide })
      );
      geoFabric.position.set(0, 1.1, -1.16);
      cutawayGroup.add(geoFabric);
      interactiveObjectsRef.current.push({
        mesh: geoFabric,
        label: 'Голкопробивний термоскріплений геотекстиль (фільтрація мулу)'
      });

      const pipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 6.8, 12);
      pipeGeo.rotateZ(Math.PI / 2);
      const pipeMat = new THREE.MeshStandardMaterial({ color: 0x2A2A2A, roughness: 0.5 });
      const pipe = new THREE.Mesh(pipeGeo, pipeMat);
      pipe.position.set(0, 0.15, -0.65);
      cutawayGroup.add(pipe);
      interactiveObjectsRef.current.push({
        mesh: pipe,
        label: 'Перфорована дренажна труба підошви (евакуація ґрунтової води)'
      });
    }
  }, [wallType, showDrainageCutaway]);

  useEffect(() => {
    rebuildWall();
  }, [rebuildWall]);

  if (!webGlSupported) {
    return (
      <CanvasFallback
        title="3D-модель підпірної стінки недоступна"
        message="Апаратне прискорення WebGL не активовано або обмежено. Ви можете ознайомитись із технічними кресленнями розрізів та гідротехнічними нормами нижче."
        onRetry={() => setWebGlSupported(true)}
      />
    );
  }

  return (
    <div className="relative w-full h-[480px] rounded-xl overflow-hidden shadow-xl border border-[#A7B39A]/40 bg-[#1B231F]">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Controls Bar */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
        <button
          onClick={onToggleDrainage}
          className={`px-3 py-1.5 text-xs font-mono rounded border transition-all flex items-center gap-1.5 cursor-pointer ${
            showDrainageCutaway
              ? 'bg-[#AD765B] text-[#F4F0E6] border-[#AD765B] font-semibold'
              : 'bg-[#182C24]/90 text-[#F4F0E6] border-[#A7B39A]/40 hover:bg-[#64765A]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{showDrainageCutaway ? 'Приховати розріз дренажу' : 'Показати розріз дренажу'}</span>
        </button>
      </div>

      {/* Hover Callout */}
      {hoveredPart && (
        <div className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-[#182C24]/90 backdrop-blur-md rounded border border-[#AD765B] text-xs font-medium text-[#F4F0E6] flex items-center gap-1.5 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#AD765B]" />
          <span>{hoveredPart}</span>
        </div>
      )}

      {/* Bottom Architectural Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#182C24]/85 backdrop-blur-sm rounded border border-[#A7B39A]/30 text-[11px] font-mono text-[#D6D0C3]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[#F4F0E6]">
            <CheckCircle2 className="w-3 h-3 text-[#A7B39A]" />
            Ухил закладення: 1:6 назад
          </span>
          <span className="flex items-center gap-1 text-[#F4F0E6]">
            <CheckCircle2 className="w-3 h-3 text-[#A7B39A]" />
            Живі посадкові кишені
          </span>
        </div>
        <span className="text-[#A7B39A]">Обертання: ЛКМ / Дотик • Клік по рослинах для перегляду</span>
      </div>
    </div>
  );
};
