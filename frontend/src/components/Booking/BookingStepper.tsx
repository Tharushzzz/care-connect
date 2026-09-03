import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: number;
  label: string;
}

export interface BookingStepperProps {
  currentStep: number;
  steps: StepItem[];
  onStepClick: (stepId: number) => void;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="relative flex items-center justify-between">
        {/* Connecting Progress Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[#E2EDF7] -z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#0B8BD8] transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <button
                type="button"
                onClick={() => {
                  if (step.id < currentStep) onStepClick(step.id);
                }}
                disabled={step.id > currentStep}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  isCompleted
                    ? 'bg-[#0B8BD8] text-white shadow-xs cursor-pointer'
                    : isCurrent
                    ? 'bg-[#0B8BD8] text-white ring-4 ring-[#0B8BD8]/25 shadow-md scale-105'
                    : 'bg-white text-gray-400 border-2 border-[#D5E4F2]'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : step.id}
              </button>
              <span
                className={`text-xs font-semibold mt-2 transition-colors ${
                  isCurrent
                    ? 'text-[#0B3B60] font-bold'
                    : isCompleted
                    ? 'text-[#0B8BD8]'
                    : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingStepper;
