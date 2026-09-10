import React, { useState } from 'react';
import { SectorData, UserSubmission } from '../types';
import { SectorAssessmentModal } from './SectorAssessmentModal';
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  ExternalLink, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Building, 
  Landmark, 
  Layers, 
  Calendar, 
  Target, 
  Compass, 
  ShieldAlert, 
  FileText,
  Printer,
  Award,
  ChevronRight
} from 'lucide-react';

interface SectorDetailViewProps {
  sector: SectorData;
  onBack: () => void;
  onSelectOtherSector: (id: string) => void;
  allSectors: SectorData[];
}

export const SectorDetailView: React.FC<SectorDetailViewProps> = ({
  sector,
  onBack,
  onSelectOtherSector,
  allSectors
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ai_skills' | 'schemes_courses' | 'policies_jobs' | 'roadmap_conclusion'>('overview');
  const [copied, setCopied] = useState(false);
  const [courseFilter, setCourseFilter] = useState<'all' | 'govt_online' | 'govt_offline' | 'govt_blended' | 'global_uni' | 'iit_nptel'>('all');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Floating Action Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
              id="back-to-sectors-btn"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span>Back</span>
            </button>

            {/* Breadcrumbs */}
            <nav className="text-xs text-slate-400 hidden sm:flex items-center gap-2">
              <span className="cursor-pointer hover:text-slate-600" onClick={onBack}>Explore</span>
              <span>/</span>
              <span>Sectors</span>
              <span>/</span>
              <span className="text-slate-900 font-semibold truncate max-w-[200px]">{sector.name}</span>
            </nav>
          </div>

          {/* Quick Sector Switcher Dropdown, Take Test & Utilities */}
          <div className="flex items-center gap-2">
            
            {/* Direct Take Test Button in Top Bar */}
            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
              id="take-sector-test-top-btn"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Take Sector Test</span>
            </button>

            
            

            

           
          </div>

        </div>
      </div>

      {/* Hero Header for the Selected Sector */}
      <div className="relative border-b border-slate-200 bg-white pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                
               
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2.5 font-['Outfit']">
                {sector.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                {sector.tagline}
              </p>
            </div>

            {/* Sector Image Card */}
            <div className="w-full lg:w-80 h-40 sm:h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative shrink-0 bg-slate-100">
              <img 
                src={sector.imageUrl} 
                alt={sector.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-medium text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md">
                Official Sector Research Document
              </div>
            </div>

          </div>

          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Industry Domains</p>
              <p className="text-xl font-bold text-blue-600">{sector.industrySkills.length} Domains</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total Courses</p>
              <p className="text-xl font-bold text-slate-900">{sector.courses.global.length + sector.courses.iitNptel.length} Programs</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Govt Schemes</p>
              <p className="text-xl font-bold text-emerald-600">{sector.govtSchemes.online.length + sector.govtSchemes.offline.length + sector.govtSchemes.blended.length} Schemes</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Target Employers</p>
              <p className="text-xl font-bold text-indigo-600">{sector.hiringCompanies?.length || 'Multiple'} Portals</p>
            </div>
          </div>

         

          {/* Interactive Skill Assessment & Recommendation Letter Callout Card */}
          
            
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto mt-8 pb-1 border-b border-slate-200 no-scrollbar">
            {[
              { id: 'overview', label: '1. Overview & Demand', icon: Layers },
              { id: 'ai_skills', label: '2. AI Impact & Skills', icon: Cpu },
              { id: 'schemes_courses', label: '3. Schemes & Courses', icon: BookOpen },
              { id: 'policies_jobs', label: '4. Policies & Hiring', icon: Briefcase },
              { id: 'roadmap_conclusion', label: '5. Roadmap & Sources', icon: Target },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Tab Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* TAB 1: OVERVIEW & DEMAND */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Introduction Section */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2 font-['Outfit']">
                <Compass className="w-5 h-5 text-blue-600" />
                <span>Sector Introduction & Ground Context</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {sector.introduction}
              </p>
            </div>

            {/* Skills Demanded by Industry */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Skills Demanded by Industry
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Practical, production-ready capabilities currently sought by employers in this sector.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {sector.industrySkills.map((cat, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 transition-all"
                  >
                    <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{cat.category}</span>
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {cat.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Present Training Reality */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2 font-['Outfit']">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Present Training Reality & Ground Challenges</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-5">
                Structural challenges observed in conventional college curriculums and local training institutes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sector.trainingReality.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Skill Gaps */}
            {sector.keySkillGaps && sector.keySkillGaps.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
                <h2 className="text-xl font-bold text-slate-900 mb-2 font-['Outfit']">
                  Critical Skill Gaps Identified
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-5">
                  High-priority deficiencies preventing students from immediately transitioning into enterprise roles.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {sector.keySkillGaps.map((gap, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-rose-50/60 border border-rose-200 text-slate-800">
                      <h3 className="font-bold text-rose-900 text-sm mb-1.5">
                        {gap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                        {gap.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: AI IMPACT & FUTURE SKILLS */}
        {activeTab === 'ai_skills' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* AI Impact Comparison Grid */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-2 border border-blue-100">
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI & Automation Dynamics</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-['Outfit']">
                  Impact of Artificial Intelligence on Tasks
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Automated Tasks */}
                <div className="p-5 rounded-xl bg-rose-50/50 border border-rose-200">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-3">
                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                    <span>Routine Tasks Being Automated by AI</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-rose-950">
                    {sector.aiImpact.automatedTasks.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Indispensable Human Roles */}
                <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>Essential Human Roles & Capabilities</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950">
                    {sector.aiImpact.humanWorkerRole.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Strategic Takeaway Box */}
              <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-950 text-xs sm:text-sm leading-relaxed">
                <strong className="text-blue-900">Strategic AI Takeaway:</strong> {sector.aiImpact.strategicTakeaway}
              </div>
            </div>

            {/* High-Priority Future Skills */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
                  Important High-Priority Future Skills
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Next-generation technical and digital competencies required to stay future-ready.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sector.futureSkills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-3">
                        {idx + 1}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                        {skill.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Direction */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 mb-4 font-['Outfit']">
                Recommended Pedagogical & Policy Direction
              </h2>
              <div className="space-y-2.5">
                {sector.recommendedDirection.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: GOVT SCHEMES & UNIVERSITY COURSES */}
        {activeTab === 'schemes_courses' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Header & Sub Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                    Training Schemes & Academic Courses
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Curated free and subsidized learning programmes from the Government of India, State of Maharashtra, Harvard, MIT, IITs & NPTEL.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'All Courses' },
                    { id: 'govt_online', label: 'Govt Online' },
                    { id: 'govt_offline', label: 'Govt Offline' },
                    { id: 'govt_blended', label: 'Govt Blended' },
                    { id: 'global_uni', label: 'Global Uni' },
                    { id: 'iit_nptel', label: 'IIT / NPTEL' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setCourseFilter(f.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        courseFilter === f.id
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Pathway Banner */}
              {sector.courses.recommendedPathway && (
                <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950">
                  <h3 className="font-bold text-blue-900 text-sm mb-2.5 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-blue-600" />
                    <span>Optimal Structured Learning Pathway</span>
                  </h3>
                  <div className="space-y-1.5">
                    {sector.courses.recommendedPathway.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                  {sector.courses.freeLearningNote && (
                    <div className="mt-3 pt-3 border-t border-blue-200/80 text-xs text-blue-800">
                      💡 <strong>Free Learning Note:</strong> {sector.courses.freeLearningNote}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 1. Government Schemes Section */}
            {(courseFilter === 'all' || courseFilter.startsWith('govt')) && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Landmark className="w-5 h-5 text-blue-600" />
                  <span>Government Skill Development Schemes</span>
                </h3>

                {/* Online Schemes */}
                {(courseFilter === 'all' || courseFilter === 'govt_online') && (
                  <div>
                    <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                      Online Government Schemes (Free Digital Access)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sector.govtSchemes.online.map((scheme, idx) => (
                        <div key={idx} className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                                {scheme.level}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">100% Online</span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">{scheme.name}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">{scheme.advantages}</p>
                          </div>
                          <a
                            href={scheme.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-all shadow-2xs"
                          >
                            <span>Open Official Portal</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Offline Schemes */}
                {(courseFilter === 'all' || courseFilter === 'govt_offline') && (
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3">
                      Offline / Centre-Based Government Training
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sector.govtSchemes.offline.map((scheme, idx) => (
                        <div key={idx} className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {scheme.level}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">Hands-on Centre</span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">{scheme.name}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">{scheme.advantages}</p>
                          </div>
                          <a
                            href={scheme.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-all shadow-2xs"
                          >
                            <span>Official Source Link</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blended Schemes */}
                {(courseFilter === 'all' || courseFilter === 'govt_blended') && (
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">
                      Blended & Hybrid Government Programmes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sector.govtSchemes.blended.map((scheme, idx) => (
                        <div key={idx} className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                                {scheme.level}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium">Online + Workshop</span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">{scheme.name}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed mb-3">{scheme.advantages}</p>
                            {scheme.onlineComponent && (
                              <div className="p-2.5 rounded bg-white border border-slate-200 text-xs text-slate-700 space-y-1 mb-4">
                                <div><strong>Online:</strong> {scheme.onlineComponent}</div>
                                <div><strong>Offline:</strong> {scheme.offlineComponent}</div>
                              </div>
                            )}
                          </div>
                          <a
                            href={scheme.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-all shadow-2xs"
                          >
                            <span>Verify Scheme Details</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Global University & IIT/NPTEL Courses */}
            {(courseFilter === 'all' || courseFilter === 'global_uni' || courseFilter === 'iit_nptel') && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>University & Technical MOOCs (Harvard, MIT, TU Delft, IITs, IIMs)</span>
                </h3>

                {/* Global Courses */}
                {(courseFilter === 'all' || courseFilter === 'global_uni') && (
                  <div>
                    <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                      Global Premier Universities (Free to Audit)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sector.courses.global.map((course, idx) => (
                        <div key={idx} className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-xs font-bold text-blue-700">
                                {course.institution} {course.country && `(${course.country})`}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
                                {course.costStatus.split(';')[0]}
                              </span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">{course.title}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                              <strong>Key Skills:</strong> {course.skills}
                            </p>
                          </div>
                          <a
                            href={course.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-all shadow-2xs"
                          >
                            <span>Access Course Material</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* IIT / NPTEL Courses */}
                {(courseFilter === 'all' || courseFilter === 'iit_nptel') && (
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3">
                      IIT / IIM / NPTEL National Curricula
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sector.courses.iitNptel.map((course, idx) => (
                        <div key={idx} className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-xs font-bold text-indigo-700">
                                {course.institution}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-100 text-indigo-800">
                                SWAYAM / NPTEL
                              </span>
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm mb-1.5">{course.title}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                              <strong>Topics:</strong> {course.skills}
                            </p>
                          </div>
                          <a
                            href={course.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-all shadow-2xs"
                          >
                            <span>Open NPTEL Syllabus</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* TAB 4: POLICIES & HIRING COMPANIES */}
        {activeTab === 'policies_jobs' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Government Policies & Ecosystem Support */}
            {sector.policies && sector.policies.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                    Government Support & Ecosystem Policies
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    National and state industrial policies driving investment, manufacturing subsidies, and large-scale job creation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {sector.policies.map((pol, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                            {pol.level} Policy
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base mb-1.5">{pol.policyName}</h3>
                        <p className="text-xs sm:text-sm text-slate-700 mb-2 leading-relaxed">
                          <strong>Government Support:</strong> {pol.support}
                        </p>
                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                          <strong>Impact:</strong> {pol.sectorImpact}
                        </p>
                      </div>
                      <a
                        href={pol.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-200 hover:bg-blue-600 hover:text-white text-xs font-semibold text-slate-700 transition-all"
                      >
                        <span>Official Policy Repository</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hiring Companies */}
            {sector.hiringCompanies && sector.hiringCompanies.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                    Top Companies Where Learners Can Apply
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Verified industrial employers with active facilities in Maharashtra and India. Search entry-level positions via their official career portals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sector.hiringCompanies.map((comp, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base mb-3">
                          <Building className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-base mb-0.5">{comp.name}</h3>
                        <p className="text-xs text-slate-500 mb-3">{comp.locationContext}</p>
                        
                        <div className="mb-4">
                          <span className="text-xs font-semibold text-slate-700 block mb-1.5">Entry-Level Roles to Search:</span>
                          <div className="flex flex-wrap gap-1">
                            {comp.roles.map((r, i) => (
                              <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-white text-slate-700 border border-slate-200">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <a
                        href={comp.careerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-2xs transition-all cursor-pointer"
                      >
                        <span>Visit Official Career Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Useful Job Keywords & Pathways */}
            {(sector.jobKeywords || sector.entryPathway) && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5">
                {sector.jobKeywords && (
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Target Job-Search Keywords (Copy & Use on Job Portals)
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.jobKeywords.map((kw, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {sector.entryPathway && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-slate-800 text-xs sm:text-sm leading-relaxed">
                    <strong className="text-blue-900 block mb-1">Recommended Entry-Level Employment Pathway:</strong>
                    {sector.entryPathway}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* TAB 5: ROADMAP & REFERENCES */}
        {activeTab === 'roadmap_conclusion' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Phased Roadmap */}
            {sector.roadmap && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                    12-Month Phased Action Roadmap
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Structured progression from artistic/technical foundations to studio-ready production reels and hiring.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {sector.roadmap.map((phase, idx) => (
                    <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                          {phase.phase}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{phase.timeline}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-2">{phase.title}</h3>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                        {phase.focus.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Conclusion */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-sm border border-slate-800">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2 font-['Outfit']">
                <Target className="w-5 h-5 text-blue-400" />
                <span>Key Sectoral Conclusion</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                {sector.conclusion}
              </p>
            </div>

            {/* Verified Research References */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 font-['Outfit']">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Verified Research Bibliography & Official Sources</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sector.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 flex items-center justify-between text-xs text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <span className="truncate pr-2">[{idx + 1}] {ref.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Sector Assessment & Recommendation Letter Modal */}
      <SectorAssessmentModal
        sector={sector}
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onSubmissionSuccess={(submission) => {
          console.log('Assessment submitted successfully:', submission);
        }}
      />

    </div>
  );
};
