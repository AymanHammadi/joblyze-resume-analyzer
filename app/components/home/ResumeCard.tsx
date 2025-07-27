import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScoreCircle from "@/components/ScoreCircle";
import { FileText, Eye, RotateCcw, Download } from "lucide-react";

interface ResumeCardProps {
  resume: Resume;
  className?: string;
}

export function ResumeCard({ resume, className = "" }: ResumeCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getStatusBadge = (score: number) => {
    if (score >= 80)
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (score >= 60)
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  const getStatus = (score: number): string => {
    if (score >= 80) return "excellent";
    if (score >= 60) return "good";
    return "needs work";
  };

  return (
    <Link
      to={`/resume/${resume.id}`}
      className={`block card-hover group ${className}`}
    >
      <div className="space-y-4">
        {/* Thumbnail */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          {resume.imagePath ? (
            <img
              src={resume.imagePath}
              alt={`Resume for ${resume.jobTitle || "position"}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText className="w-16 h-16 text-muted-foreground/50" />
            </div>
          )}

          {/* Score Badge */}
          <div className="absolute top-3 right-3">
            <Badge className={getStatusBadge(resume.feedback.overallScore)}>
              {resume.feedback.overallScore}/100
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {resume.companyName ? `${resume.companyName} Resume` : "Resume"}
            </h3>
            {resume.jobTitle && (
              <p className="text-sm text-muted-foreground">{resume.jobTitle}</p>
            )}
          </div>

          {/* Score Display with ScoreCircle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ScoreCircle score={resume.feedback.overallScore} />
              <div>
                <div className="text-sm font-medium">Overall Score</div>
                <div
                  className={`text-sm font-bold ${getScoreColor(
                    resume.feedback.overallScore
                  )}`}
                >
                  {getStatus(resume.feedback.overallScore)}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={(e) => e.preventDefault()} // Prevent navigation for these actions
            >
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="px-2"
              onClick={(e) => e.preventDefault()}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="px-2"
              onClick={(e) => e.preventDefault()}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
