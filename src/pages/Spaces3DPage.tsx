import React, { useState } from 'react';
import { AlpineGardenSection } from '../components/AlpineGardenSection';
import { RetainingWallSection } from '../components/RetainingWallSection';
import { ClimbingPlantsSection } from '../components/ClimbingPlantsSection';
import { PlantSpecies } from '../types/botanical';
import { Mountain, Layers, Eye, Shield } from 'lucide-react';

interface Spaces3DPageProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const Spaces3DPage: React.FC<Spaces3DPageProps> = ({ onSelectPlant }) => {
  const [activeSpace, setActiveSpace] = useState<'alpine' | 'wall' | 'climbers'>('alpine');

  const spaces = [
    {
      id: 'alpine' as const,
      number: '01',
      title: 'Альпійський сад та осипи',
      subtitle: 'Геологія, пошаровий дренаж та скельні подушкові рослини',
      icon: Mountain,
      accent: '#64765A',
      features: ['3 стилі альпінарію', 'Нахил пластів 15–20°', 'Фракція щебеню 20–40 мм'],
    },
    {
      id: 'wall' as const,
      number: '02',
      title: 'Підпірні стіни та геопластика',
      subtitle: 'Суха кам’яна кладка, кут завалу 1:6, барбакани та норми ДБН',
      icon: Layers,
      accent: '#AD765B',
      features: ['Рентген-зріз дренажу', '4 конструктивні типи', 'ДБН В.2.1-10:2018'],
    },
    {
      id: 'climbers' as const,
      number: '03',
      title: 'Вертикальні ліани та перголи',
      subtitle: 'Механіка фіксації, шпалери та симуляція 4 пір року',
      icon: Eye,
      accent: '#47634E',
      features: ['4 пори року в 3D', '4 типи фіксації пагонів', 'Розрахунок ваги опор'],
    },
  ];

  return (
    <div className="bg-[#182C24] text-[#F4F0E6] min-h-screen">
      {/* 3D Pavilion Curatorial Header */}
      <div className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 border-b border-[#A7B39A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#AD765B] animate-pulse" />
            <span>Інтерактивний 3D-Павільйон</span>
            <span>//</span>
            <span>Three.js просторовий аналіз</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
                3D Інженерні <br />
                <span className="italic font-normal text-[#A7B39A]">Простори та Конструкції.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] max-w-2xl leading-relaxed font-light">
                Досліджуйте тривимірні інтерактивні моделі складної геопластики, кам’яних конструкцій та вертикального озеленення. Обертайте камеру, змінюйте кути зору та інспектуйте ботанічні хотспоти.
              </p>
            </div>

            {/* Quick stats pill */}
            <div className="flex items-center gap-4 bg-white/5 border border-[#A7B39A]/20 p-4 rounded-2xl shrink-0">
              <Shield className="w-8 h-8 text-[#AD765B]" />
              <div className="text-xs">
                <span className="block font-mono text-[#A7B39A] uppercase tracking-wider">Розрахункові норми</span>
                <span className="font-serif text-[#F4F0E6] font-bold text-sm">ДБН В.2.1-10:2018 & Єврокод 7</span>
              </div>
            </div>
          </div>

          {/* 3-Space Switcher Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {spaces.map((sp) => {
              const Icon = sp.icon;
              const isActive = activeSpace === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => setActiveSpace(sp.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'bg-white/10 border-[#AD765B] shadow-lg shadow-black/20'
                      : 'bg-white/5 border-[#A7B39A]/20 hover:bg-white/[0.08] hover:border-[#A7B39A]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#A7B39A]">
                      Простір {sp.number}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-[#AD765B] text-[#F4F0E6]' : 'bg-white/10 text-[#A7B39A] group-hover:text-[#F4F0E6]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className={`font-serif text-lg font-bold leading-snug transition-colors ${
                    isActive ? 'text-[#F4F0E6]' : 'text-[#D6D0C3] group-hover:text-[#F4F0E6]'
                  }`}>
                    {sp.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#A7B39A] line-clamp-2 font-sans font-light">
                    {sp.subtitle}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {sp.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-[#D6D0C3]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#AD765B]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic 3D Scene Display */}
      <main className="relative">
        {activeSpace === 'alpine' && (
          <div className="animate-fadeIn">
            <AlpineGardenSection onSelectPlant={onSelectPlant} />
          </div>
        )}

        {activeSpace === 'wall' && (
          <div className="animate-fadeIn">
            <RetainingWallSection onSelectPlant={onSelectPlant} />
          </div>
        )}

        {activeSpace === 'climbers' && (
          <div className="animate-fadeIn">
            <ClimbingPlantsSection onSelectPlant={onSelectPlant} />
          </div>
        )}
      </main>
    </div>
  );
};
