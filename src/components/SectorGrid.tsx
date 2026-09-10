import React, { useState } from 'react';
import { SectorData } from '../types';
import { SectorCard } from './SectorCard';
import { Search, Sparkles } from 'lucide-react';

interface SectorGridProps {
  sectors: SectorData[];
  onSelectSector: (id: string) => void;
}

export const SectorGrid: React.FC<SectorGridProps> = ({ sectors, onSelectSector }) => {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredSectors = sectors.filter((sec) => {
    const matchesSearch = 
      sec.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      sec.tagline.toLowerCase().includes(filterQuery.toLowerCase()) ||
      sec.futureSkills.some(fs => fs.name.toLowerCase().includes(filterQuery.toLowerCase())) ||
      sec.courses.global.some(c => c.title.toLowerCase().includes(filterQuery.toLowerCase())) ||
      sec.courses.iitNptel.some(c => c.title.toLowerCase().includes(filterQuery.toLowerCase()));

    return matchesSearch;
  });

  return (
    <section id="sectors" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
         
    
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Explore All 5 Sector Reports
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
            Click on any sector to uncover the complete research analysis, demanded skills, government schemes, top university courses, and career application links.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search in sectors (e.g. BMS, Python, VFX)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs transition-all"
            />
            {filterQuery && (
              <button 
                onClick={() => setFilterQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Sector Cards */}
      {filteredSectors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSectors.map((sector) => (
            <SectorCard
              key={sector.id}
              sector={sector}
              onExplore={onSelectSector}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-base text-slate-800 font-bold">No sectors matching "{filterQuery}"</p>
          <p className="text-xs text-slate-500 mt-1">Try searching for terms like "AI", "EV", "Finance", "Industry", or "Animation".</p>
          <button
            onClick={() => setFilterQuery('')}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            Reset Search
          </button>
        </div>
      )}
    </section>
  );
};
