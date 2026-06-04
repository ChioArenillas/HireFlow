"use client";

import { useQuery } from "@tanstack/react-query";
import { Job } from "../types/job";

async function fetchJobs(): Promise<Job[]> {
  const res = await fetch("/api/jobs");
  if (!res.ok) throw new Error("Error fetching jobs");
  return res.json();
}

export function useJobs() {
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
}