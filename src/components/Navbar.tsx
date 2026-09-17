import React from 'react';
import { Database, Terminal, FileText, Layers, GitBranch, User, GraduationCap } from 'lucide-react';

export type AppTab = 'records' | 'api' | 'architecture' | 'report' | 'rubric';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  studentName?: string;
  rollNumber?: string;
  totalStudents: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  studentName = 'Abinash R',
  rollNumber = '922525148002',
  totalStudents,
}) => {
  return (
    <header id="main-header" className="bg-slate-950 text-slate-100 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-md shadow-teal-500/20 text-sm">
            <GraduationCap className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white">
                Student Information Management System (SIMS)
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium font-mono">
                v1.0.0 Stable
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Department of CSE (AI &amp; ML) • B.E. Project
            </p>
          </div>
        </div>

        {/* Center / Navigation Tabs */}
        <div className="flex items-center flex-wrap gap-2">
          <nav className="inline-flex rounded-lg bg-slate-900/90 p-1 border border-slate-800 overflow-x-auto max-w-full">
            <button
              id="tab-records"
              onClick={() => setActiveTab('records')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'records'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Student Records
            </button>

            <button
              id="tab-api"
              onClick={() => setActiveTab('api')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'api'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              REST API Console
            </button>

            <button
              id="tab-architecture"
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'architecture'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              System Architecture & ERD
            </button>

            <button
              id="tab-report"
              onClick={() => setActiveTab('report')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'report'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Project Documentation
            </button>

            <button
              id="tab-rubric"
              onClick={() => setActiveTab('rubric')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'rubric'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Evaluation Matrix
            </button>
          </nav>

          {/* Student Profile Tag */}
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-800">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center text-xs font-bold">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-left leading-tight">
              <div className="text-xs font-semibold text-slate-200">{studentName}</div>
              <div className="text-[10px] font-mono text-slate-400">{rollNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
