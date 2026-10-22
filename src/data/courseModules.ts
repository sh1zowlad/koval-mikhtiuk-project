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

// 5 Core Spatial Presentation Sections of KOVAL MIKHTIUK PROJECT
export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'hero',
    path: '/',
    number: '01',
    title: 'Головна панорама саду',
    shortTitle: 'Головна 3D',
    category: 'Презентація 3D',
    description: 'Кінематографічне інтерактивне середовище Three.js з ракурсами камери, сонячним освітленням та ботанічними хотспотами.',
    has3D: true,
    badge: '3D Сад'
  },
  {
    id: 'composition',
    path: '/composition',
    number: '02',
    title: 'Теорія, закони композиції та колір',
    shortTitle: 'Композиція',
    category: 'Концепція & Колористика',
    description: 'Фундаментальні закони масштабу, інтерактивний повзунок плавних переходів «До/Після», матриця 70/30 та лабораторія кольору.',
    badge: 'Інтерактив'
  },
  {
    id: 'spaces-3d',
    path: '/spaces-3d',
    number: '03',
    title: '3D Інженерні простори та конструкції',
    shortTitle: '3D Простори',
    category: 'Інженерія та 3D WebGL',
    description: 'Повний 3D-павільйон: тривимірний альпінарій, гравітаційна підпірна стінка з рентген-зрізом дренажу та пергола з виткими ліанами.',
    has3D: true,
    badge: '3D WebGL'
  },
  {
    id: 'atlas',
    path: '/atlas',
    number: '04',
    title: 'Ботанічний атлас флори проєкту',
    shortTitle: 'Ботанічний Атлас',
    category: 'Флора проєкту',
    description: 'Колекція 24 відібраних рослинних компонентів проєкту з фільтрами за ґрунтом, світлом та ярусністю.',
    badge: '24 Види'
  },
  {
    id: 'studio',
    path: '/studio',
    number: '05',
    title: '3D Конструктор ландшафтного простору',
    shortTitle: '3D Конструктор',
    category: '3D Моделювання',
    description: 'Параметричний інтерактивний 3D-конструктор ділянки з вибором рослин, каменю та освітлення.',
    has3D: true,
    badge: '3D Редактор'
  }
];

// Helper to look up active section by current pathname
export const getModuleByPath = (path: string): CourseModule | undefined => {
  // Direct match
  const direct = COURSE_MODULES.find(m => m.path === path);
  if (direct) return direct;

  // Legacy mappings for backwards-compatible redirects
  if (['/principles', '/transitions', '/naturalness', '/color-laboratory'].includes(path)) {
    return COURSE_MODULES.find(m => m.id === 'composition');
  }
  if (['/alpine-gardens', '/retaining-walls', '/climbing-plants'].includes(path)) {
    return COURSE_MODULES.find(m => m.id === 'spaces-3d');
  }
  if (['/plant-library', '/calendar'].includes(path)) {
    return COURSE_MODULES.find(m => m.id === 'atlas');
  }
  if (['/landscape-builder', '/case-study'].includes(path)) {
    return COURSE_MODULES.find(m => m.id === 'studio');
  }

  return undefined;
};

// Helper for Prev / Next navigation
export const getPrevNextModules = (path: string) => {
  const current = getModuleByPath(path);
  if (!current) return { prev: null, next: null };

  const currentIndex = COURSE_MODULES.findIndex(m => m.id === current.id);
  const prev = currentIndex > 0 ? COURSE_MODULES[currentIndex - 1] : null;
  const next = currentIndex < COURSE_MODULES.length - 1 ? COURSE_MODULES[currentIndex + 1] : null;

  return { prev, next };
};
