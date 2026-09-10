/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SECTORS_DATA } from './data/sectorData';
import { Navbar } from './components/Navbar';
import { WelcomeHero } from './components/WelcomeHero';
import { HeroSection } from './components/HeroSection';
import { SectorGrid } from './components/SectorGrid';
import { SectorDetailView } from './components/SectorDetailView';
import { InfoSections } from './components/InfoSections';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';

export default function App() {
  const [selectedSectorId, setSelectedSectorId] = useState<string | null>(null);
  const [isWelcomeView, setIsWelcomeView] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const sectorsList = Object.values(SECTORS_DATA);

  // Sync with URL parameter or hash if present on load or change
  useEffect(() => {
    const handleUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get('id');
      const hash = window.location.hash.replace('#', '');

      if (idParam && SECTORS_DATA[idParam]) {
        setSelectedSectorId(idParam);
        setIsWelcomeView(false);
      } else if (hash && SECTORS_DATA[hash]) {
        setSelectedSectorId(hash);
        setIsWelcomeView(false);
      }
    };

    handleUrlState();
    window.addEventListener('popstate', handleUrlState);
    return () => window.removeEventListener('popstate', handleUrlState);
  }, []);

  const handleSelectSector = (id: string) => {
    setIsWelcomeView(false);
    setSelectedSectorId(id);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('id', id);
    window.history.pushState({}, '', newUrl.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedSectorId(null);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('id');
    window.history.pushState({}, '', newUrl.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterSite = () => {
    setIsWelcomeView(false);
    setSelectedSectorId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSector = selectedSectorId ? SECTORS_DATA[selectedSectorId] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navigation Bar - Only shown after user enters the website, hidden on the Welcome page */}
      {!isWelcomeView && (
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectSector={handleSelectSector}
          selectedSectorId={selectedSectorId}
          onGoHome={handleGoHome}
          isWelcomeView={isWelcomeView}
          onToggleWelcome={(showWelcome) => {
            setIsWelcomeView(showWelcome);
            if (showWelcome) {
              setSelectedSectorId(null);
            }
          }}
        />
      )}

      {/* Main Content Area */}
      {isWelcomeView ? (
        <WelcomeHero
          sectors={sectorsList}
          onEnterSite={handleEnterSite}
          onDirectSector={handleSelectSector}
        />
      ) : currentSector ? (
        <SectorDetailView
          sector={currentSector}
          onBack={handleGoHome}
          onSelectOtherSector={handleSelectSector}
          allSectors={sectorsList}
        />
      ) : (
        <main>
          <HeroSection
            onExploreClick={() => {
              const element = document.getElementById('sectors');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            onSelectSector={handleSelectSector}
          />

          <SectorGrid
            sectors={sectorsList}
            onSelectSector={handleSelectSector}
          />

          <InfoSections
            onExploreSector={handleSelectSector}
          />
        </main>
      )}

      {/* Footer - Only shown when inside the website */}
      {!isWelcomeView && (
        <Footer
          sectors={sectorsList}
          onSelectSector={handleSelectSector}
        />
      )}

      {/* Global Quick Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        sectors={sectorsList}
        onSelectSector={handleSelectSector}
      />

    </div>
  );
}

