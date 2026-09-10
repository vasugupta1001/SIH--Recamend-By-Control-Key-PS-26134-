import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface UserSubmission {
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

const app = express();
const PORT = 3000;

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage directory & file for persistent backend submissions
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');
const CONFIG_FILE = path.join(DATA_DIR, 'admin-config.json');

const DEFAULT_ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || 'ADMIN2026';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory admin passkey
let currentAdminPasskey = DEFAULT_ADMIN_PASSKEY;
try {
  if (fs.existsSync(CONFIG_FILE)) {
    const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    if (cfg && cfg.passkey) {
      currentAdminPasskey = cfg.passkey;
    }
  } else {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ passkey: DEFAULT_ADMIN_PASSKEY }, null, 2));
  }
} catch (e) {
  console.error('[BACKEND] Error reading admin config:', e);
}

// In-memory submissions cache loaded from persistent JSON
let submissionsCache: UserSubmission[] = [];

try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    submissionsCache = JSON.parse(raw);
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
} catch (e) {
  console.error('[BACKEND] Error reading submissions.json:', e);
  submissionsCache = [];
}

const saveSubmissionsToFile = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(submissionsCache, null, 2));
  } catch (err) {
    console.error('[BACKEND] Failed to write submissions to disk:', err);
  }
};

const saveConfigToFile = () => {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ passkey: currentAdminPasskey }, null, 2));
  } catch (err) {
    console.error('[BACKEND] Failed to write admin config to disk:', err);
  }
};

// Helper to verify authorization key from request
const isAuthorizedReq = (req: express.Request): boolean => {
  const headerKey = req.headers['x-admin-key'] as string;
  const queryKey = req.query.key as string;
  const bodyKey = req.body && req.body.key;
  const key = headerKey || queryKey || bodyKey;
  return key === currentAdminPasskey;
};

// ==========================================
// BACKEND API ROUTES
// ==========================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', totalSubmissions: submissionsCache.length, timestamp: new Date().toISOString() });
});

// 2. Authentication: Verify Passkey
app.post('/api/auth/verify', (req, res) => {
  try {
    const { passkey } = req.body || {};
    if (!passkey) {
      return res.status(400).json({ error: 'Passkey is required' });
    }
    if (passkey.trim() === currentAdminPasskey.trim()) {
      return res.json({ success: true, message: 'Authentication successful' });
    } else {
      return res.status(401).json({ error: 'Invalid Administrator Passkey' });
    }
  } catch (err: any) {
    res.status(500).json({ error: 'Authentication error' });
  }
});

// 3. Authentication: Update Admin Passkey
app.post('/api/auth/change-passkey', (req, res) => {
  try {
    const { currentPasskey, newPasskey } = req.body || {};
    if (!currentPasskey || !newPasskey) {
      return res.status(400).json({ error: 'Current passkey and new passkey are required' });
    }
    if (currentPasskey.trim() !== currentAdminPasskey.trim()) {
      return res.status(401).json({ error: 'Current passkey is incorrect' });
    }
    if (newPasskey.trim().length < 6) {
      return res.status(400).json({ error: 'New passkey must be at least 6 characters' });
    }

    currentAdminPasskey = newPasskey.trim();
    saveConfigToFile();

    console.log('[BACKEND SECURITY] Administrator passkey successfully updated');
    res.json({ success: true, message: 'Passkey successfully updated' });
  } catch (err: any) {
    res.status(500).json({ error: 'Error changing passkey' });
  }
});

// 4. POST /api/submissions -> Store new user candidate submission in backend database
app.post('/api/submissions', (req, res) => {
  try {
    const submission: UserSubmission = req.body;

    if (!submission || !submission.fullName || !submission.email) {
      return res.status(400).json({ error: 'Missing required candidate information (fullName, email)' });
    }

    const newRecord: UserSubmission = {
      id: submission.id || `SUB-${Date.now()}`,
      timestamp: submission.timestamp || new Date().toLocaleString(),
      sectorId: submission.sectorId || 'general',
      sectorName: submission.sectorName || 'General Sector',
      fullName: submission.fullName.trim(),
      email: submission.email.trim(),
      phone: submission.phone || '',
      collegeOrCompany: submission.collegeOrCompany || 'Not Specified',
      targetRole: submission.targetRole || 'Professional',
      city: submission.city || 'India',
      score: typeof submission.score === 'number' ? submission.score : 0,
      totalQuestions: typeof submission.totalQuestions === 'number' ? submission.totalQuestions : 10,
      percentage: typeof submission.percentage === 'number' ? submission.percentage : 0,
      answers: submission.answers || {},
      paymentStatus: submission.paymentStatus || 'pending',
      paymentPlan: submission.paymentPlan,
      paymentAmount: submission.paymentAmount,
      verificationCode: submission.verificationCode || `LOR-${Date.now().toString().slice(-6)}`
    };

    // Prepend to backend database
    submissionsCache.unshift(newRecord);
    saveSubmissionsToFile();

    // Log complete candidate details to backend server console
    console.log('\n=============================================================');
    console.log('📌 [BACKEND DATABASE] NEW CANDIDATE SUBMISSION STORED');
    console.log(`👤 Name:               ${newRecord.fullName}`);
    console.log(`📧 Email:              ${newRecord.email}`);
    console.log(`📱 Phone:              ${newRecord.phone}`);
    console.log(`🏛️  College / Org:      ${newRecord.collegeOrCompany}`);
    console.log(`🎯 Target Sector:      ${newRecord.sectorName} (${newRecord.targetRole})`);
    console.log(`📍 City:               ${newRecord.city}`);
    console.log(`📊 Score:              ${newRecord.score}/${newRecord.totalQuestions} (${newRecord.percentage}%)`);
    console.log(`🛡️  LOR Code:           ${newRecord.verificationCode}`);
    console.log(`💳 Payment:            ${newRecord.paymentStatus.toUpperCase()}`);
    console.log(`🕒 Timestamp:          ${newRecord.timestamp}`);
    console.log(`💾 Total in Backend:   ${submissionsCache.length} records`);
    console.log('=============================================================\n');

    res.status(201).json({
      success: true,
      message: 'Submission successfully recorded in backend database',
      id: newRecord.id,
      verificationCode: newRecord.verificationCode
    });
  } catch (err: any) {
    console.error('[BACKEND] Error saving submission:', err);
    res.status(500).json({ error: 'Internal server error saving submission', details: err?.message });
  }
});

// 5. PATCH /api/submissions/:id -> Update payment or candidate status
app.patch('/api/submissions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const index = submissionsCache.findIndex(s => s.id === id || s.verificationCode === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    submissionsCache[index] = {
      ...submissionsCache[index],
      ...updates
    };

    saveSubmissionsToFile();

    console.log('\n-------------------------------------------------------------');
    console.log(`💳 [BACKEND DATABASE] CANDIDATE PAYMENT UPDATED: ${submissionsCache[index].fullName}`);
    console.log(`   Status: ${submissionsCache[index].paymentStatus} | Plan: ${submissionsCache[index].paymentPlan || 'N/A'}`);
    console.log('-------------------------------------------------------------\n');

    res.json({
      success: true,
      submission: submissionsCache[index]
    });
  } catch (err: any) {
    console.error('[BACKEND] Error updating submission:', err);
    res.status(500).json({ error: 'Internal server error updating submission' });
  }
});

// 6. DELETE /api/submissions/:id -> Delete single candidate record (Authorized personnel only)
app.delete('/api/submissions/:id', (req, res) => {
  try {
    if (!isAuthorizedReq(req)) {
      return res.status(401).json({ error: 'Unauthorized: Valid Admin Passkey required' });
    }

    const { id } = req.params;
    const initialCount = submissionsCache.length;
    const deletedRecord = submissionsCache.find(s => s.id === id || s.verificationCode === id);

    submissionsCache = submissionsCache.filter(s => s.id !== id && s.verificationCode !== id);

    if (submissionsCache.length === initialCount) {
      return res.status(404).json({ error: 'Candidate record not found' });
    }

    saveSubmissionsToFile();

    console.log(`\n🗑️ [BACKEND DATABASE] DELETED CANDIDATE RECORD: ${deletedRecord?.fullName || id} (${deletedRecord?.verificationCode || ''})`);
    console.log(`   Remaining records: ${submissionsCache.length}\n`);

    res.json({
      success: true,
      message: 'Record successfully deleted',
      deletedId: id,
      remaining: submissionsCache.length
    });
  } catch (err: any) {
    console.error('[BACKEND] Error deleting submission:', err);
    res.status(500).json({ error: 'Internal server error deleting record' });
  }
});

// 7. POST /api/submissions/delete-multiple -> Delete list of IDs (Authorized personnel only)
app.post('/api/submissions/delete-multiple', (req, res) => {
  try {
    if (!isAuthorizedReq(req)) {
      return res.status(401).json({ error: 'Unauthorized: Valid Admin Passkey required' });
    }

    const { ids } = req.body || {};
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids array is required' });
    }

    const idSet = new Set(ids);
    const beforeCount = submissionsCache.length;
    submissionsCache = submissionsCache.filter(s => !idSet.has(s.id) && !idSet.has(s.verificationCode));
    const deletedCount = beforeCount - submissionsCache.length;

    saveSubmissionsToFile();

    console.log(`\n🗑️ [BACKEND DATABASE] BULK DELETED ${deletedCount} CANDIDATE RECORDS`);
    console.log(`   Remaining records: ${submissionsCache.length}\n`);

    res.json({
      success: true,
      message: `Successfully deleted ${deletedCount} records`,
      deletedCount,
      remaining: submissionsCache.length
    });
  } catch (err: any) {
    console.error('[BACKEND] Error during multiple delete:', err);
    res.status(500).json({ error: 'Internal server error during multiple delete' });
  }
});

// 8. POST /api/submissions/bulk-delete -> Delete according to criteria requirement (unpaid, low_score, all)
app.post('/api/submissions/bulk-delete', (req, res) => {
  try {
    if (!isAuthorizedReq(req)) {
      return res.status(401).json({ error: 'Unauthorized: Valid Admin Passkey required' });
    }

    const { criteria } = req.body || {};
    const beforeCount = submissionsCache.length;

    if (criteria === 'unpaid') {
      submissionsCache = submissionsCache.filter(s => s.paymentStatus === 'completed');
    } else if (criteria === 'low_score') {
      submissionsCache = submissionsCache.filter(s => s.percentage >= 80);
    } else if (criteria === 'all') {
      submissionsCache = [];
    } else {
      return res.status(400).json({ error: 'Invalid delete criteria. Options: unpaid, low_score, all' });
    }

    const deletedCount = beforeCount - submissionsCache.length;
    saveSubmissionsToFile();

    console.log(`\n🗑️ [BACKEND DATABASE] REQUIREMENT BULK DELETE (${criteria}): Removed ${deletedCount} records`);
    console.log(`   Remaining records: ${submissionsCache.length}\n`);

    res.json({
      success: true,
      message: `Requirement delete (${criteria}) successfully removed ${deletedCount} records`,
      deletedCount,
      remaining: submissionsCache.length
    });
  } catch (err: any) {
    console.error('[BACKEND] Error in bulk delete requirement:', err);
    res.status(500).json({ error: 'Internal server error in bulk delete' });
  }
});

// 9. GET /api/submissions -> Protected Backend Dashboard & API
app.get(['/api/submissions', '/admin', '/backend'], (req, res) => {
  const isJsonRequested = req.query.format === 'json' || (req.headers.accept && req.headers.accept.includes('application/json') && !req.headers.accept.includes('text/html'));

  if (isJsonRequested) {
    // For raw JSON, check authorization key
    if (!isAuthorizedReq(req)) {
      return res.status(401).json({ error: 'Unauthorized: Please provide valid x-admin-key header or ?key= query parameter' });
    }
    return res.json({
      total: submissionsCache.length,
      submissions: submissionsCache
    });
  }

  // Calculate initial metrics for the portal
  const total = submissionsCache.length;
  const passedCount = submissionsCache.filter(s => s.percentage >= 80).length;
  const paidCount = submissionsCache.filter(s => s.paymentStatus === 'completed').length;
  const avgScore = total > 0 ? Math.round(submissionsCache.reduce((acc, s) => acc + (s.percentage || 0), 0) / total) : 0;

  // Render Protected Standalone Backend Admin Portal HTML
  const html = `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authorized Backend Database & Candidate Intelligence Portal</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, h4, .font-heading { font-family: 'Outfit', sans-serif; }
    code, pre, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .fade-enter { animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-full flex flex-col antialiased selection:bg-blue-600 selection:text-white">

  <!-- ============================================================= -->
  <!-- 1. AUTHENTICATION LOCK SCREEN (Shown until passkey is entered) -->
  <!-- ============================================================= -->
  <div id="authLockScreen" class="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden fade-enter">
      
      <!-- Top Decorative Glow -->
      <div class="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div class="text-center space-y-3 mb-6 relative">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 border border-blue-400/30">
          <i data-lucide="shield-alert" class="w-7 h-7"></i>
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-white font-heading">Authorized Access Only</h2>
          <p class="text-xs text-slate-400 mt-1">Backend candidate submissions & database controls are restricted to authorized personnel.</p>
        </div>
      </div>

      <form id="authForm" class="space-y-4 relative">
        <div>
          <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Administrator Passkey</label>
          <div class="relative">
            <input 
              type="password" 
              id="passkeyInput" 
              placeholder="Enter master admin passkey..." 
              autocomplete="current-password"
              required
              class="w-full pl-4 pr-11 py-3 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono"
            />
            <button 
              type="button" 
              id="togglePassVisibility" 
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
            >
              <i data-lucide="eye" class="w-4 h-4" id="eyeIcon"></i>
            </button>
          </div>
          <div id="authErrorMsg" class="hidden text-xs text-rose-400 mt-2 font-medium flex items-center gap-1">
            <i data-lucide="alert-circle" class="w-3.5 h-3.5 shrink-0"></i>
            <span id="authErrorText">Invalid administrator passkey</span>
          </div>
        </div>

        <button 
          type="submit" 
          id="authSubmitBtn"
          class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <i data-lucide="key" class="w-4 h-4"></i>
          <span>Verify & Unlock Portal</span>
        </button>

        <div class="pt-2 text-center">
          <a href="/" class="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1">
            <i data-lucide="arrow-left" class="w-3 h-3"></i>
            Return to Public Website
          </a>
        </div>
      </form>

    </div>
  </div>

  <!-- ============================================================= -->
  <!-- 2. MAIN AUTHORIZED DASHBOARD VIEW (Shown once authenticated)  -->
  <!-- ============================================================= -->
  <div id="authorizedApp" class="hidden min-h-screen flex-col flex-1">
    
    <!-- Top Navigation Header -->
    <header class="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-blue-400/30">
            <i data-lucide="database" class="w-4.5 h-4.5"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base font-bold text-white tracking-tight font-heading">Backend Database Portal</h1>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                <i data-lucide="lock" class="w-2.5 h-2.5"></i>
                Authorized Session
              </span>
            </div>
            <p class="text-xs text-slate-400 hidden sm:block">Candidate submissions & delete intelligence management</p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-2.5">
          
          <button id="exportCsvBtn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-900/20 transition-all cursor-pointer">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Export CSV</span>
          </button>

          <button id="openChangePasskeyBtn" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-all" title="Change Passkey">
            <i data-lucide="key" class="w-3.5 h-3.5 text-amber-400"></i>
            <span class="hidden md:inline">Change Passkey</span>
          </button>

          <button id="logoutBtn" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 text-xs font-semibold transition-all cursor-pointer" title="Lock & Log Out">
            <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">Lock / Logout</span>
          </button>

          <a href="/" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all">
            <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
            <span class="hidden sm:inline">Back to App</span>
          </a>
        </div>

      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">

      <!-- Alert Notification Banner -->
      <div id="toastNotification" class="hidden p-4 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs font-medium"></div>

      <!-- KPI Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        
        <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between text-slate-400 mb-2">
            <span class="text-xs font-semibold uppercase tracking-wider">Total Candidates</span>
            <i data-lucide="users" class="w-4 h-4 text-blue-400"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-extrabold text-white font-heading" id="statTotal">${total}</div>
          <p class="text-[11px] text-slate-500 mt-1">Recorded in data/submissions.json</p>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between text-slate-400 mb-2">
            <span class="text-xs font-semibold uppercase tracking-wider">Qualified (≥80%)</span>
            <i data-lucide="award" class="w-4 h-4 text-amber-400"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading" id="statQualified">${passedCount}</div>
          <p class="text-[11px] text-slate-500 mt-1" id="statQualifiedSub">${total > 0 ? Math.round((passedCount/total)*100) : 0}% qualified for LOR</p>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between text-slate-400 mb-2">
            <span class="text-xs font-semibold uppercase tracking-wider">Average Score</span>
            <i data-lucide="trending-up" class="w-4 h-4 text-cyan-400"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-heading" id="statAvg">${avgScore}%</div>
          <p class="text-[11px] text-slate-500 mt-1">Assessment benchmark</p>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-sm relative overflow-hidden">
          <div class="flex items-center justify-between text-slate-400 mb-2">
            <span class="text-xs font-semibold uppercase tracking-wider">Paid LOR Orders</span>
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i>
          </div>
          <div class="text-2xl sm:text-3xl font-extrabold text-white font-heading" id="statPaid">${paidCount}</div>
          <p class="text-[11px] text-slate-500 mt-1">Issued certificates</p>
        </div>

      </div>

      <!-- Deletion & Management Action Bar -->
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-white flex items-center gap-1.5">
              <i data-lucide="trash-2" class="w-4 h-4 text-rose-400"></i>
              Authorized Deletion Controls
            </span>
            <span class="text-[11px] px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold">Requirement-Based</span>
          </div>
          <p class="text-xs text-slate-400">Delete specific candidate records individually or clean database by custom criteria.</p>
        </div>

        <!-- Bulk Action Buttons -->
        <div class="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          
          <!-- Delete Selected Button (Appears when checkboxes selected) -->
          <button 
            id="deleteSelectedBtn" 
            class="hidden items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-900/30 transition-all cursor-pointer"
          >
            <i data-lucide="trash" class="w-3.5 h-3.5"></i>
            <span>Delete Selected (<span id="selectedCountSpan">0</span>)</span>
          </button>

          <!-- Requirement Delete Dropdown / Buttons -->
          <div class="relative inline-block text-left">
            <button 
              id="bulkRequirementMenuBtn"
              class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <i data-lucide="filter-x" class="w-3.5 h-3.5 text-amber-400"></i>
              <span>Clean By Requirement</span>
              <i data-lucide="chevron-down" class="w-3 h-3 text-slate-400"></i>
            </button>

            <!-- Dropdown Menu -->
            <div id="bulkRequirementMenu" class="hidden absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-40 space-y-1">
              <button 
                onclick="triggerRequirementDelete('unpaid', 'Delete All Unpaid / Incomplete Tests')"
                class="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-200 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400"></i>
                  <span>Delete Unpaid Tests</span>
                </div>
                <span class="text-[10px] text-slate-500">Keep Paid Only</span>
              </button>

              <button 
                onclick="triggerRequirementDelete('low_score', 'Delete Non-Qualified Tests (<80%)')"
                class="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-200 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <i data-lucide="award" class="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400"></i>
                  <span>Delete Score &lt; 80%</span>
                </div>
                <span class="text-[10px] text-slate-500">Non-Qualified</span>
              </button>

              <div class="h-px bg-slate-800 my-1"></div>

              <button 
                onclick="triggerRequirementDelete('all', 'PERMANENTLY DELETE ALL RECORDS')"
                class="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-rose-950/60 text-rose-300 flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div class="flex items-center gap-2">
                  <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-400"></i>
                  <span class="font-bold">Purge All Records</span>
                </div>
                <span class="text-[10px] text-rose-400 font-bold">Reset DB</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      <!-- Data Table Container -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
        
        <!-- Toolbar: Search & Filter -->
        <div class="p-4 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div class="relative w-full sm:max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input 
              type="text" 
              id="searchInput" 
              placeholder="Search candidate name, email, college, verification ID..." 
              class="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
            <select id="statusFilter" class="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500">
              <option value="all">All Statuses</option>
              <option value="passed">Qualified (≥80%)</option>
              <option value="paid">Paid LOR Orders</option>
              <option value="pending">Pending Status</option>
            </select>

            <button onclick="fetchLatestRecords()" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer" title="Refresh Live Records">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
            </button>
          </div>

        </div>

        <!-- Records Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse" id="submissionsTable">
            <thead>
              <tr class="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th class="p-4 w-10 text-center">
                  <input type="checkbox" id="selectAllCheckbox" class="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 cursor-pointer" />
                </th>
                <th class="p-4">Candidate Details</th>
                <th class="p-4">Sector & Target Role</th>
                <th class="p-4">Contact Info</th>
                <th class="p-4">Score</th>
                <th class="p-4">LOR Status</th>
                <th class="p-4">Verification ID</th>
                <th class="p-4">Submitted At</th>
                <th class="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60" id="tableBody">
              <!-- Populated dynamically via JavaScript -->
            </tbody>
          </table>
        </div>

        <!-- Footer Info -->
        <div class="p-4 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <i data-lucide="hard-drive" class="w-4 h-4 text-blue-400"></i>
            <span>Persistent Storage: <code class="font-mono text-slate-300">data/submissions.json</code></span>
          </div>
          <div>
            Showing <span id="visibleCount" class="font-bold text-white">0</span> candidate submissions
          </div>
        </div>

      </div>

    </main>

  </div>

  <!-- ============================================================= -->
  <!-- 3. MODAL: CHANGE ADMIN PASSKEY                                -->
  <!-- ============================================================= -->
  <div id="changePasskeyModal" class="hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-white flex items-center gap-2">
          <i data-lucide="key" class="w-4 h-4 text-amber-400"></i>
          Update Administrator Passkey
        </h3>
        <button onclick="document.getElementById('changePasskeyModal').classList.add('hidden')" class="text-slate-400 hover:text-white p-1">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <form id="changePasskeyForm" class="space-y-3">
        <div>
          <label class="block text-xs text-slate-300 mb-1">Current Passkey</label>
          <input type="password" id="curPassInput" required class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono" />
        </div>
        <div>
          <label class="block text-xs text-slate-300 mb-1">New Passkey (Min 6 chars)</label>
          <input type="password" id="newPassInput" required minlength="6" class="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono" />
        </div>
        <div id="changePassMsg" class="hidden text-xs"></div>
        <button type="submit" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer">
          Save New Passkey
        </button>
      </form>
    </div>
  </div>

  <!-- ============================================================= -->
  <!-- CLIENT JAVASCRIPT LOGIC                                       -->
  <!-- ============================================================= -->
  <script>
    let activePasskey = sessionStorage.getItem('admin_passkey') || '';
    let submissions = [];
    const selectedIds = new Set();

    // DOM Elements
    const authLockScreen = document.getElementById('authLockScreen');
    const authorizedApp = document.getElementById('authorizedApp');
    const authForm = document.getElementById('authForm');
    const passkeyInput = document.getElementById('passkeyInput');
    const authErrorMsg = document.getElementById('authErrorMsg');
    const authErrorText = document.getElementById('authErrorText');
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    const selectedCountSpan = document.getElementById('selectedCountSpan');
    const bulkRequirementMenuBtn = document.getElementById('bulkRequirementMenuBtn');
    const bulkRequirementMenu = document.getElementById('bulkRequirementMenu');
    const toastNotification = document.getElementById('toastNotification');

    // Toggle Passkey Visibility
    document.getElementById('togglePassVisibility')?.addEventListener('click', () => {
      if (passkeyInput.type === 'password') {
        passkeyInput.type = 'text';
      } else {
        passkeyInput.type = 'password';
      }
    });

    // Check existing authentication on load
    if (activePasskey) {
      verifyAndUnlock(activePasskey);
    } else {
      lucide.createIcons();
    }

    // Handle Authentication Submit
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const enteredKey = passkeyInput.value.trim();
      if (!enteredKey) return;
      await verifyAndUnlock(enteredKey);
    });

    async function verifyAndUnlock(key) {
      try {
        const res = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passkey: key })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          activePasskey = key;
          sessionStorage.setItem('admin_passkey', key);
          authLockScreen.classList.add('hidden');
          authorizedApp.classList.remove('hidden');
          authorizedApp.classList.add('flex');
          await fetchLatestRecords();
        } else {
          showAuthError(data.error || 'Invalid administrator passkey');
        }
      } catch (err) {
        showAuthError('Failed to connect to backend verification service');
      }
    }

    function showAuthError(msg) {
      authErrorText.textContent = msg;
      authErrorMsg.classList.remove('hidden');
      passkeyInput.classList.add('border-rose-500', 'focus:border-rose-500');
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      sessionStorage.removeItem('admin_passkey');
      activePasskey = '';
      authorizedApp.classList.add('hidden');
      authorizedApp.classList.remove('flex');
      authLockScreen.classList.remove('hidden');
      passkeyInput.value = '';
      authErrorMsg.classList.add('hidden');
      lucide.createIcons();
    });

    // Fetch submissions with authorized key
    async function fetchLatestRecords() {
      try {
        const res = await fetch('/api/submissions?format=json', {
          headers: { 'x-admin-key': activePasskey }
        });
        if (!res.ok) {
          if (res.status === 401) {
            alert('Session expired. Please log in again.');
            document.getElementById('logoutBtn').click();
            return;
          }
          throw new Error('Failed to fetch records');
        }
        const data = await res.json();
        submissions = data.submissions || [];
        selectedIds.clear();
        updateStats();
        renderTable();
      } catch (err) {
        showToast('Error loading submissions from backend database', 'error');
      }
    }

    // Update Top Statistics
    function updateStats() {
      const total = submissions.length;
      const passed = submissions.filter(s => s.percentage >= 80).length;
      const paid = submissions.filter(s => s.paymentStatus === 'completed').length;
      const avg = total > 0 ? Math.round(submissions.reduce((acc, s) => acc + (s.percentage || 0), 0) / total) : 0;

      document.getElementById('statTotal').textContent = total;
      document.getElementById('statQualified').textContent = passed;
      document.getElementById('statQualifiedSub').textContent = total > 0 ? Math.round((passed/total)*100) + '% qualified for LOR' : '0%';
      document.getElementById('statAvg').textContent = avg + '%';
      document.getElementById('statPaid').textContent = paid;
    }

    // Render Table Rows
    function renderTable() {
      const q = (searchInput.value || '').toLowerCase().trim();
      const status = statusFilter.value;

      const filtered = submissions.filter(s => {
        const text = (s.fullName + ' ' + s.email + ' ' + s.phone + ' ' + s.collegeOrCompany + ' ' + s.sectorName + ' ' + s.verificationCode).toLowerCase();
        const matchesQuery = !q || text.includes(q);
        let matchesStatus = true;

        if (status === 'passed') matchesStatus = s.percentage >= 80;
        else if (status === 'paid') matchesStatus = s.paymentStatus === 'completed';
        else if (status === 'pending') matchesStatus = s.paymentStatus !== 'completed';

        return matchesQuery && matchesStatus;
      });

      document.getElementById('visibleCount').textContent = filtered.length;

      if (filtered.length === 0) {
        tableBody.innerHTML = \`
          <tr>
            <td colspan="9" class="py-14 text-center text-slate-500">
              <i data-lucide="inbox" class="w-9 h-9 mx-auto mb-2 text-slate-600"></i>
              <p class="text-sm font-semibold text-slate-400">No candidate submissions found matching criteria.</p>
              <p class="text-xs text-slate-600 mt-1">Total recorded in backend database: \${submissions.length}</p>
            </td>
          </tr>
        \`;
        lucide.createIcons();
        updateSelectedUI();
        return;
      }

      tableBody.innerHTML = filtered.map(s => {
        const isChecked = selectedIds.has(s.id);
        return \`
          <tr class="hover:bg-slate-800/40 transition-colors">
            <td class="p-4 text-center">
              <input 
                type="checkbox" 
                data-id="\${s.id}" 
                \${isChecked ? 'checked' : ''} 
                class="candidate-checkbox rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0 cursor-pointer"
              />
            </td>
            <td class="p-4">
              <div class="font-bold text-white text-sm">\${s.fullName}</div>
              <div class="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <i data-lucide="building" class="w-3 h-3 text-slate-500"></i>
                <span>\${s.collegeOrCompany || 'Not Specified'}</span>
              </div>
            </td>
            <td class="p-4">
              <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-[11px]">
                \${s.sectorName}
              </span>
              <div class="text-[11px] text-slate-400 mt-1">\${s.targetRole || 'Professional'} • \${s.city || 'India'}</div>
            </td>
            <td class="p-4 text-slate-300">
              <div class="flex items-center gap-1.5">
                <i data-lucide="mail" class="w-3.5 h-3.5 text-slate-500"></i>
                <span>\${s.email}</span>
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 mt-0.5">
                <i data-lucide="phone" class="w-3.5 h-3.5 text-slate-500"></i>
                <span>\${s.phone || 'N/A'}</span>
              </div>
            </td>
            <td class="p-4 font-bold">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg \${s.percentage >= 80 ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'bg-slate-800 border border-slate-700 text-slate-300'}">
                <i data-lucide="award" class="w-3.5 h-3.5 \${s.percentage >= 80 ? 'text-emerald-400' : 'text-slate-400'}"></i>
                <span>\${s.score}/\${s.totalQuestions} (\${s.percentage}%)</span>
              </span>
            </td>
            <td class="p-4">
              \${s.paymentStatus === 'completed' ? \`
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                  <i data-lucide="check-circle" class="w-3 h-3"></i>
                  Paid LOR
                </span>
              \` : \`
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px] uppercase tracking-wider">
                  Test Done
                </span>
              \`}
            </td>
            <td class="p-4">
              <code class="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 select-all">
                \${s.verificationCode}
              </code>
            </td>
            <td class="p-4 text-slate-400 text-[11px] whitespace-nowrap">
              \${s.timestamp}
            </td>
            <td class="p-4 text-center">
              <button 
                onclick="deleteSingleRecord('\${s.id}', '\${s.fullName.replace(/'/g, "\\\\'")}')"
                class="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 hover:text-white transition-all cursor-pointer"
                title="Delete this candidate record"
              >
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </td>
          </tr>
        \`;
      }).join('');

      lucide.createIcons();
      attachCheckboxListeners();
      updateSelectedUI();
    }

    // Checkbox Interactions
    function attachCheckboxListeners() {
      document.querySelectorAll('.candidate-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
          const id = e.target.getAttribute('data-id');
          if (e.target.checked) selectedIds.add(id);
          else selectedIds.delete(id);
          updateSelectedUI();
        });
      });
    }

    selectAllCheckbox.addEventListener('change', (e) => {
      const checkboxes = document.querySelectorAll('.candidate-checkbox');
      checkboxes.forEach(cb => {
        cb.checked = e.target.checked;
        const id = cb.getAttribute('data-id');
        if (e.target.checked) selectedIds.add(id);
        else selectedIds.delete(id);
      });
      updateSelectedUI();
    });

    function updateSelectedUI() {
      const count = selectedIds.size;
      selectedCountSpan.textContent = count;
      if (count > 0) {
        deleteSelectedBtn.classList.remove('hidden');
        deleteSelectedBtn.classList.add('inline-flex');
      } else {
        deleteSelectedBtn.classList.add('hidden');
        deleteSelectedBtn.classList.remove('inline-flex');
      }
    }

    // 1. DELETE SINGLE RECORD
    window.deleteSingleRecord = async function(id, name) {
      if (!confirm(\`Are you sure you want to delete candidate "\${name}" from the database?\\n\\nThis action cannot be undone.\`)) {
        return;
      }

      try {
        const res = await fetch(\`/api/submissions/\${id}\`, {
          method: 'DELETE',
          headers: { 'x-admin-key': activePasskey }
        });
        const data = await res.json();

        if (res.ok && data.success) {
          showToast(\`Successfully deleted candidate record: \${name}\`, 'success');
          await fetchLatestRecords();
        } else {
          showToast(data.error || 'Failed to delete candidate', 'error');
        }
      } catch (err) {
        showToast('Error communicating with backend server', 'error');
      }
    };

    // 2. DELETE SELECTED MULTIPLE RECORDS
    deleteSelectedBtn.addEventListener('click', async () => {
      const count = selectedIds.size;
      if (count === 0) return;

      if (!confirm(\`Are you sure you want to delete \${count} selected candidate record(s)?\\n\\nThis will remove them permanently from the database.\`)) {
        return;
      }

      try {
        const res = await fetch('/api/submissions/delete-multiple', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-key': activePasskey 
          },
          body: JSON.stringify({ ids: Array.from(selectedIds) })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          showToast(\`Successfully deleted \${data.deletedCount} candidate records\`, 'success');
          await fetchLatestRecords();
        } else {
          showToast(data.error || 'Failed to delete selected records', 'error');
        }
      } catch (err) {
        showToast('Error during bulk deletion', 'error');
      }
    });

    // 3. REQUIREMENT-BASED BULK DELETE
    window.triggerRequirementDelete = async function(criteria, description) {
      bulkRequirementMenu.classList.add('hidden');
      
      const confirmPrompt = criteria === 'all' 
        ? \`⚠️ CRITICAL WARNING: You are about to PERMANENTLY ERASE ALL (\${submissions.length}) records in the backend database.\\n\\nAre you absolutely sure you want to proceed?\`
        : \`Are you sure you want to run requirement deletion: "\${description}"?\\n\\nMatching records will be deleted from the database.\`;

      if (!confirm(confirmPrompt)) return;

      try {
        const res = await fetch('/api/submissions/bulk-delete', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-admin-key': activePasskey 
          },
          body: JSON.stringify({ criteria })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          showToast(\`Requirement clean complete: Removed \${data.deletedCount} records\`, 'success');
          await fetchLatestRecords();
        } else {
          showToast(data.error || 'Failed requirement delete', 'error');
        }
      } catch (err) {
        showToast('Error during requirement clean', 'error');
      }
    };

    // Bulk Menu Dropdown Toggle
    bulkRequirementMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      bulkRequirementMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      bulkRequirementMenu.classList.add('hidden');
    });

    // Toast Notification helper
    function showToast(message, type = 'success') {
      toastNotification.className = \`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium \${
        type === 'success' ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-200' : 'bg-rose-950/60 border-rose-800/60 text-rose-200'
      }\`;
      toastNotification.innerHTML = \`
        <div class="flex items-center gap-2">
          <i data-lucide="\${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-4 h-4"></i>
          <span>\${message}</span>
        </div>
        <button onclick="this.parentElement.classList.add('hidden')" class="p-1 hover:opacity-75">
          <i data-lucide="x" class="w-3.5 h-3.5"></i>
        </button>
      \`;
      toastNotification.classList.remove('hidden');
      lucide.createIcons();
      setTimeout(() => toastNotification.classList.add('hidden'), 5000);
    }

    // Export CSV with auth key
    document.getElementById('exportCsvBtn').addEventListener('click', () => {
      window.location.href = \`/api/submissions/export/csv?key=\${encodeURIComponent(activePasskey)}\`;
    });

    // Change Passkey Modal Handlers
    document.getElementById('openChangePasskeyBtn').addEventListener('click', () => {
      document.getElementById('changePasskeyModal').classList.remove('hidden');
      document.getElementById('changePassMsg').classList.add('hidden');
      document.getElementById('curPassInput').value = '';
      document.getElementById('newPassInput').value = '';
    });

    document.getElementById('changePasskeyForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const curPass = document.getElementById('curPassInput').value.trim();
      const newPass = document.getElementById('newPassInput').value.trim();
      const msgBox = document.getElementById('changePassMsg');

      try {
        const res = await fetch('/api/auth/change-passkey', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentPasskey: curPass, newPasskey: newPass })
        });
        const data = await res.json();

        if (res.ok && data.success) {
          activePasskey = newPass;
          sessionStorage.setItem('admin_passkey', newPass);
          msgBox.className = 'text-xs text-emerald-400 font-semibold';
          msgBox.textContent = 'Passkey successfully updated!';
          msgBox.classList.remove('hidden');
          setTimeout(() => {
            document.getElementById('changePasskeyModal').classList.add('hidden');
          }, 1200);
        } else {
          msgBox.className = 'text-xs text-rose-400 font-semibold';
          msgBox.textContent = data.error || 'Failed to update passkey';
          msgBox.classList.remove('hidden');
        }
      } catch (err) {
        msgBox.className = 'text-xs text-rose-400 font-semibold';
        msgBox.textContent = 'Server connection error';
        msgBox.classList.remove('hidden');
      }
    });

    // Search and filter listeners
    searchInput.addEventListener('input', renderTable);
    statusFilter.addEventListener('change', renderTable);
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

// 10. GET /api/submissions/export/csv -> Export all backend submissions as CSV file (Authorized)
app.get('/api/submissions/export/csv', (req, res) => {
  try {
    if (!isAuthorizedReq(req)) {
      return res.status(401).send('Unauthorized: Please provide valid key parameter (?key=ADMIN2026)');
    }

    const headers = [
      'Submission ID',
      'Timestamp',
      'Candidate Name',
      'Email',
      'Phone',
      'College / Organisation',
      'Sector',
      'Target Role',
      'City',
      'Score',
      'Total Questions',
      'Percentage (%)',
      'Verification Code',
      'Payment Status',
      'Payment Plan',
      'Payment Amount'
    ];

    const rows = submissionsCache.map(s => [
      `"${s.id}"`,
      `"${s.timestamp}"`,
      `"${s.fullName.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${s.phone.replace(/"/g, '""')}"`,
      `"${s.collegeOrCompany.replace(/"/g, '""')}"`,
      `"${s.sectorName.replace(/"/g, '""')}"`,
      `"${s.targetRole.replace(/"/g, '""')}"`,
      `"${s.city.replace(/"/g, '""')}"`,
      s.score,
      s.totalQuestions,
      s.percentage,
      `"${s.verificationCode}"`,
      `"${s.paymentStatus}"`,
      `"${(s.paymentPlan || '').replace(/"/g, '""')}"`,
      s.paymentAmount || 0
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="candidate_submissions_${Date.now()}.csv"`);
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate CSV export' });
  }
});

// ==========================================
// VITE / STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🚀 [BACKEND SERVER] Running on http://localhost:${PORT}`);
    console.log(`📁 [DATABASE STORAGE] Candidate details stored in ${DATA_FILE}`);
    console.log(`📊 [CURRENT RECORDS] ${submissionsCache.length} user submissions in backend\n`);
  });
}

startServer();
