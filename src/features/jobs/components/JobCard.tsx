"use client";
import { useSavedJobs } from "@/store/useSavedJobs";
import { Job } from "../types/job";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  job: Job;
}

export function JobCard({ job }: Props) {
  const { addJob, removeJob, isSaved } = useSavedJobs();
  const saved = isSaved(job.id);
  return (
    <Card>
      <CardContent className="flex gap-6 items-center p-4">
        <img
          src={job.company_logo || "/placeholder.png"}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h2 className="text-lg font-semibold">{job.title}</h2>

          <p className="text-muted-foreground">{job.company_name}</p>

          <p className="text-sm">{job.candidate_required_location}</p>

          <a href={job.url} className="text-blue-500 text-sm" target="_blank">
            View job
          </a>
        </div>
        <button
          onClick={() => (saved ? removeJob(job.id) : addJob(job))}
          className="mt-3 text-sm border px-3 py-1 rounded"
        >
          {saved ? "Remove saved" : "Save job"}
        </button>
      </CardContent>
    </Card>
  );
}
