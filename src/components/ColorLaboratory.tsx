import React, { useState } from 'react';
import { COLOR_PALETTES } from '../data/colorPalettesData';
import { ColorPalette } from '../types/landscape';
import { PlantSpecies } from '../types/botanical';
import { Palette, Calendar } from 'lucide-react';

interface ColorLaboratoryProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const ColorLaboratory: React.FC<ColorLaboratoryProps> = ({ onSelectPlant }) => {
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('forest-green-ivory');

  const activePalette: ColorPalette = COLOR_PALETTES.find(p => p.id === selectedPaletteId) || COLOR_PALETTES[0];

  const months = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];

  const isMonthActive = (mIndex: number, bloomWindow: string) => {
    if (bloomWindow.toLowerCase().includes('цілорічн') || bloomWindow.toLowerCase().includes('year-round')) return true;
    if (mIndex >= 3 && mIndex <= 9) return true;
    return false;
  };

  const opticalRules = [
    {
      title: 'Оптичне віддалення (Холодні сині та сизі тони)',
      desc: 'Лаванда, костриця сиза та шавлія у кінці видової осі розмивають контур і візуально додають саду 5–10 метрів уявного простору.',
      accent: '#7B949A'
    },
    {
      title: 'Оптичне наближення (Теплі вохристі та теракотові)',
      desc: 'Ехінацея, деревій і мідні волоті злаків концентрують увагу на собі, наближаючи далекий край саду й створюючи відчуття тепла.',
      accent: '#AD765B'
    },
    {
      title: 'Світловідбивачі в тіні (Слонова кістка та білий)',
      desc: 'Біла кора берези Жакмона, сріблястий дерен і білосніжні суцвіття висвітлюють темні північні закутки під кронами дерев.',
      accent: '#F4F0E6'
    },
    {
      title: 'Зимова архітектурна монохромія',
      desc: 'Коли квіти зникають, сад читається силуетами: темна глибина хвої сосни, графічні темні голівки ехінацеї та сріблястий іній на злаках.',
      accent: '#182C24'
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F0E6] text-[#262925]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO HEADER */}
        <div className="border-b border-[#A7B39A]/60 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64765A] mb-3">
            <span className="px-2 py-0.5 bg-[#EAE4D5] rounded text-[#182C24] font-semibold">Глава 08</span>
            <span>//</span>
            <span>Теорія колористичної гармонії</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#182C24] leading-tight">
            Лабораторія кольору: <br />
            <span className="italic font-normal text-[#64765A]">Живі палітри, фенологія та оптична глибина.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#64765A] max-w-3xl leading-relaxed font-light">
            У природному дизайні колір ніколи не розглядається як статична фарба на стіні. Це динамічний часовий вектор: забарвлення змінюється щотижня від ніжних весняних пагонів до літніх суцвіть, осінньої міді та графічної зимової монохромії.
          </p>

          {/* Key Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Фонове полотно</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">40 Відтінків зеленого</div>
              <div className="text-[11px] text-[#64765A] mt-1">Хвоя, листя та стебла трав</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Роль квітки</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">Тимчасовий акцент</div>
              <div className="text-[11px] text-[#64765A] mt-1">Цвітіння триває 2–4 тижні</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Оптична перспектива</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">Холодні тони вглиб</div>
              <div className="text-[11px] text-[#64765A] mt-1">Збільшують відчуття простору</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Сезонний інтерес</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">365 Днів на рік</div>
              <div className="text-[11px] text-[#64765A] mt-1">Краса розпаду та зимовий іній</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: 6 PALETTES INTERACTIVE LABORATORY */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивна лабораторія палітр
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
                Шість природних колористичних гармоній
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#64765A] bg-[#FAF8F3] px-3.5 py-2 rounded-xl border border-[#D6D0C3]">
              <Palette className="w-4 h-4 text-[#AD765B]" />
              <span>Оберіть гармонію для аналізу</span>
            </div>
          </div>

          {/* Palette Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {COLOR_PALETTES.map(pal => {
              const isSelected = pal.id === selectedPaletteId;
              return (
                <button
                  key={pal.id}
                  onClick={() => setSelectedPaletteId(pal.id)}
                  className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#182C24] text-[#F4F0E6] border-[#182C24] shadow-md scale-[1.02]'
                      : 'bg-[#FAF8F3] text-[#262925] border-[#D6D0C3] hover:bg-[#EAE4D5]'
                  }`}
                >
                  <div className="flex gap-1.5 mb-2.5">
                    {pal.dominantColors.map((col, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-serif font-bold leading-tight truncate">
                    {pal.title}
                  </div>
                  <div className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-[#A7B39A]' : 'text-[#64765A]'}`}>
                    {pal.keyPlants.length} видів
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Palette Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Color Theory Rationale (5 cols) */}
            <div className="lg:col-span-5 bg-[#FAF8F3] p-6 sm:p-8 rounded-2xl border border-[#D6D0C3] space-y-5 shadow-sm">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD765B] font-semibold">
                  Колористичний паспорт
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-0.5">
                  {activePalette.title}
                </h3>
                <div className="text-xs text-[#AD765B] font-serif italic mt-0.5">
                  {activePalette.subtitle}
                </div>
              </div>

              {/* Color Swatch Strip */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64765A] block">
                  Домінантні колірні коди гармонії:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {activePalette.dominantColors.map((hex, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-full h-12 rounded-xl shadow-xs border border-[#D6D0C3]" style={{ backgroundColor: hex }} />
                      <span className="text-[10px] font-mono text-[#64765A] mt-1">{hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed pt-2 border-t border-[#D6D0C3]/60">
                <div>
                  <strong className="text-[#182C24] block mb-0.5">Фоновий шар листя та хвої:</strong>
                  <p className="text-[#64765A]">{activePalette.foliageFoundation}</p>
                </div>
                <div>
                  <strong className="text-[#182C24] block mb-0.5">Квітучі та графічні акценти:</strong>
                  <p className="text-[#64765A]">{activePalette.floweringAccents}</p>
                </div>
                <div>
                  <strong className="text-[#182C24] block mb-0.5">Екологічне та оптичне обґрунтування:</strong>
                  <p className="text-[#262925] bg-white/70 p-3 rounded-xl border border-[#D6D0C3]">{activePalette.rationale}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Botanical Components & 12-Month Calendar (7 cols) */}
            <div className="lg:col-span-7 bg-[#FAF8F3] p-6 sm:p-8 rounded-2xl border border-[#D6D0C3] space-y-6 shadow-sm">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64765A]">
                  Характерні асоціації рослин
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#182C24]">
                  Компоненти живого масиву
                </h4>
                <p className="text-xs text-[#64765A] mt-1">
                  Клікніть по будь-якій рослині, щоб відкрити її детальне агротехнічне досьє.
                </p>
              </div>

              {/* Plant Specimen Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePalette.keyPlants.map(plant => (
                  <div
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="p-4 rounded-xl bg-white/80 hover:bg-[#EAE4D5] border border-[#D6D0C3] hover:border-[#AD765B] transition-all cursor-pointer shadow-xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plant.colorHex }} />
                      <span className="text-[10px] font-mono text-[#64765A]">{plant.category}</span>
                    </div>
                    <div className="text-sm font-serif italic font-bold text-[#182C24] mt-1 group-hover:text-[#AD765B] transition-colors">
                      {plant.botanicalName}
                    </div>
                    <div className="text-xs text-[#64765A]">{plant.commonName}</div>
                    <div className="text-[11px] text-[#262925] mt-2 line-clamp-1">
                      {plant.flowerColor}
                    </div>
                  </div>
                ))}
              </div>

              {/* 12-Month Bar Visualizer */}
              <div className="bg-white/90 p-5 rounded-2xl border border-[#D6D0C3] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-[#64765A] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#AD765B]" /> Хронологія цвітіння та піку форми
                  </span>
                  <span className="font-mono text-xs text-[#182C24] font-medium">{activePalette.bloomWindow}</span>
                </div>

                <div className="grid grid-cols-12 gap-1 text-center">
                  {months.map((m, idx) => {
                    const active = isMonthActive(idx, activePalette.bloomWindow);
                    return (
                      <div key={m} className="flex flex-col items-center gap-1">
                        <div
                          className={`w-full h-8 rounded-lg transition-all ${
                            active
                              ? 'bg-[#AD765B] shadow-xs'
                              : 'bg-[#EAE4D5]/60'
                          }`}
                          title={`${m}: ${active ? 'Активне цвітіння / піковий інтерес' : 'Зимова структура / спокій'}`}
                        />
                        <span className="text-[10px] font-mono text-[#64765A]">{m}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[11px] text-[#64765A] pt-1 leading-relaxed">
                  <strong>Закон архітектора:</strong> Баланс кольору тримається стабільно, оскільки структура листя та злаків залишається декоративною навіть поза періодом цвітіння.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: OPTICAL PHYSICS IN LANDSCAPE */}
        <div className="space-y-6 pt-6 border-t border-[#D6D0C3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Оптичні ефекти кольору
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Як колір змінює сприйняття геометрії ділянки
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {opticalRules.map((rule, idx) => (
              <div key={idx} className="p-6 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3] shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-4 h-4 rounded-full mb-3" style={{ backgroundColor: rule.accent }} />
                  <h3 className="text-lg font-serif font-bold text-[#182C24]">
                    {rule.title}
                  </h3>
                </div>
                <p className="text-xs text-[#64765A] leading-relaxed pt-2 border-t border-[#D6D0C3]/60">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
