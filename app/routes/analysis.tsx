import { useParams, useNavigate } from "react-router";
import { useAnalysisData } from "@/hooks/useAnalysisData";
import {
  LoadingState,
  ErrorState,
  NoDataState,
  AnalysisPageHeader,
  AnalysisContent,
  AnalysisLayout,
} from "@/components/analysis";

export const meta = () => [
  { title: "Joblyz | Resume Analysis" },
  { name: "description", content: "Detailed overview of your resume" },
];

const AnalysisPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, feedback, imageUrl, resumeUrl } = useAnalysisData(id);

  const handleGoBack = () => {
    navigate("/");
  };

  // Loading state
  if (state.isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (state.error) {
    return <ErrorState error={state.error} onGoBack={handleGoBack} />;
  }

  // Main content
  return (
    <AnalysisLayout>
      <AnalysisPageHeader onGoBack={handleGoBack} />

      {state.analysisData && feedback ? (
        <AnalysisContent
          analysisData={state.analysisData}
          feedback={feedback}
          imageUrl={imageUrl}
          resumeUrl={resumeUrl}
        />
      ) : (
        <NoDataState />
      )}
    </AnalysisLayout>
  );
};

export default AnalysisPage;
