import { DashboardLayout } from "@/components/layout/Layout";
import  JobsClient  from "@/features/jobs/components/JobsClient"

export const dynamic = "force-dynamic";

export default async function JobsPage() {

    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

            <JobsClient />
        </div>
      </DashboardLayout>
    );
  
}