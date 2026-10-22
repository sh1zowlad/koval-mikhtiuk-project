import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Season } from '../types/landscape';
import { PlantSpecies } from '../types/botanical';
import { PLANTS_DATABASE } from '../data/plantsData';
import { Sun } from 'lucide-react';
import { CanvasFallback } from './CanvasFallback';
import {
  isWebGLAvailable,
  deepDisposeObject,
  disposeRenderer,
  getOptimizedPixelRatio
} from '../utils/threeOptimization';

interface Climber3DCanvasProps {
  selectedSpeciesId: string;
  season: Season;
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const Climber3DCanvas: React.FC<Climber3DCanvasProps> = ({
  selectedSpeciesId,
  season,
  onSelectPlant
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(() => isWebGLAvailable());

  const sceneRef = useRef<THREE.Scene | null>(null);
  const vineGroupRef = useRef<THREE.Group | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1B231F);
    scene.fog = new THREE.FogExp2(0x1B231F, 0.04);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      40,
      (container.clientWidth || 800) / (container.clientHeight || 480),
      0.2,
      50
    );
    camera.position.set(0, 2.5, 6.2);

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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 2.0;
    controls.maxDistance = 12;
    controls.target.set(0, 1.8, 0);

    const amb = new THREE.AmbientLight(0xD6D0C3, 0.7);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xFFF9E6, 1.6);
    sun.position.set(5, 10, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    scene.add(sun);

    // Stone base terrace
    const floorGeo = new THREE.PlaneGeometry(6, 4.5);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x2A322C, roughness: 0.95 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.receiveShadow = true;
    scene.add(floor);

    // Architectural Cedar Trellis Frame
    const trellisGroup = new THREE.Group();
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5C4638, roughness: 0.85 });

    // Main upright timber posts
    const postGeo = new THREE.BoxGeometry(0.16, 3.4, 0.16);
    const postL = new THREE.Mesh(postGeo, woodMat);
    postL.position.set(-1.4, 1.7, 0);
    postL.castShadow = true;
    const postR = new THREE.Mesh(postGeo, woodMat);
    postR.position.set(1.4, 1.7, 0);
    postR.castShadow = true;
    trellisGroup.add(postL, postR);

    // Top beam
    const beamGeo = new THREE.BoxGeometry(3.4, 0.16, 0.16);
    const beam = new THREE.Mesh(beamGeo, woodMat);
    beam.position.set(0, 3.32, 0);
    beam.castShadow = true;
    trellisGroup.add(beam);

    // Stainless steel horizontal support wires
    const wireGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.7, 6);
    wireGeo.rotateZ(Math.PI / 2);
    const wireMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.8, roughness: 0.2 });

    for (let w = 1; w <= 7; w++) {
      const wire = new THREE.Mesh(wireGeo, wireMat);
      wire.position.set(0, w * 0.42, 0);
      trellisGroup.add(wire);
    }
    scene.add(trellisGroup);

    // Vine dynamic group
    const vineGroup = new THREE.Group();
    scene.add(vineGroup);
    vineGroupRef.current = vineGroup;

    // Viewport intersection observer to avoid running RAF in background
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

      const t = clock.getElapsedTime();

      // Subtle breeze swaying in leaves
      if (vineGroupRef.current) {
        vineGroupRef.current.children.forEach((c, idx) => {
          c.rotation.z = Math.sin(t * 1.5 + idx * 0.3) * 0.03;
        });
      }

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
      vineGroupRef.current = null;
    };
  }, []);

  // Update vine meshes dynamically when species or season changes
  const rebuildVine = useCallback(() => {
    const group = vineGroupRef.current;
    if (!group) return;

    // Disposes all previous vine meshes, geometries and materials cleanly
    deepDisposeObject(group);

    let leafColor = 0x3E6B47;
    let flowerColor: number | null = 0x4A3362;
    let leafScale = 1.0;
    let leafCount = 36;
    let showFlowers = true;

    const isSpring = season === 'Spring' || season === 'Весна';
    const isSummer = season === 'Summer' || season === 'Літо';
    const isAutumn = season === 'Autumn' || season === 'Осінь';
    const isWinter = season === 'Winter' || season === 'Зима';

    if (isSpring) {
      leafColor = 0x82A359;
      leafScale = 0.55;
      leafCount = 20;
      showFlowers = selectedSpeciesId === 'rosa-new-dawn';
    } else if (isSummer) {
      leafColor = 0x2A5432;
      leafScale = 1.0;
      leafCount = 42;
      showFlowers = true;
    } else if (isAutumn) {
      if (selectedSpeciesId === 'parthenocissus-quinquefolia') {
        leafColor = 0xB22A26;
      } else if (selectedSpeciesId === 'lonicera-periclymenum') {
        leafColor = 0xB8933D;
      } else {
        leafColor = 0x8A7340;
      }
      leafScale = 0.85;
      leafCount = 28;
      showFlowers = false;
    } else {
      leafCount = 0;
      showFlowers = false;
    }

    if (selectedSpeciesId === 'clematis-viticella') {
      flowerColor = 0x4A3362;
    } else if (selectedSpeciesId === 'lonicera-periclymenum') {
      flowerColor = 0xC95B72;
    } else if (selectedSpeciesId === 'rosa-new-dawn') {
      flowerColor = 0xE2B8C1;
    } else {
      flowerColor = null;
    }

    // 1. Permanent woody main stem armature
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x47392E, roughness: 0.9 });
    const stemPointsL: THREE.Vector3[] = [];
    const stemPointsR: THREE.Vector3[] = [];

    for (let h = 0; h <= 12; h++) {
      const y = h * 0.28;
      const angle = h * 0.8;
      stemPointsL.push(new THREE.Vector3(-1.4 + Math.sin(angle) * 0.12, y, Math.cos(angle) * 0.12));
      stemPointsR.push(new THREE.Vector3(1.4 + Math.cos(angle) * 0.12, y, Math.sin(angle) * 0.12));
    }

    const curveL = new THREE.CatmullRomCurve3(stemPointsL);
    const curveR = new THREE.CatmullRomCurve3(stemPointsR);
    const stemGeoL = new THREE.TubeGeometry(curveL, 32, 0.04, 6, false);
    const stemGeoR = new THREE.TubeGeometry(curveR, 32, 0.04, 6, false);

    const mainStemL = new THREE.Mesh(stemGeoL, stemMat);
    const mainStemR = new THREE.Mesh(stemGeoR, stemMat);
    mainStemL.castShadow = mainStemR.castShadow = true;
    group.add(mainStemL, mainStemR);

    // Horizontal runner branches along wire grid
    for (let w = 1; w <= 6; w++) {
      const y = w * 0.42;
      const branchGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.6, 6);
      branchGeo.rotateZ(Math.PI / 2);
      const branch = new THREE.Mesh(branchGeo, stemMat);
      branch.position.set(0, y, 0.02);
      group.add(branch);
    }

    // 2. Foliage Leaves
    if (leafCount > 0) {
      const leafMat = new THREE.MeshStandardMaterial({ color: leafColor, roughness: 0.75, side: THREE.DoubleSide });
      const leafGeo = new THREE.SphereGeometry(0.24 * leafScale, 6, 6);

      for (let i = 0; i < leafCount; i++) {
        const lx = ((i * 13) % 29 / 29 - 0.5) * 2.8;
        const ly = 0.5 + ((i * 17) % 31 / 31) * 2.7;
        const lz = ((i * 7) % 19 / 19 - 0.5) * 0.3;

        const leafCluster = new THREE.Mesh(leafGeo, leafMat);
        leafCluster.position.set(lx, ly, lz);
        leafCluster.scale.set(1.4, 0.7, 1.1);
        leafCluster.castShadow = true;
        group.add(leafCluster);
      }
    }

    // 3. Flowers
    if (showFlowers && flowerColor) {
      const flowerMat = new THREE.MeshStandardMaterial({ color: flowerColor, roughness: 0.6 });
      const flowerGeo = new THREE.DodecahedronGeometry(0.12, 0);

      for (let f = 0; f < 18; f++) {
        const fx = ((f * 11) % 23 / 23 - 0.5) * 2.6;
        const fy = 0.8 + ((f * 19) % 27 / 27) * 2.3;
        const fz = 0.15 + ((f * 5) % 13 / 13 - 0.5) * 0.2;

        const blossom = new THREE.Mesh(flowerGeo, flowerMat);
        blossom.position.set(fx, fy, fz);
        blossom.castShadow = true;
        group.add(blossom);
      }
    }

    // 4. Зимові плоди / шипшина
    if (isWinter) {
      const berryMat = new THREE.MeshStandardMaterial({ 
        color: selectedSpeciesId === 'rosa-new-dawn' ? 0xC74A28 : 0x2A334A, 
        roughness: 0.5 
      });
      const berryGeo = new THREE.SphereGeometry(0.06, 6, 6);
      for (let b = 0; b < 14; b++) {
        const bx = ((b * 13) % 23 / 23 - 0.5) * 2.6;
        const by = 1.0 + ((b * 7) % 19 / 19) * 2.0;
        const bz = 0.05 + ((b * 11) % 17 / 17 - 0.5) * 0.15;
        const berry = new THREE.Mesh(berryGeo, berryMat);
        berry.position.set(bx, by, bz);
        group.add(berry);
      }
    }
  }, [selectedSpeciesId, season]);

  useEffect(() => {
    rebuildVine();
  }, [rebuildVine]);

  const currentPlant = PLANTS_DATABASE.find(p => p.id === selectedSpeciesId);

  if (!webGlSupported) {
    return (
      <CanvasFallback
        title="3D-модель ліан та шпалер недоступна"
        message="Апаратне прискорення WebGL не активовано або обмежено. Ви можете ознайомитись із календарем цвітіння та параметрами опор нижче."
        onRetry={() => setWebGlSupported(true)}
      />
    );
  }

  return (
    <div className="relative w-full h-[480px] rounded-[18px] overflow-hidden shadow-lg border border-[#A7B39A]/30 bg-[#1F2922]">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Season Badge */}
      <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-[#182C24]/90 backdrop-blur-md rounded-lg border border-[#A7B39A]/30 flex items-center gap-2 text-xs font-sans text-[#F4F0E6]">
        <Sun className="w-3.5 h-3.5 text-[#AD765B]" />
        <span>Сезонний стан: <strong className="font-medium text-[#A7B39A]">{season}</strong></span>
      </div>

      {/* Plant Info Banner */}
      {currentPlant && (
        <button
          onClick={() => onSelectPlant(currentPlant)}
          className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-[#182C24]/90 hover:bg-[#64765A] backdrop-blur-md rounded-lg border border-[#AD765B]/60 text-xs font-sans font-medium text-[#F4F0E6] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#AD765B]" />
          <span>Картка рослини: {currentPlant.commonName}</span>
        </button>
      )}

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 px-3 py-2 bg-[#182C24]/85 backdrop-blur-sm rounded-lg border border-[#A7B39A]/20 text-xs font-sans text-[#D6D0C3]">
        <span>Обертання: миша / жест • Опора: шпалерна конструкція</span>
        <span className="text-[#A7B39A]">Нержавіючі троси з кроком 42 см</span>
      </div>
    </div>
  );
};
