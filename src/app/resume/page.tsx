"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useJobs } from "@/features/jobs/hooks/useJobs";

export default function ResumePage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data: jobs } = useJobs();
  const job = jobs?.find((j) => String(j.id) === jobId);

  const [cv, setCv] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl font-bold">Resume Analyzer</h1>

        {job ? (
          <p className=" text-muted-foreground">
            Analyzing: <span className="text-foreground">{job.title}</span>
          </p>
        ) : (
          <p className=" text-muted-foreground">Select a job to analyze</p>
        )}

        <textarea
          value={cv}
          onChange={(e) => setCv(e.target.value)}
          placeholder="Paste your CV here..."
          className="w-full h-60 border rounded p-3"
        />

        <button className="px-4 py-2 border rounded hover:bg-muted">
          Analyze CV
        </button>
      </div>
    </DashboardLayout>
  );
}
