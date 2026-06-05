import { DashboardLayout } from "@/components/layout/Layout";
import JobsClient from "@/features/jobs/components/JobsClient";
import { Suspense } from "react";

export default async function JobsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <Suspense fallback={<div>Loading jobs...</div>}>
          <JobsClient />
        </Suspense>{" "}
      </div>
    </DashboardLayout>
  );
}
