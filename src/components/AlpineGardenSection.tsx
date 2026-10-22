import React, { useState } from 'react';
import { Alpine3DCanvas } from './Alpine3DCanvas';
import { ALPINE_STYLES_DATA, ALPINE_CONSTRUCTION_LAYERS } from '../data/alpineStylesData';
import { AlpineGardenStyleId } from '../types/landscape';
import { PlantSpecies } from '../types/botanical';
import { PLANTS_DATABASE } from '../data/plantsData';
import { Layers, Info } from 'lucide-react';

interface AlpineGardenSectionProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const AlpineGardenSection: React.FC<AlpineGardenSectionProps> = ({ onSelectPlant }) => {
  const [selectedStyleId, setSelectedStyleId] = useState<AlpineGardenStyleId>('mountain-scree');
  const [activeLayerStep, setActiveLayerStep] = useState<number>(4);

  const activeStyle = ALPINE_STYLES_DATA.find(s => s.id === selectedStyleId) || ALPINE_STYLES_DATA[0];

  const stoneRules = [
    {
      rule: 'Заглиблення на 1/3 висоти',
      desc: 'Камінь ніколи не кладуть поверх землі — він повинен «виростати» з ґрунту, як оголений тектонічний пласт.'
    },
    {
      rule: 'Єдиний кут нахилу пластів (15–20°)',
      desc: 'Усі валуни вкладаються з єдиним нахилом у бік пагорба. Це імітує природне залягання гірських порід і спрямовує дощову воду вглиб до коріння.'
    },
    {
      rule: 'Геологічна моносировина',
      desc: 'Заборонено змішувати граніт, вапняк і річкову гальку. Лише одна порода каменю та фракційний щебеневий відсів із цієї ж породи.'
    },
    {
      rule: 'Суха прикоренева шийка',
      desc: 'Зона контакту стебла з ґрунтом засипається 3–5 см чистого гравію, що рятує високогірні подушкові рослини від зимового загнивання.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#182C24] text-[#F4F0E6]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO HEADER */}
        <div className="border-b border-[#A7B39A]/30 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-3">
            <span className="px-2 py-0.5 bg-[#64765A] rounded text-[#F4F0E6] font-semibold">Глава 05</span>
            <span>//</span>
            <span>Скельні біотопи та геопластика</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
            Альпінарії: <br />
            <span className="italic font-normal text-[#A7B39A]">Геологія осипів та скельна флора у 3D.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#D6D0C3] max-w-3xl leading-relaxed font-light">
            Справжній альпінарій — це не штучна насипна гірка, а філігранна реконструкція гірського екотону. Тут панує мінеральний скелет, абсолютний дренаж та рослини-подушки, адаптовані до екстремального сонця і вітрів.
          </p>


        </div>

        {/* SECTION 1: 3D INTERACTIVE SHOWCASE & STYLE MORPHER */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#A7B39A]/30 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивний 3D-рушій Three.js
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
                Тривимірна морфологія альпінарію
              </h2>
            </div>

            {/* Style Selector Tabs */}
            <div className="flex flex-wrap gap-2 bg-[#1F2922] p-1.5 rounded-xl border border-[#A7B39A]/40 shrink-0">
              {ALPINE_STYLES_DATA.map(st => {
                const isSelected = st.id === selectedStyleId;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStyleId(st.id)}
                    className={`px-4 py-2 text-xs font-mono rounded-lg transition-all ${
                      isSelected
                        ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold shadow-md'
                        : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-[#64765A]/30'
                    }`}
                  >
                    {st.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Viewport with Style Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <Alpine3DCanvas currentStyle={selectedStyleId} onSelectPlant={onSelectPlant} />
            </div>

            <div className="lg:col-span-4 bg-[#1F2922] p-6 rounded-2xl border border-[#A7B39A]/40 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#AD765B]">
                  Стилістичний паспорт
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#F4F0E6] mt-0.5">
                  {activeStyle.name}
                </h3>
                <div className="text-xs text-[#A7B39A] font-mono mt-1">
                  {activeStyle.tagline}
                </div>
              </div>

              <p className="text-xs text-[#D6D0C3] leading-relaxed">
                {activeStyle.description}
              </p>

              <div className="pt-3 border-t border-[#A7B39A]/20 space-y-2 text-xs font-mono">
                <div>
                  <span className="text-[#A7B39A] block text-[10px] uppercase">Камінь:</span>
                  <span className="text-[#F4F0E6]">{activeStyle.stoneMaterial}</span>
                </div>
                <div>
                  <span className="text-[#A7B39A] block text-[10px] uppercase">Мульчувальний відсів:</span>
                  <span className="text-[#F4F0E6]">{activeStyle.gravelMulch}</span>
                </div>
                <div>
                  <span className="text-[#AD765B] block text-[10px] uppercase">Дренажний акцент:</span>
                  <span className="text-[#F4F0E6]">{activeStyle.drainageFocus}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#A7B39A]/20">
                <span className="text-[10px] font-mono uppercase text-[#A7B39A] block mb-2">
                  Ключова рослинність стилю (натисніть для досьє):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStyle.keySpecies.map((sp, idx) => {
                    const matching = PLANTS_DATABASE.find(p => 
                      p.botanicalName.toLowerCase().includes(sp.toLowerCase()) ||
                      sp.toLowerCase().includes(p.botanicalName.toLowerCase())
                    );
                    return (
                      <button
                        key={idx}
                        onClick={() => matching && onSelectPlant(matching)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors text-left flex items-center gap-1.5 ${
                          matching
                            ? 'bg-[#182C24] hover:bg-[#64765A] text-[#F4F0E6] border border-[#A7B39A]/30 cursor-pointer'
                            : 'bg-[#182C24] text-[#A7B39A] border border-[#A7B39A]/20 cursor-default'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: matching?.colorHex || '#AD765B' }} />
                        <span>{sp}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 5 GEOLOGICAL LAYERS CROSS-SECTION */}
        <div className="bg-[#1F2922] p-8 sm:p-10 rounded-3xl border border-[#A7B39A]/40 shadow-xl space-y-8">
          <div className="border-b border-[#A7B39A]/30 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#AD765B] mb-1 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Інженерно-геологічний розріз
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6]">
                Анатомія високодренованого альпійського осипу
              </h3>
            </div>
            <div className="text-xs font-mono text-[#A7B39A] bg-[#182C24] px-3.5 py-1.5 rounded-lg border border-[#A7B39A]/30 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#AD765B]" />
              <span>Норма ДБН В.2.1-10:2018</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Interactive Diagram (5 Layers) */}
            <div className="lg:col-span-5 space-y-2">
              {ALPINE_CONSTRUCTION_LAYERS.map(layer => {
                const isActive = layer.step === activeLayerStep;
                return (
                  <button
                    key={layer.step}
                    onClick={() => setActiveLayerStep(layer.step)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#AD765B] border-[#F4F0E6] text-[#F4F0E6] shadow-md font-semibold'
                        : 'bg-[#182C24]/90 border-[#A7B39A]/30 text-[#D6D0C3] hover:bg-[#64765A]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#182C24] text-[#F4F0E6] text-xs font-mono flex items-center justify-center font-bold">
                        {layer.step}
                      </span>
                      <div>
                        <div className="text-xs font-sans font-medium">{layer.name}</div>
                        <div className="text-[10px] font-mono text-[#D6D0C3] opacity-80">{layer.depth}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono opacity-80">Перегляд</span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Layer Rationale Dossier */}
            <div className="lg:col-span-7 bg-[#182C24] p-6 sm:p-8 rounded-2xl border border-[#A7B39A]/40 space-y-4">
              {(() => {
                const currentLayer = ALPINE_CONSTRUCTION_LAYERS.find(l => l.step === activeLayerStep)!;
                return (
                  <>
                    <div className="flex items-center justify-between border-b border-[#A7B39A]/30 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD765B]">
                          Шар 0{currentLayer.step} // Технічна специфікація
                        </span>
                        <h4 className="text-2xl font-serif font-bold text-[#F4F0E6] mt-0.5">
                          {currentLayer.name}
                        </h4>
                      </div>
                      <span className="text-xs font-mono text-[#A7B39A] bg-[#262925] px-3 py-1 rounded">
                        Потужність: {currentLayer.depth}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7B39A] block mb-1">
                        Матеріальний склад
                      </span>
                      <p className="text-xs text-[#F4F0E6] bg-[#262925] p-3 rounded-xl border border-[#A7B39A]/30">
                        {currentLayer.material}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7B39A] block mb-1">
                        Гідрологічна функція
                      </span>
                      <p className="text-xs text-[#D6D0C3] bg-[#262925] p-3 rounded-xl border border-[#A7B39A]/30">
                        {currentLayer.function}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD765B] block mb-1">
                        Агротехнічне та біологічне обґрунтування
                      </span>
                      <p className="text-xs leading-relaxed text-[#F4F0E6] bg-[#262925] p-3 rounded-xl border border-[#AD765B]/40">
                        {currentLayer.horticulturalRationale}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* SECTION 3: 4 GOLDEN RULES OF STONE PLACEMENT */}
        <div className="space-y-6 pt-6 border-t border-[#A7B39A]/30">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Практика кам'яної кладки
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
              4 Золоті закони укладання скельних брил
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stoneRules.map((rule, idx) => (
              <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-[#A7B39A]/20 space-y-3">
                <div className="text-xs font-mono text-[#AD765B] font-bold">
                  Закон 0{idx + 1}
                </div>
                <h3 className="text-lg font-serif font-bold text-[#F4F0E6]">
                  {rule.rule}
                </h3>
                <p className="text-xs text-[#D6D0C3] leading-relaxed pt-2 border-t border-white/10">
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
