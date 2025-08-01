import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import ScoreCircle from "@/components/ScoreCircle";

interface ResumeCardProps {
  resume: Resume;
  className?: string;
}

export function ResumeCard({ resume, className = "" }: ResumeCardProps) {
  const getIssuesCount = (feedback: Feedback) => {
    const categories = [
      "ATS",
      "toneAndStyle",
      "content",
      "structure",
      "skills",
    ] as const;
    return categories.reduce((total, category) => {
      if (feedback[category]?.tips) {
        return (
          total +
          feedback[category].tips.filter((tip) => tip.type === "improve").length
        );
      }
      return total;
    }, 0);
  };

  return (
    <>
      <div className={`relative block group ${className}`}>
        <Link to={`/analysis/${resume.id}`} className="block">
          <Card className="card-interactive flex flex-col h-[460px] w-full lg:w-[350px] xl:w-[390px] bg-white rounded-md p-4 overflow-hidden">
            <CardContent className="p-6">
              {/* Header Section */}
              <div className="flex justify-between items-start gap-4 mb-4">
                {/* Company & Job Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="heading text-xl sm:text-2xl mb-2">
                    {resume.companyName || "Resume Analysis"}
                  </h3>
                  <p className="body-text-lg line-clamp-2">
                    {resume.jobTitle || "Position Analysis"}
                  </p>
                </div>

                {/* Circular Progress Score */}
                <div className="flex-shrink-0">
                  <ScoreCircle
                    score={resume.feedback.overallScore}
                    issues={getIssuesCount(resume.feedback)}
                    size="xl"
                    showIssues={true}
                  />
                </div>
              </div>

              {/* Resume Preview Section */}
              <div className="aspect-square p-3 bg-gradient-to-b from-primary/5 to-primary/15 rounded-md shadow-inner backdrop-blur-sm flex flex-col justify-center items-center ">
                {resume.imageUrl ? (
                  <img
                    className="w-full h-full max-sm:h-[200px] object-cover object-top rounded-md"
                    src={resume.imageUrl}
                    alt="Resume preview"
                  />
                ) : (
                  <div className="w-full h-full rounded-md bg-muted/50 flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="w-16 h-16 mb-3" />
                    <span className="body-text font-medium">
                      Resume Preview
                    </span>
                    <span className="caption">No preview available</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
}
