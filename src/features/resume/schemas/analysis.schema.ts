import { z } from "zod"

export const AnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  missingSkills: z.array(z.string()),
  feedback: z.string(),
})

export type AnalysisSchemaType =
  z.infer<typeof AnalysisSchema>