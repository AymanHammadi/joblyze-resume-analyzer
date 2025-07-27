import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export const NoDataState = () => {
  const { t } = useTranslation("analysis");
  const navigate = useNavigate();

  return (
    <div className="text-center py-12">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <svg
            className="w-12 h-12 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 20.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
          {t("errors.noFeedback", "No Analysis Data Found")}
        </h3>
        <p className="text-red-700 dark:text-red-300 mb-4">
          {t(
            "errors.noFeedbackDesc",
            "The analysis data could not be loaded. Please try analyzing your resume again."
          )}
        </p>
        <Button
          onClick={() => navigate("/upload")}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {t("actions.backToUpload", "Back to Upload")}
        </Button>
      </div>
    </div>
  );
};
