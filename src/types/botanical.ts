export type PlantCategory = 
  | 'alpine'
  | 'groundcover'
  | 'grass'
  | 'perennial'
  | 'shrub'
  | 'tree'
  | 'climber'
  | 'crevice';

export type LightRequirement = 'Full Sun' | 'Partial Shade' | 'Full Shade' | 'Sun to Partial' | 'Full Sun (Roots Shaded)';
export type MoistureLevel = 'Very Low (Dry Scree)' | 'Low to Moderate' | 'Moderate' | 'Moist, Well-Drained';
export type SoilDrainage = 'Sharp/Gravel Scree' | 'Well-Drained Loam' | 'Rich Organic' | 'Sandy/Rocky Loam' | 'Gritty Calciferous';

export interface PlantSpecies {
  id: string;
  botanicalName: string;
  commonName: string;
  category: PlantCategory;
  family: string;
  matureHeight: string; // e.g. "15–20 cm"
  matureSpread: string; // e.g. "30–45 cm"
  light: LightRequirement;
  soil: SoilDrainage;
  moisture: MoistureLevel;
  bloomPeriod: string; // e.g. "May – July"
  foliageColor: string; // e.g. "Silvery blue-green, evergreen rosettes"
  flowerColor: string; // e.g. "Star-shaped pinkish-red"
  seasonalInterest: string;
  landscapeApplication: string;
  companionPlants: string[];
  maintenance: string;
  hardinessZone: string; // e.g. "USDA 4–8"
  soilPh?: string; // e.g. "Лужний / Кальцефітний (pH 7.2–8.2)"
  description: string;
  colorHex: string; // representative dominant color
}
