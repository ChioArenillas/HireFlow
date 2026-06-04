import { DashboardLayout } from "@/components/layout/Layout";
import SavedJobs from "@/features/jobs/components/SavedJobs";

export default async function JobsPage() {

    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">
            Saved Jobs
          </h1>

            <SavedJobs />
        </div>
      </DashboardLayout>
    );
  
}