"use client";

import { useState } from "react";
import { JobCard } from "./JobCard";
import { useJobs } from "../hooks/useJobs";
import { JobCardSkeleton } from "./JobCardSkeleton";

export default function JobsClient() {
  const { data: jobs, isLoading, isError } = useJobs();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) return <p>There was an error loading jobs</p>;

  const filteredJobs = (jobs ?? []).filter((job: any) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || job.category === category;

    const matchesType = type === "all" || job.job_type === type;

    return matchesSearch && matchesCategory && matchesType;
  });
  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded mr-4"
      >
        <option value="all">All categories</option>
        <option value="Software Development">Software Dev</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All types</option>
        <option value="full_time">Full time</option>
        <option value="contract">Contract</option>
        <option value="part_time">Part time</option>
      </select>

      <div className="grid gap-4">
        {filteredJobs.map((job: any) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
