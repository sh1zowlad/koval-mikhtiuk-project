import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowUp, Sparkles } from 'lucide-react';
import { COURSE_MODULES } from '../data/courseModules';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#122019] text-[#F4F0E6] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#A7B39A]/20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Studio Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#A7B39A]/20 pb-10">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-full bg-[#64765A] border border-[#A7B39A]/60 flex items-center justify-center text-[#F4F0E6] group-hover:bg-[#AD765B] transition-colors">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <span className="font-serif text-xl tracking-wider font-bold">KOVAL MIKHTIUK PROJECT</span>
                <span className="font-mono text-[10px] tracking-widest text-[#A7B39A] block uppercase -mt-1">
                  TERRA // Архітектура живих ландшафтів
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#D6D0C3] leading-relaxed max-w-md font-light">
              Авторська цифрова монографія та інтерактивна студія ландшафтної архітектури. Дослідження матричних природних композицій, альпійських біотопів, підпірних стін та колористичних гармоній.
            </p>
          </div>

          {/* Navigation Directory (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#AD765B] block">
              12 Розділів проекту
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs font-mono text-[#D6D0C3]">
              {COURSE_MODULES.slice(0, 12).map(m => (
                <Link
                  key={m.id}
                  to={m.path}
                  className="hover:text-[#F4F0E6] transition-colors truncate block"
                >
                  <span className="text-[#A7B39A] mr-1">{m.number}.</span>
                  {m.shortTitle.replace(/^\d+\s*/, '')}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions & Scroll to top (3 cols) */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <Link
              to="/landscape-builder"
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/30 flex items-center justify-between text-xs font-mono transition-colors group"
            >
              <span className="text-[#D6D0C3] group-hover:text-white">Відкрити 3D Студію</span>
              <Sparkles className="w-4 h-4 text-[#AD765B]" />
            </Link>

            <button
              onClick={scrollToTop}
              className="py-2.5 px-4 rounded-xl bg-[#182C24] hover:bg-[#64765A] border border-[#A7B39A]/30 text-xs font-mono text-[#F4F0E6] flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Повернутися вгору</span>
            </button>
          </div>
        </div>

        {/* Minimal Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A7B39A]/80">
          <div>
            © 2026 KOVAL MIKHTIUK PROJECT. Всі права захищено.
          </div>
          <div className="text-[11px] text-[#A7B39A]/60">
            Ландшафтна архітектура // 3D WebGL // Ботаніка
          </div>
        </div>
      </div>
    </footer>
  );
};
