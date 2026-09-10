import React from 'react';
import { SectorData } from '../types';
import { 
  ArrowRight, 
  Award, 
  FileText, 
  Layers, 
  Compass,
  ShieldCheck
} from 'lucide-react';
import bgVideo from '../assets/bg2.mp4';

interface WelcomeHeroProps {
  sectors: SectorData[];
  onEnterSite: () => void;
  onDirectSector: (sectorId: string) => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  sectors,
  onEnterSite,
  onDirectSector
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-white relative overflow-hidden selection:bg-blue-600 selection:text-white">

      {/* Background Video - grayscale taaki blue tint na aaye */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale pointer-events-none"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

    
   

      {/* Main Hero Content */}
      <main className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 my-auto text-center space-y-8">
        
        {/* Main Title Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-['Outfit'] tracking-tight leading-[1.12]">
          RECAMEND 
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
          Comprehensive research across 5 core industry sectors. Discover AI use-cases, benchmark your domain readiness with live test assessments, and obtain an <strong>Official Letter of Recommendation (LOR)</strong> with verified employer referrals.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            id="enterWebsiteBtn"
            onClick={onEnterSite}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-base font-bold shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Visit Website</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('welcome-features');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm font-semibold transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>How It Works</span>
          </button>
        </div>

        {/* 3 Steps Overview Cards */}
        <div id="welcome-features" className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 text-left">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2 hover:border-blue-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white font-['Outfit']">1. Explore 5 Sectors</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              IT & Digital, EV & Renewables, Finance & FinTech, Advanced Manufacturing, and Creative Media.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2 hover:border-emerald-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white font-['Outfit']">2. Take Domain Test</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Attempt 5 scenario-based questions per sector. Score ≥80% to qualify for certified recognition.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-2 hover:border-purple-500/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white font-['Outfit']">3. Official LOR & Jobs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download your signed Recommendation Letter with verification QR and direct hiring referral links.
            </p>
          </div>
        </div>

      </main>

      {/* Bottom Status Bar */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/60 py-4 px-4 sm:px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verified Skill Assessment & Official LOR Framework</span>
        </div>
        <div>
          <span>National AI Sector Research 2026-27</span>
        </div>
      </footer>

    </div>
  );
};