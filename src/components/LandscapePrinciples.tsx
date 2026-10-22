import React, { useState } from 'react';
import { PRINCIPLES_DATABASE } from '../data/principlesData';
import { LandscapePrinciple } from '../types/landscape';
import { Crosshair, AlertOctagon, Layers, Sparkles } from 'lucide-react';

export const LandscapePrinciples: React.FC = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<LandscapePrinciple>(PRINCIPLES_DATABASE[0]);

  const architecturalLayers = [
    {
      name: 'Передній план // Авансцена',
      depth: '0 – 3 метри від спостерігача',
      height: '5 – 30 см (Килимові сукуленти, чебрець, гравій)',
      purpose: 'Забезпечує відкритий партер, не затуляє горизонт, затягує погляд всередину саду через фактурну зернистість.'
    },
    {
      name: 'Середній план // Сцена активності',
      depth: '3 – 8 метрів',
      height: '40 – 110 см (Шавлія, ехінацея, ковила, сеслерія)',
      purpose: 'Основне тіло матричної посадки. Створює просторовий рух хвилями злаків, містить головні колористичні акценти.'
    },
    {
      name: 'Задній план // Живі куліси',
      depth: '8 – 20+ метрів',
      height: '1.5 – 6 метрів (Підпірні мури, берези, сосни, ліани)',
      purpose: 'Формує просторову межу ділянки, оптично віддаляє горизонт, забезпечує відчуття захищеності (Genius Loci).'
    },
    {
      name: 'Фокусна вертикаль // Скульптурний якір',
      depth: 'Точка максимальної візуальної ваги',
      height: 'Домінанта композиції (Солітер або скельний валун)',
      purpose: 'Організовує навколо себе все середовище. Притягує погляд і створює миттєву орієнтацію в тривимірному просторі.'
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Каталожний хаос («По одній рослині кожного сорту»)',
      fix: 'Матрична посадка блоками: мінімум 5–7 екземплярів одного виду у взаємопроникних куртинах.'
    },
    {
      mistake: 'Прямолінійне висаджування за лінійкою вздовж паркану',
      fix: 'Хвилеподібна ярусна розмивка з «кишенями» глибини та виступами назустріч доріжці.'
    },
    {
      mistake: 'Відсутність негативного простору (перевантаження ділянки)',
      fix: 'Свідоме збереження пауз: гравійні галявини, площини низького газону чи спокійні водні дзеркала.'
    },
    {
      mistake: 'Центральна симетрія на складному рельєфі',
      fix: 'Динамічна асиметрія: врівноваження важкої кам\'яної стіни масивом легких повітряних злаків.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F0E6] text-[#262925]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO HEADER */}
        <div className="border-b border-[#A7B39A]/60 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64765A] mb-3">
            <span className="px-2 py-0.5 bg-[#EAE4D5] rounded text-[#182C24] font-semibold">Глава 02</span>
            <span>//</span>
            <span>Теорія ландшафтної архітектури</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#182C24] leading-tight">
            Граматика простору: <br />
            <span className="italic font-normal text-[#64765A]">Мистецтво природної композиції.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#64765A] max-w-3xl leading-relaxed font-light">
            Природна композиція — це не хаос і не штучна симетрія Версалю. Це кристалізація законів природи: взаємопроникнення мас, динамічна рівновага, гра тіні та світла і безпомилковий вибір домінант.
          </p>

          {/* Key Architectural Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Баланс мас</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">Динамічна асиметрія</div>
              <div className="text-[11px] text-[#64765A] mt-1">Рівновага без дзеркальності</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Глибина сцени</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">4 Яруси глибини</div>
              <div className="text-[11px] text-[#64765A] mt-1">Від авансцени до куліс</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Фокусний якір</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">Правило третин</div>
              <div className="text-[11px] text-[#64765A] mt-1">Один солітер на видову вісь</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Порожнеча</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">30% Паузи</div>
              <div className="text-[11px] text-[#64765A] mt-1">Негативний простір для очей</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE SPATIAL ANALYZER SCHEMATIC */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивна схема // 10 Законів композиції
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
                Дослідження композиційної сітки ділянки
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#64765A] max-w-md">
              Оберіть будь-який із 10 принципів нижче, щоб побачити точну візуальну координату на генеральному плані та фаховий розбір.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Coordinate Schematic Canvas (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative w-full h-[460px] bg-[#182C24] rounded-2xl overflow-hidden border border-[#A7B39A]/40 shadow-2xl p-4 flex flex-col justify-between">
                <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />

                {/* SVG Landscape Master Schematic */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Contoured Hillside Slopes */}
                  <path d="M 0 45 Q 35 30 70 55 T 100 40 L 100 100 L 0 100 Z" fill="#24382B" opacity="0.65" />
                  <path d="M 0 65 Q 40 50 80 70 L 100 65 L 100 100 L 0 100 Z" fill="#1C2E23" opacity="0.85" />
                  
                  {/* Retaining wall line */}
                  <line x1="18" y1="52" x2="88" y2="52" stroke="#B8B0A2" strokeWidth="2.5" strokeDasharray="1.5, 1.5" />
                  
                  {/* Winding gravel path */}
                  <path d="M 15 95 C 45 85, 30 70, 55 58 C 70 50, 60 38, 80 25" fill="none" stroke="#D6D0C3" strokeWidth="3" strokeLinecap="round" opacity="0.75" />

                  {/* Specimen Pine & Rockery outline */}
                  <circle cx="50" cy="35" r="9.5" fill="#1F3F29" opacity="0.9" />
                  <polygon points="42,38 48,28 54,36" fill="#8C887E" />

                  {/* Perennial Waves */}
                  <path d="M 20 75 Q 40 68 60 76 T 95 72" fill="none" stroke="#7C89B8" strokeWidth="4" opacity="0.5" strokeLinecap="round" />
                  <path d="M 15 82 Q 45 74 75 83" fill="none" stroke="#B97799" strokeWidth="3.5" opacity="0.45" strokeLinecap="round" />

                  {/* Active Dynamic Coordinate Marker */}
                  <circle 
                    cx={selectedPrinciple.visualTarget.x} 
                    cy={selectedPrinciple.visualTarget.y} 
                    r="8" 
                    fill="none" 
                    stroke="#AD765B" 
                    strokeWidth="1.8" 
                    strokeDasharray="2, 2" 
                    className="animate-spin"
                    style={{ transformOrigin: `${selectedPrinciple.visualTarget.x}px ${selectedPrinciple.visualTarget.y}px` }}
                  />
                  <circle 
                    cx={selectedPrinciple.visualTarget.x} 
                    cy={selectedPrinciple.visualTarget.y} 
                    r="3" 
                    fill="#AD765B" 
                  />
                </svg>

                {/* Top Annotation Tag */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#F4F0E6] bg-[#182C24]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#A7B39A]/30">
                  <span className="flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-[#AD765B]" />
                    <span>Фокусна точка принципу</span>
                  </span>
                  <span className="text-[#A7B39A]">X:{selectedPrinciple.visualTarget.x}% | Y:{selectedPrinciple.visualTarget.y}%</span>
                </div>

                {/* Bottom Target Callout Card */}
                <div className="relative z-10 bg-[#182C24]/90 backdrop-blur-md p-4 rounded-xl border border-[#AD765B]/80 shadow-lg">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#AD765B] mb-0.5">
                    Зона застосування // #{selectedPrinciple.number}
                  </div>
                  <div className="text-base font-serif font-bold text-[#F4F0E6]">
                    {selectedPrinciple.visualTarget.label}
                  </div>
                  <div className="text-xs text-[#D6D0C3] mt-1 leading-relaxed">
                    Зверніть увагу, як маса, лінія та негативний простір скеровують погляд спостерігача в цій зоні.
                  </div>
                </div>
              </div>

              {/* 10 Principle Pills Grid */}
              <div className="flex flex-wrap gap-1.5">
                {PRINCIPLES_DATABASE.map(p => {
                  const isSelected = p.id === selectedPrinciple.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPrinciple(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        isSelected
                          ? 'bg-[#182C24] text-[#F4F0E6] font-semibold shadow-sm'
                          : 'bg-[#FAF8F3] hover:bg-[#EAE4D5] text-[#262925] border border-[#D6D0C3]'
                      }`}
                    >
                      <span className="opacity-60 mr-1">{p.number}</span>
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Principle Deep Dossier Panel (6 cols) */}
            <div className="lg:col-span-6 bg-[#FAF8F3] p-6 sm:p-8 rounded-2xl border border-[#D6D0C3] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#D6D0C3]/80 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#AD765B] font-bold">
                    Принцип #{selectedPrinciple.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-0.5">
                    {selectedPrinciple.title}
                  </h3>
                  <div className="text-xs text-[#64765A] font-mono mt-0.5">
                    {selectedPrinciple.subtitle}
                  </div>
                </div>
              </div>

              {/* Definition */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64765A] font-semibold block">
                  Архітектурне визначення
                </span>
                <p className="text-sm text-[#262925] leading-relaxed">
                  {selectedPrinciple.definition}
                </p>
              </div>

              {/* Ecological Importance */}
              <div className="p-4 bg-[#EAE4D5]/60 rounded-xl border border-[#A7B39A]/40 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD765B] font-bold block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Чому це працює в ландшафті
                </span>
                <p className="text-xs text-[#262925] leading-relaxed">
                  {selectedPrinciple.importance}
                </p>
              </div>

              {/* Practical Application */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64765A] font-semibold block">
                  Практичне втілення на ділянці
                </span>
                <p className="text-xs text-[#262925] leading-relaxed">
                  {selectedPrinciple.application}
                </p>
              </div>

              {/* Botanical Examples Chips */}
              <div className="space-y-2 pt-2 border-t border-[#D6D0C3]/80">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#64765A] block">
                  Характерні рослинні компоненти
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPrinciple.botanicalExamples.map((ex, i) => (
                    <span key={i} className="px-3 py-1 bg-white rounded-full border border-[#D6D0C3] text-xs font-mono text-[#182C24]">
                      🌿 {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 4 ARCHITECTURAL DEPTH LAYERS */}
        <div className="space-y-6 pt-6 border-t border-[#D6D0C3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Просторова стратифікація
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Чотири плани глибини ландшафтного простору
            </h2>
            <p className="mt-2 text-sm text-[#64765A] max-w-2xl leading-relaxed">
              Грамотна ландшафтна сцена ніколи не будується однією суцільною лінією. Вона розгортається шарами — від ніг спостерігача до далеких дерев.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {architecturalLayers.map((layer, idx) => (
              <div key={idx} className="p-6 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3] shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#AD765B] mb-2 font-bold">
                    <span>План 0{idx + 1}</span>
                    <Layers className="w-4 h-4 text-[#64765A]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#182C24]">
                    {layer.name}
                  </h3>
                  <div className="text-xs font-mono text-[#64765A] mt-1">
                    Відстань: {layer.depth}
                  </div>
                  <div className="text-xs font-mono text-[#AD765B] mt-0.5">
                    Висота: {layer.height}
                  </div>
                </div>

                <p className="text-xs text-[#262925] leading-relaxed pt-3 border-t border-[#D6D0C3]/60">
                  {layer.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: COMMON DESIGN MISTAKES & ARCHITECTURAL SOLUTIONS */}
        <div className="space-y-6 pt-6 border-t border-[#D6D0C3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Фаховий аудит помилок
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Чого ніколи не робить професійний архітектор
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {commonMistakes.map((item, idx) => (
              <div key={idx} className="p-6 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3] space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-red-800 font-semibold font-mono">
                  <AlertOctagon className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                  <span>Помилка: {item.mistake}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-emerald-900 font-medium font-sans pl-6 border-l-2 border-emerald-700">
                  <span>Рішення: {item.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
