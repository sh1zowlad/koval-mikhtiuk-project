import React, { useState } from 'react';
import { LandscapePrinciples } from '../components/LandscapePrinciples';
import { TransitionComparison } from '../components/TransitionComparison';
import { SimplicityNaturalness } from '../components/SimplicityNaturalness';
import { ColorLaboratory } from '../components/ColorLaboratory';
import { PlantSpecies } from '../types/botanical';
import { Layers, Sliders, Palette, ShieldCheck, Compass } from 'lucide-react';

interface CompositionPageProps {
  onSelectPlant?: (plant: PlantSpecies) => void;
}

export const CompositionPage: React.FC<CompositionPageProps> = ({ onSelectPlant }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'principles' | 'transitions' | 'naturalness' | 'color'>('all');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FAF8F3] text-[#262925]">
      {/* Natural Editorial Header */}
      <div className="bg-[#182C24] text-[#F4F0E6] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#A7B39A]/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-sans text-[#A7B39A] mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Основи композиції • Ярусність • Колір і простір</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] max-w-4xl leading-tight">
            Теорія та закони <br />
            <span className="italic font-normal text-[#A7B39A]">природної композиції.</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] max-w-3xl leading-relaxed font-light font-sans">
            Сад — це живий простір у часі. Створення гармонійного ландшафту базується на чотирьох
            неподільних складових: просторовій граматиці, плавності ярусних переходів, принципі простоти
            (матриця 70/30) та колористичній гармонії природних барв.
          </p>

          {/* Quick Pillar Jump Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveTab('all'); scrollToSection('principles-anchor'); }}
              className={`px-4 py-2 rounded-full text-xs font-sans flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#AD765B] text-[#F4F0E6] font-medium'
                  : 'bg-white/10 hover:bg-white/15 text-[#D6D0C3]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Повний огляд (4 частини)</span>
            </button>

            <button
              onClick={() => { setActiveTab('principles'); scrollToSection('principles-anchor'); }}
              className={`px-4 py-2 rounded-full text-xs font-sans flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'principles'
                  ? 'bg-[#64765A] text-[#F4F0E6] font-medium'
                  : 'bg-white/10 hover:bg-white/15 text-[#D6D0C3]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>01. Закони композиції</span>
            </button>

            <button
              onClick={() => { setActiveTab('transitions'); scrollToSection('transitions-anchor'); }}
              className={`px-4 py-2 rounded-full text-xs font-sans flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'transitions'
                  ? 'bg-[#64765A] text-[#F4F0E6] font-medium'
                  : 'bg-white/10 hover:bg-white/15 text-[#D6D0C3]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>02. Плавні переходи (Слайдер)</span>
            </button>

            <button
              onClick={() => { setActiveTab('naturalness'); scrollToSection('naturalness-anchor'); }}
              className={`px-4 py-2 rounded-full text-xs font-sans flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'naturalness'
                  ? 'bg-[#64765A] text-[#F4F0E6] font-medium'
                  : 'bg-white/10 hover:bg-white/15 text-[#D6D0C3]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>03. Матриця 70/30</span>
            </button>

            <button
              onClick={() => { setActiveTab('color'); scrollToSection('color-anchor'); }}
              className={`px-4 py-2 rounded-full text-xs font-sans flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'color'
                  ? 'bg-[#64765A] text-[#F4F0E6] font-medium'
                  : 'bg-white/10 hover:bg-white/15 text-[#D6D0C3]'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>04. Лабораторія кольору</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Stream */}
      <div className="space-y-0">
        {/* PART 1: PRINCIPLES */}
        <section id="principles-anchor" className={activeTab === 'all' || activeTab === 'principles' ? 'block' : 'hidden'}>
          <LandscapePrinciples />
        </section>

        {/* PART 2: TRANSITIONS */}
        <section id="transitions-anchor" className={activeTab === 'all' || activeTab === 'transitions' ? 'block border-t border-[#D6D0C3]' : 'hidden'}>
          <TransitionComparison />
        </section>

        {/* PART 3: SIMPLICITY & NATURALNESS */}
        <section id="naturalness-anchor" className={activeTab === 'all' || activeTab === 'naturalness' ? 'block border-t border-[#D6D0C3]' : 'hidden'}>
          <SimplicityNaturalness />
        </section>

        {/* PART 4: COLOR LAB */}
        <section id="color-anchor" className={activeTab === 'all' || activeTab === 'color' ? 'block border-t border-[#D6D0C3]' : 'hidden'}>
          <ColorLaboratory onSelectPlant={onSelectPlant} />
        </section>
      </div>
    </div>
  );
};
