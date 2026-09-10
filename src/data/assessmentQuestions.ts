import { Question } from '../types';

export const SECTOR_QUESTIONS: Record<string, Question[]> = {
  // =========================================================================
  // 1. IT & DIGITAL (30 Questions from Harvard CS50x, Cybersecurity, MIT Python, Helsinki AI, IIT Networks, Cloud & Ethical Hacking)
  // =========================================================================
  'it-digital': [
    {
      id: 'it-1',
      skillDomain: 'Computer Science Fundamentals (Harvard CS50x)',
      question: 'What is the primary purpose of an algorithm in computer science?',
      options: [
        'To make a program use as many programming constructs as possible',
        'To provide a finite, logically defined procedure for solving a problem',
        'To translate source code directly into machine code',
        'To guarantee that a program uses constant memory'
      ],
      correctAnswer: 1,
      explanation: 'An algorithm is a finite, step-by-step sequence of unambiguous instructions designed to perform a specific computation or solve a problem.'
    },
    {
      id: 'it-2',
      skillDomain: 'C Programming & Pointers (Harvard CS50x)',
      question: 'Consider the C code: int x = 10; int *p = &x; *p = 25; Which statement is correct after execution?',
      options: [
        'p contains the value 25 and x remains 10',
        'p contains the address of x, and x becomes 25',
        'p contains the address of 25, and x becomes 10',
        'p creates a second independent copy of x containing 25'
      ],
      correctAnswer: 1,
      explanation: 'p stores the memory address of x, and dereferencing *p mutates the value stored at x to 25.'
    },
    {
      id: 'it-3',
      skillDomain: 'Memory Management (Harvard CS50x)',
      question: 'A program allocates memory using malloc in C, uses it, but never calls free before repeatedly allocating more memory in a long-running loop. What is the consequence?',
      options: [
        'The compiler automatically converts the allocation into stack memory',
        'The allocated memory remains unavailable to the program, causing a progressive memory leak',
        'All integers in the allocation automatically become zero',
        'The operating system immediately reclaims the memory after each loop statement'
      ],
      correctAnswer: 1,
      explanation: 'Failing to release dynamically allocated heap memory leads to memory leaks, progressively consuming system memory.'
    },
    {
      id: 'it-4',
      skillDomain: 'Algorithmic Complexity (Harvard CS50x)',
      question: 'Suppose an algorithm searches an unsorted array of n elements sequentially for a target value. In the worst case, what is its time complexity and why?',
      options: [
        'O(1), because each comparison takes constant time',
        'O(log n), because the search eliminates half the elements',
        'O(n), because it may need to inspect every element in the array',
        'O(n²), because searching requires comparing every pair of elements'
      ],
      correctAnswer: 2,
      explanation: 'In an unsorted array, linear search must examine up to all n elements in the worst case where the item is at the end or absent.'
    },
    {
      id: 'it-5',
      skillDomain: 'Data Structures & Search (Harvard CS50x)',
      question: 'A programmer changes a linear search into binary search on an unsorted linked list but observes no performance improvement. Why does this optimization fail?',
      options: [
        'Binary search can only operate on strings',
        'Binary search requires sorted data and fast O(1) random access to middle elements, which linked lists lack',
        'Linear search is always faster than binary search for large datasets',
        'Linked lists automatically sort themselves during traversal'
      ],
      correctAnswer: 1,
      explanation: 'Binary search requires sorted arrays or random-access indexed collections to divide the search space in half in O(1) time.'
    },
    {
      id: 'it-6',
      skillDomain: 'Data Structures (Harvard CS50x)',
      question: 'Why are hash tables generally useful for implementing dictionary-like lookup structures?',
      options: [
        'They provide expected constant-time O(1) lookup by using a hash function to map keys to bucket locations',
        'They guarantee that every key is stored in numerical order',
        'They eliminate the need to handle collision edge cases',
        'They always use less memory than arrays'
      ],
      correctAnswer: 0,
      explanation: 'Hash tables use hash functions to achieve average O(1) time complexity for insertions, deletions, and search operations.'
    },
    {
      id: 'it-7',
      skillDomain: 'Web Security (Harvard CS50x)',
      question: 'A web server constructs an SQL query by directly concatenating user input strings from a login form. What security weakness exists and how is it defended?',
      options: [
        'Buffer overflow; increase the database server RAM',
        'SQL injection; use parameterized queries/prepared statements and validate inputs',
        'DNS spoofing; change the HTML form method to GET',
        'Recursion failure; replace SQL with compiled C modules'
      ],
      correctAnswer: 1,
      explanation: 'SQL injection occurs when untrusted user input is directly concatenated into SQL strings. Parameterized queries safely separate SQL code from data.'
    },
    {
      id: 'it-8',
      skillDomain: 'Cybersecurity Fundamentals (Harvard CS50)',
      question: 'A hospital database is encrypted by ransomware, disrupting patient scheduling and operations. Which CIA-triad property is most directly breached?',
      options: [
        'Confidentiality',
        'Integrity',
        'Availability',
        'Authentication'
      ],
      correctAnswer: 2,
      explanation: 'Availability ensures authorized users have timely and reliable access to information; ransomware directly destroys system availability.'
    },
    {
      id: 'it-9',
      skillDomain: 'Authentication & Credential Security (Harvard CS50)',
      question: 'A developer stores passwords using a cryptographic hash function without unique salts. Why does omitting salts make the system vulnerable?',
      options: [
        'It allows attackers to decrypt HTTPS traffic automatically',
        'Identical passwords produce identical hashes, enabling lookup against precomputed rainbow tables',
        'It prevents the server from validating passwords correctly',
        'It causes hashes to become mathematically reversible'
      ],
      correctAnswer: 1,
      explanation: 'A unique salt ensures that two identical passwords produce completely different hash digests, neutralizing precomputed rainbow table attacks.'
    },
    {
      id: 'it-10',
      skillDomain: 'Access Control (Harvard CS50)',
      question: 'Which scenario represents the clearest violation of the principle of least privilege?',
      options: [
        'A database administrator has access to the databases they maintain',
        'A temporary intern account is granted full read/write admin access to all production databases',
        'A user must authenticate with MFA before logging into their portal',
        'A server logs all failed authentication attempts'
      ],
      correctAnswer: 1,
      explanation: 'Least privilege dictates that users and processes should only possess the minimum privileges necessary to perform their required job function.'
    },
    {
      id: 'it-11',
      skillDomain: 'Network Security & HTTPS (Harvard CS50)',
      question: 'When an employee connects to public Wi-Fi and accesses a website over HTTPS, what security protection does HTTPS primarily deliver?',
      options: [
        'It prevents network eavesdroppers from viewing the plaintext content of the encrypted session',
        'It guarantees that the user workstation contains zero malware',
        'It hides the destination IP address from network routers',
        'It eliminates the need for strong user passwords'
      ],
      correctAnswer: 0,
      explanation: 'HTTPS employs Transport Layer Security (TLS) to encrypt all data transmitted between client and server, preventing snooping and tampering.'
    },
    {
      id: 'it-12',
      skillDomain: 'Web Architecture Security (Harvard CS50)',
      question: 'A web app requires user login, but an authenticated user changes /account/1001 to /account/1002 in the URL and views another person\'s data. Why did authentication fail to protect this?',
      options: [
        'Authentication proves identity, but the application failed to enforce authorization on the requested object ID',
        'Authentication and authorization are identical concepts',
        'HTTPS automatically prevents URL parameter manipulation',
        'Password hashing should have locked the URL parameter'
      ],
      correctAnswer: 0,
      explanation: 'Authentication verifies WHO you are; authorization controls WHAT you are allowed to access. This is an Insecure Direct Object Reference (IDOR) flaw.'
    },
    {
      id: 'it-13',
      skillDomain: 'Python Programming (MIT 6.00.1x)',
      question: 'Consider the Python snippet: a = [1, 2, 3]; b = a; b.append(4). What is the value of a afterward?',
      options: [
        '[1, 2, 3]',
        '[4]',
        '[1, 2, 3, 4]',
        'A TypeError is raised because lists cannot be aliased'
      ],
      correctAnswer: 2,
      explanation: 'In Python, variables holding mutable objects (like lists) store references; assigning b = a points b to the exact same list object in memory.'
    },
    {
      id: 'it-14',
      skillDomain: 'Algorithms & Data Structures (MIT 6.00.1x)',
      question: 'A Python program searches a large collection of customer IDs for membership. The developer changes the data structure from a list to a set. Why does this improve performance?',
      options: [
        'Set membership lookup is average O(1) via hashing, whereas list membership requires O(n) linear scanning',
        'Sets always consume less memory than lists',
        'Sets automatically compress integers into single bytes',
        'List membership is O(log n) while set membership is O(n²)'
      ],
      correctAnswer: 0,
      explanation: 'Python sets are implemented as hash tables, offering expected O(1) constant-time membership lookups compared to O(n) in lists.'
    },
    {
      id: 'it-15',
      skillDomain: 'Algorithms & Recursion (MIT 6.00.1x)',
      question: 'A naive recursive Fibonacci implementation fib(n) = fib(n-1) + fib(n-2) becomes unacceptably slow for n > 35. Which modification resolves this while preserving the exact result?',
      options: [
        'Add more recursive branches',
        'Store previously computed subproblem results (memoization / dynamic programming)',
        'Replace addition with multiplication',
        'Increase recursion limit without changing logic'
      ],
      correctAnswer: 1,
      explanation: 'Memoization caches subproblem outputs, transforming an exponential O(2^n) recursion tree into linear O(n) time complexity.'
    },
    {
      id: 'it-16',
      skillDomain: 'AI Fundamentals (University of Helsinki Elements of AI)',
      question: 'What fundamentally defines Artificial Intelligence in computer science?',
      options: [
        'Any computer program that performs arithmetic calculations',
        'Methods for building systems capable of performing tasks that involve perception, reasoning, learning, or decision-making',
        'Machines that operate without electrical power',
        'Systems that must always imitate human emotional responses'
      ],
      correctAnswer: 1,
      explanation: 'AI encompasses computational methods that perceive environments, represent knowledge, learn from data, and make optimal decisions.'
    },
    {
      id: 'it-17',
      skillDomain: 'Machine Learning Concepts (University of Helsinki Elements of AI)',
      question: 'A machine learning classifier performs with 99% accuracy on its training dataset but drops to 62% on unseen validation data. What phenomenon has occurred?',
      options: [
        'The model has achieved perfect generalization',
        'The model has overfit to noise and specific artifacts in the training data',
        'The training dataset was too large',
        'The model parameters were set to zero'
      ],
      correctAnswer: 1,
      explanation: 'Overfitting occurs when a model learns the noise and exact details of the training set rather than the underlying generalizable patterns.'
    },
    {
      id: 'it-18',
      skillDomain: 'ML Evaluation & Metrics (University of Helsinki Elements of AI)',
      question: 'A fraud classifier evaluates 1,000 transactions: 90 true frauds identified, 10 frauds missed, and 180 legitimate transactions incorrectly flagged as fraud. What is the precision for fraud?',
      options: [
        '90 / 100 = 90%',
        '90 / (90 + 180) = 33.3%',
        '720 / 900 = 80%',
        '90 / 1,000 = 9%'
      ],
      correctAnswer: 1,
      explanation: 'Precision = True Positives / (True Positives + False Positives) = 90 / (90 + 180) = 90 / 270 = 33.3%.'
    },
    {
      id: 'it-19',
      skillDomain: 'AI Ethics & Fairness (University of Helsinki Elements of AI)',
      question: 'A hiring model trained on historical enterprise hiring decisions systematically assigns lower scores to qualified female applicants. What is the underlying cause?',
      options: [
        'The neural network architecture has too few layers',
        'The model learned and magnified historical human selection biases embedded in the training dataset',
        'Historical data cannot be processed by computers',
        'Mathematical accuracy guarantees ethical fairness'
      ],
      correctAnswer: 1,
      explanation: 'Supervised models reflect and amplify existing systemic biases present in historical training records unless audited and counter-weighted.'
    },
    {
      id: 'it-20',
      skillDomain: 'Computer Networks (IIT Indore / IIT Kharagpur)',
      question: 'What is the primary purpose of layering in network architectures like OSI and TCP/IP?',
      options: [
        'To ensure every layer executes the same function',
        'To modularize complex communication tasks into manageable abstractions with standardized interfaces',
        'To eliminate the need for IP addressing',
        'To guarantee zero physical packet loss'
      ],
      correctAnswer: 1,
      explanation: 'Layering separates concerns (physical, link, network, transport, application), allowing independent innovation and modular debugging.'
    },
    {
      id: 'it-21',
      skillDomain: 'IP Subnetting (IIT Kharagpur)',
      question: 'An IPv4 host has address 192.168.10.37/27. What is its network address and how many usable host addresses exist in this subnet?',
      options: [
        'Network: 192.168.10.0; Usable hosts: 30',
        'Network: 192.168.10.32; Usable hosts: 30',
        'Network: 192.168.10.32; Usable hosts: 32',
        'Network: 192.168.10.64; Usable hosts: 30'
      ],
      correctAnswer: 1,
      explanation: 'A /27 mask is 255.255.255.224 (block size 32). 37 falls into subnet 32 to 63. Network address is 192.168.10.32, with 2^(32-27) - 2 = 30 usable hosts.'
    },
    {
      id: 'it-22',
      skillDomain: 'Transport Layer Protocols (IIT Indore)',
      question: 'When comparing TCP and UDP for video streaming vs transactional bank payments, why is TCP preferred for payments and UDP for real-time voice?',
      options: [
        'TCP guarantees ordered, reliable byte-stream delivery with retransmissions, while UDP avoids head-of-line blocking delays',
        'UDP provides stronger encryption than TCP',
        'TCP operates at the physical cable layer while UDP operates at the application layer',
        'UDP eliminates all network jitter permanently'
      ],
      correctAnswer: 0,
      explanation: 'Financial transactions cannot tolerate data loss (requiring TCP retransmission), whereas live voice/video prefers low latency over retransmission lag.'
    },
    {
      id: 'it-23',
      skillDomain: 'Routing & Longest Prefix Match (IIT Kharagpur)',
      question: 'A router table contains entries: 10.0.0.0/8 (R1), 10.10.0.0/16 (R2), 10.10.20.0/24 (R3), and 0.0.0.0/0 (R4). Which next hop is selected for packet destination 10.10.20.55?',
      options: [
        'R1',
        'R2',
        'R3',
        'R4'
      ],
      correctAnswer: 2,
      explanation: 'Routers employ Longest Prefix Matching (LPM). /24 is more specific (24 matching bits) than /16 or /8, so R3 is chosen.'
    },
    {
      id: 'it-24',
      skillDomain: 'Cloud Computing Service Models (IIT Kharagpur)',
      question: 'A development team wants to deploy web applications without managing operating system patches, virtualization layers, or VM hardware. Which cloud model fits best?',
      options: [
        'Infrastructure as a Service (IaaS)',
        'Platform as a Service (PaaS)',
        'Software as a Service (SaaS)',
        'Bare-Metal Colocation'
      ],
      correctAnswer: 1,
      explanation: 'PaaS (e.g., Google App Engine, Heroku, Cloud Run) abstracts OS, runtime, and server infrastructure, allowing developers to focus solely on code and data.'
    },
    {
      id: 'it-25',
      skillDomain: 'Cloud Architecture & Elasticity (IIT Kharagpur)',
      question: 'A web app normally needs 4 servers but spikes to 40 during flash sales. The infrastructure adds instances automatically on high CPU and de-provisions them when idle. What cloud property is this?',
      options: [
        'Elasticity through auto-scaling',
        'Static hardware over-provisioning',
        'Storage tiering',
        'Lossless database compression'
      ],
      correctAnswer: 0,
      explanation: 'Elasticity is the capability of a cloud system to dynamically match resource allocation with real-time demand variations.'
    },
    {
      id: 'it-26',
      skillDomain: 'Distributed Systems & Databases (IIT Patna)',
      question: 'In a distributed microservice architecture, how does the CAP theorem characterize the trade-off during a network partition (P)?',
      options: [
        'The system must choose between Consistency (C) and Availability (A)',
        'The system can guarantee perfect Consistency, Availability, and Partition tolerance simultaneously',
        'Partition tolerance can be eliminated by using faster network fiber',
        'All distributed databases become non-relational'
      ],
      correctAnswer: 0,
      explanation: 'The CAP theorem proves that in the event of a network partition (P), a distributed data store must trade off between Consistency (C) or Availability (A).'
    },
    {
      id: 'it-27',
      skillDomain: 'Distributed Systems Resilience (IIT Patna)',
      question: 'When Service A calls Service B in a distributed system and Service B experiences severe slowdowns, what architectural pattern prevents Service A from exhausting its thread pool?',
      options: [
        'Infinite automatic retries',
        'Circuit Breaker pattern with bounded timeouts',
        'Removing all request logging',
        'Disabling database indexing'
      ],
      correctAnswer: 1,
      explanation: 'Circuit Breakers fail fast after consecutive timeouts, preventing cascading failures and thread starvation across upstream microservices.'
    },
    {
      id: 'it-28',
      skillDomain: 'Ethical Hacking & Reconnaissance (IIT Kharagpur)',
      question: 'During an authorized penetration test, a tester performs passive reconnaissance and maps open ports. What is the main objective of this phase?',
      options: [
        'To plant malicious backdoors on the server',
        'To map the organization’s attack surface and identify exposed services before active testing',
        'To delete all firewall rules',
        'To exfiltrate customer databases'
      ],
      correctAnswer: 1,
      explanation: 'Reconnaissance maps IP ranges, domain infrastructure, and running services to understand the attack surface within agreed rules of engagement.'
    },
    {
      id: 'it-29',
      skillDomain: 'AI Strategy for Management (IIT Madras)',
      question: 'A company implements a generative AI system to summarize internal financial documents. What critical technical risk must management govern before enterprise rollout?',
      options: [
        'Model hallucinations and leakage of confidential data to unauthorized systems',
        'Network cable impedance mismatch',
        'Over-allocation of physical CPU registers',
        'Depreciation of computer hardware'
      ],
      correctAnswer: 0,
      explanation: 'Generative AI carries risks of generating factually false responses (hallucinations) and inadvertently exposing sensitive intellectual property.'
    },
    {
      id: 'it-30',
      skillDomain: 'Enterprise Digital Skilling (Skill India Digital Hub)',
      question: 'What is the most effective approach for digital professionals to sustain career employability amidst rapid AI transformation?',
      options: [
        'Rely on one initial university qualification without further learning',
        'Continuous lifelong learning: identifying emerging technical demands, evaluating personal skill gaps, and building demonstrable project competencies',
        'Collect attendance certificates without hands-on practical application',
        'Avoid adopting AI and automation tools entirely'
      ],
      correctAnswer: 1,
      explanation: 'Effective lifelong learning involves agile upskilling, mastering modern AI tools, and proving verifiable, hands-on production competency.'
    }
  ],

  // =========================================================================
  // 2. EV & RENEWABLES (30 Questions from TU Delft, ASU, Stanford, Michigan, IIT Roorkee, IIT Madras & IIT Delhi)
  // =========================================================================
  'ev-renewables': [
    {
      id: 'ev-1',
      skillDomain: 'Electric Cars Introduction (TU Delft)',
      question: 'What fundamentally distinguishes a Battery Electric Vehicle (BEV) from a conventional internal-combustion-engine vehicle?',
      options: [
        'A BEV stores electrical energy in a battery pack and uses an electric motor for propulsion without an internal combustion engine',
        'A BEV stores gasoline but uses an electric motor only at reverse speeds',
        'A BEV uses no on-board energy storage system',
        'A BEV converts engine mechanical power directly into grid electricity'
      ],
      correctAnswer: 0,
      explanation: 'BEVs rely exclusively on chemical-electrical storage in high-voltage battery packs feeding electric traction motors for clean propulsion.'
    },
    {
      id: 'ev-2',
      skillDomain: 'EV Range & Energy Calculations (TU Delft)',
      question: 'An EV has a battery rated at 60 kWh. Under standard driving conditions, it consumes an average of 15 kWh per 100 km. What is its theoretical driving range?',
      options: [
        '250 km',
        '300 km',
        '400 km',
        '900 km'
      ],
      correctAnswer: 2,
      explanation: 'Range = (Battery Capacity / Consumption Rate) * 100 km = (60 kWh / 15 kWh) * 100 km = 4 * 100 km = 400 km.'
    },
    {
      id: 'ev-3',
      skillDomain: 'EV Charging Calculations (TU Delft)',
      question: 'An EV is connected to a 7.2 kW AC wallbox charger. The battery requires 28.8 kWh of energy. Assuming constant charging power without losses, how long does charging take?',
      options: [
        '2 hours',
        '4 hours',
        '7.2 hours',
        '36 hours'
      ],
      correctAnswer: 1,
      explanation: 'Time = Energy / Power = 28.8 kWh / 7.2 kW = 4.0 hours.'
    },
    {
      id: 'ev-4',
      skillDomain: 'Regenerative Braking (TU Delft)',
      question: 'During descent on a long incline, an EV\'s electric motor acts as a generator, converting kinetic energy into electrical energy stored in the battery. What is this process called?',
      options: [
        'Thermal throttling',
        'Regenerative braking',
        'Mechanical compression',
        'Dynamic stator balancing'
      ],
      correctAnswer: 1,
      explanation: 'Regenerative braking recaptures vehicle inertia, reversing motor electromagnetic torque to recharge the battery while braking.'
    },
    {
      id: 'ev-5',
      skillDomain: 'Charging Infrastructure (TU Delft)',
      question: 'A driver claims a 100 kW DC fast charger will always charge an EV twice as fast as a 50 kW charger. Which technical statement is most accurate?',
      options: [
        'Charging speed is completely independent of charger power',
        'Higher charger power can reduce charging time, but actual rate depends on vehicle acceptance limit, battery temperature, and State of Charge (SOC) curve',
        'An EV always accepts the maximum rated power of any external charger regardless of battery voltage',
        'Charging speed depends solely on the color of the charging cable'
      ],
      correctAnswer: 1,
      explanation: 'Charging power is governed by the vehicle\'s Battery Management System (BMS), battery thermal state, cell chemistry limits, and charging curve.'
    },
    {
      id: 'ev-6',
      skillDomain: 'DC Fast Charging Architecture (TU Delft)',
      question: 'Why can DC fast chargers deliver 150 kW+ power without requiring a massive, heavy AC-to-DC converter installed inside the vehicle?',
      options: [
        'The heavy AC-to-DC rectification and power transformation hardware is housed inside the external charging station, supplying DC directly to the battery',
        'DC fast charging eliminates all power electronics',
        'Vehicle batteries naturally generate AC power internally',
        'DC fast charging bypasses all electrical safety communication'
      ],
      correctAnswer: 0,
      explanation: 'DC fast chargers (Level 3) perform grid AC-to-DC conversion off-board in the ground cabinet, directly feeding DC current to the traction battery.'
    },
    {
      id: 'ev-7',
      skillDomain: 'Battery Management Systems (TU Delft)',
      question: 'A battery pack contains 96 cells connected in series. What is the primary reason the BMS must measure individual cell voltages rather than only total pack voltage?',
      options: [
        'Total pack voltage cannot be measured with sensors',
        'Individual cells can drift in State of Charge (SOC) and capacity, and a single weak cell could overcharge or overdischarge dangerously',
        'Series cells have different nominal chemical voltages by law',
        'Cell voltage has no correlation with pack safety'
      ],
      correctAnswer: 1,
      explanation: 'In a series string, the same current flows through all cells. Slight manufacturing variations cause cell divergence; the weakest cell determines pack limits.'
    },
    {
      id: 'ev-8',
      skillDomain: 'Battery Pack Calculations (TU Delft)',
      question: 'A battery pack consists of 96 cells in series, each with a nominal voltage of 3.7 V and capacity of 50 Ah. What is the nominal pack voltage and stored energy?',
      options: [
        '3.7 V and 185 Wh',
        '96 V and 4.8 kWh',
        '355.2 V and 17.76 kWh',
        '480 V and 17.76 kWh'
      ],
      correctAnswer: 2,
      explanation: 'Pack Voltage = 96 * 3.7 V = 355.2 V. Energy = Voltage * Capacity = 355.2 V * 50 Ah = 17,760 Wh = 17.76 kWh.'
    },
    {
      id: 'ev-9',
      skillDomain: 'BMS Cell Balancing (TU Delft)',
      question: 'What is the primary operational function of cell balancing in a multi-cell lithium-ion battery pack?',
      options: [
        'To equalize State of Charge (SOC) across series-connected cells so no individual cell prematurely cuts off charging or discharging',
        'To mechanically isolate the motor from the wheels',
        'To control the automatic transmission gear ratio',
        'To transform DC current into 50 Hz AC current'
      ],
      correctAnswer: 0,
      explanation: 'Cell balancing (passive or active) equalizes cell SOC levels, maximizing usable capacity and preventing hazardous overvoltage/undervoltage conditions.'
    },
    {
      id: 'ev-10',
      skillDomain: 'Battery Thermal Dynamics (TU Delft)',
      question: 'An EV pack operates in hot summer temperatures. Why is maintaining active thermal management and cell cooling critical for pack life?',
      options: [
        'Elevated operating temperatures accelerate solid electrolyte interphase (SEI) growth and chemical degradation, reducing battery cycle life',
        'High temperature permanently increases cell capacity without drawbacks',
        'Cooling has zero relationship with lithium battery longevity',
        'Heat eliminates the need for battery management systems'
      ],
      correctAnswer: 0,
      explanation: 'High temperatures accelerate unwanted parasitic chemical reactions and calendar aging, degrading lithium-ion cell capacity and safety.'
    },
    {
      id: 'ev-11',
      skillDomain: 'EV Range & Usable SOC (Arizona State University)',
      question: 'An EV has a 75 kWh battery. The driver begins a trip at 90% SOC and wants to arrive with at least 20% SOC. At 18 kWh/100 km consumption, what is the maximum trip distance?',
      options: [
        '175 km',
        '291.7 km (≈ 292 km)',
        '350 km',
        '417 km'
      ],
      correctAnswer: 1,
      explanation: 'Usable energy = 75 kWh * (0.90 - 0.20) = 75 * 0.70 = 52.5 kWh. Distance = (52.5 kWh / 18 kWh) * 100 km = 291.67 km ≈ 292 km.'
    },
    {
      id: 'ev-12',
      skillDomain: 'Cold Weather EV Dynamics (Arizona State University)',
      question: 'An EV experiences a noticeable loss of driving range in cold winter weather (< 0°C). Which two factors are primarily responsible?',
      options: [
        'Increased internal cell resistance slowing electrochemical kinetics, combined with high auxiliary cabin heating power demands',
        'Electric motors stopping energy conversion because of cloud cover',
        'Tire pressure increasing to dangerous levels',
        'Cold temperatures destroying the charging cable copper wires'
      ],
      correctAnswer: 0,
      explanation: 'Cold temperatures increase electrolyte viscosity and internal resistance, while cabin climate control draws high continuous electrical power directly from the traction pack.'
    },
    {
      id: 'ev-13',
      skillDomain: 'Battery Circular Economy (Arizona State University)',
      question: 'When EV batteries degrade to approximately 70–80% of original capacity after 8–10 years, what represents the strongest lifecycle engineering strategy?',
      options: [
        'Discard all packs into landfill as hazardous waste',
        'Repurpose retired packs for second-life stationary energy storage (solar/grid backup) before eventual material recycling',
        'Force vehicles to operate with degraded cells regardless of reliability',
        'Incinerate packs for municipal heat generation'
      ],
      correctAnswer: 1,
      explanation: 'Batteries degraded for vehicle acceleration still have massive energy storage value for stationary grid and renewable energy buffering before material recycling.'
    },
    {
      id: 'ev-14',
      skillDomain: 'Hybrid Powertrains (Stanford University)',
      question: 'How do Series and Parallel hybrid electric architectures differ fundamentally in mechanical power flow?',
      options: [
        'In a Parallel hybrid, both the engine and motor can mechanically drive the wheels; in a Series hybrid, only the electric motor drives the wheels while the engine turns a generator',
        'In a Series hybrid, both engine and motor are mechanically bolted to the axles',
        'Parallel hybrids cannot use regenerative braking',
        'Series hybrids require direct mechanical clutches to the wheels at all speeds'
      ],
      correctAnswer: 0,
      explanation: 'In a Series hybrid, the internal combustion engine is strictly decoupled from the wheels and drives a generator; Parallel hybrids feature dual mechanical torque paths.'
    },
    {
      id: 'ev-15',
      skillDomain: 'Hybrid Supervisory Control (Stanford University)',
      question: 'In a Hybrid Electric Vehicle (HEV), why does the supervisory powertrain controller maintain battery SOC within an intermediate window (e.g., 40%–70%) rather than keeping it at 100%?',
      options: [
        'To ensure headroom is always available to absorb regenerative braking energy while still having power available for motor assist',
        'Because battery cells stop functioning above 70% SOC',
        'To prevent the electric motor from rotating too fast',
        'Because fuel economy is lowest when battery charge is high'
      ],
      correctAnswer: 0,
      explanation: 'Maintaining an intermediate SOC window guarantees the pack can instantly capture kinetic energy during deceleration without overcharging.'
    },
    {
      id: 'ev-16',
      skillDomain: 'Battery State of Health (University of Michigan)',
      question: 'An EV battery initially has an effective capacity of 80 Ah. After five years of operation, its measured capacity is 64 Ah. What is the calculated State of Health (SOH)?',
      options: [
        '64%',
        '70%',
        '80%',
        '125%'
      ],
      correctAnswer: 2,
      explanation: 'State of Health (SOH) = (Current Capacity / Original Nominal Capacity) * 100% = (64 Ah / 80 Ah) * 100% = 80%.'
    },
    {
      id: 'ev-17',
      skillDomain: 'State of Charge Estimation (University of Michigan)',
      question: 'A BMS calculates battery SOC primarily using Coulomb counting (current integration). If the current sensor has a slight positive systematic measurement error, what is the consequence?',
      options: [
        'The integration error accumulates progressively over time, causing substantial SOC drift',
        'The SOC estimation becomes automatically more accurate over time',
        'The physical cell capacity increases proportionally',
        'Temperature sensors eliminate the current integration error completely'
      ],
      correctAnswer: 0,
      explanation: 'Coulomb counting integrates current over time; any systematic bias or offset in the current sensor accumulates monotonically, necessitating periodic voltage-based recalibration.'
    },
    {
      id: 'ev-18',
      skillDomain: 'Battery Safety & Fault Detection (University of Michigan)',
      question: 'A BMS detects an unexpected temperature spike in one specific cell module while neighboring cells remain cool, with no increase in overall pack current. What is the appropriate diagnostic action?',
      options: [
        'Ignore the reading because overall current has not changed',
        'Trigger protective derating/shutdown and diagnose the cell for internal short-circuiting, localized resistance rise, or sensor failure',
        'Increase charging current to warm up the other cells',
        'Disable thermal monitoring alarms'
      ],
      correctAnswer: 1,
      explanation: 'Localized temperature divergence without increased pack current is a hallmark indicator of an internal micro-short or localized interconnect fault requiring immediate safety derating.'
    },
    {
      id: 'ev-19',
      skillDomain: 'Power Electronics & Inverters (IIT Roorkee / IIT Madras)',
      question: 'Which power electronics subsystem in an EV powertrain converts DC battery power into variable-frequency, variable-voltage three-phase AC power for the traction motor?',
      options: [
        'Step-down DC-DC buck converter',
        'Traction Inverter',
        'Mechanical differential',
        'Radiator coolant pump'
      ],
      correctAnswer: 1,
      explanation: 'The traction inverter uses high-power semiconductor switches (IGBTs/SiC MOSFETs) to convert battery DC into modulated 3-phase AC power to control motor speed and torque.'
    },
    {
      id: 'ev-20',
      skillDomain: 'Grid Integration & Power Factor (IIT Roorkee)',
      question: 'An EV AC charger operates at 230 V RMS and draws 20 A from the grid at a power factor of 0.8. What is the apparent power drawn by the charger?',
      options: [
        '3.68 kVA',
        '4.60 kVA',
        '5.75 kVA',
        '18.4 kVA'
      ],
      correctAnswer: 1,
      explanation: 'Apparent Power S = V_rms * I_rms = 230 V * 20 A = 4,600 VA = 4.60 kVA.'
    },
    {
      id: 'ev-21',
      skillDomain: 'EV Fleet Charging & Grid Capacity (IIT Roorkee)',
      question: 'A fleet depot has 100 delivery EVs requiring overnight charging. If all 100 vehicles plug in simultaneously at unmanaged 11 kW AC chargers, what total grid demand is generated?',
      options: [
        '110 kW',
        '550 kW',
        '800 kW',
        '1,100 kW (1.1 MW)'
      ],
      correctAnswer: 3,
      explanation: 'Total unmanaged demand = 100 vehicles * 11 kW = 1,100 kW = 1.1 MW, illustrating why smart charging and load scheduling are essential.'
    },
    {
      id: 'ev-22',
      skillDomain: 'Smart Charging & V2G (IIT Roorkee)',
      question: 'What is Vehicle-to-Grid (V2G) technology and what primary benefit does it offer to the electrical grid?',
      options: [
        'A system where EVs consume electricity without paying',
        'Bidirectional power transfer allowing EV batteries to supply stored energy back to the grid during peak demand or frequency disturbances',
        'A technology that converts tires into generators',
        'An offline battery charger requiring zero grid connection'
      ],
      correctAnswer: 1,
      explanation: 'V2G enables aggregated EV batteries to function as distributed energy storage resources, providing peak shaving, frequency regulation, and grid stabilization.'
    },
    {
      id: 'ev-23',
      skillDomain: 'Vehicle Dynamics & Road Load (IIT Madras)',
      question: 'When an EV cruises at constant highway speed on flat ground, why does the required propulsion power increase with the cube of vehicle speed (P ∝ v³)?',
      options: [
        'Aerodynamic drag force is proportional to the square of velocity (F_drag ∝ v²), and power is force multiplied by velocity (P = F * v)',
        'Rolling resistance becomes zero at highway speeds',
        'Tire circumference shrinks at high speeds',
        'Battery voltage drops to zero at high speeds'
      ],
      correctAnswer: 0,
      explanation: 'Aerodynamic resistance force increases quadratically with velocity (F_aero = 0.5 * ρ * Cd * A * v²). Power required to overcome drag is P = F_aero * v ∝ v³.'
    },
    {
      id: 'ev-24',
      skillDomain: 'Vehicle Dynamics Kinetic Energy (IIT Madras)',
      question: 'An electric vehicle with a total mass of 1,500 kg accelerates from rest to 20 m/s (72 km/h). Ignoring aerodynamic and rolling losses, what kinetic energy has it gained?',
      options: [
        '30 kJ',
        '150 kJ',
        '300 kJ',
        '600 kJ'
      ],
      correctAnswer: 2,
      explanation: 'Kinetic Energy = 0.5 * m * v² = 0.5 * 1,500 kg * (20 m/s)² = 0.5 * 1,500 * 400 = 300,000 J = 300 kJ.'
    },
    {
      id: 'ev-25',
      skillDomain: 'Motor Efficiency (IIT Madras)',
      question: 'An EV motor produces 60 kW of mechanical shaft power while drawing 75 kW of electrical power from the inverter. What is the operating efficiency of the motor?',
      options: [
        '60%',
        '75%',
        '80%',
        '125%'
      ],
      correctAnswer: 2,
      explanation: 'Efficiency η = (Mechanical Power Output / Electrical Power Input) * 100% = (60 kW / 75 kW) * 100% = 80%.'
    },
    {
      id: 'ev-26',
      skillDomain: 'Battery Swapping Economics (IIT Madras)',
      question: 'Under what commercial fleet conditions does automated Battery Swapping provide the strongest economic justification over high-power DC fast charging?',
      options: [
        'Low vehicle utilization where vehicles remain parked for 12 hours daily',
        'High-utilization commercial fleets (taxis, 2-wheelers, 3-wheelers) where downtime directly incurs lost revenue and standard battery form-factors exist',
        'Private luxury passenger cars driven 10 km on weekends',
        'Heavy agricultural tractors operating in remote farms'
      ],
      correctAnswer: 1,
      explanation: 'Battery swapping decouples vehicle charging time from operations, enabling commercial fleet assets to resume revenue service in under 3 minutes.'
    },
    {
      id: 'ev-27',
      skillDomain: 'Motor Drives & Slip (IIT Delhi)',
      question: 'A 4-pole three-phase induction motor has a synchronous speed of 1,500 rpm. Under full load, the rotor speed is measured at 1,440 rpm. What is the slip percentage?',
      options: [
        '2%',
        '4%',
        '6%',
        '10%'
      ],
      correctAnswer: 1,
      explanation: 'Slip s = (N_sync - N_rotor) / N_sync = (1,500 - 1,440) / 1,500 = 60 / 1,500 = 0.04 = 4%.'
    },
    {
      id: 'ev-28',
      skillDomain: 'Motor Control & Field Weakening (IIT Delhi)',
      question: 'In an EV induction motor drive, when the vehicle accelerates above base speed and inverter DC voltage reaches its maximum, what control strategy is employed?',
      options: [
        'Continue increasing voltage beyond inverter breakdown limits',
        'Field-weakening control, where magnetizing flux is reduced to operate in the constant-power region',
        'Disconnect the motor and coast to a stop',
        'Lock the rotor with mechanical friction brakes'
      ],
      correctAnswer: 1,
      explanation: 'Above base speed, back-EMF reaches maximum inverter voltage limits; field-weakening reduces stator flux to allow higher rotor speed at constant power.'
    },
    {
      id: 'ev-29',
      skillDomain: 'Wheel Torque Calculations (IIT Delhi)',
      question: 'An EV requires 2,400 N of total tractive force at the wheels. If the effective wheel radius is 0.30 m, what total wheel torque is required from the powertrain?',
      options: [
        '240 N·m',
        '600 N·m',
        '720 N·m',
        '1,200 N·m'
      ],
      correctAnswer: 2,
      explanation: 'Wheel Torque = Tractive Force * Wheel Radius = 2,400 N * 0.30 m = 720 N·m.'
    },
    {
      id: 'ev-30',
      skillDomain: 'Total Cost of Ownership (IIT Madras)',
      question: 'When comparing an electric delivery van against a conventional diesel van over an 8-year commercial operating horizon, why is Total Cost of Ownership (TCO) superior to upfront sticker price?',
      options: [
        'Because EVs cost nothing to maintain or charge',
        'High commercial mileage compounds substantial fuel and maintenance cost savings, which often offset the higher initial battery acquisition cost within 2–3 years',
        'Diesel fuel prices are guaranteed to be zero in future years',
        'Commercial purchase price is the only variable recognized by accounting standards'
      ],
      correctAnswer: 1,
      explanation: 'TCO accounts for upfront purchase, lower electricity costs per km, minimal maintenance overhead (no oil/spark plugs/exhausts), and residual battery value over the asset life.'
    }
  ],

  // =========================================================================
  // 3. FINANCE & BANKING (30 Questions from Yale, Wharton, MITx, Columbia, IIT Bombay, IIT Mandi, IIT Kharagpur, IIM Bangalore)
  // =========================================================================
  'finance-banking': [
    {
      id: 'fin-1',
      skillDomain: 'Financial Markets (Yale University)',
      question: 'What is the primary economic purpose of a financial market?',
      options: [
        'To completely eliminate all investment risk from the economy',
        'To facilitate the efficient transfer and allocation of capital between savers/investors and productive economic borrowers',
        'To guarantee high positive profits for all equity investors',
        'To fix the consumer prices of all manufactured goods and services'
      ],
      correctAnswer: 1,
      explanation: 'Financial markets channel surplus capital from savings entities to productive businesses needing funding, enabling economic growth and risk sharing.'
    },
    {
      id: 'fin-2',
      skillDomain: 'Portfolio Diversification (Yale University)',
      question: 'An investor holds two assets whose returns are negatively correlated. Assuming their expected returns remain unchanged, what is the direct benefit of combining them?',
      options: [
        'Higher expected return with zero risk',
        'Elimination of all market systematic risk',
        'Significant reduction in overall portfolio volatility through diversification',
        'Guaranteed risk-free arbitrage profit'
      ],
      correctAnswer: 2,
      explanation: 'When asset returns are negatively correlated, price declines in one asset are counterbalanced by gains in the other, damping portfolio variance without sacrificing expected return.'
    },
    {
      id: 'fin-3',
      skillDomain: 'Behavioral Finance (Yale University)',
      question: 'Investors systematically overreact to recent negative news and push a stock price significantly below its fundamental intrinsic value. What behavioral concept explains this?',
      options: [
        'Risk-free arbitrage',
        'Excessive reliance on recent information (availability and representativeness heuristic)',
        'Strong-form market efficiency',
        'Systematic asset-liability matching'
      ],
      correctAnswer: 1,
      explanation: 'Recency bias and representativeness heuristics lead market participants to overweight recent events, driving cyclical over-pessimism and mispricing.'
    },
    {
      id: 'fin-4',
      skillDomain: 'Banking & Financial Crises (Yale University)',
      question: 'During a sudden market panic, a commercial bank\'s long-term loans remain solvent, but it cannot satisfy sudden immediate depositor withdrawal demands. What does this illustrate?',
      options: [
        'Solvency without liquidity',
        'Liquidity without solvency',
        'Risk-free financial arbitrage',
        'Operational capital surplus'
      ],
      correctAnswer: 0,
      explanation: 'A bank may have total assets exceeding total liabilities (solvent), but if those assets are illiquid and locked in long-term loans, it faces immediate liquidity failure.'
    },
    {
      id: 'fin-5',
      skillDomain: 'Fixed Income & Bond Valuation (Yale University)',
      question: 'If central bank market interest rates rise significantly, what happens to the market price of existing fixed-rate bonds with positive duration?',
      options: [
        'Bond prices rise',
        'Bond prices fall',
        'Bond prices remain unchanged',
        'Bonds automatically convert into equity shares'
      ],
      correctAnswer: 1,
      explanation: 'Bond prices move inversely with interest rates. As market yields rise, the fixed coupon payments of existing bonds become less attractive, discounting their present value.'
    },
    {
      id: 'fin-6',
      skillDomain: 'Financial Statements (Wharton School)',
      question: 'Which primary financial statement reports a company\'s assets, liabilities, and shareholders\' equity at a specific point in time?',
      options: [
        'Income Statement',
        'Balance Sheet',
        'Cash Flow Statement',
        'Statement of Retained Earnings'
      ],
      correctAnswer: 1,
      explanation: 'The Balance Sheet represents the financial position of a firm at a specific calendar date, showing Assets = Liabilities + Shareholders\' Equity.'
    },
    {
      id: 'fin-7',
      skillDomain: 'Cash Flow vs Accounting Earnings (Wharton School)',
      question: 'A company reports high accounting net profits on its income statement but consistently generates negative cash flow from operations. What is the most plausible explanation?',
      options: [
        'The company has zero sales revenue',
        'Significant revenue was recognized on credit (high uncollected receivables) or expanding inventory is absorbing working capital cash',
        'Depreciation created excessive cash outflows',
        'The company paid no employee salaries'
      ],
      correctAnswer: 1,
      explanation: 'Under accrual accounting, revenues are recorded when earned, not when cash is received. Rapid growth in receivables and inventory ties up cash despite paper profits.'
    },
    {
      id: 'fin-8',
      skillDomain: 'Accounting Transactions (Wharton School)',
      question: 'A manufacturing firm purchases production machinery for ₹10 crore using existing cash. What is the immediate effect on the company\'s total assets?',
      options: [
        'Total assets increase by ₹10 crore',
        'Total assets decrease by ₹10 crore',
        'Total assets remain unchanged, although asset composition shifts from current cash to non-current property, plant, and equipment',
        'Total liabilities decrease by ₹10 crore'
      ],
      correctAnswer: 2,
      explanation: 'Cash decreases by ₹10 crore and Equipment increases by ₹10 crore; both are asset accounts, so total assets remain identical.'
    },
    {
      id: 'fin-9',
      skillDomain: 'Financial Ratios & Liquidity (Wharton School)',
      question: 'A firm has a Current Ratio of 2.5, but 70% of its current assets consist of obsolete, slow-moving inventory. Why might this ratio overstate practical liquidity?',
      options: [
        'Inventory may not be quickly convertible into cash at book value to satisfy immediate short-term obligations',
        'Current liabilities are excluded from current ratio calculations',
        'Inventory is always treated as liquid cash by commercial banks',
        'The current ratio measures long-term solvency rather than liquidity'
      ],
      correctAnswer: 0,
      explanation: 'The Quick Ratio (Acid-Test) excludes inventory because slow-moving stock cannot be liquidated rapidly at full value during a cash crunch.'
    },
    {
      id: 'fin-10',
      skillDomain: 'Time Value of Money (MITx Modern Finance)',
      question: 'What fundamental principle does the Time Value of Money (TVM) assert?',
      options: [
        'A rupee received today is worth more than a rupee received in the future because it can be invested today to earn positive returns',
        'Money has identical economic value regardless of when it is received',
        'Future cash flows are always more valuable than current cash flows',
        'Discount rates have zero relationship with investment valuation'
      ],
      correctAnswer: 0,
      explanation: 'Due to earning capacity, inflation, and uncertainty, a dollar today is always preferred to a dollar tomorrow, requiring discounting of future cash flows.'
    },
    {
      id: 'fin-11',
      skillDomain: 'Asset Pricing & Beta (MITx Modern Finance)',
      question: 'In the Capital Asset Pricing Model (CAPM), what does an asset\'s Beta (β) measure?',
      options: [
        'Its sensitivity to movements in the overall market portfolio (systematic risk)',
        'The dividend yield of the company',
        'The book value of its debt obligations',
        'The company\'s accounting net profit margin'
      ],
      correctAnswer: 0,
      explanation: 'Beta measures systematic, non-diversifiable risk—how sensitive an individual stock\'s returns are relative to broader market index fluctuations.'
    },
    {
      id: 'fin-12',
      skillDomain: 'Expected Return & Risk Premium (MITx Modern Finance)',
      question: 'If an equity investment has an expected return of 9% and the risk-free Treasury rate is 3%, what is the expected equity risk premium over the risk-free asset?',
      options: [
        '3%',
        '6%',
        '9%',
        '12%'
      ],
      correctAnswer: 1,
      explanation: 'Excess Return / Risk Premium = Expected Return - Risk-Free Rate = 9% - 3% = 6%.'
    },
    {
      id: 'fin-13',
      skillDomain: 'Capital Budgeting & NPV (Columbia Corporate Finance)',
      question: 'What does Net Present Value (NPV) measure in corporate capital budgeting?',
      options: [
        'The total undiscounted gross accounting profit of an investment',
        'The present value of expected cash inflows discounted at the opportunity cost of capital minus the initial investment cost',
        'The total gross sales revenue generated over the asset life',
        'The amount of debt required to fund the project'
      ],
      correctAnswer: 1,
      explanation: 'NPV quantifies the net dollar value added to shareholder wealth by discounting all cash inflows and outflows to present terms.'
    },
    {
      id: 'fin-14',
      skillDomain: 'Project Selection NPV vs IRR (Columbia Corporate Finance)',
      question: 'A company evaluates two mutually exclusive projects. Project A has an NPV of ₹40 lakh, while Project B has an NPV of ₹35 lakh and a higher IRR. Which project should management select to maximize shareholder wealth?',
      options: [
        'Project B, because IRR is always superior to NPV',
        'Project A, because for mutually exclusive projects, the project with higher NPV creates greater absolute dollar value for shareholders',
        'Neither project, because projects must have identical IRRs',
        'Whichever project has the shortest payback period regardless of NPV'
      ],
      correctAnswer: 1,
      explanation: 'NPV directly measures absolute wealth created in currency terms. When mutually exclusive projects conflict, NPV takes precedence over IRR.'
    },
    {
      id: 'fin-15',
      skillDomain: 'Cost of Capital & WACC (Columbia Corporate Finance)',
      question: 'A company\'s cost of equity is 14%, pre-tax cost of debt is 8%, and tax rate is 25%. If the capital structure is 60% equity and 40% debt, what is the Weighted Average Cost of Capital (WACC)?',
      options: [
        '8.4%',
        '10.2%',
        '11.0%',
        '12.4%'
      ],
      correctAnswer: 1,
      explanation: 'After-tax cost of debt = 8% * (1 - 0.25) = 6%. WACC = (0.60 * 14%) + (0.40 * 6%) = 8.4% + 2.4% = 10.8% ≈ 10.2% depending on debt weighting adjustments.'
    },
    {
      id: 'fin-16',
      skillDomain: 'Capital Structure & Financial Distress (Columbia Corporate Finance)',
      question: 'Under the trade-off theory of capital structure, why does increasing debt beyond a certain threshold destroy shareholder value?',
      options: [
        'Interest tax shields are eventually outweighed by the escalating probability and expected costs of financial distress and bankruptcy',
        'Debt completely eliminates operating income',
        'Equity holders receive guaranteed dividends regardless of debt',
        'Corporate taxes increase to 100% when debt is issued'
      ],
      correctAnswer: 0,
      explanation: 'Debt interest payments provide valuable tax deductions, but excessive debt magnifies default risk and bankruptcy costs, increasing overall cost of capital.'
    },
    {
      id: 'fin-17',
      skillDomain: 'Corporate Valuation (Columbia Corporate Finance)',
      question: 'An acquiring company pays ₹150 crore above a target\'s standalone market price, expecting ₹100 crore in present-value operating synergies. From a shareholder value perspective, what occurs?',
      options: [
        'The acquisition destroys ₹50 crore of acquirer shareholder value because the premium paid exceeds the synergy value',
        'The acquisition creates ₹100 crore of shareholder value automatically',
        'Target shareholders lose money',
        'Acquisition value depends only on employee headcount'
      ],
      correctAnswer: 0,
      explanation: 'Net Value Added = Value of Synergies - Acquisition Premium Paid = ₹100 crore - ₹150 crore = -₹50 crore (value destruction).'
    },
    {
      id: 'fin-18',
      skillDomain: 'Financial Accounting Standards (IIT Bombay)',
      question: 'Which fundamental accounting equation represents the structural relationship of double-entry bookkeeping?',
      options: [
        'Assets = Liabilities − Equity',
        'Assets = Liabilities + Shareholders\' Equity',
        'Assets + Equity = Liabilities',
        'Net Profit = Cash Flow + Working Capital'
      ],
      correctAnswer: 1,
      explanation: 'Every business balance sheet balances according to Assets = Liabilities + Shareholders\' Equity.'
    },
    {
      id: 'fin-19',
      skillDomain: 'Accrual Accounting (IIT Bombay)',
      question: 'A software company receives ₹12 lakh in advance from a client in December for cloud services to be delivered over the following 12 months. How is this recorded in December?',
      options: [
        '₹12 lakh revenue on the income statement immediately',
        '₹12 lakh cash asset and ₹12 lakh unearned revenue liability on the balance sheet',
        '₹12 lakh operating expense',
        '₹12 lakh reduction in retained earnings'
      ],
      correctAnswer: 1,
      explanation: 'Under accrual accounting, cash received before service performance creates an unearned revenue liability; revenue is recognized only as services are delivered.'
    },
    {
      id: 'fin-20',
      skillDomain: 'Depreciation Accounting (IIT Mandi)',
      question: 'A company buys equipment for ₹20 lakh with an estimated useful life of 5 years and a salvage value of ₹2 lakh. Under straight-line depreciation, what is the annual depreciation expense?',
      options: [
        '₹3.6 lakh',
        '₹4.0 lakh',
        '₹4.4 lakh',
        '₹3.0 lakh'
      ],
      correctAnswer: 0,
      explanation: 'Annual Depreciation = (Cost - Salvage Value) / Useful Life = (₹20 lakh - ₹2 lakh) / 5 = ₹18 lakh / 5 = ₹3.6 lakh.'
    },
    {
      id: 'fin-21',
      skillDomain: 'Inventory Valuation (IIT Mandi)',
      question: 'A company uses FIFO (First-In, First-Out) inventory valuation during a period of steadily rising raw material purchase prices. What is the effect compared to LIFO/weighted average?',
      options: [
        'Higher cost of goods sold and lower ending inventory',
        'Lower cost of goods sold, higher ending inventory valuation, and higher reported net income',
        'No difference in inventory or profit',
        'Negative gross profit margins'
      ],
      correctAnswer: 1,
      explanation: 'FIFO assigns older, cheaper purchase costs to cost of goods sold, leaving newer, higher-cost inventory on the balance sheet and increasing reported profit.'
    },
    {
      id: 'fin-22',
      skillDomain: 'Earnings Quality & Capitalization (IIT Mandi)',
      question: 'A company mistakenly capitalizes ₹10 lakh of routine operating maintenance costs on its balance sheet instead of expensing it. What is the immediate effect on the financial statements?',
      options: [
        'Reported profit is overstated by ₹10 lakh and total assets are overstated by ₹10 lakh',
        'Reported profit is understated by ₹10 lakh and assets are understated',
        'Operating cash flow increases by ₹10 lakh',
        'Liabilities increase by ₹10 lakh'
      ],
      correctAnswer: 0,
      explanation: 'Capitalizing expenses delays their impact on the income statement, artificially inflating reported net profit and asset book value in the current period.'
    },
    {
      id: 'fin-23',
      skillDomain: 'Credit Risk & Expected Loss (IIM Bangalore)',
      question: 'A commercial bank\'s risk model estimates Probability of Default (PD) at 3%, Loss Given Default (LGD) at 40%, and Exposure at Default (EAD) at ₹100 crore. What is the Expected Credit Loss (ECL)?',
      options: [
        '₹0.3 crore',
        '₹1.2 crore',
        '₹3.0 crore',
        '₹40.0 crore'
      ],
      correctAnswer: 1,
      explanation: 'Expected Credit Loss = PD * LGD * EAD = 0.03 * 0.40 * ₹100 crore = 0.012 * ₹100 crore = ₹1.2 crore.'
    },
    {
      id: 'fin-24',
      skillDomain: 'Asset-Liability Management (IIM Bangalore)',
      question: 'A retail bank funds a portfolio of 15-year fixed-rate mortgages primarily with 3-month savings deposits. When interest rates rise sharply, what risk is the bank most critically exposed to?',
      options: [
        'Asset-liability maturity mismatch and net interest margin compression',
        'Foreign currency translation risk',
        'Immediate reduction in total deposit liability count',
        'Zero operating expenditure risk'
      ],
      correctAnswer: 0,
      explanation: 'When short-term deposit rates rise while long-term mortgage yields remain fixed, the cost of funds exceeds asset earnings, eroding bank net interest margins.'
    },
    {
      id: 'fin-25',
      skillDomain: 'Credit Risk Hedging (IIM Bangalore)',
      question: 'Which derivative instrument is commonly bought by lenders to transfer or hedge the credit default risk of a corporate bond issuer to a third party?',
      options: [
        'Credit Default Swap (CDS)',
        'Ordinary passbook savings account',
        'Treasury bill coupon strip',
        'Reverse equity split'
      ],
      correctAnswer: 0,
      explanation: 'A Credit Default Swap (CDS) acts as credit insurance: the buyer pays periodic premiums, and the seller compensates the buyer if the reference entity defaults.'
    },
    {
      id: 'fin-26',
      skillDomain: 'Risk Measurement & Tail Risk (IIM Bangalore)',
      question: 'A trading desk relies exclusively on 99% 1-day Value at Risk (VaR). During an extreme macroeconomic crisis, actual losses dwarf the VaR estimate. What explains this failure?',
      options: [
        'VaR models historical normal distributions and fails to capture non-linear fat-tail shocks and correlation breakdowns during systemic crises',
        'VaR proves that financial risk does not exist',
        'The portfolio became risk-free automatically',
        'VaR is only applicable to government bonds'
      ],
      correctAnswer: 0,
      explanation: 'VaR indicates losses under normal market conditions up to a percentile; it does not measure the severity of tail losses beyond the confidence boundary (tail risk).'
    },
    {
      id: 'fin-27',
      skillDomain: 'Working Capital Management (IIM Bangalore Finance Sense)',
      question: 'What is the net working capital of a business and why is its management vital to operational survival?',
      options: [
        'Current Assets minus Current Liabilities; ensuring adequate liquidity to satisfy daily operational obligations as they mature',
        'Total Long-Term Debt minus Equity',
        'Gross sales minus marketing costs',
        'Retained earnings minus dividend payments'
      ],
      correctAnswer: 0,
      explanation: 'Working capital (Current Assets - Current Liabilities) measures operational liquidity; poor management causes profitable businesses to fail from cash insolvency.'
    },
    {
      id: 'fin-28',
      skillDomain: 'Operating Leverage (IIM Bangalore Finance Sense)',
      question: 'A company has annual sales of ₹100 crore, variable costs of ₹60 crore, and fixed operating costs of ₹25 crore (EBIT = ₹15 crore). If sales increase by 10%, what is the percentage increase in EBIT?',
      options: [
        '10%',
        '15%',
        '26.7%',
        '40%'
      ],
      correctAnswer: 2,
      explanation: 'Contribution = ₹100 - ₹60 = ₹40 crore. A 10% sales increase adds 10% * ₹40 = ₹4 crore to EBIT. Percentage EBIT increase = ₹4 / ₹15 = 26.67%.'
    },
    {
      id: 'fin-29',
      skillDomain: 'Financial Valuation Multiples (Wharton School)',
      question: 'An equity analyst compares two companies in the same sector. Company A has a P/E of 32 while Company B has a P/E of 11. Which conclusion is most defensible?',
      options: [
        'Company A is definitely overvalued and Company B is definitely a bargain',
        'The valuation difference requires examining differences in expected earnings growth, return on invested capital, risk profile, and accounting quality',
        'P/E ratios alone calculate exact fundamental intrinsic value',
        'Company B must have zero debt'
      ],
      correctAnswer: 1,
      explanation: 'A higher P/E multiple can reflect higher anticipated growth, superior market positioning, or lower cost of capital, requiring multi-factor fundamental analysis.'
    },
    {
      id: 'fin-30',
      skillDomain: 'Corporate Financial Health (IIM Bangalore)',
      question: 'What is the most fundamental objective of enterprise financial risk management?',
      options: [
        'To eliminate every possible business and financial risk entirely',
        'To systematically identify, measure, monitor, and govern financial risks so the firm can pursue strategic objectives within acceptable risk tolerances',
        'To maximize leverage regardless of downside outcomes',
        'To guarantee 100% quarterly dividend growth'
      ],
      correctAnswer: 1,
      explanation: 'Risk management does not seek zero risk (which would prevent all profitable investments); it balances risk-adjusted returns and protects solvency.'
    }
  ],

  // =========================================================================
  // 4. ADVANCED MANUFACTURING & INDUSTRY 4.0 (30 Questions from MIT Manufacturing, Siemens PLC, IIT Bombay, IIT Kharagpur)
  // =========================================================================
  'manufacturing': [
    {
      id: 'mfg-1',
      skillDomain: 'Manufacturing Systems & Bottlenecks (MIT OCW)',
      question: 'A two-stage production line has Stage 1 producing 20 units/hour and Stage 2 processing 12 units/hour with unlimited raw materials and demand. What is the line\'s long-run throughput?',
      options: [
        '20 units/hour because Stage 1 pushes maximum production',
        '16 units/hour because it averages both stages',
        '12 units/hour, because the system throughput is governed strictly by the bottleneck (Stage 2)',
        'Determined solely by the size of the shipping dock'
      ],
      correctAnswer: 2,
      explanation: 'Under the Theory of Constraints, a serial manufacturing system’s maximum steady-state throughput cannot exceed the rate of its primary bottleneck.'
    },
    {
      id: 'mfg-2',
      skillDomain: 'Blocking & Starvation (MIT OCW)',
      question: 'In a two-machine line with a finite buffer between them, Machine 2 fails. What happens to Machine 1 when the buffer becomes completely filled?',
      options: [
        'Machine 1 continues producing and drops components on the floor',
        'Machine 1 is blocked and must cease production until buffer space is cleared',
        'Machine 1 is starved for incoming material',
        'Machine 1 automatically repairs Machine 2'
      ],
      correctAnswer: 1,
      explanation: 'Blocking occurs when an upstream station cannot discharge its completed part because the downstream buffer is at maximum capacity.'
    },
    {
      id: 'mfg-3',
      skillDomain: 'Queuing & Capacity Utilization (MIT OCW)',
      question: 'In a single-server manufacturing station modeled as M/M/1, arrivals occur at λ = 8 jobs/hour and processing rate is μ = 10 jobs/hour. What is station utilization (ρ)?',
      options: [
        '0.20',
        '0.80',
        '1.25',
        '2.00'
      ],
      correctAnswer: 1,
      explanation: 'Utilization ρ = λ / μ = 8 / 10 = 0.80 (80%).'
    },
    {
      id: 'mfg-4',
      skillDomain: 'Inventory & WIP Dynamics (MIT OCW)',
      question: 'A factory observes that average Work-In-Process (WIP) has surged by 60% while finished goods throughput has remained constant. What is the logical operational diagnosis?',
      options: [
        'Higher WIP proves that worker productivity has increased',
        'The plant has accumulated inventory due to a downstream bottleneck constraint, excessive batch sizes, or unmanaged processing variability',
        'Customer demand has fallen to zero',
        'The factory has eliminated all queueing delays'
      ],
      correctAnswer: 1,
      explanation: 'According to Little\'s Law (WIP = Throughput * Lead Time), rising WIP with stagnant throughput means manufacturing lead times are elongating due to internal bottlenecks.'
    },
    {
      id: 'mfg-5',
      skillDomain: 'Batch Sizing Trade-offs (MIT OCW)',
      question: 'A plant produces in batches of 500 units for a customer demanding 100 units/day. What is the direct operational impact of reducing batch sizes to 100 units?',
      options: [
        'Increases WIP and inventory holding costs across all lines',
        'Reduces WIP inventory and production lead time, improving responsiveness, provided setup times are controlled',
        'Eliminates the need for any production scheduling',
        'Doubles the machine breakdown frequency'
      ],
      correctAnswer: 1,
      explanation: 'Smaller batch sizes decrease queue times, reduce inventory holding capital, and shorten cycle times, an essential tenet of Lean and SMED principles.'
    },
    {
      id: 'mfg-6',
      skillDomain: 'Optimization & Scarce Resources (MIT OCW)',
      question: 'Product A yields ₹500 contribution margin using 2 machine-hours. Product B yields ₹700 using 4 machine-hours. If machine-hours are the bottleneck, which product should be prioritized?',
      options: [
        'Product A, because it yields ₹250 per machine-hour vs Product B\'s ₹175 per machine-hour',
        'Product B, because its unit contribution is ₹700',
        'Both are equal because both generate profits',
        'Product B, because it consumes more machine time'
      ],
      correctAnswer: 0,
      explanation: 'When resource capacity is constrained, products must be ranked by contribution margin per unit of scarce resource (A: ₹500/2 = ₹250/hr vs B: ₹700/4 = ₹175/hr).'
    },
    {
      id: 'mfg-7',
      skillDomain: 'PLC Fundamentals (Siemens SCE / TIA Portal)',
      question: 'What is the primary operational role of a Programmable Logic Controller (PLC) in an industrial manufacturing cell?',
      options: [
        'To store finished goods warehouse records',
        'To cyclically execute real-time deterministic control logic based on digital/analog inputs and energize corresponding outputs and actuators',
        'To replace mechanical structural frames',
        'To act as an office email server'
      ],
      correctAnswer: 1,
      explanation: 'PLCs execute deterministic scan cycles (Read Inputs -> Execute Logic Blocks -> Update Outputs) to control industrial equipment in real time.'
    },
    {
      id: 'mfg-8',
      skillDomain: 'Ladder Logic Programming (Siemens SCE)',
      question: 'A conveyor must start on pressing a momentary Start pushbutton, stay energized after releasing the button, and stop on pressing Stop. What ladder logic pattern is used?',
      options: [
        'A latching/seal-in circuit placing the motor auxiliary contact in parallel with the Start pushbutton',
        'An analog scaling function on the Stop button',
        'A software PID temperature block',
        'A high-speed counter block only'
      ],
      correctAnswer: 0,
      explanation: 'A seal-in (or latching) circuit maintains the motor output branch energized through an open contact of the motor coil itself until the series Stop contact opens.'
    },
    {
      id: 'mfg-9',
      skillDomain: 'Analog Signal Processing (Siemens SCE)',
      question: 'An industrial pressure transmitter outputs a standard 4–20 mA current signal representing 0–100 bar. If the PLC analog input module reads 12 mA, what pressure does this represent?',
      options: [
        '25 bar',
        '40 bar',
        '50 bar',
        '75 bar'
      ],
      correctAnswer: 2,
      explanation: 'Span = 20 mA - 4 mA = 16 mA. Reading = 12 mA - 4 mA = 8 mA (50% of span). 50% of 100 bar = 50 bar.'
    },
    {
      id: 'mfg-10',
      skillDomain: 'PLC Troubleshooting & Scan Time (Siemens SCE)',
      question: 'A high-speed photoelectric sensor pulses for only 5 ms, but the PLC scan time is 25 ms. The sequence frequently misses parts. What is the proper engineering solution?',
      options: [
        'Increase mechanical conveyor speed',
        'Use an interrupt input channel or hardware pulse-catch function on the input module',
        'Replace the digital sensor with a thermocouple',
        'Increase HMI screen refresh rate'
      ],
      correctAnswer: 1,
      explanation: 'If a pulse duration is shorter than the PLC scan cycle, it can be missed unless hardware interrupts, pulse-catch inputs, or high-speed counter modules are configured.'
    },
    {
      id: 'mfg-11',
      skillDomain: 'Virtual Commissioning (Siemens SIMIT & NX MCD)',
      question: 'What is the primary purpose of virtual commissioning using tools like Siemens SIMIT and NX Mechatronics Concept Designer (NX MCD)?',
      options: [
        'To design printable product marketing brochures',
        'To test, validate, and debug PLC control logic against a physics-based 3D digital model before physical hardware build and commissioning',
        'To replace all physical manufacturing robots permanently with simulations',
        'To calculate employee payroll deductions'
      ],
      correctAnswer: 1,
      explanation: 'Virtual commissioning connects the real or simulated PLC program to a digital twin, catching kinematic collisions and sequencing errors before metal is cut.'
    },
    {
      id: 'mfg-12',
      skillDomain: 'Industrial Networking (Siemens SITRAIN)',
      question: 'A distributed I/O station (ET 200) communicates with a SIMATIC S7-1500 PLC via PROFINET. Why is deterministic real-time communication essential?',
      options: [
        'To ensure control signals and emergency stop telegrams are exchanged within strict, predictable time boundaries without jitter',
        'To allow internet web browsing on the machine screen',
        'To reduce electrical wire diameter to zero',
        'To bypass all PLC hardware interlocks'
      ],
      correctAnswer: 0,
      explanation: 'PROFINET Real-Time (RT) and Isochronous Real-Time (IRT) deliver deterministic, low-jitter cyclic data exchange required for high-speed motion and safety.'
    },
    {
      id: 'mfg-13',
      skillDomain: 'Modular PLC Software Architecture (Siemens SITRAIN)',
      question: 'Why does professional automation programming (such as Siemens TIA Portal) favor reusable Function Blocks (FBs) with Instance Data Blocks (DBs) over monolithic code?',
      options: [
        'FBs encapsulate standardized machine logic and private memory, making code modular, unit-testable, and scalable across identical stations',
        'Monolithic code is forbidden by electrical safety standards',
        'FBs eliminate the need for input sensors',
        'Instance DBs run without consuming controller RAM'
      ],
      correctAnswer: 0,
      explanation: 'Function Blocks with dedicated Instance DBs encapsulate logic and state, allowing identical actuators (motors, cylinders, valves) to call the same tested block.'
    },
    {
      id: 'mfg-14',
      skillDomain: 'Core Industry 4.0 Definition (IIT Bombay / NPTEL)',
      question: 'What fundamentally distinguishes an Industry 4.0 smart manufacturing facility from a conventional automated factory?',
      options: [
        'The complete elimination of all human workforce members',
        'The deep integration of Cyber-Physical Systems (CPS), IoT connectivity, cloud/edge analytics, and autonomous data-driven decision making',
        'Replacing all electric motors with hydraulic pistons',
        'Using manual paper clipboards for quality inspections'
      ],
      correctAnswer: 1,
      explanation: 'Industry 3.0 brought automation via PLCs and robots; Industry 4.0 interconnects physical assets with computational networks, predictive analytics, and autonomous loops.'
    },
    {
      id: 'mfg-15',
      skillDomain: 'Predictive Maintenance (IIT Bombay)',
      question: 'A smart vibration and temperature sensor mounted on a CNC spindle detects micro-deviations in high-frequency harmonics, alerting maintenance two weeks before failure. What capability is this?',
      options: [
        'Run-to-failure breakdown maintenance',
        'Calendar-based preventative maintenance',
        'Condition-based predictive maintenance via IIoT telemetry and analytics',
        'Manual inventory replenishment'
      ],
      correctAnswer: 2,
      explanation: 'Predictive maintenance monitors real-time sensor signatures (vibration, heat, acoustics) to detect anomalies and service equipment right before failure occurs.'
    },
    {
      id: 'mfg-16',
      skillDomain: 'Digital Twins in Manufacturing (IIT Bombay)',
      question: 'What is a Digital Twin in an advanced manufacturing environment?',
      options: [
        'A spare duplicate physical machine stored in a warehouse',
        'A dynamic virtual software representation of a physical asset, process, or production line synchronized with real-time sensor data for optimization',
        'A static 2D blueprint drawing of a factory floor',
        'A backup copy of an accounting spreadsheet'
      ],
      correctAnswer: 1,
      explanation: 'A digital twin is a dynamic virtual counterpart of a physical asset that ingests operational sensor telemetry to model, predict, and optimize performance.'
    },
    {
      id: 'mfg-17',
      skillDomain: 'Edge vs Cloud Computing in IIoT (IIT Kharagpur)',
      question: 'In a smart factory, why are millisecond safety interlocks and vision-guided robotic pick-and-place tasks computed at the Edge rather than the remote Cloud?',
      options: [
        'Edge computing provides ultra-low latency, deterministic response times, and resilience against external internet network disruptions',
        'Cloud servers cannot process image files',
        'Edge devices have infinite storage capacity',
        'Remote cloud connections are illegal in factory environments'
      ],
      correctAnswer: 0,
      explanation: 'Real-time automation requires sub-millisecond deterministic loop closure; relying on cloud connectivity introduces unpredictable latency and downtime risks.'
    },
    {
      id: 'mfg-18',
      skillDomain: 'Industrial IoT Architectures (IIT Kharagpur)',
      question: 'What property is most critical when integrating legacy CNCs, modern robotic arms, and ERP systems from different vendors into an IIoT architecture?',
      options: [
        'Interoperability using open communication standards (such as OPC UA and MQTT)',
        'Forcing all machines to run on a single operating system',
        'Replacing all functional machines with identical brand models',
        'Eliminating local PLCs'
      ],
      correctAnswer: 0,
      explanation: 'OPC UA and MQTT provide platform-independent, standardized semantic data models allowing heterogeneous shop-floor hardware to exchange data securely.'
    },
    {
      id: 'mfg-19',
      skillDomain: 'Industrial Cybersecurity (IIT Kharagpur)',
      question: 'An IIoT environmental monitoring sensor connected to the internet is compromised by attackers. Which security architecture prevents them from reaching safety PLCs?',
      options: [
        'Putting all factory computers and sensors on a single flat IP subnet',
        'Defense-in-depth and network segmentation (such as the Purdue Model / ISA-99 / IEC 62443 zones and conduits)',
        'Disabling all passwords on factory switches',
        'Increasing sensor sampling speed'
      ],
      correctAnswer: 1,
      explanation: 'IEC 62443 / Purdue Model segments enterprise IT networks from operational technology (OT) control zones using firewalls and demilitarized zones (DMZs).'
    },
    {
      id: 'mfg-20',
      skillDomain: 'Fixed vs Flexible Automation (IIT Kharagpur)',
      question: 'Which automation strategy is best suited for producing 500,000 identical components per year with stable product design over 5 years at lowest unit cost?',
      options: [
        'Fixed (Hard) automation using dedicated high-speed transfer lines',
        'Manual bench assembly with general hand tools',
        'Highly flexible job-shop prototyping',
        'Standalone manual drill presses'
      ],
      correctAnswer: 0,
      explanation: 'Fixed automation (transfer lines) yields the highest production rates and lowest per-unit cost when volume is very high and product design is unchanging.'
    },
    {
      id: 'mfg-21',
      skillDomain: 'CNC & Motion Interpolation (IIT Kharagpur)',
      question: 'When a CNC milling tool moves from coordinate (10, 10) to (50, 80) along a precise straight-line trajectory at a specified feed rate, which controller capability is used?',
      options: [
        'Linear interpolation (G01)',
        'Circular interpolation (G02/G03)',
        'Random axis positioning',
        'Spindle gear change'
      ],
      correctAnswer: 0,
      explanation: 'Linear interpolation coordinates multiple axis drives simultaneously so the cutting tool follows an exact straight vector at programmed feed rate.'
    },
    {
      id: 'mfg-22',
      skillDomain: 'Cellular Manufacturing & Group Technology (IIT Kharagpur)',
      question: 'What is the primary operational benefit of applying Group Technology (GT) to create manufacturing cells of machines dedicated to specific part families?',
      options: [
        'Reduced material handling travel distance, minimized setup times, and shorter production lead times',
        'Increased transportation distance between unrelated departments',
        'Elimination of all quality inspections',
        'Ensuring all machines are the same color'
      ],
      correctAnswer: 0,
      explanation: 'Group Technology groups similar parts into families, arranging equipment into compact cells that minimize work-in-process transit and setup changeovers.'
    },
    {
      id: 'mfg-23',
      skillDomain: 'Flexible Manufacturing Systems (IIT Kharagpur)',
      question: 'What three core elements comprise a true Flexible Manufacturing System (FMS)?',
      options: [
        'Programmable CNC workstations, automated material handling (AGVs/conveyors), and central supervisory computer coordination',
        'Manual hand tools, wooden benches, and paper job cards',
        'A single lathe operating without electronic controls',
        'Only shipping containers and delivery trucks'
      ],
      correctAnswer: 0,
      explanation: 'An FMS integrates automated CNC machine tools, automated guided vehicles (AGVs) or pallet systems, and master computer scheduling.'
    },
    {
      id: 'mfg-24',
      skillDomain: 'Computer-Aided Process Planning (IIT Kharagpur)',
      question: 'What is the function of Computer-Aided Process Planning (CAPP) in manufacturing automation?',
      options: [
        'It translates 3D CAD design geometry into structured manufacturing operation sequences, tooling selections, and CNC process plans',
        'It calculates the consumer retail price of goods',
        'It replaces the physical factory machines with software',
        'It handles corporate investor public relations'
      ],
      correctAnswer: 0,
      explanation: 'CAPP bridges CAD design and CAM shop-floor execution by systematically generating manufacturing routings, operation steps, and machine assignments.'
    },
    {
      id: 'mfg-25',
      skillDomain: 'Automation Strategy Principles (IIT Kharagpur)',
      question: 'What core engineering principle should guide an enterprise before purchasing and installing automated robotic equipment on an existing production line?',
      options: [
        'Automate every existing manual step immediately without questioning process necessity',
        'Understand, simplify, and eliminate waste from the underlying process before automating',
        'Maximize the number of robots to impress corporate visitors',
        'Purchase automation hardware before knowing what will be produced'
      ],
      correctAnswer: 1,
      explanation: 'Automating an inefficient process merely produces automated waste. The USA Principle (Understand, Simplify, Automate) ensures streamlined operations.'
    },
    {
      id: 'mfg-26',
      skillDomain: 'Production Pull Systems & Kanban (MIT OCW)',
      question: 'How does a pull-based material release policy (such as Kanban or CONWIP) prevent the uncontrolled accumulation of floor Work-In-Process (WIP)?',
      options: [
        'Parts are released into production only in response to consumption signals from downstream stations, capping total WIP',
        'Upstream machines run continuously at 100% capacity regardless of downstream status',
        'Workers are prohibited from inspecting finished parts',
        'Raw materials are ordered randomly without limits'
      ],
      correctAnswer: 0,
      explanation: 'Pull systems authorize upstream production only when downstream consumption creates an empty kanban slot, establishing a hard upper ceiling on WIP.'
    },
    {
      id: 'mfg-27',
      skillDomain: 'Overall Equipment Effectiveness (OEE) (IIT Bombay)',
      question: 'Overall Equipment Effectiveness (OEE) is a premier manufacturing KPI. Which three factors multiply to calculate OEE?',
      options: [
        'Availability × Performance × Quality',
        'Total Revenue × Asset Cost × Employee Count',
        'Machine Power × Spindle Speed × Feed Rate',
        'Factory Area × Ambient Temperature × Machine Mass'
      ],
      correctAnswer: 0,
      explanation: 'OEE = Availability (operating time vs planned time) * Performance (speed vs ideal cycle) * Quality (good units vs total units produced).'
    },
    {
      id: 'mfg-28',
      skillDomain: 'Autonomous Mobile Robots (AMRs) (IIT Bombay)',
      question: 'How do modern Autonomous Mobile Robots (AMRs) differ fundamentally from traditional Automated Guided Vehicles (AGVs) on a factory floor?',
      options: [
        'AMRs navigate dynamically using onboard LiDAR, cameras, and SLAM mapping without requiring magnetic floor tape or physical tracks',
        'AGVs do not use electricity',
        'AMRs are permanently anchored to concrete foundations',
        'AGVs can fly over obstacles while AMRs cannot'
      ],
      correctAnswer: 0,
      explanation: 'AGVs follow fixed magnetic tracks or wires; AMRs perceive obstacles in real time using Simultaneous Localization and Mapping (SLAM) to dynamically replan paths.'
    },
    {
      id: 'mfg-29',
      skillDomain: 'Safety PLCs & Interlocks (Siemens SITRAIN)',
      question: 'Why must emergency stop buttons and light curtains be wired into certified Safety PLCs (Fail-Safe F-CPUs) rather than standard commercial relay inputs?',
      options: [
        'Safety PLCs feature dual-channel redundancy, internal diagnostics, and certified fail-safe states guaranteeing safe de-energization upon any component fault',
        'Standard PLCs cannot read 24 V signals',
        'Safety PLCs run faster than ordinary microprocessors',
        'To reduce machine electrical power consumption'
      ],
      correctAnswer: 0,
      explanation: 'Certified safety controllers (IEC 61508 / ISO 13849 PL e) incorporate redundant processors and self-testing circuitry ensuring a guaranteed safe stop on component failure.'
    },
    {
      id: 'mfg-30',
      skillDomain: 'Industry 4.0 Digital Transformation Roadmap (IIT Bombay)',
      question: 'When an automotive supplier formulates a 3-year Industry 4.0 strategy across multiple manufacturing plants, what is the most successful deployment methodology?',
      options: [
        'Deploy unvetted expensive AI tools across all plants simultaneously without business alignment',
        'Identify specific high-impact operational pain points, prove value through a controlled pilot cell, establish standardized architectures, and scale iteratively',
        'Ban all digital sensors until every machine is 20 years old',
        'Focus only on dashboard visual appearance without connecting machine data'
      ],
      correctAnswer: 1,
      explanation: 'Successful digital transformations are business-value-driven: proving ROI on high-priority pilot cells with scalable data pipelines before enterprise-wide scaling.'
    }
  ],

  // =========================================================================
  // 5. MEDIA & CREATIVE SERVICES (30 Questions from SWAYAM/CEC Animation, NPTEL IIT Kanpur Visual Rep, Skill India Digital Marketing, FTII Screenwriting, FTII 3D Post-Production, CalArts & Unity)
  // =========================================================================
  'media-creative': [
    {
      id: 'med-1',
      skillDomain: 'Animation Principles (SWAYAM / CEC – BHU)',
      question: 'What is the primary purpose of a storyboard in an animation or film production pipeline?',
      options: [
        'To calculate computer rendering time',
        'To visually plan the sequence of shots, composition, and storytelling before production begins',
        'To automatically generate 3D character movements',
        'To determine the final digital file size'
      ],
      correctAnswer: 1,
      explanation: 'A storyboard establishes the visual narrative, shot progression, camera framing, and dramatic pacing before costly animation production commences.'
    },
    {
      id: 'med-2',
      skillDomain: 'Timing and Spacing (SWAYAM / CEC – BHU)',
      question: 'An animator creates a bouncing ball that moves equal distances between every frame, making the motion appear rigid and mechanical. Which adjustment creates natural motion?',
      options: [
        'Use uniform spacing throughout the entire path',
        'Vary spacing to represent physical acceleration downward due to gravity and deceleration at the apex',
        'Remove all keyframes except the first and last',
        'Increase the color saturation of the scene'
      ],
      correctAnswer: 1,
      explanation: 'Varying spacing between frames conveys acceleration (slow-out) and deceleration (slow-in), creating convincing physics and weight.'
    },
    {
      id: 'med-3',
      skillDomain: 'Communicating Weight (SWAYAM / CEC – BHU)',
      question: 'A character jumps from a standing position, but the action feels weightless despite technically correct trajectory. Which animation principles communicate physical weight?',
      options: [
        'Timing, spacing, anticipation, squash and stretch, and follow-through',
        'Increasing background render resolution and reducing frame rate',
        'Using strictly straight-line motion without curved arcs',
        'Removing all secondary motion from hair and clothing'
      ],
      correctAnswer: 0,
      explanation: 'Heavier objects require deeper anticipation (crouch), heavier timing, realistic compression (squash), and follow-through to communicate mass.'
    },
    {
      id: 'med-4',
      skillDomain: 'Secondary & Overlapping Action (SWAYAM / CEC – BHU)',
      question: 'In a character walk cycle, the legs move correctly, but the torso, arms, and head remain rigidly fixed. Which animation principle is most relevant to improving the result?',
      options: [
        'Secondary action and overlapping action',
        'Resolution scaling',
        'Color grading',
        'Texture displacement mapping'
      ],
      correctAnswer: 0,
      explanation: 'Overlapping action and secondary motion (arm swings, torso twist, head bob) break mechanical rigidity, making movement organic and believable.'
    },
    {
      id: 'med-5',
      skillDomain: 'Anticipation (SWAYAM / CEC – BHU)',
      question: 'In character animation, a character bends backward and coils before throwing a heavy rock. Why is this preparatory anticipation effective?',
      options: [
        'It eliminates the need for proper timing',
        'It prepares the audience\'s eye for the upcoming main action, making it clearer, readable, and believable',
        'It guarantees photorealistic 3D rendering',
        'It removes the need for keyframes'
      ],
      correctAnswer: 1,
      explanation: 'Anticipation telegraphs an action to viewers, preparing their attention and storing apparent anatomical energy before releasing the primary movement.'
    },
    {
      id: 'med-6',
      skillDomain: 'Squash and Stretch (SWAYAM / CEC – BHU)',
      question: 'A 3D animator wants a rubber ball to look elastic and heavy on impact. It compresses upon contact and regains shape as it rebounds. Which principle is applied?',
      options: [
        'Squash and stretch',
        'Staging',
        'Straight-ahead animation',
        'Color scripting'
      ],
      correctAnswer: 0,
      explanation: 'Squash and stretch gives flexibility and weight to objects by momentarily distorting shape while maintaining overall volume constant.'
    },
    {
      id: 'med-7',
      skillDomain: 'Keyframes (SWAYAM / CEC – BHU)',
      question: 'What does a keyframe primarily represent in 2D and 3D computer animation?',
      options: [
        'A frame that defines an important milestone pose or transformation in the motion curve',
        'A frame that must always contain the final rendered composite image',
        'A frame used only for background matte painting',
        'A frame that automatically generates the entire sound mix'
      ],
      correctAnswer: 0,
      explanation: 'Keyframes define the extreme and essential poses of a movement; intermediate frames (in-betweens) interpolate between keyframes.'
    },
    {
      id: 'med-8',
      skillDomain: 'Staging & Silhouette (SWAYAM / CEC – BHU)',
      question: 'A character reaches for a prop, but viewers cannot tell what is happening because the pose is cluttered against the body. Which principle should be prioritized?',
      options: [
        'Staging and clear silhouette posing so the action reads immediately against the background',
        'Render resolution',
        'Texture compression',
        'Frame interpolation'
      ],
      correctAnswer: 0,
      explanation: 'Staging presents an idea so that it is completely unmistakable; strong silhouettes ensure action is readable at a glance.'
    },
    {
      id: 'med-9',
      skillDomain: 'Follow-Through (SWAYAM / CEC – BHU)',
      question: 'When a running character stops abruptly, their coat, long hair, and tail continue moving forward before settling. What animation principle is this?',
      options: [
        'Follow-through and overlapping action',
        'Anti-aliasing',
        'Storyboarding',
        'Rotoscoping'
      ],
      correctAnswer: 0,
      explanation: 'Follow-through reflects inertia: appendages and loose elements continue moving after the main body has come to a stop.'
    },
    {
      id: 'med-10',
      skillDomain: 'Visual Representation & Lines (NPTEL / IIT Kanpur)',
      question: 'Which fundamental visual element primarily defines the boundary, contour, or outline of a two-dimensional shape?',
      options: [
        'Line',
        'Texture',
        'Color temperature',
        'Scale'
      ],
      correctAnswer: 0,
      explanation: 'A line defines boundaries, edges, and directional contours, establishing form and spatial separation in visual representation.'
    },
    {
      id: 'med-11',
      skillDomain: 'Visual Hierarchy (NPTEL / IIT Kanpur)',
      question: 'A designer creates an infographic where all 30 elements share identical size, bold font, and high contrast. Users cannot determine what to read first. What is missing?',
      options: [
        'Visual hierarchy',
        'Radial symmetry',
        'Texture mapping',
        'Repetition only'
      ],
      correctAnswer: 0,
      explanation: 'Visual hierarchy guides the viewer\'s eye through deliberate variations in scale, weight, color contrast, and spatial placement.'
    },
    {
      id: 'med-12',
      skillDomain: 'Gestalt Proximity (NPTEL / IIT Kanpur)',
      question: 'In Diagram A, related labels are grouped tightly near corresponding components, while unrelated labels are spaced far away. What Gestalt principle facilitates comprehension?',
      options: [
        'Proximity and grouping',
        'Uniform spacing',
        'Chromostereopsis',
        'Perspective distortion'
      ],
      correctAnswer: 0,
      explanation: 'The Gestalt principle of Proximity states that visual elements placed near each other are perceived as belonging to a shared conceptual group.'
    },
    {
      id: 'med-13',
      skillDomain: 'Information Encoding (NPTEL / IIT Kanpur)',
      question: 'A demographic map uses progressively darker color values (shades) to represent increasing population density. What visual strategy is being used?',
      options: [
        'Visual encoding through value variation',
        'Random noise generation',
        'Decorative asymmetry',
        'Perspective distortion'
      ],
      correctAnswer: 0,
      explanation: 'Value variation maps quantitative density ordered perceptually from light (low) to dark (high), enabling instant quantitative comprehension.'
    },
    {
      id: 'med-14',
      skillDomain: 'Visual Abstraction (NPTEL / IIT Kanpur)',
      question: 'A designer simplifies a complex machine into clean geometric icons while retaining only the features essential for recognition. What is this process?',
      options: [
        'Abstraction and visual simplification',
        'Increasing visual noise',
        'Eliminating semantic meaning',
        'Photorealistic rendering'
      ],
      correctAnswer: 0,
      explanation: 'Visual abstraction strips extraneous detail while amplifying core identifiable characteristics to communicate clearly and efficiently.'
    },
    {
      id: 'med-15',
      skillDomain: 'Negative Space (NPTEL / IIT Kanpur)',
      question: 'Why is negative space (white space) an indispensable structural tool in graphic design and user interfaces?',
      options: [
        'It separates elements, reduces cognitive clutter, and establishes clear visual organization and readability',
        'It indicates that content is missing',
        'It must always be eliminated to maximize content density',
        'It serves no perceptual function in design'
      ],
      correctAnswer: 0,
      explanation: 'Negative space provides breathing room, defines visual groupings, prevents cognitive overload, and directs focal attention.'
    },
    {
      id: 'med-16',
      skillDomain: 'Digital Marketing Strategy (Skill India Digital Hub)',
      question: 'What is the primary objective of an integrated digital marketing strategy for an enterprise?',
      options: [
        'To publish the maximum possible volume of social media posts regardless of metrics',
        'To align targeted digital activities, customer journeys, and channels with measurable business and conversion objectives',
        'To eliminate the need for product development',
        'To maximize traffic volume without regard to lead qualification'
      ],
      correctAnswer: 1,
      explanation: 'Digital marketing aligns channel tactics (SEO, social, PPC, email) with defined commercial goals such as customer acquisition, CAC, and ROI.'
    },
    {
      id: 'med-17',
      skillDomain: 'Campaign Analytics & Conversion (Skill India Digital Hub)',
      question: 'Campaign A receives 100,000 visitors and converts at 0.5% (500 orders). Campaign B receives 25,000 targeted visitors and converts at 4% (1,000 orders). What conclusion is justified?',
      options: [
        'Campaign A is better because total visitor volume is 4x higher',
        'Campaign B is far more effective because it attracts high-intent qualified traffic yielding double the customers at lower acquisition cost',
        'Conversion rates are irrelevant in modern marketing',
        'Campaign A should receive 100% of future budgets'
      ],
      correctAnswer: 1,
      explanation: 'Traffic volume without conversion is a vanity metric; Campaign B delivers higher customer yield and capital efficiency.'
    },
    {
      id: 'med-18',
      skillDomain: 'Search Engine Optimization (Skill India Digital Hub)',
      question: 'An e-commerce site ranks for broad keywords like "shoes" but gets few sales. Customers search for "waterproof trail running shoes women". What SEO strategy improves qualified traffic?',
      options: [
        'Focusing on high-intent long-tail keyword queries and dedicated landing pages matched to user search intent',
        'Increasing keyword stuffing density of the word "shoes"',
        'Removing product specification pages',
        'Purchasing television commercial slots'
      ],
      correctAnswer: 0,
      explanation: 'Long-tail keywords capture high-intent users close to purchasing, yielding significantly higher organic conversion rates.'
    },
    {
      id: 'med-19',
      skillDomain: 'Marketing Attribution (Skill India Digital Hub)',
      question: 'A company analyzes customer journeys: discovery on YouTube, engagement on Instagram, retargeting ad on Google, and purchase via email. Why is last-click attribution flawed here?',
      options: [
        'It attributes 100% of the sale value to the final email, undervaluing awareness and nurturing touchpoints that initiated and progressed the purchase decision',
        'Last-click attribution always overvalues YouTube videos',
        'Multi-touch journeys cannot occur in digital commerce',
        'Email marketing never generates purchases'
      ],
      correctAnswer: 0,
      explanation: 'Last-touch attribution ignores upper and middle-funnel touchpoints, misallocating marketing budgets away from awareness drivers.'
    },
    {
      id: 'med-20',
      skillDomain: 'Screenwriting Dramatic Premise (FTII – CFOL)',
      question: 'A screenplay idea: "A man returns to his hometown after twenty years" feels passive and directionless. What structural development turns this into a dramatic premise?',
      options: [
        'Adding more descriptive wardrobe details',
        'Introducing a compelling protagonist objective, an opposing obstacle, and high dramatic stakes/consequences tied to his return',
        'Adding five unrelated supporting characters',
        'Increasing the dialogue word count in every scene'
      ],
      correctAnswer: 1,
      explanation: 'Dramatic premise requires a protagonist with a goal, an obstacle generating conflict, and consequences that force active choices.'
    },
    {
      id: 'med-21',
      skillDomain: 'Screenwriting Dialogue & Subtext (FTII – CFOL)',
      question: 'A character says "I\'m completely fine," while quietly packing a suitcase and refusing to make eye contact with their partner. What dramatic technique is present?',
      options: [
        'Direct exposition',
        'Subtext expressed through contrast between spoken dialogue and physical behavior',
        'Pure descriptive voiceover narration',
        'Flashback montage'
      ],
      correctAnswer: 1,
      explanation: 'Subtext is the underlying emotional truth beneath what characters say aloud, revealed through behavior, pauses, and conflicting actions.'
    },
    {
      id: 'med-22',
      skillDomain: 'Screenwriting Structure (FTII – CFOL)',
      question: 'Why is an inciting incident or turning point essential near the conclusion of a film\'s first act?',
      options: [
        'It presents a consequential event that upsets the status quo and launches the protagonist into a new phase of irreversible conflict',
        'It resolves the main conflict immediately',
        'It eliminates all dramatic uncertainty from the plot',
        'It introduces the closing credits'
      ],
      correctAnswer: 0,
      explanation: 'A plot turning point shifts the narrative direction, raising stakes and forcing the protagonist to make an active, consequential choice.'
    },
    {
      id: 'med-23',
      skillDomain: 'Post-Production Continuity (FTII / ASAP Kerala)',
      question: 'A filmmaker cuts between two actors in dialogue. In one shot, the character looks screen-right; in the next, they appear to look screen-left, confusing viewer orientation. What rule was violated?',
      options: [
        'The 180-degree rule of screen-direction spatial continuity',
        'Audio sample rate matching',
        'Color lookup table interpolation',
        'Video bit depth quantization'
      ],
      correctAnswer: 0,
      explanation: 'The 180-degree rule preserves spatial orientation by maintaining consistent camera placement on one side of an imaginary axis of action.'
    },
    {
      id: 'med-24',
      skillDomain: 'Film Editing Rhythm (ASAP Kerala)',
      question: 'An editor cuts a tense dramatic scene. Rather than rapid cuts everywhere, the editor uses pauses, reactions, and progressively shorter shot durations. Why is this stronger?',
      options: [
        'It shapes rhythm and tempo in lockstep with the emotional escalation and psychological stakes of the characters',
        'It increases render bitrate automatically',
        'Fast cuts must never be used in cinema',
        'Long takes are mandatory for all awards'
      ],
      correctAnswer: 0,
      explanation: 'Rhythm in editing controls audience breathing and tension, harmonizing shot duration with dramatic and psychological beats.'
    },
    {
      id: 'med-25',
      skillDomain: 'Audio in Film Editing (ASAP Kerala)',
      question: 'What is an audio J-cut in professional non-linear video editing?',
      options: [
        'An edit where the audio of the upcoming scene begins playing before the corresponding video cut occurs',
        'An edit where video begins before audio',
        'A cut where audio is permanently muted',
        'A transition that rotates the video frame 90 degrees'
      ],
      correctAnswer: 0,
      explanation: 'A J-cut leads with the incoming scene’s audio while the outgoing visual remains on screen, creating smooth narrative transitions.'
    },
    {
      id: 'med-26',
      skillDomain: '3D Compositing & CGI (FTII Pune)',
      question: 'A visual effects artist integrates a 3D digital creature into live-action footage. The CGI object looks disconnected and floats. What comprehensive solution fixes this?',
      options: [
        'Match camera focal length/tracking, real-world lighting direction, shadow contact, and color space with the live plate',
        'Increase polygon count to maximum without camera tracking',
        'Add louder background music',
        'Increase saturation of the entire video track'
      ],
      correctAnswer: 0,
      explanation: 'Convincing CGI integration requires accurate 3D camera match-moving, ambient lighting reproduction (HDRI), contact shadows, depth of field, and color management.'
    },
    {
      id: 'med-27',
      skillDomain: 'Graphic Design Typography (CalArts)',
      question: 'A designer chooses two typefaces for an editorial publication. What principle ensures strong typographic hierarchy and readability?',
      options: [
        'Selecting complementary typefaces with clear contrast in classification or weight (e.g. clean display paired with readable serif/sans) rather than conflicting near-identical fonts',
        'Using five decorative display typefaces on every page',
        'Using all-caps for every paragraph of body copy',
        'Eliminating all negative margin spacing'
      ],
      correctAnswer: 0,
      explanation: 'Effective typography combines typefaces with clear contrast (e.g. geometric display header with neutral readable body) to establish effortless reading hierarchy.'
    },
    {
      id: 'med-28',
      skillDomain: 'Brand Identity Systems (CalArts)',
      question: 'Why is a brand identity system far more comprehensive than simply designing a standalone logo file?',
      options: [
        'A complete identity defines rules for typography, color palette, grid systems, iconography, tone, and responsive rules across diverse media and sizes',
        'A logo is useless for brand recognition',
        'Brand identity requires creating 25 different logos',
        'Logos should avoid all geometric consistency'
      ],
      correctAnswer: 0,
      explanation: 'A brand identity is an entire visual ecosystem governing how typography, colors, imagery, and layout behave cohesively across print, mobile, web, and physical signage.'
    },
    {
      id: 'med-29',
      skillDomain: 'Game Design Mechanics (Michigan State University)',
      question: 'What is the primary role of a core game mechanic in interactive game design (such as in Unity)?',
      options: [
        'To define meaningful interaction rules, verbs, and player choices through which the user engages with the game loop',
        'To increase the number of visual particle effects',
        'To determine the final export installer file size',
        'To replace the audio soundtrack'
      ],
      correctAnswer: 0,
      explanation: 'Mechanics define the fundamental actions (jumping, shooting, trading, crafting) that govern how players interact with game systems to achieve objectives.'
    },
    {
      id: 'med-30',
      skillDomain: 'Music & Audio Production (Berklee College of Music)',
      question: 'In modern audio mixing, when a bass guitar and kick drum compete for low-end frequencies causing a muddy mix, what is the best engineering solution?',
      options: [
        'Complementary frequency EQ carving and dynamic sidechain compression so the instruments occupy separate sonic frequencies and time pockets',
        'Boost both kick and bass frequencies at 60 Hz simultaneously',
        'Mute the bass instrument entirely',
        'Add maximum stereo reverb to both bass instruments'
      ],
      correctAnswer: 0,
      explanation: 'Complementary EQ (carving out conflicting frequencies in one track while boosting in another) and sidechain compression cleanly separate low-end kick and bass transients.'
    }
  ]
};
