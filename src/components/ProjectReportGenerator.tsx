import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

interface ProjectReportGeneratorProps {
  studentCount?: number;
}

export const ProjectReportGenerator: React.FC<ProjectReportGeneratorProps> = ({ studentCount = 5 }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const reportText = document.getElementById('project-report-content')?.innerText || '';
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold font-mono">
              DOC-2026
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Project Technical Documentation & Viva Report
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Complete technical specification and laboratory project submission report. Formatted for academic assessment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Report Document Paper Card */}
      <div
        id="project-report-content"
        className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm font-sans space-y-8 max-w-4xl mx-auto text-slate-800"
      >
        {/* Title Block & University Header */}
        <div className="border-b border-slate-200 pb-6 text-center space-y-2">
          <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
            Department of Computer Science & Engineering (AI & ML) • Web Technology Laboratory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Student Information Management System (SIMS)
          </h1>
          <p className="text-xs text-slate-600">
            A Full-Stack RESTful CRUD Web Application Built with Express 4, React 19, TypeScript, and JSON Persistence
          </p>

          <div className="pt-4 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left max-w-2xl w-full">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Candidate</span>
                <span className="font-bold text-slate-900">Abinash R</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Register No</span>
                <span className="font-mono font-bold text-indigo-700">922525148002</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Department</span>
                <span className="font-medium text-slate-900">B.E. CSE (AIML)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Problem Statement & Objectives */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wide border-l-4 border-emerald-600 pl-2">
            1. Project Overview & Objectives
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Maintaining student academic profiles, contact records, department enrollments, and Cumulative Grade Point Averages (CGPA) manually is prone to redundancy and human errors. This project presents the design and implementation of a responsive, full-stack <strong>Student Information Management System (SIMS)</strong> implementing standard Create, Read, Update, and Delete (CRUD) operations adhering to REST principles.
          </p>
        </section>

        {/* 2. Technology Stack */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wide border-l-4 border-emerald-600 pl-2">
            2. System Specifications & Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1 font-bold">Frontend Technologies</strong>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>React 19 with TypeScript (Strict Typing)</li>
                <li>Tailwind CSS Utility Framework for responsive UI</li>
                <li>Lucide React Vector Icons for state indicators</li>
                <li>Asynchronous Fetch API client with error handling</li>
              </ul>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1 font-bold">Backend & Storage Technologies</strong>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Node.js runtime with Express 4 RESTful Framework</li>
                <li>JSON-backed persistent store with file synchronization</li>
                <li>Dual validation (Client-side regex + Express HTTP 400 rejection)</li>
                <li>Port: 3000 (Standard ingress)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. System Architecture */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wide border-l-4 border-emerald-600 pl-2">
            3. Three-Tier Architectural Model
          </h2>
          <div className="bg-slate-950 text-emerald-300 font-mono text-xs p-4 rounded-xl leading-relaxed border border-slate-800">
            [ Browser / Client Interface (React 19 + TypeScript) ]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓ (HTTP Requests &amp; JSON Form Payloads)<br />
            [ RESTful Web Services Layer (/api/students/) ]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓ (Express Middlewares &amp; Input Validation Logic)<br />
            [ Controller / Business Rule Engine ]<br />
            &nbsp;&nbsp;&nbsp;&nbsp;↓ (Synchronous File I/O with Transaction Safety)<br />
            [ Persistent Database Store (students_db.json) ]
          </div>
        </section>

        {/* 4. Database Schema */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wide border-l-4 border-emerald-600 pl-2">
            4. Entity Data Dictionary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2">Attribute</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Constraints</th>
                  <th className="p-2">Validation Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                <tr>
                  <td className="p-2 font-bold text-indigo-700">id</td>
                  <td className="p-2">INT</td>
                  <td className="p-2 font-sans">PRIMARY KEY, AUTO_INCREMENT</td>
                  <td className="p-2 font-sans">System generated sequential integer</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-indigo-700">roll_number</td>
                  <td className="p-2">VARCHAR(20)</td>
                  <td className="p-2 font-sans">UNIQUE, NOT NULL</td>
                  <td className="p-2 font-sans">Required, rejects duplicate insertions</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-indigo-700">name</td>
                  <td className="p-2">VARCHAR(100)</td>
                  <td className="p-2 font-sans">NOT NULL</td>
                  <td className="p-2 font-sans">Text only, trimmed whitespace</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-indigo-700">email</td>
                  <td className="p-2">VARCHAR(120)</td>
                  <td className="p-2 font-sans">UNIQUE, NOT NULL</td>
                  <td className="p-2 font-sans">Regex format: ^[^\s@]+@[^\s@]+\.[^\s@]+$</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-indigo-700">department</td>
                  <td className="p-2">VARCHAR(50)</td>
                  <td className="p-2 font-sans">NOT NULL</td>
                  <td className="p-2 font-sans">CS, IT, ECE, MECH</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-indigo-700">gpa</td>
                  <td className="p-2">DECIMAL(4,2)</td>
                  <td className="p-2 font-sans">NOT NULL</td>
                  <td className="p-2 font-sans">Range: 0.00 &lt;= GPA &lt;= 10.00</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-indigo-700">status</td>
                  <td className="p-2">ENUM</td>
                  <td className="p-2 font-sans">NOT NULL</td>
                  <td className="p-2 font-sans">Active | Pending | Graduated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. REST API Specifications */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wide border-l-4 border-emerald-600 pl-2">
            5. REST API Endpoint Documentation
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2">Operation</th>
                  <th className="p-2">Method</th>
                  <th className="p-2">Endpoint</th>
                  <th className="p-2">Status Code</th>
                  <th className="p-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                <tr>
                  <td className="p-2 font-semibold">Create Student</td>
                  <td className="p-2 font-mono font-bold text-emerald-700">POST</td>
                  <td className="p-2 font-mono">/api/students/</td>
                  <td className="p-2 font-mono">201 Created</td>
                  <td className="p-2">Inserts record after uniqueness and field validation</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Read All Students</td>
                  <td className="p-2 font-mono font-bold text-blue-700">GET</td>
                  <td className="p-2 font-mono">/api/students/</td>
                  <td className="p-2 font-mono">200 OK</td>
                  <td className="p-2">Returns list supporting search, department &amp; status filters</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Read Single Student</td>
                  <td className="p-2 font-mono font-bold text-blue-700">GET</td>
                  <td className="p-2 font-mono">/api/students/:id/</td>
                  <td className="p-2 font-mono">200 OK / 404</td>
                  <td className="p-2">Returns student object or 404 if not found</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Update Student</td>
                  <td className="p-2 font-mono font-bold text-amber-700">PUT</td>
                  <td className="p-2 font-mono">/api/students/:id/</td>
                  <td className="p-2 font-mono">200 OK / 400</td>
                  <td className="p-2">Modifies existing fields with validation</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Delete Student</td>
                  <td className="p-2 font-mono font-bold text-rose-700">DELETE</td>
                  <td className="p-2 font-mono">/api/students/:id/</td>
                  <td className="p-2 font-mono">200 / 204</td>
                  <td className="p-2">Removes record from persistent store</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Test Results Matrix */}
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wide border-l-4 border-emerald-600 pl-2">
            6. Laboratory Verification & Test Execution Matrix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>[TC-01] Valid Record Creation returns HTTP 201 Created</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>[TC-02] Duplicate Roll Number rejected with HTTP 400 Bad Request</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>[TC-03] GPA boundary validation (&gt;10 or &lt;0) rejected with HTTP 400</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>[TC-04] Reading non-existent ID returns HTTP 404 Not Found</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>[TC-05] Record Update successfully persists with HTTP 200 OK</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>[TC-06] Record Deletion successfully removes item with HTTP 204</span>
            </div>
          </div>
        </section>

        {/* Signature & Verification Block */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs text-slate-600">
          <div>
            <p className="font-bold text-slate-900">Submitted By:</p>
            <p className="mt-1 font-semibold">Abinash R (922525148002)</p>
            <p className="text-[11px] text-slate-500">Student, B.E. CSE (AIML)</p>
          </div>

          <div className="sm:text-right">
            <p className="font-bold text-slate-900">Faculty Evaluation &amp; Approval:</p>
            <p className="mt-1 border-b border-slate-300 pb-1 w-48 text-transparent select-none">
              Signature
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Staff In-Charge / External Examiner</p>
          </div>
        </div>
      </div>
    </div>
  );
};
