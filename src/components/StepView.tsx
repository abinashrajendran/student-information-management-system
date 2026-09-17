import React, { useState } from 'react';
import { SopStep } from '../types';
import {
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  FileCode,
  Award,
  ListTodo,
  Copy,
  Check,
  Languages,
} from 'lucide-react';

interface StepViewProps {
  step: SopStep;
  totalSteps: number;
  completedTasks: Record<string, boolean>;
  onToggleTask: (stepId: number, taskIndex: number) => void;
  isStepCompleted: boolean;
  onCompleteStep: (stepId: number) => void;
  onNavigateStep: (stepId: number) => void;
}

export const StepView: React.FC<StepViewProps> = ({
  step,
  totalSteps,
  completedTasks,
  onToggleTask,
  isStepCompleted,
  onCompleteStep,
  onNavigateStep,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentTasksCompleted = step.tasks.every(
    (_, idx) => completedTasks[`${step.id}-${idx}`] === true
  );

  return (
    <div id={`step-content-${step.id}`} className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-900 text-white">
              STEP {step.id} OF {totalSteps}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800">
              {step.sopSection}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200/80">
            <Award className="w-4 h-4 text-amber-500" />
            Evaluation Rubric: {step.rubricWeight}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          {step.title}
        </h2>
        <p className="text-sm text-slate-600 mb-4">{step.objective}</p>

        {/* Tanglish Explanation Callout Box */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-200/80 shadow-xs">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-600 text-white shrink-0 mt-0.5">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-teal-950 uppercase tracking-wide mb-1">
                Tanglish Guidance (இந்த Step-ல் என்ன பண்ணனும்?)
              </h3>
              <p className="text-sm text-teal-900 leading-relaxed font-medium">
                {step.tanglishSummary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout for Checklist & Deliverables/Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tasks Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Step Action Items Checklist
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Tick each task when completed
              </span>
            </div>

            <div className="space-y-2.5">
              {step.tasks.map((task, idx) => {
                const taskKey = `${step.id}-${idx}`;
                const isChecked = completedTasks[taskKey] || false;

                return (
                  <button
                    key={idx}
                    id={`task-check-${step.id}-${idx}`}
                    onClick={() => onToggleTask(step.id, idx)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 text-xs leading-relaxed ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 line-through opacity-85'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="shrink-0 mt-0.5">
                      {isChecked ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                    </span>
                    <span className="font-normal">{task}</span>
                  </button>
                );
              })}
            </div>

            {/* Mark Done / Next Step Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                {isStepCompleted ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> This step is marked complete!
                  </span>
                ) : (
                  <span>Check tasks and complete this step</span>
                )}
              </div>

              <button
                id={`btn-complete-step-${step.id}`}
                onClick={() => onCompleteStep(step.id)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                  isStepCompleted
                    ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 ring-2 ring-emerald-600/20'
                }`}
              >
                {isStepCompleted ? 'Mark as Incomplete' : '✓ Muduchiten (Done! Next Step)'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Code Template if present */}
          {step.codeTemplate && (
            <div className="bg-slate-900 text-slate-200 rounded-xl border border-slate-800 p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold text-slate-100">
                    {step.codeTemplate.filename}
                  </span>
                </div>
                <button
                  id={`btn-copy-code-${step.id}`}
                  onClick={() => handleCopyCode(step.codeTemplate!.code)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] flex items-center gap-1.5 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono bg-slate-950 p-3.5 rounded-lg overflow-x-auto text-emerald-300 border border-slate-800/80 leading-relaxed">
                <code>{step.codeTemplate.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Right Column: Deliverables, Tips & SOP Rubric */}
        <div className="lg:col-span-5 space-y-4">
          {/* Deliverables */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              Required Deliverables
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {step.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips from Evaluators */}
          <div className="bg-amber-50/60 rounded-xl border border-amber-200/80 p-5 shadow-xs">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Viva & Evaluation Tips
            </h3>
            <ul className="space-y-2.5 text-xs text-amber-950">
              {step.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 shrink-0">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Step Navigation */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              id="btn-prev-step"
              disabled={step.id === 1}
              onClick={() => onNavigateStep(step.id - 1)}
              className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Step
            </button>

            <button
              id="btn-next-step"
              disabled={step.id === totalSteps}
              onClick={() => onNavigateStep(step.id + 1)}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
