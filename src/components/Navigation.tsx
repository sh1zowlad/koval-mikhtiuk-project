import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Menu, X, Compass, Sparkles } from 'lucide-react';
import { ambientSound } from '../utils/ambientAudio';
import { COURSE_MODULES } from '../data/courseModules';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    });
  }, [location.pathname]);

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsPlayingAudio(active);
  };

  const primaryNavItems = [
    { path: '/', label: 'Головна 3D' },
    { path: '/composition', label: 'Композиція' },
    { path: '/spaces-3d', label: '3D Простори' },
    { path: '/atlas', label: 'Ботанічний Атлас' },
    { path: '/studio', label: 'Студія & Кейс' },
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

          {/* Desktop Navigation Links (Clean 5-Item Architecture) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#182C24]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#A7B39A]/30">
            {primaryNavItems.map(item => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 text-[13px] font-sans rounded-full transition-all tracking-wide ${
                    isActive
                      ? 'bg-[#64765A] text-[#F4F0E6] font-semibold shadow-sm'
                      : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-[#64765A]/30'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: 3D Studio CTA + Ambient Audio Toggle + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Link to Studio */}
            <Link
              to="/studio"
              className="px-3.5 py-1.5 bg-[#AD765B] hover:bg-[#c4876b] text-[#F4F0E6] rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4F0E6]" />
              <span className="hidden sm:inline">3D Студія</span>
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
              <span>Архітектурні Розділи</span>
              <span className="text-[#AD765B]">TERRA ARCHIVE</span>
            </div>
            <div className="space-y-2 pb-6">
              {COURSE_MODULES.map(m => (
                <Link
                  key={m.id}
                  to={m.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-4 rounded-2xl text-sm font-sans transition-colors ${
                    location.pathname === m.path
                      ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold shadow-md'
                      : 'bg-white/5 text-[#D6D0C3] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#A7B39A] font-bold">0{m.number}</span>
                    <div>
                      <span className="font-serif text-base block text-[#F4F0E6]">{m.title}</span>
                      <span className="text-xs text-[#A7B39A] block mt-0.5">{m.description}</span>
                    </div>
                  </div>
                  {m.badge && (
                    <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded text-[#A7B39A] shrink-0 ml-2">
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
