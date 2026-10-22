import React, { useEffect } from 'react';
import { PlantSpecies } from '../types/botanical';
import { PLANTS_DATABASE } from '../data/plantsData';
import { X, Sun, Droplets, Layers, Calendar, Scissors, ShieldAlert, Sparkles, Sprout } from 'lucide-react';

interface PlantModalProps {
  plant: PlantSpecies | null;
  onClose: () => void;
  onSelectCompanion?: (plant: PlantSpecies) => void;
}

export const PlantModal: React.FC<PlantModalProps> = ({ plant, onClose, onSelectCompanion }) => {
  useEffect(() => {
    if (!plant) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [plant, onClose]);

  if (!plant) return null;

  const categoryMap: Record<string, string> = {
    alpine: 'Альпійські скельні',
    groundcover: 'Ґрунтопокривні',
    grass: 'Декоративні злаки',
    perennial: 'Квітучі багаторічники',
    climber: 'Виткі ліани',
    crevice: 'Для швів і кишень',
    shrub: 'Структурні кущі',
    tree: 'Дерева-солітери'
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#182C24]/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#F4F0E6] text-[#262925] rounded-2xl shadow-2xl border border-[#A7B39A]/60 flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-plant-title"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#A7B39A]/40 bg-[#EAE4D5]">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider bg-[#182C24] text-[#F4F0E6] rounded-full">
                {categoryMap[plant.category] || plant.category}
              </span>
              <span className="text-xs font-mono text-[#2D3A2B] font-semibold">
                Родина: {plant.family}
              </span>
            </div>
            <h2 id="modal-plant-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-1.5 italic">
              {plant.botanicalName}
            </h2>
            <p className="text-base text-[#2D3A2B] font-sans font-medium">
              {plant.commonName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#2D3A2B] hover:text-[#182C24] hover:bg-[#D6D0C3]/60 rounded-full transition-colors"
            aria-label="Закрити вікно"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Quick Horticultural Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F3] p-4 rounded-xl border border-[#D6D0C3]">
            <div className="flex items-start gap-2.5">
              <Sun className="w-5 h-5 text-[#AD765B] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#64765A]">Освітлення</p>
                <p className="text-xs font-semibold text-[#182C24]">{plant.light}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Droplets className="w-5 h-5 text-[#64765A] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#64765A]">Потреба у волозі</p>
                <p className="text-xs font-semibold text-[#182C24]">{plant.moisture}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Layers className="w-5 h-5 text-[#64765A] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#64765A]">Дренаж ґрунту</p>
                <p className="text-xs font-semibold text-[#182C24]">{plant.soil}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Sprout className="w-5 h-5 text-[#AD765B] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono uppercase tracking-wider text-[#64765A]">Дорослий кущ</p>
                <p className="text-xs font-semibold text-[#182C24]">{plant.matureHeight} × {plant.matureSpread}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#2D3A2B] font-bold mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#AD765B]" /> Ботанічна характеристика
            </h3>
            <p className="text-[15px] leading-relaxed text-[#182C24] bg-white/70 p-4 rounded-xl border border-[#D6D0C3]">
              {plant.description}
            </p>
          </div>

          {/* Seasonal & Floral Traits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/70 p-4 rounded-xl border border-[#D6D0C3] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#2D3A2B] font-semibold">
                <Calendar className="w-4 h-4 text-[#AD765B]" /> Період цвітіння та забарвлення
              </div>
              <p className="text-sm font-semibold text-[#182C24]">{plant.bloomPeriod}</p>
              <p className="text-xs text-[#2D3A2B]">{plant.flowerColor}</p>
            </div>

            <div className="bg-white/70 p-4 rounded-xl border border-[#D6D0C3] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#2D3A2B] font-semibold">
                <Sparkles className="w-4 h-4 text-[#64765A]" /> Листя та габітус
              </div>
              <p className="text-xs text-[#182C24] leading-relaxed">{plant.foliageColor}</p>
              <div className="flex items-center gap-3 text-xs font-mono text-[#2D3A2B] pt-1 border-t border-[#D6D0C3]/40">
                <span>Зимостійкість: <strong>{plant.hardinessZone}</strong></span>
                {plant.soilPh && <span>pH: <strong>{plant.soilPh}</strong></span>}
              </div>
            </div>
          </div>

          {/* Landscape Applications & Maintenance */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#64765A] mb-1">
                Рекомендоване ландшафтне застосування
              </h3>
              <p className="text-xs text-[#262925] bg-[#FAF8F3] p-3 rounded border border-[#D6D0C3]">
                {plant.landscapeApplication}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#64765A] mb-1 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" /> Агротехніка та правила обрізки
              </h3>
              <p className="text-xs text-[#262925] bg-[#FAF8F3] p-3 rounded border border-[#D6D0C3]">
                {plant.maintenance}
              </p>
            </div>
          </div>

          {/* Companion Plants */}
          {plant.companionPlants && plant.companionPlants.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#64765A] mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Гармонійні рослини-компаньйони
              </h3>
              <div className="flex flex-wrap gap-2">
                {plant.companionPlants.map((companionName, idx) => {
                  const matchingPlant = PLANTS_DATABASE.find(
                    p => p.botanicalName.toLowerCase().includes(companionName.toLowerCase()) || 
                         p.commonName.toLowerCase().includes(companionName.toLowerCase())
                  );
                  return (
                    <button
                      key={idx}
                      onClick={() => matchingPlant && onSelectCompanion && onSelectCompanion(matchingPlant)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
                        matchingPlant 
                          ? 'bg-[#EAE4D5] hover:bg-[#D6D0C3] text-[#182C24] border-[#A7B39A] cursor-pointer' 
                          : 'bg-white/40 text-[#64765A] border-[#D6D0C3] cursor-default'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: matchingPlant?.colorHex || '#A7B39A' }} />
                      <span className="italic">{matchingPlant ? matchingPlant.commonName : companionName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#A7B39A]/40 bg-[#EAE4D5] flex items-center justify-between text-xs text-[#64765A] font-mono">
          <span>TERRA // Ботанічний архів Ref. #{plant.id.slice(0, 8)}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-sans font-medium bg-[#182C24] hover:bg-[#25442F] text-[#F4F0E6] rounded transition-colors"
          >
            Закрити досьє
          </button>
        </div>
      </div>
    </div>
  );
};
