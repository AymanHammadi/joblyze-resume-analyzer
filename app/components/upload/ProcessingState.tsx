import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessingStateProps {
  currentStep: string;
  progress: number;
  error: string | null;
}

export const ProcessingState = ({
  currentStep,
  progress,
  error,
}: ProcessingStateProps) => {
  const { t } = useTranslation("upload");

  return (
    <div className="text-center space-y-6">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <img
          src="/images/resume-scan.gif"
          alt="Analyzing resume"
          className="w-64 h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          {t("analysis.processing.title", "Analyzing Your Resume")}
        </h2>

        <div className="space-y-2">
          <div className="w-full max-w-md mx-auto bg-muted rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-lg text-muted-foreground">{currentStep}</p>
          <p className="text-sm text-muted-foreground">{progress}% Complete</p>
        </div>
      </div>

      {/* Error Display during processing */}
      {error && (
        <div className="max-w-md mx-auto p-4 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};
