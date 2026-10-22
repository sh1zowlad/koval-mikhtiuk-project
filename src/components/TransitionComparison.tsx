import React, { useState } from 'react';
import { ArrowLeftRight, Check, X, Layers, Sliders } from 'lucide-react';

export const TransitionComparison: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [activeAnnotation, setActiveAnnotation] = useState<number>(0);

  const annotations = [
    {
      title: 'Ярусність і плавна градація висот',
      before: 'Скелястий урвищний перепад: 10 см газону впритул стикаються з 2-метровою суцільною стіною туй без жодного проміжного ярусу.',
      after: 'Чотириярусна висхідна градація: Чебрець (5 см) → Манжетка (35 см) → Вертикалі шавлії (60 см) → Ажурна береза (5 м).',
      why: 'Знімає оптичне розсікання ділянки та дозволяє косому сонячному промінню рівномірно освітлювати нижній ярус без затінення.'
    },
    {
      title: 'Пом\'якшення крайок і живі шви',
      before: 'Гострий прямий кут 90° бетонної стінки, залишений повністю голим над чорною землею.',
      after: 'Дзвоники Пожарського та повзучий флокс спадають каскадом з кам\'яної полиці, стираючи межу між рукотворним і природним.',
      why: 'У природних біотопах скельні виступи миттєво обживаються настінними рослинами; живий каскад органічно інтегрує мур у рельєф.'
    },
    {
      title: 'Геометрія стежки та природний потік',
      before: 'Прямолінійний бетонний тротуар, що розсікає простір на дві ізольовані половини і спонукає до швидкого транзиту.',
      after: 'Плавна серпантинна доріжка з митого вапнякового гравію, що сповільнює рух і поступово розкриває видові точки.',
      why: 'Криволінійні стежки повторюють ізогіпси схилу, що унеможливлює повздовжній змив ґрунту під час літніх дощів.'
    },
    {
      title: 'Групування: Хаос проти матричних хвиль',
      before: '«Синдром поштової марки»: 20 поодиноких різних рослин, хаотично розтиканих по корі чи чорнозему.',
      after: 'Взаємопроникні хвилі: Сеслерія осіння утворює суцільний живий смарагдовий килим, прошитий повторами груп шавлії.',
      why: 'Природні рослинні угруповання ростуть переплетеними популяціями; матриця виключає відкритий ґрунт і блокує ріст бур\'янів на 90%.'
    }
  ];

  const stratificationTiers = [
    {
      tier: 'Ярус 1: 0 – 15 см',
      title: 'Ґрунтопокривний мікро-шар',
      plants: 'Thymus serpyllum (Чебрець), Sedum acre (Очиток), Sagina subulata (Моховинка)',
      role: 'Запечатує ґрунт від пересихання, замінює відкриту мульчу, пом\'якшує стики з плитняком доріжки.'
    },
    {
      tier: 'Ярус 2: 20 – 45 см',
      title: 'Подушкові формотворчі багаторічники',
      plants: 'Alchemilla mollis (Манжетка м\'яка), Geranium macrorrhizum (Герань), Sesleria autumnalis',
      role: 'Створює об\'ємну масу, вловлює краплі роси, переводить погляд від горизонталі землі до вертикалі.'
    },
    {
      tier: 'Ярус 3: 50 – 110 см',
      title: 'Вертикальні ритмічні спалахи',
      plants: 'Salvia nemorosa (Шавлія дібровна), Stipa tenuissima (Ковила), Echinacea purpurea',
      role: 'Додає сезонну динаміку, вертикальні графічні свічки суцвіть, шелест вітру та рух у просторі.'
    },
    {
      tier: 'Ярус 4: 2.5 – 6+ м',
      title: 'Ажурний полог та вертикальний якір',
      plants: 'Betula utilis jacquemontii (Береза Жакмона), Pinus mugo (Сосна гірська)',
      role: 'Дає розсіяну тінь для нижніх ярусів, фільтрує вітер, забезпечує архітектурну присутність взимку.'
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#182C24] text-[#F4F0E6]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO HEADER */}
        <div className="border-b border-[#A7B39A]/30 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-3">
            <span className="px-2 py-0.5 bg-[#64765A] rounded text-[#F4F0E6] font-semibold">Глава 03</span>
            <span>//</span>
            <span>Просторова безперервність</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
            Плавні переходи: <br />
            <span className="italic font-normal text-[#A7B39A]">Екотони та мистецтво безшовного злиття.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#D6D0C3] max-w-3xl leading-relaxed font-light">
            У природі не буває прямокутних меж. Ліс не врізається в луку стіною — між ними завжди існує узлісся. Ландшафтний архітектор створює саме такі м'які перехідні зони, розмиваючи кордони між рукотворним і природним.
          </p>


        </div>

        {/* SECTION 1: INTERACTIVE BEFORE/AFTER SLIDER */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивне порівняння просторових підходів
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
                Грубі штучні кордони проти природного екотону
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A7B39A]">
              <Sliders className="w-4 h-4 text-[#AD765B]" />
              <span>Тягніть повзунок по центру ліворуч/праворуч</span>
            </div>
          </div>

          <div className="relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden border border-[#A7B39A]/40 shadow-2xl bg-[#262925] select-none">
            {/* AFTER: NATURALISTIC CONTINUITY (Underneath) */}
            <div className="absolute inset-0 bg-[#25392D] flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center justify-end">
                <span className="px-3.5 py-1 bg-[#22422C] text-[#F4F0E6] text-xs font-mono uppercase tracking-wider rounded-full border border-[#A7B39A]/50 flex items-center gap-1.5 shadow-sm">
                  <Check className="w-3.5 h-3.5 text-[#A7B39A]" /> Природна екотонна градація (Після)
                </span>
              </div>

              {/* Vector Architecture Graphic for AFTER */}
              <div className="my-auto max-w-3xl mx-auto w-full">
                <svg viewBox="0 0 800 320" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                  <path d="M 0 160 Q 200 120 400 150 T 800 130 L 800 320 L 0 320 Z" fill="#2E4837" />
                  <path d="M 0 210 Q 300 180 600 220 L 800 200 L 800 320 L 0 320 Z" fill="#3D5A47" />

                  {/* Sinuous curved gravel path */}
                  <path d="M 50 320 C 250 290, 200 220, 450 200 C 650 180, 600 140, 750 110" fill="none" stroke="#D6D0C3" strokeWidth="26" strokeLinecap="round" opacity="0.85" />
                  <path d="M 50 320 C 250 290, 200 220, 450 200 C 650 180, 600 140, 750 110" fill="none" stroke="#FAF8F3" strokeWidth="3" strokeDasharray="8, 12" opacity="0.6" />

                  {/* Softened Stone Terrace with cascading plants */}
                  <rect x="240" y="165" width="220" height="42" rx="4" fill="#8C8478" />
                  <path d="M 230 180 Q 260 215 290 185 T 350 215 T 410 180 T 470 215" fill="#7C89B8" opacity="0.85" />
                  <path d="M 250 185 Q 290 220 330 190 T 400 220 T 460 190" fill="#B97799" opacity="0.8" />

                  {/* Layered Grasses & Perennials */}
                  <ellipse cx="160" cy="275" rx="90" ry="25" fill="#8F6593" opacity="0.75" />
                  <ellipse cx="320" cy="240" rx="110" ry="30" fill="#9EA853" opacity="0.8" />
                  <line x1="280" y1="230" x2="280" y2="185" stroke="#4C3B71" strokeWidth="5" strokeLinecap="round" />
                  <line x1="295" y1="235" x2="295" y2="190" stroke="#4C3B71" strokeWidth="5" strokeLinecap="round" />
                  <line x1="340" y1="225" x2="340" y2="175" stroke="#4C3B71" strokeWidth="5" strokeLinecap="round" />
                  <line x1="360" y1="230" x2="360" y2="180" stroke="#4C3B71" strokeWidth="5" strokeLinecap="round" />

                  {/* Specimen Birch with open airy canopy */}
                  <circle cx="680" cy="110" r="46" fill="#EAE6DC" opacity="0.85" />
                  <circle cx="680" cy="110" r="38" fill="#F4F0E6" opacity="0.6" />
                  <line x1="680" y1="110" x2="680" y2="210" stroke="#F4F0E6" strokeWidth="4" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#A7B39A]">
                <span>Багатоярусна гармонійна градація</span>
                <span>Матрична посадка // Живі пом'якшені краї</span>
              </div>
            </div>

            {/* BEFORE: HARSH BOUNDARY (Clipped on top based on sliderPos) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden bg-[#38332E] border-r-2 border-[#AD765B] shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="flex items-center justify-start">
                <span className="px-3.5 py-1 bg-[#9E4733] text-[#F4F0E6] text-xs font-mono uppercase tracking-wider rounded-full flex items-center gap-1.5 shadow-sm">
                  <X className="w-3.5 h-3.5" /> Традиційний монотонний благоустрій (До)
                </span>
              </div>

              {/* Vector Graphic for BEFORE (Monotonous line, harsh walls) */}
              <div className="my-auto max-w-3xl mx-auto w-full">
                <svg viewBox="0 0 800 320" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                  <rect x="0" y="210" width="800" height="110" fill="#3D503A" />
                  <rect x="50" y="235" width="700" height="24" fill="#696561" />
                  <rect x="240" y="150" width="220" height="60" fill="#5E5852" stroke="#2B2825" strokeWidth="2" />
                  
                  {/* Harsh Thuja wall hedge */}
                  <polygon points="560,210 575,80 590,210" fill="#1C3823" />
                  <polygon points="590,210 605,80 620,210" fill="#1C3823" />
                  <polygon points="620,210 635,80 650,210" fill="#1C3823" />
                  <polygon points="650,210 665,80 680,210" fill="#1C3823" />
                  <polygon points="680,210 695,80 710,210" fill="#1C3823" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#D6D0C3]">
                <span>Прямі кути 90° та монотонний «паркан»</span>
                <span>Різке зіткнення зон без проміжного ярусу</span>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
              aria-label="Порівняти стан До та Після"
            />
            <div
              className="absolute top-0 bottom-0 pointer-events-none z-20 flex flex-col items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#AD765B] text-[#F4F0E6] flex items-center justify-center shadow-2xl border-2 border-[#F4F0E6]">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 4 Comparative Critical Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {annotations.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveAnnotation(idx)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  activeAnnotation === idx
                    ? 'bg-white/10 border-[#AD765B] ring-1 ring-[#AD765B]'
                    : 'bg-white/5 border-[#A7B39A]/20 hover:bg-white/10'
                }`}
              >
                <div className="text-xs font-mono text-[#AD765B] mb-1 font-bold">
                  Вузол 0{idx + 1}
                </div>
                <h4 className="text-base font-serif font-bold text-[#F4F0E6] mb-2">
                  {item.title}
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="text-red-300/90 pl-3 border-l border-red-500/50">
                    <strong>До:</strong> {item.before}
                  </div>
                  <div className="text-emerald-300 pl-3 border-l border-emerald-500/50">
                    <strong>Після:</strong> {item.after}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: 4-TIER VEGETATION STRATIFICATION */}
        <div className="space-y-6 pt-6 border-t border-[#A7B39A]/20">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Академічна стратифікація
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
              Чотиривимірна шкала наростання висот
            </h2>
            <p className="mt-2 text-sm text-[#D6D0C3] max-w-2xl leading-relaxed">
              Градієнт висот гарантує, що кожна рослина отримує необхідну інсоляцію, а простір сприймається як єдиний безперервний живий рельєф.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stratificationTiers.map((tier, idx) => (
              <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-[#A7B39A]/20 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#AD765B]">
                  <span>{tier.tier}</span>
                  <Layers className="w-4 h-4 text-[#A7B39A]" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#F4F0E6]">
                    {tier.title}
                  </h3>
                  <div className="text-xs font-mono text-[#A7B39A] mt-2 italic">
                    {tier.plants}
                  </div>
                </div>
                <p className="text-xs text-[#D6D0C3] leading-relaxed pt-3 border-t border-white/10">
                  {tier.role}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
