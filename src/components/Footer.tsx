import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { path: '/', label: 'Головна 3D' },
    { path: '/composition', label: 'Композиція' },
    { path: '/spaces-3d', label: '3D Простори' },
    { path: '/atlas', label: 'Ботанічний Атлас' },
    { path: '/studio', label: '3D Конструктор' },
  ];

  return (
    <footer className="bg-[#122019] text-[#F4F0E6] pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-t border-[#A7B39A]/20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Main Row: Brand + Navigation Links + Scroll to Top */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#A7B39A]/20 pb-8">
          {/* Brand & Wordmark */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <span className="w-9 h-9 rounded-full bg-[#64765A] border border-[#A7B39A]/60 flex items-center justify-center text-[#F4F0E6] group-hover:bg-[#AD765B] transition-colors shrink-0">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <span className="font-serif text-lg sm:text-xl tracking-wider font-bold block text-[#F4F0E6]">
                KOVAL MIKHTIUK PROJECT
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#A7B39A] block uppercase">
                TERRA // Презентація ландшафтного дизайну
              </span>
            </div>
          </Link>

          {/* Simple Inline Horizontal Navigation */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#D6D0C3]">
            {navLinks.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-[#F4F0E6] transition-colors py-1 inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="text-[#AD765B] font-bold">0{idx + 1}.</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Scroll to Top Button — cleanly isolated with no overlap */}
          <div className="shrink-0 pt-2 lg:pt-0">
            <button
              onClick={scrollToTop}
              className="py-2.5 px-5 rounded-full bg-white/5 hover:bg-[#64765A] border border-[#A7B39A]/30 text-xs font-mono text-[#F4F0E6] flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Вгору</span>
            </button>
          </div>
        </div>

        {/* Minimal Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#A7B39A]/70">
          <div>© 2026 KOVAL MIKHTIUK PROJECT. Всі права захищено.</div>
          <div className="text-[11px] text-[#A7B39A]/50">3D WebGL // Сталий фітодизайн // Природні екотони</div>
        </div>
      </div>
    </footer>
  );
};
