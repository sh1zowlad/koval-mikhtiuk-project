import React, { useState } from 'react';
import { RetainingWall3DCanvas } from './RetainingWall3DCanvas';
import { RETAINING_WALLS_DATA } from '../data/retainingWallData';
import { RetainingWallId } from '../types/landscape';
import { PlantSpecies } from '../types/botanical';
import { PLANTS_DATABASE } from '../data/plantsData';
import { ShieldAlert } from 'lucide-react';

interface RetainingWallSectionProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const RetainingWallSection: React.FC<RetainingWallSectionProps> = ({ onSelectPlant }) => {
  const [selectedWallId, setSelectedWallId] = useState<RetainingWallId>('dry-stone');
  const [showDrainageCutaway, setShowDrainageCutaway] = useState<boolean>(true);

  const activeWall = RETAINING_WALLS_DATA.find(w => w.id === selectedWallId) || RETAINING_WALLS_DATA[0];

  const structuralTypes = [
    {
      name: 'Суха кам\'яна кладка (Dry-Stone)',
      heightLimit: 'До 1.2 – 1.4 м без розчину',
      slope: 'Ухил 5° – 8° у товщу схилу',
      drainage: 'Природний через незаповнені шви між камінням + щебенева призма',
      cost: 'Середня (вимагає майстерності каменяра)',
      durability: '100+ років (гнучка до просідання ґрунту)'
    },
    {
      name: 'Стінка з природного каменю на розчині',
      heightLimit: 'До 1.8 – 2.5 м (з армуванням)',
      slope: 'Вертикальна або ухил 2° – 4°',
      drainage: 'Обов\'язкові водовідвідні трубки (барбакани) кожні 1.5 м',
      cost: 'Висока (залізобетонний фундамент + цемент)',
      durability: '50–70 років (чутлива до морозного здимання)'
    },
    {
      name: 'Монолітний архітектурний бетон',
      heightLimit: 'До 3.5+ м (розрахунок конструктора)',
      slope: 'Суворо вертикальна зі зрізом',
      drainage: 'Суцільне геотекстильне полотно + застінний щебінь + дренажна труба',
      cost: 'Преміум (опалубка, арматура, гідрофобізація)',
      durability: '80+ років при якісній гідроізоляції'
    },
    {
      name: 'Терасована кишенькова стінка',
      heightLimit: 'Каскади по 0.6 – 0.9 м кожен',
      slope: 'Ступінчастий терасований профіль',
      drainage: 'Вільний стік через посадковий шар кожної тераси',
      cost: 'Оптимальна (розподіляє тиск схилу)',
      durability: '90+ років (найвища ботанічна цінність)'
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F0E6] text-[#262925]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO HEADER */}
        <div className="border-b border-[#A7B39A]/60 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64765A] mb-3">
            <span className="px-2 py-0.5 bg-[#EAE4D5] rounded text-[#182C24] font-semibold">Глава 06</span>
            <span>//</span>
            <span>Геотехнічна інженерія та камінь</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#182C24] leading-tight">
            Підпірні стінки: <br />
            <span className="italic font-normal text-[#64765A]">Геопластика схилів та розвантаження тиску.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#64765A] max-w-3xl leading-relaxed font-light">
            Підпірна стінка — це найвідповідальніша споруда в саду. Вона працює проти гравітації, тримаючи масу насипного схилу, і водночас стає теплим кам'яним скелетом для каскадних настінних рослин.
          </p>

          {/* Key Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Кугельпанцер (ухил)</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">5° – 8° у схил</div>
              <div className="text-[11px] text-[#64765A] mt-1">Компенсація перекидального моменту</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Глибина підошви</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">1/3 висоти стіни</div>
              <div className="text-[11px] text-[#64765A] mt-1">Обов'язкове заглиблення фундаменту</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Дренажна призма</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">30 – 40 см щебеню</div>
              <div className="text-[11px] text-[#64765A] mt-1">Фракція 20–40 мм за стінкою</div>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3]">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Водовідведення</div>
              <div className="text-xl font-serif font-bold text-[#182C24] mt-0.5">Труба Ø110 мм</div>
              <div className="text-[11px] text-[#64765A] mt-1">Перфорована труба з ухилом 1–2%</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: 3D X-RAY RETAINING WALL SIMULATOR */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D6D0C3] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивний 3D-рушій з рентген-зрізом
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
                Конструктивна анатомія та застінний дренаж
              </h2>
            </div>

            {/* Wall Concept Tabs */}
            <div className="flex flex-wrap gap-2 bg-[#FAF8F3] p-1.5 rounded-xl border border-[#D6D0C3] shrink-0">
              {RETAINING_WALLS_DATA.map(w => {
                const isSelected = w.id === selectedWallId;
                return (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWallId(w.id)}
                    className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-all ${
                      isSelected
                        ? 'bg-[#182C24] text-[#F4F0E6] font-semibold shadow-sm'
                        : 'text-[#262925] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    {w.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <RetainingWall3DCanvas
                wallType={selectedWallId}
                showDrainageCutaway={showDrainageCutaway}
                onToggleDrainage={() => setShowDrainageCutaway(!showDrainageCutaway)}
                onSelectPlant={onSelectPlant}
              />
            </div>

            {/* Dossier Card */}
            <div className="lg:col-span-5 bg-[#FAF8F3] p-6 sm:p-8 rounded-2xl border border-[#D6D0C3] space-y-5 shadow-sm">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD765B]">
                  Паспорт конструктиву
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-0.5">
                  {activeWall.name}
                </h3>
                <p className="text-xs text-[#AD765B] font-serif italic mb-2">
                  {activeWall.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#262925] leading-relaxed bg-white/70 p-3.5 rounded-xl border border-[#D6D0C3]">
                  {activeWall.description}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-white/80 p-3 rounded-xl border border-[#D6D0C3]">
                  <span className="font-mono text-[10px] text-[#64765A] uppercase tracking-wider block">Матеріал</span>
                  <p className="text-[#182C24] font-medium mt-0.5">{activeWall.material}</p>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-[#D6D0C3]">
                  <span className="font-mono text-[10px] text-[#64765A] uppercase tracking-wider block">Підземний дренаж</span>
                  <p className="text-[#182C24] font-medium mt-0.5">{activeWall.drainageSystem}</p>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-[#D6D0C3]">
                  <span className="font-mono text-[10px] text-[#64765A] uppercase tracking-wider block">Глибина закладення</span>
                  <p className="text-[#AD765B] font-semibold mt-0.5">{activeWall.heightRecommendation}</p>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#64765A] uppercase tracking-wider block mb-2">
                  Рослини для настінних швів:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeWall.suitablePlants.map((plantName, i) => {
                    const matchingPlant = PLANTS_DATABASE.find(p => plantName.toLowerCase().includes(p.botanicalName.toLowerCase().split(' ')[0]));
                    return (
                      <button
                        key={i}
                        onClick={() => matchingPlant && onSelectPlant(matchingPlant)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors flex items-center gap-1.5 ${
                          matchingPlant
                            ? 'bg-[#EAE4D5] hover:bg-[#D6D0C3] text-[#182C24] border-[#A7B39A]'
                            : 'bg-white text-[#64765A] border-[#D6D0C3]'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: matchingPlant?.colorHex || '#A7B39A' }} />
                        <span className="italic">{plantName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 4 WALL TYPOLOGIES ENGINEERING TABLE */}
        <div className="space-y-6 pt-6 border-t border-[#D6D0C3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Порівняльна інженерна таблиця
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Чотири конструктивні типи підпірних стін
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {structuralTypes.map((st, idx) => (
              <div key={idx} className="p-6 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3] shadow-sm space-y-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-[#AD765B] font-bold mb-1">
                    Тип 0{idx + 1}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#182C24]">
                    {st.name}
                  </h3>
                  <div className="text-xs font-mono text-[#64765A] mt-2">
                    Висота: <strong className="text-[#182C24]">{st.heightLimit}</strong>
                  </div>
                  <div className="text-xs font-mono text-[#64765A] mt-0.5">
                    Ухил: {st.slope}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D6D0C3]/60 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#AD765B] uppercase block">Дренажний принцип:</span>
                    <p className="text-[#262925] mt-0.5">{st.drainage}</p>
                  </div>
                  <div className="flex justify-between pt-1 font-mono text-[11px]">
                    <span className="text-[#64765A]">Довговічність:</span>
                    <span className="font-semibold text-emerald-900">{st.durability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: ENGINEERING SAFETY AUDIT */}
        <div className="bg-[#FAF0ED] p-8 sm:p-10 rounded-3xl border border-[#AD765B]/40 shadow-sm flex flex-col md:flex-row items-start gap-6">
          <ShieldAlert className="w-10 h-10 text-[#AD765B] shrink-0 mt-1" />
          <div className="space-y-3">
            <h4 className="text-2xl font-serif font-bold text-[#262925]">
              Інженерна механіка: Гідростатичний підпір та норми ДБН В.2.1-10:2018
            </h4>
            <p className="text-xs sm:text-sm text-[#262925]/90 leading-relaxed font-light">
              Головна причина руйнування та випирання підпірних стін — це не вага сухої землі, а гідростатичний тиск затриманих ґрунтових вод, які при зимовому замерзанні розпирають мурування із силою в десятки тонн на квадратний метр. Стінки вище 1.0 м або тераси під навантаженням споруд вимагають обов'язкового геологічного розрахунку сил зсуву і перекидання.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-[#AD765B]">
              <div className="p-3 bg-white/70 rounded-xl border border-[#AD765B]/30">
                • Щебінь 20–40 мм на всю висоту стіни
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-[#AD765B]/30">
                • Геотекстиль 200 г/м² проти замулення
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-[#AD765B]/30">
                • Обов'язкові випускні отвори кожні 1.5 м
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
