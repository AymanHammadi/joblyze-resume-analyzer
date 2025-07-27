import { useState, useEffect } from "react";
import { usePuterStore } from "@/lib/puter";

interface ResumeListState {
  resumes: Resume[];
  isLoading: boolean;
  error: string | null;
}

export const useResumesList = () => {
  const { kv, fs, auth, isLoading: puterLoading } = usePuterStore();
  const [state, setState] = useState<ResumeListState>({
    resumes: [],
    isLoading: true,
    error: null,
  });

  const loadResumes = async () => {
    if (!kv || !fs) {
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Get all resume analysis keys
      const keys = await kv.list("resume_analysis_*", false);

      if (!keys || keys.length === 0) {
        setState({
          resumes: [],
          isLoading: false,
          error: null,
        });
        return;
      }

      // Fetch all resumes
      const resumePromises = keys.map(async (key) => {
        const keyString = typeof key === "string" ? key : key.key;
        const resumeData = await kv.get(keyString);
        if (resumeData) {
          const resume: Resume = JSON.parse(resumeData);

          // Load the image for each resume
          try {
            const imageBlob = await fs.read(resume.imagePath);
            if (imageBlob) {
              const imageUrl = URL.createObjectURL(imageBlob);
              return { ...resume, imageUrl };
            }
          } catch (error) {
            console.warn(
              `Failed to load image for resume ${resume.id}:`,
              error
            );
          }

          return resume;
        }
        return null;
      });

      const resumes = (await Promise.all(resumePromises))
        .filter((resume): resume is Resume => resume !== null)
        .sort((a, b) => {
          // Sort by creation date if available, otherwise by ID (newest first)
          const aTime = a.createdAt || a.id;
          const bTime = b.createdAt || b.id;
          return bTime.localeCompare(aTime);
        });

      setState({
        resumes,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error loading resumes:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to load resumes",
      }));
    }
  };

  useEffect(() => {
    if (!puterLoading && auth.isAuthenticated && kv && fs) {
      loadResumes();
    }
  }, [puterLoading, auth.isAuthenticated, kv, fs]);

  const refetch = () => {
    if (!puterLoading && auth.isAuthenticated) {
      loadResumes();
    }
  };

  return {
    ...state,
    refetch,
  };
};
