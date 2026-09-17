import React from 'react';
import { Database, Server, Monitor, ArrowRight, ShieldCheck, HardDrive, CheckCircle2, Layers } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold font-mono">
            ARCH-01
          </span>
          <h2 className="text-base font-bold text-slate-900">
            System Architecture & Dataflow Model
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Layered client-server full-stack web architecture with asynchronous RESTful communication and persistent storage.
        </p>
      </div>

      {/* Visual Architectural Data Flow Diagram */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm">
        <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Layers className="w-4 h-4" /> Three-Tier System Architecture Diagram
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {/* Tier 1: Client / Presentation */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-indigo-400">
                <Monitor className="w-5 h-5" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Tier 1: Presentation Layer
                </h4>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Client-side single-page interface rendered using React 19 and modern CSS styling.
              </p>
              <ul className="text-xs space-y-1.5 text-slate-300 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Interactive CRUD Views</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Client-side Form Validation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Asynchronous Fetch API</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              Technology: React, TypeScript, Tailwind
            </div>
          </div>

          {/* Tier 2: Application / API Layer */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-emerald-400">
                <Server className="w-5 h-5" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Tier 2: Business Logic & REST API
                </h4>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Express HTTP web server providing REST endpoints, input sanitization, and routing.
              </p>
              <ul className="text-xs space-y-1.5 text-slate-300 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>REST Controllers (/api/students/)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Constraint & Regex Validation</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>HTTP Status Codes (200, 201, 400, 404)</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              Technology: Node.js, Express REST Server
            </div>
          </div>

          {/* Tier 3: Database / Persistence */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                <HardDrive className="w-5 h-5" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Tier 3: Persistence Layer
                </h4>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Relational schema model with persistent storage and transactional operations.
              </p>
              <ul className="text-xs space-y-1.5 text-slate-300 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Primary Key Auto-Increment (id)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Unique Constraints (roll_number)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>JSON / File Store Persistence</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
              Technology: Structured Database Store
            </div>
          </div>
        </div>
      </div>

      {/* Database Schema & ER Diagram Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Entity-Relationship & Table Schema (students_db)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-2.5">Field Name</th>
                <th className="p-2.5">Data Type</th>
                <th className="p-2.5">Constraints</th>
                <th className="p-2.5">Validation Rules</th>
                <th className="p-2.5">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="p-2.5 font-bold text-indigo-700">id</td>
                <td className="p-2.5">INT</td>
                <td className="p-2.5 font-sans">PRIMARY KEY, AUTO_INCREMENT</td>
                <td className="p-2.5 font-sans">Auto-assigned integer</td>
                <td className="p-2.5 font-sans">Unique system record identifier</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-2.5 font-bold text-indigo-700">roll_number</td>
                <td className="p-2.5">VARCHAR(20)</td>
                <td className="p-2.5 font-sans">UNIQUE, NOT NULL</td>
                <td className="p-2.5 font-sans">Cannot duplicate existing roll number</td>
                <td className="p-2.5 font-sans">Academic identifier (e.g. CS202601)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-2.5 font-bold text-indigo-700">name</td>
                <td className="p-2.5">VARCHAR(100)</td>
                <td className="p-2.5 font-sans">NOT NULL</td>
                <td className="p-2.5 font-sans">Minimum 2 characters, text only</td>
                <td className="p-2.5 font-sans">Full name of the enrolled student</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-2.5 font-bold text-indigo-700">email</td>
                <td className="p-2.5">VARCHAR(120)</td>
                <td className="p-2.5 font-sans">UNIQUE, NOT NULL</td>
                <td className="p-2.5 font-sans">Regex format: ^[^\s@]+@[^\s@]+\.[^\s@]+$</td>
                <td className="p-2.5 font-sans">Official email address</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-2.5 font-bold text-indigo-700">department</td>
                <td className="p-2.5">VARCHAR(50)</td>
                <td className="p-2.5 font-sans">NOT NULL</td>
                <td className="p-2.5 font-sans">CS, IT, ECE, MECH</td>
                <td className="p-2.5 font-sans">Academic discipline branch</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-2.5 font-bold text-indigo-700">gpa</td>
                <td className="p-2.5">DECIMAL(4,2)</td>
                <td className="p-2.5 font-sans">NOT NULL</td>
                <td className="p-2.5 font-sans">Range: 0.00 &lt;= GPA &lt;= 10.00</td>
                <td className="p-2.5 font-sans">Cumulative Grade Point Average</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-2.5 font-bold text-indigo-700">status</td>
                <td className="p-2.5">ENUM</td>
                <td className="p-2.5 font-sans">NOT NULL, DEFAULT &apos;Active&apos;</td>
                <td className="p-2.5 font-sans">&apos;Active&apos; | &apos;Pending&apos; | &apos;Graduated&apos;</td>
                <td className="p-2.5 font-sans">Current enrollment standing</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-2.5 font-bold text-indigo-700">created_at</td>
                <td className="p-2.5">TIMESTAMP</td>
                <td className="p-2.5 font-sans">DEFAULT CURRENT_TIMESTAMP</td>
                <td className="p-2.5 font-sans">ISO 8601 string</td>
                <td className="p-2.5 font-sans">Timestamp of record creation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
