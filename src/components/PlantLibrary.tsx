import React, { useState, useMemo } from 'react';
import { PLANTS_DATABASE } from '../data/plantsData';
import { PlantSpecies, PlantCategory } from '../types/botanical';
import { Search, ArrowUpRight, X, AlertTriangle } from 'lucide-react';

interface PlantLibraryProps {
  onSelectPlant: (plant: PlantSpecies) => void;
}

export const PlantLibrary: React.FC<PlantLibraryProps> = ({ onSelectPlant }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory | 'all'>('all');
  const [selectedLight, setSelectedLight] = useState<string>('all');

  const categories: { id: PlantCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Всі категорії' },
    { id: 'alpine', label: 'Альпійські скельні' },
    { id: 'groundcover', label: 'Ґрунтопокривні' },
    { id: 'grass', label: 'Декоративні злаки' },
    { id: 'perennial', label: 'Квітучі багаторічники' },
    { id: 'climber', label: 'Виткі ліани' },
    { id: 'crevice', label: 'Для швів і кишень' },
    { id: 'shrub', label: 'Структурні кущі' },
    { id: 'tree', label: 'Дерева-солітери' },
  ];

  const filteredPlants = useMemo(() => {
    return PLANTS_DATABASE.filter(p => {
      const matchesSearch = 
        p.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.family.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.landscapeApplication.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesLight = selectedLight === 'all' || p.light.toLowerCase().includes(selectedLight.toLowerCase());

      return matchesSearch && matchesCategory && matchesLight;
    });
  }, [searchQuery, selectedCategory, selectedLight]);

  return (
    <section id="library" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#182C24] text-[#F4F0E6] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO WITH ARCHITECTURAL INDICATORS */}
        <div className="border-b border-[#A7B39A]/30 pb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A7B39A] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Ботаніка</span>
            <span>//</span>
            <span>Ботанічний архів та фітоценоз</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#F4F0E6] leading-tight">
                Ботанічна енциклопедія природного саду
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#D6D0C3] font-sans leading-relaxed max-w-3xl">
                Науково структурований каталог витривалих таксонів для природних садів, кам'янистих альпінаріїв, підпірних стін та вертикальних пергол. Кожна рослина відібрана за критеріями довговічності, витривалості до посухи та архітектурної виразності у будь-яку пору року.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="border-l border-[#A7B39A]/30 pl-4 py-1">
                <div className="text-xs font-mono text-[#A7B39A] uppercase tracking-wider">Каталогізовано таксонів</div>
                <div className="text-2xl font-serif font-bold text-[#F4F0E6] mt-0.5">{PLANTS_DATABASE.length} перевірених видів</div>
                <div className="text-[11px] font-mono text-[#D6D0C3]/70">Стійкі культивари для нашого клімату</div>
              </div>
            </div>
          </div>


        </div>

        {/* SCIENTIFIC CURATION DOSSIER — SENIOR ARCHITECTURAL SPEC */}
        <div className="border-t border-b border-[#A7B39A]/20 py-10 space-y-8">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Методологія фітодизайну
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4F0E6] mt-1">
              Тріада сталого фітоценозу природного саду
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#A7B39A]/20">
            <div className="pt-6 md:pt-0 md:pr-8 space-y-2">
              <span className="font-mono text-xs text-[#AD765B] font-bold block">[01]</span>
              <h3 className="text-xl font-serif font-bold text-[#F4F0E6]">Матрична посадка (Matrix)</h3>
              <p className="text-xs text-[#D6D0C3] leading-relaxed font-light font-sans">
                За концепцією Піта Удольфа, до 70% площі заповнюється довговічними декоративними злаками та стійкими ґрунтопокривними, що утворюють щільний живий килим, який пригнічує бур'яни без агроволокна.
              </p>
            </div>

            <div className="pt-6 md:pt-0 md:px-8 space-y-2">
              <span className="font-mono text-xs text-[#AD765B] font-bold block">[02]</span>
              <h3 className="text-xl font-serif font-bold text-[#F4F0E6]">Екологічна відповідність</h3>
              <p className="text-xs text-[#D6D0C3] leading-relaxed font-light font-sans">
                «Правильна рослина на правильне місце» (Right Plant, Right Place). Замість штучної заміни ґрунтів і хімічного підкислення добираються види, що еволюційно пристосовані до наявної кислотності та дренажу.
              </p>
            </div>

            <div className="pt-6 md:pt-0 md:pl-8 space-y-2">
              <span className="font-mono text-xs text-[#AD765B] font-bold block">[03]</span>
              <h3 className="text-xl font-serif font-bold text-[#F4F0E6]">Чотирисезонна архітектура</h3>
              <p className="text-xs text-[#D6D0C3] leading-relaxed font-light font-sans">
                Квітка живе кілька тижнів, а стебло, форма суцвіття і зимовий силует працюють місяцями. Оцінка рослини проводиться насамперед за якістю відмирання та стійкістю до снігового навантаження.
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="bg-[#1F2922] p-6 sm:p-8 rounded-3xl border border-[#A7B39A]/30 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-2/3">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#A7B39A]" />
              <input
                type="text"
                placeholder="Пошук за латинською назвою, українською, родиною або застосуванням..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-[#182C24] text-[#F4F0E6] placeholder-[#A7B39A]/60 rounded-xl border border-[#A7B39A]/40 text-sm font-sans focus:outline-none focus:border-[#AD765B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A7B39A] hover:text-[#F4F0E6]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Light Selector */}
            <div className="w-full md:w-1/3">
              <select
                value={selectedLight}
                onChange={(e) => setSelectedLight(e.target.value)}
                className="w-full px-4 py-3 bg-[#182C24] text-[#F4F0E6] rounded-xl border border-[#A7B39A]/40 text-xs font-mono focus:outline-none focus:border-[#AD765B]"
              >
                <option value="all">Усі режими інсоляції</option>
                <option value="сонце">Відкрите сонце (6+ годин прямого світла)</option>
                <option value="напівтінь">Напівтінь / Розсіяний підлісок</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#A7B39A]/20">
            {categories.map(cat => {
              const isSelected = cat.id === selectedCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-mono rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#AD765B] text-[#F4F0E6] font-semibold shadow-md'
                      : 'bg-[#182C24] text-[#D6D0C3] hover:text-[#F4F0E6] hover:bg-[#64765A]/40 border border-[#A7B39A]/30'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[#A7B39A] flex items-center justify-between">
            <span>Знайдено: {filteredPlants.length} таксонів</span>
            {(searchQuery || selectedCategory !== 'all' || selectedLight !== 'all') && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLight('all'); }}
                className="text-[#AD765B] hover:underline"
              >
                Очистити всі фільтри
              </button>
            )}
          </div>
        </div>

        {/* SPECIMENS GRID */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map(plant => (
              <div
                key={plant.id}
                onClick={() => onSelectPlant(plant)}
                className="bg-[#1F2922] hover:bg-[#25392D] p-6 rounded-3xl border border-[#A7B39A]/30 hover:border-[#AD765B] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7B39A] bg-[#182C24] px-2.5 py-1 rounded-md border border-[#A7B39A]/30">
                      {plant.category}
                    </span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/30 shadow-xs"
                      style={{ backgroundColor: plant.colorHex }}
                      title={`Колірний акорд: ${plant.colorHex}`}
                    />
                  </div>

                  <h3 className="text-xl font-serif italic font-bold text-[#F4F0E6] group-hover:text-[#AD765B] transition-colors leading-snug">
                    {plant.botanicalName}
                  </h3>
                  <div className="text-sm text-[#D6D0C3] font-sans font-medium mt-1">
                    {plant.commonName}
                  </div>
                  <div className="text-[11px] font-mono text-[#A7B39A] mt-1">
                    Родина: {plant.family}
                  </div>

                  <p className="text-xs text-[#A7B39A] mt-4 line-clamp-3 leading-relaxed">
                    {plant.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#A7B39A]/20 space-y-2 text-xs font-mono text-[#D6D0C3]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#A7B39A]">Габітус:</span>
                    <span className="font-semibold">{plant.matureHeight}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#A7B39A]">Інсоляція:</span>
                    <span className="truncate max-w-[140px] text-right">{plant.light}</span>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-[#AD765B] font-sans text-xs font-semibold group-hover:text-[#F4F0E6]">
                    <span>Відкрити повне досьє</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#1F2922] rounded-3xl border border-[#A7B39A]/30 p-8 space-y-4">
            <p className="text-xl font-serif text-[#F4F0E6]">За вашим запитом рослин не знайдено.</p>
            <p className="text-xs text-[#A7B39A]">Спробуйте змінити фільтри або очистити пошуковий рядок.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedLight('all'); }}
              className="mt-2 px-6 py-2.5 bg-[#AD765B] text-[#F4F0E6] text-xs font-mono rounded-xl hover:bg-[#8F5E46] transition-colors"
            >
              Скинути параметри фільтрації
            </button>
          </div>
        )}

        {/* COMMON PITFALLS AUDIT */}
        <div className="bg-[#1F2922] p-8 sm:p-10 rounded-3xl border border-[#AD765B]/40 space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-[#AD765B]" />
            <h3 className="text-2xl font-serif font-bold text-[#F4F0E6]">
              Аудит типових помилок при доборі асортименту
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#182C24] border border-[#A7B39A]/20">
              <div className="text-xs font-mono font-bold text-[#AD765B] mb-1">Помилка 01: Покупка «очима»</div>
              <p className="text-xs text-[#D6D0C3] leading-relaxed">
                Вибір рослини виключно за фотографією піку цвітіння. Після опадання пелюсток садівник стикається з неохайним кущем. <em>Рішення:</em> оцінювати форму листя та архітектоніку пагонів.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#182C24] border border-[#A7B39A]/20">
              <div className="text-xs font-mono font-bold text-[#AD765B] mb-1">Помилка 02: Порушення щільності</div>
              <p className="text-xs text-[#D6D0C3] leading-relaxed">
                Висадка молодих рослин занадто близько задля швидкого візуального ефекту. Через 2-3 роки рослини душать одна одну. <em>Рішення:</em> залишати запас згідно з діаметром дорослого екземпляра.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#182C24] border border-[#A7B39A]/20">
              <div className="text-xs font-mono font-bold text-[#AD765B] mb-1">Помилка 03: Одинарні посадки</div>
              <p className="text-xs text-[#D6D0C3] leading-relaxed">
                Розпилення одиничних екземплярів створює візуальний хаос. <em>Рішення:</em> висаджувати багаторічники блоками або дрифтами непарної кількості (3, 5, 7, 9 шт.).
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
