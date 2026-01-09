import React, { useState, useEffect } from "react";

interface Step2SalaryProps {
  salaryRange: { min: number; max: number };
  onSalaryChange: (range: { min: number; max: number }) => void;
  onNext: () => void;
  onBack: () => void;
}

const MIN_SALARY = 30000;
const MAX_SALARY = 300000;
const STEP = 5000;

export const Step2Salary: React.FC<Step2SalaryProps> = ({
  salaryRange,
  onSalaryChange,
  onNext,
  onBack,
}) => {
  const [minVal, setMinVal] = useState(salaryRange.min);
  const [maxVal, setMaxVal] = useState(salaryRange.max);

  useEffect(() => {
    setMinVal(salaryRange.min);
    setMaxVal(salaryRange.max);
  }, [salaryRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxVal - STEP) {
      setMinVal(value);
      onSalaryChange({ min: value, max: maxVal });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minVal + STEP) {
      setMaxVal(value);
      onSalaryChange({ min: minVal, max: value });
    }
  };

  const formatCurrency = (value: number): string => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  const getSalaryLevel = (min: number, max: number): string => {
    const avg = (min + max) / 2;
    if (avg < 60000) return "💡 Entry Level";
    if (avg < 90000) return "📈 Mid Level";
    if (avg < 130000) return "🚀 Senior Level";
    return "💎 Lead/Architect";
  };

  const minPercent = ((minVal - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;
  const maxPercent = ((maxVal - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What's Your Salary Target?
        </h2>
        <p className="text-lg text-gray-600">
          Set your desired salary range. We'll find the best opportunities for
          you.
        </p>
      </div>

      <div className="bg-primary-lighter rounded-2xl p-8 mb-8">
        {/* Salary Display */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <div className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-2">
              Minimum
            </div>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(minVal)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-2">
              Maximum
            </div>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(maxVal)}
            </div>
          </div>
        </div>

        {/* Salary Level Note */}
        <div className="text-center text-lg font-semibold text-primary mb-6">
          {getSalaryLevel(minVal, maxVal)}
        </div>

        {/* Range Slider */}
        <div className="relative mb-8">
          {/* Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border rounded-full -translate-y-1/2"></div>

          {/* Fill */}
          <div
            className="absolute top-1/2 h-1 bg-primary rounded-full -translate-y-1/2"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          ></div>

          {/* Min Input */}
          <input
            type="range"
            min={MIN_SALARY}
            max={MAX_SALARY}
            step={STEP}
            value={minVal}
            onChange={handleMinChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer pointer-events-none"
            style={{ zIndex: minVal > (MAX_SALARY - MIN_SALARY) / 2 ? 5 : 3 }}
          />

          {/* Max Input */}
          <input
            type="range"
            min={MIN_SALARY}
            max={MAX_SALARY}
            step={STEP}
            value={maxVal}
            onChange={handleMaxChange}
            className="absolute w-full h-2 opacity-0 cursor-pointer pointer-events-none"
            style={{ zIndex: maxVal > (MAX_SALARY - MIN_SALARY) / 2 ? 3 : 5 }}
          />
        </div>

        {/* Salary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface p-4 rounded-lg text-center">
            <div className="text-xs font-semibold text-text-secondary uppercase mb-1">
              Annual Range
            </div>
            <div className="text-xl font-bold text-primary">
              {formatCurrency(maxVal - minVal)}
            </div>
          </div>
          <div className="bg-surface p-4 rounded-lg text-center">
            <div className="text-xs font-semibold text-text-secondary uppercase mb-1">
              Monthly Avg
            </div>
            <div className="text-xl font-bold text-primary">
              {formatCurrency((minVal + maxVal) / 2 / 12)}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary-lighter transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-lg font-semibold bg-primary text-white hover:bg-primary-dark transition-all"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};
