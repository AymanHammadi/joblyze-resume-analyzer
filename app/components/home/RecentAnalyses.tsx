import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ResumeCard } from "./ResumeCard";
import { Spinner } from "@/components/ui/spinner";
import { RefreshCw, Trash2 } from "lucide-react";
import { useResumesList } from "@/hooks/useResumesList";
import { usePuterStore } from "@/lib/puter";
import { useState } from "react";
import { DeleteConfirmation } from "@/components/ui/delete-confirmation";
import { toast } from "sonner";

export function RecentAnalyses() {
  const { t } = useTranslation("recentAnalyses");
  const { auth, fs, kv } = usePuterStore();
  const { resumes, isLoading, error, refetch } = useResumesList();
  const [showClearAllConfirmation, setShowClearAllConfirmation] =
    useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearAll = async () => {
    setIsClearing(true);
    try {
      // Delete all files from the file system
      const files = (await fs.readDir("./")) as FSItem[];
      for (const file of files) {
        await fs.delete(file.path);
      }

      // Clear all key-value data
      await kv.flush();

      setShowClearAllConfirmation(false);
      toast.success("All resume analyses deleted successfully");
      refetch(); // Refresh the list
    } catch (error) {
      console.error("Failed to clear all data:", error);
      toast.error("Failed to clear all data. Please try again.");
    } finally {
      setIsClearing(false);
    }
  };

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
      <section className="section-lg border-t">
        <div className="container-content">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="heading-lg">{t("emptyState.title")}</h2>
              <p className="body-text text-muted-foreground max-w-md mx-auto">
                {t("emptyState.description")}
              </p>
            </div>
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
            <div className="flex items-center justify-center gap-4">
              <h2 className="heading-lg">{t("title")}</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refetch}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowClearAllConfirmation(true)}
                  className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </Button>
              </div>
            </div>
          </div>
          {/* Analyses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        </div>
      </div>

      {/* Clear All Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={showClearAllConfirmation}
        onClose={() => setShowClearAllConfirmation(false)}
        onConfirm={handleClearAll}
        isDeleting={isClearing}
        title="Clear All Resume Analyses"
        description="Are you sure you want to delete ALL resume analyses? This action cannot be undone and will remove all your data permanently."
        confirmText="Clear All"
      />
    </section>
  );
}
