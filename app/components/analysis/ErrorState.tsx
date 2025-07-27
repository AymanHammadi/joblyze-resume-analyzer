import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";

interface ErrorStateProps {
  error: string;
  onGoBack: () => void;
}

export const ErrorState = ({ error, onGoBack }: ErrorStateProps) => {
  const { t } = useTranslation("analysis");

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-app py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="p-8 bg-destructive/5 border border-destructive/20 rounded-xl">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-semibold text-destructive mb-3">
                {t("errors.title", "Analysis Error")}
              </h2>
              <p className="text-destructive/80 mb-6">{error}</p>
              <Button onClick={onGoBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t("actions.backToUpload", "Back to Upload")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};
