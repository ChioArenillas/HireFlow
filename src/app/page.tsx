"use client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SimpleBarChart } from "@/features/dashboard/components/SimpleBarChart";
import StatsCard from "@/features/dashboard/components/StatsCard";
import { useSavedJobs } from "@/store/useSavedJobs";

export default function HomePage() {
  const savedJobs = useSavedJobs((state) => state.savedJobs)
  const totalSaved = savedJobs.length;
  const companies = new Set(savedJobs.map((job) => job.company_name)).size
  const categories = new Set(savedJobs.map((job) => job.category)).size
  const locations = new Set(savedJobs.map((job) => job.candidate_required_location)).size

  const categoryCount = savedJobs.reduce((acc, job) => {
    const category = job.category ?? "Unknown"
    acc[category] = (acc[category] || 0) +1
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(categoryCount).map(
    ([name, value]) => ({
      name,
      value,
    })
  )
  if (!savedJobs.length) {
    return (
      <DashboardLayout>
        <div className="rounded-lg border p-8 text-center">
          <h2 className="font-semibold">No data yet</h2>
          <p className="text-muted-foreground">
            Save jobs to see your dashboard metrics
          </p>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Saved Jobs" value={totalSaved} />
        <StatsCard title="Companies" value={companies} />
        <StatsCard title="Categories" value={categories} />
        <StatsCard title="Locations" value={locations} />
      </div>
      <div>
      <SimpleBarChart data={chartData}/>
      </div>
    </DashboardLayout>
  );
}
