import { groq } from "@/lib/groq"

export async function analyzeResume(
  prompt: string
) {
  const completion =
    await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    })

  return (
    completion.choices[0]?.message?.content || ""
  )
}