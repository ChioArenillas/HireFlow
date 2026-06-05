import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Analysis {
  score: number;
  missingSkills: string[];
  feedback: string;
}

interface AnalysisStore {
  analyses: Record<string, Analysis>;
  setAnalysis: (jobId: string, data: Analysis) => void;
  getAnalysis: (jobId: string) => Analysis | null;
}

export const useAnalysisStore = create<AnalysisStore>()(
  persist(
    (set, get) => ({
      analyses: {},

      setAnalysis: (jobId, data) =>
        set((state) => ({
          analyses: {
            ...state.analyses,
            [jobId]: data,
          },
        })),

      getAnalysis: (jobId) => {
        return get().analyses[jobId] || null;
      },
    }),
    {
      name: "job-analysis",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);