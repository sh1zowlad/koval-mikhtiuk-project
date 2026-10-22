import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COURSE_MODULES, getModuleByPath, getPrevNextModules } from '../data/courseModules';
import { ArrowLeft, ArrowRight, Home, Compass, BookOpen } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentModule = getModuleByPath(location.pathname);
  const { prev, next } = getPrevNextModules(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  if (!currentModule || location.pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="pt-20 bg-[#F4F0E6] text-[#262925] min-h-screen flex flex-col justify-between">
      {/* Editorial Breadcrumbs & Page Header Meta */}
      <div className="border-b border-[#A7B39A]/40 bg-[#FAF8F3] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb links */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#64765A]">
            <Link to="/" className="hover:text-[#182C24] flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Головна</span>
            </Link>
            <span>/</span>
            <span className="text-[#AD765B] font-semibold">Розділ {currentModule.number}</span>
            <span>/</span>
            <span className="text-[#182C24] font-medium hidden sm:inline truncate max-w-xs md:max-w-md">
              {currentModule.title}
            </span>
          </nav>

          {/* Quick Curriculum Switcher Pill */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 bg-[#EAE4D5] rounded-lg text-[#182C24] font-semibold">
              {currentModule.category}
            </span>
            {currentModule.badge && (
              <span className="px-2.5 py-1 bg-[#182C24] text-[#F4F0E6] rounded-lg font-semibold">
                {currentModule.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Page Specific Section Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Editorial Prev / Next Navigation Footer */}
      <div className="bg-[#182C24] text-[#F4F0E6] border-t border-[#A7B39A]/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#A7B39A]/20">
            {/* Prev Module Button */}
            {prev ? (
              <Link
                to={prev.path}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/20 transition-all w-full sm:w-auto max-w-sm"
              >
                <div className="w-9 h-9 rounded-xl bg-[#64765A] flex items-center justify-center text-[#F4F0E6] group-hover:bg-[#AD765B] transition-colors shrink-0">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                <div className="text-left overflow-hidden">
                  <span className="block text-[10px] font-mono uppercase text-[#A7B39A] tracking-wider">
                    ← Розділ {prev.number}
                  </span>
                  <span className="block text-sm font-serif font-bold text-[#F4F0E6] truncate group-hover:text-[#A7B39A] transition-colors">
                    {prev.shortTitle}
                  </span>
                </div>
              </Link>
            ) : (
              <Link
                to="/"
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/20 transition-all w-full sm:w-auto"
              >
                <div className="w-9 h-9 rounded-xl bg-[#64765A] flex items-center justify-center text-[#F4F0E6] shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-mono uppercase text-[#A7B39A] tracking-wider">Початок</span>
                  <span className="block text-sm font-serif font-bold text-[#F4F0E6]">Головна панорама</span>
                </div>
              </Link>
            )}

            {/* Center Curriculum Index Pill */}
            <Link
              to="/"
              className="px-5 py-2.5 rounded-full bg-[#EAE4D5] hover:bg-[#D6D0C3] text-[#182C24] font-mono text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#AD765B]" />
              <span>Зміст усіх 12 розділів</span>
            </Link>

            {/* Next Module Button */}
            {next ? (
              <Link
                to={next.path}
                className="group flex items-center justify-end gap-3 p-3 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/20 transition-all w-full sm:w-auto max-w-sm text-right"
              >
                <div className="text-right overflow-hidden">
                  <span className="block text-[10px] font-mono uppercase text-[#A7B39A] tracking-wider">
                    Розділ {next.number} →
                  </span>
                  <span className="block text-sm font-serif font-bold text-[#F4F0E6] truncate group-hover:text-[#A7B39A] transition-colors">
                    {next.shortTitle}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#64765A] flex items-center justify-center text-[#F4F0E6] group-hover:bg-[#AD765B] transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ) : (
              <Link
                to="/"
                className="group flex items-center justify-end gap-3 p-3 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/20 transition-all w-full sm:w-auto text-right"
              >
                <div className="text-right">
                  <span className="block text-[10px] font-mono uppercase text-[#A7B39A] tracking-wider">Фінал курсу</span>
                  <span className="block text-sm font-serif font-bold text-[#F4F0E6]">Повернутися на старт</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#64765A] flex items-center justify-center text-[#F4F0E6] shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
              </Link>
            )}
          </div>

          {/* Quick Module Grid Footer Links */}
          <div className="pt-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A7B39A] block mb-4">
              Швидкий перехід між сторінками курсу:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {COURSE_MODULES.map(m => (
                <Link
                  key={m.id}
                  to={m.path}
                  className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
                    location.pathname === m.path
                      ? 'bg-[#AD765B] text-[#F4F0E6] border-[#AD765B] font-semibold'
                      : 'bg-white/5 text-[#D6D0C3] border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] opacity-70 block">{m.number}</span>
                  <span className="truncate block font-serif text-[11px]">{m.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
