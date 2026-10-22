import React, { useState } from 'react';
import { CALENDAR_DATA, SeasonInfo } from '../data/calendarData';
import { Season } from '../types/landscape';
import { Sun, Snowflake, CloudRain, Wind, AlertCircle, CheckCircle2, Info, Calendar, ShieldCheck, Heart, Sparkles, Feather } from 'lucide-react';

export const MaintenanceCalendar: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<Season>('Весна');

  const activeSeasonData: SeasonInfo = CALENDAR_DATA.find(s => s.season === selectedSeason) || CALENDAR_DATA[0];

  const seasonIcons: Record<string, React.ReactNode> = {
    'Весна': <CloudRain className="w-4 h-4 text-[#64765A]" />,
    'Літо': <Sun className="w-4 h-4 text-[#AD765B]" />,
    'Осінь': <Wind className="w-4 h-4 text-[#AD765B]" />,
    'Зима': <Snowflake className="w-4 h-4 text-[#7B949A]" />,
    'Spring': <CloudRain className="w-4 h-4 text-[#64765A]" />,
    'Summer': <Sun className="w-4 h-4 text-[#AD765B]" />,
    'Autumn': <Wind className="w-4 h-4 text-[#AD765B]" />,
    'Winter': <Snowflake className="w-4 h-4 text-[#7B949A]" />
  };

  return (
    <section id="calendar" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F0E6] text-[#262925] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO WITH ARCHITECTURAL INDICATORS */}
        <div className="border-b border-[#A7B39A]/60 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64765A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Розділ 12</span>
            <span>//</span>
            <span>Фенологічний цикл та агротехнічний супровід</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#182C24] leading-tight">
                Календар посадки та агротехніки
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#64765A] font-sans leading-relaxed max-w-3xl">
                Природний ландшафт — це саморегулівна екосистема, а не статичний монумент. Грамотна агротехніка природного саду базується на мінімальному втручанні, повазі до життєвих циклів рослин та узгодженості з сезонними коливаннями вологості й температур.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="bg-[#FAF8F3] p-4 rounded-2xl border border-[#D6D0C3] flex items-center gap-3">
                <Calendar className="w-8 h-8 text-[#AD765B] shrink-0" />
                <div>
                  <div className="text-xs font-mono text-[#64765A]">Модель агросупроводу</div>
                  <div className="text-xl font-mono font-bold text-[#182C24]">Low-Maintenance Ecosystem</div>
                </div>
              </div>
            </div>
          </div>


        </div>

        {/* STEWARDSHIP PHILOSOPHY DOSSIER */}
        <div className="bg-[#FAF8F3] rounded-3xl border border-[#D6D0C3] p-8 sm:p-10 space-y-8">
          <div className="border-b border-[#D6D0C3] pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#AD765B]">
              Екологічний менеджмент
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-1">
              Філософія низьковитратного кураторства (Low-Impact Stewardship)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#EAE4D5] border border-[#A7B39A]/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#182C24] text-[#F4F0E6] flex items-center justify-center">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#182C24]">1. Зимовий спокій стебел</h3>
              <p className="text-xs text-[#262925] leading-relaxed">
                Сухі стебла багаторічників та злаків не зрізають восени. Вони захищають сплячі бруньки від морозу, затримують сніг і створюють чарівну скульптурну графіку під інеєм.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#EAE4D5] border border-[#A7B39A]/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#64765A] text-[#F4F0E6] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#182C24]">2. Весняна єдина обрізка</h3>
              <p className="text-xs text-[#262925] leading-relaxed">
                Увесь масив трав та сухостою зрізається за один захід наприкінці лютого чи початку березня (до пробудження первоцвітів), а подрібнені рештки повертаються як мульча.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#EAE4D5] border border-[#A7B39A]/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#AD765B] text-[#F4F0E6] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#182C24]">3. Замкнений біоцикл</h3>
              <p className="text-xs text-[#262925] leading-relaxed">
                Природний опад листя та відмерлі пагони формують родючий гумусний шар за участю дощових черв'яків і ґрунтових бактерій, виключаючи потребу в покупних стимуляторах.
              </p>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SEASON VIEWER */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#64765A]">
                Інтерактивний сезонний планувальник
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24]">
                Агротехнічний регламент за порами року
              </h3>
            </div>

            {/* Season Switcher Buttons */}
            <div className="flex items-center gap-1.5 bg-[#FAF8F3] p-1.5 rounded-2xl border border-[#D6D0C3] shrink-0">
              {CALENDAR_DATA.map(s => {
                const isActive = s.season === selectedSeason;
                return (
                  <button
                    key={s.season}
                    onClick={() => setSelectedSeason(s.season)}
                    className={`px-4 py-2.5 text-xs font-mono rounded-xl transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#182C24] text-[#F4F0E6] font-semibold shadow-md'
                        : 'text-[#262925] hover:bg-[#EAE4D5]'
                    }`}
                  >
                    {seasonIcons[s.season]}
                    <span>{s.season}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Season Banner */}
          <div className="bg-[#FAF8F3] p-6 sm:p-8 rounded-3xl border border-[#D6D0C3] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D6D0C3] pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#AD765B]">
                  Фенологічний статус фази
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] mt-1">
                  {activeSeasonData.season}: {activeSeasonData.tagline}
                </h4>
              </div>
              <span className="text-xs font-mono text-[#182C24] bg-[#EAE4D5] px-4 py-2 rounded-xl border border-[#A7B39A]/40 font-semibold self-start sm:self-auto">
                Температурний коридор: {activeSeasonData.temperatures}
              </span>
            </div>

            <p className="text-sm text-[#262925] leading-relaxed max-w-4xl">
              {activeSeasonData.overview}
            </p>

            <div className="bg-[#FAF0ED] p-4 rounded-2xl border border-[#AD765B]/30 text-xs text-[#262925] flex items-center gap-3 font-medium">
              <AlertCircle className="w-5 h-5 text-[#AD765B] shrink-0" />
              <span><strong>Головний імператив садівника:</strong> {activeSeasonData.proTip}</span>
            </div>
          </div>

          {/* Season Tasks Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeSeasonData.tasks.map(task => (
              <div
                key={task.id}
                className="p-6 rounded-3xl bg-[#FAF8F3] hover:bg-white border border-[#D6D0C3] hover:border-[#64765A] shadow-xs hover:shadow-xl flex flex-col justify-between space-y-5 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#64765A] mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#EAE4D5] text-[#182C24] font-semibold">
                      {task.category}
                    </span>
                    <span className="font-mono text-[#AD765B]">{task.timing}</span>
                  </div>

                  <h5 className="text-base font-serif font-bold text-[#182C24] leading-snug">
                    {task.task}
                  </h5>

                  <p className="text-xs text-[#64765A] mt-2.5 leading-relaxed font-sans">
                    {task.rationale}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D6D0C3] flex items-center gap-2 text-xs font-mono text-[#AD765B]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Стандарт ландшафтного догляду</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 GOLDEN RULES OF NATURALISTIC CARE */}
        <div className="bg-[#FAF8F3] p-8 sm:p-10 rounded-3xl border border-[#D6D0C3] space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#AD765B]" />
            <h3 className="text-2xl font-serif font-bold text-[#182C24]">
              4 Золоті правила догляду за природним садом
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-[#D6D0C3]">
              <div className="text-xs font-mono font-bold text-[#AD765B] mb-1">01. Мінеральна мульча</div>
              <p className="text-xs text-[#64765A] leading-relaxed">
                Використання гравійного відсіву 5–10 мм або соснової кори шаром 5–7 см зберігає вологу й зупиняє 95% проростання бур'янів без хімікатів.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#D6D0C3]">
              <div className="text-xs font-mono font-bold text-[#AD765B] mb-1">02. Глибокий рідкісний полив</div>
              <p className="text-xs text-[#64765A] leading-relaxed">
                Щоденне поверхневе зволоження формує слабке коріння на поверхні. Краще поливати раз на 10 днів, але рясно, щоб коріння йшло на глибину 1–2 метри.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#D6D0C3]">
              <div className="text-xs font-mono font-bold text-[#AD765B] mb-1">03. Динамічний самосів</div>
              <p className="text-xs text-[#64765A] leading-relaxed">
                Дозволяйте окремим видам (наприклад, коров'яку чи шавлії) розсіюватися. Це додає саду живої випадковості та адаптивності, що властиві дикій природі.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#D6D0C3]">
              <div className="text-xs font-mono font-bold text-[#AD765B] mb-1">04. Нуль надлишкового азоту</div>
              <p className="text-xs text-[#64765A] leading-relaxed">
                Надлишок мінерального азоту розм'якшує тканини рослин, робить їх привабливими для попелиці та спричиняє вилягання злаків від вітру.
              </p>
            </div>
          </div>
        </div>

        {/* CLIMATIC QUALIFICATION ADVISORY */}
        <div className="p-6 bg-[#EAE4D5] rounded-2xl border border-[#A7B39A]/60 flex items-start gap-4 text-xs text-[#262925] leading-relaxed">
          <Info className="w-5 h-5 text-[#AD765B] shrink-0 mt-0.5" />
          <span>
            <strong>Регіональне кліматичне застереження:</strong> Точні календарні дати робіт завжди коригуються відповідно до фактичних погодних умов року та мікроклімату вашої ділянки. У північних та західних областях України, а також у передгір'ях Карпат, вегетаційне пробудження настає на 2–3 тижні пізніше, ніж на півдні чи в причорноморському регіоні.
          </span>
        </div>

      </div>
    </section>
  );
};
