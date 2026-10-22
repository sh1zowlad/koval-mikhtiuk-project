import React, { useState, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { Footer } from './components/Footer';
import { PlantModal } from './components/PlantModal';
import { PageLayout } from './components/PageLayout';
import { PlantSpecies } from './types/botanical';

// Lazy-loaded Core Page Pillars for optimal bundle performance
const CompositionPage = lazy(() =>
  import('./pages/CompositionPage').then(m => ({ default: m.CompositionPage }))
);
const Spaces3DPage = lazy(() =>
  import('./pages/Spaces3DPage').then(m => ({ default: m.Spaces3DPage }))
);
const AtlasPage = lazy(() =>
  import('./pages/AtlasPage').then(m => ({ default: m.AtlasPage }))
);
const StudioPage = lazy(() =>
  import('./pages/StudioPage').then(m => ({ default: m.StudioPage }))
);

// Gentle natural loading state
const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-12 text-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#A7B39A]/30 border-t-[#AD765B] animate-spin mb-3.5" />
    <span className="text-sm font-sans text-[#262925]/75 font-light">
      Підготовка експозиції...
    </span>
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
              {/* PILLAR 01 — HOME // CINEMATIC HERO & 3D MASTER GARDEN */}
              <Route
                path="/"
                element={<HeroSection onSelectPlant={handleSelectPlant} />}
              />

              {/* PILLAR 02 — COMPOSITION & COLOR THEORY */}
              <Route
                path="/composition"
                element={
                  <PageLayout>
                    <CompositionPage onSelectPlant={handleSelectPlant} />
                  </PageLayout>
                }
              />

              {/* PILLAR 03 — 3D SPATIAL PAVILION (ALPINE, WALLS, CLIMBERS) */}
              <Route
                path="/spaces-3d"
                element={
                  <PageLayout>
                    <Spaces3DPage onSelectPlant={handleSelectPlant} />
                  </PageLayout>
                }
              />

              {/* SECTION 04 — BOTANICAL ATLAS */}
              <Route
                path="/atlas"
                element={
                  <PageLayout>
                    <AtlasPage onSelectPlant={handleSelectPlant} />
                  </PageLayout>
                }
              />

              {/* SECTION 05 — 3D LANDSCAPE BUILDER */}
              <Route
                path="/studio"
                element={
                  <PageLayout>
                    <StudioPage />
                  </PageLayout>
                }
              />

              {/* BACKWARD-COMPATIBLE ROUTE REDIRECTS (PREVENTS BROKEN BOOKMARKS) */}
              <Route path="/principles" element={<Navigate to="/composition" replace />} />
              <Route path="/transitions" element={<Navigate to="/composition" replace />} />
              <Route path="/naturalness" element={<Navigate to="/composition" replace />} />
              <Route path="/color-laboratory" element={<Navigate to="/composition" replace />} />

              <Route path="/alpine-gardens" element={<Navigate to="/spaces-3d" replace />} />
              <Route path="/retaining-walls" element={<Navigate to="/spaces-3d" replace />} />
              <Route path="/climbing-plants" element={<Navigate to="/spaces-3d" replace />} />

              <Route path="/plant-library" element={<Navigate to="/atlas" replace />} />
              <Route path="/calendar" element={<Navigate to="/atlas" replace />} />

              <Route path="/landscape-builder" element={<Navigate to="/studio" replace />} />
              <Route path="/case-study" element={<Navigate to="/studio" replace />} />

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
