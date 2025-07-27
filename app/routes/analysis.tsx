import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";
import { usePuterStore } from "@/lib/puter";

interface AnalysisPageState {
  isLoading: boolean;
  error: string | null;
  analysisData: Resume | null;
}

const AnalysisPage = () => {
  const { t } = useTranslation("analysis");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { kv } = usePuterStore();

  const [state, setState] = useState<AnalysisPageState>({
    isLoading: true,
    error: null,
    analysisData: null,
  });

  const loadAnalysis = async () => {
    if (!id) {
      setState({
        isLoading: false,
        error: t("errors.noId"),
        analysisData: null,
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await kv.get(`resume_analysis_${id}`);

      if (!result) {
        setState({
          isLoading: false,
          error: t("errors.notFound"),
          analysisData: null,
        });
        return;
      }

      const analysisData: Resume = JSON.parse(result);
      setState({
        isLoading: false,
        error: null,
        analysisData,
      });
    } catch (error) {
      console.error("Error loading analysis:", error);
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : t("errors.loadFailed"),
        analysisData: null,
      });
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, [id]);

  const handleGoBack = () => {
    navigate("/upload");
  };

  const handleRefresh = () => {
    loadAnalysis();
  };

  if (state.isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container-app py-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t("loading.text")}</p>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (state.error) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container-app py-12">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h2 className="text-xl font-semibold text-destructive mb-2">
                  {t("errors.title")}
                </h2>
                <p className="text-destructive/80">{state.error}</p>
              </div>
              <div className="space-x-4">
                <Button onClick={handleGoBack} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("actions.backToUpload")}
                </Button>
                <Button onClick={handleRefresh}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t("errors.tryAgain")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

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
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button onClick={handleGoBack} variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("actions.backToUpload")}
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    {t("title")}
                  </h1>
                  <p className="text-muted-foreground">
                    {t("subtitle")}: {id}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t("actions.refresh")}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {t("actions.downloadReport")}
                </Button>
              </div>
            </div>

            {/* Analysis Info */}
            {state.analysisData && (
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {t("jobInfo.title")}
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("jobInfo.company")}
                      </p>
                      <p className="font-medium">
                        {state.analysisData.companyName ||
                          t("jobInfo.notSpecified")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("jobInfo.position")}
                      </p>
                      <p className="font-medium">
                        {state.analysisData.jobTitle ||
                          t("jobInfo.notSpecified")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("jobInfo.overallScore")}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {state.analysisData.feedback.overallScore}/100
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="lg:col-span-2 p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {t("resumePreview.title")}
                  </h3>
                  {state.analysisData.imagePath ? (
                    <div className="aspect-[3/4] max-w-md mx-auto bg-muted rounded-lg overflow-hidden">
                      <img
                        src={state.analysisData.imagePath}
                        alt="Resume preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] max-w-md mx-auto bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        {t("resumePreview.noPreview")}
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* Raw JSON Data - Temporary for development */}
            {state.analysisData && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {t("rawData.title")}
                </h3>
                <div className="bg-muted rounded-lg p-4 overflow-auto max-h-96">
                  <pre className="text-sm text-foreground whitespace-pre-wrap">
                    {JSON.stringify(state.analysisData, null, 2)}
                  </pre>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AnalysisPage;
