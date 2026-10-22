import React, { useState } from 'react';
import { Climber3DCanvas } from './Climber3DCanvas';
import { Season, ClimberSpecies } from '../types/landscape';
import { PlantSpecies } from '../types/botanical';
import { AlertTriangle } from 'lucide-react';

interface ClimberSectionProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

const CLIMBER_SPECIES: ClimberSpecies[] = [
  {
    id: 'clematis-viticella',
    botanicalName: 'Clematis viticella',
    commonName: 'Ломиніс фіолетовий (клематіс)',
    mechanism: 'Черешкові вусики (обвивання листком)',
    supportType: 'Тонкі дротяні шпалери, сітка діаметром < 1.5 см',
    matureHeight: '3.0–4.0 м',
    leafShape: 'pinnate',
    flowerTone: 'Оксамитовий насичено-фіолетовий',
    pruningNotes: 'Група обрізки 3: щорічне зрізання до 30 см напровесні перед початком вегетації.',
    seasonalNotes: {
      Весна: 'Стрімкий розвиток молодих зелених пагонів, що чіпляються за дріт.',
      Літо: 'Суцільна розкішна завіса пониклих фіолетово-пурпурових квітів.',
      Осінь: 'Шовковисті пухнасті сріблясті голівки насіння на фоні золотавого листя.',
      Зима: 'Період спокою; пагони коротко обрізаються біля самої землі.'
    }
  },
  {
    id: 'lonicera-periclymenum',
    botanicalName: "Lonicera periclymenum 'Serotina'",
    commonName: 'Жимолость в\'юнка «Серотіна»',
    mechanism: 'Стебла, що закручуються (спіральні)',
    supportType: 'Дерев\'яні колони пергол, товсті троси, жердини',
    matureHeight: '4.0–6.0 м',
    leafShape: 'oval',
    flowerTone: 'Пурпурово-червоний зовні, кремово-бурштиновий всередині',
    pruningNotes: 'Санітарне проріджування старих загущених пагонів після завершення цвітіння.',
    seasonalNotes: {
      Весна: 'Активне закручування верхівок стебел за годинниковою стрілкою навколо опор.',
      Літо: 'Неймовірний вечірній аромат трубчастих суцвіть, що вабить нічних метеликів.',
      Осінь: 'Грона напівпрозорих яскраво-червоних ягід, що приваблюють птахів.',
      Зима: 'Потужні переплетені канатоподібні батоги з вивітреною фактурною корою.'
    }
  },
  {
    id: 'parthenocissus-quinquefolia',
    botanicalName: 'Parthenocissus quinquefolia',
    commonName: 'Дівочий виноград п\'ятилисточковий',
    mechanism: 'Дископодібні присоски (Holdfasts)',
    supportType: 'Глухі кам\'яні мури, цегляні стіни, бетонні паркани',
    matureHeight: '10.0–15.0 м',
    leafShape: 'lobed',
    flowerTone: 'Непоказне зеленувате (декоративно-листяна ліана)',
    pruningNotes: 'Щорічна осіння стрижка для обмеження розростання по вікнах і покрівлі.',
    warningNote: 'Присоски фіксуються надміцно; примусовий демонтаж лози може пошкодити неякісну штукатурку.',
    seasonalNotes: {
      Весна: 'Ніжне мідно-бронзове пальчасте листя, що швидко стає смарагдовим.',
      Літо: 'Суцільний щільний багатошаровий вертикальний зелений килим.',
      Осінь: 'Легендарний палаючий багряно-кармінний спалах, найяскравіший у саду.',
      Зима: 'Графічний виразний малюнок павутиння лози на кам\'яній стіні з синіми ягодами.'
    }
  },
  {
    id: 'wisteria-sinensis',
    botanicalName: 'Wisteria sinensis',
    commonName: 'Гліцинія китайська',
    mechanism: 'Потужне одерев\'яніле скручування',
    supportType: 'Масивні сталеві або дубові балки, товсті троси > 6 мм',
    matureHeight: '8.0–12.0 м',
    leafShape: 'pinnate',
    flowerTone: 'Бузково-блакитні каскади завдовжки 30–50 см',
    pruningNotes: 'Подвійна обрізка: укорочення бічних пагонів у липні (до 6 бруньок) та в січні (до 2–3 бруньок).',
    warningNote: 'Рослина має колосальну скручувальну силу; здатна зім\'яти водостічні труби або розчавити тонкі рейки.',
    seasonalNotes: {
      Весна: 'Казковий вибух сотень пониклих запашних квіткових китиць ще до появи листя.',
      Літо: 'Пишний шатровий полог ажурного периферичного листя, що дає густу тінь.',
      Осінь: 'Золотаво-бронзове листя та довгі оксамитові стручки з насінням.',
      Зима: 'Потужні скульптурні канати стовбурів, схожі на живі удави, що обіймають перголу.'
    }
  }
];

const SEASONS: Season[] = ['Весна', 'Літо', 'Осінь', 'Зима'];

const mechanisms = [
  {
    type: 'Черешкові вусики (Clematis)',
    cableReq: 'Тонкі троси до Ø4–8 мм, комірка сітки 10×10 см',
    physics: 'Черешок листка обертається навколо тонкої опори за 2–4 години після дотику. На товстих стовпах (>20 мм) закріпитися не здатний.'
  },
  {
    type: 'Стеблові обвивачі (Lonicera, Wisteria)',
    cableReq: 'Стовпи Ø50–150 мм, потужні дерев\'яні або металеві перголи',
    physics: 'Верхівка молодого пагона робить циркулярні рухи в повітрі, закручуючись за або проти сонця, поступово дерев\'яніючи.'
  },
  {
    type: 'Дископодібні присоски (Parthenocissus)',
    cableReq: 'Не потребує шпалери: камінь, цегла, шорсткий бетон',
    physics: 'Кінчики вусиків виділяють кальцієво-пектиновий природний цемент, який міцно кристалізується в мікропорах стіни.'
  },
  {
    type: 'Спираючі кущі (Rosa climbing)',
    cableReq: 'Горизонтальні троси кожні 40 см з ручним підв\'язуванням',
    physics: 'Рослина не має активних органів кріплення; у природі спирається загнутими назад шипами на гілки дерев.'
  }
];

export const ClimbingPlantsSection: React.FC<ClimberSectionProps> = ({ onSelectPlant }) => {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>('lonicera-periclymenum');
  const [selectedSeason, setSelectedSeason] = useState<Season>('Літо');

  const activeClimber = CLIMBER_SPECIES.find(c => c.id === selectedSpeciesId) || CLIMBER_SPECIES[0];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#182C24] text-[#F4F0E6]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO HEADER */}
        <div className="border-b border-[#A7B39A]/20 pb-8">
          <div className="flex items-center gap-2 text-xs font-sans text-[#A7B39A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Виткі ліани • Вертикальний вимір та зелена архітектура</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
            Виткі рослини: <br />
            <span className="italic font-normal text-[#A7B39A]">Живі перголи, ліани та 4 пори року у 3D.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#D6D0C3] max-w-3xl leading-relaxed font-light font-sans">
            Вертикальні поверхні володіють найбільшим потенціалом у компактних садах. Ліани перетворюють глухі огорожі та стіни будинків на багатошарові живі завіси, захищаючи фасад від перегріву влітку та створюючи камерний затишок.
          </p>
        </div>

        {/* SECTION 1: 3D INTERACTIVE SEASON & SPECIES SIMULATOR */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#A7B39A]/20 pb-6">
            <div>
              <span className="text-xs font-sans text-[#AD765B] block mb-1">
                Інтерактивна 3D пергола
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6]">
                Симуляція розвитку ліан за порами року
              </h2>
            </div>

            {/* Season Switcher Pills */}
            <div className="flex items-center gap-1.5 bg-[#1F2922] p-1.5 rounded-xl border border-[#A7B39A]/30 shrink-0">
              {SEASONS.map(s => {
                const isSelected = s === selectedSeason;
                return (
                  <button
                    key={s}
                    onClick={() => setSelectedSeason(s)}
                    className={`px-3 sm:px-4 py-2 text-xs font-mono rounded-lg transition-all ${
                      isSelected
                        ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold shadow-md'
                        : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-[#64765A]/30'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 3D Canvas (7 cols) */}
            <div className="lg:col-span-7">
              <Climber3DCanvas
                selectedSpeciesId={selectedSpeciesId}
                season={selectedSeason}
                onSelectPlant={onSelectPlant}
              />
            </div>

            {/* Species Selector & Phenology Dossier (5 cols) */}
            <div className="lg:col-span-5 bg-[#1F2922] p-6 sm:p-8 rounded-2xl border border-[#A7B39A]/40 space-y-5">
              {/* Species Tabs */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7B39A] block mb-2">
                  Оберіть вид ліани для візуалізації:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CLIMBER_SPECIES.map(sp => {
                    const isSelected = sp.id === selectedSpeciesId;
                    return (
                      <button
                        key={sp.id}
                        onClick={() => setSelectedSpeciesId(sp.id)}
                        className={`p-2.5 rounded-xl text-left border text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-[#AD765B] text-[#F4F0E6] border-[#AD765B] font-semibold'
                            : 'bg-[#182C24] text-[#D6D0C3] border-[#A7B39A]/20 hover:bg-[#64765A]/20'
                        }`}
                      >
                        <span className="block truncate font-medium">{sp.commonName}</span>
                        <span className="block text-[10px] text-[#A7B39A] italic truncate">{sp.botanicalName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Species Seasonal Card */}
              <div className="pt-3 border-t border-[#A7B39A]/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-serif font-bold text-[#F4F0E6]">
                    {activeClimber.commonName}
                  </h3>
                  <span className="text-xs font-mono text-[#AD765B] bg-[#182C24] px-2.5 py-1 rounded-md border border-[#A7B39A]/20">
                    {selectedSeason}
                  </span>
                </div>

                <div className="p-3.5 bg-[#182C24] rounded-xl border border-[#A7B39A]/20 text-xs text-[#D6D0C3] leading-relaxed">
                  <strong className="text-[#F4F0E6] block mb-1">Стан рослини в цю пору:</strong>
                  {activeClimber.seasonalNotes[selectedSeason]}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-3 bg-[#182C24] rounded-xl border border-[#A7B39A]/20">
                    <span className="text-[10px] text-[#A7B39A] block uppercase">Механіка:</span>
                    <span className="text-[#F4F0E6] truncate block">{activeClimber.mechanism.split('(')[0]}</span>
                  </div>
                  <div className="p-3 bg-[#182C24] rounded-xl border border-[#A7B39A]/20">
                    <span className="text-[10px] text-[#A7B39A] block uppercase">Висота:</span>
                    <span className="text-[#F4F0E6]">{activeClimber.matureHeight}</span>
                  </div>
                </div>

                {activeClimber.warningNote && (
                  <div className="p-3 bg-red-950/40 rounded-xl border border-red-500/40 flex items-start gap-2.5 text-xs text-red-200">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{activeClimber.warningNote}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 4 ATTACHMENT MECHANICS & TRELLIS ENGINEERING */}
        <div className="space-y-6 pt-6 border-t border-[#A7B39A]/30">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Інженерна ботаніка
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
              Чотири механіки фіксації ліан у просторі
            </h2>
            <p className="mt-2 text-sm text-[#D6D0C3] max-w-2xl leading-relaxed">
              Неправильно підібрана опора призводить або до руйнування фасаду, або до загибелі ліани, яка не може закріпитися на занадто товстих рейках.
            </p>
          </div>

          <div className="divide-y divide-[#A7B39A]/20 border-t border-b border-[#A7B39A]/20">
            {mechanisms.map((m, idx) => (
              <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-3 space-y-1">
                  <div className="text-xs font-mono text-[#AD765B] font-bold">
                    МЕХАНІКА // 0{idx + 1}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#F4F0E6]">
                    {m.type}
                  </h3>
                </div>

                <div className="md:col-span-4 text-xs font-mono text-[#A7B39A]">
                  <span className="block text-[10px] uppercase text-[#AD765B] font-bold tracking-wider mb-1">
                    Вимоги до опори:
                  </span>
                  {m.cableReq}
                </div>

                <div className="md:col-span-5 text-sm text-[#D6D0C3] font-sans font-light leading-relaxed">
                  <span className="block text-[10px] font-mono uppercase text-[#A7B39A] font-bold tracking-wider mb-1">
                    Біомеханіка фіксації:
                  </span>
                  {m.physics}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
