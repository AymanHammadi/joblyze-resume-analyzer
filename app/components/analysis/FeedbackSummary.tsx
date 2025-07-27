import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import {
  Target,
  FileText,
  Users,
  Settings,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

interface FeedbackCategory {
  score: number;
  tips: Array<{
    type: "good" | "improve";
    tip: string;
    explanation?: string;
  }>;
}

interface Feedback {
  overallScore: number;
  ATS: FeedbackCategory;
  toneAndStyle: FeedbackCategory;
  content: FeedbackCategory;
  structure: FeedbackCategory;
  skills: FeedbackCategory;
}

interface FeedbackSummaryProps {
  feedback: Feedback;
}

export const FeedbackSummary: React.FC<FeedbackSummaryProps> = ({
  feedback,
}) => {
  const { t } = useTranslation("analysis");

  const categories = [
    {
      key: "ATS" as keyof Feedback,
      title: t("categories.ats.title"),
      description: t("categories.ats.description"),
      icon: <Settings className="w-5 h-5" />,
      data: feedback.ATS,
    },
    {
      key: "content" as keyof Feedback,
      title: t("categories.content.title"),
      description: t("categories.content.description"),
      icon: <FileText className="w-5 h-5" />,
      data: feedback.content,
    },
    {
      key: "skills" as keyof Feedback,
      title: t("categories.skills.title"),
      description: t("categories.skills.description"),
      icon: <Target className="w-5 h-5" />,
      data: feedback.skills,
    },
    {
      key: "structure" as keyof Feedback,
      title: t("categories.structure.title"),
      description: t("categories.structure.description"),
      icon: <Users className="w-5 h-5" />,
      data: feedback.structure,
    },
    {
      key: "toneAndStyle" as keyof Feedback,
      title: t("categories.toneAndStyle.title"),
      description: t("categories.toneAndStyle.description"),
      icon: <Lightbulb className="w-5 h-5" />,
      data: feedback.toneAndStyle,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const totalGoodTips = categories.reduce(
    (acc, cat) =>
      acc + cat.data.tips.filter((tip) => tip.type === "good").length,
    0
  );

  const totalImproveTips = categories.reduce(
    (acc, cat) =>
      acc + cat.data.tips.filter((tip) => tip.type === "improve").length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-500/10 dark:to-emerald-500/5 border-emerald-200 dark:border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                {t("feedback.strengthsFound")}
              </p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {totalGoodTips}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-500/10 dark:to-amber-500/5 border-amber-200 dark:border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                {t("feedback.areasToImprove")}
              </p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                {totalImproveTips}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-primary font-medium">
                {t("feedback.overallScore")}
              </p>
              <p className="text-2xl font-bold text-primary">
                {feedback.overallScore}/100
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category Scores */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {t("feedback.categoryBreakdown")}
        </h3>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-muted-foreground">{category.icon}</div>
                  <div>
                    <h4 className="font-medium text-foreground">
                      {category.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    category.data.score
                  )}`}
                >
                  {category.data.score}/100
                </span>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ease-out ${getScoreBg(
                    category.data.score
                  )}`}
                  style={{ width: `${category.data.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
