"use client";
import { useSavedJobs } from "@/store/useSavedJobs";
import { Job } from "../types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";

interface Props {
  job: Job;
}

export function JobCard({ job }: Props) {
  const addJob = useSavedJobs((state) => state.addJob);
  const removeJob = useSavedJobs((state) => state.removeJob);
  const savedJobs = useSavedJobs((state) => state.savedJobs);

  const saved = savedJobs.some((j) => j.id === job.id);
  return (
    <Card className="relative">
      <CardContent className="flex gap-6 items-center p-4">
        <img
          src={job.company_logo || "/placeholder.png"}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h2 className="text-lg font-semibold">{job.title}</h2>

          <p className="text-muted-foreground">{job.company_name}</p>

          <p className="text-sm">{job.candidate_required_location}</p>

        <div className="flex gap-3 pt-4">
          <Link href={`/jobs/${job.id}`}             
          className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-black/80 transition"
>
            View Details
          </Link>

          <Link
            href={`/resume?jobId=${job.id}`}
            className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted transition"
          >
            Analyze this job
          </Link>
          </div>
        </div>
        <button
          onClick={() => {
            if (saved) {
              removeJob(job.id);
            } else {
              addJob(job);
            }
          }}
          className="absolute top-3 right-3 p-2 rounded-full transition hover:bg-muted cursor-pointer hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition ${
              saved ? "fill-black text-black" : "text-muted-foreground"
            }`}
          />
        </button>
      </CardContent>
    </Card>
  );
}
