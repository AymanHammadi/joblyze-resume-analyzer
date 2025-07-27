import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, FileText } from "lucide-react";
import { usePuterStore } from "@/lib/puter";
import { Link } from "react-router";

export function HeroSection() {
  const { t } = useTranslation("hero");
  const { auth } = usePuterStore();

  // Make hero section bigger for non-authenticated users
  const sectionClass = auth.isAuthenticated
    ? "section-xl"
    : "section-xl py-24 lg:py-40";

  return (
    <section className={sectionClass}>
      <div className="container-content">
        <div className="text-center space-y-10">
          {/* Main Headlines */}
          <div className="space-y-6">
            <h1 className="heading-xl max-w-4xl mx-auto">{t("title")}</h1>

            <p className="subheading max-w-2xl mx-auto text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="btn-primary text-lg px-8 py-4" asChild>
              <Link to="/upload">
                <Upload className="w-5 h-5 mr-2" />
                {t("cta.upload")}
              </Link>
            </Button>
          </div>

          {/* Features for non-authenticated users */}
          {!auth.isAuthenticated && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Upload Resume</h3>
                <p className="text-sm text-muted-foreground">
                  Simply upload your resume in PDF format and let our AI analyze
                  it
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed feedback on ATS compatibility, content, and
                  structure
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Improve Score</h3>
                <p className="text-sm text-muted-foreground">
                  Receive actionable tips to improve your resume score
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
