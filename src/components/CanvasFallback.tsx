import React from 'react';
import { AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface CanvasFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  heightClass?: string;
}

export const CanvasFallback: React.FC<CanvasFallbackProps> = ({
  title = 'Апаратне прискорення WebGL недоступне',
  message = 'У вашому браузері або пристрої обмежено підтримку WebGL. Усі освітні креслення, ботанічні паспорти та аналітичні таблиці нижче залишаються на 100% доступними.',
  onRetry,
  heightClass = 'h-[480px]'
}) => {
  return (
    <div
      role="region"
      aria-label="3D Графічний компонент (режим резервного відображення)"
      className={`relative w-full ${heightClass} rounded-xl overflow-hidden border border-[#A7B39A]/40 bg-[#182C24] flex flex-col items-center justify-center p-6 text-center text-[#F4F0E6] select-none`}
    >
      {/* Blueprint Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(167, 179, 154, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(167, 179, 154, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Decorative Technical Crosshairs */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-[#A7B39A]/60 uppercase">
        REF // 3D-FALLBACK-V2
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-[#A7B39A]/60">
        CANVAS // 2D ARCHITECTURAL FALLBACK
      </div>

      <div className="relative z-10 max-w-md flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-[#AD765B]/15 border border-[#AD765B]/30 flex items-center justify-center mb-4 text-[#AD765B]">
          <Layers className="w-7 h-7" />
        </div>

        <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-[#AD765B]">
          <AlertCircle className="w-4 h-4" />
          <span>Статичний режим відображення</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F0E6]">
          {title}
        </h3>

        <p className="mt-2 text-sm text-[#D6D0C3] leading-relaxed font-light">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 px-4 py-2 bg-[#64765A] hover:bg-[#728766] text-[#F4F0E6] text-xs font-mono uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 shadow-md cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Спробувати ініціалізацію знову</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CanvasFallback;
