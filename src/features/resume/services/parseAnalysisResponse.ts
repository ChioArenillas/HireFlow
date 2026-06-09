import { AnalysisSchema } from "../schemas/analysis.schema"

export function parseAnalysisResponse(content: string) {
  const jsonMatch = content.match(/\{[\s\S]*\}/)

  if (!jsonMatch) {
    throw new Error("Invalid JSON returned by model")
  }

  const parsed = JSON.parse(jsonMatch[0])

  const rawScore = parsed.score

  const normalizedScore =
    rawScore <= 1 ? rawScore * 100 : rawScore

  const cleaned = {
    ...parsed,
    score: Math.round(normalizedScore),
  }

  return AnalysisSchema.parse(cleaned)
}