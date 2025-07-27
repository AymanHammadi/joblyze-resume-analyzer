import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisPageHeaderProps {
  onGoBack: () => void;
}

export const AnalysisPageHeader = ({ onGoBack }: AnalysisPageHeaderProps) => {
  const { t } = useTranslation("analysis");

  return (
    <div className="text-center space-y-4">
      <Button
        onClick={onGoBack}
        variant="ghost"
        size="sm"
        className="mb-4 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("actions.backToUpload", "Back to Home")}
      </Button>

      <div>
        <h1 className="text-4xl font-bold text-foreground">
          {t("title", "Resume Analysis Results")}
        </h1>
      </div>
    </div>
  );
};
