import React from "react";
import { JobDetailsForm } from "./JobDetailsForm";
import { ResumeUploadSection } from "./ResumeUploadSection";

interface FormData {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  resumeFile: File | null;
}

interface UploadFormProps {
  formData: FormData;
  isFormValid: boolean;
  error: string | null;
  onInputChange: (field: keyof FormData, value: string) => void;
  onFileSelect: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UploadForm = ({
  formData,
  isFormValid,
  error,
  onInputChange,
  onFileSelect,
  onSubmit,
}: UploadFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Job Details */}
        <div className="space-y-6">
          <JobDetailsForm
            companyName={formData.companyName}
            jobTitle={formData.jobTitle}
            jobDescription={formData.jobDescription}
            onInputChange={onInputChange}
          />
        </div>

        {/* Right Column - Resume Upload */}
        <div className="space-y-6">
          <ResumeUploadSection
            onFileSelect={onFileSelect}
            isFormValid={isFormValid}
            error={error}
          />
        </div>
      </div>
    </form>
  );
};
