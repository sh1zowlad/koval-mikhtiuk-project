import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

export const SimplicityNaturalness: React.FC = () => {
  const [checklist, setChecklist] = useState<{ id: string; label: string; explanation: string; checked: boolean }[]>([
    {
      id: 'rule-70-30',
      label: 'Правило 70/30 (Базова матриця проти акцентів)',
      explanation: '70% площі квітника віддається спокійним структурним травам і ґрунтопокривним, і лише 30% — яскравим тимчасовим суцвіттям.',
      checked: true
    },
    {
      id: 'species-limit',
      label: 'Дисципліна стриманої палітри видів',
      explanation: 'Обмеження асортименту багаторічників до 7–9 взаємодоповнюючих сортів на 100 м² замість безладного колекціонування десятків поодиноких рослин.',
      checked: true
    },
    {
      id: 'stone-provenance',
      label: 'Єдине геологічне походження каменю',
      explanation: 'Використання лише однієї породи каменю (наприклад, тільки подільського вапняку або тільки карпатського пісковику) для стін, сходів і рокарію.',
      checked: true
    },
    {
      id: 'odd-groupings',
      label: 'Органічні непарні групи (3, 5, 7)',
      explanation: 'Висадка рослин аморфними взаємопроникними плямами по 3, 5 або 7 штук замість штучних прямих ліній чи поодиноких точок.',
      checked: false
    },
    {
      id: 'density-calc',
      label: 'Щільність змикання крони (6–8 рослин/м²)',
      explanation: 'Швидке природне закриття поверхні ґрунту листям, що зберігає вологу і позбавляє бур\'яни світла.',
      checked: false
    },
    {
      id: 'grade-respect',
      label: 'Повага до існуючого ухилу рельєфу',
      explanation: 'Вписування підпірних терас у природні горизонталі пагорба замість тотального зрізання шарів екскаватором.',
      checked: false
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
      catalog: '«По одній рослині кожного сорту» з садового центру (колекціонування етикеток)',
      natural: 'Матричні переплетені групи по 5–15 рослин одного сорту, що утворюють суцільні хвилі'
    },
    {
      criterion: 'Поведінка ґрунту',
      catalog: 'Відкритий чорнозем або фарбована кора, що вимагає постійного прополювання та хімікатів',
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
      natural: 'Стійка саморегульована екосистема: одна санітарна стрижка навесні (лютий/березень)'
    }
  ];

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F0E6] text-[#262925]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* CHAPTER HERO HEADER */}
        <div className="border-b border-[#A7B39A]/60 pb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#64765A] mb-3">
            <span className="px-2 py-0.5 bg-[#EAE4D5] rounded text-[#182C24] font-semibold">Глава 04</span>
            <span>//</span>
            <span>Філософія натуралізму</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#182C24] leading-tight">
            Простота і природність: <br />
            <span className="italic font-normal text-[#64765A]">Дисципліна матричного дизайну.</span>
          </h1>

          <p className="mt-4 text-base sm:text-xl text-[#64765A] max-w-3xl leading-relaxed font-light">
            Справжній природний сад виникає не тоді, коли більше нічого додати, а тоді, коли більше нічого не можна забрати без шкоди для цілісності середовища. Це відмова від штучної строкатості на користь спокійної сили дикої природи.
          </p>


        </div>

        {/* SECTION 1: THE 70/20/10 FORMULA */}
        <div className="bg-[#FAF8F3] p-8 sm:p-10 rounded-3xl border border-[#D6D0C3] shadow-sm space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Золота формула Нового Багаторічника
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Пропорція шарів: 70% Матриця // 20% Структура // 10% Спалахи
            </h2>
            <p className="mt-2 text-sm text-[#64765A] max-w-2xl leading-relaxed">
              Замість випадкового змішування сортів, натуралістичний сад будується за трьома чітко розмежованими екологічними ролями.
            </p>
          </div>

          {/* Visual Ratio Bar */}
          <div className="space-y-3">
            <div className="w-full h-8 rounded-xl overflow-hidden flex shadow-inner border border-[#D6D0C3]">
              <div className="bg-[#243E2C] h-full flex items-center justify-center text-[#F4F0E6] text-xs font-mono font-bold" style={{ width: '70%' }}>
                70% Матричний шар
              </div>
              <div className="bg-[#64765A] h-full flex items-center justify-center text-[#F4F0E6] text-xs font-mono font-bold" style={{ width: '20%' }}>
                20% Структура
              </div>
              <div className="bg-[#AD765B] h-full flex items-center justify-center text-[#F4F0E6] text-xs font-mono font-bold" style={{ width: '10%' }}>
                10%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#243E2C]" />
                  <h4 className="font-serif font-bold text-lg text-[#182C24]">70% Матричні трави</h4>
                </div>
                <p className="text-xs text-[#64765A] leading-relaxed">
                  Сеслерія, ковила, щучник, манжетка. Зелений або золотавий фон, що закриває всю площу і працює як жива мульча з весни до зими.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#64765A]" />
                  <h4 className="font-serif font-bold text-lg text-[#182C24]">20% Структурні солітери</h4>
                </div>
                <p className="text-xs text-[#64765A] leading-relaxed">
                  Шавлія дібровна, ехінацея, очитник видний. Рослини з міцним стеблом, які зберігають красивий скелет суцвіть навіть після відцвітання.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#AD765B]" />
                  <h4 className="font-serif font-bold text-lg text-[#182C24]">10% Сезонні спалахи</h4>
                </div>
                <p className="text-xs text-[#64765A] leading-relaxed">
                  Дикі тюльпани, алліуми, ліхніс. Яскраві короткі феєрверки, що спалахують на 2–3 тижні й зникають, не руйнуючи загальний вигляд.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: COMPARATIVE BREAKDOWN */}
        <div className="space-y-6 pt-6 border-t border-[#D6D0C3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
              Анатомія стилю
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
              Каталожний хаос проти природного біотопу
            </h2>
          </div>

          <div className="bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3] overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 bg-[#182C24] text-[#F4F0E6] p-4 text-xs font-mono uppercase tracking-wider font-semibold">
              <div className="col-span-3">Критерій проектування</div>
              <div className="col-span-4 text-[#D88C78]">[01] Традиційний декоративний підхід</div>
              <div className="col-span-5 text-[#A7B39A]">[02] Сталий природний біотоп</div>
            </div>

            <div className="divide-y divide-[#D6D0C3]">
              {comparisons.map((c, idx) => (
                <div key={idx} className="grid grid-cols-12 p-4 sm:p-5 text-xs items-center gap-3">
                  <div className="col-span-12 sm:col-span-3 font-serif font-bold text-[#182C24]">
                    {c.criterion}
                  </div>
                  <div className="col-span-12 sm:col-span-4 text-[#5A2920] bg-[#FAF0ED] p-3 rounded-xl border border-[#AD765B]/30 leading-relaxed">
                    {c.catalog}
                  </div>
                  <div className="col-span-12 sm:col-span-5 text-[#182C24] bg-[#EAEFE8] p-3 rounded-xl border border-[#64765A]/30 leading-relaxed font-medium">
                    {c.natural}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: INTERACTIVE CONCEPT AUDITOR CHECKLIST */}
        <div className="space-y-6 pt-6 border-t border-[#D6D0C3]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD765B] font-semibold block">
                Інтерактивний чек-аудит
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#182C24] mt-1">
                Перевірте свій проект на природність
              </h2>
            </div>

            {/* Score Ring / Pill */}
            <div className="flex items-center gap-3 p-3 bg-[#FAF8F3] rounded-2xl border border-[#D6D0C3] shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-mono text-[#64765A] block uppercase">Індекс природності</span>
                <span className="text-xl font-serif font-bold text-[#182C24]">{scorePercent}%</span>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                scorePercent >= 80 ? 'bg-emerald-800 text-white' : scorePercent >= 50 ? 'bg-amber-700 text-white' : 'bg-[#AD765B] text-white'
              }`}>
                {checkedCount}/6
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklist.map(item => (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  item.checked
                    ? 'bg-[#FAF8F3] border-[#64765A] shadow-sm ring-1 ring-[#64765A]/40'
                    : 'bg-white/60 border-[#D6D0C3] hover:bg-[#FAF8F3]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {item.checked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-800" />
                  ) : (
                    <Square className="w-5 h-5 text-[#A7B39A]" />
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-serif font-bold ${item.checked ? 'text-[#182C24]' : 'text-[#64765A]'}`}>
                    {item.label}
                  </h4>
                  <p className="mt-1 text-xs text-[#64765A] leading-relaxed">
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
