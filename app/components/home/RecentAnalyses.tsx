import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ResumeCard } from "./ResumeCard";
import { Spinner } from "@/components/ui/spinner";
import { FileText, RefreshCw } from "lucide-react";
import { useResumesList } from "@/hooks/useResumesList";
import { usePuterStore } from "@/lib/puter";

export function RecentAnalyses() {
  const { t } = useTranslation("recentAnalyses");
  const { auth } = usePuterStore();
  const { resumes, isLoading, error, refetch } = useResumesList();

  // Only show Recent Analyses for authenticated users
  if (!auth.isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="section-lg">
        <div className="container-content">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="heading-lg">{t("title")}</h2>
              <p className="body-text text-muted-foreground">{t("subtitle")}</p>
            </div>
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-lg">
        <div className="container-content">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="heading-lg">{t("title")}</h2>
              <p className="body-text text-destructive">{error}</p>
            </div>
            <Button onClick={refetch} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (resumes.length === 0) {
    return (
      <section className="section-lg">
        <div className="container-content">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="heading-lg">{t("emptyState.title")}</h2>
              <p className="body-text text-muted-foreground max-w-md mx-auto">
                {t("emptyState.description")}
              </p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <FileText className="w-5 h-5 mr-2" />
              {t("emptyState.cta")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-lg ">
      <div className="container-app">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <h2 className="heading-lg">{t("title")}</h2>
          </div>
          {/* Analyses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
