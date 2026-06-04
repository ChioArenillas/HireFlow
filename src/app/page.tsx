"use client";
import { DashboardLayout } from "@/components/layout/Layout";
import { CategoryPieChart } from "@/features/dashboard/components/CategoryPieChart";
import { CompanyBarChart } from "@/features/dashboard/components/CompanyBarChart";
import { SimpleBarChart } from "@/features/dashboard/components/SimpleBarChart";
import StatsCard from "@/features/dashboard/components/StatsCard";
import { useSavedJobs } from "@/store/useSavedJobs";
import { Bookmark, Building2, Layers, MapPin } from "lucide-react";

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

  const chartData = Object.entries(categoryCount)
  .slice(0, 5)
  .map(([name, value]) => ({
      name,
      value,
    })
  )

  const companyCount = savedJobs.reduce((acc, job) => {
    const company = job.company_name ?? "Unknown"
    acc[company] = (acc[company] || 0) + 1

    return acc
  }, {} as Record<string, number>)

  const companyData = Object.entries(companyCount)
  .slice(0,5)
  .map(([name, value]) => ({
    name,
    value
  }))

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
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatsCard
    title="Saved Jobs"
    value={totalSaved}
    icon={<Bookmark size={18} />}
  />

  <StatsCard
    title="Companies"
    value={companies}
    icon={<Building2 size={18} />}
  />

  <StatsCard
    title="Categories"
    value={categories}
    icon={<Layers size={18} />}
  />

  <StatsCard
    title="Locations"
    value={locations}
    icon={<MapPin size={18} />}
  />
</div>      <SimpleBarChart data={chartData}/>
      <CategoryPieChart data={chartData}/>
      <CompanyBarChart data={companyData}/>
    </DashboardLayout>
  );
}
