import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Compass, ChevronDown, Sparkles, BookOpen } from 'lucide-react';
import { ambientSound } from '../utils/ambientAudio';
import { COURSE_MODULES } from '../data/courseModules';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    queueMicrotask(() => {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
    });
  }, [location.pathname]);

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsPlayingAudio(active);
  };

  const primaryNavItems = [
    { path: '/', label: 'Головна 3D' },
    { path: '/principles', label: 'Композиція' },
    { path: '/alpine-gardens', label: 'Альпінарій' },
    { path: '/retaining-walls', label: 'Стінки 3D' },
    { path: '/climbing-plants', label: 'Ліани 3D' },
    { path: '/plant-library', label: 'Гербарій' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#182C24]/95 backdrop-blur-md py-3 border-b border-[#A7B39A]/30 shadow-lg'
            : 'bg-[#182C24]/80 backdrop-blur-sm py-4 border-b border-[#A7B39A]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 text-[#F4F0E6] group">
            <span className="w-8 h-8 rounded-full bg-[#64765A] border border-[#A7B39A]/60 flex items-center justify-center text-[#F4F0E6] group-hover:bg-[#AD765B] transition-colors">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <span className="font-serif text-base sm:text-lg tracking-wider font-bold">KOVAL MIKHTIUK</span>
              <span className="font-mono text-[10px] tracking-widest text-[#A7B39A] block uppercase -mt-1">
                TERRA // Ландшафтна архітектура
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#182C24]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#A7B39A]/30">
            {primaryNavItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-1 text-[13px] font-sans rounded-full transition-all tracking-wide ${
                    isActive
                      ? 'bg-[#64765A] text-[#F4F0E6] font-semibold shadow-sm'
                      : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-[#64765A]/30'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* All Modules Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-3.5 py-1 text-[13px] font-sans rounded-full transition-all flex items-center gap-1.5 tracking-wide ${
                  dropdownOpen ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold' : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-[#64765A]/30'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Всі розділи (12)</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Mega-menu dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#182C24] border border-[#A7B39A]/40 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in backdrop-blur-xl max-h-[80vh] overflow-y-auto">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#A7B39A] px-3 py-2 border-b border-white/10">
                    Навігація по розділах курсу
                  </div>
                  <div className="space-y-1 py-1">
                    {COURSE_MODULES.map(m => (
                      <Link
                        key={m.id}
                        to={m.path}
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-colors ${
                          location.pathname === m.path
                            ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold'
                            : 'text-[#D6D0C3] hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] opacity-70 w-4">{m.number}</span>
                          <span className="truncate">{m.title}</span>
                        </div>
                        {m.badge && (
                          <span className="text-[9px] bg-black/30 px-1.5 py-0.5 rounded text-[#A7B39A]">
                            {m.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons: 3D Studio CTA + Ambient Audio Toggle + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Link to Upgraded 3D Studio */}
            <Link
              to="/landscape-builder"
              className="px-3.5 py-1.5 bg-[#AD765B] hover:bg-[#c4876b] text-[#F4F0E6] rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4F0E6]" />
              <span className="hidden sm:inline">3D Студія саду</span>
              <span className="sm:hidden">3D</span>
            </Link>

            {/* Ambient Sound Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all ${
                isPlayingAudio
                  ? 'bg-[#64765A] border-[#A7B39A] text-[#F4F0E6] ring-2 ring-[#AD765B]/60'
                  : 'bg-white/5 border-[#A7B39A]/30 text-[#D6D0C3] hover:bg-white/10 hover:text-[#F4F0E6]'
              }`}
              title={isPlayingAudio ? 'Вимкнути атмосферні звуки саду' : 'Увімкнути шелест вітру та пташиний спів'}
            >
              {isPlayingAudio ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/5 border border-[#A7B39A]/30 text-[#F4F0E6] hover:bg-white/10"
              aria-label="Перемкнути меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-30 h-[calc(100dvh-4rem)] bg-[#182C24]/98 backdrop-blur-xl lg:hidden px-4 py-6 overflow-y-auto overscroll-contain border-t border-[#A7B39A]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-4 pb-2 border-b border-white/10">
              <span>12 Розділів навчального курсу</span>
              <span className="text-[#AD765B]">TERRA ARCHIVE</span>
            </div>
            <div className="space-y-1.5 pb-6">
              {COURSE_MODULES.map(m => (
                <Link
                  key={m.id}
                  to={m.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-xl text-sm font-sans transition-colors ${
                    location.pathname === m.path
                      ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold shadow-md'
                      : 'text-[#D6D0C3] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#A7B39A] font-bold">Розділ {m.number}</span>
                    <span className="font-serif text-base">{m.title}</span>
                  </div>
                  {m.badge && (
                    <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded text-[#A7B39A]">
                      {m.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 mt-4 text-center text-xs font-mono text-[#A7B39A] flex items-center justify-between">
            <span>© 2026 KOVAL MIKHTIUK</span>
            <span>Ландшафтна архітектура</span>
          </div>
        </div>
      )}
    </>
  );
};
