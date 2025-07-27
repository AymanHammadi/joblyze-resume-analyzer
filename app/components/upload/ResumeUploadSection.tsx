import React from "react";
import { useTranslation } from "react-i18next";
import { Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ResumeUpload } from "./ResumeUpload";

interface ResumeUploadSectionProps {
  onFileSelect: (file: File | null) => void;
  isFormValid: boolean;
  error: string | null;
}

export const ResumeUploadSection = ({
  onFileSelect,
  isFormValid,
  error,
}: ResumeUploadSectionProps) => {
  const { t } = useTranslation("upload");

  return (
    <div className="space-y-6">
      <Card className="card-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="heading text-foreground">
              {t("resumeUpload.title")}
            </h2>
            <p className="caption">{t("resumeUpload.subtitle")}</p>
          </div>
        </div>

        <ResumeUpload onFileSelect={onFileSelect} />
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={!isFormValid}
          className="btn-primary btn-shimmer px-8 py-3 h-auto w-full max-w-xs"
        >
          <Sparkles className="w-4 h-4" />
          {t("submitButton.analyze")}
        </Button>
      </div>

      {/* Error Display in form */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};
