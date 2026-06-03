import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})


export async function POST(request: Request) {
  const { cv, jobDescription } = await request.json()
const prompt = `
You are an expert recruiter.

Return ONLY raw JSON. No markdown. No backticks. No explanation.

Schema:
{
  "score": number (0-100),
  "missingSkills": string[],
  "feedback": string
}

Job Description: ${jobDescription}

CV: ${cv}
`
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  })
  const content = completion.choices[0].message.content ?? "{}"

let result

try {
  result = JSON.parse(content)
} catch (e) {
  return NextResponse.json(
    {
      score: 0,
      missingSkills: [],
      feedback: "Error parsing AI response",
    },
    { status: 500 }
  )
}
  return NextResponse.json(result)
}
