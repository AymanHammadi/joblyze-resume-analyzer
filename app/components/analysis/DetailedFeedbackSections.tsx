import React from "react";
import { useTranslation } from "react-i18next";
import { Settings, FileText, Users, Target, Lightbulb } from "lucide-react";
import { FeedbackSection } from "./FeedbackSection";

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

  return (
    <div className="lg:col-span-2 space-y-6">
      {feedbackSections.map((section, index) => (
        <FeedbackSection
          key={index}
          title={section.title}
          score={section.score}
          tips={section.tips}
          icon={section.icon}
        />
      ))}
    </div>
  );
};
