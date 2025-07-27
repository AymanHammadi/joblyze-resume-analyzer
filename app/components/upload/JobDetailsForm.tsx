import React from "react";
import { useTranslation } from "react-i18next";
import { Building2, Briefcase, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface JobDetailsFormProps {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  onInputChange: (
    field: "companyName" | "jobTitle" | "jobDescription",
    value: string
  ) => void;
}

export const JobDetailsForm = ({
  companyName,
  jobTitle,
  jobDescription,
  onInputChange,
}: JobDetailsFormProps) => {
  const { t } = useTranslation("upload");

  return (
    <Card className="card-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="heading text-foreground">{t("jobDetails.title")}</h2>
          <p className="caption">{t("jobDetails.subtitle")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            {t("jobDetails.companyName.label")}
          </Label>
          <Input
            id="companyName"
            type="text"
            placeholder={t("jobDetails.companyName.placeholder")}
            value={companyName}
            onChange={(e) => onInputChange("companyName", e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {t("jobDetails.jobTitle.label")}
          </Label>
          <Input
            id="jobTitle"
            type="text"
            placeholder={t("jobDetails.jobTitle.placeholder")}
            value={jobTitle}
            onChange={(e) => onInputChange("jobTitle", e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobDescription">
            {t("jobDetails.jobDescription.label")}
          </Label>
          <Textarea
            id="jobDescription"
            placeholder={t("jobDetails.jobDescription.placeholder")}
            value={jobDescription}
            onChange={(e) => onInputChange("jobDescription", e.target.value)}
            className="min-h-[200px] resize-y"
          />
          <p className="caption">{t("jobDetails.jobDescription.hint")}</p>
        </div>
      </div>
    </Card>
  );
};
