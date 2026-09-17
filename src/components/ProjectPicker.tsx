import React from 'react';
import { ProjectTemplate } from '../types';
import { Database, CheckCircle2, Table, Key } from 'lucide-react';

interface ProjectPickerProps {
  templates: ProjectTemplate[];
  selectedTemplate: ProjectTemplate;
  onSelectTemplate: (tpl: ProjectTemplate) => void;
}

export const ProjectPicker: React.FC<ProjectPickerProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div id="project-picker-card" className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Database className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Step 1 Domain: Choose Your Project Topic (SOP Section 6)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pick one management system to follow across all 10 development steps.
          </p>
        </div>
        <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          Selected Entity: <strong className="text-slate-900">{selectedTemplate.entity}</strong>
        </div>
      </div>

      {/* Template selection pill cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-4">
        {templates.map((tpl) => {
          const isSelected = tpl.id === selectedTemplate.id;
          return (
            <button
              key={tpl.id}
              id={`select-project-${tpl.id}`}
              onClick={() => onSelectTemplate(tpl)}
              className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-slate-900 line-clamp-1">{tpl.name}</span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 ml-1" />}
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Entity: {tpl.entity}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Entity Schema Overview Table */}
      <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Table className="w-3.5 h-3.5 text-slate-600" />
            <h3 className="text-xs font-bold text-slate-800">
              Recommended Fields for {selectedTemplate.name}
            </h3>
          </div>
          <code className="text-[11px] text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded font-mono">
            {selectedTemplate.suggestedEndpoints}
          </code>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-medium">
                <th className="pb-1.5 pr-3">Field Name</th>
                <th className="pb-1.5 px-3">Data Type</th>
                <th className="pb-1.5 px-3">Constraints</th>
                <th className="pb-1.5 pl-3">Example Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 font-mono text-[11px]">
              {selectedTemplate.fields.map((field) => (
                <tr key={field.name} className="hover:bg-slate-100/60 transition-colors">
                  <td className="py-1.5 pr-3 font-semibold text-slate-900 flex items-center gap-1">
                    {field.constraints.includes('PRIMARY') && (
                      <Key className="w-3 h-3 text-amber-500 inline" />
                    )}
                    {field.name}
                  </td>
                  <td className="py-1.5 px-3 text-indigo-600">{field.type}</td>
                  <td className="py-1.5 px-3 text-slate-600">
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">
                      {field.constraints}
                    </span>
                  </td>
                  <td className="py-1.5 pl-3 text-slate-500">{field.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
