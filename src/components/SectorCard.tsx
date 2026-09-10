import React from 'react';
import { SectorData } from '../types';
import { 
  ArrowRight, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Factory, 
  Clapperboard, 
  Sprout, 
  BookOpen, 
  Briefcase, 
  CheckCircle2,
  FileText
} from 'lucide-react';

interface SectorCardProps {
  sector: SectorData;
  onExplore: (id: string) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu': return <Cpu className="w-4 h-4 text-blue-600" />;
    case 'Zap': return <Zap className="w-4 h-4 text-emerald-600" />;
    case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-amber-600" />;
    case 'Factory': return <Factory className="w-4 h-4 text-indigo-600" />;
    case 'Clapperboard': return <Clapperboard className="w-4 h-4 text-rose-600" />;
    case 'Sprout': return <Sprout className="w-4 h-4 text-teal-600" />;
    default: return <Cpu className="w-4 h-4 text-blue-600" />;
  }
};

export const SectorCard: React.FC<SectorCardProps> = ({ sector, onExplore }) => {
  return (
    <div 
      className="group relative flex flex-col justify-between bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-300"
      id={`sector-card-${sector.id}`}
    >
      {/* Top Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img 
          src={sector.imageUrl} 
          alt={sector.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Floating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs">
          {getIcon(sector.iconName)}
          <span>{sector.badge}</span>
        </div>

        {/* PDF indicator pill */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold border border-red-200/80 shadow-2xs">
          <FileText className="w-3 h-3 text-red-600" />
          <span>PDF Report</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors font-['Outfit']">
            {sector.name}
          </h3>
          
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {sector.tagline}
          </p>

          {/* Quick Stats / Highlights */}
          <div className="space-y-1.5 py-3 border-y border-slate-100 mb-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">
                {sector.industrySkills.length} Industry Skill Domains Mapped
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                {sector.courses.global.length + sector.courses.iitNptel.length} Verified University Courses
              </span>
            </div>
            {sector.hiringCompanies && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>
                  {sector.hiringCompanies.length} Employer Hiring Portals
                </span>
              </div>
            )}
          </div>

          {/* Key Skill Highlights Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {sector.futureSkills.slice(0, 3).map((skill, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-50 text-slate-700 border border-slate-200"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onExplore(sector.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            id={`explore-btn-${sector.id}`}
          >
            <span>View Report</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
