import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobCard } from "@/features/jobs/components/JobCard";
import { getJobs } from "@/features/jobs/services/getJobs";

export default async function JobsPage() {
  try {
    const jobs = await getJobs();

    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

          <div className="grid gap-4">
            {jobs.slice(0, 10).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  } catch {
    return (
      <DashboardLayout>
        <p>Failed to load jobs.</p>
      </DashboardLayout>
    );
  }
}