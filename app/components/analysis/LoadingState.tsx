import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";

export const LoadingState = () => {
  const { t } = useTranslation("analysis");

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-app py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="relative">
              <img
                src="/images/resume-scan-2.gif"
                alt="Analyzing resume"
                className="w-24 h-24 mx-auto object-contain"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                {t("loading.title", "Looking for your resume...")}
              </h2>
              <p className="text-muted-foreground">
                {t(
                  "loading.text",
                  "Please wait while we retrieve your analysis..."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};
