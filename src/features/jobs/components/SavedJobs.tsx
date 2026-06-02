"use client";

import { useSavedJobs } from "@/store/useSavedJobs";
import { JobCard } from "@/features/jobs/components/JobCard";

export default function SavedJobs() {
  const savedJobs = useSavedJobs(
    (state) => state.savedJobs
  );

  if (!savedJobs.length) {
    return (
      <div className=" rounded-lg border p-8 text-center">
        <h2 className="font-semibold">
          No saved jobs yet
        </h2>

        <p className="text-muted-foreground">
          Save jobs to view them here.
        </p>
      </div>
    );
  }

  return (
    
    <div className="space-y-4">

      {savedJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}