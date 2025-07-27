import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { usePuterStore } from "@/lib/puter";
import { convertPdfToImage } from "@/lib/pdf2image";
import { prepareInstructions, AIResponseFormat } from "@/constants/index";
import i18n from "@/i18n";

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

export const useUploadForm = () => {
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
      createdAt: new Date().toISOString(),
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

  const isFormValid = !!(
    formData.companyName &&
    formData.jobTitle &&
    formData.jobDescription &&
    formData.resumeFile
  );

  return {
    formData,
    analysisState,
    isFormValid,
    handleInputChange,
    handleFileSelect,
    handleSubmit,
  };
};
