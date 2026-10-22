import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

export const SimplicityNaturalness: React.FC = () => {
  const [checklist, setChecklist] = useState([
    {
      id: 'matrix',
      label: '70% площі закладено матричними злаками та ґрунтопокривними',
      checked: true,
      explanation: 'Матриця утворює стійкий мікроклімат і виключає відкриту чорну землю.'
    },
    {
      id: 'repeat',
      label: 'Повторення домінантних груп кожні 2–4 метри',
      checked: true,
      explanation: 'Створює ритмічну хвилю та об\'єднує різні зони ділянки в єдину картину.'
    },
    {
      id: 'colors',
      label: 'Не більше 2–3 споріднених колірних відтінків одночасно',
      checked: false,
      explanation: 'Запобігає візуальному шуму та хаотичній строкатості садових центрів.'
    },
    {
      id: 'pause',
      label: 'Збережено мінімум 30% негативного простору для ока',
      checked: true,
      explanation: 'Гравійні відсипки або низькі трав\'яні галявини дають погляду перепочинок.'
    },
    {
      id: 'winter',
      label: 'Всі рослини зберігають графічний силует і суцвіття взимку',
      checked: true,
      explanation: 'Сад залишається тривимірною скульптурою навіть під шаром снігу та інею.'
    },
    {
      id: 'limit',
      label: 'Ліміт видів: 7–9 стійких сортів замість десятків одиночних екземплярів',
      checked: false,
      explanation: 'Природний вигляд виникає через масиви, а не колекціонування етикеток.'
    }
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const checkedCount = checklist.filter(c => c.checked).length;
  const scorePercent = Math.round((checkedCount / checklist.length) * 100);

  const comparisons = [
    {
      criterion: 'Принцип посадки',
      catalog: 'По одній рослині кожного сорту з садового центру (колекціонування етикеток)',
      natural: 'Матричні переплетені групи по 5–15 рослин одного виду, що утворюють суцільні хвилі'
    },
    {
      criterion: 'Поведінка ґрунту',
      catalog: 'Відкритий чорнозем або фарбована кора, що вимагає постійного прополювання та гербіцидів',
      natural: '100% покриття живим зеленим пологом (living mulch); волога утримується корінням'
    },
    {
      criterion: 'Осінь та зима',
      catalog: 'Тотальне зрізання всіх пагонів під корінь у жовтні; чорна пуста земля до травня',
      natural: 'Збереження графічних суцвіть і злаків на всю зиму; іній та сніг стають частиною скульптури'
    },
    {
      criterion: 'Трудовитрати на догляд',
      catalog: 'Щотижнева боротьба з бур\'янами, полив голих ділянок, підв\'язування слабких гібридів',
      natural: 'Стійка саморегульована екосистема: одна санітарна стрижка на рік навесні'
    }
  ];

  return (
    <div className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] text-[#262925]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* NATURAL EDITORIAL HEADER */}
        <div className="border-b border-[#D6D0C3] pb-10">
          <div className="flex items-center gap-2 text-xs font-sans text-[#64765A] mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#AD765B]" />
            <span>Філософія натуралізму • Стриманість та цілісність саду</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#182C24] leading-[1.08] max-w-4xl">
            Простота і природність: <br />
            <span className="italic font-normal text-[#64765A]">Дисципліна матричного дизайну.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#262925]/85 max-w-3xl leading-relaxed font-light font-sans">
            Справжній природний ландшафт виникає не тоді, коли більше нічого додати, а тоді, коли більше нічого не можна забрати без шкоди для цілісності середовища. Це свідома відмова від хаотичної строкатості на користь спокійної сили дикої природи.
          </p>
        </div>

        {/* SECTION 1: THE 70/20/10 FORMULA (EDITORIAL STREAM) */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-sans text-[#AD765B] block mb-1">
              Формула природної посадки
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24]">
              Пропорція 70/20/10: Матриця, Структура, Спалахи
            </h2>
          </div>

          {/* Visual Percentage Bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-neutral-200">
            <div style={{ width: '70%' }} className="bg-[#64765A]" title="70% Матричні трави" />
            <div style={{ width: '20%' }} className="bg-[#182C24]" title="20% Структурні багаторічники" />
            <div style={{ width: '10%' }} className="bg-[#AD765B]" title="10% Сезонні спалахи" />
          </div>

          {/* Editorial 3-Column Narrative without chunky boxed cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#64765A]" />
                <h3 className="font-serif font-bold text-xl text-[#182C24]">70% Матрична база</h3>
              </div>
              <p className="text-sm text-[#262925]/80 font-sans font-light leading-relaxed">
                Сеслерія осіння, ковила, молінія, осоки. Стабільний зелений фундамент, який пригнічує бур'яни, тримає форму з квітня до березня і створює текстурну глибину.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#182C24]" />
                <h3 className="font-serif font-bold text-xl text-[#182C24]">20% Структурні солітери</h3>
              </div>
              <p className="text-sm text-[#262925]/80 font-sans font-light leading-relaxed">
                Шавлія дібровна, ехінацея, очитник видний. Рослини з міцним стеблом, які зберігають красивий скелет суцвіть навіть після відцвітання.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#AD765B]" />
                <h3 className="font-serif font-bold text-xl text-[#182C24]">10% Сезонні спалахи</h3>
              </div>
              <p className="text-sm text-[#262925]/80 font-sans font-light leading-relaxed">
                Дикі тюльпани, алліуми, ліхніс. Яскраві короткі феєрверки, що спалахують на 2–3 тижні й зникають, не руйнуючи загальний вигляд.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: COMPARATIVE BREAKDOWN TABLE */}
        <div className="space-y-8 pt-8 border-t border-[#D6D0C3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Порівняльний аналіз
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Традиційний підхід проти сталого природного біотопу
            </h2>
          </div>

          <div className="divide-y divide-[#D6D0C3] border-t border-b border-[#D6D0C3]">
            {comparisons.map((c, idx) => (
              <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-3 text-xs font-mono text-[#AD765B] font-bold uppercase tracking-wider">
                  0{idx + 1}. {c.criterion}
                </div>
                <div className="md:col-span-4 text-xs font-mono text-[#8B483B] leading-relaxed">
                  <span className="block text-[10px] text-red-500 uppercase font-bold tracking-wider mb-1">Традиційно:</span>
                  {c.catalog}
                </div>
                <div className="md:col-span-5 text-sm text-[#182C24] font-sans font-light leading-relaxed">
                  <span className="block text-[10px] text-[#64765A] font-mono uppercase font-bold tracking-wider mb-1">Природне рішення:</span>
                  {c.natural}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: CHECKLIST AUDIT — CLEAN ARCHITECTURAL LINES */}
        <div className="space-y-8 pt-8 border-t border-[#D6D0C3]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивний чек-лист
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
                Критерії природності ландшафтної концепції
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#64765A]">
              <span>Індекс відповідності:</span>
              <span className="text-lg font-serif font-bold text-[#182C24]">{scorePercent}%</span>
              <span>({checkedCount}/6)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {checklist.map(item => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="py-3 flex items-start gap-3 cursor-pointer group border-b border-[#D6D0C3]/60"
              >
                <div className="mt-0.5 shrink-0">
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-[#64765A]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#A7B39A] group-hover:text-[#64765A]" />
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-serif font-medium transition-colors ${item.checked ? 'text-[#182C24]' : 'text-[#64765A]'}`}>
                    {item.label}
                  </h4>
                  <p className="mt-0.5 text-xs text-[#64765A] font-light leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
