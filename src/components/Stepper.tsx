import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { SopStep } from '../types';

interface StepperProps {
  steps: SopStep[];
  currentStepId: number;
  completedSteps: number[];
  onSelectStep: (stepId: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStepId,
  completedSteps,
  onSelectStep,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-xs overflow-x-auto py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center min-w-max gap-1 sm:gap-2">
        {steps.map((step, idx) => {
          const isCurrent = step.id === currentStepId;
          const isDone = completedSteps.includes(step.id);

          return (
            <React.Fragment key={step.id}>
              <button
                id={`step-pill-${step.id}`}
                onClick={() => onSelectStep(step.id)}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-1'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isCurrent
                      ? 'bg-emerald-400 text-slate-950'
                      : isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : step.id}
                </span>
                <span className="whitespace-nowrap">
                  {step.id}. {step.title.split('&')[0].trim()}
                </span>
              </button>
              {idx < steps.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
