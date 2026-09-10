import React from 'react';
import { ArrowRight, Sparkles, Database, GraduationCap, Building2, Layers, Cpu, FileText, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onSelectSector: (sectorId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onSelectSector
}) => {
  return (
    <section id="home" className="relative pt-10 pb-16 overflow-hidden bg-white border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
       

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-5 font-['Outfit']">
          Impact of AI & Automation Across <br className="hidden sm:block" />
          <span className="text-blue-600">
            Key Economic Sectors
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8">
          Explore complete industry research reports. Discover how Artificial Intelligence, automation, and digital skills are transforming workforce demands across <strong>IT & Digital</strong>, <strong>EVs & Renewables</strong>, <strong>Finance & Banking</strong>, <strong>Manufacturing & Industry 4.0</strong>, and <strong>Media & Creative Services</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
            id="hero-explore-all-btn"
          >
            <span>Explore All 5 Sectors</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          
            
          
        </div>

        {/* Fast Sector Quick Pills */}
       
      

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10 text-left">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Sector Reports</p>
            <p className="text-2xl font-bold text-slate-900 font-['Outfit']">6 In-Depth</p>
            <p className="text-xs text-slate-500 mt-0.5">Problem statements mapped</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">University Courses</p>
            <p className="text-2xl font-bold text-blue-600 font-['Outfit']">45+ Programs</p>
            <p className="text-xs text-slate-500 mt-0.5">Harvard, MIT, IITs, NPTEL</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Government Schemes</p>
            <p className="text-2xl font-bold text-emerald-600 font-['Outfit']">25+ Schemes</p>
            <p className="text-xs text-slate-500 mt-0.5">National & state policies</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Employer Portals</p>
            <p className="text-2xl font-bold text-indigo-600 font-['Outfit']">100% Direct</p>
            <p className="text-xs text-slate-500 mt-0.5">Verified career targets</p>
          </div>
        </div>

      </div>
    </section>
  );
};
