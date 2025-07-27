import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";

interface ScoreOverviewProps {
  overallScore: number;
  companyName?: string;
  jobTitle?: string;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({
  overallScore,
  companyName,
  jobTitle,
}) => {
  const { t } = useTranslation("analysis");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return t("scoreOverview.scoreStatus.excellent");
    if (score >= 60) return t("scoreOverview.scoreStatus.good");
    if (score >= 40) return t("scoreOverview.scoreStatus.fair");
    return t("scoreOverview.scoreStatus.needsImprovement");
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-border/50">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="relative">
          <div className="w-32 h-32 relative">
            {/* Background circle */}
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted/20"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={
                  overallScore >= 80
                    ? "#10b981"
                    : overallScore >= 60
                    ? "#f59e0b"
                    : "#ef4444"
                }
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${
                  2 * Math.PI * 50 * (1 - overallScore / 100)
                }`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 8px ${
                    overallScore >= 80
                      ? "#10b98140"
                      : overallScore >= 60
                      ? "#f59e0b40"
                      : "#ef444440"
                  })`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${getScoreColor(
                    overallScore
                  )}`}
                >
                  {overallScore}
                </div>
                <div className="text-sm text-muted-foreground">/ 100</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            {t("scoreOverview.title")}
          </h3>
          <p className={`text-lg font-medium ${getScoreColor(overallScore)}`}>
            {getScoreStatus(overallScore)}
          </p>
        </div>

        {(companyName || jobTitle) && (
          <div className="space-y-1 text-center">
            <p className="text-sm text-muted-foreground">
              {t("scoreOverview.analyzedFor")}
            </p>
            {jobTitle && (
              <p className="font-medium text-foreground">{jobTitle}</p>
            )}
            {companyName && (
              <p className="text-sm text-muted-foreground">at {companyName}</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
