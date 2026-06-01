import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Job } from "@/features/jobs/types/job"

interface SavedJobsStore {
    savedJobs: Job[]
    addJob: (job: Job) => void
    removeJob: (id: number) => void
    isSaved: (id: number) => boolean
}

export const useSavedJobs = create<SavedJobsStore>()(
    persist(
        (set, get) => ({
            savedJobs: [],

            addJob: (job) =>
                set((state) => ({
                    savedJobs: [...state.savedJobs, job]
                })),
            
            removeJob: (id) =>
                set((state) => ({
                    savedJobs: state.savedJobs.filter(
                        (job) => job.id !== id
                    )
                })),
            
                isSaved: (id) =>
                    get().savedJobs.some((job) => job.id === id)

        }),
        {name: "saved-jobs"},
    )
)