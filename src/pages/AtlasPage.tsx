import React, { useState } from 'react';
import { PlantLibrary } from '../components/PlantLibrary';
import { MaintenanceCalendar } from '../components/MaintenanceCalendar';
import { PlantSpecies } from '../types/botanical';
import { Calendar, Leaf } from 'lucide-react';

interface AtlasPageProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const AtlasPage: React.FC<AtlasPageProps> = ({ onSelectPlant }) => {
  const [activeView, setActiveView] = useState<'species' | 'calendar'>('species');

  return (
    <div className="bg-[#FAF8F3] text-[#262925] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#182C24] text-[#F4F0E6] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#A7B39A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#64765A]" />
            <span>Ботанічний компендіум</span>
            <span>//</span>
            <span>Таксономія, ярусність та фенологія</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
                Ботанічний Атлас <br />
                <span className="italic font-normal text-[#A7B39A]">& Календар Догляду.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] max-w-2xl leading-relaxed font-light">
                Наукова база 24 адаптованих видів української та центральноєвропейської флори. Фільтрація за інсоляцією, pH ґрунту, вологістю та ярусом разом із детальним річним фенологічним календарем агротехнічних робіт.
              </p>
            </div>

            {/* View Switcher Pill */}
            <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-[#A7B39A]/20 shrink-0">
              <button
                onClick={() => setActiveView('species')}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  activeView === 'species'
                    ? 'bg-[#64765A] text-[#F4F0E6] shadow-md'
                    : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-white/5'
                }`}
              >
                <Leaf className="w-4 h-4 text-[#A7B39A]" />
                <span>Гербарій видів (24)</span>
              </button>

              <button
                onClick={() => setActiveView('calendar')}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  activeView === 'calendar'
                    ? 'bg-[#AD765B] text-[#F4F0E6] shadow-md'
                    : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-white/5'
                }`}
              >
                <Calendar className="w-4 h-4 text-[#F4F0E6]" />
                <span>Фенологічний календар</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <main>
        {activeView === 'species' ? (
          <div className="animate-fadeIn">
            <PlantLibrary onSelectPlant={onSelectPlant} />
          </div>
        ) : (
          <div className="animate-fadeIn">
            <MaintenanceCalendar />
          </div>
        )}
      </main>
    </div>
  );
};
