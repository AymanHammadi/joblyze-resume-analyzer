import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface ResumeUploadProps {
  onFileSelect: (file: File | null) => void;
  className?: string;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  onFileSelect,
  className,
}) => {
  const { t } = useTranslation("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(t("resumeUpload.errors.fileTooBig"));
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError(t("resumeUpload.errors.invalidType"));
        } else {
          setError(t("resumeUpload.errors.invalidFile"));
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
    onFileSelect(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
            "hover:border-primary/50 hover:bg-accent/5",
            isDragActive
              ? "border-primary bg-primary/5 scale-[1.02]"
              : "border-border bg-background",
            error && "border-destructive bg-destructive/5"
          )}
        >
          <input {...getInputProps()} />

          {/* Background decoration */}
          <div className="absolute inset-0 rounded-lg opacity-5">
            <img
              src="/images/pdf.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {isDragActive
                  ? t("resumeUpload.dropzone.titleActive")
                  : t("resumeUpload.dropzone.title")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("resumeUpload.dropzone.description")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("resumeUpload.dropzone.fileTypes")}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium">
              <Upload className="w-4 h-4" />
              {t("resumeUpload.dropzone.chooseFile")}
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)} •{" "}
                {t("resumeUpload.fileInfo.pdf")}
              </p>
            </div>

            <button
              onClick={removeFile}
              className="w-8 h-8 rounded-md hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};
