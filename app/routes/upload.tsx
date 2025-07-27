import React, { useState } from "react";
import { Building2, Briefcase, FileText, Upload, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { data, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ResumeUpload } from "@/components/ResumeUpload";
import { Header } from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";
import { usePuterStore } from "@/lib/puter";
import { convertPdfToImage } from "@/lib/pdf2image";
import { prepareInstructions, AIResponseFormat } from "../constants/index";
import i18n from "../i18n";

interface FormData {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  resumeFile: File | null;
}

interface AnalysisState {
  isProcessing: boolean;
  currentStep: string;
  progress: number;
  error: string | null;
}

// Analysis steps configuration
const ANALYSIS_STEPS = {
  UPLOADING: { key: "progress.uploading", progress: 20 },
  CONVERTING: { key: "progress.converting", progress: 40 },
  UPLOADING_IMAGE: { key: "progress.uploadingImage", progress: 60 },
  ANALYZING: { key: "progress.analyzing", progress: 80 },
  SAVING: { key: "progress.saving", progress: 90 },
  COMPLETE: { key: "progress.complete", progress: 100 },
} as const;

// Fallback feedback structure
const createFallbackFeedback = (): Feedback => ({
  overallScore: 75,
  ATS: {
    score: 75,
    tips: [{ type: "improve", tip: "AI analysis couldn't be parsed properly" }],
  },
  toneAndStyle: {
    score: 75,
    tips: [
      {
        type: "improve",
        tip: "AI analysis couldn't be parsed properly",
        explanation: "",
      },
    ],
  },
  content: {
    score: 75,
    tips: [
      {
        type: "improve",
        tip: "AI analysis couldn't be parsed properly",
        explanation: "",
      },
    ],
  },
  structure: {
    score: 75,
    tips: [
      {
        type: "improve",
        tip: "AI analysis couldn't be parsed properly",
        explanation: "",
      },
    ],
  },
  skills: {
    score: 75,
    tips: [
      {
        type: "improve",
        tip: "AI analysis couldn't be parsed properly",
        explanation: "",
      },
    ],
  },
});

const UploadPage = () => {
  const { t } = useTranslation("upload");
  const navigate = useNavigate();
  const { fs, ai, kv } = usePuterStore();

  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
    resumeFile: null,
  });

  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isProcessing: false,
    currentStep: "",
    progress: 0,
    error: null,
  });

  // Helper functions
  const updateAnalysisStep = (stepKey: string, progress: number) => {
    setAnalysisState((prev) => ({
      ...prev,
      currentStep: t(stepKey),
      progress,
      error: null,
    }));
  };

  const setAnalysisError = (error: string) => {
    setAnalysisState((prev) => ({
      ...prev,
      isProcessing: false,
      error,
    }));
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (file: File | null) => {
    setFormData((prev) => ({ ...prev, resumeFile: file }));
  };

  // Main analysis workflow
  const performAnalysis = async () => {
    if (!formData.resumeFile) {
      throw new Error(t("errors.uploadFailed"));
    }

    // Step 1: Upload PDF
    updateAnalysisStep(
      ANALYSIS_STEPS.UPLOADING.key,
      ANALYSIS_STEPS.UPLOADING.progress
    );
    const uploadedFile = await fs.upload([formData.resumeFile]);
    if (!uploadedFile) throw new Error(t("errors.uploadFailed"));

    // Step 2: Convert to image
    updateAnalysisStep(
      ANALYSIS_STEPS.CONVERTING.key,
      ANALYSIS_STEPS.CONVERTING.progress
    );
    const imageResult = await convertPdfToImage(formData.resumeFile);
    if (!imageResult.file || imageResult.error) {
      throw new Error(imageResult.error || t("errors.conversionFailed"));
    }

    // Step 3: Upload image
    updateAnalysisStep(
      ANALYSIS_STEPS.UPLOADING_IMAGE.key,
      ANALYSIS_STEPS.UPLOADING_IMAGE.progress
    );
    const uploadedImage = await fs.upload([imageResult.file]);
    if (!uploadedImage) throw new Error(t("errors.imageUploadFailed"));

    // Step 4: AI Analysis
    updateAnalysisStep(
      ANALYSIS_STEPS.ANALYZING.key,
      ANALYSIS_STEPS.ANALYZING.progress
    );
    const instructions = prepareInstructions({
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      AIResponseFormat,
      language: i18n.language,
    });

    // Use the feedback method which is optimized for resume analysis
    const aiResponse = await ai.feedback(uploadedImage.path, instructions);
    if (!aiResponse) throw new Error(t("errors.analysisFailed"));

    // Step 5: Parse and save
    updateAnalysisStep(
      ANALYSIS_STEPS.SAVING.key,
      ANALYSIS_STEPS.SAVING.progress
    );

    let feedbackData: Feedback;
    try {
      const content =
        typeof aiResponse.message.content === "string"
          ? aiResponse.message.content
          : aiResponse.message.content[0].text;
      feedbackData = JSON.parse(content);
    } catch {
      feedbackData = createFallbackFeedback();
    }

    // Save analysis
    const analysisId = crypto.randomUUID();
    const resumeAnalysis: Resume = {
      id: analysisId,
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      imagePath: uploadedImage.path,
      resumePath: uploadedFile.path,
      feedback: feedbackData,
    };

    await kv.set(
      `resume_analysis_${analysisId}`,
      JSON.stringify(resumeAnalysis)
    );

    // Complete
    updateAnalysisStep(
      ANALYSIS_STEPS.COMPLETE.key,
      ANALYSIS_STEPS.COMPLETE.progress
    );

    return analysisId;
  };

  const handleAnalyze = async () => {
    setAnalysisState({
      isProcessing: true,
      currentStep: t(ANALYSIS_STEPS.UPLOADING.key),
      progress: 10,
      error: null,
    });

    try {
      const analysisId = await performAnalysis();
      setTimeout(() => navigate(`/analysis/${analysisId}`), 1000);
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysisError(
        error instanceof Error ? error.message : t("errors.generalError")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.jobTitle ||
      !formData.jobDescription ||
      !formData.resumeFile
    ) {
      setAnalysisError(t("validation.fillAllFields"));
      return;
    }

    await handleAnalyze();
  };

  const isFormValid =
    formData.companyName &&
    formData.jobTitle &&
    formData.jobDescription &&
    formData.resumeFile;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src="/images/bg-main.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="relative z-10 container-app py-12">
          <div className="max-w-4xl mx-auto">
            {/* Processing State - Show GIF and hide form */}
            {analysisState.isProcessing ? (
              <div className="text-center space-y-6">
                <div className="max-w-md mx-auto flex flex-col items-center">
                  <img
                    src="/images/resume-scan.gif"
                    alt="Analyzing resume"
                    className="w-64 h-auto rounded-lg shadow-lg"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    {t("analysis.processing.title", "Analyzing Your Resume")}
                  </h2>

                  <div className="space-y-2">
                    <div className="w-full max-w-md mx-auto bg-muted rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${analysisState.progress}%` }}
                      />
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {analysisState.currentStep}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {analysisState.progress}% Complete
                    </p>
                  </div>
                </div>

                {/* Error Display during processing */}
                {analysisState.error && (
                  <div className="max-w-md mx-auto p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive">
                      {analysisState.error}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Normal Form State */
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Job Details */}
                  <div className="space-y-6">
                    <Card className="card-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="heading text-foreground">
                            {t("jobDetails.title")}
                          </h2>
                          <p className="caption">{t("jobDetails.subtitle")}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="companyName"
                            className="flex items-center gap-2"
                          >
                            <Building2 className="w-4 h-4" />
                            {t("jobDetails.companyName.label")}
                          </Label>
                          <Input
                            id="companyName"
                            type="text"
                            placeholder={t(
                              "jobDetails.companyName.placeholder"
                            )}
                            value={formData.companyName}
                            onChange={(e) =>
                              handleInputChange("companyName", e.target.value)
                            }
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="jobTitle"
                            className="flex items-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            {t("jobDetails.jobTitle.label")}
                          </Label>
                          <Input
                            id="jobTitle"
                            type="text"
                            placeholder={t("jobDetails.jobTitle.placeholder")}
                            value={formData.jobTitle}
                            onChange={(e) =>
                              handleInputChange("jobTitle", e.target.value)
                            }
                            className="h-11"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="jobDescription">
                            {t("jobDetails.jobDescription.label")}
                          </Label>
                          <Textarea
                            id="jobDescription"
                            placeholder={t(
                              "jobDetails.jobDescription.placeholder"
                            )}
                            value={formData.jobDescription}
                            onChange={(e) =>
                              handleInputChange(
                                "jobDescription",
                                e.target.value
                              )
                            }
                            className="min-h-[200px] resize-y"
                          />
                          <p className="caption">
                            {t("jobDetails.jobDescription.hint")}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Right Column - Resume Upload */}
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
                          <p className="caption">
                            {t("resumeUpload.subtitle")}
                          </p>
                        </div>
                      </div>

                      <ResumeUpload onFileSelect={handleFileSelect} />
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
                    {analysisState.error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                        <p className="text-sm text-destructive">
                          {analysisState.error}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default UploadPage;
