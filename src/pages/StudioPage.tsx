import React, { useState } from 'react';
import { LandscapeBuilder } from '../components/LandscapeBuilder';
import { CaseStudySection } from '../components/CaseStudySection';
import { LayoutGrid, FileText } from 'lucide-react';

export const StudioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sandbox' | 'casestudy'>('sandbox');

  return (
    <div className="bg-[#FAF8F3] text-[#262925] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#182C24] text-[#F4F0E6] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#A7B39A]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Архітектурна практика</span>
            <span>//</span>
            <span>Конструктор & Реалізація проєкту</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
                Проєктна Студія <br />
                <span className="italic font-normal text-[#A7B39A]">& Кейс-Стаді.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] max-w-2xl leading-relaxed font-light">
                Від інтерактивного 3D-макетування ділянки до креслень реального об’єкта. Експериментуйте з просторовим розміщенням елементів або досліджуйте генеральний план реалізованої садиби «Terra» (Обухівський р-н).
              </p>
            </div>

            {/* Practical Studio Switcher */}
            <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-[#A7B39A]/20 shrink-0">
              <button
                onClick={() => setActiveTab('sandbox')}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'sandbox'
                    ? 'bg-[#64765A] text-[#F4F0E6] shadow-md'
                    : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-white/5'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-[#A7B39A]" />
                <span>3D Конструктор ділянки</span>
              </button>

              <button
                onClick={() => setActiveTab('casestudy')}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'casestudy'
                    ? 'bg-[#AD765B] text-[#F4F0E6] shadow-md'
                    : 'text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4 text-[#F4F0E6]" />
                <span>Кейс: Садиба «Terra»</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Area */}
      <main>
        {activeTab === 'sandbox' ? (
          <div className="animate-fadeIn">
            <LandscapeBuilder standalone={true} />
          </div>
        ) : (
          <div className="animate-fadeIn">
            <CaseStudySection />
          </div>
        )}
      </main>
    </div>
  );
};
