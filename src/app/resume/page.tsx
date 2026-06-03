"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useJobs } from "@/features/jobs/hooks/useJobs";
import { useAnalysisStore } from "@/store/useAnalysis";

export default function ResumePage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data: jobs } = useJobs();
  const job = jobs?.find((j) => String(j.id) === jobId);
  const [cv, setCv] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const { setAnalysis, getAnalysis} = useAnalysisStore()
  const savedAnalysis = jobId ? getAnalysis(jobId) : null
  const analysisToShow = showResult ? getAnalysis(jobId!) : savedAnalysis;

  async function handleAnalyze() {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cv,
          jobDescription: job?.description,
        }),
      });
      const result = await response.json();
      if(jobId){
      setAnalysis(jobId, result)
      }
      setShowResult(true)
    } finally {
      setIsAnalyzing(false)
    }
  }
  const scoreColor = analysisToShow
    ? analysisToShow.score >= 80
      ? "bg-green-700"
      : analysisToShow.score >= 50
        ? "bg-yellow-500"
        : "bg-red-700"
    : "bg-gray-300";

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-2xl font-bold">Resume Analyzer</h1>

        {job ? (
          <p className=" text-muted-foreground">
            Analyzing:{" "}
            <span className="text-lg font-bold text-foreground">
              {job.title}
            </span>
          </p>
        ) : (
          <p className=" text-muted-foreground">Select a job to analyze</p>
        )}

        <textarea
          value={cv}
          onChange={(e) => {
            setCv(e.target.value)
            setShowResult(false)}}
          placeholder="Paste your CV here..."
          className="w-full h-60 border rounded p-3"
        />

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="px-4 py-2 border rounded hover:bg-muted transition disabled:opacity-50"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze CV"}
        </button>
        {analysisToShow && (
          <div className="rounded-lg border p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold">
                Match Score: {analysisToShow.score}%
              </h2>
            </div>

            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${scoreColor} transition-all`}
                style={{ width: `${analysisToShow.score}%` }}
              />
            </div>

            <div>
              <h3 className="font-medium  font-semibold">Missing Skills: </h3>

              <ul className="list-disc pl-5">
                {analysisToShow.missingSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium font-semibold">Feedback: </h3>

              <p>{analysisToShow.feedback}</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
