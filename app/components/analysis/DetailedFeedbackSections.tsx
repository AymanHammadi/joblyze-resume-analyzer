import React from "react";
import { useTranslation } from "react-i18next";
import {
  Settings,
  FileText,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface DetailedFeedbackSectionsProps {
  feedback: Feedback;
}

export const DetailedFeedbackSections = ({
  feedback,
}: DetailedFeedbackSectionsProps) => {
  const { t } = useTranslation("analysis");

  const feedbackSections = [
    {
      title: t("categories.ats.title"),
      score: feedback.ATS.score,
      tips: feedback.ATS.tips,
      icon: <Settings className="w-5 h-5" />,
    },
    {
      title: t("categories.content.title"),
      score: feedback.content.score,
      tips: feedback.content.tips,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      title: t("categories.skills.title"),
      score: feedback.skills.score,
      tips: feedback.skills.tips,
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: t("categories.structure.title"),
      score: feedback.structure.score,
      tips: feedback.structure.tips,
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: t("categories.toneAndStyle.title"),
      score: feedback.toneAndStyle.score,
      tips: feedback.toneAndStyle.tips,
      icon: <Lightbulb className="w-5 h-5" />,
    },
  ];

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
    <div className="lg:col-span-2">
      <Accordion type="multiple" className="space-y-4">
        {feedbackSections.map((section, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-3">
                  <div className="text-primary">{section.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>
                <div
                  className={`px-3 py-1 rounded-md border ${getScoreBg(
                    section.score
                  )}`}
                >
                  <span
                    className={`text-sm font-bold ${getScoreColor(
                      section.score
                    )}`}
                  >
                    {section.score}/100
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-6">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                    section.score >= 80
                      ? "bg-emerald-500"
                      : section.score >= 60
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${section.score}%` }}
                />
              </div>

              {/* Tips */}
              <div className="space-y-4">
                {section.tips.map((tip, tipIndex) => (
                  <div
                    key={tipIndex}
                    className={`p-4 rounded-lg border ${getTipBg(
                      tip.type
                    )} transition-all duration-200 hover:shadow-sm`}
                  >
                    <div className="flex gap-3">
                      {getTipIcon(tip.type)}
                      <div className="space-y-1 flex-1">
                        <h4 className="font-medium text-foreground">
                          {tip.tip}
                        </h4>
                        {(tip as any).explanation && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {(tip as any).explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
