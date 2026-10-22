import React from 'react';
import { PlantLibrary } from '../components/PlantLibrary';
import { PlantSpecies } from '../types/botanical';
import { Leaf } from 'lucide-react';

interface AtlasPageProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const AtlasPage: React.FC<AtlasPageProps> = ({ onSelectPlant }) => {
  return (
    <div className="bg-[#FAF8F3] text-[#262925] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#182C24] text-[#F4F0E6] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#A7B39A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#64765A]" />
            <span>Ботанічний компендіум проєкту</span>
            <span>//</span>
            <span>Флора та ярусність</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
                Ботанічний Атлас <br />
                <span className="italic font-normal text-[#A7B39A]">Рослинних Компонентів.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] max-w-2xl leading-relaxed font-light">
                Колекція 24 відібраних адаптованих видів української та центральноєвропейської флори, закладених у просторову концепцію проєкту. Фільтрація за інсоляцією, pH ґрунту, вологістю та ярусом.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl border border-[#A7B39A]/20 shrink-0">
              <Leaf className="w-4 h-4 text-[#A7B39A]" />
              <span className="font-mono text-xs text-[#F4F0E6] font-semibold">24 Таксони в проєкті</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <main className="animate-fadeIn">
        <PlantLibrary onSelectPlant={onSelectPlant} />
      </main>
    </div>
  );
};
