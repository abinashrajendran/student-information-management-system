import React, { useState, useEffect } from 'react';
import { Navbar, AppTab } from './components/Navbar';
import { CrudManager } from './components/CrudManager';
import { PostmanTester } from './components/PostmanTester';
import { ArchitectureView } from './components/ArchitectureView';
import { ProjectReportGenerator } from './components/ProjectReportGenerator';
import { SopRubricView } from './components/SopRubricView';
import {
  Activity,
  GraduationCap,
  Layers,
  Server,
  Terminal,
  Database,
  ShieldCheck,
  Calendar,
  Award,
  Copy,
  Check,
  ExternalLink,
  Share2,
} from 'lucide-react';

interface ApiLogItem {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  status: number;
}

export default function App() {
  // Navigation tab state: 'records' | 'api' | 'architecture' | 'report' | 'rubric'
  const [activeTab, setActiveTab] = useState<AppTab>(() => {
    const saved = localStorage.getItem('sims_active_tab') as AppTab;
    return saved || 'records';
  });

  // Recent API activity log state for real-time demonstration
  const [apiLogs, setApiLogs] = useState<ApiLogItem[]>([
    {
      id: 'log-1',
      timestamp: new Date().toLocaleTimeString(),
      method: 'GET',
      endpoint: '/api/students/',
      status: 200,
    },
  ]);

  const handleApiAction = (method: string, endpoint: string, status: number) => {
    const newLog: ApiLogItem = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      method,
      endpoint,
      status,
    };
    setApiLogs((prev) => [newLog, ...prev.slice(0, 5)]);
  };

  useEffect(() => {
    localStorage.setItem('sims_active_tab', activeTab);
  }, [activeTab]);

  const SUBMISSION_URL = 'https://ais-pre-nbsptucy4pujvyjarrn7tg-167313645584.asia-east1.run.app';
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(SUBMISSION_URL);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = SUBMISSION_URL;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Institutional Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentName="Abinash R"
        rollNumber="922525148002"
        totalStudents={5}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Quick One-Click Submission Link Box */}
        <div id="submission-url-bar" className="bg-gradient-to-r from-emerald-950 via-slate-950 to-slate-900 text-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                <span>Direct Public Submission Link</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-mono">
                  Abinash R • 922525148002
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Click &quot;Copy Link&quot; to copy URL instantly to your clipboard, or click &quot;Open in New Tab&quot;.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              id="submission-url-input"
              type="text"
              readOnly
              value={SUBMISSION_URL}
              onClick={(e) => (e.target as HTMLInputElement).select()}
              title="Click to select entire link"
              className="bg-slate-900/90 border border-emerald-500/40 text-emerald-300 font-mono text-xs rounded-lg px-3 py-2 w-full md:w-80 select-all cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-emerald-400"
            />
            <button
              id="copy-submission-link-btn"
              onClick={handleCopyLink}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-400 text-slate-950 font-black'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied! ✅' : 'Copy Link'}</span>
            </button>

            <a
              id="open-direct-link-btn"
              href={SUBMISSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 whitespace-nowrap transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>
          </div>
        </div>
        {/* Project Context & Submission Strip */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Full-Stack Student Information System (SIMS)
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Express 4 REST Service &amp; React 19 Client • Persistence: JSON Database Engine
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200/60 flex items-center gap-1.5 text-indigo-700 font-medium">
              <Award className="w-3.5 h-3.5 text-indigo-500" />
              <span>B.E. CSE (AIML) Project Work</span>
            </div>
          </div>
        </div>

        {/* Dynamic Views based on Tab */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <CrudManager onApiAction={handleApiAction} />

            {/* Live REST API Telemetry Inspector */}
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 text-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-400">
                    Live REST API Telemetry Inspector
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Endpoint: /api/students/ • Port: 3000
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {apiLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          log.method === 'GET'
                            ? 'bg-blue-900/60 text-blue-300'
                            : log.method === 'POST'
                            ? 'bg-emerald-900/60 text-emerald-300'
                            : log.method === 'PUT'
                            ? 'bg-amber-900/60 text-amber-300'
                            : 'bg-rose-900/60 text-rose-300'
                        }`}
                      >
                        {log.method}
                      </span>
                      <span className="truncate text-slate-300 text-[11px]">{log.endpoint}</span>
                    </div>
                    <span
                      className={`text-[11px] font-bold ml-2 ${
                        log.status < 300
                          ? 'text-emerald-400'
                          : log.status < 500
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && <PostmanTester />}

        {activeTab === 'architecture' && <ArchitectureView />}

        {activeTab === 'report' && <ProjectReportGenerator studentCount={5} />}

        {activeTab === 'rubric' && <SopRubricView />}
      </main>

      {/* Institutional Academic Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Student Information Management System • Department of CSE (AI &amp; ML)</span>
          <span className="font-mono text-slate-600">Developed by Abinash R (922525148002)</span>
        </div>
      </footer>
    </div>
  );
}
