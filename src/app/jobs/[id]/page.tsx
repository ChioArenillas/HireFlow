"use client";

import { DashboardLayout } from "@/components/layout/Layout";
import { JobDescription } from "@/features/jobs/components/JobDescription";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import Link from "next/link";
import { use } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: jobs, isLoading } = useJobs();

  if (isLoading) return <p>Loading...</p>;

  if(!id) return <p>Loading job data...</p>

  const job = jobs?.find((j) => String(j.id) === id);

  if (!job) return <p>Job not found</p>;

  const jobType =
    job.job_type.charAt(0).toUpperCase() +
    job.job_type.slice(1).replace("_", " ");

  console.log(job);

  return (
    <DashboardLayout>
      <div className="space-y-4 mb-8">
        <img
          src={job.company_logo || "/placeholder.png"}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-muted-foreground">
          <strong>Company: </strong>
          {job.company_name}
        </p>
        <p>
          <strong>Location: </strong>
          {job.candidate_required_location}
        </p>
        <p>
          <strong>Category: </strong>
          {job.category}
        </p>
        <p>
          <strong>Type: </strong>
          {jobType}
        </p>
        <p>
          <strong>Salary: </strong>
          {job.salary}
        </p>
        <p>
          <strong>Description: </strong>
          <JobDescription html={job.description} />
        </p>
        <div className="flex gap-3 pt-4">
          <a
            href={job.url}
            target="_blank"
            className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-black/80 transition"
          >
            Apply
          </a>

          <Link
            href={`/resume?jobId=${job.id}`}
            className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-muted transition"
          >
            Analyze this job
          </Link>
        </div>{" "}
      </div>
    </DashboardLayout>
  );
}
