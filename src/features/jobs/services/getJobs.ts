import { Job } from "../types/job";

export async function getJobs(): Promise<Job[]> {
  const response = await fetch(
    "https://remotive.com/api/remote-jobs?search=frontend"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }

  const data = await response.json();

  return data.jobs;
}