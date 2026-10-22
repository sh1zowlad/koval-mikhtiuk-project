import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getModuleByPath, getPrevNextModules } from '../data/courseModules';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

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
      {/* Editorial Breadcrumbs Header */}
      <div className="border-b border-[#A7B39A]/30 bg-[#FAF8F3] px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Breadcrumb links */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#64765A]">
            <Link to="/" className="hover:text-[#182C24] flex items-center gap-1.5 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Головна</span>
            </Link>
            <span className="text-[#A7B39A]">/</span>
            <span className="text-[#AD765B] font-semibold">Розділ {currentModule.number}</span>
            <span className="text-[#A7B39A]">/</span>
            <span className="text-[#182C24] font-medium hidden sm:inline truncate max-w-xs md:max-w-md">
              {currentModule.title}
            </span>
          </nav>

          {/* Category Pill */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 bg-[#EAE4D5] rounded-full text-[#182C24] font-semibold">
              {currentModule.category}
            </span>
            {currentModule.badge && (
              <span className="px-3 py-1 bg-[#182C24] text-[#F4F0E6] rounded-full font-semibold">
                {currentModule.badge}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
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
                className="group flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/20 transition-all w-full sm:w-auto max-w-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#64765A] flex items-center justify-center text-[#F4F0E6] group-hover:bg-[#AD765B] transition-colors shrink-0">
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
                className="group flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/20 transition-all w-full sm:w-auto"
              >
                <div className="w-10 h-10 rounded-xl bg-[#64765A] flex items-center justify-center text-[#F4F0E6] shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-mono uppercase text-[#A7B39A] tracking-wider">Початок</span>
                  <span className="block text-sm font-serif font-bold text-[#F4F0E6]">Головна 3D панорама</span>
                </div>
              </Link>
            )}

            {/* Center Home Link */}
            <Link
              to="/"
              className="text-xs font-mono text-[#D6D0C3] hover:text-[#F4F0E6] flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 transition-all"
            >
              <Home className="w-4 h-4 text-[#AD765B]" />
              <span>Головна 3D</span>
            </Link>

            {/* Next Module Button */}
            {next ? (
              <Link
                to={next.path}
                className="group flex items-center justify-end gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/20 transition-all w-full sm:w-auto max-w-sm text-right"
              >
                <div className="text-right overflow-hidden">
                  <span className="block text-[10px] font-mono uppercase text-[#A7B39A] tracking-wider">
                    Розділ {next.number} →
                  </span>
                  <span className="block text-sm font-serif font-bold text-[#F4F0E6] truncate group-hover:text-[#A7B39A] transition-colors">
                    {next.shortTitle}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#AD765B] flex items-center justify-center text-[#F4F0E6] group-hover:bg-[#c4876b] transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ) : (
              <Link
                to="/studio"
                className="group flex items-center justify-end gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#A7B39A]/20 transition-all w-full sm:w-auto text-right"
              >
                <div className="text-right">
                  <span className="block text-[10px] font-mono uppercase text-[#A7B39A] tracking-wider">Фінал</span>
                  <span className="block text-sm font-serif font-bold text-[#F4F0E6]">Проєктна Студія</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#AD765B] flex items-center justify-center text-[#F4F0E6] shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )}
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#A7B39A] font-mono gap-4">
            <div>KOVAL MIKHTIUK PROJECT // TERRA ARCHITECTURE</div>
            <div>Стала ландшафтна композиція та природні екотони</div>
          </div>
        </div>
      </div>
    </div>
  );
};
