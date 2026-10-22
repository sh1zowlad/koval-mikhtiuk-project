import React from 'react';
import { AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface CanvasFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  heightClass?: string;
}

export const CanvasFallback: React.FC<CanvasFallbackProps> = ({
  title = '3D-сцена тимчасово недоступна',
  message = 'Графічне прискорення WebGL не активовано у браузері. Всі плани, креслення, описи матеріалів та ботанічні дані нижче залишаються повністю доступними для перегляду.',
  onRetry,
  heightClass = 'h-[480px]'
}) => {
  return (
    <div
      role="region"
      aria-label="3D Графічний компонент (режим резервного відображення)"
      className={`relative w-full ${heightClass} rounded-[18px] overflow-hidden border border-[#A7B39A]/30 bg-[#182C24] flex flex-col items-center justify-center p-6 text-center text-[#F4F0E6] select-none`}
    >
      <div className="relative z-10 max-w-md flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl bg-[#AD765B]/15 border border-[#AD765B]/30 flex items-center justify-center mb-4 text-[#AD765B]">
          <Layers className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-1.5 mb-2 text-xs font-sans text-[#A7B39A]">
          <AlertCircle className="w-3.5 h-3.5 text-[#AD765B]" />
          <span>Статичний режим перегляду</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4F0E6]">
          {title}
        </h3>

        <p className="mt-2 text-sm text-[#D6D0C3] leading-relaxed font-light font-sans">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 px-4 py-2 bg-[#64765A] hover:bg-[#728766] text-[#F4F0E6] text-xs font-sans font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Спробувати завантажити ще раз</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CanvasFallback;
