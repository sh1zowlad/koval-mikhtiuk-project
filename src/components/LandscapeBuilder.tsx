import React, { useState } from 'react';
import { LandscapeBuilderCanvas } from './LandscapeBuilderCanvas';
import { PlaygroundConfig } from '../types/landscape';
import { COLOR_PALETTES } from '../data/colorPalettesData';
import { RETAINING_WALLS_DATA } from '../data/retainingWallData';
import { PLANTS_DATABASE } from '../data/plantsData';
import { 
  RotateCcw, Copy, Check, FileSpreadsheet, Download, 
  Layers, Compass, Trees, Flower2, ShieldAlert, Sparkles, X, Printer
} from 'lucide-react';

interface LandscapeBuilderProps {
  standalone?: boolean;
}

export const LandscapeBuilder: React.FC<LandscapeBuilderProps> = ({ standalone = false }) => {
  const initialConfig: PlaygroundConfig = {
    style: 'naturalistic',
    size: 'medium-terrace',
    terrain: 'terraced-slope',
    paletteId: 'terracotta-gold-sage',
    wallType: 'dry-stone',
    climberId: 'lonicera-periclymenum',
    focalPoint: 'specimen-pine'
  };

  const [config, setConfig] = useState<PlaygroundConfig>(initialConfig);
  const [copied, setCopied] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const resetConfig = () => {
    setConfig(initialConfig);
  };

  const activePalette = COLOR_PALETTES.find(p => p.id === config.paletteId) || COLOR_PALETTES[0];
  const activeWall = RETAINING_WALLS_DATA.find(w => w.id === config.wallType) || RETAINING_WALLS_DATA[0];
  const activeClimber = PLANTS_DATABASE.find(p => p.id === config.climberId) || PLANTS_DATABASE[0];

  // Calculated Engineering Specifications based on size and selections
  const areaSqM = config.size === 'pocket-courtyard' ? 45 : config.size === 'estate-slope' ? 380 : 150;
  const wallLengthM = config.size === 'pocket-courtyard' ? 4.2 : config.size === 'estate-slope' ? 14.5 : 7.8;
  const wallHeightM = 1.35;
  const stoneVolumeM3 = (wallLengthM * wallHeightM * 0.45).toFixed(1);
  const drainageCrushedRockM3 = (wallLengthM * wallHeightM * 0.35).toFixed(1);
  const geotextileAreaSqM = (wallLengthM * 2.8).toFixed(1);
  
  // Plant count based on 70/30 matrix principle (avg 7 plants / m²)
  const totalPlantCount = Math.round(areaSqM * 6.5);
  const matrixPlantsCount = Math.round(totalPlantCount * 0.70);
  const structuralPlantsCount = Math.round(totalPlantCount * 0.20);
  const accentPlantsCount = Math.round(totalPlantCount * 0.10);

  const generateReportText = () => {
    return `TERRA // АРХІТЕКТУРНО-БОТАНІЧНИЙ БРИФ ЛАНДШАФТУ
=====================================================
Дата формування: ${new Date().toLocaleDateString('uk-UA')}
Об'єкт: Інтерактивний генеративний проект ландшафту

1. БАЗОВА КОНЦЕПЦІЯ ТА СТИЛІСТИКА
-----------------------------------------------------
• Філософія стилю: ${
  config.style === 'naturalistic' ? 'Природна матриця (Naturalistic Matrix)' :
  config.style === 'alpine-rockery' ? 'Альпійський осип (Alpine High Scree)' :
  config.style === 'contemporary-zen' ? 'Мінімалістичний спокій (Contemporary Restraint)' :
  'Лісове узлісся (Woodland Canopy Ecotone)'
}
• Площа проектування: ${areaSqM} м² (${
  config.size === 'pocket-courtyard' ? 'Внутрішній дворик' :
  config.size === 'estate-slope' ? 'Присадибний схил' : 'Терасований сад'
})
• Топографія схилу: ${
  config.terrain === 'terraced-slope' ? 'Дворівневий терасний схил (ухил 18-24°)' :
  config.terrain === 'sunken-scree' ? 'Заглиблена природна мульда' : 'Плавний природний рельєф'
}
• Головна фокусна домінанта: ${
  config.focalPoint === 'specimen-pine' ? 'Сосна гірська «Пуміліо» (Pinus mugo)' :
  config.focalPoint === 'megalithic-boulder' ? 'Вапняковий вивітрений моноліт' :
  config.focalPoint === 'curving-stone-stair' ? 'Радіальні кам\'яні сходи з плитняку' :
  'Дзеркальний резервуар спокою з лататтям'
}

2. ІНЖЕНЕРНИЙ РОЗРАХУНОК ПІДПІРНОЇ СТІНКИ
-----------------------------------------------------
• Тип конструкції: ${activeWall.name}
• Протяжність підпірної лінії: ${wallLengthM} пог. м
• Висота підпору: ${wallHeightM} м
• Розрахунковий об'єм каменю/матеріалу: ${stoneVolumeM3} м³
• Дренажна подушка (фракційний щебінь 20-40 мм): ${drainageCrushedRockM3} м³
• Роздільне геотекстильне полотно (200 г/м²): ${geotextileAreaSqM} м²
• Перфорована водовідвідна труба Ø110 мм: ${(wallLengthM * 1.05).toFixed(1)} пог. м
• Ухил відкосу стінки (кугельпанцер): 5-8° у бік пагорба

3. БОТАНІЧНА ПАЛІТРА ТА БАЛАНС ПОСАДКИ (ПРИНЦИП 70/30)
-----------------------------------------------------
• Домінантна гармонія: «${activePalette.title}»
• Відтінки цвітіння та хвої: ${activePalette.dominantColors.join(', ')}
• Сезонний пік декоративності: ${activePalette.bloomWindow}
• Загальна розрахункова кількість рослин: ${totalPlantCount} шт.
  - Матричні ґрунтопокривні та злаки (70%): ${matrixPlantsCount} шт.
  - Структурні багаторічники (20%): ${structuralPlantsCount} шт.
  - Сезонні спалахи та акценти (10%): ${accentPlantsCount} шт.
• Вертикальне озеленення: ${activeClimber.commonName} (${activeClimber.botanicalName})
  - Механіка кріплення: ${activeClimber.category === 'climber' ? 'Тросова або дерев\'яна шпалера' : 'Опора'}

=====================================================
Документ сформовано презентаційною студією KOVAL MIKHTIUK // TERRA — Презентація ландшафтного дизайну.`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadBrief = () => {
    const element = document.createElement("a");
    const file = new Blob([generateReportText()], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `TERRA_Landscape_Brief_${config.style}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="playground" className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F0E6] text-[#262925] relative ${standalone ? 'min-h-screen' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-[#A7B39A]/60 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64765A] mb-2">
              <span className="px-2 py-0.5 bg-[#EAE4D5] rounded text-[#182C24] font-semibold">3D Студія</span>
              <span>//</span>
              <span>Інтерактивна 3D Дизайн-студія</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#182C24]">
              Створіть свій ландшафт
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#64765A] max-w-2xl leading-relaxed">
              Синтезуйте композиційні правила, кам'яну інженерію та ботанічну палітру. Керуйте параметрами ділянки у реальному часі та формуйте готовий архітектурний бриф.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={resetConfig}
              className="px-4 py-2.5 text-xs font-mono bg-[#EAE4D5] hover:bg-[#D6D0C3] text-[#182C24] rounded-xl border border-[#A7B39A]/50 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Скинути</span>
            </button>
            <button
              onClick={handleCopySummary}
              className="px-4 py-2.5 text-xs font-mono bg-[#EAE4D5] hover:bg-[#D6D0C3] text-[#182C24] rounded-xl border border-[#A7B39A]/50 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Скопійовано' : 'Копіювати бриф'}</span>
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-5 py-2.5 text-xs font-mono bg-[#AD765B] hover:bg-[#c4876b] text-[#F4F0E6] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Паспорт проекту</span>
            </button>
          </div>
        </div>

        {/* Live Engineering Metrics Bar — Senior Architectural Spec */}
        <div className="border-t border-b border-[#D6D0C3] py-5 mb-10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#D6D0C3]">
          <div className="py-2 md:py-0 md:px-6 first:pl-0">
            <div className="text-[11px] font-mono text-[#64765A] uppercase tracking-wider">01 // Площа ділянки</div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-1">
              {areaSqM} <span className="text-sm font-sans font-normal text-[#64765A]">м²</span>
            </div>
            <div className="text-[11px] font-mono text-[#A7B39A] mt-0.5">Озеленення ~{Math.round(areaSqM * 0.85)} м²</div>
          </div>
          <div className="py-2 md:py-0 md:px-6">
            <div className="text-[11px] font-mono text-[#64765A] uppercase tracking-wider">02 // Підпірна лінія</div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-1">
              {wallLengthM} <span className="text-sm font-sans font-normal text-[#64765A]">пог. м</span>
            </div>
            <div className="text-[11px] font-mono text-[#A7B39A] mt-0.5">Висота перепаду: 1.35 м</div>
          </div>
          <div className="py-2 md:py-0 md:px-6">
            <div className="text-[11px] font-mono text-[#64765A] uppercase tracking-wider">03 // Камінь / Дренаж</div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-1">
              {stoneVolumeM3} <span className="text-sm font-sans font-normal text-[#64765A]">м³</span>
            </div>
            <div className="text-[11px] font-mono text-[#A7B39A] mt-0.5">Подушка: {drainageCrushedRockM3} м³</div>
          </div>
          <div className="py-2 md:py-0 md:px-6 last:pr-0">
            <div className="text-[11px] font-mono text-[#64765A] uppercase tracking-wider">04 // Матриця рослин</div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-1">
              {totalPlantCount} <span className="text-sm font-sans font-normal text-[#64765A]">саджанців</span>
            </div>
            <div className="text-[11px] font-mono text-[#A7B39A] mt-0.5">Баланс 70% основа / 30% акценти</div>
          </div>
        </div>

        {/* 3D Viewport & Parameter Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Left Column: 3D Preview Canvas & Synthesis Dossier (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <LandscapeBuilderCanvas config={config} />

            {/* Generated Design Logic Card */}
            <div className="bg-[#FAF8F3] p-6 sm:p-7 rounded-2xl border border-[#D6D0C3] space-y-4 shadow-sm">
              <div className="flex items-center justify-between text-xs border-b border-[#D6D0C3]/60 pb-3">
                <span className="font-mono text-[11px] text-[#AD765B] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Архітектурно-ландшафтний синтез
                </span>
                <span className="font-mono text-[11px] text-[#64765A] bg-[#EAE4D5] px-2.5 py-1 rounded-md">
                  Детермінована 3D модель
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-[#182C24]">
                  {config.style === 'naturalistic' ? 'Природна матриця' : config.style === 'alpine-rockery' ? 'Альпійський кам\'янистий осип' : config.style === 'contemporary-zen' ? 'Сучасний лаконічний мінімалізм' : 'Лісове затінене узлісся'} // {config.terrain === 'terraced-slope' ? 'Дворівневий терасний схил' : config.terrain === 'sunken-scree' ? 'Заглиблена природна мульда' : 'Плавний природний рельєф'}
                </h4>
                <p className="mt-2 text-sm text-[#262925] leading-relaxed">
                  Просторовий каркас зафіксовано конструкцією <strong>{activeWall.name}</strong>, що забезпечує стабільність ґрунту при розрахунковому навантаженні. Скульптурною домінантою композиції виступає <strong>{config.focalPoint === 'specimen-pine' ? 'Сосна гірська «Пуміліо» (Pinus mugo)' : config.focalPoint === 'megalithic-boulder' ? 'Вапняковий природний моноліт' : config.focalPoint === 'curving-stone-stair' ? 'Радіальні кам\'яні сходи' : 'Дзеркальний водяний резервуар'}</strong>, а вертикальний акцент забезпечує ліана <strong>{activeClimber.commonName}</strong> на дерев'яній шпалері.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 border-t border-[#D6D0C3]/60 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#64765A] uppercase mr-2">Колористика:</span>
                  <span className="font-semibold text-[#182C24]">{activePalette.title}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#64765A] uppercase mr-2">Матеріал стінки:</span>
                  <span className="font-semibold text-[#182C24]">{activeWall.name.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#64765A] uppercase mr-2">Дренажний шар:</span>
                  <span className="font-semibold text-emerald-800">Норма ДБН В.2.1-10:2018</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Parameter Selectors (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F3] p-6 sm:p-7 rounded-2xl border border-[#D6D0C3] space-y-6 shadow-sm">
            {/* 1. Landscape Style */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#64765A] flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 font-bold text-[#182C24]">
                  <Compass className="w-3.5 h-3.5 text-[#AD765B]" />
                  1. Стилістика саду
                </span>
                <span className="text-[10px] text-[#A7B39A]">Концепт</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'naturalistic', label: 'Природна матриця' },
                  { id: 'alpine-rockery', label: 'Альпійський осип' },
                  { id: 'contemporary-zen', label: 'Мінімалізм' },
                  { id: 'woodland-edge', label: 'Лісове узлісся' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig({ ...config, style: opt.id as any })}
                    className={`p-3 rounded-xl text-xs font-mono text-left border transition-all ${
                      config.style === opt.id
                        ? 'bg-[#182C24] text-[#F4F0E6] border-[#182C24] font-semibold shadow-sm'
                        : 'bg-white/80 text-[#262925] border-[#D6D0C3] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale of Garden */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#64765A] flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 font-bold text-[#182C24]">
                  <Layers className="w-3.5 h-3.5 text-[#AD765B]" />
                  2. Масштаб території
                </span>
                <span className="text-[10px] text-[#A7B39A]">Площа</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'pocket-courtyard', label: 'Дворик 45 м²' },
                  { id: 'medium-terrace', label: 'Сад 150 м²' },
                  { id: 'estate-slope', label: 'Схил 380 м²' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig({ ...config, size: opt.id as any })}
                    className={`p-2.5 rounded-xl text-xs font-mono text-center border transition-all ${
                      config.size === opt.id
                        ? 'bg-[#182C24] text-[#F4F0E6] border-[#182C24] font-semibold shadow-sm'
                        : 'bg-white/80 text-[#262925] border-[#D6D0C3] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Topography */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#64765A] block mb-2 font-bold text-[#182C24]">
                3. Рельєф та геопластика
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gentle-undulating', label: 'Хвилястий' },
                  { id: 'terraced-slope', label: 'Терасований' },
                  { id: 'sunken-scree', label: 'Заглиблений' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig({ ...config, terrain: opt.id as any })}
                    className={`p-2.5 rounded-xl text-xs font-mono text-center border transition-all ${
                      config.terrain === opt.id
                        ? 'bg-[#64765A] text-[#F4F0E6] border-[#64765A] font-semibold'
                        : 'bg-white/80 text-[#262925] border-[#D6D0C3] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Retaining Wall Material */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#64765A] block mb-2 font-bold text-[#182C24]">
                4. Конструкція підпірної стінки
              </label>
              <div className="grid grid-cols-2 gap-2">
                {RETAINING_WALLS_DATA.map(w => (
                  <button
                    key={w.id}
                    onClick={() => setConfig({ ...config, wallType: w.id })}
                    className={`p-2.5 rounded-xl text-xs font-mono text-left border transition-all ${
                      config.wallType === w.id
                        ? 'bg-[#64765A] text-[#F4F0E6] border-[#64765A] font-semibold'
                        : 'bg-white/80 text-[#262925] border-[#D6D0C3] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    <span className="block truncate font-medium">{w.name.split('(')[0]}</span>
                    <span className="text-[10px] opacity-75 block truncate">{w.material.split(',')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Living Plant Palette */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#64765A] flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 font-bold text-[#182C24]">
                  <Flower2 className="w-3.5 h-3.5 text-[#AD765B]" />
                  5. Колористична палітра
                </span>
                <span className="text-[10px] text-[#A7B39A]">6 гармоній</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COLOR_PALETTES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setConfig({ ...config, paletteId: p.id })}
                    className={`p-2 rounded-xl text-xs font-mono text-left border transition-all ${
                      config.paletteId === p.id
                        ? 'bg-[#AD765B] text-[#F4F0E6] border-[#AD765B] font-semibold shadow-sm'
                        : 'bg-white/80 text-[#262925] border-[#D6D0C3] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    <div className="flex gap-1 mb-1.5">
                      {p.dominantColors.slice(0, 3).map((hex, i) => (
                        <span key={i} className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: hex }} />
                      ))}
                    </div>
                    <span className="truncate block text-[11px]">{p.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Focal Anchor Specimen */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#64765A] flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 font-bold text-[#182C24]">
                  <Trees className="w-3.5 h-3.5 text-[#AD765B]" />
                  6. Головна фокусна домінанта
                </span>
                <span className="text-[10px] text-[#A7B39A]">Акцент</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'specimen-pine', label: 'Сосна гірська «Пуміліо»' },
                  { id: 'megalithic-boulder', label: 'Вапняковий моноліт' },
                  { id: 'curving-stone-stair', label: 'Кам\'яні сходи' },
                  { id: 'water-basin', label: 'Водний басейн' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig({ ...config, focalPoint: opt.id as any })}
                    className={`p-2.5 rounded-xl text-xs font-mono text-left border transition-all ${
                      config.focalPoint === opt.id
                        ? 'bg-[#182C24] text-[#F4F0E6] border-[#182C24] font-semibold'
                        : 'bg-white/80 text-[#262925] border-[#D6D0C3] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Vertical Climber */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#64765A] block mb-2 font-bold text-[#182C24]">
                7. Витка рослина для перголи / шпалери
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'lonicera-periclymenum', label: 'Жимолость кучерява' },
                  { id: 'parthenocissus-quinquefolia', label: 'Дівочий виноград (багряний)' },
                  { id: 'clematis-vitalba', label: 'Ломиніс виноградолистий' },
                  { id: 'wisteria-sinensis', label: 'Гліцинія китайська' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setConfig({ ...config, climberId: opt.id })}
                    className={`p-2.5 rounded-xl text-xs font-mono text-left border transition-all ${
                      config.climberId === opt.id
                        ? 'bg-[#182C24] text-[#F4F0E6] border-[#182C24] font-semibold'
                        : 'bg-white/80 text-[#262925] border-[#D6D0C3] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Engineering Note */}
        <div className="p-4 bg-[#EAE4D5] rounded-xl border border-[#A7B39A]/60 flex items-start sm:items-center gap-3 text-xs text-[#64765A]">
          <ShieldAlert className="w-4 h-4 text-[#AD765B] shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Інженерна верифікація:</strong> Розрахунки об'єму матеріалів і кількості саджанців є орієнтовно-нормативними (базуються на правилі 70/30 матричної посадки). Для робочого будівництва на схилі обов'язковим є геологічний аналіз кута природного укосу та розрахунок гідростатичного тиску ґрунтових вод.
          </span>
        </div>
      </div>

      {/* EXPORT PROJECT PASSPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF8F3] text-[#262925] max-w-2xl w-full rounded-2xl border border-[#D6D0C3] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#182C24] text-[#F4F0E6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#AD765B]" />
                <h3 className="text-lg font-serif font-bold">Архітектурно-ботанічний паспорт проекту</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded-lg text-[#D6D0C3] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Printable Report */}
            <div className="p-6 overflow-y-auto space-y-5 font-mono text-xs">
              <div className="p-4 bg-white rounded-xl border border-[#D6D0C3] leading-relaxed space-y-3 whitespace-pre-line text-[#182C24]">
                {generateReportText()}
              </div>

              <div className="p-3 bg-[#EAE4D5] rounded-lg text-[#64765A] text-[11px]">
                Цей документ містить повний зведений розрахунок для агротехнічного кошторису, закупівлі посадкового матеріалу та замовлення каменю.
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 bg-[#EAE4D5] border-t border-[#D6D0C3] flex items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white hover:bg-[#D6D0C3] text-[#182C24] rounded-xl border border-[#A7B39A]/60 font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Друкувати</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  className="px-4 py-2 bg-white hover:bg-[#D6D0C3] text-[#182C24] rounded-xl border border-[#A7B39A]/60 font-mono text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Скопійовано' : 'В буфер'}</span>
                </button>
                <button
                  onClick={handleDownloadBrief}
                  className="px-5 py-2 bg-[#AD765B] hover:bg-[#c4876b] text-[#F4F0E6] rounded-xl font-mono text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Завантажити .TXT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
