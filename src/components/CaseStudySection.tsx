import React, { useState } from 'react';
import { CASE_STUDY_DATA, CaseStudyHotspot } from '../data/caseStudyData';
import { Compass, Sparkles } from 'lucide-react';

export const CaseStudySection: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<CaseStudyHotspot>(CASE_STUDY_DATA.hotspots[0]);

  const postOccupancyResults = [
    {
      metric: '0% Ерозії схилу',
      desc: 'Незважаючи на зливові дощі, жодного змиву ґрунту не зафіксовано завдяки системі з двох підпірних стін та серпантинних дренажних доріжок.'
    },
    {
      metric: '100% Змикання матриці',
      desc: 'На другий рік злаки та чебрець утворили суцільний килим, повністю придушивши однорічні бур\'яни та зберігши вологу.'
    },
    {
      metric: '-70% Ручної праці',
      desc: 'Догляд звівся до однієї весняної стрижки торішніх суцвіть у березні та санітарного проріджування ліан у липні.'
    },
    {
      metric: '365 Днів архітектури',
      desc: 'Взимку сад не виглядає порожнім: засніжені парапети стін, подушки сосни та іній на волотях ковили створюють скульптурну графіку.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#182C24] text-[#F4F0E6]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO HEADER */}
        <div className="border-b border-[#A7B39A]/30 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-3">
            <span className="px-2 py-0.5 bg-[#64765A] rounded text-[#F4F0E6] font-semibold">Глава 11</span>
            <span>//</span>
            <span>Прикладний реалізований кейс</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
            Практичний кейс: <br />
            <span className="italic font-normal text-[#A7B39A]">Вілла Терена // Сад на крутому схилі 22°.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#D6D0C3] max-w-3xl leading-relaxed font-light">
            Детальний інженерно-ботанічний розбір реалізованого проекту ділянки 450 м² у субальпійській зоні. Поєднання терасування схилу, прихованого дренажу, 4-ярусного озеленення та збереження природного генія місця (Genius Loci).
          </p>

          {/* Key Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-white/5 rounded-2xl border border-[#A7B39A]/20">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Площа об'єкта</div>
              <div className="text-xl font-serif font-bold text-[#F4F0E6] mt-0.5">450 м²</div>
              <div className="text-[11px] text-[#A7B39A] mt-1">{CASE_STUDY_DATA.location}</div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-[#A7B39A]/20">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Природний ухил</div>
              <div className="text-xl font-serif font-bold text-[#F4F0E6] mt-0.5">22° (перепад 4.2 м)</div>
              <div className="text-[11px] text-[#A7B39A] mt-1">Південно-західна сонячна експозиція</div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-[#A7B39A]/20">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Етапи втілення</div>
              <div className="text-xl font-serif font-bold text-[#F4F0E6] mt-0.5">8 Інженерних фаз</div>
              <div className="text-[11px] text-[#A7B39A] mt-1">Від топозйомки до посадки</div>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-[#A7B39A]/20">
              <div className="text-[10px] font-mono uppercase text-[#AD765B] tracking-wider">Бюджетний баланс</div>
              <div className="text-xl font-serif font-bold text-[#F4F0E6] mt-0.5">60% стіни / 40% флора</div>
              <div className="text-[11px] text-[#A7B39A] mt-1">Пріоритет надійності терасування</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE SITE PLAN BLUEPRINT */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивний генеральний план (М 1:100)
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
                Ключові архітектурні вузли ділянки
              </h2>
            </div>
            <p className="text-xs font-mono text-[#A7B39A]">
              Натисніть на будь-який числовий маркер генплану для відкриття креслярського досьє
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* SVG Site Plan Canvas (7 cols) */}
            <div className="lg:col-span-7 bg-[#1F2922] p-6 rounded-3xl border border-[#A7B39A]/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#A7B39A] border-b border-[#A7B39A]/20 pb-3">
                <span className="flex items-center gap-1.5 text-[#F4F0E6]">
                  <Compass className="w-4 h-4 text-[#AD765B]" />
                  Генплан геопластики та функціональних зон
                </span>
                <span className="text-[#AD765B]">Об'єкт: #VT-2026-СХИЛ</span>
              </div>

              <div className="relative w-full h-[400px] bg-[#182C24] rounded-2xl overflow-hidden border border-[#A7B39A]/30 p-4">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Elevation Contours */}
                  <path d="M 0 30 Q 50 25 100 35" fill="none" stroke="#64765A" strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.6" />
                  <path d="M 0 50 Q 50 45 100 55" fill="none" stroke="#64765A" strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.6" />
                  <path d="M 0 70 Q 50 65 100 75" fill="none" stroke="#64765A" strokeWidth="0.8" strokeDasharray="2, 2" opacity="0.6" />

                  {/* Retaining Wall Terraces */}
                  <path d="M 10 40 Q 50 36 90 44" fill="none" stroke="#B8B0A2" strokeWidth="3.5" />
                  <path d="M 15 62 Q 55 58 85 66" fill="none" stroke="#B8B0A2" strokeWidth="3" />

                  {/* Curving Pathway */}
                  <path d="M 20 95 C 45 80, 35 60, 60 48 C 75 40, 65 25, 80 10" fill="none" stroke="#D6D0C3" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

                  {/* Villa Footprint Outline */}
                  <rect x="55" y="8" width="38" height="20" fill="#2A382E" stroke="#A7B39A" strokeWidth="1" />
                  <text x="62" y="20" fill="#A7B39A" fontSize="4" fontFamily="monospace">ЖИТЛОВИЙ БУДИНОК</text>

                  {/* Clickable Hotspot Pins */}
                  {CASE_STUDY_DATA.hotspots.map(h => {
                    const isSelected = h.id === selectedHotspot.id;
                    return (
                      <g
                        key={h.id}
                        onClick={() => setSelectedHotspot(h)}
                        className="cursor-pointer transition-transform group"
                      >
                        {/* Enlarged invisible touch target for mobile fingertips */}
                        <circle cx={h.x} cy={h.y} r="9" fill="transparent" />
                        <circle
                          cx={h.x}
                          cy={h.y}
                          r={isSelected ? 5.5 : 4.2}
                          fill={isSelected ? '#AD765B' : '#182C24'}
                          stroke={isSelected ? '#F4F0E6' : '#A7B39A'}
                          strokeWidth={isSelected ? 1.5 : 1}
                          className="transition-all"
                        />
                        <text
                          x={h.x}
                          y={h.y + 1.2}
                          fontSize="3.4"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                          fill={isSelected ? '#F4F0E6' : '#A7B39A'}
                        >
                          {h.id}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {CASE_STUDY_DATA.hotspots.map(h => {
                  const isSelected = h.id === selectedHotspot.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHotspot(h)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        isSelected
                          ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold'
                          : 'bg-[#182C24] text-[#D6D0C3] border border-[#A7B39A]/20 hover:bg-[#64765A]/20'
                      }`}
                    >
                      <span className="opacity-70 mr-1">#{h.id}</span>
                      {h.title}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Blueprint Node Dossier (5 cols) */}
            <div className="lg:col-span-5 bg-[#1F2922] p-6 sm:p-8 rounded-3xl border border-[#A7B39A]/30 space-y-5 shadow-xl">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#AD765B] mb-1">
                  <span>Категорія: {selectedHotspot.category}</span>
                  <span className="text-[#A7B39A]">Вузол #{selectedHotspot.id}</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#F4F0E6]">
                  {selectedHotspot.title}
                </h3>
                <p className="text-xs text-[#D6D0C3] mt-2 bg-[#182C24] p-3.5 rounded-xl border border-[#A7B39A]/20 leading-relaxed">
                  {selectedHotspot.description}
                </p>
              </div>

              <div className="bg-[#182C24] p-4 rounded-xl border border-[#AD765B]/40 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD765B] flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> Архітектурне обґрунтування рішення
                </span>
                <p className="text-xs text-[#F4F0E6] leading-relaxed">
                  {selectedHotspot.rationale}
                </p>
              </div>

              <div className="text-[11px] font-mono text-[#A7B39A] pt-2 border-t border-[#A7B39A]/20 flex items-center justify-between">
                <span>Архів креслень: Вілла Терена</span>
                <span className="text-emerald-400 font-bold">Реалізовано на 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 8 SEQUENTIAL EXECUTION STAGES */}
        <div className="bg-[#1F2922] p-8 sm:p-10 rounded-3xl border border-[#A7B39A]/40 shadow-xl space-y-8">
          <div className="border-b border-[#A7B39A]/30 pb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#AD765B] font-semibold block">
                Будівельно-агротехнічний регламент
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
                8 послідовних фаз створення саду на схилі
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CASE_STUDY_DATA.stages.map((st, i) => (
              <div
                key={st.number}
                className="p-5 rounded-2xl bg-[#182C24] border border-[#A7B39A]/30 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#AD765B] mb-1 font-bold">
                    <span>Етап {st.number}</span>
                    <span className="text-[#A7B39A]">Фаза 0{i + 1}</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-[#F4F0E6]">
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#D6D0C3] mt-2 leading-relaxed">
                    {st.summary}
                  </p>
                </div>
                <div className="text-[11px] text-[#A7B39A] pt-2.5 border-t border-white/5 leading-snug">
                  {st.details}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: 3-YEAR POST-OCCUPANCY EVALUATION */}
        <div className="space-y-6 pt-6 border-t border-[#A7B39A]/30">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Моніторинг стійкості
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
              Результати обстеження ділянки через 3 роки експлуатації
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {postOccupancyResults.map((res, idx) => (
              <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-[#A7B39A]/20 space-y-2">
                <div className="text-lg font-serif font-bold text-emerald-400">
                  {res.metric}
                </div>
                <p className="text-xs text-[#D6D0C3] leading-relaxed pt-2 border-t border-white/10">
                  {res.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
