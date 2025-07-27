import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumePreviewProps {
  imagePath?: string;
  resumePath?: string;
  onImageClick?: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  imagePath,
  resumePath,
  onImageClick,
}) => {
  const { t } = useTranslation("analysis");
  const [imageError, setImageError] = React.useState(false);

  // Debug logging
  React.useEffect(() => {
    console.log("🖼️ ResumePreview props:", {
      hasImagePath: !!imagePath,
      hasResumePath: !!resumePath,
      imagePath: imagePath
        ? imagePath.length > 50
          ? imagePath.substring(0, 50) + "..."
          : imagePath
        : "none",
      resumePath: resumePath
        ? resumePath.length > 50
          ? resumePath.substring(0, 50) + "..."
          : resumePath
        : "none",
    });
    setImageError(false); // Reset error state when props change
  }, [imagePath, resumePath]);

  const handleDownload = () => {
    if (resumePath) {
      // Create a temporary link to download the file
      const link = document.createElement("a");
      link.href = resumePath;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick();
    } else if (resumePath) {
      // Fallback: open PDF in new tab
      window.open(resumePath, "_blank");
    }
  };

  const handleOpenPDF = () => {
    if (resumePath) {
      window.open(resumePath, "_blank");
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            {t("resumePreview.title")}
          </h3>
        </div>
        {resumePath && (
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            {t("resumePreview.download")}
          </Button>
        )}
      </div>

      <div className="flex justify-center">
        {imagePath && !imageError ? (
          <div className="relative max-w-md w-full">
            <div
              className="aspect-[3/4] bg-white rounded-lg shadow-lg overflow-hidden border border-border/50 cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
              onClick={handleImageClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleImageClick();
                }
              }}
            >
              <img
                src={imagePath}
                alt="Resume preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-lg pointer-events-none" />
              <div className="absolute bottom-2 right-2 bg-black/20 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200">
                {t("resumePreview.clickToOpen", "Click to open full view")}
              </div>
            </div>
          </div>
        ) : resumePath ? (
          // Show PDF option when image is not available but PDF exists
          <div
            className="aspect-[3/4] max-w-md w-full bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex flex-col items-center justify-center text-center p-8 border border-primary/20 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/30"
            onClick={handleOpenPDF}
          >
            <FileText className="w-16 h-16 text-primary mb-4" />
            <p className="text-foreground font-medium mb-2">
              {t("resumePreview.pdfAvailable", "PDF Resume Available")}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {t(
                "resumePreview.clickToOpenPdf",
                "Click to open PDF in new tab"
              )}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                {t("resumePreview.download")}
              </Button>
            </div>
          </div>
        ) : (
          // No image and no PDF available
          <div className="aspect-[3/4] max-w-md w-full bg-muted rounded-lg flex flex-col items-center justify-center text-center p-8 border border-dashed border-border">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm">
              {t("resumePreview.noPreview")}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              {t("resumePreview.noPreviewDescription")}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
