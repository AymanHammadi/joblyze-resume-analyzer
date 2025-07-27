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
    } else if (!auth.isAuthenticated) {
      setState({
        resumes: [],
        isLoading: false,
        error: null,
      });
    }
  }, [puterLoading, auth.isAuthenticated, kv, fs]);

  const refetch = () => {
    if (!puterLoading && auth.isAuthenticated) {
      loadResumes();
    }
  };

  // Function to delete a resume
  const deleteResume = async (resumeId: string) => {
    if (!kv || !fs) {
      throw new Error("Storage not available");
    }

    try {
      // Get the resume data first to access file paths
      const resumeData = await kv.get(`resume_analysis_${resumeId}`);
      if (resumeData) {
        const resume: Resume = JSON.parse(resumeData);

        // Delete the files first
        try {
          if (resume.imagePath) {
            await fs.delete(resume.imagePath);
          }
          if (resume.resumePath) {
            await fs.delete(resume.resumePath);
          }
        } catch (fileError) {
          console.warn("Error deleting files:", fileError);
          // Continue with KV deletion even if file deletion fails
        }
      }

      // Delete the resume analysis from KV store
      await kv.delete(`resume_analysis_${resumeId}`);

      // Refresh the list after deletion
      await loadResumes();

      return true;
    } catch (error) {
      console.error("Error deleting resume:", error);
      throw error;
    }
  };

  return {
    ...state,
    refetch,
    deleteResume,
  };
};
