import React, { useState, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { CurriculumOverview } from './components/CurriculumOverview';
import { Footer } from './components/Footer';
import { PlantModal } from './components/PlantModal';
import { PageLayout } from './components/PageLayout';
import { PlantSpecies } from './types/botanical';
import { Sparkles } from 'lucide-react';

// Code-splitting via React.lazy for non-landing routes
const LandscapePrinciples = lazy(() =>
  import('./components/LandscapePrinciples').then(m => ({ default: m.LandscapePrinciples }))
);
const TransitionComparison = lazy(() =>
  import('./components/TransitionComparison').then(m => ({ default: m.TransitionComparison }))
);
const SimplicityNaturalness = lazy(() =>
  import('./components/SimplicityNaturalness').then(m => ({ default: m.SimplicityNaturalness }))
);
const AlpineGardenSection = lazy(() =>
  import('./components/AlpineGardenSection').then(m => ({ default: m.AlpineGardenSection }))
);
const RetainingWallSection = lazy(() =>
  import('./components/RetainingWallSection').then(m => ({ default: m.RetainingWallSection }))
);
const ClimbingPlantsSection = lazy(() =>
  import('./components/ClimbingPlantsSection').then(m => ({ default: m.ClimbingPlantsSection }))
);
const ColorLaboratory = lazy(() =>
  import('./components/ColorLaboratory').then(m => ({ default: m.ColorLaboratory }))
);
const PlantLibrary = lazy(() =>
  import('./components/PlantLibrary').then(m => ({ default: m.PlantLibrary }))
);
const LandscapeBuilder = lazy(() =>
  import('./components/LandscapeBuilder').then(m => ({ default: m.LandscapeBuilder }))
);
const CaseStudySection = lazy(() =>
  import('./components/CaseStudySection').then(m => ({ default: m.CaseStudySection }))
);
const MaintenanceCalendar = lazy(() =>
  import('./components/MaintenanceCalendar').then(m => ({ default: m.MaintenanceCalendar }))
);

// Botanical Loading Skeleton
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-12 text-center text-[#A7B39A]">
    <div className="w-10 h-10 rounded-full border-2 border-[#A7B39A]/20 border-t-[#AD765B] animate-spin mb-4" />
    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D6D0C3]">
      <Sparkles className="w-3.5 h-3.5 text-[#AD765B]" />
      <span>Завантаження ботанічного модуля...</span>
    </div>
  </div>
);

export const App: React.FC = () => {
  const [selectedPlant, setSelectedPlant] = useState<PlantSpecies | null>(null);

  const handleSelectPlant = (plant: PlantSpecies) => {
    setSelectedPlant(plant);
  };

  const handleCloseModal = () => {
    setSelectedPlant(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#F4F0E6] text-[#262925] font-sans selection:bg-[#64765A] selection:text-[#F4F0E6] flex flex-col justify-between">
        {/* Top Sticky Navigation Bar */}
        <Navigation />

        {/* Multi-Page Route Outlet */}
        <div className="flex-1">
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              {/* ROUTE 01 — HOME // CINEMATIC HERO & MASTER 3D GARDEN & CURRICULUM OVERVIEW */}
              <Route
                path="/"
                element={
                  <>
                    <HeroSection onSelectPlant={handleSelectPlant} />
                    <CurriculumOverview />
                  </>
                }
              />

              {/* ROUTE 02 — PRINCIPLES OF LANDSCAPE COMPOSITION */}
              <Route
                path="/principles"
                element={
                  <PageLayout>
                    <LandscapePrinciples />
                  </PageLayout>
                }
              />

              {/* ROUTE 03 — SMOOTH TRANSITIONS & VEGETATION TIERS */}
              <Route
                path="/transitions"
                element={
                  <PageLayout>
                    <TransitionComparison />
                  </PageLayout>
                }
              />

              {/* ROUTE 04 — SIMPLICITY & NATURALNESS */}
              <Route
                path="/naturalness"
                element={
                  <PageLayout>
                    <SimplicityNaturalness />
                  </PageLayout>
                }
              />

              {/* ROUTE 05 — ALPINE GARDENS 3D */}
              <Route
                path="/alpine-gardens"
                element={
                  <PageLayout>
                    <AlpineGardenSection onSelectPlant={handleSelectPlant} />
                  </PageLayout>
                }
              />

              {/* ROUTE 06 — RETAINING WALLS & DRAINAGE 3D */}
              <Route
                path="/retaining-walls"
                element={
                  <PageLayout>
                    <RetainingWallSection onSelectPlant={handleSelectPlant} />
                  </PageLayout>
                }
              />

              {/* ROUTE 07 — CLIMBING PLANTS & PERGOLAS 3D */}
              <Route
                path="/climbing-plants"
                element={
                  <PageLayout>
                    <ClimbingPlantsSection onSelectPlant={handleSelectPlant} />
                  </PageLayout>
                }
              />

              {/* ROUTE 08 — COLOR HARMONY LABORATORY */}
              <Route
                path="/color-laboratory"
                element={
                  <PageLayout>
                    <ColorLaboratory onSelectPlant={handleSelectPlant} />
                  </PageLayout>
                }
              />

              {/* ROUTE 09 — BOTANICAL HERBARIUM & PLANT ATLAS */}
              <Route
                path="/plant-library"
                element={
                  <PageLayout>
                    <PlantLibrary onSelectPlant={handleSelectPlant} />
                  </PageLayout>
                }
              />

              {/* ROUTE 10 — 3D LANDSCAPE DESIGN STUDIO (SANDBOX) */}
              <Route
                path="/landscape-builder"
                element={
                  <PageLayout>
                    <LandscapeBuilder standalone={true} />
                  </PageLayout>
                }
              />

              {/* ROUTE 11 — CASE STUDY: VILLA TERRENA */}
              <Route
                path="/case-study"
                element={
                  <PageLayout>
                    <CaseStudySection />
                  </PageLayout>
                }
              />

              {/* ROUTE 12 — MAINTENANCE CALENDAR & PHENOLOGY */}
              <Route
                path="/calendar"
                element={
                  <PageLayout>
                    <MaintenanceCalendar />
                  </PageLayout>
                }
              />

              {/* ALL-IN-ONE MONOLITHIC VIEW FOR CONTINUOUS READING */}
              <Route
                path="/all-in-one"
                element={
                  <main>
                    <HeroSection onSelectPlant={handleSelectPlant} />
                    <LandscapePrinciples />
                    <TransitionComparison />
                    <SimplicityNaturalness />
                    <AlpineGardenSection onSelectPlant={handleSelectPlant} />
                    <RetainingWallSection onSelectPlant={handleSelectPlant} />
                    <ClimbingPlantsSection onSelectPlant={handleSelectPlant} />
                    <ColorLaboratory onSelectPlant={handleSelectPlant} />
                    <PlantLibrary onSelectPlant={handleSelectPlant} />
                    <LandscapeBuilder standalone={false} />
                    <CaseStudySection />
                    <MaintenanceCalendar />
                  </main>
                }
              />

              {/* FALLBACK REDIRECT */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>

        {/* Editorial Footer */}
        <Footer />

        {/* Global Botanical Specimen Modal */}
        <PlantModal
          plant={selectedPlant}
          onClose={handleCloseModal}
          onSelectCompanion={(comp) => setSelectedPlant(comp)}
        />
      </div>
    </HashRouter>
  );
};

export default App;
