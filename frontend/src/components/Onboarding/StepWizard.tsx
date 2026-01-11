// src/components/Onboarding/StepWizard.tsx

import React, { useState, useCallback, useContext } from "react";
import type { UserPreferences, OnboardingState } from "../../types/index";
import { AuthContext } from "../../contexts/AuthContext.shared";
import { Step1Roles } from "./Step1_Roles";
import { Step2Salary } from "./Step2_Salary";
import { Step3Skills } from "./Step3_Skills";
import { Step4Culture } from "./Step4_Culture";
import Step_Resume from "../Onboarding/Step_Resume"; // NEW IMPORT
import { Step5Review } from "./Step5_Review";

interface StepWizardProps {
  onComplete?: (preferences: UserPreferences) => void;
}

const TOTAL_STEPS = 6; // INCREASED FROM 5 TO 6
const STEP_NAMES = [
  "Select Roles",
  "Salary Range",
  "Top Skills",
  "Culture & Work Type",
  "Upload Resume", // NEW STEP NAME
  "Review & Submit",
];

export const StepWizard: React.FC<StepWizardProps> = ({ onComplete }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("StepWizard must be used within AuthProvider");
  }

  const { markWizardComplete } = authContext;

  const [state, setState] = useState<OnboardingState>({
    currentStep: 1,
    preferences: {
      selectedRoles: [],
      salaryRange: { min: 60000, max: 120000 },
      topSkills: [],
      culturePreferences: [],
      workType: "hybrid",
      experience: "mid",
      // Resume data is optional initially
    },
    isCompleted: false,
    completedSteps: [false, false, false, false, false, false], // Add extra false for 6th step
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

      // Call the onComplete callback to save preferences in App
      if (onComplete) {
        onComplete(state.preferences);
      }

      // Mark wizard as complete in auth context
      await markWizardComplete();
    } catch (error) {
      console.error("Error submitting preferences:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [state.preferences, onComplete, markStepComplete, markWizardComplete]);

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
          <p className="text-sm text-gray-500 mb-8">
            Redirecting to your dashboard...
          </p>
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

        {/* --- IMPROVED STEPPER SECTION --- */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
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
                    onClick={() => {
                        // Allow user to jump back to completed steps
                        if (isCompleted || isActive) goToStep(stepNum)
                    }}
                    title={name}
                    className={`
                      relative z-10 flex items-center justify-center 
                      w-8 h-8 sm:w-10 sm:h-10 rounded-full 
                      font-bold text-xs sm:text-sm transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-100"
                          : isCompleted
                          ? "bg-green-500 text-white cursor-pointer"
                          : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : stepNum}
                  </button>

                  {/* Connecting Line (Only render if not the last item) */}
                  {stepNum < STEP_NAMES.length && (
                    <div className="flex-1 h-1 mx-1 sm:mx-2 bg-gray-200 rounded">
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

          {/* Mobile Labels */}
          <div className="text-center mt-4 sm:hidden">
            <span className="text-sm font-medium text-blue-600">
              {STEP_NAMES[state.currentStep - 1]}
            </span>
          </div>
        </div>

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

          {/* NEW: Resume Step at Index 5 */}
          {state.currentStep === 5 && (
            <Step_Resume
              initialData={state.preferences.resumeData}
              onNext={(data: UserPreferences['resumeData']) => updatePreferences({ resumeData: data })}
              onBack={handleBack}
            />
          )}

          {state.currentStep === 6 && (
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