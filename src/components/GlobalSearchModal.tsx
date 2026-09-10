import React, { useState, useEffect } from 'react';
import { SectorData } from '../types';
import { Search, X, BookOpen, Landmark, Building2, Cpu, ArrowRight } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectors: SectorData[];
  onSelectSector: (sectorId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  sectors,
  onSelectSector
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search aggregations
  const results: {
    type: 'course' | 'scheme' | 'company' | 'skill';
    sectorId: string;
    sectorName: string;
    title: string;
    subtitle: string;
    link?: string;
  }[] = [];

  if (query.trim().length > 1) {
    const q = query.toLowerCase();

    sectors.forEach(sec => {
      // Courses
      [...sec.courses.global, ...sec.courses.iitNptel].forEach(c => {
        if (c.title.toLowerCase().includes(q) || c.skills.toLowerCase().includes(q) || c.institution.toLowerCase().includes(q)) {
          results.push({
            type: 'course',
            sectorId: sec.id,
            sectorName: sec.name,
            title: c.title,
            subtitle: `${c.institution} • ${c.costStatus}`,
            link: c.sourceUrl
          });
        }
      });

      // Schemes
      [...sec.govtSchemes.online, ...sec.govtSchemes.offline, ...sec.govtSchemes.blended].forEach(s => {
        if (s.name.toLowerCase().includes(q) || s.advantages.toLowerCase().includes(q)) {
          results.push({
            type: 'scheme',
            sectorId: sec.id,
            sectorName: sec.name,
            title: s.name,
            subtitle: `${s.level} Scheme • ${s.mode || 'Training'}`,
            link: s.sourceUrl
          });
        }
      });

      // Companies
      if (sec.hiringCompanies) {
        sec.hiringCompanies.forEach(comp => {
          if (comp.name.toLowerCase().includes(q) || comp.roles.some(r => r.toLowerCase().includes(q))) {
            results.push({
              type: 'company',
              sectorId: sec.id,
              sectorName: sec.name,
              title: comp.name,
              subtitle: `Roles: ${comp.roles.slice(0, 3).join(', ')}`,
              link: comp.careerUrl
            });
          }
        });
      }

      // Future skills
      sec.futureSkills.forEach(fs => {
        if (fs.name.toLowerCase().includes(q) || fs.description.toLowerCase().includes(q)) {
          results.push({
            type: 'skill',
            sectorId: sec.id,
            sectorName: sec.name,
            title: fs.name,
            subtitle: fs.description
          });
        }
      });
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search input header */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search all courses, schemes, skills, companies (e.g. BMS, Harvard, NPTEL, Tata, Finacle)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 text-sm placeholder-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-slate-500 hover:text-slate-900 px-2 py-1 bg-slate-200 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {query.trim().length <= 1 ? (
            <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
              <p className="font-semibold text-slate-600">Quick Searches</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                {['BMS', 'Python', 'Harvard CS50', 'Tata Motors', 'SEBI', 'VFX', 'Industry 4.0', 'Kisan Drone'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-md text-xs bg-slate-100 text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            results.slice(0, 15).map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectSector(item.sectorId);
                  onClose();
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    {item.type === 'course' && <BookOpen className="w-3.5 h-3.5" />}
                    {item.type === 'scheme' && <Landmark className="w-3.5 h-3.5" />}
                    {item.type === 'company' && <Building2 className="w-3.5 h-3.5" />}
                    {item.type === 'skill' && <Cpu className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-blue-600">
                        {item.title}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] uppercase font-bold bg-slate-200 text-slate-600">
                        {item.sectorName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs sm:text-sm">
              No results found for "{query}". Try a different keyword.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search across 6 Detailed Sector Reports</span>
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded font-mono text-[10px]">ESC</kbd> to close</span>
          </div>
        </div>

      </div>

    </div>
  );
};
