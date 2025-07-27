import React from "react";
import {
  ScoreOverview,
  FeedbackSummary,
  ResumePreview,
} from "@/components/analysis";
import { DetailedFeedbackSections } from "./DetailedFeedbackSections";

interface AnalysisContentProps {
  analysisData: Resume;
  feedback: Feedback;
  imageUrl: string;
  resumeUrl: string;
}

export const AnalysisContent = ({
  analysisData,
  feedback,
  imageUrl,
  resumeUrl,
}: AnalysisContentProps) => {
  const handleImageClick = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else if (analysisData?.resumePath) {
      window.open(analysisData.resumePath, "_blank");
    }
  };

  return (
    <div className="grid gap-8">
      {/* Score Overview */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <ScoreOverview
            overallScore={analysisData.feedback.overallScore}
            companyName={analysisData.companyName}
            jobTitle={analysisData.jobTitle}
          />
        </div>
      </div>

      {/* Feedback Summary */}
      <FeedbackSummary feedback={analysisData.feedback} />

      {/* Detailed Feedback & Resume Preview */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Detailed Feedback Sections */}
        <DetailedFeedbackSections feedback={feedback} />

        {/* Resume Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-18">
            <ResumePreview
              imagePath={imageUrl || analysisData?.imagePath}
              resumePath={resumeUrl || analysisData?.resumePath}
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
