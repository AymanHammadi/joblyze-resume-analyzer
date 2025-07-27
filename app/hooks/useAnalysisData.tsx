import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { usePuterStore } from "@/lib/puter";

interface AnalysisPageState {
  isLoading: boolean;
  error: string | null;
  analysisData: Resume | null;
}

export const useAnalysisData = (id: string | undefined) => {
  const { t } = useTranslation("analysis");
  const navigate = useNavigate();
  const { kv, fs, auth, isLoading: puterLoading } = usePuterStore();

  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [state, setState] = useState<AnalysisPageState>({
    isLoading: true,
    error: null,
    analysisData: null,
  });

  // Check authentication first
  useEffect(() => {
    if (!puterLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/analysis/${id}`);
    }
  }, [puterLoading, auth.isAuthenticated, navigate, id]);

  useEffect(() => {
    const loadResume = async () => {
      if (!id) {
        setState({
          isLoading: false,
          error: t("errors.noId"),
          analysisData: null,
        });
        return;
      }

      if (!kv || !fs) {
        return;
      }

      const resume = await kv.get(`resume_analysis_${id}`);

      if (!resume) {
        setState({
          isLoading: false,
          error: t("errors.notFound"),
          analysisData: null,
        });
        return;
      }

      const data = JSON.parse(resume);

      // Load resume PDF
      const resumeBlob = await fs.read(data.resumePath);
      if (resumeBlob) {
        const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(resumeUrl);
      }

      // Load resume image
      const imageBlob = await fs.read(data.imagePath);
      if (imageBlob) {
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);
      }

      // Set feedback and state
      setFeedback(data.feedback);
      setState({
        isLoading: false,
        error: null,
        analysisData: data,
      });
    };

    // Only run when Puter services are available
    if (kv && fs && !puterLoading) {
      loadResume();
    }

    // Cleanup function to revoke blob URLs
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      if (resumeUrl) {
        URL.revokeObjectURL(resumeUrl);
      }
    };
  }, [id, kv, fs, t, puterLoading]);

  return {
    state,
    feedback,
    imageUrl,
    resumeUrl,
  };
};
