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
              Розділи архітектурного проєкту
            </span>
            <div className="space-y-2 text-xs font-mono text-[#D6D0C3]">
              {COURSE_MODULES.map(m => (
                <Link
                  key={m.id}
                  to={m.path}
                  className="hover:text-[#F4F0E6] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#A7B39A] text-[10px]">0{m.number}.</span>
                    <span className="group-hover:text-white transition-colors">{m.title}</span>
                  </div>
                  {m.badge && (
                    <span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#A7B39A]">
                      {m.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions & Scroll to top (3 cols) */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <Link
              to="/studio"
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/30 flex items-center justify-between text-xs font-mono transition-colors group"
            >
              <div className="text-left">
                <span className="block text-[#F4F0E6] font-semibold">Проєктна Студія</span>
                <span className="block text-[10px] text-[#A7B39A]">3D макетування & генеральний план</span>
              </div>
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
