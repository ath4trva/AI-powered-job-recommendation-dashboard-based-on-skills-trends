import React, { useState, useCallback } from "react";
// Make sure to import your types properly here if they are in a separate file
import type { UserPreferences, OnboardingState } from "../../types/index";
import { Step1Roles } from "./Step1_Roles";
import { Step2Salary } from "./Step2_Salary";
import { Step3Skills } from "./Step3_Skills";
import { Step4Culture } from "./Step4_Culture";
import { Step5Review } from "./Step5_Review";

interface StepWizardProps {
  onComplete?: (preferences: UserPreferences) => void;
}

const TOTAL_STEPS = 5;
const STEP_NAMES = [
  "Select Roles",
  "Salary Range",
  "Top Skills",
  "Culture & Work Type",
  "Review & Submit",
];

export const StepWizard: React.FC<StepWizardProps> = ({ onComplete }) => {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 1,
    preferences: {
      selectedRoles: [],
      salaryRange: { min: 60000, max: 120000 },
      topSkills: [],
      culturePreferences: [],
      workType: "hybrid",
      experience: "mid",
    },
    isCompleted: false,
    completedSteps: [false, false, false, false, false],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates },
    }));
  }, []);

  const markStepComplete = useCallback((step: number) => {
    setState((prev) => {
      const newCompletedSteps = [...prev.completedSteps];
      newCompletedSteps[step - 1] = true;
      return { ...prev, completedSteps: newCompletedSteps };
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step > 0 && step <= TOTAL_STEPS) {
      setState((prev) => ({ ...prev, currentStep: step }));
    }
  }, []);

  const handleNext = useCallback(() => {
    markStepComplete(state.currentStep);
    if (state.currentStep < TOTAL_STEPS) {
      goToStep(state.currentStep + 1);
    }
  }, [state.currentStep, markStepComplete, goToStep]);

  const handleBack = useCallback(() => {
    if (state.currentStep > 1) {
      goToStep(state.currentStep - 1);
    }
  }, [state.currentStep, goToStep]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      markStepComplete(TOTAL_STEPS);
      setState((prev) => ({ ...prev, isCompleted: true }));

      if (onComplete) {
        onComplete(state.preferences);
      }
    } catch (error) {
      console.error("Error submitting preferences:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [state.preferences, onComplete, markStepComplete]);

  

  // Completion screen
  if (state.isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Aboard!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We've personalized your job recommendations based on your
            preferences.
          </p>
          <button
            onClick={() => {
              window.location.href = "/dashboard";
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            View Your Recommendations →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-20 sm:pt-30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-blue-600 mb-2 pt-4">
            Let's Get You Started
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Tell us about your ideal job, and we'll find the perfect
            opportunities for you
          </p>
        </div>

        {/* --- IMPROVED STEPPER SECTION START --- 
           1. Removed flex-wrap to keep them on one line.
           2. Used flex-1 for lines so they shrink on mobile.
           3. Adjusted button sizes (w-8 vs w-10) for mobile.
        */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
          
          {/* Numbered Steps */}
          <div className="flex justify-between items-center w-full">
            {STEP_NAMES.map((name, index) => {
              const stepNum = index + 1;
              const isCompleted =
                state.completedSteps[index] && stepNum !== state.currentStep;
              const isActive = state.currentStep === stepNum;

              return (
                <React.Fragment key={stepNum}>
                  {/* Step Bubble */}
                  <button
                    onClick={() => goToStep(stepNum)}
                    title={name}
                    className={`
                      relative z-10 flex items-center justify-center 
                      w-8 h-8 sm:w-10 sm:h-10 rounded-full 
                      font-bold text-xs sm:text-sm transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-100"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500 hover:bg-blue-400 hover:text-white"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : stepNum}
                  </button>

                  {/* Connecting Line (Only render if not the last item) */}
                  {stepNum < STEP_NAMES.length && (
                    <div className="flex-1 h-1 mx-2 sm:mx-4 bg-gray-200 rounded">
                      <div
                        className={`h-full rounded transition-all duration-500 ${
                          stepNum < state.currentStep
                            ? "bg-green-500"
                            : "bg-transparent"
                        }`}
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile Labels (Optional: Shows current step name below bubbles) */}
          <div className="text-center mt-2 sm:hidden">
            <span className="text-sm font-medium text-blue-600">
              {STEP_NAMES[state.currentStep - 1]}
            </span>
          </div>
        </div>
        {/* --- IMPROVED STEPPER SECTION END --- */}

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 min-h-[400px]">
          {state.currentStep === 1 && (
            <Step1Roles
              selectedRoles={state.preferences.selectedRoles}
              onRolesChange={(roles) =>
                updatePreferences({ selectedRoles: roles })
              }
              onNext={handleNext}
            />
          )}

          {state.currentStep === 2 && (
            <Step2Salary
              salaryRange={state.preferences.salaryRange}
              onSalaryChange={(range) =>
                updatePreferences({ salaryRange: range })
              }
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {state.currentStep === 3 && (
            <Step3Skills
              topSkills={state.preferences.topSkills}
              onSkillsChange={(skills) =>
                updatePreferences({ topSkills: skills })
              }
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {state.currentStep === 4 && (
            <Step4Culture
              culturePreferences={state.preferences.culturePreferences}
              onCultureChange={(cultures) =>
                updatePreferences({ culturePreferences: cultures })
              }
              workType={state.preferences.workType}
              onWorkTypeChange={(type) => updatePreferences({ workType: type })}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {state.currentStep === 5 && (
            <Step5Review
              preferences={state.preferences}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};
