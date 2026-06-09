import { describe, it, expect } from "vitest"
import { parseAnalysisResponse } from "../services/parseAnalysisResponse"

describe("parseAnalysisResponse", () => {
    it("normalizes score from 0-1 to 0-100", () => {
        const mockResponse = JSON.stringify({
            score: 0.4,
            missingSkills: ["React"],
            feedback: "Needs improvement",
        })
        const result = parseAnalysisResponse(mockResponse)
        expect(result.score).toBe(40)
        expect(result.missingSkills).toContain("React")
    })
})