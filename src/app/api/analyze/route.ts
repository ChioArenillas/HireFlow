export const runtime = "nodejs"

import { NextResponse } from "next/server"
import Groq from "groq-sdk"
import mammoth from "mammoth"
import pdfParse from "pdf-parse"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

export async function POST(request: Request) {
  try {
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
      const data = await pdfParse(buffer)
      cv = data.text || ""
    } else if (fileName.endsWith(".docx")) {
      const data = await mammoth.extractRawText({ buffer })
      cv = data.value
    } else {
      cv = await file.text()
    }

    // 🔥 recorte para evitar prompts enormes
    const cvTrimmed = cv.slice(0, 12000)

    const prompt = `
You are a strict ATS resume analyzer.

Return ONLY valid JSON.

Schema:
{
  "score": number (0-100),
  "missingSkills": string[],
  "feedback": string
}

Rules:
- Only JSON
- No markdown
- No explanations

Job Description:
${jobDescription}

CV:
${cvTrimmed}
`

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    })

    const content = completion.choices[0]?.message?.content || ""

    // 🧠 parse seguro
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Invalid JSON from model", raw: content },
        { status: 500 }
      )
    }

    const result = JSON.parse(jsonMatch[0])

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("ANALYZE ERROR:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error?.message || "unknown error",
      },
      { status: 500 }
    )
  }
}