export interface GovtScheme {
  name: string;
  level: string; // e.g. "National" | "Maharashtra" | "State"
  advantages: string;
  sourceUrl: string;
  sourceName?: string;
  mode?: "Online" | "Offline" | "Blended" | "Policy";
  onlineComponent?: string;
  offlineComponent?: string;
}

export interface UniversityCourse {
  title: string;
  institution: string;
  country?: string;
  skills: string;
  costStatus: string; // e.g. "Free to audit", "Free online MOOC", "Paid"
  sourceUrl: string;
  sourceName?: string;
  type: "Global" | "IIT/IIM/NPTEL" | "Specialized";
}

export interface PolicySupport {
  policyName: string;
  level: string;
  support: string;
  sectorImpact: string;
  sourceUrl: string;
}

export interface HiringCompany {
  name: string;
  locationContext: string;
  roles: string[];
  careerUrl: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  timeline: string;
  focus: string[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  skillDomain: string;
}

export interface UserSubmission {
  id: string;
  timestamp: string;
  sectorId: string;
  sectorName: string;
  fullName: string;
  email: string;
  phone: string;
  collegeOrCompany: string;
  targetRole: string;
  city: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: Record<number, number>;
  paymentStatus: 'pending' | 'completed';
  paymentPlan?: string;
  paymentAmount?: number;
  verificationCode: string;
}

export interface SectorData {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  imageUrl: string;
  iconName: string;
  problemStatement: string;
  introduction: string;
  industrySkills: {
    category: string;
    items: string[];
  }[];
  trainingReality: string[];
  keySkillGaps?: {
    title: string;
    description: string;
  }[];
  futureSkills: {
    name: string;
    description: string;
  }[];
  aiImpact: {
    automatedTasks: string[];
    humanWorkerRole: string[];
    strategicTakeaway: string;
  };
  recommendedDirection: string[];
  govtSchemes: {
    online: GovtScheme[];
    offline: GovtScheme[];
    blended: GovtScheme[];
  };
  courses: {
    global: UniversityCourse[];
    iitNptel: UniversityCourse[];
    recommendedPathway?: string[];
    freeLearningNote?: string;
  };
  policies?: PolicySupport[];
  hiringCompanies?: HiringCompany[];
  jobKeywords?: string[];
  entryPathway?: string;
  roadmap?: RoadmapPhase[];
  conclusion: string;
  references: {
    title: string;
    url: string;
  }[];
}
