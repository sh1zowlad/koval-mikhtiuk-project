import React, { useState, useMemo } from 'react';
import { PLANTS_DATABASE } from '../data/plantsData';
import { PlantSpecies, PlantCategory } from '../types/botanical';
import { Search, ArrowUpRight, X, AlertTriangle } from 'lucide-react';

interface PlantLibraryProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const PlantLibrary: React.FC<PlantLibraryProps> = ({ onSelectPlant }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory | 'all'>('all');
  const [selectedLight, setSelectedLight] = useState<string>('all');

  const categories: { id: PlantCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Всі категорії' },
    { id: 'alpine', label: 'Альпійські скельні' },
    { id: 'groundcover', label: 'Ґрунтопокривні' },
    { id: 'grass', label: 'Декоративні злаки' },
    { id: 'perennial', label: 'Квітучі багаторічники' },
    { id: 'climber', label: 'Виткі ліани' },
    { id: 'crevice', label: 'Для швів і кишень' },
    { id: 'shrub', label: 'Структурні кущі' },
    { id: 'tree', label: 'Дерева-солітери' },
  ];

  const filteredPlants = useMemo(() => {
    return PLANTS_DATABASE.filter(p => {
      const matchesSearch = 
        p.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.landscapeApplication.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesLight = selectedLight === 'all' || p.light.toLowerCase().includes(selectedLight.toLowerCase());

      return matchesSearch && matchesCategory && matchesLight;
    });
  }, [searchQuery, selectedCategory, selectedLight]);

  return (
    <section id="library" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#182C24] text-[#F4F0E6] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* NATURAL BOTANICAL HEADER */}
        <div className="border-b border-[#A7B39A]/20 pb-10">
          <div className="flex items-center gap-2 text-xs font-sans text-[#A7B39A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Ботанічний архів • Витривалі таксони та стійкі культивари</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
              Ботанічна енциклопедія природного саду
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] font-sans leading-relaxed font-light">
              Науково структурований каталог витривалих таксонів для природних садів, кам'янистих альпінаріїв, підпірних стін та вертикальних пергол. Кожна рослина відібрана за критеріями довговічності, витривалості до посухи та архітектурної виразності у будь-яку пору року.
            </p>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="bg-[#1F2922] p-6 sm:p-7 rounded-[18px] border border-[#A7B39A]/25 space-y-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-2/3">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#A7B39A]" />
              <input
                type="text"
                placeholder="Пошук за назвою, родиною або застосуванням..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-[#182C24] text-[#F4F0E6] placeholder-[#A7B39A]/60 rounded-xl border border-[#A7B39A]/30 text-sm font-sans focus:outline-none focus:border-[#AD765B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A7B39A] hover:text-[#F4F0E6]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Light Selector */}
            <div className="w-full md:w-1/3">
              <select
                value={selectedLight}
                onChange={(e) => setSelectedLight(e.target.value)}
                className="w-full px-4 py-3 bg-[#182C24] text-[#F4F0E6] rounded-xl border border-[#A7B39A]/30 text-xs font-sans focus:outline-none focus:border-[#AD765B]"
              >
                <option value="all">Усі режими освітлення</option>
                <option value="сонце">Відкрите сонце (6+ годин прямого світла)</option>
                <option value="напівтінь">Напівтінь / Розсіяний підлісок</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#A7B39A]/15">
            {categories.map(cat => {
              const isSelected = cat.id === selectedCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-sans rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#AD765B] text-[#F4F0E6] font-medium shadow-xs'
                      : 'bg-[#182C24] text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-[#64765A]/30 border border-[#A7B39A]/20'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-sans text-[#A7B39A] flex items-center justify-between">
            <span>Знайдено: {filteredPlants.length} таксонів</span>
            {(searchQuery || selectedCategory !== 'all' || selectedLight !== 'all') && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLight('all'); }}
                className="text-[#AD765B] hover:underline cursor-pointer"
              >
                Скинути фільтри
              </button>
            )}
          </div>
        </div>

        {/* SPECIMENS GRID */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map(plant => (
              <div
                key={plant.id}
                onClick={() => onSelectPlant(plant)}
                className="bg-[#1F2922] hover:bg-[#25392D] p-6 rounded-[16px] border border-[#A7B39A]/25 hover:border-[#AD765B]/60 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-sans text-[#A7B39A] bg-[#182C24] px-2.5 py-0.5 rounded border border-[#A7B39A]/25">
                      {plant.category}
                    </span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-xs"
                      style={{ backgroundColor: plant.colorHex }}
                      title={`Колірний акорд: ${plant.colorHex}`}
                    />
                  </div>

                  <h3 className="text-xl font-serif italic font-bold text-[#F4F0E6] group-hover:text-[#AD765B] transition-colors leading-snug">
                    {plant.botanicalName}
                  </h3>
                  <div className="text-sm text-[#D6D0C3] font-sans font-medium mt-1">
                    {plant.commonName}
                  </div>
                  <div className="text-xs font-sans text-[#A7B39A] mt-1">
                    Родина: {plant.family}
                  </div>

                  <p className="text-xs text-[#A7B39A] mt-4 line-clamp-3 leading-relaxed font-light">
                    {plant.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#A7B39A]/15 space-y-2 text-xs font-sans text-[#D6D0C3]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A7B39A]">Висота:</span>
                    <span className="font-medium">{plant.matureHeight}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A7B39A]">Освітлення:</span>
                    <span className="truncate max-w-[140px] text-right">{plant.light}</span>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-[#AD765B] font-sans text-xs font-medium group-hover:text-[#F4F0E6]">
                    <span>Відкрити досьє</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#1F2922] rounded-[18px] border border-[#A7B39A]/25 p-8 space-y-4">
            <p className="text-xl font-serif text-[#F4F0E6]">За вашим запитом рослин не знайдено.</p>
            <p className="text-xs text-[#A7B39A]">Спробуйте змінити фільтри або очистити пошуковий рядок.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLight('all'); }}
              className="mt-2 px-6 py-2.5 bg-[#AD765B] text-[#F4F0E6] text-xs font-sans rounded-xl hover:bg-[#8F5E46] transition-colors cursor-pointer"
            >
              Скинути фільтри
            </button>
          </div>
        )}

        {/* PRACTICAL FIELD NOTES — HUMAN & EDITORIAL */}
        <div className="border-t border-[#A7B39A]/20 pt-10 space-y-6">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-[#AD765B]" />
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F0E6]">
              Практичні спостереження при доборі рослин
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#A7B39A]/20">
            <div className="pt-4 md:pt-0 md:pr-6 space-y-1.5">
              <span className="font-mono text-xs text-[#AD765B] block">[01] Сезонний силует</span>
              <p className="text-xs text-[#D6D0C3] leading-relaxed font-light font-sans">
                Не обирайте рослину лише за піком цвітіння. Оцінюйте архітектоніку пагонів, тривалість листяного пологу та вигляд суцвіть у сухому стані під снігом.
              </p>
            </div>
            <div className="pt-4 md:pt-0 md:px-6 space-y-1.5">
              <span className="font-mono text-xs text-[#AD765B] block">[02] Запас на розростання</span>
              <p className="text-xs text-[#D6D0C3] leading-relaxed font-light font-sans">
                Не ущільнюйте молоді саджанці задля миттєвого ефекту. Через 2–3 роки вони витіснять одне одного. Залишайте проєктну відстань дорослої куртини.
              </p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-6 space-y-1.5">
              <span className="font-mono text-xs text-[#AD765B] block">[03] Масив проти одиничності</span>
              <p className="text-xs text-[#D6D0C3] leading-relaxed font-light font-sans">
                Уникайте висадки по одній рослині кожного сорту. Природна гармонія виникає через непарні дрифти та хвилі (3, 5, 7, 9 екземплярів).
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
