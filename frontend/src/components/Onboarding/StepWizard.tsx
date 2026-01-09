import React, { useState, useCallback } from "react";
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

  const progressPercent = (state.currentStep / TOTAL_STEPS) * 100;

  // Completion screen
  if (state.isCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Aboard!
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            We've personalized your job recommendations based on your preferences.
          </p>
          <button
            onClick={() => {
              window.location.href = "/dashboard";
            }}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-all"
          >
            View Your Recommendations →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-2">
            Let's Get You Started
          </h1>
          <p className="text-lg text-text-secondary">
            Tell us about your ideal job, and we'll find the perfect
            opportunities for you
          </p>
        </div>

        {/* Progress Section - UPDATED */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            {/* Changed from h-2 to h-3, added gray-200 background for visibility, added shadow-inner */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                // Changed from bg-primary to specific blue for safety, added ease-out
                className="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full shadow-sm"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
          
        </div>
        

        {/* Step Indicators */}
        <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
          {STEP_NAMES.map((name, index) => {
            const stepNum = index + 1;
            const isCompleted =
              state.completedSteps[index] && stepNum !== state.currentStep;
            const isActive = state.currentStep === stepNum;

            return (
              <React.Fragment key={stepNum}>
                <button
                  onClick={() => goToStep(stepNum)}
                  title={name}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg scale-110"
                      : isCompleted
                      ? "bg-success text-white"
                      : "bg-border text-text-secondary hover:bg-primary hover:text-white"
                  }`}
                >
                  {isCompleted ? "✓" : stepNum}
                </button>
                {stepNum < STEP_NAMES.length && (
                  <div className="h-1 w-8 bg-border"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-surface rounded-2xl shadow-lg p-8 min-h-96">
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