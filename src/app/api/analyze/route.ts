export const runtime = "nodejs"

import { NextResponse } from "next/server"
import OpenAI from "openai"
import mammoth from "mammoth"
import pdf from "pdf-parse"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
    try{
  const formData = await request.formData()

  const file = formData.get("file") as File | null
  const jobDescription = formData.get("jobDescription") as string

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  let cv = ""

  const fileName = file.name.toLowerCase()

  if (fileName.endsWith(".pdf")) {
    const data = await pdf(buffer)
    cv = data.text

  } else if (fileName.endsWith(".docx")) {
    const data = await mammoth.extractRawText({ buffer })
    cv = data.value
  } else {
    cv = await file.text()
  }

  const prompt = `
Return ONLY valid JSON.

{
  "score": number,
  "missingSkills": string[],
  "feedback": string
}

Job Description:
${jobDescription}

CV:
${cv}
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: prompt }],
  })

  const result = JSON.parse(completion.choices[0].message.content ?? "{}")

  return NextResponse.json(result)
} catch (error: any) {
    console.error("ANALYZE ERROR:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error?.message ?? "unknown",
      },
      { status: 500 }
    )
  }
}
