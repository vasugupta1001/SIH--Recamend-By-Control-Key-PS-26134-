import { SectorData } from '../types';

export const SECTORS_DATA: Record<string, SectorData> = {
  'it-digital': {
    id: 'it-digital',
    name: 'IT & Digital Services',
    tagline: 'AI copilot integration, cloud DevOps, cybersecurity, and intelligent software engineering.',
    badge: 'IT & Software',
    iconName: 'Cpu',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    introduction: 'The IT & Software sector is undergoing its most profound shift since the birth of cloud computing. Automated code generation, AI-powered testing suites, and intelligent DevOps pipelines are redefining entry-level software engineering from manual syntax writing to architectural prompt design, model fine-tuning, and robust security verification.',
    industrySkills: [
      {
        category: 'Full-Stack & Cloud Architecture',
        items: [
          'Modern JavaScript/TypeScript (React, Node.js, Next.js)',
          'Cloud infrastructure on AWS, Azure, and Google Cloud Platform',
          'Containerization and orchestration using Docker & Kubernetes',
          'API development, GraphQL, and microservice mesh integration'
        ]
      },
      {
        category: 'Applied AI & Data Engineering',
        items: [
          'LangChain, LlamaIndex, and Vector Databases (Pinecone, ChromaDB)',
          'Fine-tuning open-source LLMs & Retrieval Augmented Generation (RAG)',
          'Data pipelines using Apache Spark, Kafka, and Snowflake',
          'Prompt engineering, AI safety auditing, and token optimization'
        ]
      },
      {
        category: 'Cybersecurity & DevSecOps',
        items: [
          'Zero-trust security architecture and automated vulnerability scanning',
          'CI/CD pipeline security (GitHub Actions, GitLab CI)',
          'Identity and access management (OAuth 2.0, OpenID Connect)',
          'Compliance frameworks (ISO 27001, GDPR, Indian DPDP Act)'
        ]
      }
    ],
    trainingReality: [
      'Colleges continue teaching legacy procedural programming without modern version control or automated testing.',
      'Lack of cloud sandbox credits leaves students unable to deploy live containerized applications.',
      'Over-emphasis on rote algorithmic syntax rather than debugging, prompt engineering, and architectural design.',
      'Disconnected laboratory exercises that fail to mirror real-world agile sprints and collaborative Git PR reviews.'
    ],
    keySkillGaps: [
      {
        title: 'Production Deployment Gap',
        description: 'Learners write code locally on desktop IDEs but struggle to configure production Docker containers, cloud ingress, or monitoring.'
      },
      {
        title: 'AI Tooling Integration Gap',
        description: 'Lack of hands-on experience using AI coding assistants (Copilot, Cursor) to safely refactor and test enterprise software.'
      },
      {
        title: 'System Security Hygiene',
        description: 'Vulnerabilities introduced through hardcoded secrets, unprotected endpoints, and ignorance of OWASP top 10 principles.'
      }
    ],
    aiImpact: {
      automatedTasks: [
        'Boilerplate CRUD code generation and schema scaffolding',
        'Basic unit test generation and standard synthetic test fixtures',
        'Routine bug localization and static syntax checks',
        'Standard log parsing and incident classification'
      ],
      humanWorkerRole: [
        'Complex architectural trade-off decisions and latency optimization',
        'Data privacy, regulatory governance, and ethical model auditing',
        'Cross-functional product design and human-centric UI/UX strategy',
        'High-security cryptographic validation and infrastructure resiliency'
      ],
      strategicTakeaway: 'Junior engineers who merely write standard syntax face severe disruption. Those who master architectural problem solving, prompt pipelines, and automated cloud validation become 5x more productive and sought-after.'
    },
    futureSkills: [
      { name: 'RAG Architecture & Vector Search', description: 'Connecting LLMs securely to proprietary business databases.' },
      { name: 'Cloud Native DevSecOps', description: 'Automating secure continuous delivery pipelines with infrastructure as code.' },
      { name: 'AI Safety & Red Teaming', description: 'Testing models against hallucinations, injection attacks, and privacy leakage.' }
    ],
    recommendedDirection: [
      'Shift undergraduate assessments from paper syntax exams to live deployed GitHub repositories with automated CI test runs.',
      'Integrate LLM API development into foundational software engineering curriculums.',
      'Partner with tech employers to establish mandatory cloud-hosted internship capstones.'
    ],
    govtSchemes: {
      online: [
        {
          name: 'FutureSkills PRIME (MeitY & NASSCOM)',
          level: 'National',
          advantages: 'Government-subsidized certification in AI, Big Data, Cloud Computing, and Cybersecurity with industry-recognized badges.',
          sourceUrl: 'https://futureskillsprime.in'
        },
        {
          name: 'Skill India Digital Hub (SIDH)',
          level: 'National',
          advantages: 'Free access to thousands of vocational and digital skill modules with Aadhaar-backed digital credentials.',
          sourceUrl: 'https://www.skillindiadigital.gov.in'
        }
      ],
      offline: [
        {
          name: 'PMKVY 4.0 Advanced Digital Centers',
          level: 'National',
          advantages: 'Physical lab training in robotics, coding, and digital design with 100% fee waiver for eligible students.',
          sourceUrl: 'https://www.msde.gov.in'
        },
        {
          name: 'Maharashtra State Skill Development Society (MSSDS)',
          level: 'State (Maharashtra)',
          advantages: 'Specialized district-level IT vocational labs across Pune, Mumbai, and Nagpur offering stipend-supported training.',
          sourceUrl: 'https://kaushalya.mahaswayam.gov.in'
        }
      ],
      blended: [
        {
          name: 'SWAYAM AICTE National Internship Portal',
          level: 'National',
          advantages: 'Blended classroom learning combined with vetted virtual and on-site software industry internships.',
          sourceUrl: 'https://internship.aicte-india.org',
          onlineComponent: 'Self-paced coursework & assignments on SWAYAM portal',
          offlineComponent: 'Mentored capstone execution at partner corporate offices'
        }
      ]
    },
    courses: {
      recommendedPathway: [
        'Step 1: Complete Harvard CS50x for algorithmic rigor and software foundations.',
        'Step 2: NPTEL Deep Learning & Cloud Computing by IIT Madras for theoretical mastery.',
        'Step 3: Build & deploy 3 full-stack AI applications on Vercel/Cloud Run for portfolio validation.'
      ],
      freeLearningNote: 'Both Harvard CS50 and NPTEL courses are 100% free to audit and access all lectures, lecture notes, and practice problem sets.',
      global: [
        {
          title: 'CS50: Introduction to Computer Science',
          institution: 'Harvard University',
          country: 'USA',
          costStatus: 'Free to audit; Verified Certificate available',
          skills: 'C, Python, SQL, JavaScript, HTML/CSS, Data Structures',
          sourceUrl: 'https://pll.harvard.edu/course/cs50-introduction-computer-science'
        },
        {
          title: 'CS50\'s Introduction to Artificial Intelligence with Python',
          institution: 'Harvard University',
          country: 'USA',
          costStatus: 'Free to audit',
          skills: 'Search algorithms, Machine Learning, Neural Networks, NLP, Optimization',
          sourceUrl: 'https://pll.harvard.edu/course/cs50s-introduction-artificial-intelligence-python'
        },
        {
          title: 'Cloud Application Development & Microservices',
          institution: 'MIT Open Learning / edX',
          country: 'USA',
          costStatus: 'Free to audit',
          skills: 'Microservice design, Docker, REST APIs, Cloud architecture',
          sourceUrl: 'https://openlearning.mit.edu'
        }
      ],
      iitNptel: [
        {
          title: 'Deep Learning for Computer Vision and NLP',
          institution: 'IIT Madras (NPTEL)',
          costStatus: 'Free to audit; ₹1000 for proctored IIT exam certificate',
          skills: 'PyTorch, Transformers, Attention mechanisms, CNNs',
          sourceUrl: 'https://nptel.ac.in/courses/106106184'
        },
        {
          title: 'Cloud Computing & Distributed Systems',
          institution: 'IIT Kharagpur (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'Virtualization, Cloud storage, MapReduce, Resource management',
          sourceUrl: 'https://nptel.ac.in/courses/106105167'
        }
      ]
    },
    policies: [
      {
        policyName: 'National AI Mission (IndiaAI)',
        level: 'National',
        support: '₹10,372 Crore funding for 10,000+ GPU compute capacity, open datasets, and AI startup grants.',
        sectorImpact: 'Accelerates affordable domestic AI compute for Indian tech founders and university research labs.',
        sourceUrl: 'https://indiaai.gov.in'
      },
      {
        policyName: 'Maharashtra State IT & ITeS Policy',
        level: 'State',
        support: 'Stamp duty exemptions, power tariff subsidies, and special FinTech / AI incubation zones in Pune & Navi Mumbai.',
        sectorImpact: 'Creates over 200,000 direct high-tech employment opportunities across the Mumbai-Pune technology corridor.',
        sourceUrl: 'https://www.maharashtra.gov.in'
      }
    ],
    hiringCompanies: [
      {
        name: 'Tata Consultancy Services (TCS)',
        roles: ['AI/ML Engineer', 'Cloud Developer', 'Systems Associate'],
        locationContext: 'Major campuses in Pune, Mumbai, Bangalore, Hyderabad',
        careerUrl: 'https://www.tcs.com/careers'
      },
      {
        name: 'Infosys',
        roles: ['Specialist Programmer', 'Cloud Solutions Architect', 'Digital Specialist'],
        locationContext: 'Pune Hinjewadi SEZ, Bangalore, Chennai',
        careerUrl: 'https://www.infosys.com/careers'
      },
      {
        name: 'Tech Mahindra',
        roles: ['Generative AI Engineer', 'Full-Stack Developer', 'Cybersecurity Analyst'],
        locationContext: 'Pune, Mumbai, Noida',
        careerUrl: 'https://careers.techmahindra.com'
      },
      {
        name: 'Persistent Systems',
        roles: ['Software Engineer', 'Data & AI Specialist', 'Cloud DevOps Associate'],
        locationContext: 'Pune (HQ), Mumbai, Goa',
        careerUrl: 'https://www.persistent.com/careers'
      }
    ],
    jobKeywords: ['Full Stack AI Developer', 'Cloud Engineer', 'MLOps Specialist', 'DevOps Associate', 'Prompt Engineer'],
    entryPathway: 'Build 2 deployed full-stack web apps with integrated LLM APIs, pass NPTEL or Harvard CS50 certification, and apply through direct campus or off-campus recruitment drives.',
    roadmap: [
      {
        phase: 'Phase 1',
        timeline: 'Months 1-3',
        title: 'Core Programming & Data Structures',
        focus: ['Master Python & TypeScript', 'Git collaborative workflows', 'Algorithmic efficiency & memory profiling']
      },
      {
        phase: 'Phase 2',
        timeline: 'Months 4-6',
        title: 'Full-Stack & Cloud Deployment',
        focus: ['React/Next.js frontend', 'Express/FastAPI backend', 'Docker containerization and AWS/GCP hosting']
      },
      {
        phase: 'Phase 3',
        timeline: 'Months 7-9',
        title: 'Applied AI & Vector Pipelines',
        focus: ['RAG architecture with Vector DBs', 'LangChain orchestration', 'Prompt caching and token management']
      },
      {
        phase: 'Phase 4',
        timeline: 'Months 10-12',
        title: 'Production Capstone & Hiring',
        focus: ['End-to-end production system deployed', 'Open-source contributions', 'Technical interview preparation']
      }
    ],
    conclusion: 'Software engineering is shifting from manual coding to intelligent systems orchestration. Learners who combine algorithmic fundamentals with modern AI tooling and verified cloud deployments will lead the next decade of digital growth.',
    references: [
      { title: 'NASSCOM Strategic Review: State of Indian Tech Workforce 2026', url: 'https://nasscom.in' },
      { title: 'MeitY IndiaAI Mission Strategic Framework', url: 'https://indiaai.gov.in' },
      { title: 'Harvard University Division of Continuing Education', url: 'https://pll.harvard.edu' }
    ]
  },

  'ev-renewables': {
    id: 'ev-renewables',
    name: 'EVs & Renewable Energy',
    tagline: 'Battery management systems, powertrain telemetry, smart grid balancing, and solar-wind integration.',
    badge: 'CleanTech & Energy',
    iconName: 'Zap',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
    introduction: 'Electric vehicles and clean energy networks are converging into intelligent, software-defined mobility and energy ecosystems. From AI-driven Battery Management Systems (BMS) that predict cell degradation to machine learning models that balance variable solar and wind power on the national grid, this sector requires interdisciplinary engineering skills.',
    industrySkills: [
      {
        category: 'Battery Technology & Thermal Engineering',
        items: [
          'Battery Management System (BMS) algorithms (State of Charge, State of Health estimation)',
          'Cell chemistry (LFP, NMC, Solid-State) and thermal runaway mitigation',
          'CAN bus protocol, OBD-II telemetry, and automotive embedded firmware',
          'High-voltage safety standards (ISO 26262 functional safety)'
        ]
      },
      {
        category: 'Power Electronics & Electric Motors',
        items: [
          'Motor controllers, Inverters, DC-DC converters, and Regenerative braking',
          'Permanent Magnet Synchronous Motors (PMSM) & Induction motor drive tuning',
          'MATLAB / Simulink powertrain simulation and Hardware-in-the-Loop (HIL) testing',
          'Fast-charging protocols (CCS2, CHAdeMO, Bharat DC001)'
        ]
      },
      {
        category: 'Smart Grid & Renewable Integration',
        items: [
          'SCADA systems, IoT smart meters, and grid telemetry analysis',
          'Machine learning for solar irradiance and wind power forecasting',
          'Microgrid control and battery energy storage system (BESS) management',
          'Green hydrogen electrolysis systems and fuel cell fundamentals'
        ]
      }
    ],
    trainingReality: [
      'Automotive and electrical engineering degrees remain focused on internal combustion engines (ICE) and traditional thermal power plants.',
      'High cost of specialized battery testing benches and dynamometers restricts practical student lab exposure.',
      'Scarcity of faculty with hands-on experience in automotive functional safety (ISO 26262) and high-voltage vehicle architectures.',
      'Lack of interdisciplinary curriculum connecting software coding with mechanical and electrochemical domains.'
    ],
    keySkillGaps: [
      {
        title: 'Embedded BMS Software Gap',
        description: 'Graduates know electrical theory but cannot program real-time CAN bus telemetry or tune Kalman filtering algorithms for battery state estimation.'
      },
      {
        title: 'High-Voltage Safety Certification',
        description: 'Absence of formal workshop certification for handling 400V–800V DC electric vehicle powertrains.'
      },
      {
        title: 'Simulation & Model-Based Design',
        description: 'Insufficient familiarity with MATLAB/Simulink and Ansys for vehicle thermal dynamics.'
      }
    ],
    aiImpact: {
      automatedTasks: [
        'Standard battery voltage logging and simple charge-cycle tracking',
        'Routine solar panel dusting detection from satellite imagery',
        'Standard power inverter fault code classification',
        'Basic vehicle route consumption estimation'
      ],
      humanWorkerRole: [
        'Advanced battery pack structural engineering and crash safety design',
        'Complex multi-physics thermal modeling and emergency safety calibration',
        'Grid-scale renewable trading strategies and regulatory interconnection',
        'Hands-on vehicle diagnostics, warranty investigation, and custom motor tuning'
      ],
      strategicTakeaway: 'AI algorithms optimize battery longevity and grid stability in real time, but mechanical reliability, functional safety compliance, and physical testing remain fundamentally human-driven engineering domains.'
    },
    futureSkills: [
      { name: 'AI-Based Battery Health Analytics', description: 'Predicting individual cell failure 500 charge cycles before occurrence.' },
      { name: 'Vehicle-to-Grid (V2G) Systems', description: 'Bidirectional charging networks transforming fleets into distributed energy storage.' },
      { name: 'Smart Power Semiconductor Design', description: 'Silicon Carbide (SiC) and Gallium Nitride (GaN) high-efficiency switching.' }
    ],
    recommendedDirection: [
      'Retrofit college mechanical and electrical laboratories with EV motor test rigs and battery pack simulators.',
      'Introduce mandatory automotive embedded software modules teaching C/C++ and CAN bus protocols.',
      'Partner with leading EV OEMs (Tata Motors, Mahindra, Ather) for student apprenticeship programs.'
    ],
    govtSchemes: {
      online: [
        {
          name: 'Skill India Clean Energy & EV Portal',
          level: 'National',
          advantages: 'Digital modules on EV powertrain design, charging infrastructure planning, and solar rooftop installation.',
          sourceUrl: 'https://www.skillindiadigital.gov.in'
        },
        {
          name: 'NITI Aayog Shoonya E-Mobility Campaign',
          level: 'National',
          advantages: 'Open educational toolkits, webinars, and case studies on urban freight and passenger EV transition.',
          sourceUrl: 'https://shoonya.info'
        }
      ],
      offline: [
        {
          name: 'ARAI (Automotive Research Association of India) EV Academy',
          level: 'National / State (Pune)',
          advantages: 'Hands-on practical training in battery testing, motor calibration, and EMC vehicle testing in Pune.',
          sourceUrl: 'https://www.araiindia.com'
        },
        {
          name: 'Maharashtra EV Policy Training Mandate',
          level: 'State',
          advantages: 'Subsidized technician certification through ITIs across Pune, Chakan, Aurangabad, and Nashik.',
          sourceUrl: 'https://www.maharashtra.gov.in'
        }
      ],
      blended: [
        {
          name: 'National Programme on High Efficiency Solar PV Modules',
          level: 'National',
          advantages: 'Hybrid certification covering automated solar cell manufacturing and rooftop grid installation.',
          sourceUrl: 'https://mnre.gov.in'
        }
      ]
    },
    courses: {
      recommendedPathway: [
        'Step 1: Understand electric vehicle fundamentals through TU Delft Electric Cars course.',
        'Step 2: Master battery management systems via IIT Madras NPTEL course.',
        'Step 3: Gain hands-on MATLAB/Simulink modeling skills for powertrain and battery simulations.'
      ],
      freeLearningNote: 'TU Delft and NPTEL course lectures are openly available at zero cost for all engineering students.',
      global: [
        {
          title: 'Electric Cars: Technology, Business, and Policy',
          institution: 'Delft University of Technology (TU Delft)',
          country: 'Netherlands',
          costStatus: 'Free to audit on edX',
          skills: 'EV powertrains, Battery degradation, Charging standards, Energy policy',
          sourceUrl: 'https://www.edx.org/school/delftx'
        },
        {
          title: 'Renewable Energy: Fundamentals and Grid Integration',
          institution: 'Technical University of Denmark (DTU)',
          country: 'Denmark',
          costStatus: 'Free to audit',
          skills: 'Wind aerodynamics, Photovoltaics, Grid stability, Smart inverters',
          sourceUrl: 'https://www.coursera.org'
        }
      ],
      iitNptel: [
        {
          title: 'Electric Vehicles - Part 1 & 2',
          institution: 'IIT Madras (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'BMS architecture, Motor control, Battery sizing, Thermal modeling',
          sourceUrl: 'https://nptel.ac.in/courses/108106170'
        },
        {
          title: 'Solar Photovoltaics: Fundamentals, Technologies and Applications',
          institution: 'IIT Bombay (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'PV cell physics, Inverter design, Balance of system, Grid tie-in',
          sourceUrl: 'https://nptel.ac.in/courses/115101007'
        }
      ]
    },
    policies: [
      {
        policyName: 'FAME II & EMPS Scheme (Electric Mobility Promotion Scheme)',
        level: 'National',
        support: 'Subsidies for electric two-wheelers, three-wheelers, buses, and public fast-charging stations.',
        sectorImpact: 'Spurred mass manufacturing of EV components and battery packs in domestic industrial clusters.',
        sourceUrl: 'https://heavyindustries.gov.in'
      },
      {
        policyName: 'Maharashtra Electric Vehicle Policy 2025',
        level: 'State',
        support: 'Incentives for EV buyers, road tax exemptions, and capital subsidies for battery gigafactories in Talegaon & Chakan.',
        sectorImpact: 'Targets 10% of all new vehicle registrations to be electric and creates 100,000 clean mobility jobs.',
        sourceUrl: 'https://www.maharashtra.gov.in'
      }
    ],
    hiringCompanies: [
      {
        name: 'Tata Motors Passenger Electric Mobility',
        roles: ['BMS Firmware Engineer', 'Powertrain Calibration Specialist', 'EV Quality Inspector'],
        locationContext: 'Pune (Pimpri-Chinchwad), Sanand',
        careerUrl: 'https://www.tatamotors.com/careers'
      },
      {
        name: 'Mahindra Electric Mobility',
        roles: ['Battery Pack Designer', 'Motor Control Engineer', 'Vehicle Testing Associate'],
        locationContext: 'Pune, Chakan, Bangalore',
        careerUrl: 'https://www.mahindra.com/careers'
      },
      {
        name: 'Bajaj Auto (Chetak EV Division)',
        roles: ['Embedded Systems Engineer', 'EV Assembly Line Specialist', 'Electrical Test Engineer'],
        locationContext: 'Akurdi & Chakan (Pune)',
        careerUrl: 'https://www.bajajauto.com/careers'
      },
      {
        name: 'Adani Green Energy & Solar',
        roles: ['Solar Farm Automation Engineer', 'Grid Integration Specialist', 'SCADA Operator'],
        locationContext: 'Gujarat, Rajasthan, Maharashtra projects',
        careerUrl: 'https://www.adanigreenenergy.com/careers'
      }
    ],
    jobKeywords: ['BMS Engineer', 'EV Powertrain Specialist', 'Battery Test Engineer', 'Solar Plant Engineer', 'Automotive Embedded Developer'],
    entryPathway: 'Complete an electrical or mechanical degree with a capstone in MATLAB BMS simulation, obtain NPTEL EV certification, and apply at automotive OEMs in the Chakan-Pune industrial belt.',
    roadmap: [
      {
        phase: 'Phase 1',
        timeline: 'Months 1-3',
        title: 'Electrical Machines & Power Electronics',
        focus: ['Inverters & DC-DC converters', 'Electric motor fundamentals', 'Circuit simulation in MATLAB/PLECS']
      },
      {
        phase: 'Phase 2',
        timeline: 'Months 4-6',
        title: 'Battery Chemistry & BMS Firmware',
        focus: ['Lithium-ion cell monitoring', 'CAN bus communication protocol', 'Thermal management and safety systems']
      },
      {
        phase: 'Phase 3',
        timeline: 'Months 7-9',
        title: 'Vehicle Powertrain & Telemetry Integration',
        focus: ['Regenerative braking algorithms', 'Hardware-in-the-loop (HIL) testing', 'IoT vehicle tracking']
      },
      {
        phase: 'Phase 4',
        timeline: 'Months 10-12',
        title: 'OEM Internship & Certification',
        focus: ['Hands-on high-voltage workshop', 'Automotive safety standards (ISO 26262)', 'OEM hiring drives']
      }
    ],
    conclusion: 'The transition from fossil fuels to electric power is an engineering revolution. Engineers with dual expertise in automotive hardware and embedded AI algorithms will lead India\'s clean mobility future.',
    references: [
      { title: 'NITI Aayog National EV Readiness Report', url: 'https://niti.gov.in' },
      { title: 'ARAI Automotive Research Association of India Technical Bulletins', url: 'https://www.araiindia.com' },
      { title: 'Ministry of New and Renewable Energy (MNRE)', url: 'https://mnre.gov.in' }
    ]
  },

  'finance-banking': {
    id: 'finance-banking',
    name: 'Finance, FinTech & Banking',
    tagline: 'Algorithmic risk underwriting, fraud detection, UPI payment rails, and regulatory compliance AI.',
    badge: 'Banking & FinTech',
    iconName: 'TrendingUp',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    introduction: 'Banking, financial services, and insurance (BFSI) in India have transformed into a high-speed digital powerhouse driven by UPI rails, Aadhaar e-KYC, and account aggregators. The next evolution combines generative AI with predictive models for instant credit scoring, automated anti-money laundering (AML), and algorithmic asset management.',
    industrySkills: [
      {
        category: 'FinTech Architecture & Payment Rails',
        items: [
          'Unified Payments Interface (UPI) switch architecture and ISO 8583/20022 protocols',
          'Core banking integration (Finacle, BaNCS) and open banking APIs',
          'Account Aggregator (AA) ecosystem and digital lending workflows',
          'Digital onboarding, video KYC, and biometric authentication'
        ]
      },
      {
        category: 'Financial Data Science & Algorithmic Risk',
        items: [
          'Credit risk scoring using gradient boosting (XGBoost, LightGBM)',
          'Real-time fraud anomaly detection on streaming transaction logs',
          'Python for financial analytics (pandas, NumPy, statsmodels)',
          'Automated financial statement spreading and GST data reconciliation'
        ]
      },
      {
        category: 'Regulatory Compliance & RegTech',
        items: [
          'Reserve Bank of India (RBI) master directions on digital lending and cybersecurity',
          'Anti-Money Laundering (AML) and Counter-Terrorism Financing (CFT) monitoring',
          'Data privacy, localization, and audit trail preservation',
          'Fair lending auditing and algorithmic bias mitigation'
        ]
      }
    ],
    trainingReality: [
      'University commerce and finance curriculums focus on manual paper ledgers and legacy Tally entries.',
      'Students rarely encounter live payment gateways, banking APIs, or programmatic financial datasets.',
      'Limited understanding of algorithmic risk models, FinTech compliance, and digital underwriting mechanisms.',
      'Lack of exposure to Python data analysis, SQL databases, or quantitative modeling in standard business degrees.'
    ],
    keySkillGaps: [
      {
        title: 'Programmatic Financial Analysis',
        description: 'Graduates know accounting theory but lack the Python or SQL capabilities needed to query millions of ledger rows.'
      },
      {
        title: 'Digital Lending & Risk Underwriting',
        description: 'Absence of practical training on how alternative data (utility bills, GST returns, UPI cashflow) determines creditworthiness.'
      },
      {
        title: 'RegTech & Compliance Architecture',
        description: 'Unfamiliarity with RBI regulations regarding data sovereignty, escrow accounts, and fair practices codes.'
      }
    ],
    aiImpact: {
      automatedTasks: [
        'Routine bank statement parsing and transaction categorization',
        'Standard customer balance queries and credit card payment reminders',
        'Basic credit score checks against bureau databases (CIBIL, Experian)',
        'Standard KYC document OCR and name-matching against watchlists'
      ],
      humanWorkerRole: [
        'Complex commercial credit underwriting and bespoke structured lending',
        'High-stakes fraud investigation, forensic accounting, and court testimony',
        'Ethical governance of algorithmic underwriting and borrower disputes',
        'Relationship banking, wealth advisory, and corporate client negotiation'
      ],
      strategicTakeaway: 'Routine clerical tasks in retail branches are automated. High-value careers belong to financial analysts who can program risk models, audit AI decisions, and structure strategic commercial loans.'
    },
    futureSkills: [
      { name: 'Explainable AI (XAI) in Credit Underwriting', description: 'Generating human-interpretable reasons for loan approvals and rejections.' },
      { name: 'Real-Time Streaming Fraud Analytics', description: 'Detecting synthetic identity theft and unauthorized UPI transfers in milliseconds.' },
      { name: 'Algorithmic Wealth & Roboadvisory', description: 'Automating tax-loss harvesting and dynamic asset allocation.' }
    ],
    recommendedDirection: [
      'Mandate Python and SQL courses for all undergraduate commerce and MBA finance students.',
      'Establish FinTech sandbox laboratories using mock banking APIs for practical credit analysis.',
      'Create dual-degree tracks combining corporate finance with quantitative data science.'
    ],
    govtSchemes: {
      online: [
        {
          name: 'NIBM (National Institute of Bank Management) Digital Certifications',
          level: 'National (RBI Established)',
          advantages: 'Comprehensive online programs in credit analysis, treasury management, and bank cybersecurity.',
          sourceUrl: 'https://www.nibmindia.org'
        },
        {
          name: 'RBI Innovation Hub (RBIH) FinTech Toolkits',
          level: 'National',
          advantages: 'Open access frameworks for friction-free credit, public tech platforms, and digital payments.',
          sourceUrl: 'https://rbihub.in'
        }
      ],
      offline: [
        {
          name: 'BSE Institute / NSE Academy Certification Programs',
          level: 'National / Mumbai',
          advantages: 'Trading floor simulations, quantitative investment training, and regulatory compliance workshops.',
          sourceUrl: 'https://www.bsebti.com'
        },
        {
          name: 'Maharashtra FinTech Policy Incubator (Navi Mumbai & BKC)',
          level: 'State',
          advantages: 'Mentorship and subsidized access to FinTech sandboxes for student innovators in Mumbai.',
          sourceUrl: 'https://www.maharashtra.gov.in'
        }
      ],
      blended: [
        {
          name: 'IIBF (Indian Institute of Banking and Finance) JAIIB / CAIIB',
          level: 'National',
          advantages: 'The gold-standard certification for banking careers, combining online courseware with proctored national exams.',
          sourceUrl: 'https://www.iibf.org.in'
        }
      ]
    },
    courses: {
      recommendedPathway: [
        'Step 1: Master Python for financial analysis and accounting databases.',
        'Step 2: Take IIM Bangalore NPTEL course on Financial Management and Risk.',
        'Step 3: Gain certification in RBI digital lending guidelines and fraud detection.'
      ],
      freeLearningNote: 'NPTEL and MIT open courseware offer full access to video lectures, case studies, and reading lists without cost.',
      global: [
        {
          title: 'Fintech: Foundations, Payments, and Regulations',
          institution: 'Wharton School, University of Pennsylvania',
          country: 'USA',
          costStatus: 'Free to audit on Coursera',
          skills: 'Payment systems, Blockchain, InsurTech, FinTech regulations',
          sourceUrl: 'https://www.coursera.org'
        },
        {
          title: 'Financial Market Analysis & Quantitative Risk',
          institution: 'MIT Open Learning',
          country: 'USA',
          costStatus: 'Free open courseware',
          skills: 'Time series modeling, Portfolio theory, Black-Scholes, Value at Risk',
          sourceUrl: 'https://ocw.mit.edu'
        }
      ],
      iitNptel: [
        {
          title: 'Financial Institutions and Markets',
          institution: 'IIT Kharagpur (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'Commercial banking, NBFCs, Money markets, Central bank policy',
          sourceUrl: 'https://nptel.ac.in/courses/110105121'
        },
        {
          title: 'Data Science for Financial Analytics',
          institution: 'IIT Madras (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'Credit scoring models, Fraud detection, Python data analysis, Regression',
          sourceUrl: 'https://nptel.ac.in/courses/110106064'
        }
      ]
    },
    policies: [
      {
        policyName: 'RBI Regulatory Sandbox & Digital Lending Guidelines',
        level: 'National',
        support: 'Regulated live testing environment for FinTech innovations with strict borrower consent norms.',
        sectorImpact: 'Transformed digital lending into an accountable, consumer-protected national industry.',
        sourceUrl: 'https://www.rbi.org.in'
      },
      {
        policyName: 'Mumbai International Financial Services Centre (IFSC) Vision',
        level: 'State / National',
        support: 'Regulatory ease, cross-border capital flow facilitation, and FinTech hub development in Mumbai BKC.',
        sectorImpact: 'Attracts global banking headquarters and creates thousands of high-paying quantitative finance roles.',
        sourceUrl: 'https://www.maharashtra.gov.in'
      }
    ],
    hiringCompanies: [
      {
        name: 'HDFC Bank',
        roles: ['Digital Risk Analyst', 'Credit Underwriter', 'FinTech Partnership Associate'],
        locationContext: 'Mumbai (HQ), Pune, Pan-India',
        careerUrl: 'https://www.hdfcbank.com/careers'
      },
      {
        name: 'ICICI Bank',
        roles: ['Quantitative Analyst', 'Relationship Manager', 'Digital Product Specialist'],
        locationContext: 'Bandra-Kurla Complex (Mumbai), Pune, Hyderabad',
        careerUrl: 'https://www.icicicareers.com'
      },
      {
        name: 'Razorpay',
        roles: ['Payment Gateway Engineer', 'Fraud Risk Specialist', 'Product Operations Associate'],
        locationContext: 'Bangalore, Mumbai, Remote',
        careerUrl: 'https://razorpay.com/jobs'
      },
      {
        name: 'Bajaj Finserv',
        roles: ['Credit Risk Modeler', 'Data Scientist (BFSI)', 'Underwriting Executive'],
        locationContext: 'Pune (HQ), Mumbai',
        careerUrl: 'https://www.bajajfinserv.in/careers'
      }
    ],
    jobKeywords: ['Credit Risk Analyst', 'FinTech Product Specialist', 'Financial Data Scientist', 'AML Compliance Officer', 'Underwriting Associate'],
    entryPathway: 'Complete an undergraduate degree in finance or statistics, build a portfolio of Python financial risk models using public datasets, pass IIBF or NPTEL certifications, and target banking graduate analyst programs.',
    roadmap: [
      {
        phase: 'Phase 1',
        timeline: 'Months 1-3',
        title: 'Core Accounting & Quantitative Foundations',
        focus: ['Financial statement analysis', 'Corporate finance principles', 'Excel & SQL database querying']
      },
      {
        phase: 'Phase 2',
        timeline: 'Months 4-6',
        title: 'Python for Financial Data Science',
        focus: ['Credit scoring algorithms', 'Fraud anomaly detection', 'Time-series financial modeling']
      },
      {
        phase: 'Phase 3',
        timeline: 'Months 7-9',
        title: 'FinTech Architecture & Banking Regulations',
        focus: ['UPI payment switches & APIs', 'RBI compliance & digital lending', 'Account Aggregator workflows']
      },
      {
        phase: 'Phase 4',
        timeline: 'Months 10-12',
        title: 'Case Studies & Bank Placement Drives',
        focus: ['End-to-end commercial underwriting project', 'Bank analyst interview prep', 'IIBF certification']
      }
    ],
    conclusion: 'The era of manual banking ledgers is over. The financial institutions of tomorrow are technology companies with banking licenses, rewarding professionals who master both financial risk and software logic.',
    references: [
      { title: 'Reserve Bank of India Annual Report & Guidelines on Digital Lending', url: 'https://www.rbi.org.in' },
      { title: 'NIBM National Institute of Bank Management Research', url: 'https://www.nibmindia.org' },
      { title: 'National Payments Corporation of India (NPCI) Technical Papers', url: 'https://www.npci.org.in' }
    ]
  },

  'manufacturing': {
    id: 'manufacturing',
    name: 'Manufacturing & Industry 4.0',
    tagline: 'Smart factories, robotic automation, digital twins, IoT telemetry, and additive manufacturing.',
    badge: 'Industrial & Robotics',
    iconName: 'Factory',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    introduction: 'Modern factories are transitioning from noisy mechanical assembly lines to connected cyber-physical systems. Smart factories in Pune, Chakan, Aurangabad, and Chennai leverage industrial IoT sensors, predictive maintenance algorithms, collaborative robots (Cobots), and digital twins to achieve zero-defect manufacturing.',
    industrySkills: [
      {
        category: 'Industrial Robotics & Automation',
        items: [
          'Programmable Logic Controllers (PLC) programming (Siemens, Rockwell, Mitsubishi)',
          'Robotic arm path planning and teaching (ABB, KUKA, Fanuc)',
          'Supervisory Control and Data Acquisition (SCADA) & HMI development',
          'Industrial communication protocols (Modbus, Profinet, OPC-UA)'
        ]
      },
      {
        category: 'Digital Twins & Predictive Maintenance',
        items: [
          'Vibration analysis, acoustic monitoring, and thermal sensor telemetry',
          'Machine learning models for Remaining Useful Life (RUL) estimation',
          'Digital twin 3D modeling using Siemens NX, PTC ThingWorx, and Dassault CATIA',
          'Computer vision for high-speed automated optical inspection (AOI)'
        ]
      },
      {
        category: 'Advanced Production & Additive Manufacturing',
        items: [
          'Industrial 3D printing (Metal DMLS, SLA, SLS) and generative design',
          'Lean manufacturing, Six Sigma (DMAIC), and Total Productive Maintenance (TPM)',
          'Supply chain track-and-trace with RFID and barcode telemetry',
          'Energy monitoring and industrial decarbonization protocols'
        ]
      }
    ],
    trainingReality: [
      'Engineering college mechanical workshops rely on manual 1970s lathe machines rather than multi-axis CNC and robotic arms.',
      'Students graduate with CAD drawing theory but have never programmed a live PLC or wired an industrial sensor.',
      'Industrial IoT protocols like OPC-UA and Modbus are rarely taught in standard academic electronics courses.',
      'Limited collaboration between industrial manufacturing clusters and local technical polytechnics.'
    ],
    keySkillGaps: [
      {
        title: 'PLC & SCADA Hands-on Programming',
        description: 'Graduates know logic gates on paper but cannot write ladder logic or diagnose field faults on shop-floor control panels.'
      },
      {
        title: 'Industrial Data Telemetry Gap',
        description: 'Engineers cannot connect legacy shop-floor machines to cloud analytics dashboards via edge gateways.'
      },
      {
        title: 'Computer Vision for Quality Control',
        description: 'Lack of practical experience deploying cameras and deep learning models for high-speed defect rejection.'
      }
    ],
    aiImpact: {
      automatedTasks: [
        'Standard component sorting and conveyor-belt part counting',
        'Routine visual surface scratch detection using automated cameras',
        'Basic tool-wear threshold alarms based on static sensor readouts',
        'Standard CNC code generation for basic rotational geometries'
      ],
      humanWorkerRole: [
        'Complex multi-machine line balancing and tooling redesign',
        'Root-cause failure analysis for non-linear catastrophic machine breakdowns',
        'Custom fixture fabrication and precision calibration for high-tolerance components',
        'Continuous Kaizen process improvement and human-robot safety cell design'
      ],
      strategicTakeaway: 'Repetitive machine tending and manual visual sorting are being replaced by vision-guided robotic systems. High-paying jobs belong to automation engineers who maintain robotic cells and analyze predictive sensor streams.'
    },
    futureSkills: [
      { name: 'Industrial Edge AI Deployment', description: 'Running inference models directly on rugged microcontrollers next to machines.' },
      { name: 'Collaborative Robotics (Cobots)', description: 'Designing safe shared workspaces where humans and robotic arms collaborate.' },
      { name: 'Generative CAD Design', description: 'Using algorithms to synthesize ultra-lightweight, high-strength metal components.' }
    ],
    recommendedDirection: [
      'Modernize engineering polytechnics by establishing Industry 4.0 center of excellence with working mini-assembly lines.',
      'Embed mandatory PLC programming and industrial sensor wiring in mechanical curriculums.',
      'Incentivize manufacturing clusters to offer 6-month paid shop-floor apprenticeships.'
    ],
    govtSchemes: {
      online: [
        {
          name: 'SAMARTH Udyog Bharat 4.0 (Ministry of Heavy Industries)',
          level: 'National',
          advantages: 'Access to Industry 4.0 awareness toolkits, demonstration center case studies, and digital manufacturing audits.',
          sourceUrl: 'https://heavyindustries.gov.in'
        },
        {
          name: 'Skill India Advanced Manufacturing Portal',
          level: 'National',
          advantages: 'Standardized curriculum modules on CNC machining, mechatronics, and automated assembly.',
          sourceUrl: 'https://www.skillindiadigital.gov.in'
        }
      ],
      offline: [
        {
          name: 'Central Manufacturing Technology Institute (CMTI) Hands-on Labs',
          level: 'National',
          advantages: 'Practical training on multi-axis CNC machines, 3D metal printers, and laser processing systems.',
          sourceUrl: 'https://cmti.res.in'
        },
        {
          name: 'Maharashtra MIDC Center of Excellence (Pune & Chakan)',
          level: 'State',
          advantages: 'Industry-partnered training facilities providing subsidized access to industrial automation hardware.',
          sourceUrl: 'https://www.midcindia.org'
        }
      ],
      blended: [
        {
          name: 'National Apprenticeship Promotion Scheme (NAPS)',
          level: 'National',
          advantages: 'Direct shop-floor industrial training with government-subsidized stipends in leading factories.',
          sourceUrl: 'https://www.apprenticeshipindia.gov.in'
        }
      ]
    },
    courses: {
      recommendedPathway: [
        'Step 1: Learn PLC ladder logic and industrial sensor interfacing.',
        'Step 2: Complete IIT Kharagpur NPTEL course on Industry 4.0 and IIoT.',
        'Step 3: Complete hands-on CAD/CAM design and seek an industrial shop-floor apprenticeship.'
      ],
      freeLearningNote: 'NPTEL and open German university resources offer complete access to industrial automation lectures and simulation tools.',
      global: [
        {
          title: 'Industry 4.0: Digital Transformation of Manufacturing',
          institution: 'RWTH Aachen University',
          country: 'Germany',
          costStatus: 'Free to audit on edX',
          skills: 'Smart manufacturing, Cyber-physical systems, OPC-UA, Digital twins',
          sourceUrl: 'https://www.edx.org'
        },
        {
          title: 'Robotics: Kinematics, Motion Planning and Control',
          institution: 'University of Pennsylvania (UPenn)',
          country: 'USA',
          costStatus: 'Free to audit',
          skills: 'Robotic kinematics, Trajectory planning, PID control, Robot Operating System (ROS)',
          sourceUrl: 'https://www.coursera.org'
        }
      ],
      iitNptel: [
        {
          title: 'Introduction to Industry 4.0 and Industrial Internet of Things',
          institution: 'IIT Kharagpur (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'Industrial IoT protocols, Cyber-physical systems, Big data in manufacturing, Predictive maintenance',
          sourceUrl: 'https://nptel.ac.in/courses/106105195'
        },
        {
          title: 'Robotics and Control: Theory and Practice',
          institution: 'IIT Roorkee (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'Industrial manipulators, Path planning, Actuators, Gripper design',
          sourceUrl: 'https://nptel.ac.in/courses/112107289'
        }
      ]
    },
    policies: [
      {
        policyName: 'Production Linked Incentive (PLI) Scheme for Manufacturing',
        level: 'National',
        support: '₹1.97 Lakh Crore across 14 manufacturing sectors including electronics, auto components, and specialty steel.',
        sectorImpact: 'Transformed India into a global manufacturing hub, driving massive demand for automation technicians.',
        sourceUrl: 'https://www.makeinindia.com'
      },
      {
        policyName: 'Maharashtra Industrial Policy (Focus on Chakan & Aurangabad Clusters)',
        level: 'State',
        support: 'Mega project subsidies, stamp duty waivers, and fast-track industrial clearances for robotics and auto manufacturers.',
        sectorImpact: 'Solidified Maharashtra as India\'s leading industrial manufacturing destination with hundreds of modern plants.',
        sourceUrl: 'https://www.maharashtra.gov.in'
      }
    ],
    hiringCompanies: [
      {
        name: 'Larsen & Toubro (L&T)',
        roles: ['Automation Engineer', 'SCADA Specialist', 'Project Engineer'],
        locationContext: 'Mumbai (Powai), Pune, Hazira, Vadodara',
        careerUrl: 'https://www.larsentoubro.com/careers'
      },
      {
        name: 'Bharat Forge Ltd',
        roles: ['Industry 4.0 Specialist', 'CNC Process Engineer', 'Metallurgical QA Engineer'],
        locationContext: 'Pune (Mundhwa, Baramati)',
        careerUrl: 'https://www.bharatforge.com/careers'
      },
      {
        name: 'Tata Motors Manufacturing',
        roles: ['Robotics Cell Specialist', 'Assembly Line Supervisor', 'Tool Maintenance Engineer'],
        locationContext: 'Pune (Pimpri), Sanand, Pantnagar',
        careerUrl: 'https://www.tatamotors.com/careers'
      },
      {
        name: 'Siemens India',
        roles: ['PLC/SCADA Programmer', 'Digital Factory Consultant', 'Service Engineer'],
        locationContext: 'Kalwa (Navi Mumbai), Pune, Bangalore',
        careerUrl: 'https://www.siemens.com/in/en/company/jobs.html'
      }
    ],
    jobKeywords: ['PLC Programmer', 'Automation Engineer', 'Robotics Specialist', 'Industrial IoT Engineer', 'Quality Control Engineer'],
    entryPathway: 'Complete an engineering or polytechnic diploma in mechanical/mechatronics, obtain PLC/SCADA certification, complete an apprenticeship in an automotive cluster, and apply for junior automation engineer roles.',
    roadmap: [
      {
        phase: 'Phase 1',
        timeline: 'Months 1-3',
        title: 'Industrial Electricals & Sensor Wiring',
        focus: ['Relay logic and control panels', 'Industrial sensors (proximity, optical, vibration)', 'Single-line electrical diagrams']
      },
      {
        phase: 'Phase 2',
        timeline: 'Months 4-6',
        title: 'PLC & HMI Programming',
        focus: ['Ladder logic programming (Siemens TIA Portal)', 'HMI interface design', 'VFD motor speed control']
      },
      {
        phase: 'Phase 3',
        timeline: 'Months 7-9',
        title: 'Industrial Robotics & Vision Systems',
        focus: ['Robotic arm teach pendant programming', 'Automated optical inspection cameras', 'OPC-UA network telemetry']
      },
      {
        phase: 'Phase 4',
        timeline: 'Months 10-12',
        title: 'Shop-Floor Apprenticeship & Placement',
        focus: ['Live factory production maintenance', 'Six Sigma problem solving', 'OEM plant recruitment']
      }
    ],
    conclusion: 'The factory of the future is not about replacing human workers, but elevating them from manual physical labor to skilled overseers of robotic precision and intelligent manufacturing systems.',
    references: [
      { title: 'Ministry of Heavy Industries - SAMARTH Udyog Bharat 4.0 Initiative', url: 'https://heavyindustries.gov.in' },
      { title: 'Make in India Production Linked Incentive (PLI) Overview', url: 'https://www.makeinindia.com' },
      { title: 'Central Manufacturing Technology Institute (CMTI) Publications', url: 'https://cmti.res.in' }
    ]
  },

  'media-creative': {
    id: 'media-creative',
    name: 'Media, Animation & Creative Services',
    tagline: 'Generative VFX, real-time 3D virtual production, AI-augmented video editing, and immersive gaming.',
    badge: 'Media & Animation',
    iconName: 'Clapperboard',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    introduction: 'The Indian Media & Entertainment sector—spanning Bollywood VFX in Mumbai, gaming studios in Pune, and digital content creation nationwide—is experiencing a seismic transformation. Generative AI tools, real-time rendering in Unreal Engine, and virtual production LED stages are revolutionizing visual storytelling.',
    industrySkills: [
      {
        category: 'Real-Time 3D & Virtual Production',
        items: [
          'Unreal Engine 5 (Nanite, Lumen, Niagara VFX particle systems)',
          'Virtual production stage camera tracking and LED volume integration',
          '3D modeling and sculpting (Blender, Autodesk Maya, ZBrush)',
          'Procedural environment and asset creation using SideFX Houdini'
        ]
      },
      {
        category: 'AI-Augmented Post-Production & VFX',
        items: [
          'Advanced compositing in Foundry Nuke and Blackmagic DaVinci Resolve',
          'Generative AI inpainting, clean-up, and neural depth map generation',
          'AI voice synthesis, lip-sync localization, and automated dialogue cleaning',
          'Color grading, HDR mastering, and multi-format audio mixing (Dolby Atmos)'
        ]
      },
      {
        category: 'Game Development & Interactive Media',
        items: [
          'Gameplay programming in C++ (Unreal) and C# (Unity)',
          'Optimization for mobile and cross-platform game engines',
          'Spatial audio, user interaction design, and physics tuning',
          'Character rigging, facial motion capture cleanup, and retargeting'
        ]
      }
    ],
    trainingReality: [
      'Commercial animation institutes charge exorbitant private tuition for outdated 2D software and basic Photoshop tools.',
      'Students rarely receive access to high-end workstation GPUs required for real-time raytracing in Unreal Engine 5.',
      'Little training on generative AI pipelines (prompt-based concept art, neural rotoscoping, automated upscaling).',
      'Focus on technical button-clicking rather than foundational visual storytelling, lighting theory, and cinematography.'
    ],
    keySkillGaps: [
      {
        title: 'Unreal Engine Virtual Production Gap',
        description: 'Artists know traditional offline rendering but cannot set up real-time camera tracking or optimize shaders for 60fps LED stages.'
      },
      {
        title: 'AI Tooling Workflow Integration',
        description: 'Resistance or lack of knowledge regarding integrating AI generative tools (Midjourney, Runway, ComfyUI) into standard production pipelines.'
      },
      {
        title: 'Industry Showreel Standards',
        description: 'Portfolios filled with generic internet tutorial assets rather than original, production-ready breakdown reels.'
      }
    ],
    aiImpact: {
      automatedTasks: [
        'Routine manual rotoscoping and background green-screen keying',
        'Basic video rough-cut assembly and automatic subtitle generation',
        'Standard texture upscaling and synthetic voice draft generation',
        'Rapid initial concept moodboard generation'
      ],
      humanWorkerRole: [
        'Directorial vision, narrative depth, emotional pacing, and storytelling nuance',
        'High-end creative lighting, camera composition, and photorealistic asset polish',
        'Complex creature anatomy modeling, emotive facial performance, and choreography',
        'Proprietary IP creation, artistic aesthetic direction, and client negotiation'
      ],
      strategicTakeaway: 'AI accelerates repetitive technical steps like rotoscoping and rough drafts from days to minutes. Artists who master AI workflows to pitch bolder creative concepts and deliver polished final renders will thrive.'
    },
    futureSkills: [
      { name: 'Generative AI Pipeline Integration (ComfyUI / Stable Diffusion)', description: 'Controllable neural generation of production assets with consistent character LoRAs.' },
      { name: 'Real-Time Virtual Cinematography', description: 'Operating digital cameras inside real-time 3D Unreal Engine environments.' },
      { name: 'Neural Radiance Fields (NeRF) & 3D Gaussian Splatting', description: 'Instant photorealistic 3D scene reconstruction from camera footage.' }
    ],
    recommendedDirection: [
      'Provide subsidized GPU lab access in public universities for real-time 3D and virtual production training.',
      'Incorporate AI generative tools ethically into animation and design curriculums as creative amplifiers.',
      'Establish studio mentorship programs with Mumbai VFX and gaming hubs to teach production breakdown reels.'
    ],
    govtSchemes: {
      online: [
        {
          name: 'MESC (Media & Entertainment Skills Council) Digital Academy',
          level: 'National',
          advantages: 'Standardized national skill qualifications in 3D animation, VFX compositing, and game design.',
          sourceUrl: 'https://www.mescindia.org'
        },
        {
          name: 'Skill India Creative Economy Hub',
          level: 'National',
          advantages: 'Free online introductory modules covering digital graphic design, audio engineering, and video editing.',
          sourceUrl: 'https://www.skillindiadigital.gov.in'
        }
      ],
      offline: [
        {
          name: 'Film and Television Institute of India (FTII) Workshops',
          level: 'National (Pune)',
          advantages: 'Renowned hands-on cinematography, editing, and sound design short courses on the historic Pune campus.',
          sourceUrl: 'https://www.ftii.ac.in'
        },
        {
          name: 'Maharashtra National Film City & AVGC Hub (Goregaon, Mumbai)',
          level: 'State',
          advantages: 'State-backed production facilities and subsidized student soundstage access in Film City Mumbai.',
          sourceUrl: 'https://www.maharashtra.gov.in'
        }
      ],
      blended: [
        {
          name: 'National AVGC-XR Policy Mission',
          level: 'National',
          advantages: 'Government-backed Centers of Excellence providing blended masterclasses by top global Hollywood & gaming artists.',
          sourceUrl: 'https://mib.gov.in'
        }
      ]
    },
    courses: {
      recommendedPathway: [
        'Step 1: Master foundational 3D modeling and animation in Blender (open-source and free).',
        'Step 2: Learn Unreal Engine 5 for real-time virtual production through Epic Games free developer portal.',
        'Step 3: Create a high-quality 60-second VFX or game environment breakdown reel on ArtStation/YouTube.'
      ],
      freeLearningNote: 'Epic Games provides hundreds of hours of world-class Unreal Engine tutorials, sample projects, and digital assets 100% free of charge.',
      global: [
        {
          title: 'Unreal Engine 5: Virtual Production & Real-Time Filmmaking',
          institution: 'Epic Games Developer Learning Community',
          country: 'USA',
          costStatus: '100% Free Official Learning Portal',
          skills: 'Lumen lighting, Nanite geometry, Virtual camera, Sequencer, Blueprints',
          sourceUrl: 'https://dev.epicgames.com/community/learning'
        },
        {
          title: 'Computer Graphics & Visual Computing',
          institution: 'UC Berkeley / edX',
          country: 'USA',
          costStatus: 'Free to audit',
          skills: 'Ray tracing, Shaders, 3D transformations, Geometry rendering',
          sourceUrl: 'https://www.edx.org'
        }
      ],
      iitNptel: [
        {
          title: 'Introduction to Computer Graphics',
          institution: 'IIT Delhi (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'Graphics pipeline, 3D modeling algorithms, Lighting models, Rasterization',
          sourceUrl: 'https://nptel.ac.in/courses/106102063'
        },
        {
          title: 'Animation & Digital Media Production',
          institution: 'IIT Bombay / IDC School of Design (NPTEL)',
          costStatus: 'Free to audit',
          skills: 'Visual storytelling, Character design, Storyboarding, Timing and staging',
          sourceUrl: 'https://nptel.ac.in/courses/107101001'
        }
      ]
    },
    policies: [
      {
        policyName: 'National AVGC-XR (Animation, Visual Effects, Gaming, Comics, Extended Reality) Policy',
        level: 'National',
        support: 'Dedicated National Center of Excellence, skill development funds, and international co-production treaties.',
        sectorImpact: 'Targets capturing 5% of global market share by 2030, creating 200,000+ high-value creative jobs.',
        sourceUrl: 'https://mib.gov.in'
      },
      {
        policyName: 'Maharashtra State AVGC Policy & Film City Modernization',
        level: 'State',
        support: 'Capital subsidies for virtual production LED stages, stamp duty waivers, and student scholarship schemes.',
        sectorImpact: 'Solidified Mumbai and Pune as the epicenter of Indian VFX, cinema post-production, and gaming development.',
        sourceUrl: 'https://www.maharashtra.gov.in'
      }
    ],
    hiringCompanies: [
      {
        name: 'DNEG (Double Negative)',
        roles: ['VFX Compositor', '3D Environment Artist', 'Creature Animator'],
        locationContext: 'Mumbai (Andheri), Mohali, Bangalore',
        careerUrl: 'https://www.dneg.com/careers'
      },
      {
        name: 'Framestore / Method Studios',
        roles: ['FX Artist', 'Lighting & LookDev Artist', 'Roto/Paint Lead'],
        locationContext: 'Mumbai, Pune',
        careerUrl: 'https://www.framestore.com/careers'
      },
      {
        name: 'Ubisoft India',
        roles: ['Junior Gameplay Programmer', '3D Level Artist', 'Technical Animator'],
        locationContext: 'Pune (Viman Nagar), Mumbai',
        careerUrl: 'https://www.ubisoft.com/en-us/company/careers'
      },
      {
        name: 'Red Chillies VFX',
        roles: ['Compositor', 'Matte Painter', 'Matchmove Artist'],
        locationContext: 'Mumbai (Khar)',
        careerUrl: 'https://www.redchillies.com'
      }
    ],
    jobKeywords: ['Unreal Engine Artist', 'VFX Compositor', '3D Generalist', 'Gameplay Programmer', 'Motion Graphics Designer'],
    entryPathway: 'Build a focused 60-second breakdown showreel demonstrating 3 photorealistic shots or playable game environments using Unreal Engine or Blender, and submit directly to studio recruitment portals.',
    roadmap: [
      {
        phase: 'Phase 1',
        timeline: 'Months 1-3',
        title: 'Artistic Foundations & 3D Core in Blender',
        focus: ['Color theory, composition, and lighting', 'Hard-surface and organic 3D modeling', 'PBR texturing and UV unwrapping']
      },
      {
        phase: 'Phase 2',
        timeline: 'Months 4-6',
        title: 'Real-Time Rendering in Unreal Engine 5',
        focus: ['Lumen dynamic lighting and Nanite geometry', 'Sequencer cinematic rendering', 'Materials and shader creation']
      },
      {
        phase: 'Phase 3',
        timeline: 'Months 7-9',
        title: 'AI Generative Pipelines & Compositing',
        focus: ['Nuke/DaVinci Resolve node-based compositing', 'AI-assisted inpainting and rotoscoping', 'Camera matchmoving']
      },
      {
        phase: 'Phase 4',
        timeline: 'Months 10-12',
        title: 'Production Showreel & Studio Applications',
        focus: ['60-second polished breakdown showreel', 'ArtStation and LinkedIn portfolio presence', 'Studio recruitment submissions']
      }
    ],
    conclusion: 'The convergence of gaming engines and generative AI has made visual storytelling more accessible than ever. Artists who master real-time 3D pipelines alongside creative vision will define the future of global entertainment.',
    references: [
      { title: 'Ministry of Information and Broadcasting - National AVGC-XR Policy', url: 'https://mib.gov.in' },
      { title: 'Media & Entertainment Skills Council (MESC) Reports', url: 'https://www.mescindia.org' },
      { title: 'Epic Games Unreal Engine Learning Resources', url: 'https://dev.epicgames.com' }
    ]
  }
};
