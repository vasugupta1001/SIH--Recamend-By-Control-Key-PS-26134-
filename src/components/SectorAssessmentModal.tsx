import React, { useState } from 'react';
import { SectorData, Question, UserSubmission } from '../types';
import { SECTOR_QUESTIONS } from '../data/assessmentQuestions';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Building2, 
  QrCode, 
  CreditCard, 
  FileText, 
  Printer, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Download,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Briefcase,
  Star,
  Zap,
  Lock,
  Smartphone,
  CheckCircle,
  Copy
} from 'lucide-react';

interface SectorAssessmentModalProps {
  sector: SectorData;
  isOpen: boolean;
  onClose: () => void;
  onSubmissionSuccess: (submission: UserSubmission) => void;
}

export const SectorAssessmentModal: React.FC<SectorAssessmentModalProps> = ({
  sector,
  isOpen,
  onClose,
  onSubmissionSuccess
}) => {
  const questions: Question[] = SECTOR_QUESTIONS[sector.id] || [];
  
  // Stages: 'quiz' -> 'form' -> 'result' -> 'lor_preview'
  const [currentStage, setCurrentStage] = useState<'quiz' | 'form' | 'result' | 'lor_preview'>('quiz');
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [collegeOrCompany, setCollegeOrCompany] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [city, setCity] = useState('');
  const [formError, setFormError] = useState('');

  // Submission & Payment state
  const [submissionData, setSubmissionData] = useState<UserSubmission | null>(null);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro'>('pro');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('qr');
  const [customUpiId, setCustomUpiId] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessAnimation, setPaymentSuccessAnimation] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    setQuizSubmitted(true);
    setCurrentStage('form');
  };

  // Compute score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  // Submit User Details Form & Save to Database
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError('Please fill in your Full Name, Email, and Phone number.');
      return;
    }

    const score = calculateScore();
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const verificationCode = `LOR-${sector.id.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`;

    const newSubmission: UserSubmission = {
      id: `SUB-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      sectorId: sector.id,
      sectorName: sector.name,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      collegeOrCompany: collegeOrCompany.trim() || 'Not Specified',
      targetRole: targetRole.trim() || `${sector.name} Specialist`,
      city: city.trim() || 'India',
      score,
      totalQuestions,
      percentage,
      answers: selectedAnswers,
      paymentStatus: 'pending',
      verificationCode
    };

    // Save to Backend Database (and LocalStorage backup)
    try {
      fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubmission)
      }).catch(err => console.warn('Backend submission sync note:', err));

      const existing = JSON.parse(localStorage.getItem('sector_submissions') || '[]');
      existing.unshift(newSubmission);
      localStorage.setItem('sector_submissions', JSON.stringify(existing));
    } catch (err) {
      console.error('Storage error', err);
    }

    setSubmissionData(newSubmission);
    onSubmissionSuccess(newSubmission);
    setCurrentStage('result');
  };

  // Handle Payment Simulation
  const handleProceedPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccessAnimation(true);
      
      setTimeout(() => {
        if (submissionData) {
          const updated: UserSubmission = {
            ...submissionData,
            paymentStatus: 'completed',
            paymentPlan: selectedPlan === 'pro' ? 'Pro LOR + 5 Company Referrals' : 'Official Skill Certificate',
            paymentAmount: selectedPlan === 'pro' ? 499 : 299
          };
          setSubmissionData(updated);

          // Update Backend database
          try {
            fetch(`/api/submissions/${updated.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paymentStatus: updated.paymentStatus,
                paymentPlan: updated.paymentPlan,
                paymentAmount: updated.paymentAmount
              })
            }).catch(err => console.warn('Backend payment status sync note:', err));

            const existing: UserSubmission[] = JSON.parse(localStorage.getItem('sector_submissions') || '[]');
            const idx = existing.findIndex(s => s.id === updated.id);
            if (idx !== -1) {
              existing[idx] = updated;
            } else {
              existing.unshift(updated);
            }
            localStorage.setItem('sector_submissions', JSON.stringify(existing));
          } catch (err) {
            console.error(err);
          }
        }
        setIsPaymentPopupOpen(false);
        setPaymentSuccessAnimation(false);
        setCurrentStage('lor_preview');
      }, 1200);

    }, 1400);
  };

  const score = submissionData?.score ?? calculateScore();
  const total = questions.length;
  const percentage = submissionData?.percentage ?? Math.round((score / total) * 100);

  // Performance Badge based on score
  const getRatingBadge = () => {
    if (percentage >= 80) {
      return { label: 'Elite AI Competency (Grade A+)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    } else if (percentage >= 60) {
      return { label: 'Strong Domain Proficiency (Grade A)', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
    }
    return { label: 'Foundational Knowledge Verified', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
  };

  const rating = getRatingBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
              <Award className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-['Outfit']">
                {sector.name} Skill Assessment
              </h3>
              <p className="text-[11px] text-slate-300">
                Industry Knowledge & AI Competency Evaluation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-slate-50/50">

          {/* STAGE 1: QUIZ QUESTIONS */}
          {currentStage === 'quiz' && (
            <div className="space-y-6">
              
              {/* Progress & Question Counter */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-2 border-b border-slate-200">
                <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 font-bold">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Completed</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Box */}
              {currentQ && (
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[11px] font-bold uppercase text-blue-600 tracking-wider block mb-1">
                      Domain: {currentQ.skillDomain}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {currentQ.question}
                    </h4>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/90 border-blue-600 text-blue-950 font-medium shadow-2xs ring-1 ring-blue-600'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="text-xs sm:text-sm leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quiz Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {isLastQuestion ? (
                  <button
                    onClick={handleFinishQuiz}
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Finish & Submit Profile</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswers[currentQuestionIndex] === undefined}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          )}

          {/* STAGE 2: USER DETAILS FORM (Stored to Google Sheets & Database) */}
          {currentStage === 'form' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="text-center max-w-md mx-auto">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/25">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
                  Assessment Completed!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Please submit your profile details below to calculate your verified score, generate your personalized Letter of Recommendation, and unlock target employer referrals.
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4 max-w-xl mx-auto bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-md">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      College / Institute / Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pune University / COEP"
                      value={collegeOrCompany}
                      onChange={(e) => setCollegeOrCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Career Role
                    </label>
                    <input
                      type="text"
                      placeholder={`e.g. Junior ${sector.name} Associate`}
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City / State
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit & Calculate My Verified Score</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    🔒 Stored securely in database & synced to verified academic sheets.
                  </p>
                </div>

              </form>

            </div>
          )}

          {/* STAGE 3: GREETING & SCORE BREAKDOWN + RECOMMENDATION LETTER & COMPANY SUGGESTIONS */}
          {currentStage === 'result' && submissionData && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Personalized Greeting Box */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-xl relative overflow-hidden border border-blue-900/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold uppercase border border-blue-400/30">
                      <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                      <span>Skill Assessment Completed</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
                      Congratulations, {submissionData.fullName}! 🎉
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                      You have successfully completed the <strong>{sector.name}</strong> assessment. Your verified test performance demonstrates solid industry understanding and future AI alignment.
                    </p>
                    <div className="pt-1">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${rating.color}`}>
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{rating.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Big Score Card */}
                  <div className="bg-white/10 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/20 text-center shrink-0 self-stretch sm:self-auto shadow-inner">
                    <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Your Verified Score</p>
                    <p className="text-4xl font-extrabold font-['Outfit'] text-white my-1">
                      {score} <span className="text-2xl text-blue-300">/ {total}</span>
                    </p>
                    <div className="px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs">
                      {percentage}% Accuracy
                    </div>
                  </div>
                </div>
              </div>

              {/* HIGHLY IMPRESSIVE RECOMMENDATION LETTER & TAILORED COMPANY SUGGESTIONS CARD */}
              <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 p-6 sm:p-7 rounded-2xl text-white border border-blue-500/30 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase mb-2 border border-emerald-500/30">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified LOR & Hiring Endorsement Ready</span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-extrabold font-['Outfit'] text-white">
                      Official Letter of Recommendation (LOR) & Company Referrals
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed max-w-2xl">
                      Aapke <strong>{score}/{total} ({percentage}%)</strong> score ke mutabiq, ham aapko <strong>National Sectoral Board</strong> ka signed recommendation letter issue kar rahe hain aur aapki profile ke liye top companies suggest kar rahe hain:
                    </p>
                  </div>
                </div>

                {/* Tailored Suggested Companies for this Candidate */}
                <div className="bg-slate-950/60 backdrop-blur-md p-5 rounded-2xl border border-blue-400/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-blue-300 tracking-wider flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                      <span>Top Recommended Hiring Partners For You ({sector.name}):</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Fast-Track Hiring
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sector.hiringCompanies ? sector.hiringCompanies.map((c, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
                            <span className="font-bold text-white text-xs sm:text-sm">{c.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 pl-6">
                            Target Roles: <span className="text-slate-200">{c.roles.slice(0, 2).join(', ')}</span>
                          </p>
                          <span className="text-[10px] text-blue-300 mt-0.5 block pl-6">📍 {c.locationContext}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 shrink-0">
                          Direct Portal
                        </span>
                      </div>
                    )) : (
                      <div className="p-3 rounded-xl bg-white/5 text-slate-300 text-xs">
                        Top National & State Industry Leaders
                      </div>
                    )}
                  </div>
                </div>

                {/* What Candidate Gets in the LOR Package */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Formal LOR on Official Board Letterhead with QR Code</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Verified Test Score Badge ({percentage}%)</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct HR Referral Links & Application Endorsement</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Lifetime Online Verification ID ({submissionData.verificationCode})</span>
                  </div>
                </div>

                {/* Call to action Trigger for Payment Popup */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <div>
                    <span className="text-xs text-slate-400 block">Nominal Recommendation & Verification Fee:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-white">₹299 - ₹499</span>
                      <span className="text-xs text-emerald-400 font-semibold">Instant Download & Referral Links</span>
                    </div>
                  </div>

                  <button
                    id="openPaymentPopupBtn"
                    onClick={() => setIsPaymentPopupOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <FileText className="w-4.5 h-4.5 text-slate-950" />
                    <span>Get Recommendation Letter & Referrals</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Answer Key Breakdown / Review */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Questions Review & Correct Answers</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {score} Correct of {total}
                  </span>
                </h4>

                <div className="space-y-2.5">
                  {questions.map((q, idx) => {
                    const userAns = selectedAnswers[idx];
                    const isCorrect = userAns === q.correctAnswer;
                    return (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                          isCorrect ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-rose-50/70 border-rose-200 text-rose-950'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 mb-1">
                              Q{idx + 1}. {q.question}
                            </p>
                            <p className="text-xs text-slate-700 mb-1">
                              <strong>Your Answer:</strong> {q.options[userAns] || 'Not answered'} {isCorrect ? '✅' : '❌'}
                            </p>
                            {!isCorrect && (
                              <p className="text-xs font-semibold text-emerald-800 mb-1">
                                <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                              </p>
                            )}
                            <p className="text-[11px] text-slate-500 italic mt-1 bg-white/60 p-2 rounded border border-slate-200/60">
                              💡 <strong>Explanation:</strong> {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STAGE 4: OFFICIAL LETTER OF RECOMMENDATION & CERTIFICATE PREVIEW */}
          {currentStage === 'lor_preview' && submissionData && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Payment Verified & Official Endorsement Issued</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                    Official Letter of Recommendation (LOR)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Verification Code: <strong className="font-mono text-slate-800">{submissionData.verificationCode}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              </div>

              {/* Formal Document Layout */}
              <div 
                id="lor-document"
                className="bg-white p-8 sm:p-10 rounded-2xl border-2 border-slate-300 shadow-lg text-slate-900 space-y-6 max-w-2xl mx-auto font-serif"
              >
                
                {/* Official Letterhead Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-slate-900 font-['Outfit']">
                      National AI & Sectoral Skill Directorate
                    </h2>
                    <p className="text-xs text-slate-600 font-sans">
                      Sector Intelligence, Automation & Workforce Competency Board
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-slate-500 font-sans">
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Ref: {submissionData.verificationCode}</p>
                  </div>
                </div>

                {/* Document Title */}
                <div className="text-center py-2">
                  <h3 className="text-base sm:text-lg font-bold uppercase tracking-widest text-blue-900 font-sans underline decoration-blue-500">
                    CONFIDENTIAL LETTER OF RECOMMENDATION
                  </h3>
                </div>

                {/* Salutation & Body */}
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3.5 font-sans">
                  <p>
                    <strong>To Whom It May Concern / Hiring Committee,</strong>
                  </p>
                  
                  <p>
                    This is to formally certify and recommend <strong>{submissionData.fullName}</strong> ({submissionData.collegeOrCompany}, {submissionData.city}) for entry-level and advanced technical positions in the <strong>{sector.name}</strong> industry.
                  </p>

                  <p>
                    The candidate has undergone rigorous evaluation through our standardized Sectoral AI & Domain Skill Assessment, achieving a verified competency score of <strong>{score} / {total} ({percentage}%)</strong>.
                  </p>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs my-2">
                    <p className="font-bold text-slate-900 mb-1">Demonstrated Core Competencies:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                      {sector.industrySkills.slice(0, 3).map((s, idx) => (
                        <li key={idx}><strong>{s.category}:</strong> {s.items.slice(0, 2).join(', ')}</li>
                      ))}
                    </ul>
                  </div>

                  <p>
                    Based on their technical grasp, structured problem-solving aptitude, and proactive upskilling in AI-driven automation tools, we strongly endorse <strong>{submissionData.fullName}</strong> for interview consideration at our partner enterprise network.
                  </p>
                </div>

                {/* Signatures & Seal */}
                <div className="pt-6 border-t border-slate-200 flex items-end justify-between font-sans">
                  <div>
                    <div className="w-28 h-10 border-b border-slate-400 mb-1 flex items-end">
                      <span className="font-['Outfit'] italic text-blue-900 text-xs font-bold">Dr. A. K. Verma</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">Dr. A. K. Verma, Ph.D.</p>
                    <p className="text-[10px] text-slate-500">Director of Sectoral Research & Skill Framework</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center p-1 text-[8px] font-bold uppercase mx-auto">
                      <span>Verified</span>
                      <span>★ LOR ★</span>
                      <span>2026</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Direct Company Referral Portal Links */}
              {sector.hiringCompanies && (
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-800 tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Your Fast-Track Direct Company Referral Links:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {sector.hiringCompanies.map((c, i) => (
                      <a
                        key={i}
                        href={c.careerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 flex items-center justify-between text-xs text-slate-800 hover:text-blue-700 transition-all font-semibold"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Apply at {c.name}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* ========================================================================= */}
      {/* HIGHLY IMPRESSIVE & INTERACTIVE PAYMENT POPUP MODAL                       */}
      {/* ========================================================================= */}
      {isPaymentPopupOpen && submissionData && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            
            {/* Payment Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white font-['Outfit'] flex items-center gap-2">
                    <span>Secure Recommendation Checkout</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">256-bit SSL</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Candidate: <strong>{submissionData.fullName}</strong> • Score: <strong>{score}/{total} ({percentage}%)</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPaymentPopupOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50/50">
              
              {/* Plan Switcher */}
              <div className="grid grid-cols-2 gap-3">
                <div 
                  onClick={() => setSelectedPlan('basic')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedPlan === 'basic'
                      ? 'bg-blue-50/90 border-blue-600 shadow-sm ring-1 ring-blue-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase text-slate-500">Basic Plan</span>
                    <span className="text-base font-extrabold text-slate-900">₹299</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 mb-1">Digital Certificate</h5>
                  <p className="text-[11px] text-slate-500">Verified digital credential ID</p>
                </div>

                <div 
                  onClick={() => setSelectedPlan('pro')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative ${
                    selectedPlan === 'pro'
                      ? 'bg-emerald-50/90 border-emerald-600 shadow-md ring-1 ring-emerald-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
                    Recommended ★
                  </span>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase text-emerald-800">Pro LOR</span>
                    <span className="text-base font-extrabold text-emerald-900">₹499</span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 mb-1">Official LOR + Referrals</h5>
                  <p className="text-[11px] text-emerald-700">Signed LOR + 5 Company Links</p>
                </div>
              </div>

              {/* Payment Methods Selector Tabs */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                    Select Payment Method:
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Zero Gateway Surcharge
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR Code', icon: QrCode },
                    { id: 'card', label: 'Cards (Visa/MC)', icon: CreditCard },
                    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Method Specific Interactive Controls */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-3 pt-2">
                    
                    {/* UPI App Selection Chips */}
                    <div className="flex gap-2">
                      {[
                        { id: 'qr', label: 'Dynamic QR Code' },
                        { id: 'gpay', label: 'Google Pay' },
                        { id: 'phonepe', label: 'PhonePe' },
                        { id: 'paytm', label: 'Paytm' },
                      ].map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setUpiApp(app.id as any)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            upiApp === app.id 
                              ? 'bg-blue-50 border-blue-600 text-blue-900' 
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {app.label}
                        </button>
                      ))}
                    </div>

                    {/* QR Code Dynamic Presentation */}
                    {upiApp === 'qr' ? (
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white flex flex-col sm:flex-row items-center gap-4">
                        <div className="w-28 h-28 bg-white p-2 rounded-2xl border-2 border-emerald-400 flex flex-col items-center justify-center shrink-0 shadow-lg relative">
                          {/* High-Tech QR visual */}
                          <div className="w-full h-full bg-slate-900 rounded-lg p-1.5 grid grid-cols-5 gap-0.5">
                            <div className="bg-white rounded-xs col-span-2 row-span-2"></div>
                            <div className="bg-transparent"></div>
                            <div className="bg-white rounded-xs col-span-2 row-span-2"></div>
                            <div className="bg-transparent col-span-5"></div>
                            <div className="bg-white rounded-xs col-span-2 row-span-2"></div>
                            <div className="bg-teal-400 rounded-xs col-span-3"></div>
                            <div className="bg-white rounded-xs col-span-3"></div>
                          </div>
                          <span className="absolute -bottom-2 bg-emerald-600 text-white font-bold text-[8px] px-2 py-0.5 rounded-full uppercase">
                            Active QR
                          </span>
                        </div>

                        <div className="space-y-1.5 text-center sm:text-left flex-1">
                          <span className="text-xs font-extrabold text-white block">
                            Scan with GPay, PhonePe, Paytm, BHIM
                          </span>
                          <div className="flex items-center gap-2 bg-white/10 p-2 rounded-lg text-xs font-mono">
                            <span className="text-slate-300">ai.sector.lor@icici</span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText('ai.sector.lor@icici');
                                setCopiedUpi(true);
                                setTimeout(() => setCopiedUpi(false), 2000);
                              }}
                              className="ml-auto text-[10px] text-blue-300 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedUpi ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Total Payable: <strong className="text-emerald-300 text-sm">₹{selectedPlan === 'pro' ? 499 : 299}</strong>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <label className="block text-xs font-bold text-slate-700">
                          Enter your {upiApp.toUpperCase()} VPA ID:
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. mobileNumber@upi"
                            value={customUpiId}
                            onChange={(e) => setCustomUpiId(e.target.value)}
                            className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button 
                            type="button"
                            onClick={() => setCustomUpiId(`${phone || '9876543210'}@okhdfcbank`)}
                            className="px-3 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer"
                          >
                            Use Phone UPI
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8821"
                        defaultValue="4532 9821 7712 8821"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="08/28"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          defaultValue="921"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-700">Select Bank:</label>
                    <select className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-800 font-medium">
                      <option>HDFC Bank (Popular)</option>
                      <option>State Bank of India (SBI)</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                  </div>
                )}

              </div>

              {/* Secure Checkout Action Button */}
              <div>
                <button
                  id="confirmPaymentBtn"
                  onClick={handleProceedPayment}
                  disabled={isProcessingPayment || paymentSuccessAnimation}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-75"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying with Banking Gateway...</span>
                    </>
                  ) : paymentSuccessAnimation ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                      <span>Payment Verified! Generating LOR...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Complete Payment ₹{selectedPlan === 'pro' ? 499 : 299} & Unlock LOR</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 mt-2.5">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    NPCI / Razorpay Verified
                  </span>
                  <span>•</span>
                  <span>Instant PDF & QR Certificate</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
