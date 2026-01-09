// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useRef, useCallback } from "react";

// --- Theme Constants (Adjust these to match your project's theme.ts) ---
// If you have these imported, you can remove this block
const COLORS = {
  primary: "#4F46E5", // Indigo-600
  gray: {
    200: "#E5E7EB",
    900: "#111827",
    600: "#4B5563",
  },
  white: "#FFFFFF",
};

interface Step2SalaryProps {
  salaryRange: { min: number; max: number };
  onSalaryChange: (range: { min: number; max: number }) => void;
  onNext: () => void;
  onBack: () => void;
}

const MIN_SALARY = 30000;
const MAX_SALARY = 150000; // Updated per spec
const STEP = 1000; // Updated to $1,000 increments per spec

export const Step2Salary: React.FC<Step2SalaryProps> = ({
  salaryRange,
  onSalaryChange,
  onNext,
  onBack,
}) => {
  const [minVal, setMinVal] = useState(salaryRange.min);
  const [maxVal, setMaxVal] = useState(salaryRange.max);
  const [, setIsDragging] = useState(false);

  // Sync state if props change externally
  useEffect(() => {
    setMinVal(salaryRange.min);
    setMaxVal(salaryRange.max);
  }, [salaryRange]);

  // --- Handlers ---
  
  // Update state immediately for smooth UI, then trigger parent callback
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - STEP);
    setMinVal(value);
    setIsDragging(true);
    onSalaryChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + STEP);
    setMaxVal(value);
    setIsDragging(true);
    onSalaryChange({ min: minVal, max: value });
  };

  const handleDragEnd = () => setIsDragging(false);

  // --- Helpers ---
  const formatCurrency = (value: number): string => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  const getSalaryLevel = (min: number, max: number): string => {
    const avg = (min + max) / 2;
    if (avg < 50000) return "💡 Entry Level";
    if (avg < 90000) return "📈 Mid Level";
    if (avg < 120000) return "🚀 Senior Level";
    return "💎 Lead/Architect";
  };

  // Convert values to percentages for width calculations
  const getPercent = useCallback(
    (value: number) =>
      Math.round(((value - MIN_SALARY) / (MAX_SALARY - MIN_SALARY)) * 100),
    []
  );

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  // --- Styles ---
  // We use a style tag to target pseudo-elements (the thumbs) cleanly
  // This ensures the inputs don't block each other
  const sliderStyles = `
    .range-slider-input {
      pointer-events: none; /* Let clicks pass through the track */
      position: absolute;
      height: 0;
      width: 100%;
      outline: none;
      z-index: 3;
    }
    
    /* Chrome/Safari/Edge Thumb */
    .range-slider-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      pointer-events: auto; /* Catch clicks on the thumb only */
      width: 12px; /* 12px Diameter */
      height: 12px;
      border-radius: 50%;
      background-color: ${COLORS.white};
      border: 2px solid ${COLORS.primary};
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      margin-top: -4px; /* Center thumb on track */
      transition: transform 0.1s ease;
    }

    /* Firefox Thumb */
    .range-slider-input::-moz-range-thumb {
      pointer-events: auto;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${COLORS.white};
      border: 2px solid ${COLORS.primary};
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.3);
      transition: transform 0.1s ease;
      box-sizing: border-box;
    }

    .range-slider-input:active::-webkit-slider-thumb {
      transform: scale(1.2);
      background-color: ${COLORS.primary};
    }
    
    .range-slider-input:focus::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
    }
  `;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Inject CSS */}
      <style>{sliderStyles}</style>

      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What's Your Salary Target?
        </h2>
        <p className="text-lg text-gray-600">
          Set your desired salary range. We'll find the best opportunities for
          you.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
        {/* Value Display */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Minimum
            </div>
            <div className="text-3xl font-bold text-indigo-600">
              {formatCurrency(minVal)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Maximum
            </div>
            <div className="text-3xl font-bold text-indigo-600">
              {formatCurrency(maxVal)}
            </div>
          </div>
        </div>

        {/* Salary Level Indicator */}
        <div className="text-center text-lg font-semibold text-indigo-600 mb-8 animate-fade-in">
          {getSalaryLevel(minVal, maxVal)}
        </div>

        {/* --- THE SLIDER COMPONENT --- */}
        <div className="relative w-full h-8 flex items-center mb-8">
          {/* 1. Background Track (Gray) */}
          <div className="absolute w-full h-[4px] bg-gray-200 rounded-full z-0"></div>

          {/* 2. Active Range Track (Color) */}
          <div
            className="absolute h-[4px] bg-indigo-600 rounded-full z-10"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          ></div>

          {/* 3. Range Inputs (Invisible but interactive) */}
          
          {/* Min Input */}
          <input
            type="range"
            min={MIN_SALARY}
            max={MAX_SALARY}
            step={STEP}
            value={minVal}
            onChange={handleMinChange}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
            className="range-slider-input"
            style={{
                // If minVal is high, bring it to front so it can be grabbed
                zIndex: minVal > MAX_SALARY - 10000 ? 5 : 3 
            }}
            aria-label="Minimum Salary"
          />

          {/* Max Input */}
          <input
            type="range"
            min={MIN_SALARY}
            max={MAX_SALARY}
            step={STEP}
            value={maxVal}
            onChange={handleMaxChange}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
            className="range-slider-input"
            style={{ zIndex: 4 }}
            aria-label="Maximum Salary"
          />
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Annual Range
            </div>
            <div className="text-xl font-bold text-indigo-600">
              {formatCurrency(maxVal - minVal)}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
              Monthly Avg
            </div>
            <div className="text-xl font-bold text-indigo-600">
              {formatCurrency((minVal + maxVal) / 2 / 12)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};