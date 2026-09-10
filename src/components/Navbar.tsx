import React from 'react';
import { Search, FileText, CheckCircle2, Database, Award, Sparkles, Home } from 'lucide-react';
import logo from '../assets/logo.jpeg';

interface NavbarProps {
  onOpenSearch: () => void;
  onSelectSector: (sectorId: string) => void;
  selectedSectorId: string | null;
  onGoHome: () => void;
  isWelcomeView: boolean;
  onToggleWelcome: (showWelcome: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onSelectSector,
  selectedSectorId,
  onGoHome,
  isWelcomeView,
  onToggleWelcome
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Brand / Logo */}
        <div 
          onClick={() => {
            onToggleWelcome(true);
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          id="nav-brand-logo"
        >
             <div>
            <div className="flex items-center gap-2">
              {/* Logo */}
              <img
                src={logo}
                alt="Recamend Logo"
                className="w-9 h-9 object-contain shrink-0 rounded-md"
              />
              <span className="font-bold text-lg tracking-tight text-white font-['Outfit'] group-hover:text-blue-400 transition-colors">
                RECAMEND
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden lg:block">We Recamend You Up Skills</p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-sm sm:max-w-md mx-auto">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2 text-xs text-slate-400 bg-slate-800/80 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/80 rounded-xl transition-all hover:border-blue-500/50 shadow-inner cursor-pointer"
            id="nav-search-button"
            title="Search sectors, courses, skills & schemes (Ctrl+K)"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">Search sectors, skills, courses...</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700 rounded-md">
                ⌘K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          <nav className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
           

            <a 
              href="#benefits"
              onClick={() => onToggleWelcome(false)}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
              id="nav-benefits-link"
            >
              Benefits
            </a>

            <a 
              href="#challenges"
              onClick={() => onToggleWelcome(false)}
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
              id="nav-challenges-link"
            >
              Challenges
            </a>
          </nav>

        </div>

      </div>
    </header>
  );
};
