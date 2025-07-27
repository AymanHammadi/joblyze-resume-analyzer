import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { ResumeCard } from "./ResumeCard";
import { FileText } from "lucide-react";
import { resumes } from "../../constants/index";

export function RecentAnalyses() {
  const { t } = useTranslation("recentAnalyses");

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
      <div className="container-content">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <h2 className="heading-lg">{t("title")}</h2>
            <p className="body-text text-muted-foreground">{t("subtitle")}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["all", "recent", "highScore", "needsWork"].map((filter) => (
              <Button
                key={filter}
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                className="text-sm"
              >
                {t(`filters.${filter}`)}
              </Button>
            ))}
          </div>

          {/* Analyses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-8">
            <Button variant="outline" size="lg" className="btn-outline">
              Load More Analyses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
