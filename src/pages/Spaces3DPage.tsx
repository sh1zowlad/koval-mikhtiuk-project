import React, { useState } from 'react';
import { AlpineGardenSection } from '../components/AlpineGardenSection';
import { RetainingWallSection } from '../components/RetainingWallSection';
import { ClimbingPlantsSection } from '../components/ClimbingPlantsSection';
import { PlantSpecies } from '../types/botanical';
import { Mountain, Layers, Eye } from 'lucide-react';

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
    },
    {
      id: 'wall' as const,
      number: '02',
      title: 'Підпірні стіни та геопластика',
      subtitle: 'Суха кам’яна кладка, кут завалу 1:6, барбакани та норми ДБН',
      icon: Layers,
    },
    {
      id: 'climbers' as const,
      number: '03',
      title: 'Вертикальні ліани та перголи',
      subtitle: 'Механіка фіксації, шпалери та симуляція 4 пір року',
      icon: Eye,
    },
  ];

  return (
    <div className="bg-[#182C24] text-[#F4F0E6] min-h-screen">
      {/* 3D Pavilion Curatorial Header — Clean Natural Typography */}
      <div className="pt-16 pb-6 px-4 sm:px-6 lg:px-8 border-b border-[#A7B39A]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-sans text-[#A7B39A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Інтерактивні 3D простори • Рельєф, каміння та вертикальне озеленення</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
              Конструкції та рельєф <br />
              <span className="italic font-normal text-[#A7B39A]">у тривимірному просторі.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] leading-relaxed font-light font-sans">
              Тривимірні моделі складної геопластики, кам’яних конструкцій та вертикального озеленення. Обертайте камеру, змінюйте кути зору та досліджуйте ботанічні хотспоти.
            </p>
          </div>

          {/* Minimalist Architectural Tab Bar — No Boxed AI Cards */}
          <div className="mt-10 border-t border-b border-[#A7B39A]/20 flex flex-col sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-[#A7B39A]/20">
            {spaces.map((sp) => {
              const Icon = sp.icon;
              const isActive = activeSpace === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => setActiveSpace(sp.id)}
                  className={`py-4 sm:py-5 px-5 text-left transition-all relative flex-1 group ${
                    isActive ? 'bg-white/[0.06]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`font-mono text-xs transition-colors ${isActive ? 'text-[#AD765B] font-bold' : 'text-[#A7B39A]'}`}>
                        [{sp.number}]
                      </span>
                      <span className={`font-serif text-base sm:text-lg font-bold transition-colors ${isActive ? 'text-[#F4F0E6]' : 'text-[#D6D0C3] group-hover:text-[#F4F0E6]'}`}>
                        {sp.title}
                      </span>
                    </div>
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#AD765B]' : 'text-[#A7B39A]/60'}`} />
                  </div>

                  <p className="mt-1 text-xs text-[#A7B39A] font-light font-sans line-clamp-1">
                    {sp.subtitle}
                  </p>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AD765B]" />
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
