import React from 'react';
import { Link } from 'react-router-dom';
import { COURSE_MODULES } from '../data/courseModules';
import { ArrowUpRight } from 'lucide-react';

export const CurriculumOverview: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] text-[#262925] border-t border-b border-[#D6D0C3]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#D6D0C3] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64765A] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
              <span>Структура курсу</span>
              <span>//</span>
              <span>12 Окремих академічних розділів</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#182C24]">
              Академічна програма ландшафтної архітектури
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#64765A] max-w-2xl leading-relaxed">
              Кожна тема розгорнута на окремій сторінці з інтерактивними 3D-моделями, інженерними розрахунками, ботанічними досьє та практичними рекомендаціями.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/principles"
              className="px-6 py-3 bg-[#182C24] hover:bg-[#25442F] text-[#F4F0E6] rounded-xl text-xs font-mono font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Почати вивчення з Розділу 02</span>
              <ArrowUpRight className="w-4 h-4 text-[#A7B39A]" />
            </Link>
          </div>
        </div>

        {/* 12 Module Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_MODULES.map((mod) => (
            <Link
              key={mod.id}
              to={mod.path}
              className="group relative p-6 bg-white rounded-2xl border border-[#D6D0C3] hover:border-[#64765A] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm font-bold text-[#AD765B] bg-[#FAF8F3] px-2.5 py-1 rounded-lg border border-[#D6D0C3]/60">
                    Розділ {mod.number}
                  </span>
                  {mod.badge && (
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-[#182C24] text-[#F4F0E6] px-2.5 py-0.5 rounded-full font-semibold">
                      {mod.badge}
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-[#64765A] mb-1">
                  {mod.category}
                </div>

                <h3 className="text-xl font-serif font-bold text-[#182C24] group-hover:text-[#64765A] transition-colors leading-snug">
                  {mod.title}
                </h3>

                <p className="mt-3 text-xs text-[#262925]/80 font-sans leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D6D0C3]/60 flex items-center justify-between text-xs font-mono text-[#64765A] group-hover:text-[#182C24]">
                <span className="font-medium">Відкрити розділ</span>
                <div className="w-7 h-7 rounded-lg bg-[#FAF8F3] group-hover:bg-[#182C24] group-hover:text-[#F4F0E6] flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
