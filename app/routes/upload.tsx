import React from "react";
import { useUploadForm } from "@/hooks/useUploadForm";
import {
  ProcessingState,
  UploadForm,
  UploadLayout,
} from "@/components/upload";
import i18n from "@/i18n";
import type { Route } from "./+types/upload";

export function meta({}: Route.MetaArgs) {
  // Get translations for meta tags
  const title = i18n.t("app.title");
  const description = i18n.t("app.description");

  return [{ title }, { name: "description", content: description }];
}

const UploadPage = () => {
  const {
    formData,
    analysisState,
    isFormValid,
    handleInputChange,
    handleFileSelect,
    handleSubmit,
  } = useUploadForm();

  return (
    <UploadLayout>
      {/* Processing State - Show GIF and hide form */}
      {analysisState.isProcessing ? (
        <ProcessingState
          currentStep={analysisState.currentStep}
          progress={analysisState.progress}
          error={analysisState.error}
        />
      ) : (
        /* Normal Form State */
        <UploadForm
          formData={formData}
          isFormValid={isFormValid}
          error={analysisState.error}
          onInputChange={handleInputChange}
          onFileSelect={handleFileSelect}
          onSubmit={handleSubmit}
        />
      )}
    </UploadLayout>
  );
};

export default UploadPage;
