import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface FeedbackTip {
  type: "good" | "improve";
  tip: string;
  explanation?: string;
}

interface FeedbackSectionProps {
  title: string;
  score: number;
  tips: FeedbackTip[];
  icon?: React.ReactNode;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  title,
  score,
  tips,
  icon,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "bg-amber-500/10 border-amber-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  const getTipIcon = (type: "good" | "improve") => {
    if (type === "good") {
      return <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
    }
    return <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
  };

  const getTipBg = (type: "good" | "improve") => {
    if (type === "good") {
      return "bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20";
    }
    return "bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20";
  };

  return (
    <Card className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <div className={`px-4 py-2 rounded-lg border ${getScoreBg(score)}`}>
          <span className={`text-lg font-bold ${getScoreColor(score)}`}>
            {score}/100
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
            score >= 80
              ? "bg-emerald-500"
              : score >= 60
              ? "bg-amber-500"
              : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Tips */}
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getTipBg(
              tip.type
            )} transition-all duration-200 hover:shadow-sm`}
          >
            <div className="flex gap-3">
              {getTipIcon(tip.type)}
              <div className="space-y-1 flex-1">
                <h4 className="font-medium text-foreground">{tip.tip}</h4>
                {tip.explanation && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.explanation}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
