"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobDescription } from "@/features/jobs/components/JobDescription";
import { useJobs } from "@/features/jobs/hooks/useJobs";
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

  const job = jobs?.find((j) => String(j.id) === id);

  if (!job) return <p>Job not found</p>;

  const jobType =
    job.job_type.charAt(0).toUpperCase() +
    job.job_type.slice(1).replace("_", " ");

  console.log(job);

  return (
    <DashboardLayout>
      <div className="space-y-4">
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
        <a href={job.url} target="_blank" className="text-blue-500">
          Apply
        </a>
      </div>
    </DashboardLayout>
  );
}
