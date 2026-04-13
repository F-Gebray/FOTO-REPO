import React from "react";
import { BookingStep } from "../../types";

interface StepIndicatorProps {
  currentStep: BookingStep;
}

const steps = [
  { num: 1, label: "Property" },
  { num: 2, label: "Details" },
  { num: 3, label: "Payment" },
  { num: 4, label: "Confirm" },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center px-10 py-6 gap-0 border-b border-white/[0.08]">
      {steps.map((step, index) => {
        const isDone = step.num < currentStep;
        const isActive = step.num === currentStep;

        return (
          <React.Fragment key={step.num}>
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium border transition-all duration-300
                  ${isDone ? "bg-transparent border-[#c9a96e] text-[#c9a96e]" : ""}
                  ${isActive ? "bg-[#c9a96e] border-[#c9a96e] text-[#0e0e0e]" : ""}
                  ${!isDone && !isActive ? "bg-transparent border-white/20 text-white/30" : ""}
                `}
              >
                {isDone ? "✓" : step.num}
              </div>
              <span
                className={`text-[9px] tracking-[2px] uppercase transition-colors duration-300 ${
                  isActive ? "text-[#f0ede6]" : "text-white/30"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`w-20 h-px mx-4 transition-colors duration-300 ${
                  isDone ? "bg-[#c9a96e]" : "bg-white/10"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
