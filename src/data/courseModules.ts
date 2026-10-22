export interface CourseModule {
  id: string;
  path: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  badge?: string;
  has3D?: boolean;
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'hero',
    path: '/',
    number: '01',
    title: 'Головна панорама саду',
    shortTitle: '01 Головна // 3D Сад',
    category: 'Вступ та 3D Модель',
    description: 'Кінематографічне тривимірне середовище Three.js з 5 ракурсами камери та інтерактивними хотспотами.',
    has3D: true,
    badge: '3D Панорама'
  },
  {
    id: 'principles',
    path: '/principles',
    number: '02',
    title: 'Граматика простору та закони композиції',
    shortTitle: '02 Закони композиції',
    category: 'Теорія композиції',
    description: '10 фундаментальних принципів натуралістичного дизайну: фокусні домінанти, ритм, негативний простір та баланс.'
  },
  {
    id: 'transitions',
    path: '/transitions',
    number: '03',
    title: 'Плавні переходи та ярусний рух',
    shortTitle: '03 Плавні переходи',
    category: 'Просторова динаміка',
    description: 'Інтерактивний повзунок «До/Після»: порівняння різких штучних меж проти 4-ярусного безшовного екотону.'
  },
  {
    id: 'naturalness',
    path: '/naturalness',
    number: '04',
    title: 'Простота, природність та автентичність',
    shortTitle: '04 Простота і матриця',
    category: 'Філософія дизайну',
    description: 'Матричне співвідношення 70/30, позбавлення «каталожного синдрому» та інтерактивний аудит концепту.'
  },
  {
    id: 'alpine',
    path: '/alpine-gardens',
    number: '05',
    title: 'Альпінарії та кам\'янисті сади',
    shortTitle: '05 Альпінарій 3D',
    category: 'Гірський рельєф',
    description: 'Тривимірний морфінг 3 стилів альпінарію, 5-шаровий геологічний розріз дренажу та адаптовані види.',
    has3D: true,
    badge: '3D WebGL'
  },
  {
    id: 'walls',
    path: '/retaining-walls',
    number: '06',
    title: 'Підпірні стінки та геопластика схилів',
    shortTitle: '06 Підпірні стінки 3D',
    category: 'Інженерія та камінь',
    description: 'Рентген-зріз дренажної системи стінки, норми ДБН В.2.1-10:2018 та 4 конструктивні матеріали.',
    has3D: true,
    badge: '3D WebGL'
  },
  {
    id: 'climbers',
    path: '/climbing-plants',
    number: '07',
    title: 'Виткі рослини та вертикальні структури',
    shortTitle: '07 Виткі ліани 3D',
    category: 'Вертикальний вимір',
    description: 'Інтерактивна 3D пергола з симуляцією 4 пір року, механізми кріплення вусиками, корінцями та стеблами.',
    has3D: true,
    badge: '3D WebGL'
  },
  {
    id: 'color',
    path: '/color-laboratory',
    number: '08',
    title: 'Лабораторія кольору та сезонні гармонії',
    shortTitle: '08 Колірні поєднання',
    category: 'Колористика',
    description: '6 природних колористичних палітр, векторний дрейф відтінків за 12 місяцями та баланс фактур.'
  },
  {
    id: 'library',
    path: '/plant-library',
    number: '09',
    title: 'Ботанічний гербарій та атлас флори',
    shortTitle: '09 Гербарій рослин',
    category: 'Ботанічний атлас',
    description: '24 верифіковані види рослин із бінарною номенклатурою ICN, фільтрами інсоляції та детальними досьє.'
  },
  {
    id: 'playground',
    path: '/landscape-builder',
    number: '10',
    title: 'Інтерактивна 3D Дизайн-студія',
    shortTitle: '10 Студія 3D',
    category: 'Генератор саду',
    description: 'Параметричний 3D-генератор саду з розрахунком матеріалів, вибором освітлення та паспортом проекту.',
    has3D: true,
    badge: '3D Студія'
  },
  {
    id: 'casestudy',
    path: '/case-study',
    number: '11',
    title: 'Практичний кейс: «Вілла Терена на схилі»',
    shortTitle: '11 Кейс-проєкт',
    category: 'Реальний об\'єкт',
    description: 'Покрокова реалізація ділянки на схилі 22° площею 450 м²: 8 будівельних фаз із кресленнями.'
  },
  {
    id: 'calendar',
    path: '/calendar',
    number: '12',
    title: 'Календар агротехніки та фенологія',
    shortTitle: '12 Календар догляду',
    category: 'Експлуатація саду',
    description: 'Поквартальний регламент сезонних робіт за зонами, збереження біорізноманіття та фенофази.'
  }
];

export function getModuleByPath(pathname: string): CourseModule | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/') {
    return COURSE_MODULES[0];
  }
  return COURSE_MODULES.find(m => m.path.toLowerCase() === clean.toLowerCase());
}

export function getPrevNextModules(currentPath: string): { prev?: CourseModule; next?: CourseModule } {
  const clean = currentPath.replace(/\/+$/, '') || '/';
  const currentIndex = COURSE_MODULES.findIndex(m => m.path.toLowerCase() === clean.toLowerCase());
  if (currentIndex === -1) return {};

  const prev = currentIndex > 0 ? COURSE_MODULES[currentIndex - 1] : undefined;
  const next = currentIndex < COURSE_MODULES.length - 1 ? COURSE_MODULES[currentIndex + 1] : undefined;

  return { prev, next };
}
