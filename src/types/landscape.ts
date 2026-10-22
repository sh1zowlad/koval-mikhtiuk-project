import { PlantSpecies } from './botanical';

export interface LandscapePrinciple {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  definition: string;
  importance: string;
  application: string;
  botanicalExamples: string[];
  commonMistakes: string;
  visualTarget: {
    x: number; // percentage in diagram
    y: number;
    label: string;
  };
}

export type AlpineGardenStyleId = 'mountain-scree' | 'minimalist' | 'colorful-tapestry';

export interface AlpineGardenStyle {
  id: AlpineGardenStyleId;
  name: string;
  tagline: string;
  description: string;
  stoneMaterial: string;
  gravelMulch: string;
  keySpecies: string[];
  visualCharacter: string;
  drainageFocus: string;
}

export type RetainingWallId = 'natural-stone' | 'dry-stone' | 'board-concrete' | 'pocket-wall';

export interface RetainingWallConcept {
  id: RetainingWallId;
  name: string;
  subtitle: string;
  description: string;
  material: string;
  visualCharacter: string;
  drainageSystem: string;
  suitablePlants: string[];
  structuralNotes: string;
  heightRecommendation: string;
}

export type Season = 'Весна' | 'Літо' | 'Осінь' | 'Зима' | 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export interface ClimberSpecies {
  id: string;
  botanicalName: string;
  commonName: string;
  mechanism: string;
  supportType: string;
  matureHeight: string;
  seasonalNotes: Record<string, string>;
  pruningNotes: string;
  warningNote?: string;
  leafShape: 'lobed' | 'pinnate' | 'oval' | 'serrated';
  flowerTone: string;
}

export interface ColorPalette {
  id: string;
  title: string;
  subtitle: string;
  dominantColors: string[]; // hex codes
  foliageFoundation: string;
  floweringAccents: string;
  seasonalMood: string;
  bloomWindow: string;
  soilSunRequirements: string;
  keyPlants: PlantSpecies[];
  rationale: string;
}

export interface PlaygroundConfig {
  style: 'naturalistic' | 'alpine-rockery' | 'contemporary-zen' | 'woodland-edge';
  size: 'pocket-courtyard' | 'medium-terrace' | 'estate-slope';
  terrain: 'gentle-undulating' | 'terraced-slope' | 'sunken-scree';
  paletteId: string;
  wallType: RetainingWallId;
  climberId: string;
  focalPoint: 'specimen-pine' | 'megalithic-boulder' | 'curving-stone-stair' | 'water-basin';
}
