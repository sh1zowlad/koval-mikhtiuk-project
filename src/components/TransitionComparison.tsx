import React, { useState } from 'react';
import { Sliders, Check } from 'lucide-react';

export const TransitionComparison: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const comparisonPoints = [
    {
      label: 'Межа з мощенням',
      before: 'Жорсткий бетонний бордюр, різкий обрив газону під прямим кутом без перехідної зони.',
      after: 'Живий наплив: очитки, чебрець та сеслерія переливаються через край каменю, розмиваючи геометрію доріжки.'
    },
    {
      label: 'Контакт із парканом',
      before: 'Гола площина огорожі з прямолінійним рядом однакових туй, що візуально стискає простір ділянки.',
      after: 'Багатоярусні куліси: виткі ліани по шпалері, підбиті масивом чагарників і хмарами ковили з кишенями глибини.'
    },
    {
      label: 'Структура посадки',
      before: 'Штучні клумби правильної форми з відкритою мульчею, що потребує щотижневого прополювання.',
      after: 'Взаємопроникна матриця: сеслерія утворює суцільний живий килим, прошитий повторами груп шавлії.'
    }
  ];

  const stratificationTiers = [
    {
      step: 'ЯРУС I',
      height: '0 – 15 см',
      title: 'Ґрунтопокривний мікро-шар',
      plants: 'Thymus serpyllum, Sedum acre, Sagina subulata',
      desc: 'Запечатує ґрунт від пересихання, замінює синтетичну мульчу та м\'яко напливає на шви мощення.'
    },
    {
      step: 'ЯРУС II',
      height: '20 – 45 см',
      title: 'Подушкові формотворчі багаторічники',
      plants: 'Alchemilla mollis, Geranium macrorrhizum, Sesleria',
      desc: 'Створює об\'ємну масу, вловлює краплі роси та плавно переводить погляд від горизонталі землі до вертикалі.'
    },
    {
      step: 'ЯРУС III',
      height: '50 – 110 см',
      title: 'Вертикальні ритмічні спалахи',
      plants: 'Salvia nemorosa, Stipa tenuissima, Echinacea',
      desc: 'Додає сезонну динаміку, вертикальні графічні свічки суцвіть, шелест вітру та кінетичний рух.'
    },
    {
      step: 'ЯРУС IV',
      height: '2.5 – 6+ м',
      title: 'Ажурний полог та куліси',
      plants: 'Betula utilis jacquemontii, Pinus mugo',
      desc: 'Створює розсіяну тінь для нижніх ярусів, захищає від вітру та формує архітектурну присутність узимку.'
    }
  ];

  return (
    <div className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#182C24] text-[#F4F0E6]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* EDITORIAL HEADER — PURE ARCHITECTURAL TYPOGRAPHY */}
        <div className="border-b border-[#A7B39A]/20 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Просторова динаміка</span>
            <span>//</span>
            <span>Безшовне злиття середовищ</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#F4F0E6] leading-[1.08] max-w-4xl">
            Плавні переходи: <br />
            <span className="italic font-normal text-[#A7B39A]">Екотони та мистецтво безшовності.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#D6D0C3] max-w-3xl leading-relaxed font-light font-sans">
            У дикій природі не існує прямокутних кордонів. Ліс не врізається в луку глухою стіною — між ними завжди живе узлісся. Натуралістичний ландшафт будується саме через такі м'які буферні зони, розмиваючи межу між архітектурою та природою.
          </p>
        </div>

        {/* SECTION 1: INTERACTIVE BEFORE/AFTER SLIDER */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#A7B39A]/20 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивне порівняння
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
                Штучні кордони проти природного екотону
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A7B39A]">
              <Sliders className="w-4 h-4 text-[#AD765B]" />
              <span>Тягніть розділювач ліворуч або праворуч</span>
            </div>
          </div>

          <div className="relative w-full h-[440px] sm:h-[500px] rounded-3xl overflow-hidden border border-[#A7B39A]/30 shadow-2xl bg-[#262925] select-none">
            {/* AFTER: NATURALISTIC CONTINUITY (Underneath) */}
            <div className="absolute inset-0 bg-[#25392D] flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center justify-end">
                <span className="px-3.5 py-1 bg-[#22422C] text-[#F4F0E6] text-xs font-mono uppercase tracking-wider rounded-full border border-[#A7B39A]/50 flex items-center gap-1.5 shadow-sm">
                  <Check className="w-3.5 h-3.5 text-[#A7B39A]" /> Природний екотон (Концепція)
                </span>
              </div>

              {/* Vector Architecture Graphic for AFTER */}
              <div className="my-auto max-w-3xl mx-auto w-full">
                <svg viewBox="0 0 800 320" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                  <path d="M 0 160 Q 200 120 400 150 T 800 130 L 800 320 L 0 320 Z" fill="#2E4837" />
                  <path d="M 0 210 Q 250 170 500 200 T 800 180 L 800 320 L 0 320 Z" fill="#3D5A45" />
                  <path d="M 0 250 Q 200 230 450 245 T 800 235 L 800 320 L 0 320 Z" fill="#4E6E56" />

                  {/* Overhanging plants on pathway edge */}
                  <path d="M 50 255 Q 80 230 110 260 T 160 250 T 220 265" fill="none" stroke="#A7B39A" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
                  <path d="M 280 250 Q 320 225 360 255 T 420 248" fill="none" stroke="#C4A482" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
                  <path d="M 500 245 Q 540 220 580 250 T 650 242" fill="none" stroke="#8A9A86" strokeWidth="7" strokeLinecap="round" opacity="0.9" />

                  {/* Stone path seamless blending */}
                  <path d="M 0 280 Q 400 270 800 280 L 800 320 L 0 320 Z" fill="#D6D0C3" opacity="0.85" />

                  {/* Text Annotations */}
                  <text x="40" y="70" fill="#F4F0E6" fontSize="14" fontFamily="serif" fontWeight="bold">Безшовний екотон 4 ярусів</text>
                  <text x="40" y="95" fill="#A7B39A" fontSize="11" fontFamily="monospace">М'який наплив трав на мощення без різких бордюрів</text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#A7B39A] border-t border-white/10 pt-3">
                <span>Екотонний перехід: розмиття меж</span>
                <span>Ярусність 0 – 350 см</span>
              </div>
            </div>

            {/* BEFORE: ARTIFICIAL GEOMETRY (Clipped Over Top) */}
            <div 
              className="absolute inset-0 bg-[#3A3835] flex flex-col justify-between p-6 sm:p-8 border-r-2 border-[#F4F0E6]"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <div className="flex items-center justify-start">
                <span className="px-3.5 py-1 bg-[#4A322D] text-[#F4F0E6] text-xs font-mono uppercase tracking-wider rounded-full border border-red-500/40 shadow-sm">
                  Штучна геометрія (Помилка)
                </span>
              </div>

              {/* Vector Architecture Graphic for BEFORE */}
              <div className="my-auto max-w-3xl mx-auto w-full">
                <svg viewBox="0 0 800 320" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                  <rect x="0" y="80" width="800" height="130" fill="#2D4030" />
                  <line x1="0" y1="210" x2="800" y2="210" stroke="#8A3324" strokeWidth="8" />
                  <rect x="0" y="214" width="800" height="106" fill="#A39E93" />
                  
                  {/* Artificial grid of isolated tufts */}
                  <circle cx="120" cy="150" r="18" fill="#4B6E4A" />
                  <circle cx="280" cy="150" r="18" fill="#4B6E4A" />
                  <circle cx="440" cy="150" r="18" fill="#4B6E4A" />
                  <circle cx="600" cy="150" r="18" fill="#4B6E4A" />

                  <text x="40" y="50" fill="#F4F0E6" fontSize="14" fontFamily="serif" fontWeight="bold">Жорсткі неприродні межі</text>
                  <text x="40" y="75" fill="#E5A496" fontSize="11" fontFamily="monospace">Прямокутний бордюр та ізольовані одиночні посадки</text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#D6D0C3]/70 border-t border-white/10 pt-3">
                <span>Різкий зріз 90°</span>
                <span>Нульова взаємодія елементів</span>
              </div>
            </div>

            {/* Drag Handle Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-[#182C24] border-2 border-white flex items-center justify-center text-white shadow-xl pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
                <Sliders className="w-4 h-4 text-[#AD765B]" />
              </div>
            </div>

            {/* Interaction Click/Drag Capture Surface */}
            <div 
              className="absolute inset-0 z-10 cursor-ew-resize"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            />
          </div>

          {/* Editorial Comparative Points — Clean horizontal hairline dividers, NO boxed cards */}
          <div className="divide-y divide-[#A7B39A]/15 border-t border-b border-[#A7B39A]/15">
            {comparisonPoints.map((item, idx) => (
              <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-3 text-xs font-mono text-[#AD765B] font-bold uppercase tracking-wider">
                  0{idx + 1}. {item.label}
                </div>
                <div className="md:col-span-4 text-xs font-mono text-[#D88C78]/90 leading-relaxed">
                  <span className="block text-[10px] text-red-400 uppercase font-bold tracking-wider mb-1">Помилка:</span>
                  {item.before}
                </div>
                <div className="md:col-span-5 text-sm text-[#D6D0C3] font-sans font-light leading-relaxed">
                  <span className="block text-[10px] text-[#A7B39A] font-mono uppercase font-bold tracking-wider mb-1">Рішення проєкту:</span>
                  {item.after}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: 4-TIER STRATIFICATION — ELEGANT ARCHITECTURAL DIVIDERS */}
        <div className="space-y-8 pt-8 border-t border-[#A7B39A]/20">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Просторова стратифікація
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#F4F0E6] mt-1">
              Чотиривимірна шкала наростання висот
            </h2>
            <p className="mt-2 text-base text-[#D6D0C3] max-w-2xl leading-relaxed font-light">
              Градієнт висот гарантує, що кожна рослина отримує оптимальну інсоляцію, а простір сприймається як єдиний безперервний живий рельєф.
            </p>
          </div>

          {/* Clean Horizontal Timeline / Table — NO CARD BOXES */}
          <div className="divide-y divide-[#A7B39A]/15 border-t border-b border-[#A7B39A]/15">
            {stratificationTiers.map((tier) => (
              <div key={tier.step} className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-4 space-y-1">
                  <div className="text-xs font-mono text-[#AD765B] font-bold">
                    {tier.step} // {tier.height}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F0E6]">
                    {tier.title}
                  </h3>
                </div>

                <div className="md:col-span-4 text-xs font-mono text-[#A7B39A] italic">
                  {tier.plants}
                </div>

                <div className="md:col-span-4 text-sm text-[#D6D0C3] font-sans font-light leading-relaxed">
                  {tier.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
