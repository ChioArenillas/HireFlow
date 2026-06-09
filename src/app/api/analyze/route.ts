export const runtime = "nodejs"

import { NextResponse } from "next/server"

import { extractResumeText } from "@/features/resume/services/extractResumeText"
import { buildAnalysisPrompt } from "@/features/resume/services/buildAnalysisPrompt"
import { analyzeResume } from "@/features/resume/services/analyzeResume"
import { parseAnalysisResponse } from "@/features/resume/services/parseAnalysisResponse"
import { validateResumeFile } from "@/features/resume/services/validateResumeFile"

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData()

    const file =
      formData.get("file") as File

    const jobDescription =
      formData.get(
        "jobDescription"
      ) as string

    if (!file) {
      return NextResponse.json(
        { error: "No file" },
        { status: 400 }
      )
    }

    validateResumeFile(file)

    const cv =
      await extractResumeText(file)

    const prompt =
      buildAnalysisPrompt(cv, jobDescription)

console.log("CV length:", cv.length)
console.log(
  "Job description length:",
  jobDescription.length
)
console.log(
  "Prompt length:",
  prompt.length
)
    const raw =
      await analyzeResume(prompt)

    const result =
      parseAnalysisResponse(raw)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("ANALYZE ERROR:", error)

    if (
      error?.message?.includes("Request too large") ||
      error?.message?.includes("rate_limit_exceeded")
    ) {
      return NextResponse.json(
        {
          error:
            "Resume or job description is too large for analysis",
        },
        { status: 413 }
      )
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error?.message || "unknown error",
      },
      { status: 500 }
    )
  }
}