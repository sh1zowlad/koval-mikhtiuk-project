import React, { useState } from 'react';
import { PRINCIPLES_DATABASE } from '../data/principlesData';
import { LandscapePrinciple } from '../types/landscape';
import { Crosshair, ArrowRight, Sparkles } from 'lucide-react';

export const LandscapePrinciples: React.FC = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<LandscapePrinciple>(PRINCIPLES_DATABASE[0]);

  const architecturalLayers = [
    {
      step: '01',
      title: 'Передній план // Авансцена',
      range: '0 – 3 м від спостерігача',
      height: '5 – 30 см',
      species: 'Килимові сукуленти, чебрець, гравійна відсипка',
      desc: 'Відкритий партер, що не затуляє перспективу. Затягує погляд всередину саду через дрібну фактуру та текстурну зернистість.'
    },
    {
      step: '02',
      title: 'Середній план // Сцена активності',
      range: '3 – 8 м глибини',
      height: '40 – 110 см',
      species: 'Шавлія дібровна, ехінацея, ковила, сеслерія',
      desc: 'Основне тіло матричної посадки. Створює просторовий рух хвилями злаків, містить головні колористичні та сезонні акценти.'
    },
    {
      step: '03',
      title: 'Задній план // Живі куліси',
      range: '8 – 20+ м глибини',
      height: '1.5 – 6 м',
      species: 'Підпірні мури, скельні сосни, граби, ліани',
      desc: 'Формує архітектурну межу простору, оптично віддаляє лінію горизонту, створює відчуття захищеності та Genius Loci.'
    },
    {
      step: '04',
      title: 'Фокусна вертикаль // Скульптурний якір',
      range: 'Видова точка тяжіння',
      height: 'Домінанта композиції',
      species: 'Солітерна сосна, масивний тектонічний валун',
      desc: 'Організовує навколо себе все оптичне поле. Притягує погляд і створює миттєву тривимірну орієнтацію на ділянці.'
    }
  ];

  const fieldNotes = [
    {
      num: '01',
      mistake: 'Каталожний хаос («по одній рослині кожного сорту»)',
      fix: 'Матрична посадка взаємопроникними масивами: мінімум 5–7 екземплярів одного виду у природних куртинах.'
    },
    {
      num: '02',
      mistake: 'Прямолінійне висаджування за лінійкою вздовж межі ділянки',
      fix: 'Хвилеподібна ярусна розмивка з глибокими рослинними кишенями та виступами назустріч видовій доріжці.'
    },
    {
      num: '03',
      mistake: 'Відсутність негативного простору та тотальне засадження',
      fix: 'Свідоме збереження пауз: мінімум 30% вільного простору — гравійні галявини, низькі трав\'яні килими чи гладінь води.'
    },
    {
      num: '04',
      mistake: 'Штучна симетрія та дзеркальне планування на складному рельєфі',
      fix: 'Динамічна асиметрія: врівноваження важкої кам\'яної підпірної стіни протилежним масивом повітряних злакових хвиль.'
    }
  ];

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] text-[#262925]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* NATURAL EDITORIAL HEADER */}
        <div className="border-b border-[#D6D0C3] pb-10">
          <div className="flex items-center gap-2 text-xs font-sans text-[#64765A] mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Архітектурна композиція • Граматика ландшафтного простору</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#182C24] leading-[1.1] max-w-4xl">
            Граматика простору: <br />
            <span className="italic font-normal text-[#64765A]">Мистецтво природної композиції.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#262925]/85 max-w-3xl leading-relaxed font-light font-sans">
            Природна композиція — це не хаос і не штучна симетрія Версалю. Це кристалізація законів природи: взаємопроникнення мас, динамічна рівновага без дзеркальності, гра світлотіні та безпомилковий вибір скульптурних домінант.
          </p>
        </div>

        {/* SECTION 1: INTERACTIVE SPATIAL ANALYZER */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D6D0C3] pb-6">
            <div>
              <span className="text-xs font-sans text-[#AD765B] block mb-1">
                Інтерактивна схема • 10 законів композиції
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24]">
                Дослідження композиційної сітки ділянки
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#64765A] max-w-md font-sans">
              Оберіть принцип зі списку праворуч, щоб побачити його координату на генеральному плані та архітектурне обґрунтування.
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
                    strokeWidth="1.5" 
                    className="animate-ping"
                  />
                  <circle 
                    cx={selectedPrinciple.visualTarget.x} 
                    cy={selectedPrinciple.visualTarget.y} 
                    r="4" 
                    fill="#AD765B" 
                  />
                  <line 
                    x1={selectedPrinciple.visualTarget.x} 
                    y1={selectedPrinciple.visualTarget.y - 8} 
                    x2={selectedPrinciple.visualTarget.x} 
                    y2={selectedPrinciple.visualTarget.y + 8} 
                    stroke="#F4F0E6" 
                    strokeWidth="1" 
                  />
                  <line 
                    x1={selectedPrinciple.visualTarget.x - 8} 
                    y1={selectedPrinciple.visualTarget.y} 
                    x2={selectedPrinciple.visualTarget.x + 8} 
                    y2={selectedPrinciple.visualTarget.y} 
                    stroke="#F4F0E6" 
                    strokeWidth="1" 
                  />
                </svg>

                {/* Tactical Top Bar */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#A7B39A] bg-[#182C24]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <Crosshair className="w-4 h-4 text-[#AD765B]" />
                    <span className="uppercase tracking-wider">Координати: X:{selectedPrinciple.visualTarget.x}% Y:{selectedPrinciple.visualTarget.y}%</span>
                  </div>
                  <span className="text-[#F4F0E6] font-semibold">{selectedPrinciple.title}</span>
                </div>

                {/* Bottom Legend */}
                <div className="relative z-10 flex flex-wrap gap-2 text-[11px] font-mono text-[#D6D0C3] bg-[#182C24]/90 p-3 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1F3F29]" /> Солітер</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8C887E]" /> Камінь</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7C89B8]" /> Матриця злаків</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#B8B0A2]" /> Стінка</span>
                </div>
              </div>

              {/* Principle Selector Pill Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PRINCIPLES_DATABASE.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPrinciple(p)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono transition-all text-left truncate border ${
                      selectedPrinciple.id === p.id
                        ? 'bg-[#182C24] text-[#F4F0E6] border-[#182C24] font-semibold shadow-sm'
                        : 'bg-white hover:bg-[#EAE4D5] text-[#262925] border-[#D6D0C3]'
                    }`}
                  >
                    <span className="opacity-60 mr-1.5 font-bold">{p.number}.</span>
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Principle Deep Dossier Panel (6 cols) */}
            <div className="lg:col-span-6 bg-white p-8 rounded-2xl border border-[#D6D0C3] shadow-sm space-y-6">
              <div className="border-b border-[#D6D0C3] pb-4">
                <span className="text-xs font-mono text-[#AD765B] font-bold">
                  Принцип {selectedPrinciple.number} з 10
                </span>
                <h3 className="text-3xl font-serif font-bold text-[#182C24] mt-1">
                  {selectedPrinciple.title}
                </h3>
                <div className="text-xs text-[#64765A] font-mono mt-1">
                  {selectedPrinciple.subtitle}
                </div>
              </div>

              {/* Definition */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#64765A] font-semibold block">
                  Архітектурне визначення
                </span>
                <p className="text-base text-[#262925] leading-relaxed font-sans font-light">
                  {selectedPrinciple.definition}
                </p>
              </div>

              {/* Ecological Importance */}
              <div className="p-5 bg-[#FAF8F3] rounded-xl border-l-2 border-[#AD765B] space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#AD765B] font-bold block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Чому це працює в живому ландшафті
                </span>
                <p className="text-sm text-[#262925]/90 leading-relaxed font-sans font-light">
                  {selectedPrinciple.importance}
                </p>
              </div>

              {/* Practical Application */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#64765A] font-semibold block">
                  Практичне втілення на ділянці
                </span>
                <p className="text-sm text-[#262925]/85 leading-relaxed font-sans font-light">
                  {selectedPrinciple.application}
                </p>
              </div>

              {/* Botanical Examples Chips */}
              <div className="space-y-2 pt-4 border-t border-[#D6D0C3]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#64765A] block">
                  Характерні рослинні компоненти
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPrinciple.botanicalExamples.map((ex, i) => (
                    <span key={i} className="px-3.5 py-1 bg-[#FAF8F3] rounded-full border border-[#D6D0C3] text-xs font-mono text-[#182C24]">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ARCHITECTURAL DEPTH STRATIGRAPHY (EDITORIAL HORIZONTAL FLOW, NO REPETITIVE CARDS) */}
        <div className="space-y-8 pt-8 border-t border-[#D6D0C3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Просторова стратифікація
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Чотири плани глибини ландшафтної сцени
            </h2>
            <p className="mt-2 text-base text-[#64765A] max-w-3xl leading-relaxed font-light">
              Ландшафтна перспектива будується як багатошарова просторова партитура — від тактильного переднього плану до горизонту.
            </p>
          </div>

          {/* Clean Horizontal Editorial Stratification */}
          <div className="divide-y divide-[#D6D0C3] border-t border-b border-[#D6D0C3]">
            {architecturalLayers.map((layer) => (
              <div key={layer.step} className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-start group">
                {/* Number & Plan Name (4 cols) */}
                <div className="md:col-span-4 space-y-1">
                  <div className="text-xs font-mono text-[#AD765B] font-bold">
                    ПЛАН // {layer.step}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#182C24]">
                    {layer.title}
                  </h3>
                  <div className="text-xs font-mono text-[#64765A]">
                    {layer.range} • {layer.height}
                  </div>
                </div>

                {/* Botanical Species (4 cols) */}
                <div className="md:col-span-4 text-xs font-mono text-[#64765A] bg-white/70 p-3.5 rounded-xl border border-[#D6D0C3]/80">
                  <span className="block text-[10px] uppercase text-[#AD765B] font-bold tracking-wider mb-1">
                    Рослинні маркери
                  </span>
                  {layer.species}
                </div>

                {/* Architectural Purpose (4 cols) */}
                <div className="md:col-span-4 text-sm text-[#262925]/85 font-sans font-light leading-relaxed">
                  {layer.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: EDITORIAL COMPARATIVE FIELD NOTES (NO RED BOX CARDS) */}
        <div className="space-y-8 pt-8 border-t border-[#D6D0C3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Фаховий аудит
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Архітектурні контрасти: Типові помилки та природні рішення
            </h2>
          </div>

          <div className="divide-y divide-[#D6D0C3] border-t border-b border-[#D6D0C3]">
            {fieldNotes.map((item) => (
              <div key={item.num} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                {/* Item Number */}
                <div className="lg:col-span-1 font-mono text-sm font-bold text-[#AD765B]">
                  [{item.num}]
                </div>

                {/* Mistake (5 cols) */}
                <div className="lg:col-span-5 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD765B] font-bold block">
                    Помилка аматорського підходу
                  </span>
                  <p className="text-base font-serif text-[#182C24] font-medium leading-snug">
                    {item.mistake}
                  </p>
                </div>

                {/* Arrow spacer (1 col) */}
                <div className="hidden lg:flex lg:col-span-1 justify-center text-[#64765A]">
                  <ArrowRight className="w-5 h-5 text-[#64765A]" />
                </div>

                {/* Fix (5 cols) */}
                <div className="lg:col-span-5 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#64765A] font-bold block">
                    Природне архітектурне рішення
                  </span>
                  <p className="text-sm font-sans text-[#262925]/90 leading-relaxed font-light">
                    {item.fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
