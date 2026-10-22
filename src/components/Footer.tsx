import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { path: '/', label: 'Головна 3D' },
    { path: '/composition', label: 'Теорія та Композиція' },
    { path: '/spaces-3d', label: '3D Інженерні Простори' },
    { path: '/atlas', label: 'Ботанічний Атлас & Фенологія' },
    { path: '/studio', label: 'Проєктна Студія & Кейс' },
  ];

  return (
    <footer className="bg-[#122019] text-[#F4F0E6] pt-14 pb-10 px-4 sm:px-6 lg:px-8 border-t border-[#A7B39A]/20">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-[#A7B39A]/20 pb-8">
          {/* Brand & Studio Mission */}
          <div className="space-y-3 max-w-lg">
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
            <p className="text-xs sm:text-sm text-[#D6D0C3] leading-relaxed font-light">
              Авторське дослідження природної композиції, геології альпінаріїв, гравітаційних підпірних стін та взаємодії рослин і простору.
            </p>
          </div>

          {/* Clean Navigation Links (5 Main Pillars) */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#D6D0C3]">
            {navLinks.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-[#F4F0E6] transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#AD765B]">0{idx + 1}.</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Scroll to Top */}
          <div className="shrink-0">
            <button
              onClick={scrollToTop}
              className="py-2.5 px-4 rounded-full bg-white/5 hover:bg-[#64765A] border border-[#A7B39A]/30 text-xs font-mono text-[#F4F0E6] flex items-center gap-2 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Вгору</span>
            </button>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A7B39A]/70">
          <div>© 2026 KOVAL MIKHTIUK PROJECT. Всі права захищено.</div>
          <div className="text-[11px]">Ландшафтна архітектура // 3D WebGL // Сталий фітодизайн</div>
        </div>
      </div>
    </footer>
  );
};
