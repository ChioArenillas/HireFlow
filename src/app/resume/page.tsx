
import { Suspense } from "react";
import ResumeContent from "../../features/resume/components/ResumeContent"

export default function ResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeContent />
    </Suspense>
  );
}
