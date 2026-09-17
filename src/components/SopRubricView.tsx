import React from 'react';
import { Award, CheckSquare, FileText, CheckCircle2 } from 'lucide-react';

export const SopRubricView: React.FC = () => {
  const rubric = [
    { component: 'Requirement & Design', weight: '10%', criteria: 'Problem definition, architecture, database design' },
    { component: 'Frontend UI', weight: '20%', criteria: 'UI quality, responsiveness, forms, validation' },
    { component: 'Backend/API', weight: '20%', criteria: 'REST APIs, business logic, validation' },
    { component: 'CRUD Functionality', weight: '20%', criteria: 'Create, Read, Update, Delete working correctly' },
    { component: 'Database', weight: '10%', criteria: 'Schema, connectivity, data consistency' },
    { component: 'Testing', weight: '10%', criteria: 'Test coverage and error handling (Postman)' },
    { component: 'Documentation & Viva', weight: '10%', criteria: 'Report quality and project explanation' },
  ];

  const demoChecklist = [
    'Application starts without errors (Frontend & Backend servers running)',
    'Database connection works correctly (SQLite/PostgreSQL/MySQL)',
    'Create operation works (Form submit inserts into DB & updates UI)',
    'Read/list operation works (Saved records displayed in table/cards)',
    'Update operation works (Existing record modified & reflected)',
    'Delete operation works (Record removed after confirmation dialog)',
    'Validation works (Empty fields & invalid email rejected with feedback)',
    'Search / filter works across records list',
    'API endpoints can be demonstrated via Postman or browser inspect',
    'Student can confidently explain the full architecture and code flow',
  ];

  return (
    <div className="space-y-6">
      {/* Rubric Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">Academic Project Evaluation Rubric (100 Marks)</h3>
            <p className="text-xs text-slate-500">Grading breakdown for laboratory demonstration and viva examination.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <th className="py-2.5 px-3">Component</th>
                <th className="py-2.5 px-3">Weightage</th>
                <th className="py-2.5 px-3">Evaluation Criteria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rubric.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{item.component}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-600">{item.weight}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.criteria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Demonstration Checklist */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">Laboratory Demonstration &amp; Viva Verification Checklist</h3>
            <p className="text-xs text-slate-500">Essential milestones verified during the project examination.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {demoChecklist.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
