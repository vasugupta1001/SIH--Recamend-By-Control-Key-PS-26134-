import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  UserCheck, 
  ShieldAlert, 
  Lock, 
  Scale, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface InfoSectionsProps {
  onExploreSector: (id: string) => void;
}

export const InfoSections: React.FC<InfoSectionsProps> = ({ onExploreSector }) => {
  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* BENEFITS SECTION */}
      <section id="benefits" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase mb-2.5 border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Industrial Productivity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Key Benefits of AI Across Sectors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            How artificial intelligence accelerates operations, minimizes error rates, and amplifies human workforce capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Automation of Repetitive Tasks</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Automates routine data entry, high-speed sorting, scheduling, invoice reconciliation, and standard customer inquiries, freeing humans for creative problem-solving.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Faster & Data-Driven Decisions</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Real-time sensor telemetry, machine learning algorithms, and predictive models analyze millions of data points in milliseconds for fraud detection, battery health, and medical imaging.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Multiplied Workplace Productivity</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Generative AI pipelines, low-code tools, and robotic process automation act as force multipliers, expanding daily output for artists, programmers, accountants, and technicians.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5">
              <DollarSign className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Reduced Operational Overhead</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Predictive maintenance prevents catastrophic factory equipment downtime, smart irrigation saves water, and route optimization reduces commercial fleet fuel consumption.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5">
              <UserCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Personalized User Experiences</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Enables custom adaptive learning tracks in education, personalized financial wellness advisory, tailored e-commerce recommendations, and precision medicine.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Innovation & Discovery Acceleration</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fast-tracks electric vehicle battery chemistry simulation, rapid concept art iteration, smart grid balancing, and automated supply chain logistics.
            </p>
          </div>

        </div>
      </section>

      {/* CHALLENGES SECTION */}
      <section id="challenges" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase mb-2.5 border border-rose-100">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Risks & Bottlenecks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
            Challenges & Ethical Safeguards
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Key friction points and structural risks that require continuous policy, technical upskilling, and governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-rose-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-3.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Job Role Transformation & Transition</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Purely routine button-pushing and manual clerical roles face obsolescence. Workers need urgent reskilling in prompt scripting, sensor reading, and automated workflows.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-rose-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-3.5">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Data Privacy & Security Exposure</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Feeding confidential banking files, patient medical charts, or intellectual property into public AI models poses grave cybersecurity and regulatory compliance hazards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-rose-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-3.5">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Algorithmic Bias & Hallucinations</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Flawed training datasets can lead to discriminatory credit scoring, skewed hiring screening, or fabricated technical outputs that fail safety inspections.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-rose-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-3.5">
              <DollarSign className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">High Implementation Costs</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Deploying enterprise smart factory sensors, multi-axis robots, and dedicated GPU clusters involves heavy initial capital expenditure that challenges small businesses.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-rose-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-3.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">Over-Dependence on Black-Box Models</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Blindly trusting automated diagnoses or trading algorithms without human verification can trigger critical safety disasters and regulatory penalties.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-rose-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-3.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5 font-['Outfit']">The Digital & Hardware Divide</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unequal access to high-speed fiber internet, modern computers, and hands-on laboratory equipment in rural districts widens educational inequality.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
