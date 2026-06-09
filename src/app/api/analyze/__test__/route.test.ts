import { describe, it, expect, vi } from "vitest";

vi.mock("@/features/resume/services/extractResumeText", () => ({
  extractResumeText: vi.fn(async () => "mock cv text"),
}));

vi.mock("@/features/resume/services/analyzeResume", () => ({
  analyzeResume: vi.fn(async () =>
    JSON.stringify({
      score: 80,
      missingSkills: ["Docker"],
      feedback: "Good candidate",
    }),
  ),
}));

import { POST } from "../route";

describe("POST /api/analyze", () => {
  it("returns analysis result", async () => {
    const formData = {
      get: (key: string) => {
        if (key === "file") {
          return new File(["dummy content"], "cv.pdf", {
            type: "application/pdf",
          });
        }

        if (key === "jobDescription") {
          return "frontend developer";
        }

        return null;
      },
    };
    const request = {
      formData: async () => formData,
    } as any;

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.score).toBe(80);
    expect(data.missingSkills).toContain("Docker");
    expect(data.feedback).toBe("Good candidate");
  });
});
