import React from 'react';
import { SectorData } from '../types';
import { Sparkles, Layers } from 'lucide-react';

interface FooterProps {
  sectors: SectorData[];
  onSelectSector: (sectorId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ sectors, onSelectSector }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg  flex items-center justify-center text-white">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-white tracking-wide font-['Outfit']">
                RECAMEND
              </h3>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Analyzing how Artificial Intelligence, automation, and green technologies are transforming sectoral workforce requirements, educational curricula, and employment pathways.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All 5 Sector Reports Ready</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-['Outfit']">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#sectors" className="hover:text-blue-400 transition-colors">
                  Explore All 5 Sectors
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-blue-400 transition-colors">
                  AI Benefits & Productivity
                </a>
              </li>
              <li>
                <a href="#challenges" className="hover:text-blue-400 transition-colors">
                  Challenges & Ethical Safeguards
                </a>
              </li>
              <li>
                <a href="#future" className="hover:text-blue-400 transition-colors">
                  Future Horizon
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Sector Exploration */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-['Outfit']">
              Sector Reports
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400">
              {sectors.map((sec) => (
                <li key={sec.id}>
                  <button
                    onClick={() => onSelectSector(sec.id)}
                    className="hover:text-blue-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="text-blue-500 font-bold">›</span>
                    <span>{sec.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 AI Impact Across Sectors. Comprehensive Academic & Industry Skill Framework.</p>
          <div className="flex items-center gap-3">
            <span>AI • Industry 4.0 • Policy • Future Skills</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
