import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const CurriculumOverview: React.FC = () => {
  const pillars = [
    {
      number: '01',
      path: '/composition',
      category: 'Філософія & Теорія',
      title: 'Теорія та Закони Композиції',
      description: 'Фундаментальна просторова граматика натуралістичного дизайну. Інтерактивний повзунок плавних переходів (екотонів), формула природної матриці 70/30 та колористичне коло Іттена для всесезонного саду.',
      highlights: ['10 законів композиції', 'Слайдер До/Після', 'Матриця 70/30', 'Колористика Іттена'],
      badge: 'Інтерактивні інструменти',
      cta: 'Дослідити закони композиції',
      accent: 'border-[#64765A]/40 hover:border-[#64765A]',
      bgAccent: 'from-[#64765A]/10 to-transparent'
    },
    {
      number: '02',
      path: '/spaces-3d',
      category: 'Інженерія та 3D WebGL',
      title: '3D Інженерні Простори',
      description: 'Тривимірний інтерактивний павільйон Three.js: альпінарій із пластовим нахилом валунів 15–20°, гравітаційні підпірні стінки за нормами ДБН В.2.1-10:2018 та пергола з виткими ліанами у 4 пори року.',
      highlights: ['Альпінарій 3D', 'Рентген-зріз дренажу', 'Підпірні стіни 1:6', 'Ліани 4 сезони'],
      badge: '3D WebGL Павільйон',
      cta: 'Відкрити 3D простори',
      accent: 'border-[#AD765B]/40 hover:border-[#AD765B]',
      bgAccent: 'from-[#AD765B]/10 to-transparent'
    },
    {
      number: '03',
      path: '/atlas',
      category: 'Ботаніка & Фенологія',
      title: 'Ботанічний Атлас та Календар',
      description: 'Науковий гербарій 24 видів європейської та української флори з живими фільтрами інсоляції, кислотності pH та ярусності. Включає інтерактивний 12-місячний календар агротехнічних робіт і цвітіння.',
      highlights: ['24 ботанічні досьє', 'Фільтри ґрунту та сонця', 'Супутні види', 'Календар обрізки'],
      badge: '24 Наукові види',
      cta: 'Переглянути гербарій',
      accent: 'border-[#64765A]/40 hover:border-[#64765A]',
      bgAccent: 'from-[#64765A]/10 to-transparent'
    },
    {
      number: '04',
      path: '/studio',
      category: 'Практика & Реалізація',
      title: 'Проєктна Студія та Кейс-Стаді',
      description: 'Інтерактивний 3D-конструктор ділянки з розрахунком ярусності разом із повним генеральним планом реалізованої садиби «Terra» (Обухівський р-н): експлікація, дендроплан та специфікація матеріалів.',
      highlights: ['3D Конструктор саду', 'Генеральний план SVG', 'Кошторис та ДБН', 'Фотофіксація кейсу'],
      badge: 'Архітектурна практика',
      cta: 'Перейти до студії проєкту',
      accent: 'border-[#262925]/30 hover:border-[#262925]',
      bgAccent: 'from-[#262925]/5 to-transparent'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] text-[#262925] border-t border-b border-[#D6D0C3]">
      <div className="max-w-7xl mx-auto">
        {/* Curatorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 border-b border-[#D6D0C3] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64765A] mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#AD765B]" />
              <span>Архітектурна структура проєкту</span>
              <span>//</span>
              <span>4 Фундаментальні розділи</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#182C24] leading-tight">
              Дослідницькі напрями <br />
              <span className="italic font-normal text-[#64765A]">ландшафтної архітектури.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#64765A] max-w-2xl leading-relaxed font-light">
              Відмовтесь від штучної геометрії на користь природних зв’язків. Комплексна система поєднує теоретичну композицію, 3D інженерію рельєфу, наукову ботаніку та практику проектування.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/composition"
              className="px-6 py-3.5 bg-[#182C24] hover:bg-[#25442F] text-[#F4F0E6] rounded-2xl text-xs font-mono font-semibold flex items-center gap-2.5 shadow-md hover:shadow-xl transition-all"
            >
              <span>Розпочати з Розділу 01</span>
              <ArrowUpRight className="w-4 h-4 text-[#A7B39A]" />
            </Link>
          </div>
        </div>

        {/* 4 Architectural Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pillars.map((p) => (
            <Link
              key={p.number}
              to={p.path}
              className={`group relative p-8 sm:p-10 bg-white rounded-3xl border ${p.accent} shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-sm font-bold text-[#AD765B] bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#D6D0C3]/60">
                    Розділ {p.number}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider bg-[#182C24] text-[#F4F0E6] px-3 py-1 rounded-full font-semibold">
                    {p.badge}
                  </span>
                </div>

                <div className="text-xs font-mono uppercase tracking-widest text-[#64765A] mb-2">
                  {p.category}
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#182C24] group-hover:text-[#64765A] transition-colors leading-snug">
                  {p.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[#262925]/85 font-sans font-light leading-relaxed">
                  {p.description}
                </p>

                {/* Highlights chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono bg-[#FAF8F3] text-[#262925] px-3 py-1 rounded-lg border border-[#D6D0C3]/70 group-hover:border-[#64765A]/40 transition-colors"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="relative z-10 mt-8 pt-6 border-t border-[#D6D0C3]/60 flex items-center justify-between text-xs font-mono text-[#64765A] group-hover:text-[#182C24]">
                <span className="font-semibold text-sm group-hover:text-[#AD765B] transition-colors">{p.cta}</span>
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F3] group-hover:bg-[#182C24] group-hover:text-[#F4F0E6] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Soft background gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${p.bgAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
