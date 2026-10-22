import React from 'react';
import { Link } from 'react-router-dom';
import { MasterGardenCanvas } from './MasterGardenCanvas';
import { PlantSpecies } from '../types/botanical';
import { ArrowRight, Compass, Layers } from 'lucide-react';

interface HeroSectionProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectPlant }) => {
  return (
    <section id="hero" className="relative min-h-screen bg-[#182C24] text-[#F4F0E6] pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden">
      {/* Subtle Natural Paper/Earth Texture */}
      <div className="absolute inset-0 bg-organic-grain opacity-30 pointer-events-none" />

      {/* Top Editorial Headline & Meta */}
      <div className="max-w-7xl mx-auto w-full relative z-10 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#A7B39A]/20 pb-8">
          <div className="max-w-3xl">
            {/* Natural Sub-Header */}
            <div className="flex items-center gap-2 text-xs font-sans text-[#A7B39A] mb-3.5">
              <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
              <span>Природний ландшафт • Ботанічна композиція • 3D геопластика</span>
            </div>

            {/* Main Serif Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#F4F0E6] leading-[1.1]">
              Де рельєф і рослини <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#A7B39A]">стають живою формою.</span>
            </h1>

            {/* Supporting Descriptive Text */}
            <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] font-sans font-light leading-relaxed max-w-2xl">
              Авторська презентація концепції природної композиції: альпінарії, інженерія підпірних стін, вертикальне озеленення та гармонія живого взаємозв'язку рослин, каменю і рельєфу.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <Link
              to="/composition"
              className="px-6 py-3 bg-[#AD765B] hover:bg-[#c4876b] text-[#F4F0E6] text-xs font-sans font-medium rounded-full transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>Дослідити композицію</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/spaces-3d"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-[#D6D0C3] hover:text-[#F4F0E6] text-xs font-sans font-medium rounded-full border border-[#A7B39A]/30 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#A7B39A]" />
              <span>3D Простори</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Interactive 3D Garden Canvas */}
      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        <MasterGardenCanvas onSelectPlant={onSelectPlant} />
      </div>

      {/* Hero Footer Bar */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A7B39A]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#AD765B]" />
            Субальпійські та помірні екотони • Південний схил
          </span>
        </div>

        <Link
          to="/composition"
          className="flex items-center gap-2 text-[#D6D0C3] hover:text-[#F4F0E6] transition-colors group"
        >
          <span>Перейти до композиції саду</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};
